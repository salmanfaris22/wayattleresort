# resortinwayanad.in SEO + AEO roadmap (10 phases)

Goal: when someone searches for a resort in Wayanad, or asks an AI assistant where to stay, Mistvale
Wayanad is the booking service they find, and everything it says is true.

Business: a resort booking service (broker) for many partner resorts across Wayanad. Booking on
WhatsApp +91 90610 79722. No public office, no email. Prices are confirmed per resort on WhatsApp.

Written 3 November 2026, the day the site went indexable.

## Files in this folder

| File | What it is |
|---|---|
| `keyword-map.csv` | Every keyword: cluster, geo, intent, priority, one target URL, page status, action |
| `keyword-summary.csv` | Keyword counts per cluster and its main page |
| `audit/intent-map.csv` | One query → one page; which page owns which search |
| `resortinwayanad-seo-keyword-map.xlsx` | Workbook: Read Me, Page Map, Keywords, Question Bank, AI Prompts, Content Calendar, Backlinks & Citations, Audit |
| `indexnow-key.txt`, `indexnow-state.json` | IndexNow key and last submission (Bing, Yandex…) |
| `lastmod.json`, `sitemap-extras.mjs` | Sitemap lastmod dates, images and hreflang |
| `../docs/seo-keyword-map.csv` | Original research list (input to keyword-map.csv) |

## Where we start (3 November 2026)

| Metric | Value |
|---|---|
| Indexable pages | 29 (sitemap: https://www.resortinwayanad.in/sitemap-index.xml) |
| Commercial landing pages | 8 live, 1 draft (prices) |
| Stay-type pages | 5 (pool villa, tree house, plantation cottage, family suite, couple stay) |
| Guides | 3 hub guides + 8 sight / route / season pages |
| FAQ questions with FAQPage schema | 82 |
| Keywords mapped | 213 (186 to live pages) |
| Google index | 0 pages (sitemap submitted, indexing requested) |
| Head tags | title, description, canonical, robots (max-image-preview:large), keywords, Open Graph, X card, hreflang en/ml + x-default, manifest, llms.txt |

## Rules that apply in every phase

1. Never invent facts: no ratings, reviews, star categories, partner counts, prices or awards we cannot show.
2. One query, one page. Check `audit/intent-map.csv` before creating anything.
3. Never target another business's brand (Vythiri Village Resort, Taj, Mountain Shadow …).
4. Name a partner resort, or use its photos, only with its permission.
5. "Best" is the searcher's question in titles, answered with what to compare; never a bare claim.
6. Every change ships with `pnpm build` green (launch check + SEO check, 0 errors).

## Phase 1. Launch and measure (month 1)

- Search Console: verified ✅, sitemap submitted ✅. Request indexing for `/`, `/rooms/`, `/contact/` and the 8 commercial pages.
- Bing Webmaster Tools: verify, import from Search Console. IndexNow runs after every production deploy (GitHub Action) ✅.
- Watch Pages → Indexed for two weeks: target 29 of 29.
- Record baselines per target query: best resort in wayanad, resort booking in wayanad, family / couples / private / pool / group resorts in wayanad, resort in vythiri.

KPI: 29 of 29 indexed; brand search "Mistvale Wayanad" and "resortinwayanad" lead to the home page.

## Phase 2. Google Business Profile and local entity (months 1 to 3)

- Business Profile as a **service-area business**: category Travel agency, area Wayanad, address hidden, phone +91 90610 79722, website www.resortinwayanad.in.
- Same name and phone on Bing Places, Apple Business Connect, Justdial and Sulekha.
- Instagram and Facebook pages; add their URLs to `site.socials` in `src/data/site.ts` (feeds `sameAs`).
- Ask every guest for an honest Google review. Never buy or gate reviews; no review schema until real reviews exist.

KPI: profile calls and WhatsApp clicks; review count.

## Phase 3. Unlock pages that wait for real data (months 2 to 4)

- Prices page: publish `/wayanad-resort-prices/` once real rate ranges per budget tier are supplied.
- Budget-tier pages (luxury, budget, private) as their own URLs once there are real partner examples.
- Replace "Example photo" stock images with partner photos (with permission).
- GAP keywords in `keyword-map.csv` (forest, riverside, waterfall view, indoor pool): build only when a partner really offers it.

## Phase 4. Answer every real question (months 3 to 12)

- Two guides a month from the Content Calendar tab, each answering a question from WhatsApp enquiries or Search Console queries.
- Direct answer in the first two sentences; FAQ answers 40–60 words, self-contained.

## Phase 5. Answer engines: AEO and GEO (year 1)

- Keep `/llms.txt` current. Monthly: run the AI Prompts tab in ChatGPT, Perplexity, Gemini and Google AI Overviews; log citations.
- Keep facts identical everywhere (site, Business Profile, social bios, directories).

## Phase 6. Earned authority (year 1 to 2)

- Partner resorts link "Book via Mistvale Wayanad"; Kerala travel bloggers and vloggers; honest answers on forums.

## Phase 7. Malayalam and regional reach (year 2)

- More Malayalam pages reviewed by a native speaker, with hreflang. Route pages for more origin cities only with real travel facts.

## Phase 8. Proof at scale (year 2 to 3)

- Guest stories and photos with consent; trip itineraries that earn links.

## Phase 9. Brand search everywhere (year 3+)

- Consistent titles on YouTube and Instagram; claim and maintain the knowledge panel.

## Phase 10. Maintain and defend (ongoing)

- Quarterly: `pnpm build`, Lighthouse, Search Console coverage, refresh dated facts (timings, distances, seasons).
- Yearly: remove or merge pages that earn no impressions; add answers competitors have that we do not.

## What only the owner can supply

1. Instagram / Facebook / YouTube URLs.
2. Google Business Profile access.
3. Real rate ranges per budget tier (unlocks the prices page).
4. Partner resort photos and permission to show them.
5. Honest guest reviews.
