import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const rooms = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/rooms' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      order: z.number(),
      seoTitle: z.string().max(65),
      seoDescription: z.string().min(120).max(165),
      keyword: z.string(),
      summary: z.string(),
      guests: z.number(),
      guestsNote: z.string(),
      sizeSqft: z.number(),
      bed: z.string(),
      view: z.string(),
      priceFrom: z.number(),
      image: image(),
      imageAlt: z.string(),
      imageCredit: z.string(),
      // true while the photo is a stock sample, not the resort's own room
      stockPhoto: z.boolean(),
      // how many identical rooms of this type exist (drives group/capacity plans)
      units: z.number().int().min(1),
      // maximum guests including an extra mattress
      sleeps: z.number().int().min(1),
      flags: z.array(z.enum(['privatePool', 'couples', 'family', 'groups', 'levelAccess', 'petsOnRequest', 'airConditioned'])),
      // landing pages this room should link to
      related: z.array(z.string()).default([]),
      amenities: z.array(z.string()),
      goodFor: z.array(z.string()),
    }),
});

// Programmatic SEO landing pages. Each file is one search intent with its own copy.
// A page is only built when it passes the quality gate in src/lib/landing.ts.
const landing = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/landing' }),
  schema: z.object({
    status: z.enum(['published', 'draft']),
    updated: z.coerce.date(),
    seoTitle: z.string().min(30).max(62),
    description: z.string().min(110).max(165),
    h1: z.string(),
    breadcrumb: z.string(),
    lede: z.string(),
    heroImage: z.string(),
    heroAlt: z.string(),
    primaryKeyword: z.string(),
    secondaryKeywords: z.array(z.string()),
    intent: z.enum(['commercial', 'transactional', 'informational']),
    answer: z.object({ q: z.string(), a: z.string() }),
    rooms: z.array(z.object({ id: z.string(), note: z.string() })).default([]),
    plans: z.array(z.number().int().min(1)).default([]),
    planWithPrivatePool: z.boolean().default(false),
    wholeResort: z.boolean().default(false),
    priceTable: z.boolean().default(false),
    policies: z.boolean().default(false),
    facilities: z.array(z.string()).default([]),
    places: z.array(z.string()).default([]),
    requires: z
      .object({
        facilities: z.array(z.string()).default([]),
        minGuests: z.number().int().optional(),
        wholeProperty: z.boolean().default(false),
        location: z.string().optional(),
      })
      .default({ facilities: [], wholeProperty: false }),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).min(3),
    related: z.array(z.string()).min(2),
    enquiry: z.string(),
  }),
});

export const collections = { rooms, landing };
