# SEO, local SEO, AEO and GEO implementation report

Date: 3 November 2026 · Repo: `salmanfaris22/wayattleresort` · Stack: Astro 7.4.5 static site on Vercel

This pass turned a fast single-resort site into a small, data-driven SEO system: intent landing pages built from real room data, live capacity and price calculations, stronger structured data, an automatically maintained sitemap, IndexNow, conversion tracking and automated quality checks. The existing design, routes and booking flow were kept.

> Business facts (name, address, map pin, prices, policies, facilities, room photos) are still **placeholders**. They are marked `TODO` in the code; `pnpm check:launch` lists all of them and production builds fail until they are replaced. Nothing on the site should go live before that.

## 1. What was asked and what was built

| Brief asked for | Built | Not built, and why |
|---|---|---|
| Programmatic landing pages | 9 intent pages from `src/content/landing/*.md` + one template, behind a quality gate | No pages for every town × size × amenity combination: thin doorway pages |
| Location pages | `/resorts-in-vythiri/` (where the resort is) | Kalpetta, Meppadi, Sulthan Bathery, Mananthavady: the resort is not there. The area guide covers them honestly |
| Capacity pages (5/10/15/20) | `/resort-in-wayanad-for-10-people/` + `/group-stays-in-wayanad/` with live plans for 5, 10, 12, 15 | 20 people: over capacity (max 16), so the page says so instead of promising it |
| Express.js routes, `/resorts/search/:combo` | Astro static routes (the site has no server) | Hybrid combination URLs: thin and near-duplicate |
| AggregateRating / Review schema | — | No real reviews. Self-serving review markup breaks Google's rules. The SEO check now fails the build if it appears |
| Keyword targets like "5 star", "under ₹1,000", competitor brand names | Listed in the keyword map as "Not targeted" with the reason | False or misleading for this resort |
| Enquiry with name and number → WhatsApp | Name + phone + dates + guests + room, message pre-filled, mobile Call/WhatsApp bar | — |
| Image indexing | Descriptive file names, alt text, `<image:image>` sitemap entries, credits | — |
| Malayalam | `/ml/` with reciprocal hreflang | More Malayalam pages only if `/ml/` earns impressions |

## 2. New and changed routes

| Route | Target intent | Status |
|---|---|---|
| `/family-resorts-in-wayanad/` | Best resort in Wayanad for family (with pool, with price, budget) | New |
| `/resorts-in-wayanad-for-couples/` | Resort for couples, private pool for couples, honeymoon | New |
| `/resorts-in-wayanad-with-swimming-pool/` | Resort with swimming pool / with pool, low rate with pool | New |
| `/private-resort-in-wayanad/` | Private resort, whole-estate booking, private pool | New |
| `/group-stays-in-wayanad/` | Group stay, friends, 5–16 guests | New |
| `/resort-in-wayanad-for-10-people/` | 10 person resort (price, pool, family, couples) | New |
| `/wayanad-resort-prices/` | Price list, rates, "with price", low rate | New |
| `/resorts-in-vythiri/` | Resort in Vythiri, Vythiri prices and contact, near Pookode Lake | New |
| `/wayanad-resort-activities/` | Resort with activities, campfire, barbecue | New |
| `/ml/` | Malayalam searches (വയനാട് റിസോർട്ട് …) | New |
| `/pricing.md` | Plain-markdown rate card for AI assistants | New |
| `/<INDEXNOW_KEY>.txt` | IndexNow ownership file (only when the env var is set) | New |
| `/`, `/rooms/*`, guides, `/contact/`, `/privacy/`, `/404` | Unchanged URLs; more internal links, Malayalam alternate on `/` | Updated |

No existing URL changed, so no redirects were needed.

## 3. How the landing page engine works

```
src/content/landing/<slug>.md   frontmatter: seoTitle, description, h1, answer, rooms, plans, faqs, related, requires …
        │                        body: the page's own editorial sections (Markdown)
        ▼
src/lib/landing.ts              quality gate → only passing pages are built (and so reach the sitemap)
        │                        {{tokens}} → live prices, capacities and policies (never stale)
        ▼
src/pages/[landing].astro       hero → answer box → matching rooms → plan/price tables → body
                                 → facilities → policies → places nearby → FAQ → enquiry form
                                 → related pages → trust block (NAP, last updated)
```

Quality gate (a page is skipped, with the reason printed in the build log, if any check fails):

| Check | Why |
|---|---|
| `status: published` | Drafts never go live |
| Required facilities exist in `site.facilities` | No pool page without a pool |
| `requires.minGuests` can be hosted by real rooms | No "10 people" page if the resort cannot sleep 10 |
| `requires.location` matches the resort's locality | No fake location pages |
| Every listed room exists | No dead room cards |
| At least 350 words of page-specific copy | No thin pages |
| Title, description and H1 unique across pages; slug not reserved | No duplicates or route clashes |

