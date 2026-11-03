import { site } from '../data/site';

/** https://wa.me/<number>?text=<message> */
export function waLink(message = `Hi ${site.shortName}, I'd like to check availability.`) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const roomMessage = (room: string) =>
  `Hi ${site.shortName}, I'd like to check availability for the ${room}. Dates: `;
