// Post-build SEO quality checks on dist/. Fails (exit 1) only on real errors;
// prints warnings for things worth a look. Run: node scripts/seo-check.mjs
import fs from 'node:fs';
import path from 'node:path';
import { siteMode } from './launch-status.mjs';

const staging = siteMode() === 'staging';

const DIST = 'dist';
const errors = [];
const warnings = [];
const err = (page, msg) => errors.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));
const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const routeOf = (f) => '/' + path.relative(DIST, f).replace(/index\.html$/, '').replace(/\.html$/, '');
const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const textOf = (html) => decode(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');

const exists = (href) => {
  const p = decodeURIComponent(href.split('#')[0].split('?')[0]);
  if (!p || p === '/') return fs.existsSync(path.join(DIST, 'index.html'));
  const full = path.join(DIST, p);
  return p.endsWith('/') ? fs.existsSync(path.join(full, 'index.html')) : fs.existsSync(full) || fs.existsSync(path.join(full, 'index.html'));
};

const pages = [];
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const route = routeOf(file);
  const is404 = route === '/404';
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const desc = decode(attr(html.match(/<meta name="description"[^>]*>/)?.[0] ?? '', 'content') ?? '');
  const canonical = attr(html.match(/<link rel="canonical"[^>]*>/)?.[0] ?? '', 'href');
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  pages.push({ route, file, title, desc, canonical, noindex, html });

  if (is404) {
    if (!noindex) err(route, '404 page must be noindex');
    continue;
  }
  if (staging && !noindex) err(route, 'staging build but page is indexable');
  if (!title) err(route, 'missing <title>');
  else if (title.length < 25 || title.length > 70) warn(route, `title length ${title.length}`);
  if (!desc) err(route, 'missing meta description');
  else if (desc.length < 100 || desc.length > 170) warn(route, `description length ${desc.length}`);
  if (!canonical) err(route, 'missing canonical');
  else if (new URL(canonical).pathname !== route) err(route, `canonical points to ${canonical}`);
  if (h1s !== 1) err(route, `${h1s} <h1> elements (expected 1)`);
  if (!/<meta property="og:image"/.test(html)) warn(route, 'missing og:image');

  for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\salt(=|\s|>|\/)/.test(img)) err(route, `image without alt: ${img.slice(0, 80)}`);
    if (!/\bwidth="/.test(img) || !/\bheight="/.test(img)) warn(route, `image without width/height: ${img.slice(0, 80)}`);
  }

  for (const m of html.matchAll(/<a\b[^>]*href="(\/[^"]*)"/g)) {
    const href = m[1];
    if (href.startsWith('//')) continue;
    if (!exists(href)) err(route, `broken internal link ${href}`);
    else if (!/\.[a-z0-9]+$/i.test(href.split('#')[0]) && !href.split('#')[0].endsWith('/')) warn(route, `link without trailing slash ${href}`);
  }

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (!blocks.length) err(route, 'no JSON-LD');
  for (const b of blocks) {
    let data;
    try {
      data = JSON.parse(b);
    } catch {
      err(route, 'invalid JSON-LD');
      continue;
    }
    const nodes = data['@graph'] ?? [data];
    for (const n of nodes) {
      if (/Rating|Review/.test(n['@type'] ?? '')) err(route, `${n['@type']} markup is not allowed without real reviews`);
      if (n['@type'] === 'FAQPage') {
        const text = textOf(html);
        for (const q of n.mainEntity ?? []) if (!text.includes(q.name)) err(route, `FAQ schema question not visible on page: "${q.name.slice(0, 60)}"`);
      }
    }
  }

  // hreflang must be reciprocal
  for (const m of html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)) {
    const [, lang, href] = m;
    if (lang === 'x-default') continue;
    const other = pages.find((p) => p.route === new URL(href).pathname) ?? null;
    const otherFile = path.join(DIST, new URL(href).pathname, 'index.html');
    const otherHtml = other?.html ?? (fs.existsSync(otherFile) ? fs.readFileSync(otherFile, 'utf8') : '');
    if (!otherHtml) err(route, `hreflang ${lang} target missing: ${href}`);
    else if (!otherHtml.includes(`href="${canonical}"`)) err(route, `hreflang ${lang} → ${href} has no return link`);
  }
}

// uniqueness across indexable pages
const indexable = pages.filter((p) => !p.noindex && p.route !== '/404');
for (const key of ['title', 'desc']) {
  const seen = new Map();
  for (const p of indexable) {
    if (seen.has(p[key])) err(p.route, `duplicate ${key === 'desc' ? 'description' : 'title'} with ${seen.get(p[key])}`);
    else seen.set(p[key], p.route);
  }
}

// sitemap ↔ pages
const sitemapXml = files.filter((f) => /sitemap-\d+\.xml$/.test(f)).map((f) => fs.readFileSync(f, 'utf8')).join('');
if (!sitemapXml && !staging) err('sitemap', 'no sitemap-*.xml found');
const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => !/\.(jpg|jpeg|png|webp|avif)$/.test(u));
for (const loc of locs) {
  const route = new URL(loc).pathname;
  const page = pages.find((p) => p.route === route);
  if (!page) err('sitemap', `${loc} has no built page`);
  else if (page.noindex) err('sitemap', `${loc} is noindex but listed`);
  else if (page.canonical !== loc) err('sitemap', `${loc} canonical is ${page.canonical}`);
}
for (const p of indexable) if (!locs.some((l) => new URL(l).pathname === p.route)) err('sitemap', `${p.route} is indexable but missing from the sitemap`);
if (staging && locs.length) err('sitemap', 'staging build must not list pages in the sitemap');
const robots = fs.existsSync(path.join(DIST, 'robots.txt')) ? fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8') : '';
if (!staging && !/Sitemap: https?:\/\/[^\s]+sitemap-index\.xml/.test(robots)) err('robots.txt', 'missing Sitemap line');

console.log(`SEO check${staging ? ' (STAGING: all pages noindex)' : ''}: ${indexable.length} indexable pages, ${locs.length} sitemap URLs, ${errors.length} error(s), ${warnings.length} warning(s)`);
for (const w of warnings) console.log('  ⚠', w);
for (const e of errors) console.log('  ✗', e);
process.exit(errors.length ? 1 : 0);
