import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site, tiers } from '../data/site';
import { places } from '../data/places';
import { faq } from '../data/faq';
import { getLandingPages, makeFiller } from '../lib/landing';
import { getRooms } from '../lib/inventory';

// Plain-text summary for AI assistants (llms.txt convention).
export const GET: APIRoute = async ({ site: base }) => {
  const u = (p: string) => new URL(p, base).href;
  const rooms = (await getCollection('rooms')).sort((a, b) => a.data.order - b.data.order);
  const { published } = await getLandingPages();
  const fill = makeFiller(await getRooms());
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `- What we are: a resort booking service for Wayanad, Kerala, India. We book partner resorts; we do not own a resort.`,
    `- Area: all of Wayanad (Vythiri, Lakkidi, Kalpetta, Meppadi, Sulthan Bathery, Mananthavady)`,
    `- Booking: WhatsApp ${site.phone} (https://wa.me/${site.whatsapp}). Send dates, guests and budget; we reply with resorts free for those dates.`,
    '- Prices: on request by WhatsApp for your dates; check-in times and cancellation rules depend on the resort',
    '',
    '## Budgets',
    ...tiers.map((t) => `- ${t.name}: ${t.summary}`),
    '',
    '## Stay types',
    ...rooms.map((r) => `- [${r.data.name}](${u(`/rooms/${r.id}/`)}): ${r.data.guestsNote}. ${r.data.summary}`),
    '',
    '## Stays by need',
    ...published.map((p) => `- [${p.data.breadcrumb}](${u(`/${p.id}/`)}): ${fill(p.data.answer.a)}`),
    '',
    '## Wayanad guides',
    `- [Places to visit in Wayanad](${u('/things-to-do-in-wayanad/')}): distances, tips and itineraries`,
    `- [Where to stay in Wayanad](${u('/where-to-stay-in-wayanad/')}): areas compared`,
    `- [Best time to visit Wayanad](${u('/best-time-to-visit-wayanad/')}): month-by-month weather`,
    `- [Services](${u('/services/')}): what we do for guests`,
    `- [FAQ](${u('/faq/')}): booking questions`,
    `- [About us](${u('/about/')})`,
    `- [Contact and how booking works](${u('/contact/')})`,
    `- [Malayalam page (മലയാളം)](${u('/ml/')})`,
    '',
    `## Distances from ${site.baseTown} (approximate, by road)`,
    ...places.map((p) => `- ${p.name}: ${p.km} km, about ${p.drive}`),
    '',
    '## FAQ',
    ...faq.flatMap((f) => [`### ${f.q}`, f.a, '']),
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
