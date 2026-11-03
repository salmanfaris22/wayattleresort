// Wayanad attractions. Distances are approximate road distances from Vythiri.
// TODO(launch): re-check km and drive times once the resort's exact location is set.

export type Place = {
  slug: string;
  name: string;
  image: string; // key for img()
  km: number;
  drive: string;
  type: string;
  bestFor: string;
  summary: string; // answer-first, 40–60 words
  tip: string;
  lat: number;
  lng: number;
};

export const places: Place[] = [
  {
    slug: 'pookode-lake',
    name: 'Pookode Lake',
    image: 'places/pookode-lake',
    km: 3,
    drive: '10 min',
    type: 'Lake',
    bestFor: 'Families, a slow first evening',
    summary:
      'Pookode Lake is a natural freshwater lake ringed by evergreen forest, about 3 km from Vythiri. You can hire pedal or row boats, walk the shaded path around the water and buy local spices and honey at the stalls near the gate. It is the easiest outing on arrival day.',
    tip: 'Go before 10 am, when the water is still and the boats are quiet.',
    lat: 11.5426,
    lng: 76.0272,
  },
  {
    slug: 'chembra-peak',
    name: 'Chembra Peak',
    image: 'places/chembra-peak',
    km: 20,
    drive: '45 min',
    type: 'Trek',
    bestFor: 'Fit walkers, sunrise views',
    summary:
      'Chembra Peak is the highest point in Wayanad at about 2,100 m. The guided forest-department trek starts near Meppadi and climbs through grassland to a heart-shaped lake. Treks need a permit from the forest office, run only in the morning and close in heavy rain or fire season.',
    tip: 'Reach the forest office by 7 am; daily permits are limited.',
    lat: 11.513,
    lng: 76.088,
  },
  {
    slug: 'soochipara-falls',
    name: 'Soochipara Falls',
    image: 'places/soochipara-falls',
    km: 27,
    drive: '1 hr',
    type: 'Waterfall',
    bestFor: 'Waterfall swims after the monsoon',
    summary:
      'Soochipara Falls, also called Sentinel Rock Falls, drops in three tiers through forest near Meppadi. A walk of about 1 km on steps and a forest path leads down to the pool at the base. It is at its fullest from August to November; entry can close after very heavy rain.',
    tip: 'Wear shoes with grip; the last stretch of rock is wet all year.',
    lat: 11.5103,
    lng: 76.1627,
  },
  {
    slug: 'banasura-sagar-dam',
    name: 'Banasura Sagar Dam',
    image: 'places/banasura-sagar-dam',
    km: 25,
    drive: '50 min',
    type: 'Dam and reservoir',
    bestFor: 'Speedboats, island views, families',
    summary:
      'Banasura Sagar is often described as the largest earth dam in India. Its reservoir has scattered islands with the Banasura hills behind them. Visitors walk the dam top, take speedboat or pedal-boat rides and in clear weather hike part of Banasura Hill with a local guide.',
    tip: 'Late afternoon light on the islands is the best for photos.',
    lat: 11.6713,
    lng: 75.9578,
  },
  {
    slug: 'meenmutty-falls',
    name: 'Meenmutty Falls',
    image: 'places/meenmutty-falls',
    km: 35,
    drive: '1 hr 15 min',
    type: 'Waterfall',
    bestFor: 'A short jungle walk to a big drop',
    summary:
      'Meenmutty Falls is a tall, multi-tier waterfall south of Meppadi, reached by a short walk through forest and plantation. It flows hardest from July to October. The forest department sometimes closes the path during the monsoon, so check that it is open before you set out.',
    tip: 'Combine it with Chembra or Soochipara on the same day.',
    lat: 11.465,
    lng: 76.205,
  },
  {
    slug: 'edakkal-caves',
    name: 'Edakkal Caves',
    image: 'places/edakkal-caves',
    km: 40,
    drive: '1 hr 15 min',
    type: 'Heritage',
    bestFor: 'History, a steep morning climb',
    summary:
      'Edakkal Caves sit near the top of Ambukuthi Mala, near Sulthan Bathery. Inside a rock cleft, carved figures, animals and symbols cover the walls; some are thought to be several thousand years old. Reaching them takes a steep climb of about 45 minutes from the parking area.',
    tip: 'Entry tickets are limited each day; arrive early and carry water.',
    lat: 11.625,
    lng: 76.236,
  },
  {
    slug: 'kuruva-island',
    name: 'Kuruva Island',
    image: 'places/kuruva-island',
    km: 55,
    drive: '1 hr 45 min',
    type: 'River island',
    bestFor: 'Bamboo rafts, birdwatching',
    summary:
      'Kuruva Island is a group of forested river islands on the Kabini, near Mananthavady. You cross by bamboo raft or along a hanging bridge and walk shaded trails between streams. The number of visitors is capped each day, and the islands are usually closed during the peak monsoon months.',
    tip: 'Check that the islands are open before driving out.',
    lat: 11.816,
    lng: 76.097,
  },
  {
    slug: 'muthanga-wildlife-sanctuary',
    name: 'Muthanga Wildlife Sanctuary',
    image: 'places/muthanga-wildlife-sanctuary',
    km: 55,
    drive: '1 hr 30 min',
    type: 'Wildlife',
    bestFor: 'Jeep safari, elephants',
    summary:
      'Muthanga is the southern part of Wayanad Wildlife Sanctuary, on the border with Bandipur and Mudumalai. Forest-department jeep safaris run in the morning and afternoon. Wild elephants, gaur, deer and langurs are common sightings; tigers are seen far less often.',
    tip: 'Safari jeeps fill fast; reach the counter 30 minutes before it opens.',
    lat: 11.67,
    lng: 76.38,
  },
  {
    slug: 'tholpetty-wildlife-sanctuary',
    name: 'Tholpetty Wildlife Sanctuary',
    image: 'places/tholpetty-wildlife-sanctuary',
    km: 70,
    drive: '2 hr',
    type: 'Wildlife',
    bestFor: 'Quieter safaris, gaur herds',
    summary:
      'Tholpetty is the northern range of Wayanad Wildlife Sanctuary, close to the Karnataka border and Nagarhole. Its forest-department jeep safaris are usually quieter than Muthanga. Gaur, spotted deer, elephants and peafowl are common. It pairs well with a visit to Thirunelli Temple.',
    tip: 'Plan Tholpetty and Thirunelli as one long day trip.',
    lat: 11.93,
    lng: 76.05,
  },
  {
    slug: 'thirunelli-temple',
    name: 'Thirunelli Temple',
    image: 'places/thirunelli-temple',
    km: 75,
    drive: '2 hr 15 min',
    type: 'Temple',
    bestFor: 'Architecture, a forest setting',
    summary:
      'Thirunelli is an ancient Vishnu temple in a valley of the Brahmagiri hills, surrounded by forest. Pilgrims come to perform rites at the Papanasini stream nearby. The granite columns and the quiet setting draw visitors of every faith. Follow the temple dress code inside.',
    tip: 'The road through the forest is beautiful early in the morning.',
    lat: 11.9135,
    lng: 75.9955,
  },
];

