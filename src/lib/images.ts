import type { ImageMetadata } from 'astro';
import credits from '../data/credits.json';

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.jpg', { eager: true });

/** img('places/chembra-peak') → ImageMetadata */
export function img(key: string): ImageMetadata {
  const found = files[`/src/assets/images/${key}.jpg`];
  if (!found) throw new Error(`Image not found: ${key}`);
  return found.default;
}

export type Credit = (typeof credits)[number];

export function credit(key: string): Credit | undefined {
  return credits.find((c) => c.file === `${key}.jpg`);
}

/** "Photo: Ingo Mehling, CC BY-SA 4.0" */
export function creditLine(key: string) {
  const c = credit(key);
  return c ? `Photo: ${c.author}, ${c.license}` : '';
}
