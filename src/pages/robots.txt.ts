import type { APIRoute } from 'astro';

// Search engines and AI search/answer engines are welcome.
export const GET: APIRoute = ({ site }) => {
  if (__SITE_STAGING__) {
    // Pages stay crawlable so search engines see their noindex tag; text summaries are kept out.
    const body = ['# STAGING: placeholder content, every page is noindex until launch', 'User-agent: *', 'Disallow: /llms.txt', 'Disallow: /pricing.md', ''].join('\n');
    return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  const sitemap = new URL('/sitemap-index.xml', site).href;
  const agents = ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Claude-SearchBot', 'Claude-User', 'Applebot'];
  const body = [
    ...agents.flatMap((a) => [`User-agent: ${a}`, 'Allow: /', '']),
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
