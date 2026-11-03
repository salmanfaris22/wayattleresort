# Wayanad resort website

Fast, static Astro 7 site for a resort in Vythiri, Wayanad, Kerala. Booking is by WhatsApp (`+91 90610 79722`). Hosted on Vercel.

> **Business facts are placeholders.** Replace everything that `pnpm check:launch` lists before going live. Until they are fixed, Vercel builds deploy in **staging mode**: every page is `noindex` and shows a preview banner.

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server (`astro dev --background` to run it in the background) |
| `pnpm build` | Launch check (warn) → build → SEO check (`scripts/seo-check.mjs`, fails on errors) |
| `pnpm preview` | Serve `dist/` locally |
| `pnpm check` | TypeScript + Astro diagnostics |
| `pnpm check:launch` | List every placeholder; exits 1 while any remain |
| `pnpm check:seo` | Re-run the SEO checks on `dist/` |
| `pnpm images` | Resize `raw-images/**` into `src/assets/images/**` and refresh photo credits |
| `pnpm indexnow` | After a production deploy: notify IndexNow about changed URLs |

## Where things live

| Path | Purpose |
|---|---|
| `src/data/site.ts` | ⭐ Name, address, phone, map pin, facilities, policies, prices of extras |
| `src/content/rooms/*.md` | One file per room type: guests, beds, units, price, photo, flags |
| `src/content/landing/*.md` | SEO landing pages (one search intent each) |
| `src/lib/inventory.ts` | Capacity planner: cheapest room plan for N guests |
| `src/lib/landing.ts` | Quality gate + `{{token}}` filler for landing pages |
| `src/pages/[landing].astro` | Template for landing pages |
| `src/lib/schema.ts` | JSON-LD builders (Resort, HotelRoom, Offer, WebPage, ItemList, FAQPage, BreadcrumbList) |
| `seo/sitemap-extras.mjs` | Sitemap `lastmod` (content hash), image entries, hreflang |
| `docs/` | SEO audit, keyword map, implementation report |

## Add a landing page

1. Copy a file in `src/content/landing/` and rename it to the URL slug (e.g. `honeymoon-resort-in-wayanad.md`).
2. Fill the frontmatter: unique `seoTitle` (≤ 62 chars), `description` (110–165), `h1`, `answer`, `faqs`, `rooms`, `related`, `requires`.
3. Write the body in Markdown: real, specific content only. Use `{{tokens}}` in frontmatter for live numbers: `{{price:pool-villa}}`, `{{planTotal:10}}`, `{{planPerPerson:10}}`, `{{planRooms:10}}`, `{{maxGuests}}`, `{{units}}`, `{{extraMattress}}`, `{{policy:cancellation}}`, `{{km:pookode-lake}}`.
4. `pnpm build`. The page is published only if it passes the quality gate: status `published`, required facilities exist, the resort can host the stated group size, at least 350 words, unique title/description/H1. Otherwise the build prints why and skips it, and it never reaches the sitemap.

## Environment variables (Vercel)

| Variable | Needed | Purpose |
|---|---|---|
| `SITE_URL` | Yes | Real domain, e.g. `https://www.yourresort.in` (canonicals, sitemap, OG) |
| `PUBLIC_GA4_ID` | Optional | GA4 measurement ID; loads gtag and sends conversion events |
| `PUBLIC_ANALYTICS` | Optional | `true` to load Vercel Web Analytics (enable it in the Vercel dashboard first) |
| `SITE_MODE` | Optional | `staging` to force noindex; `production` to require real data (fails if placeholders remain) |
| `INDEXNOW_KEY` | Optional | 8–128 letters/digits; publishes `/<key>.txt` and enables `pnpm indexnow` |

## Before launch

Real resort name + logo, full address and Google Maps pin, email, check-in/out, room names, sizes, units and prices, policies, the resort's own photos (set `stockPhoto: false`), social links, domain. Then `pnpm check:launch` must pass. Full checklist: `docs/seo-implementation-report.md`.

Photo credits for the Wayanad photographs (Wikimedia Commons, CC licences) are on `/privacy/`.
