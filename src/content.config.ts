import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Stay types we book across partner resorts (pool villa, tree house …). Not one resort's rooms.
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
      // who it usually suits, e.g. "2 guests" or "4 to 6 guests"
      guestsNote: z.string(),
      // budget levels we can find this stay type in (ids from tiers in src/data/site.ts)
      tiers: z.array(z.enum(['private', 'luxury', 'affordable', 'budget'])).min(1),
      image: image(),
      imageAlt: z.string(),
      imageCredit: z.string(),
      // true while the photo is an example, not a partner resort's own photo ("Example photo" tag)
      stockPhoto: z.boolean(),
      flags: z.array(z.enum(['privatePool', 'couples', 'family', 'groups'])),
      // landing pages this stay type should link to
      related: z.array(z.string()).default([]),
      // what to expect in most resorts of this type
      features: z.array(z.string()),
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
    places: z.array(z.string()).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).min(3),
    related: z.array(z.string()).min(2),
    enquiry: z.string(),
  }),
});

export const collections = { rooms, landing };
