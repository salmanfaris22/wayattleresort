// ⭐ One file for every business fact on the site.
// Mistvale Wayanad is a resort booking service: we find and book partner resorts
// across Wayanad for guests on WhatsApp. We do not own or run a resort.
// Anything marked TODO is a placeholder; `pnpm check:launch` lists them and
// Vercel builds stay noindex until they are all replaced.

export const site = {
  name: 'Mistvale Wayanad',
  shortName: 'Mistvale',
  legalName: 'Mistvale Wayanad',
  tagline: 'Resort booking help for every part of Wayanad',
  description:
    'We find and book Wayanad resorts for you: private pool villas, tree houses, plantation cottages, family suites and couple stays, from luxury to budget. Book on WhatsApp.',
  phone: '+91 90610 79722',
  phoneE164: '+919061079722',
  whatsapp: '919061079722',
  // No public office: we serve guests across the whole district by phone and WhatsApp.
  areaServed: 'Wayanad, Kerala',
  address: {
    locality: 'Wayanad',
    district: 'Wayanad',
    region: 'Kerala',
    country: 'IN',
  },
  // Prices are not shown on the site; each resort's rate is confirmed on WhatsApp.
  showPrices: false,
  currency: 'INR',
  facts: [
    { value: '4', label: 'budgets: private, luxury, affordable, budget' },
    { value: '5', label: 'stay types, from tree houses to pool villas' },
    { value: 'All', label: 'of Wayanad: Vythiri, Kalpetta, Meppadi, Bathery and more' },
  ],
  socials: [] as { name: string; url: string }[],
  // Reference point for the distances in places.ts (south Wayanad, on the main road from Kozhikode).
  baseTown: 'Vythiri',
  languages: ['English', 'Malayalam'],
  // How booking works. Shown on the contact page, room pages and FAQ.
  howItWorks: [
    { title: 'Tell us your trip', text: 'Send your dates, number of guests and the kind of stay you want on WhatsApp.' },
    { title: 'Get matching resorts', text: 'We reply with resorts that have rooms free for your dates, with photos and the rate.' },
    { title: 'Confirm with us', text: 'Pick one and we book it for you. You get the resort name, address and booking details in writing.' },
  ],
} as const;

/** Budget levels we book. Ids match the anchors on the home page (#private, #luxury …). */
export const tiers = [
  {
    id: 'private',
    name: 'Private resorts',
    summary: 'Whole villas or small resorts booked only for your group, often with a private pool. For families, friends and celebrations.',
    goodFor: ['Family get-togethers', 'Friends trips', 'Birthdays and small events'],
  },
  {
    id: 'luxury',
    name: 'Luxury resorts',
    summary: 'Pool villas, valley views, spas and fine dining. For honeymoons, anniversaries and a slow stay with full service.',
    goodFor: ['Honeymoons', 'Anniversaries', 'Long weekends'],
  },
  {
    id: 'affordable',
    name: 'Affordable resorts',
    summary: 'Comfortable rooms with a pool and good food at a mid-range rate. The choice most families and couples make.',
    goodFor: ['Families', 'Couples', 'First trip to Wayanad'],
  },
  {
    id: 'budget',
    name: 'Budget resorts',
    summary: 'Clean, simple cottages and homestays at a lower rate, many near the main sights. For short trips and bigger groups.',
    goodFor: ['Students and bachelors', 'Short trips', 'Large groups'],
  },
] as const;

export const fullAddress = `${site.address.district}, ${site.address.region}, India`;

export const nav = [
  { href: '/rooms/', label: 'Stays' },
  { href: '/where-to-stay-in-wayanad/', label: 'Where to stay' },
  { href: '/things-to-do-in-wayanad/', label: 'Wayanad guide' },
  { href: '/contact/', label: 'Contact' },
];
