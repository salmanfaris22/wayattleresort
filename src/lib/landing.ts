import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../data/site';
import { places } from '../data/places';
import { reservedSlugs } from '../data/pages';
import { getRooms, type Room } from './inventory';

export type Landing = CollectionEntry<'landing'>;

const MIN_WORDS = 350;
const words = (s: string) => s.replace(/[#|*_>`\-\[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;

/** Fill {{tokens}} in landing copy from live data so contact details and distances never go stale. */
export function makeFiller(_rooms: Room[]) {
  const values: Record<string, (arg?: string) => string> = {
    phone: () => site.phone,
    km: (slug) => `${need(places.find((p) => p.slug === slug), `place ${slug}`).km} km`,
  };
  return (text: string) =>
    text.replace(/\{\{(\w+)(?::([\w-]+))?\}\}/g, (_, key: string, arg?: string) => {
      const fn = values[key];
      if (!fn) throw new Error(`Unknown token {{${key}}} in landing copy`);
      return fn(arg);
    });
}

function need<T>(v: T | undefined, what: string): T {
  if (v === undefined || v === null) throw new Error(`Landing copy refers to missing ${what}`);
  return v;
}

/** Why a page may not be published. Empty array = passes the quality gate. */
export function problems(page: Landing, rooms: Room[], all: Landing[]): string[] {
  const d = page.data;
  const out: string[] = [];
  if (d.status !== 'published') out.push('status is draft');
  if (reservedSlugs.includes(page.id)) out.push(`slug "${page.id}" is reserved by another route`);
  for (const r of d.rooms) if (!rooms.some((x) => x.id === r.id)) out.push(`unknown stay type "${r.id}"`);
  if (d.intent !== 'informational' && !d.rooms.length) out.push('no matching stay types to show');
  const total = words(page.body ?? '') + words(d.lede) + words(d.answer.a) + d.faqs.reduce((n, f) => n + words(f.a), 0);
  if (total < MIN_WORDS) out.push(`thin content: ${total} words (min ${MIN_WORDS})`);
  for (const other of all) {
    if (other.id === page.id || other.data.status !== 'published') continue;
    if (other.data.seoTitle === d.seoTitle) out.push(`duplicate title with ${other.id}`);
    if (other.data.description === d.description) out.push(`duplicate description with ${other.id}`);
    if (other.data.h1 === d.h1) out.push(`duplicate H1 with ${other.id}`);
  }
  return out;
}

let cache: Promise<{ published: Landing[]; skipped: { id: string; reasons: string[] }[] }> | undefined;

/** Landing pages that pass the quality gate. Others are not built and never reach the sitemap. */
export function getLandingPages() {
  cache ??= (async () => {
    const [all, rooms] = await Promise.all([getCollection('landing'), getRooms()]);
    const published: Landing[] = [];
    const skipped: { id: string; reasons: string[] }[] = [];
    for (const page of all) {
      const reasons = problems(page, rooms, all);
      if (reasons.length) skipped.push({ id: page.id, reasons });
      else published.push(page);
    }
    for (const s of skipped) console.warn(`[landing] not published: /${s.id}/ — ${s.reasons.join('; ')}`);
    return { published, skipped };
  })();
  return cache;
}
