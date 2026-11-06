# SEO plan: rank for "resorts in wayanad"

6 Nov 2026 · www.resortinwayanad.in · Astro static site on Vercel · checked live today

**Status:** the site work that needs no owner data is done (section 10). The rest waits for decisions D1, D2 and D4 and real photos.

## 1. Summary

| Question | Answer |
|---|---|
| Why the site is not listed | The domain was registered on 3 Nov 2026, so it is 3 days old. Nothing links to it or mentions it yet. Every page-1 result lists real, named resorts with photos and prices; our pages show stay *types* with sample photos and no prices. |
| What already works | Live, indexable, fast, open to Google, Bing and AI bots. Sitemap, schema, 33 pages. Google already showed it for 10 searches in its first days. |
| Biggest lever | A real list of the resorts you book (with each resort's OK), real photos and "from ₹" price ranges, on the home page. |
| Fastest wins | Mysore to Wayanad distance page, family page, Instagram and YouTube short videos (Google shows a "Short videos" row for this search). |
| Next.js or Astro | Stay on Astro. Next.js would not rank better and would cost 1 to 2 weeks to rebuild. |
| Honest target | Long-tail page 1 in 1 to 3 months; top 10 for "resorts in wayanad" in roughly 6 to 12 months with listings, reviews and links. Passing Tripadvisor, MakeMyTrip and Booking.com for #1 is not a near-term target. All times are estimates. |

## 2. Why "resorts in wayanad" does not show the site

| # | Reason | Evidence (6 Nov) | Impact | Fix |
|---|---|---|---|---|
| 1 | Brand-new domain | whois: created 2026-11-03 | High | Time, links, reviews (sections 7 to 9) |
| 2 | No links or mentions | Web search for "resortinwayanad.in" returns no page that mentions it | High | Phase 3 |
| 3 | Page type does not match the results | Page 1 = booking sites and lists naming 20 to 46 resorts with prices; our home names none, hides prices, uses "Sample photo" images | High | Phase 2, items 1 to 4 |
| 4 | No reviews | 0 reviews anywhere; GBP not set up | Medium | Owner, Phase 1 |
| 5 | Plural keyword is weak on home | Title and H1 say "resort in Wayanad"; "resorts in wayanad" appears 2 times in 1,844 words | Low | Phase 2, item 2 |
| 6 | No video presence | The results page has a Short videos row (Instagram, Facebook reels from resorts and booking accounts) | Medium | Phase 3, items 2 and 3 |
| 7 | Stock photos | Image results show real resort photos | Medium | Phase 2, item 9 |

## 3. Technical check: nothing blocks Google

| Check | Result |
|---|---|
| HTTPS + redirect | 200; resortinwayanad.in → www with 308 |
| Indexing | `index, follow`; robots.txt allows Googlebot, Bingbot and AI search bots |
| Bot access | curl, PerplexityBot and OAI-SearchBot user agents get 200 (the 3 Nov Vercel challenge is gone) |
| Sitemap | 33 URLs with lastmod and images |
| Schema | TravelAgency + WebSite on home, FAQ on landing pages |
| Speed | PageSpeed mobile 100 (3 Nov) |
| Content | Home 1,844 words, 17 landing and guide pages, llms.txt, Malayalam page |

## 4. Who ranks on page 1 and how to beat them

| Result | Type | Why it ranks | Weak spots (seen 6 Nov) | Our answer |
|---|---|---|---|---|
| Tripadvisor, MakeMyTrip, Booking.com, Goibibo, Agoda | Booking sites | Huge authority, 80 to 120 resorts, live prices, reviews | Generic, no personal help | Do not fight on size; win on help: we match the right resort on WhatsApp, with checked details |
| Kerala Tourism | Government | Authority | Lists single resorts | Accreditation later (section 7, Phase 3) |
| Thrillophilia "45 Resorts in Wayanad" | Listing | 46 named resorts, price, rating, address, distance from bus stand, FAQ, enquiry form | Prices conflict between card and text, reviews mostly 2015 to 2021, no filters, no map | Dated "last checked" facts, filters, area map |
| TravelTriangle "20 Best Resorts in Wayanad" | Article | 20 named resorts by star tier, price, nearby places, author | Last updated Feb 2025, typos, a Kozhikode resort in a Wayanad list, no way to book | Accurate, current, bookable |
| Instagram and Facebook reels | Video | Real resort tours | Not a website | Our own reels and Shorts |
| AI Overview | AI answer | Names resorts (Taj, Mountain Shadows, Vythiri Village and others) | Lists resorts, not booking services | We can be a cited source; resort names appear only if our pages name partner resorts |

## 5. Search Console queries so far → action

| Query (and variants) | Impr. | Page | Action |
|---|---|---|---|
| mysore to wayanad distance, via bandipur, mysuru, distance between, mysore to vythiri, how much kilometre | 14 | /mysore-to-wayanad/ | Distance table at the top: Mysuru to Sulthan Bathery, Kalpetta, Vythiri, Mananthavady, Meppadi in km and hours, both routes, forest night timings. Title: "Mysore to Wayanad Distance: … km, Route & Timings". Verify every number on Google Maps |
| resorts in wayanad for family | 4 | /family-resorts-in-wayanad/ | H1 "Resorts in Wayanad for family trips"; show family stays from the new stays list |
| luxury villas in wayanad | 1 | /rooms/pool-villa/ | Use "luxury villas" wording if partners have them; own page only if impressions grow |
| cave resort in wayanad | 1 | none | Only if a partner really offers one |
| edakkal caves | 1 | /edakkal-caves/ | No change |

Next step for data: in Search Console → Performance, turn on "Average position" and export queries + pages every month.

## 6. Next.js or Astro for SEO?

| Point | Astro (now) | Next.js |
|---|---|---|
| What Google receives | Full HTML at build | Full HTML with SSG or SSR (same) |
| JavaScript sent | About 0 KB by default | React runtime on every page |
| Speed | Easy 100 (yours is 100) | Possible, takes more work |
| Best for | Content, guides, listings | Apps: logins, dashboards, live booking |
| Ranking effect | None by itself | None by itself |
| Cost to switch | 0 | Rebuild 33 pages and the SEO scripts, 1 to 2 weeks, risk of URL changes |
| Verdict | ✅ Keep | Only for a future booking app, on a subdomain |

Google ranks pages, not frameworks: content, links, trust and speed. Astro already gives the speed.

## 7. The plan

### Phase 0: decisions (this week)

| # | Decision | Why it matters | Options |
|---|---|---|---|
| D1 | Can the site name partner resorts, with each resort's OK? | Every page-1 result names resorts; names also catch searches for those resorts | Yes → named list + one page per resort. No → anonymous stay cards (weaker) |
| D2 | Real photos and a "from ₹X" range per stay | Trust, image results, matches what searchers compare | Owner sends per stay |
| D3 | Home page becomes the "resorts in wayanad" hub | Strongest URL; a second page for the same search would compete with it | Recommended |
| D4 | Does someone meet guests in person in Wayanad? | Google Business Profile needs in-person contact; online-only businesses can be suspended | Yes → GBP as a service-area business. No → skip GBP |

### Phase 1: owner tasks (week 1)

| # | Task | Done when |
|---|---|---|
| 1 | Search Console: submit `sitemap-index.xml`; request indexing for /, /mysore-to-wayanad/, /family-resorts-in-wayanad/ | Pages report shows them indexed |
| 2 | Bing Webmaster Tools: import from Search Console | Sitemap read (Bing also feeds Copilot and ChatGPT search) |
| 3 | Google Business Profile, only if D4 = yes (text ready in docs/launch-actions.md) | Verified |
| 4 | Instagram + YouTube named "Resort in Wayanad", same phone, link to the site | Live |
| 5 | Ask partner resorts for permission, photos, price ranges and a link back | 10 or more partners |
| 6 | Ask past guests for honest Google reviews (after GBP) | First 10 reviews |

### Phase 2: site work (weeks 1 to 3)

| # | Task | Files | Done when |
|---|---|---|---|
| 1 | Stays data: name (if D1), area, type, sleeps, pool, price range, photos, best for, last checked date | new `src/data/stays.ts` or `src/content/stays/` | Build + seo-check pass |
| 2 | Home = "Resorts in Wayanad" hub: plural in title and H1, stays list with filters (area, budget, type, group size, pool), area map, area comparison table | `src/pages/index.astro`, new components | Lighthouse ≥ 95, keyword 3 to 7 times |
| 3 | ItemList schema for the list, real data only, no ratings | Base layout | Rich Results Test: 0 errors |
| 4 | One page per named partner resort (if D1) | new `/resorts/[slug]/` route | ≥ 300 words of own text, 3+ real photos, permission recorded; the build blocks anything less |
| 5 | Mysore page: distance table on top, new title | `src/content/landing/mysore-to-wayanad.md` | Clicks start; judge after 3 to 4 weeks |
| 6 | Family page: plural H1 + family stays | `src/content/landing/family-resorts-in-wayanad.md` | Same |
| 7 | Area pages only where 5+ real stays exist: Kalpetta, Meppadi, Sulthan Bathery, Mananthavady, Banasura | `src/content/landing/` | Quality gate passes; linked from /where-to-stay-in-wayanad/ |
| 8 | Trust: real people on /about/, "how we check a resort", last checked dates, refund rule on /terms/ | `src/pages/about.astro`, `terms.astro`, `src/data/site.ts` | Owner confirms text |
| 9 | Real photos (with permission), descriptive file names and alt text | `public/`, credits | No "Sample photo" left on money pages |
| 10 | Trip content Google's AI pulls in: 2-day and 3-day plans, weather by month | new guides | Each has one owner keyword |
| 11 | Clean docs/pending.md: drop Hotel Center free booking links (needs live per-hotel price feeds), add the D4 rule to GBP | `docs/pending.md` | Done |

### Phase 3: links and mentions (weeks 2 to 12, then ongoing)

| # | Source | How | Note |
|---|---|---|---|
| 1 | Partner resort websites | "Also bookable via Resort in Wayanad" link | Text ready in docs/launch-actions.md |
| 2 | Instagram reels + YouTube Shorts | 3 a week, real resort tours, caption starts "Resorts in Wayanad …" | Google shows Short videos for this search |
| 3 | YouTube long videos | Resort tours with chapters and a full description | AI Overviews often cite YouTube |
| 4 | Directories with the same name and phone | Justdial, Bing Places, Apple Business Connect, Facebook page | Real details only |
| 5 | Kerala travel bloggers, vloggers, local media | Honest mentions; invite for a stay | Never buy links |
| 6 | Reddit, Quora | Real answers that say who you are | One channel among many |
| 7 | Kerala Tourism accreditation | Later: older rules ask for 2 years in business | Check the current guidelines |

Reel ideas (Instagram + YouTube Shorts; only real resorts with permission):

| # | Reel | Caption starts with |
|---|---|---|
| 1 | 30-second tour of one partner pool villa | "Resorts in Wayanad with a private pool …" |
| 2 | 3 family resorts, 10 seconds each | "Resorts in Wayanad for family …" |
| 3 | Same budget, three areas: Vythiri vs Meppadi vs Bathery | "Where to stay in Wayanad …" |
| 4 | The Mysore to Wayanad drive in 30 seconds, with the km on screen | "Mysore to Wayanad distance …" |
| 5 | Tree house night tour | "Tree house in Wayanad …" |
| 6 | "What ₹X a night gets you" at three resorts (only with real rates) | "Resorts in Wayanad under …" |

### Phase 4: measure (monthly)

| What | Where | Rule |
|---|---|---|
| Position for resorts in wayanad, resort in wayanad, family, couples, pool, Vythiri, Mysore distance | Search Console, Average position on | Compare month to month |
| Pages at position 8 to 20 | Search Console | Add the missing section or fix the title, then wait 3 to 4 weeks |
| WhatsApp clicks and bookings | GA4 key events | Bookings matter more than rank |
| AI answers | docs/ai-visibility-log.md | Run each prompt 3 times, record the rate |

## 8. Timeline (estimates, no guarantees)

| Goal | When |
|---|---|
| Long-tail page 1 (distance, routes, family) | 1 to 3 months |
| Reels in the Short videos row | Weeks after posting, if they get views |
| Top 10 for family, couples, pool, Vythiri | 3 to 6 months, with real listings and links |
| Top 10 for "resorts in wayanad" | 6 to 12 months, with listings, reviews and links |
| #1 above Tripadvisor, MakeMyTrip, Booking.com | Not a near-term target |
| Cited in Google's AI Overview | After top-10 rankings or third-party mentions |

## 9. Do not

| Don't | Why |
|---|---|
| Name resorts you don't book or have no permission for | Misleads guests; project rule |
| Fake reviews, ratings, "5 star" claims, hidden keywords, bought links | Google spam policies |
| Area or city pages without real stays | Doorway pages |
| Switch to Next.js for SEO | No ranking gain |
| Change many things on one page at once | You can't tell what worked; wait 3 to 4 weeks |

## 10. Status (6 Nov 2026)

| Item | Status |
|---|---|
| Home targets "resorts in Wayanad": title, H1, meta keywords; keyword appears 4 times (rule: 3 to 7) | ✅ Done |
| "Resorts in Wayanad by area" table on home (stacks into cards on phones), area data shared with /where-to-stay-in-wayanad/ | ✅ Done |
| Named partner resorts: filterable list on home (area, budget, trip, guests, private pool), page per resort, ItemList + Resort schema, build-time checks | ✅ Built, empty until D1 + photos (docs/add-a-partner-resort.md) |
| Mysore page: answer with km, town-by-town table (OpenStreetMap routing), FAQs for "how many km" and "via Bandipur" | ✅ Done |
| Family page: "Resorts in Wayanad for family" in title and H1 | ✅ Done |
| llms.txt lists the areas (and partner resorts once added) | ✅ Done |
| Keyword map: GSC queries added, files regenerated | ✅ Done |
| pending.md: Hotel Center dropped; GBP needs in-person contact | ✅ Done |
| Area pages (Kalpetta, Meppadi, Sulthan Bathery, Mananthavady) | ⏳ After 5+ listed resorts per area |
| Real photos, real people on /about/, refund rule on /terms/ | ⏳ Owner |
| Search Console, Bing, Instagram, YouTube, partner links, reviews | ⏳ Owner (Phase 1 and 3) |
| Checks run | Type check 0 errors; launch check passes (production); SEO check 33 pages, 0 errors, 0 warnings; no sideways scroll at 390 px and 1440 px; filters tested; no console errors |
