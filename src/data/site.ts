// ⭐ One file for every business fact on the site.
// Anything marked TODO is a placeholder. `pnpm check:launch` lists them and
// a production build on Vercel fails until they are all replaced.

export const site = {
  name: 'Mistvale Wayanad', // TODO: real resort name
  shortName: 'Mistvale',
  legalName: 'Mistvale Resort, Wayanad', // TODO
  tagline: 'Hillside resort among the tea estates of Vythiri, Wayanad',
  description:
    'Pool villas, tree houses and plantation cottages on a tea-and-coffee hillside in Vythiri, Wayanad, Kerala. Book directly on WhatsApp.',
  phone: '+91 90610 79722',
  phoneE164: '+919061079722',
  whatsapp: '919061079722',
  email: 'stay@example.com', // TODO: real email
  address: {
    street: 'Near Pookode Lake, Lakkidi Road', // TODO: real street address
    locality: 'Vythiri',
    district: 'Wayanad',
    region: 'Kerala',
    postalCode: '673576',
    country: 'IN',
  },
  geo: { lat: 11.5527, lng: 76.041 }, // TODO: exact pin from Google Maps
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Vythiri%2C+Wayanad%2C+Kerala', // TODO: resort's Google Maps link
  checkIn: '13:00', // TODO
  checkOut: '11:00', // TODO
  // Prices are hidden on the site (guests ask on WhatsApp). Set true to show rates everywhere again.
  showPrices: false,
  priceRange: '₹6,500 – ₹12,500 per night', // TODO
  currency: 'INR',
  facts: [
    { value: '780 m', label: 'above sea level' }, // TODO
    { value: '12 acres', label: 'of tea, coffee and pepper' }, // TODO
    { value: '15 km', label: 'from Kalpetta town' }, // TODO
  ],
  amenities: [
    'Outdoor swimming pool',
    'Free Wi-Fi',
    'Free parking',
    'Restaurant serving Kerala food',
    'Campfire area',
    'Plantation walking trails',
  ], // TODO: confirm with owner
  socials: [] as { name: string; url: string }[], // TODO: Instagram, Facebook, YouTube
  // Area the distances in places.ts are measured from.
  baseTown: 'Vythiri',
  languages: ['English', 'Malayalam', 'Hindi'], // TODO: confirm languages staff speak
  extraMattressPrice: 1000, // TODO: per night
  // Facilities drive which landing pages may be published (see src/lib/landing.ts).
  facilities: {
    pool: { available: true, note: 'Outdoor pool with a 0.9 m shallow end; open 7 am to 7 pm' }, // TODO: confirm size, depth, timings
    privatePool: { available: true, note: 'Plunge pool in the Private Pool Villa only' },
    campfire: { available: true, note: 'Lawn campfire after dark, weather permitting' },
    barbecue: { available: true, note: 'On request, a day ahead' }, // TODO: confirm
    restaurant: { available: true, note: 'Kerala and North Indian food; breakfast included' },
    parking: { available: true, note: 'Free, inside the property; tempo travellers fit' },
    wifi: { available: true, note: 'Free in rooms and common areas' },
    powerBackup: { available: true, note: 'Generator backup for lights and fans' }, // TODO: confirm
    kidsPool: { available: false, note: 'No separate kids pool; the main pool has a shallow end' },
  },
  // Booking the whole resort privately (groups, family events).
  wholeProperty: {
    available: true, // TODO: confirm owner offers whole-resort bookings
    minNights: 2, // TODO
    note: 'Book every room for your group; no other guests during your stay.',
  },
  policies: {
    advance: '30% advance to confirm, balance at check-in', // TODO: real policy
    cancellation: 'Full refund up to 14 days before arrival, 50% up to 7 days, no refund after that', // TODO: real policy
    children: 'Children under 5 stay free using existing beds', // TODO
    idProof: 'Government photo ID for every adult at check-in (required by law)',
    quietHours: 'Quiet hours from 10 pm; no loud music outdoors', // TODO
  },
} as const;

export const fullAddress = [
  site.address.street,
  site.address.locality,
  `${site.address.district}, ${site.address.region} ${site.address.postalCode}`,
].join(', ');

export const nav = [
  { href: '/rooms/', label: 'Rooms' },
  { href: '/group-stays-in-wayanad/', label: 'Groups' },
  { href: '/things-to-do-in-wayanad/', label: 'Wayanad guide' },
  { href: '/contact/', label: 'Contact' },
];

/** '13:00' → '1 pm' */
export function fmtTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 || 12;
  return m ? `${hour}:${String(m).padStart(2, '0')} ${suffix}` : `${hour} ${suffix}`;
}
