# Pending tracker (SEO · performance · local · AEO/GEO)

Updated 3 Nov 2026. 🔴 blocks launch · 🟠 high · 🟡 medium · 🟢 later. Code-side items marked ✅ are done.

| # | Area | Item | Impact | Owner | Status |
|---|---|---|---|---|---|
| 1 | Data | Real resort name, legal name, logo | 🔴 | Owner | Waiting |
| 2 | Data | Full address + exact Google Maps pin (lat/lng, maps link) | 🔴 | Owner | Waiting |
| 3 | Data | Real email; confirm WhatsApp 9061079722 is the resort's | 🔴 | Owner | Waiting |
| 4 | Data | Rooms: names, units, size, beds, max guests, extra mattress | 🔴 | Owner | Placeholder |
| 5 | Data | Facilities: pool depth/size/timings, campfire, barbecue, Ayurveda, power backup | 🔴 | Owner | Placeholder |
| 6 | Data | Policies: advance, cancellation, children, pets, quiet hours | 🟠 | Owner | Placeholder |
| 7 | Data | Check-in/out times, languages, whole-resort booking + min nights | 🟠 | Owner | Placeholder |
| 8 | Images | 20+ own photos (each room, pool, food, views, exterior) ≥ 2000 px | 🔴 | Owner | Stock "Sample photo" |
| 9 | Data | Distances from the exact pin (`src/data/places.ts`) | 🟡 | Developer | Approximate |
| 10 | Domain | Buy domain, add in Vercel, set `SITE_URL`, redirect www/apex | 🔴 | You | Canonical now uses the Vercel production domain ✅ |
| 11 | Launch | `pnpm check:launch` passes → staging/noindex switches off automatically | 🔴 | — | After 1–10 |
| 12 | Local | Google Business Profile (category Resort hotel), verified | 🔴 | Owner | Text ready in owner-launch-kit.md |
| 13 | Local | Google Hotel Center free booking links | 🟠 | Owner | — |
| 14 | Local | Honest Google reviews (request text EN/ML ready) | 🔴 | Owner | 0 reviews |
| 15 | Local/GEO | Listings with identical NAP: Kerala Tourism, TripAdvisor, Justdial, Bing Places, Apple Business Connect | 🟠 | Owner | — |
| 16 | SEO | Search Console: DNS verify, submit sitemap, request indexing (11 pages) | 🔴 | You | After domain |
| 17 | SEO/GEO | Bing Webmaster Tools; run `pnpm indexnow` after deploys | 🟠 | You | Key built in ✅ |
| 18 | Tracking | GA4 ID → `PUBLIC_GA4_ID`; mark whatsapp_click, phone_click, enquiry_submit as key events | 🟠 | You | Code ready ✅; privacy text switches automatically ✅ |
| 19 | Schema | Validate structured data | 🟡 | — | ✅ schema.org validator: 0 errors on home, room, guide, landing, Malayalam pages |
| 20 | Schema | Rich Results Test on the live domain | 🟡 | You | After launch |
| 21 | Speed | PageSpeed on live domain (mobile + desktop) | 🟡 | — | Re-run after each deploy |
| 22 | Speed | Hero animation removed (Speed Index); card images sized to the grid | 🟡 | — | ✅ |
| 23 | Content | Prices hidden by choice: "with price" searches have no page (`showPrices` switch) | 🟡 | You | Decision |
| 24 | Brand | Is the resort "Vythiri Village Resort" / "Vythiri Resort"? | 🟡 | You | Unanswered |
| 25 | Content | Malayalam page proofread; more `/ml/` pages only after impressions | 🟢 | Owner | Draft |
| 26 | Content | First-hand guides with real photos (monsoon stay, kids, Chembra trek) | 🟢 | Owner + dev | After photos |
| 27 | GEO | Monthly AI-answer check (docs/ai-visibility-log.md) | 🟢 | You | After launch |
| 29 | Crawl/GEO | Vercel Firewall shows a "Security Checkpoint" challenge to non-browser clients. Check Vercel → Firewall → Bot Protection / Attack Challenge Mode: keep verified search bots allowed, and allow AI search bots (OAI-SearchBot, PerplexityBot, Claude-SearchBot) if you want AI answers to cite the site | 🟠 | You | Found 3 Nov |
| 28 | SEO | Month 1–3: rewrite titles for pages ranking 8–20 in Search Console | 🟢 | Developer | After data |

## Advanced items done (3 Nov 2026)

| Item | Result |
|---|---|
| Popup as a bottom sheet on mobile | ✅ smaller, safer for Google's intrusive-interstitial rules |
| Route pages | ✅ Bangalore, Mysore, Kozhikode, Kochi → Wayanad |
| Sight guides | ✅ Chembra Peak trek, Banasura Sagar Dam, Edakkal Caves |
| Monsoon page | ✅ /wayanad-in-monsoon/ |
| Body font preload, tighter image sizes | ✅ |
| Internal links | ✅ footer split (stays / plan your trip), places → guides, reach tables → route pages, best time → monsoon |
| Live PageSpeed (mobile, 3 Nov) | Performance 100, Accessibility 100, Best Practices 100, SEO 69 (staging noindex, expected) |
