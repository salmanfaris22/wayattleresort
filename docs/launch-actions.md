# Launch actions: copy and paste kit

Tasks that need the owner's Google login. Everything below is ready to paste. Fill in anything in [BRACKETS] with real details.

## 1. Google Search Console (5 minutes)

1. Open https://search.google.com/search-console and pick the resortinwayanad.in property.
2. Sitemaps (left menu) → in "Add a new sitemap" type `sitemap-index.xml` → Submit. If the property is a Domain property, enter the full URL: `https://www.resortinwayanad.in/sitemap-index.xml`.
3. URL inspection (top search bar) → paste each URL below → "Request indexing". Google limits this per day, so do the rest tomorrow if it stops you.

```
https://www.resortinwayanad.in/
https://www.resortinwayanad.in/services/
https://www.resortinwayanad.in/faq/
https://www.resortinwayanad.in/private-resort-in-wayanad/
https://www.resortinwayanad.in/family-resorts-in-wayanad/
https://www.resortinwayanad.in/resorts-in-wayanad-for-couples/
https://www.resortinwayanad.in/resorts-in-wayanad-with-swimming-pool/
https://www.resortinwayanad.in/where-to-stay-in-wayanad/
```

4. After a week, check Pages → Indexed. Target: 33 of 33.

## 2. Google Business Profile (15 minutes, plus Google's verification)

First check you qualify: Google only allows a Business Profile for a business that meets its customers in person during its hours (at an office, or by going to them). A booking service that only works by phone and WhatsApp can be suspended. If nobody meets guests in Wayanad, skip this step.

Open https://business.google.com/add and use these details:

| Field | Enter |
|---|---|
| Business name | Resort in Wayanad |
| Primary category | Travel agency |
| Customer locations | Choose "No" for a location customers visit, then add Wayanad as the service area |
| Address | A real address for verification only; Google hides it for service-area businesses |
| Phone | +91 90610 79722 |
| Website | https://www.resortinwayanad.in/ |
| Hours | [YOUR REAL HOURS] |

Use the same name and phone everywhere. Google can suspend a profile whose name does not match the name the business really uses, so also use "Resort in Wayanad" on WhatsApp Business, Instagram, Facebook and booking messages.

Description:

> Resort in Wayanad is a resort booking service for Wayanad, Kerala. Tell us your dates, guests and budget on WhatsApp and we send resorts that are free, with photos and rates, then book the one you choose. We book private villas, pool villas, tree houses, plantation cottages, family suites and couple stays, from luxury to budget, across Vythiri, Kalpetta, Meppadi, Sulthan Bathery and Mananthavady. We help in English and Malayalam.

Services to add: Resort booking, Private pool villa booking, Tree house booking, Family resort booking, Couple and honeymoon stay booking, Group stay booking.

Photos: use photos you took or have permission to use.

## 3. Reviews from real guests

After verification, copy the review link from the Business Profile ("Ask for reviews") and send this to every past guest, not only the happy ones. Google does not allow offering anything in return for a review.

English:

> Hi [NAME], thank you for booking your Wayanad stay with Resort in Wayanad. Could you share a short review of how we helped? It takes a minute and helps other travellers: [GOOGLE REVIEW LINK]

Malayalam:

> നമസ്കാരം [NAME], Resort in Wayanad വഴി വയനാട് യാത്ര ബുക്ക് ചെയ്തതിന് നന്ദി. നിങ്ങളുടെ അനുഭവം ഒരു ചെറിയ റിവ്യൂ ആയി എഴുതാമോ? മറ്റു യാത്രക്കാർക്ക് ഇത് സഹായകരമാകും: [GOOGLE REVIEW LINK]

To show a review on the website, ask the guest's permission and add their exact words to `src/data/reviews.ts`.

## 4. Links from partner resorts

Send to each partner resort you really work with:

> Hi [NAME], we book guests for [RESORT] through Resort in Wayanad. Could you add a line on your website: "Also bookable via Resort in Wayanad", linking to https://www.resortinwayanad.in/ ? It helps guests find both of us.

Then ask Kerala travel bloggers and vloggers for honest mentions. Do not buy links; Google treats that as spam.

## 5. Send these back to update the site

| Item | Goes in |
|---|---|
| Instagram and Facebook links | `socials` in `src/data/site.ts` (also tells Google these pages are yours) |
| Team names and roles | `team` in `src/data/site.ts` |
| Guest reviews with permission | `src/data/reviews.ts` |
| Advance and refund rule | `/terms/` |
