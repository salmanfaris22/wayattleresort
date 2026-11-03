# SEO audit: Wayanad resort website

Date: 3 November 2026 · Site: `~/Documents/resort` (Astro 7.4.5, static, Vercel) · Business: one resort in Vythiri, Wayanad (name and facts are **placeholders**, see `src/data/site.ts`)

## How this audit was done

| Source | What it gave us |
|---|---|
| Code review of the repo | Routes, layouts, metadata, schema, images, fonts, forms, sitemap, robots, hosting config |
| `astro build` + `scripts/seo-check.mjs` | Titles, descriptions, H1s, canonicals, links, JSON-LD, sitemap consistency |
| Lighthouse 12 (mobile + desktop) on `astro preview` | Performance, accessibility, best practices, SEO for every page |
| Playwright crawl at 390 / 820 / 1440 px | Horizontal scroll, console errors, WhatsApp links, enquiry form, gallery |
| Google autocomplete + "People also search for" (owner's screenshot) | Real query wording: *with swimming pool, for family with swimming pool, budget friendly, for couples, vythiri* |
| Web searches on 3 Nov 2026 | Who ranks for the main clusters and what those pages contain |

Not available: Search Console, Bing Webmaster Tools, GA4, keyword volume tools, a live domain. Nothing below claims rankings, traffic or search volumes.

## Executive summary

| Area | State | Note |
|---|---|---|
| Technical foundation | Strong | Static HTML, about 0 KB of external JS, AVIF/WebP, inline CSS, self-hosted fonts, Lighthouse 99–100 |
| Indexing | **Not indexed** | Site is not deployed, no domain, no Search Console. Nothing can rank yet |
| Business facts (NAP) | **Placeholder** | Name, address, map pin, email, prices, policies are placeholders. Local SEO cannot work until they are real and match the Google Business Profile |
| Photos | **Room photos are stock** | Marked "Sample photo" on the site. Real room photos are needed for trust, Google Images and the hotel pack |
| Keyword coverage | Was narrow, now broad | Before this pass only the home page targeted "best resort in Wayanad". Nine intent pages were added |
| Local pack / Google Hotels | **Missing** | For "resort in Wayanad" queries, Google shows a hotel map pack with prices and ratings above organic results. That needs a Google Business Profile and Hotel Center, not website changes |
| Reviews | None | No reviews, so no rating anywhere. Start collecting honest Google reviews after launch |
| Conversion tracking | Was none | Events now fire for WhatsApp, phone and enquiry; GA4 needs an ID |

### Top 5 priorities

1. Replace every placeholder in `src/data/site.ts` and `src/content/` (`pnpm check:launch` lists them), add real photos, and set `SITE_URL`.
2. Deploy to Vercel on the real domain, verify it in Google Search Console and Bing Webmaster Tools, and submit the sitemap.
3. Create and verify the Google Business Profile (category "Resort hotel"), with the same name, address and phone as the site. Then enable free booking links in Google Hotel Center.
4. Ask real guests for Google reviews, using a neutral request with no incentives.
5. Get listed with consistent NAP on Kerala Tourism's accommodation directory, TripAdvisor, Booking.com, MakeMyTrip/Goibibo and Agoda.

## Current condition before this pass

| Item | Before |
|---|---|
| Routes | 12: home, rooms index, 4 room pages, places guide, where-to-stay, best-time, contact, privacy, 404 |
| Rendering | Static (`output: 'static'`), `trailingSlash: 'always'` |
| Metadata | Unique title, description and canonical per page; OG and Twitter tags; `en-IN` |
| Schema | WebSite, Resort, HotelRoom + Offer, BreadcrumbList, ItemList (places), FAQPage. No ratings |
| Sitemap / robots | `@astrojs/sitemap` (no lastmod, no images); robots allows search and AI-search bots |
| Forms | Enquiry form sends dates, guests and room to WhatsApp. No name or phone fields |
| Analytics | Vercel Analytics component, off by default. No conversion events |
| Hosting config | `vercel.json`: immutable cache for `/_astro/*`, HSTS, CSP, nosniff, Referrer-Policy |

## Technical findings

| # | Issue | Impact | Evidence | Fix | Status |
|---|---|---|---|---|---|
| T1 | Site not deployed; canonical host is a placeholder (`mistvale-wayanad.vercel.app`) | High | `astro.config.mjs` | Set `SITE_URL` on Vercel, deploy, verify in GSC/Bing | Owner |
| T2 | LCP 2.0–2.2 s on mobile for home, rooms and tree house (simulated 4G) | Medium | Lighthouse: home 99 (LCP 2.2 s), rooms 99 (2.0 s), tree house 99 (2.0 s) | Lowered AVIF quality for hero and below-the-fold images | Fixed |
| T3 | Contrast failure: WhatsApp button text on tea background | Medium | Lighthouse a11y 95 on the places guide (1.3:1) | Section link colour no longer overrides `.btn` | Fixed |
| T4 | Horizontal scroll on mobile (contact, privacy) | Medium | Playwright: 206 px and 254 px overflow | `min-width: 0` on grid children; positioned table scroller | Fixed |
| T5 | Images did not fill their frames (gallery, bento, room rows) | Low | Screenshots | `picture { display: contents }` | Fixed |
| T6 | No `lastmod` or image entries in the sitemap | Low | `dist/sitemap-0.xml` | Content-hash `lastmod`, `<image:image>` entries, hreflang | Fixed |
| T7 | No automated SEO regression checks | Medium | — | `scripts/seo-check.mjs` runs after every build | Fixed |
| T8 | No IndexNow | Low | — | Key route + `scripts/indexnow.mjs` (post-deploy) | Added |
| T9 | Vercel preview URLs could be indexed | Low | — | Vercel sends `X-Robots-Tag: noindex` on preview deployments by default; production builds are blocked until placeholders are replaced | OK |

## On-page findings

| # | Issue | Impact | Fix | Status |
|---|---|---|---|---|
| O1 | Only the home page targeted commercial queries; family, couples, pool, private, group, 10-person, price, Vythiri and activity searches had no matching page | High | 9 landing pages from `src/content/landing/`, each with its own copy, FAQs and live prices | Fixed |
| O2 | No price page, while "with price", "rates" and "low rate" queries are common | High | `/wayanad-resort-prices/` + `/pricing.md` | Fixed |
| O3 | Group capacity was not stated anywhere | High | Capacity planner (`src/lib/inventory.ts`) shows real room plans for 5, 10, 12 and 15 guests | Fixed |
| O4 | No Malayalam content | Medium | `/ml/` with reciprocal hreflang to `/` | Fixed (owner to proofread) |
| O5 | Weak internal links to deeper pages | Medium | Header (Prices, Groups), footer "Find your stay", home "Find the right stay", related pages on rooms and landing pages | Fixed |
| O6 | No visible "last updated" dates | Low | Answer box and trust block show the page's update date | Fixed |

## Local SEO findings

| Check | State | Action |
|---|---|---|
| Name, address, phone on site | Placeholder name and address; real phone | Replace in `site.ts`; use exactly the same format everywhere |
| Map pin | Placeholder coordinates | Copy the exact pin from Google Maps into `site.geo` and `site.mapsUrl` |
| Google Business Profile | Not created | See checklist below |
| Location pages | Only `/resorts-in-vythiri/` (where the resort is) | No pages for Kalpetta, Meppadi, Sulthan Bathery or Mananthavady: the resort is not there. The area guide compares them honestly |
| Reviews | None | Neutral review requests after checkout; reply to every review |
| Citations | None | Kerala Tourism accommodation directory, TripAdvisor, Booking.com, MakeMyTrip, Goibibo, Agoda, Justdial |

### Google Business Profile checklist

1. Create or claim the profile at business.google.com with the **real** resort name (no keywords added to the name).
2. Primary category **Resort hotel**; secondary only if true (for example Hotel, Cottage).
3. Address exactly as on the website; drop the pin on the gate, not the town centre.
4. Phone `+91 90610 79722`, website = home page URL, booking link = WhatsApp or the site.
5. Hotel attributes: pool, free Wi-Fi, free parking, restaurant, breakfast, check-in and check-out times. Only what is true.
6. Upload at least 20 real photos (exterior, each room type, pool, food, views). Add more each month.
7. Description in plain words (750 characters): estate in Vythiri, room types, what is nearby. No prices or links.
8. Verify the profile; then connect **Google Hotel Center** for free booking links and prices in the hotel pack.
9. Get the review link and share it with every guest after checkout. No incentives, no filtering of unhappy guests.
10. Reply to every review within a few days; post updates or offers monthly.

## Content gaps and keyword opportunities

The full list of 156 keywords, intents, target pages and notes is in [`seo-keyword-map.csv`](./seo-keyword-map.csv). Search volume and competition are marked **Not verified**: no keyword tool data was available, so no numbers were invented.

| Cluster | Target page | Evidence |
|---|---|---|
| Best resort / resort in Wayanad | `/` | Autocomplete |
| Family, family + pool | `/family-resorts-in-wayanad/` | Owner's list + autocomplete |
| Couples, private pool for couples | `/resorts-in-wayanad-for-couples/` | Owner's list + autocomplete |
| Swimming pool | `/resorts-in-wayanad-with-swimming-pool/` | Autocomplete ("with swimming pool", "with pool") |
| Private resort | `/private-resort-in-wayanad/` | Owner's list |
| Groups, friends | `/group-stays-in-wayanad/` | Brief |
| 10 people | `/resort-in-wayanad-for-10-people/` | Owner's list (8 variants) |
| Price, rates, low rate | `/wayanad-resort-prices/` | Owner's list + screenshot query |
| Vythiri | `/resorts-in-vythiri/` | Autocomplete + owner's list |
| Activities, campfire | `/wayanad-resort-activities/` | Owner's list + brief |
| Malayalam | `/ml/` | Brief |

### What ranks today (web searches, 3 Nov 2026)

- Booking sites (Booking.com, Expedia, Agoda, Airbnb, Thrillophilia) dominate price and "budget" queries.
- Individual resorts rank with intent pages and blog posts: ABAD Brookside has "best resort in Wayanad for family" and "Wayanad resort with private pool" pages; The Woods Resorts publishes many "best resort in Wayanad for …" posts.
- Kerala Tourism's accommodation directory lists resorts in Vythiri, so it is a citation worth getting.
- Budget pool stays in Wayanad start around ₹1,800–3,600 on booking sites, so "under ₹1,000 with pool" is not a realistic promise for anyone.

### Deliberately not targeted

| Query type | Reason |
|---|---|
| Other businesses' brands (Vythiri Village Resort, Vythiri Resort, Taj, Mountain Shadow) | Using another brand would mislead guests. Only target if this **is** the owner's resort |
| "5 star resorts in Wayanad" | No official star rating |
| "Under ₹1,000 with pool" | Not our price |
| "Private pool villa with waterfall", "waterfall view" | No waterfall on the estate |
| Fake town pages (Kalpetta, Meppadi …) | Resort is not there; Google treats these as doorway pages |
| Hybrid combinations (town × size × amenity URLs) | Thin, near-duplicate pages; risk of a site-wide quality penalty |
| AggregateRating / Review markup | No real reviews; self-serving review markup breaks Google's guidelines |

## Prioritised action plan

| Priority | Action | Owner |
|---|---|---|
| Critical | Real name, address, pin, email, prices, policies, room data; real photos; `SITE_URL` | Owner + developer |
| Critical | Deploy on the real domain; GSC + Bing verification; submit sitemap | Developer |
| High | Google Business Profile + Hotel Center; first 10 honest reviews | Owner |
| High | Citations with identical NAP (Kerala Tourism, TripAdvisor, OTAs) | Owner |
| Medium | GA4 ID and key events; monthly check of GSC queries | Developer |
| Medium | Malayalam page proofread; add more Malayalam pages only if `/ml/` gets impressions | Owner |
| Later | Guides with first-hand detail (monsoon trip report, kids' itinerary, food guide) with real photos | Owner + writer |
