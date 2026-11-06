// Partner resorts shown BY NAME: a filterable list on the home page and one page each at /resorts/<slug>/.
//
// Add a resort only when it really works with us AND has agreed to be named on this site:
// `permission` records who agreed and when. Use the resort's own photos or photos we took,
// never photos copied from booking sites. How to add one: docs/add-a-partner-resort.md
//
// Empty list = nothing is shown and no /resorts/ pages are built.
// Every entry must pass the checks in src/lib/stays.ts, or the build stops with the reason.
import type { AreaId } from './areas';
import type { tiers } from './site';

/** Ids of the stay types in src/content/rooms/ */
export type StayType = 'pool-villa' | 'tree-house' | 'plantation-cottage' | 'family-suite' | 'couple-stay';
export type TierId = (typeof tiers)[number]['id'];
export type TripType = 'family' | 'couples' | 'groups';

export type Stay = {
  /** URL part: /resorts/<slug>/ (lowercase letters, numbers and hyphens) */
  slug: string;
  /** The resort's real name, written the way the resort writes it */
  name: string;
  /** Who at the resort agreed to be listed by name, and when (YYYY-MM-DD) */
  permission: { by: string; date: string };
  area: AreaId;
  /** Nearest village or town, e.g. "Lakkidi" */
  locality: string;
  types: StayType[];
  tier: TierId;
  /** Smallest and largest group one booking can take */
  sleeps: { min: number; max: number };
  pool: 'private' | 'shared' | 'none';
  bestFor: TripType[];
  /** Lowest normal rate per night in rupees. Shown only when site.showPrices is true. */
  priceFrom?: number;
  /** img() keys like 'stays/<slug>-pool' (files in src/assets/images/stays/). At least 3; the first is the cover. */
  photos: { key: string; alt: string; caption: string }[];
  /** 2 to 4 paragraphs in our own words: setting, rooms, food, what a stay is like */
  about: string[];
  /** What stands out, one line each */
  highlights: string[];
  /** Honest details: road and last stretch, steps, food timings, rules, mobile signal */
  goodToKnow: string[];
  /** When these details were last confirmed with the resort (YYYY-MM-DD) */
  lastChecked: string;
};

export const stays: Stay[] = [];
