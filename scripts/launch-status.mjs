// Shared by check-launch (prebuild), astro.config (build) and the SEO/IndexNow scripts.
import fs from 'node:fs';
import path from 'node:path';

/** Every placeholder that must be replaced before the site may be indexed. */
export function findPlaceholders(root = process.cwd()) {
  const dirs = [
    ['src/data', (f) => f.endsWith('.ts')],
    ['src/content/rooms', (f) => f.endsWith('.md')],
    ['src/content/landing', (f) => f.endsWith('.md')],
  ];
  const problems = [];
  for (const [dir, keep] of dirs) {
    const abs = path.join(root, dir);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs).filter(keep)) {
      const file = path.join(dir, f);
      fs.readFileSync(path.join(root, file), 'utf8')
        .split('\n')
        .forEach((line, i) => {
          if (/\/\/\s*TODO|#\s*TODO|\bTODO\(/.test(line)) problems.push(`${file}:${i + 1}  ${line.trim().slice(0, 110)}`);
          if (/^stockPhoto:\s*true/.test(line)) problems.push(`${file}:${i + 1}  room photo is a stock sample; add the resort's own photo`);
        });
    }
  }
  if (!process.env.SITE_URL) problems.push('SITE_URL env var not set; canonical URLs use the placeholder domain');
  return problems;
}

/**
 * 'staging'    → every page noindex + preview banner (safe to deploy with placeholders)
 * 'production' → normal, indexable site
 * SITE_MODE forces a mode; otherwise Vercel builds with placeholders become staging automatically.
 */
export function siteMode(problems = findPlaceholders()) {
  const forced = process.env.SITE_MODE;
  if (forced === 'staging' || forced === 'production') return forced;
  return process.env.VERCEL && problems.length ? 'staging' : 'production';
}
