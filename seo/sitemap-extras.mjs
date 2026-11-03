// Sitemap helpers used by astro.config.mjs (runs at the end of `astro build`):
//  - lastmod: changes only when a page's visible text changes (hash stored in seo/lastmod.json)
//  - images: adds <image:image> entries for the main photos on each page
//  - hreflang: links the English home page and the Malayalam page
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const STATE = path.resolve('seo/lastmod.json');
const DIST = path.resolve('dist');
let state;
const today = new Date().toISOString().slice(0, 10);

function load() {
  if (!state) state = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, 'utf8')) : {};
  return state;
}

function htmlFor(url) {
  const p = new URL(url).pathname;
  const file = path.join(DIST, p, p.endsWith('/') ? 'index.html' : '');
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

const mainText = (html) =>
  (html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html)
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export function serialize(item, alternates = {}) {
  const html = htmlFor(item.url);
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) return undefined; // never list noindex pages
  const s = load();
  const key = new URL(item.url).pathname;
  const hash = crypto.createHash('sha1').update(mainText(html)).digest('hex').slice(0, 16);
  if (!s[key] || s[key].hash !== hash) s[key] = { hash, lastmod: today };
  fs.mkdirSync(path.dirname(STATE), { recursive: true });
  fs.writeFileSync(STATE, JSON.stringify(Object.fromEntries(Object.entries(s).sort()), null, 2) + '\n');

  const origin = new URL(item.url).origin;
  const imgs = [...new Set([...html.matchAll(/<img[^>]+src="(\/_astro\/[^"]+\.(?:jpg|jpeg|png|webp))"/g)].map((m) => m[1]))]
    .slice(0, 12)
    .map((src) => ({ url: origin + src }));

  return {
    ...item,
    lastmod: s[key].lastmod,
    ...(imgs.length ? { img: imgs } : {}),
    ...(alternates[key] ? { links: alternates[key].map((a) => ({ lang: a.lang, url: origin + a.href })) } : {}),
  };
}
