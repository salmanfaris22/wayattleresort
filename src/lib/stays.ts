import { stays, type Stay, type StayType, type TripType } from '../data/stays';
import { areas } from '../data/areas';

const MIN_WORDS = 300;
const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));

export const typeNames: Record<StayType, string> = {
  'pool-villa': 'Pool villa',
  'tree-house': 'Tree house',
  'plantation-cottage': 'Plantation cottage',
  'family-suite': 'Family suite',
  'couple-stay': 'Couple stay',
};

export const tripNames: Record<TripType, string> = { family: 'Families', couples: 'Couples', groups: 'Groups' };

export const poolNames: Record<Stay['pool'], string> = {
  private: 'Private pool',
  shared: 'Shared pool',
  none: 'No pool',
};

export const areaOf = (s: Stay) => areas.find((a) => a.id === s.area)!;

export const stayMessage = (s: Stay) => `Hi, I'd like to check dates for ${s.name} in Wayanad. Dates: ___, guests: ___`;

/** Why a listing may not go live. Empty array = passes. */
export function stayProblems(s: Stay, all: Stay[]): string[] {
  const out: string[] = [];
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s.slug)) out.push(`slug "${s.slug}" must be lowercase words joined by hyphens`);
  if (!s.name.trim()) out.push('no name');
  if (!s.permission.by.trim() || !isDate(s.permission.date)) out.push('permission needs who agreed and a YYYY-MM-DD date');
  if (!isDate(s.lastChecked)) out.push('lastChecked must be a YYYY-MM-DD date');
  if (!areas.some((a) => a.id === s.area)) out.push(`unknown area "${s.area}"`);
  if (!s.locality.trim()) out.push('no locality');
  if (!s.types.length) out.push('needs at least one stay type');
  if (!s.bestFor.length) out.push('needs at least one bestFor');
  if (s.sleeps.min < 1 || s.sleeps.max < s.sleeps.min) out.push('sleeps.min must be at least 1 and not above sleeps.max');
  if (s.photos.length < 3) out.push(`needs 3 or more photos (has ${s.photos.length})`);
  if (s.photos.some((p) => !p.alt.trim() || !p.caption.trim())) out.push('every photo needs alt text and a caption');
  const total = [...s.about, ...s.highlights, ...s.goodToKnow].reduce((n, t) => n + words(t), 0);
  if (total < MIN_WORDS) out.push(`thin content: ${total} words in about + highlights + goodToKnow (min ${MIN_WORDS})`);
  for (const o of all) {
    if (o === s) continue;
    if (o.slug === s.slug) out.push(`duplicate slug with ${o.name}`);
    if (o.name === s.name) out.push(`duplicate name "${s.name}"`);
  }
  return out;
}

let checked: Stay[] | undefined;

/** Partner resorts that pass every check. A listing that fails stops the build with the reasons. */
export function getStays(): Stay[] {
  if (checked) return checked;
  const failed = stays.map((s) => ({ s, reasons: stayProblems(s, stays) })).filter((x) => x.reasons.length);
  if (failed.length) {
    throw new Error(
      'Partner resort listings with problems (src/data/stays.ts):\n' +
        failed.map(({ s, reasons }) => `  - ${s.name || s.slug}: ${reasons.join('; ')}`).join('\n'),
    );
  }
  checked = [...stays].sort((a, b) => a.name.localeCompare(b.name));
  return checked;
}
