// Lists placeholders that must be replaced before launch.
//  - `pnpm check:launch` (--strict): exits 1 while any remain.
//  - On Vercel with placeholders: builds in STAGING mode (noindex + preview banner) instead of failing.
//  - SITE_MODE=production with placeholders on a Vercel production build: fails, so fake data is never indexed.
import { findPlaceholders, siteMode } from './launch-status.mjs';

const problems = findPlaceholders();
const mode = siteMode(problems);

if (!problems.length) {
  console.log(`✓ launch check passed: no placeholders left (mode: ${mode})`);
  process.exit(0);
}
console.log(`\n⚠ ${problems.length} launch placeholder(s) to replace:\n` + problems.map((p) => '  - ' + p).join('\n') + '\n');
if (process.argv.includes('--strict')) process.exit(1);
if (mode === 'production' && process.env.VERCEL_ENV === 'production') {
  console.error('✗ SITE_MODE=production but placeholders remain. Replace them, or remove SITE_MODE to deploy as staging.');
  process.exit(1);
}
if (mode === 'staging') {
  console.log('→ STAGING build: every page is noindex and shows a preview banner. It becomes a normal, indexable site automatically once this list is empty.');
}
