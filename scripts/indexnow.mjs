// Notify IndexNow (Bing, Yandex, Seznam, Naver…) about new, changed or removed URLs.
// Run AFTER a production deploy is live:
//   SITE_URL=https://www.example.in INDEXNOW_KEY=<key> node scripts/indexnow.mjs [--dry-run] [--all]
// Reads the built sitemap + seo/lastmod.json, compares with seo/indexnow-state.json,
// submits only what changed, and appends results to seo/indexnow.log. Never fails a deploy.
import fs from 'node:fs';
import { siteMode } from './launch-status.mjs';

const site = (process.env.SITE_URL || 'https://www.resortinwayanad.in').replace(/\/$/, '');
const key = process.env.INDEXNOW_KEY || (fs.existsSync('seo/indexnow-key.txt') ? fs.readFileSync('seo/indexnow-key.txt', 'utf8').trim() : '');
const dry = process.argv.includes('--dry-run');
const all = process.argv.includes('--all');
const log = (msg) => {
  const line = `${new Date().toISOString()} ${msg}`;
  console.log(line);
  fs.appendFileSync('seo/indexnow.log', line + '\n');
};

if (siteMode() === 'staging') {
  console.log('IndexNow skipped: staging build (placeholders remain, pages are noindex).');
  process.exit(0);
}
if (!site || !key) {
  console.log('IndexNow skipped: set SITE_URL and INDEXNOW_KEY (see docs/seo-implementation-report.md).');
  process.exit(0);
}

const sitemap = fs.readdirSync('dist').filter((f) => /^sitemap-\d+\.xml$/.test(f)).map((f) => fs.readFileSync(`dist/${f}`, 'utf8')).join('');
const live = [...sitemap.matchAll(/<url><loc>([^<]+)<\/loc>(?:<lastmod>([^<]+)<\/lastmod>)?/g)].map(([, loc, lastmod]) => ({
  url: site + new URL(loc).pathname,
  lastmod: lastmod?.slice(0, 10) ?? '',
}));
const stateFile = 'seo/indexnow-state.json';
const state = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile, 'utf8')) : {};
const changed = live.filter((p) => all || state[p.url] !== p.lastmod).map((p) => p.url);
const removed = Object.keys(state).filter((u) => !live.some((p) => p.url === u)); // should now return 404/410
const urls = [...changed, ...removed];

if (!urls.length) {
  log('IndexNow: nothing changed since the last submission.');
  process.exit(0);
}

try {
  const keyCheck = await fetch(`${site}/${key}.txt`);
  if (!keyCheck.ok || (await keyCheck.text()).trim() !== key) throw new Error(`key file ${site}/${key}.txt not reachable (build with INDEXNOW_KEY set)`);
  if (dry) {
    log(`IndexNow dry run: would submit ${urls.length} URL(s): ${urls.join(' ')}`);
    process.exit(0);
  }
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${key}.txt`, urlList: urls.slice(0, 10000) }),
  });
  log(`IndexNow: HTTP ${res.status} for ${urls.length} URL(s) (${changed.length} new/changed, ${removed.length} removed)`);
  if (res.status === 200 || res.status === 202) {
    const next = Object.fromEntries(live.map((p) => [p.url, p.lastmod]));
    fs.writeFileSync(stateFile, JSON.stringify(next, null, 2) + '\n');
  }
} catch (err) {
  log(`IndexNow failed (not fatal): ${err.message}`);
}