export const towns = [
  { name: 'Vythiri', lat: 11.553, lng: 76.041, base: true },
  { name: 'Kalpetta', lat: 11.608, lng: 76.083 },
  { name: 'Sulthan Bathery', lat: 11.6655, lng: 76.2626 },
  { name: 'Mananthavady', lat: 11.8014, lng: 76.0044 },
  { name: 'Meppadi', lat: 11.553, lng: 76.135 },
];

export const reach: { from: string; km: string; time: string; note: string; href?: string }[] = [
  { from: 'Kozhikode International Airport (CCJ)', km: '90 km', time: '2.5–3 hr', note: 'Nearest airport; via Thamarassery Ghat', href: '/kozhikode-to-wayanad/' },
  { from: 'Kozhikode railway station', km: '65 km', time: '2 hr', note: 'Nearest major railway station; Wayanad has no railway', href: '/kozhikode-to-wayanad/' },
  { from: 'Kannur International Airport (CNN)', km: '100 km', time: '3 hr', note: 'Via Nedumpoyil Ghat and Mananthavady' },
  { from: 'Mysuru', km: '150 km', time: '3.5–4 hr', note: 'Via Gundlupet and Sulthan Bathery', href: '/mysore-to-wayanad/' },
  { from: 'Bengaluru', km: '290 km', time: '6.5–7 hr', note: 'Via Mysuru; the Bandipur forest stretch is closed to traffic from 9 pm to 6 am', href: '/bangalore-to-wayanad/' },
  { from: 'Kochi', km: '260 km', time: '6–7 hr', note: 'Via Thrissur and Kozhikode, or train to Kozhikode', href: '/kochi-to-wayanad/' },
];
