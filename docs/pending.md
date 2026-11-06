# Pending tracker (SEO · performance · local · AEO/GEO)

Updated 6 Nov 2026. **The site is now a resort booking service (broker) for many Wayanad resorts, brand Resort in Wayanad (renamed from Mistvale on 3 Nov 2026), no office, no email.** Rows 1–8 about one resort's own data no longer apply. 8 sales pages rewritten and live; the prices page stays draft until real rate ranges exist. SEO plan and keyword files: seo/ROADMAP.md. 🔴 blocks launch · 🟠 high · 🟡 medium · 🟢 later. Code-side items marked ✅ are done.

**Added 6 Nov 2026 (plan: docs/seo-plan-resorts-in-wayanad.md):**
- The domain was registered on 3 Nov 2026, so ranking for "resorts in wayanad" takes months, links and reviews; no site change can skip that.
- Done in code: home page now targets "resorts in Wayanad" (title, H1, new "Resorts in Wayanad by area" table); Mysore page leads with a town-by-town km table (measured with OpenStreetMap routing); family page uses "resorts in Wayanad for family"; llms.txt lists areas.
- Ready but empty: named partner resorts (filterable list on the home page + a page each). Needs the owner's answer to D1 and real photos: docs/add-a-partner-resort.md.
- Owner decisions: D1 name partner resorts with their OK? D2 real photos and "from ₹" rates per resort? D4 does anyone meet guests in person in Wayanad (needed for a Google Business Profile)?

**Added 3 Nov 2026, needs the owner:**
- Real guest reviews with permission: add to `src/data/reviews.ts` (section stays hidden while empty). Never write reviews yourself. Stars in Google search need a third-party source such as Google Business Profile; reviews on your own site do not get them.
- Team names and roles, if you want them shown: `team` in `src/data/site.ts`.
- Read /terms/ and confirm it matches how you take advance payments and refunds. It does not state a refund rule because none was given.
- Google Business Profile as a service-area business, the main way to reach the map pack. Paste-ready details: `docs/launch-actions.md`.
- Search Console: submit `sitemap-index.xml`, then request indexing for /, /services/ and /faq/.

| # | Area | Item | Impact | Owner | Status |
|---|---|---|---|---|---|
| 1 | Data | Real resort name, legal name, logo | — | — | Not applicable: broker, data comes per partner resort (docs/add-a-partner-resort.md) |
| 2 | Data | Full address + exact Google Maps pin (lat/lng, maps link) | — | — | Not applicable: no office, service area only |
| 3 | Data | Real email; confirm WhatsApp 9061079722 is the resort's | — | — | Not applicable: no email; WhatsApp 9061079722 is the booking line |
| 4 | Data | Rooms: names, units, size, beds, max guests, extra mattress | — | — | Not applicable: broker, data comes per partner resort (docs/add-a-partner-resort.md) |
| 5 | Data | Facilities: pool depth/size/timings, campfire, barbecue, Ayurveda, power backup | — | — | Not applicable: broker, data comes per partner resort (docs/add-a-partner-resort.md) |
| 6 | Data | Policies: advance, cancellation, children, pets, quiet hours | — | — | Not applicable: broker, data comes per partner resort (docs/add-a-partner-resort.md) |
| 7 | Data | Check-in/out times, languages, whole-resort booking + min nights | — | — | Not applicable: broker, data comes per partner resort (docs/add-a-partner-resort.md) |
| 8 | Images | Own photos | 🔴 | Owner | Now per partner resort (3+ each, with permission) |
| 9 | Data | Distances from the exact pin (`src/data/places.ts`) | — | — | Not applicable: distances are from Vythiri, the base town |
| 10 | Domain | www.resortinwayanad.in: add in Vercel, redirect apex → www | 🔴 | You | Canonical, sitemap and robots use www.resortinwayanad.in ✅ |
| 11 | Launch | `pnpm check:launch` passes → staging/noindex switches off automatically | — | — | ✅ Passes; site indexable since 3 Nov |
| 12 | Local | Google Business Profile as a Travel agency (service area). Google requires in-person contact with customers, so only if someone meets guests in Wayanad (D4) | 🟠 | Owner | Text ready in docs/launch-actions.md |
| 13 | Local | Google Hotel Center free booking links | — | — | Dropped 6 Nov: needs live per-hotel rates, not possible for a WhatsApp booking service |
| 14 | Local | Honest Google reviews (request text EN/ML ready) | 🔴 | Owner | 0 reviews |
| 15 | Local/GEO | Listings with identical NAP: Kerala Tourism, TripAdvisor, Justdial, Bing Places, Apple Business Connect | 🟠 | Owner | — |
| 16 | SEO | Search Console: submit sitemap, request indexing for /, /mysore-to-wayanad/, /family-resorts-in-wayanad/ | 🔴 | You | Verified ✅ (queries showing); sitemap + requests after the 6 Nov push |
| 17 | SEO/GEO | Bing Webmaster Tools; run `pnpm indexnow` after deploys | 🟠 | You | Key built in ✅ |
| 18 | Tracking | GA4 ID → `PUBLIC_GA4_ID`; mark whatsapp_click, phone_click, enquiry_submit as key events | 🟠 | You | Code ready ✅; privacy text switches automatically ✅ |
| 19 | Schema | Validate structured data | 🟡 | — | ✅ schema.org validator: 0 errors on home, room, guide, landing, Malayalam pages |
| 20 | Schema | Rich Results Test on the live domain | 🟡 | You | After launch |
| 21 | Speed | PageSpeed on live domain (mobile + desktop) | 🟡 | — | Re-run after each deploy |
| 22 | Speed | Hero animation removed (Speed Index); card images sized to the grid | 🟡 | — | ✅ |
| 23 | Content | Prices hidden by choice: "with price" searches have no page (`showPrices` switch) | 🟡 | You | Decision |
| 24 | Brand | Is the resort "Vythiri Village Resort" / "Vythiri Resort"? | — | — | Not applicable: broker, not one resort |
| 25 | Content | Malayalam page proofread; more `/ml/` pages only after impressions | 🟢 | Owner | Draft |
| 26 | Content | First-hand guides with real photos (monsoon stay, kids, Chembra trek) | 🟢 | Owner + dev | After photos |
| 27 | GEO | Monthly AI-answer check (docs/ai-visibility-log.md) | 🟢 | You | After launch |
| 29 | Crawl/GEO | Vercel Firewall challenge for bots | — | — | ✅ 6 Nov: curl, PerplexityBot and OAI-SearchBot user agents get 200 |
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
