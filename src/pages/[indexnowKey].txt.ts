import type { APIRoute } from 'astro';

// IndexNow key file (https://www.indexnow.org). Only built when INDEXNOW_KEY is set at build time.
// The key is meant to be public at /<key>.txt; it proves we own the host when we submit URLs.
export function getStaticPaths() {
  const key = process.env.INDEXNOW_KEY;
  return key && /^[a-zA-Z0-9-]{8,128}$/.test(key) ? [{ params: { indexnowKey: key } }] : [];
}

export const GET: APIRoute = ({ params }) => new Response(params.indexnowKey, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
