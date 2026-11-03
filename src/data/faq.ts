import { site, fmtTime } from './site';

// Answer-first, 40–60 words each. Shown on the page and used for FAQPage schema.
export const faq = [
  {
    q: 'What are the check-in and check-out times?',
    a: `Check-in is from ${fmtTime(site.checkIn)} and check-out is by ${fmtTime(site.checkOut)}. If you arrive early after an overnight drive, message us on WhatsApp; when the room is free we will let you in early, and you can always leave bags and have breakfast while you wait.`,
  },
  {
    q: 'What is the best time to visit Wayanad?',
    a: 'October to May has the most dependable weather: clear mornings, cool nights and every trek open. December and January are the coolest months. June to September is the monsoon, when the hills are greenest and the waterfalls are full, but some treks and Kuruva Island close.',
  },
  {
    q: 'Is Wayanad worth visiting in the monsoon?',
    a: 'Yes, if you want rain, mist and quiet. From June to September the tea hills turn bright green and rates are lower. Plan for slow days: a few treks and river spots close, roads can be slippery, and short power cuts happen. Waterfalls such as Soochipara are at their fullest after the rains.',
  },
  {
    q: 'How do I book a room?',
    a: `Send us a message on WhatsApp at ${site.phone} with your dates, number of guests and the room you like. We reply with availability and the total price, then confirm the booking with a part advance. There is no booking fee and no middleman.`,
  },
  {
    q: 'Is the resort good for families with children?',
    a: 'Yes. The family suite sleeps four, the pool has a shallow end, and the plantation paths are safe for children with an adult. Extra mattresses are available on request. The tree house has steep stairs, so we suggest it only for couples or families with older children.',
  },
  {
    q: 'Are meals included?',
    a: 'Breakfast is included with every room. Lunch and dinner are served in the restaurant: mostly Kerala food such as appam with stew, fish curry and a banana-leaf meal, plus a few North Indian dishes. Tell us about allergies or vegetarian needs when you book.',
  },
  {
    q: 'Is there parking, and can a bus or tempo traveller reach the resort?',
    a: 'Free parking is available inside the property for cars and tempo travellers. Large buses should stop on the main road, and we send a jeep to bring luggage and guests up. The last 300 m is a narrow plantation road.',
  },
  {
    q: 'Are pets allowed?',
    a: 'Please ask before you book. Because of the open plantation and the working dogs on the estate, we accept well-behaved pets only in the plantation cottage and only on request.',
  },
];
// TODO(launch): owner to confirm every answer above (times, meals, pets, parking, families).
