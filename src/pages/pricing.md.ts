import type { APIRoute } from 'astro';
import { site, fmtTime } from '../data/site';
import { getRooms, planFor, totals, inr, describePlan } from '../lib/inventory';

// Plain-markdown rates for AI assistants and booking agents (linked from llms.txt).
export const GET: APIRoute = async ({ site: base }) => {
  const rooms = await getRooms();
  const t = totals(rooms);
  const u = (p: string) => new URL(p, base).href;
  const plans = [2, 4, 5, 10, 15].map((n) => [n, planFor(n, rooms)] as const).filter(([, p]) => p);
  const lines = [
    `# ${site.name} — room rates`,
    '',
    `Location: ${site.address.locality}, ${site.address.district}, ${site.address.region}, India. Prices in INR per room per night, breakfast included, before GST.`,
    `Updated: ${new Date().toISOString().slice(0, 10)}. Weekend and holiday rates are higher; confirm on WhatsApp ${site.phone}.`,
    '',
    '## Rooms',
    '',
    '| Room | Guests | Sleeps (with extra mattress) | Units | From / night |',
    '|---|---|---|---|---|',
    ...rooms.map((r) => `| [${r.data.name}](${u(`/rooms/${r.id}/`)}) | ${r.data.guestsNote} | ${r.data.sleeps} | ${r.data.units} | ${inr(r.data.priceFrom)} |`),
    '',
    `Extra mattress: ${inr(site.extraMattressPrice)} per night, where the room allows one.`,
    '',
    '## Groups',
    '',
    `Whole resort: ${t.units} rooms, ${t.standard} guests in beds, up to ${t.max} with extra mattresses, minimum ${site.wholeProperty.minNights} nights.`,
    '',
    '| Group | Rooms | From / night | Per person |',
    '|---|---|---|---|',
    ...plans.map(([n, p]) => `| ${n} guests | ${describePlan(p!)} | ${inr(p!.nightly)} | ${inr(p!.perPerson)} |`),
    '',
    '## Policies',
    '',
    `- Check-in ${fmtTime(site.checkIn)}, check-out ${fmtTime(site.checkOut)}`,
    ...Object.entries(site.policies).map(([k, v]) => `- ${k[0].toUpperCase() + k.slice(1).replace(/([A-Z])/g, ' $1').toLowerCase()}: ${v}`),
    '',
    `Book: WhatsApp https://wa.me/${site.whatsapp} or call ${site.phone}. No booking fee.`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
