import { site } from '../data/site';

/** https://wa.me/<number>?text=<message> */
export function waLink(message = `Hi ${site.shortName}, I'd like to check availability.`) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const roomMessage = (stay: string) =>
  `Hi ${site.shortName}, I'm looking for a ${stay.toLowerCase()} in Wayanad. Dates: ___, guests: ___, budget: ___`;

export const tierMessage = (tier: string) =>
  `Hi ${site.shortName}, please send ${tier.toLowerCase()} in Wayanad. Dates: ___, guests: ___`;
