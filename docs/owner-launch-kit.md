# Owner launch kit

Everything the owner fills in or pastes, in order. Replace the placeholders on the site first (step 1), then use the same details everywhere else, letter for letter.

## 1. Details to send the developer

| Detail | Example format | Goes into |
|---|---|---|
| Resort name (exactly as on the signboard) | Resort in Wayanad | `src/data/site.ts` → name, legalName |
| Full address with PIN | Lakkidi Road, Vythiri, Wayanad, Kerala 673576 | `site.address` |
| Google Maps pin link + lat/lng | 11.5527, 76.0410 | `site.geo`, `site.mapsUrl` |
| Email | stay@yourresort.in | `site.email` |
| Domain | www.yourresort.in | Vercel + `SITE_URL` |
| Check-in / check-out | 1 pm / 11 am | `site.checkIn/checkOut` |
| Each room type: name, how many units, size, bed, max guests, extra-mattress allowed, weekday price | Pool Villa, 1 unit, 650 sq ft, king, 3, no, ₹12,500 | `src/content/rooms/*.md` |
| Facilities that really exist (pool size/depth/timings, campfire, barbecue, Ayurveda, power backup) | | `site.facilities`, `src/data/experiences.ts` |
| Policies: advance, cancellation, children, pets, quiet hours | | `site.policies`, `src/data/faq.ts` |
| Whole-resort booking? Minimum nights? | | `site.wholeProperty` |
| Languages staff speak | English, Malayalam, Hindi | `site.languages` |
| 20+ own photos (rooms, pool, food, views), landscape, at least 2000 px wide | | `raw-images/` → `pnpm images` |
| Instagram / Facebook / YouTube links | | `site.socials` |

## 2. Google Business Profile (paste-ready)

**Category:** Resort hotel · **Secondary:** Hotel (only if true)

**Description (edit the facts, keep it under 750 characters):**

> [Name] is a small resort on a tea and coffee estate in Vythiri, Wayanad, 3 km from Pookode Lake and close to the Lakkidi viewpoint. Stay in a private pool villa, a tree house among silver oaks, Kerala-style plantation cottages or a two-room family suite. Breakfast is included, and the kitchen cooks Kerala food. Guests use the outdoor pool, join the morning plantation walk and the evening campfire, and we book Chembra Peak treks, Banasura Sagar boat rides and wildlife safaris. Families, couples and groups of up to 16 can book directly by phone or WhatsApp.

**Attributes to tick (only what is true):** Free Wi-Fi · Free parking · Outdoor pool · Restaurant · Free breakfast · Kid-friendly · Smoke-free rooms · Check-in/out times

**Photos:** cover = best exterior/view; logo = `public/logo.png`; then every room type, pool, food, campfire, views. Add 5 new photos a month.

**Links:** Website = home page · Booking/appointment = `https://wa.me/919061079722`

## 3. Review request (send after checkout)

English:
> Thank you for staying with us at [Name]. If you have a minute, we would be grateful for an honest review on Google: [review link]. It helps other travellers plan their Wayanad trip.

Malayalam:
> [Name]-ൽ താമസിച്ചതിന് നന്ദി. സമയമുണ്ടെങ്കിൽ ഗൂഗിളിൽ നിങ്ങളുടെ സത്യസന്ധമായ അഭിപ്രായം എഴുതാമോ: [review link]. വയനാട് യാത്ര പ്ലാൻ ചെയ്യുന്ന മറ്റുള്ളവർക്ക് അത് സഹായമാകും.

Rules: ask every guest, not only happy ones; no discounts or gifts for reviews; never write reviews yourself; reply to every review (thank good ones, answer complaints politely and offer to talk on the phone).

## 4. Listings (same name, address, phone everywhere)

| Site | Link | Notes |
|---|---|---|
| Google Business Profile | https://business.google.com | Verify first; then Hotel Center for free booking links |
| Google Hotel Center | https://www.google.com/hotels/hotelcenter | Prices + free booking links in the hotel pack |
| Bing Places | https://www.bingplaces.com | Import from Google |
| Apple Business Connect | https://businessconnect.apple.com | Apple Maps |
| Kerala Tourism accommodation listing | https://www.keralatourism.org | Classified/approved accommodation listing |
| TripAdvisor | https://www.tripadvisor.in/Owners | Free owner listing |
| Booking.com / Agoda / MakeMyTrip-Goibibo | partner sites | Optional (commission); keep the direct WhatsApp price competitive |
| Justdial | https://www.justdial.com | Local directory |
| Instagram / Facebook | | Use the same name and link to the site |

## 5. Accounts to connect (developer)

| Account | Step |
|---|---|
| Vercel | Add domain; set `SITE_URL`; optional `PUBLIC_GA4_ID`, `INDEXNOW_KEY` |
| Google Search Console | Domain property via DNS; submit `/sitemap-index.xml`; request indexing for 11 main pages |
| Bing Webmaster Tools | Import from Search Console; run `pnpm indexnow` after deploys |
| GA4 | Create property; mark `whatsapp_click`, `phone_click`, `enquiry_submit` as key events; link to Search Console |