The capacity planner (`src/lib/inventory.ts`) checks every combination of room units and picks the fewest rooms at the lowest total, adding extra mattresses only where a room allows them. With the current placeholder data: 10 guests → 2 × Plantation Cottage + Family Suite, ₹23,500 a night (₹2,350 each); the whole resort sleeps 15, or 16 with a mattress.

## 4. Structured data

| Page type | JSON-LD (`@graph`) |
|---|---|
| Every page | `WebSite`, `Resort` (LodgingBusiness: name, address, geo, phone, check-in/out, price range, amenities, contact point) |
| Room pages | `HotelRoom` (bed, occupancy, floor size, amenities) + `Offer` (price per night) + `BreadcrumbList` |
| Landing pages | `WebPage` (about → the Resort, `dateModified`) + `BreadcrumbList` + `ItemList` of the real `HotelRoom` entities + `FAQPage` (same questions as on the page) |
| Places guide | `ItemList` of `TouristAttraction` + `BreadcrumbList` |
| `/ml/` | `WebPage` + `FAQPage` (`inLanguage: ml-IN`) |

Never added: ratings, reviews, awards, star ratings. Landing pages describe the one real resort and its rooms; they do not invent extra "resorts". Validate after deploy with the Schema Markup Validator and Google's Rich Results Test (FAQ rich results are limited by Google, but FAQ markup still describes the page for other engines).

## 5. Sitemap, robots and indexing

| Item | Implementation |
|---|---|
| Sitemap | `@astrojs/sitemap` → `/sitemap-index.xml`; every built, indexable page is included automatically. Pages that fail the quality gate are not built, so they cannot appear |
| `lastmod` | `seo/sitemap-extras.mjs` hashes each page's visible text; the date changes only when the text changes (stored in `seo/lastmod.json`, commit it) |
| Images | Up to 12 `<image:image>` entries per page (largest JPEG of each photo) |
| hreflang | `/` ↔ `/ml/` in HTML `<link>` tags and in the sitemap, with `x-default` |
| Noindex | 404 page is `noindex` and excluded; the SEO check fails the build if a noindex page ever appears in the sitemap |
| robots.txt | Allows search and AI-search bots, points to the sitemap |
| IndexNow | `INDEXNOW_KEY` publishes `/<key>.txt`. After a production deploy, `pnpm indexnow` submits only new, changed or removed URLs to api.indexnow.org, logs to `seo/indexnow.log`, and never fails a deploy. `--dry-run` to preview |
| Google | Submit the sitemap in Search Console. Use URL Inspection → Request indexing for important new pages. The Google Indexing API is not used (it is only for job postings and live streams). Sitemaps help discovery but do not guarantee indexing |

## 6. Local SEO

- One source of truth for NAP: `src/data/site.ts` feeds the footer, contact page, trust block on every landing page, schema, `llms.txt` and `pricing.md`, so they cannot drift apart.
- `geo.region` / `geo.position` meta tags, `GeoCoordinates` in schema, and a map link on the contact page.
- `/resorts-in-vythiri/` is the only location page, because the resort is in Vythiri. Other towns are covered by the honest area comparison at `/where-to-stay-in-wayanad/`.
- Google Business Profile, Hotel Center and citation checklists: see `docs/seo-audit.md`.

## 7. AEO and GEO

| Practice | Where |
|---|---|
| Question heading plus a 40–60 word answer that makes sense on its own | Answer box at the top of every landing page; FAQ answers |
| Tables for comparisons, prices, capacities, distances | Plan table, price table, pool comparison, villa vs tree house, activities table, places table |
| Real numbers from live data | `{{tokens}}` fill prices, group totals and capacities at build time |
| Dated content | "Updated" date on each landing page; `dateModified` in schema |
| Honest limits (no kids pool, no waterfall, max 16 guests, not under ₹1,000) | FAQs on the relevant pages |
| Machine-readable summaries | `/llms.txt` (now lists every landing page with its answer), `/pricing.md` (rates, group plans, policies) |
| Consistent naming | Same room names, prices and facts on every page, from one data source |

No AI citations or rankings are promised. Google states its AI features use normal Search ranking, so the same people-first content serves both.

## 8. Conversion and analytics

| Event | Fires when | Data sent |
|---|---|---|
| `whatsapp_click` | Any link to wa.me or api.whatsapp.com | `page`, `where` (section id or `bar-whatsapp`) |
| `phone_click` | Any `tel:` link | `page`, `where` |
| `enquiry_submit` | Enquiry form submitted | `page` |

Events go to `window.dataLayer`, GA4 (`gtag`, only when `PUBLIC_GA4_ID` is set) and Vercel Analytics (when enabled). No name, phone or dates are ever sent to analytics; the form's details go only into the guest's own WhatsApp message.

