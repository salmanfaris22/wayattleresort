// The parts of Wayanad where we book resorts. Shared by the home page (Resorts in Wayanad by area),
// the area guide (/where-to-stay-in-wayanad/) and partner resort listings (src/data/stays.ts).

export type AreaId = 'vythiri' | 'kalpetta' | 'meppadi' | 'sulthan-bathery' | 'mananthavady';

export type Area = {
  id: AreaId;
  name: string;
  side: string;
  /** Who the area suits */
  for: string;
  /** Sights close by (each has a guide on the site or a row in src/data/places.ts) */
  near: string;
  pros: string;
  cons: string;
  /** Landing page about resorts in this area, when one exists */
  page?: string;
};

export const areas: Area[] = [
  {
    id: 'vythiri',
    name: 'Vythiri and Lakkidi',
    side: 'South, on the Kozhikode road',
    for: 'First visits, couples, short trips',
    near: 'Pookode Lake and Lakkidi viewpoint; Chembra Peak, Soochipara Falls and Banasura Sagar Dam within an hour',
    pros: 'Closest to Kozhikode; Pookode Lake, Chembra, Soochipara and Banasura within an hour; many tea and forest views.',
    cons: 'Weekend traffic on the ghat road; further from Muthanga and Tholpetty.',
    page: '/resorts-in-vythiri/',
  },
  {
    id: 'kalpetta',
    name: 'Kalpetta',
    side: 'Centre',
    for: 'Budget stays, shopping, hospitals',
    near: 'The district town, in the middle of Wayanad; Banasura, Chembra and Edakkal are easy day trips',
    pros: 'The district town, with hotels, restaurants and fuel. Central for day trips in every direction.',
    cons: 'A town, not a hill stay. Few views and more noise.',
  },
  {
    id: 'meppadi',
    name: 'Meppadi',
    side: 'South-east',
    for: 'Trekkers',
    near: 'Chembra Peak, Soochipara Falls and Meenmutty Falls',
    pros: 'Closest to Chembra Peak, Soochipara and Meenmutty; tea estates and homestays.',
    cons: 'Narrow roads; fewer places to eat in the evening.',
  },
  {
    id: 'sulthan-bathery',
    name: 'Sulthan Bathery',
    side: 'East, on the Mysuru road',
    for: 'Drivers from Bengaluru, wildlife safaris',
    near: 'Edakkal Caves and Muthanga Wildlife Sanctuary',
    pros: 'First town after the Bandipur forest; close to Edakkal Caves and Muthanga.',
    cons: 'Hotter and flatter; less mist than the south.',
  },
  {
    id: 'mananthavady',
    name: 'Mananthavady and Thirunelli',
    side: 'North',
    for: 'Wildlife, temples, quiet',
    near: 'Kuruva Island, Tholpetty Wildlife Sanctuary and Thirunelli Temple',
    pros: 'Near Kuruva Island, Tholpetty and Thirunelli Temple; deep forest.',
    cons: 'Far from the southern sights; patchy mobile signal.',
  },
];
