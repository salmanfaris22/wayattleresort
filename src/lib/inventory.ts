import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../data/site';

export type Room = CollectionEntry<'rooms'>;

export async function getRooms(): Promise<Room[]> {
  return (await getCollection('rooms')).sort((a, b) => a.data.order - b.data.order);
}

export const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

/** Standard capacity of the whole resort (all units, no extra mattresses). */
export function totals(rooms: Room[]) {
  const units = rooms.reduce((n, r) => n + r.data.units, 0);
  const standard = rooms.reduce((n, r) => n + r.data.guests * r.data.units, 0);
  const max = rooms.reduce((n, r) => n + r.data.sleeps * r.data.units, 0);
  const nightly = rooms.reduce((n, r) => n + r.data.priceFrom * r.data.units, 0);
  return { units, standard, max, nightly };
}

export type PlanLine = { room: Room; count: number; extraMattresses: number };
export type Plan = { guests: number; lines: PlanLine[]; rooms: number; capacity: number; nightly: number; perPerson: number; wholeResort: boolean };

/**
 * Cheapest way to sleep `guests` people using the fewest rooms.
 * Brute force over every unit (small inventory), extra mattresses only where a room allows them.
 * Returns undefined when the resort cannot host that many guests — never over-promise capacity.
 */
export function planFor(guests: number, rooms: Room[], opts: { require?: (r: Room) => boolean } = {}): Plan | undefined {
  const units = rooms.flatMap((room) => Array.from({ length: room.data.units }, () => room));
  let best: Plan | undefined;
  for (let mask = 1; mask < 1 << units.length; mask++) {
    const picked = units.filter((_, i) => mask & (1 << i));
    if (opts.require && !picked.some(opts.require)) continue;
    const standard = picked.reduce((n, r) => n + r.data.guests, 0);
    const max = picked.reduce((n, r) => n + r.data.sleeps, 0);
    if (max < guests) continue;
    const extra = Math.max(0, guests - standard);
    const nightly = picked.reduce((n, r) => n + r.data.priceFrom, 0) + extra * site.extraMattressPrice;
    const better = !best || picked.length < best.rooms || (picked.length === best.rooms && nightly < best.nightly);
    if (!better) continue;
    // group identical units into lines; assign extra mattresses to rooms that allow them
    let left = extra;
    const lines: PlanLine[] = [];
    for (const room of rooms) {
      const count = picked.filter((r) => r === room).length;
      if (!count) continue;
      const allow = (room.data.sleeps - room.data.guests) * count;
      const add = Math.min(left, allow);
      left -= add;
      lines.push({ room, count, extraMattresses: add });
    }
    best = {
      guests,
      lines,
      rooms: picked.length,
      capacity: Math.max(guests, standard),
      nightly,
      perPerson: nightly / guests,
      wholeResort: picked.length === units.length,
    };
  }
  return best;
}

export const describePlan = (p: Plan) =>
  p.lines
    .map((l) => `${l.count > 1 ? `${l.count} × ` : ''}${l.room.data.name}${l.extraMattresses ? ` (+${l.extraMattresses} extra mattress)` : ''}`)
    .join(' + ');
