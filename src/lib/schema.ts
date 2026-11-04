import { site } from '../data/site';
import type { Place } from '../data/places';

type Thing = Record<string, unknown>;

export const abs = (path: string, base: URL | string) => new URL(path, base).href;

export const businessId = (siteUrl: URL | string) => abs('/#business', siteUrl);

/** The business: a travel agency that books partner resorts across Wayanad (no public office). */
export function businessSchema(siteUrl: URL | string, image: string): Thing {
  return {
    '@type': 'TravelAgency',
    '@id': businessId(siteUrl),
    name: site.name,
    alternateName: [...site.alternateNames],
    description: site.description,
    url: abs('/', siteUrl),
    image,
    logo: abs('/logo.png', siteUrl),
    telephone: site.phoneE164,
    slogan: site.tagline,
    knowsAbout: ['Wayanad resorts', 'Vythiri', 'Kalpetta', 'Chembra Peak', 'Pookode Lake', 'Banasura Sagar Dam'],
    areaServed: { '@type': 'AdministrativeArea', name: 'Wayanad, Kerala, India' },
    address: { '@type': 'PostalAddress', addressRegion: site.address.region, addressCountry: site.address.country },
    ...(site.socials.length ? { sameAs: site.socials.map((s) => s.url) } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phoneE164,
      contactType: 'reservations',
      availableLanguage: [...site.languages],
    },
  };
}

export function websiteSchema(siteUrl: URL | string): Thing {
  return {
    '@type': 'WebSite',
    '@id': abs('/#website', siteUrl),
    url: abs('/', siteUrl),
    name: site.name,
    alternateName: [...site.alternateNames],
    inLanguage: 'en-IN',
    publisher: { '@id': businessId(siteUrl) },
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[], siteUrl: URL | string): Thing {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.href, siteUrl),
    })),
  };
}

/** A stay type we book (e.g. tree houses) as a Service offered by the business. */
export function stayTypeSchema(
  stay: { name: string; summary: string },
  url: string,
  image: string,
  siteUrl: URL | string,
): Thing {
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: `${stay.name} booking in Wayanad`,
    serviceType: 'Resort booking',
    description: stay.summary,
    url,
    image,
    areaServed: { '@type': 'AdministrativeArea', name: 'Wayanad, Kerala, India' },
    provider: { '@id': businessId(siteUrl) },
  };
}

/** ImageObject with licence metadata (Google Images can show credit + licence). */
export function imageObject(url: string, c?: { author: string; license: string; licenseUrl: string; source: string }): Thing {
  if (!c) return { '@type': 'ImageObject', contentUrl: url, url };
  return {
    '@type': 'ImageObject',
    contentUrl: url,
    url,
    creditText: `${c.author} / Wikimedia Commons`,
    creator: { '@type': 'Person', name: c.author },
    copyrightNotice: `${c.author}, ${c.license}`,
    ...(c.licenseUrl ? { license: c.licenseUrl } : {}),
    acquireLicensePage: c.source,
  };
}

export function placesSchema(places: Place[], images: (string | Thing)[], pageUrl: string): Thing {
  return {
    '@type': 'ItemList',
    name: 'Places to visit in Wayanad',
    url: pageUrl,
    numberOfItems: places.length,
    itemListElement: places.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'TouristAttraction',
        name: p.name,
        description: p.summary,
        image: images[i],
        url: `${pageUrl}#${p.slug}`,
        geo: { '@type': 'GeoCoordinates', latitude: p.lat, longitude: p.lng },
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Wayanad, Kerala' },
      },
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]): Thing {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export const graph = (...nodes: (Thing | Thing[])[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes.flat().map((n) => JSON.parse(JSON.stringify(n))),
});


/** WebPage node for a landing page; ties the page to the resort entity instead of inventing a new business. */
export function webPageSchema(
  page: { url: string; name: string; description: string; updated?: Date; breadcrumbId?: string; mainEntityId?: string; lang?: string },
  siteUrl: URL | string,
): Thing {
  return {
    '@type': 'WebPage',
    '@id': `${page.url}#webpage`,
    url: page.url,
    name: page.name,
    description: page.description,
    inLanguage: page.lang ?? 'en-IN',
    isPartOf: { '@id': abs('/#website', siteUrl) },
    about: { '@id': businessId(siteUrl) },
    ...(page.updated ? { dateModified: page.updated.toISOString().slice(0, 10) } : {}),
    ...(page.mainEntityId ? { mainEntity: { '@id': page.mainEntityId } } : {}),
  };
}

/** ItemList pointing at the stay-type services (defined on each /rooms/<id>/ page). */
export function stayListSchema(
  stays: { id: string; name: string }[],
  listId: string,
  name: string,
  siteUrl: URL | string,
): Thing {
  return {
    '@type': 'ItemList',
    '@id': listId,
    name,
    numberOfItems: stays.length,
    itemListElement: stays.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: abs(`/rooms/${r.id}/`, siteUrl),
      name: r.name,
    })),
  };
}
