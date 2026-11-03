// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO(launch): set SITE_URL in Vercel to the real domain, e.g. https://www.yourresort.in
const site = process.env.SITE_URL || 'https://mistvale-wayanad.vercel.app';

export default defineConfig({
  site,
  trailingSlash: 'always',
  compressHTML: true,
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [sitemap({ filter: (page) => !/\/404\/?$/.test(page) })],
  image: { responsiveStyles: true },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Gloock',
      cssVariable: '--font-display',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Hanken Grotesk',
      cssVariable: '--font-body',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Arial', 'sans-serif'],
    },
  ],
});
