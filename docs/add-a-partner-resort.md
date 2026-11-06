# Add a partner resort by name

Every page-1 result for "resorts in wayanad" names real resorts. The site can now do the same: each named partner resort gets a card in a filterable list at the top of the home page and its own page at `/resorts/<slug>/`. Nothing shows until the first resort is added.

## 1. Ask the owner for this (per resort)

| Item | Why | Example |
|---|---|---|
| Permission to name the resort on the site: who agreed, and the date | Required; we never list a resort without it | "Manager Anil, 10 Nov 2026" |
| 3 to 10 photos the resort owns or we took, at least 1600 px wide | Real photos win trust and image search; never copy from booking sites | pool, room, view, food, outside |
| Area and nearest village | Area filter and the page title | Vythiri area, Lakkidi |
| Stay types | Links to the stay-type pages | pool villa, tree house |
| Smallest and largest group per booking | Guests filter | 2 to 6 |
| Pool: private, shared or none | Pool filter | private |
| Best for: families, couples, groups | Trip filter | couples, families |
| Budget level: private, luxury, affordable or budget | Budget filter | luxury |
| Lowest normal rate per night (optional) | Shown only if `site.showPrices` is turned on | 9000 |
| 300+ words in our own words: setting, rooms, food, what a stay is like, what stands out | Pages under 300 words are blocked | — |
| Honest "good to know": road and last stretch, steps, food timings, rules, mobile signal | Saves guests from surprises; builds trust | "Last 1 km is a steep jeep track" |

Ask the resort to add a line on its own website: "Also bookable via Resort in Wayanad", linking to https://www.resortinwayanad.in/. That link helps both sites.

## 2. Add it (developer)

1. Prepare the photos: put only the new originals in a folder such as `new-photos/stays/`, named `<slug>-pool.jpg`, `<slug>-room.jpg` and so on, then run `node scripts/prepare-images.mjs new-photos` (resizes and strips location data). They land in `src/assets/images/stays/`.
2. Add an entry to `src/data/stays.ts`:

```ts
{
  slug: 'example-hill-resort',
  name: 'Example Hill Resort',
  permission: { by: 'Manager name', date: '2026-11-10' },
  area: 'vythiri',
  locality: 'Lakkidi',
  types: ['pool-villa'],
  tier: 'luxury',
  sleeps: { min: 2, max: 4 },
  pool: 'private',
  bestFor: ['couples', 'family'],
  priceFrom: 9000,
  photos: [
    { key: 'stays/example-hill-resort-pool', alt: 'Private pool on the villa deck at dusk', caption: 'The villa pool' },
    { key: 'stays/example-hill-resort-room', alt: 'King bed facing a glass wall and the valley', caption: 'Bedroom' },
    { key: 'stays/example-hill-resort-view', alt: 'Morning mist over the valley from the deck', caption: 'View from the deck' },
  ],
  about: ['…', '…'],
  highlights: ['…'],
  goodToKnow: ['…'],
  lastChecked: '2026-11-10',
},
```

3. `pnpm build`. The build stops with the reason if anything is missing (permission, fewer than 3 photos, under 300 words, bad dates, duplicate name). Then commit and push; the page goes live and is sent to search engines automatically.
4. Every 3 months, or when something changes, confirm the details with the resort and update `lastChecked`.

## Rules

- Only resorts we really book, with permission. No pages for resorts we can't book.
- No star ratings or review scores unless they come from real, permitted reviews.
- Each page says plainly that Resort in Wayanad is a booking service, not the resort's own website.
- Area pages (for example "resorts in Kalpetta") only once an area has 5 or more listed resorts.