**GA4 setup:** create a GA4 property → copy the measurement ID (`G-XXXXXXX`) → add `PUBLIC_GA4_ID` in Vercel → redeploy → in GA4 Admin → Events, mark `whatsapp_click`, `phone_click` and `enquiry_submit` as key events. If GA4 is turned on, update the privacy page, which currently says the site sets no cookies.

## 9. Automated checks

| Script | When | Fails the build on |
|---|---|---|
| `scripts/check-launch.mjs` | before every build | Placeholders, but only on Vercel production or with `--strict` |
| Quality gate (`src/lib/landing.ts`) | during build | Duplicate titles, descriptions or H1s across landing pages; unknown `{{tokens}}` |
| `scripts/seo-check.mjs` | after every build | Missing title, description, canonical or H1; multiple H1s; wrong canonical; images without alt; broken internal links; invalid JSON-LD; rating/review markup; FAQ schema questions not visible on the page; non-reciprocal hreflang; noindex or missing pages in the sitemap; sitemap URL whose canonical differs; robots.txt without sitemap |

## 10. Test results

All numbers below are real runs from 3 Nov 2026 on `astro preview` (local), Lighthouse 12 with default simulated throttling. Re-run PageSpeed Insights on the live domain after launch.

| Check | Before (first build) | After (this pass) |
|---|---|---|
| Pages | 12 | 22 (21 indexable + 404) |
| Lighthouse runs at 100/100/100/100 | 19 of 24 | 41 of 42 |
| Lowest mobile Performance | 99 (home, rooms, tree house) | 99 (pool page, LCP 2.2 s) |
| Home mobile LCP / weight | 2.2 s / 484 KB | 1.8 s / 361 KB |
| Mobile LCP range | 1.1–2.2 s | 1.1–2.2 s (desktop 0.3–0.6 s) |
| CLS / TBT | 0–0.006 / 0 ms | ≤ 0.022 / ≤ 10 ms |
| Accessibility | 95 on places guide (contrast) | 100 everywhere |
| JavaScript on home | inline only | 2.7 KB inline, 0 external scripts; HTML 24.6 KB gzipped |
| `astro check` | 0 errors | 0 errors (59 files) |
| SEO check | — | 21 indexable pages, 21 sitemap URLs, 0 errors, 0 warnings |
| Playwright (22 pages × 390/820/1440 px) | overflow on 2 pages | no horizontal scroll, no console errors (404 page returns 404 as intended), 31 internal links OK, all WhatsApp links → 919061079722, enquiry message checked (name, phone, dates, nights, guests, room) |
| Vercel production build with placeholders | failed (launch guard) | passes in **staging mode** (all pages noindex, empty sitemap, preview banner) |

The 404 page scores SEO 66 in Lighthouse because it is deliberately `noindex`.

### Staging mode

| Situation | Result |
|---|---|
| Vercel build, placeholders remain (default) | Staging: every page `noindex, nofollow`, preview banner, no sitemap URLs, IndexNow skipped |
| Vercel build, no placeholders and `SITE_URL` set | Normal indexable site, automatically |
| `SITE_MODE=staging` | Force staging (e.g. a test domain) |
| `SITE_MODE=production` while placeholders remain on a production build | Build fails on purpose |
| Local build | Normal mode, so tests measure the real site |

## 11. Files

