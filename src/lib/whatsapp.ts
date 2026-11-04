import { site } from '../data/site';

/** https://wa.me/<number>?text=<message> */
export function waLink(message = "Hi, I'd like to check resort availability in Wayanad.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const roomMessage = (stay: string) =>
  `Hi, I'm looking for a ${stay.toLowerCase()} in Wayanad. Dates: ___, guests: ___, budget: ___`;

export const tierMessage = (tier: string) =>
  `Hi, please send ${tier.toLowerCase()} in Wayanad. Dates: ___, guests: ___`;
