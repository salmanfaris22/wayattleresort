// Lists placeholders that must be replaced before the site goes live.
// Warns on normal builds; fails with --strict or on a Vercel production build.
import fs from 'node:fs';
import path from 'node:path';

const strict = process.argv.includes('--strict') || process.env.VERCEL_ENV === 'production';
const files = [
  ...fs.readdirSync('src/data').filter((f) => f.endsWith('.ts')).map((f) => path.join('src/data', f)),
  ...fs.readdirSync('src/content/rooms').filter((f) => f.endsWith('.md')).map((f) => path.join('src/content/rooms', f)),
];

const problems = [];
for (const file of files) {
  fs.readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      if (/\/\/\s*TODO|\bTODO\(/.test(line)) problems.push(`${file}:${i + 1}  ${line.trim().slice(0, 110)}`);
      if (/^stockPhoto:\s*true/.test(line)) problems.push(`${file}:${i + 1}  room photo is a stock sample — add the resort's own photo`);
    });
}
if (!process.env.SITE_URL) problems.push('SITE_URL env var not set — canonical URLs use the placeholder domain');

if (!problems.length) {
  console.log('✓ launch check passed: no placeholders left');
  process.exit(0);
}
console.log(`\n⚠ ${problems.length} launch placeholder(s) to replace:\n` + problems.map((p) => '  - ' + p).join('\n') + '\n');
if (strict) {
  console.error('✗ Production build blocked until these are fixed (scripts/check-launch.mjs).');
  process.exit(1);
}