| File | Change |
|---|---|
| `src/content.config.ts` | Room fields `units`, `sleeps`, `flags`, `related`; new `landing` collection schema |
| `src/content/landing/*.md` (9) | New landing pages, each with its own copy and FAQs |
| `src/content/rooms/*.md` | Units, max guests, flags, related landing pages |
| `src/data/site.ts` | Facilities, whole-property booking, policies, extra mattress price, languages; nav adds Prices and Groups |
| `src/data/pages.ts` | Registry of hand-built pages for related links; reserved slugs |
| `src/lib/inventory.ts` | Room loading, totals, capacity planner |
| `src/lib/landing.ts` | Quality gate, token filler, cached list of published pages |
| `src/lib/schema.ts` | `webPageSchema`, `roomListSchema` |
| `src/pages/[landing].astro` | Landing template |
| `src/pages/ml/index.astro` | Malayalam page |
| `src/pages/pricing.md.ts` | Markdown rate card |
| `src/pages/[indexnowKey].txt.ts` | IndexNow key file |
| `src/pages/llms.txt.ts` | Adds landing pages, capacity, pricing.md, Malayalam page |
| `src/pages/index.astro` | hreflang alternates, "Find the right stay" links, price link |
| `src/pages/rooms/[slug].astro` | Related landing pages per room |
| `src/components/AnswerBox, RoomCard, PlanTable, PriceTable, FacilityList, PolicyList, RelatedPages, TrustBlock, MobileActionBar` | New |
| `src/components/EnquiryForm.astro` | Name and phone fields, optional dates, nights, page context, whole-resort option |
| `src/components/FloatingWhatsApp.astro` | Removed (replaced by the Call + WhatsApp bar) |
| `src/components/Footer.astro` | "Find your stay" column, Malayalam link |
| `src/components/PlaceTable.astro` | `only` filter |
| `src/layouts/Base.astro` | `lang` and hreflang props, geo meta, conversion events, optional GA4 |
| `src/styles/global.css` | Malayalam heading line height |
| `astro.config.mjs` | Sitemap `serialize` (lastmod, images, hreflang) |
| `seo/sitemap-extras.mjs`, `seo/lastmod.json` | Sitemap helpers and stored content hashes |
| `scripts/seo-check.mjs`, `scripts/indexnow.mjs`, `scripts/launch-status.mjs` | New (launch-status = shared placeholder check + staging mode) |
| `scripts/check-launch.mjs` | Staging instead of failing on Vercel; strict with `--strict` or `SITE_MODE=production` |
| `src/env.d.ts` | `__SITE_STAGING__` build flag |
| `vercel.json` | CSP allows GA4 if enabled |
| `package.json` | `postbuild`, `check:seo`, `indexnow` scripts; TypeScript 6 (needed by `astro check`) |
| `docs/seo-audit.md`, `docs/seo-keyword-map.csv`, this report, `README.md` | New / rewritten |

## 12. Deployment

1. Replace placeholders until `pnpm check:launch` passes. Add the resort's own photos to `raw-images/`, run `pnpm images`, set `stockPhoto: false`.
2. Vercel → New Project → import `salmanfaris22/wayattleresort` (framework Astro, build `pnpm build`, output `dist`).
3. Environment variables: `SITE_URL` (required), optionally `PUBLIC_GA4_ID`, `PUBLIC_ANALYTICS=true`, `INDEXNOW_KEY`.
4. Add the domain in Vercel; redirect the non-preferred host (www or apex) to the preferred one.
5. Deploy. While placeholders remain the site deploys in staging mode (noindex + banner); it becomes indexable automatically once `pnpm check:launch` passes and `SITE_URL` is set.
6. After the production deploy: `SITE_URL=… INDEXNOW_KEY=… pnpm indexnow` (from a machine with the latest `dist/`).

## 13. Google Search Console checklist

1. Add a **Domain** property for the real domain; verify with the DNS TXT record.
2. Sitemaps → submit `https://<domain>/sitemap-index.xml`.
3. URL Inspection → test live URL and request indexing for `/`, `/rooms/` and the 9 landing pages.
4. Pages report after 1–2 weeks: check "Crawled – currently not indexed" and "Duplicate" groups.
5. Performance: filter by page to see which queries each landing page gets; improve titles of pages ranking 8–20.
6. Core Web Vitals and HTTPS reports: should stay green.
7. Link GSC to GA4.

## 14. Bing Webmaster Tools checklist

1. Sign in at bing.com/webmasters → **Import from Google Search Console** (fastest) or verify by DNS.
2. Submit the sitemap index.
3. Set `INDEXNOW_KEY` and run `pnpm indexnow` after each deploy; check the IndexNow report in Bing.
4. Use URL Inspection and Site Scan once a month.

## 15. Open items for the owner

| Item | Where |
|---|---|
| Resort name, logo, address, map pin, email | `src/data/site.ts` |
| Room names, sizes, units, prices, beds, real photos | `src/content/rooms/*.md` |
| Facilities, pool size/depth/timings, campfire and barbecue terms | `src/data/site.ts` → `facilities` |
| Advance, cancellation, children, quiet hours | `src/data/site.ts` → `policies` |
| Every claim on the landing pages and FAQs | `src/content/landing/*.md`, `src/data/faq.ts` |
| Distances from the exact location | `src/data/places.ts` |
| Malayalam page proofreading | `src/pages/ml/index.astro` |
| Whether the resort is "Vythiri Village Resort" or "Vythiri Resort" (if so, brand pages can be added) | — |

## 16. Growth roadmap

| When | Work |
|---|---|
| Launch month | GBP + Hotel Center, 20+ real photos, first reviews, citations with identical NAP |
| Months 1–3 | Watch GSC queries per landing page; rewrite titles for pages in positions 8–20; add a page only when GSC shows a distinct intent with impressions |
| Months 2–6 | First-hand guides with real photos: monsoon stay diary, Wayanad with kids, a Kerala breakfast guide, Chembra trek day plan |
| Ongoing | Monthly AI-answer check (ChatGPT, Perplexity, Google AI Mode) for 10 core questions; keep prices and policies current (tokens update every page) |
