// Non-landing pages that landing pages can link to (RelatedPages).
export const staticPages: Record<string, { title: string; blurb: string }> = {
  rooms: { title: 'Stays we book', blurb: 'Pool villas, tree houses, plantation cottages, family suites and couple stays.' },
  'things-to-do-in-wayanad': { title: 'Places to visit in Wayanad', blurb: 'Ten places with distances from Vythiri, tips and itineraries.' },
  'where-to-stay-in-wayanad': { title: 'Where to stay in Wayanad', blurb: 'Vythiri, Kalpetta, Meppadi, Sulthan Bathery and Mananthavady compared.' },
  'best-time-to-visit-wayanad': { title: 'Best time to visit Wayanad', blurb: 'Month-by-month weather, crowds and what is open.' },
  contact: { title: 'Contact and booking', blurb: 'How booking works and how to reach Wayanad.' },
};

// Slugs owned by hand-built routes; landing pages may not use them.
export const reservedSlugs = ['rooms', 'contact', 'privacy', 'ml', '404', ...Object.keys(staticPages)];
