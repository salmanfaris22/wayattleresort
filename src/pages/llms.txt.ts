import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site, fullAddress, fmtTime } from '../data/site';
import { places } from '../data/places';
import { faq } from '../data/faq';
import { getLandingPages, makeFiller } from '../lib/landing';
import { getRooms, totals } from '../lib/inventory';

// Plain-text summary for AI assistants (llms.txt convention).
export const GET: APIRoute = async ({ site: base }) => {
  const u = (p: string) => new URL(p, base).href;
  const rooms = (await getCollection('rooms')).sort((a, b) => a.data.order - b.data.order);
  const { published } = await getLandingPages();
  const fill = makeFiller(await getRooms());
  const t = totals(rooms);
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `- Location: ${fullAddress}, India`,
    `- Booking: WhatsApp ${site.phone} (https://wa.me/${site.whatsapp}). No booking fee.`,
    `- Check-in ${fmtTime(site.checkIn)}, check-out ${fmtTime(site.checkOut)}. Breakfast included.`,
    ...(site.showPrices ? [`- Price range: ${site.priceRange} (full rate card: ${u('/pricing.md')})`] : ['- Prices: on request by WhatsApp for your dates']),
    `- Capacity: ${t.units} rooms, ${t.standard} guests in beds, up to ${t.max} with extra mattresses; whole-resort private booking available`,
    `- Amenities: ${site.amenities.join(', ')}`,
    '',
    '## Rooms',
    ...rooms.map(
      (r) =>
        `- [${r.data.name}](${u(`/rooms/${r.id}/`)}): ${r.data.guestsNote}, ${r.data.sizeSqft} sq ft, ${r.data.bed}, ${site.showPrices ? `from ₹${r.data.priceFrom.toLocaleString('en-IN')} a night. ` : ''}${r.data.summary}`,
    ),
    '',
    '## Stays by need',
    ...published.map((p) => `- [${p.data.breadcrumb}](${u(`/${p.id}/`)}): ${fill(p.data.answer.a)}`),
    '',
    '## Wayanad guides',
    `- [Places to visit in Wayanad](${u('/things-to-do-in-wayanad/')}): distances, tips and itineraries`,
    `- [Where to stay in Wayanad](${u('/where-to-stay-in-wayanad/')}): areas compared`,
    `- [Best time to visit Wayanad](${u('/best-time-to-visit-wayanad/')}): month-by-month weather`,
    `- [Contact and how to reach](${u('/contact/')})`,
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
