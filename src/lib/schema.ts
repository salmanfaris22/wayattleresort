import { site, fullAddress } from '../data/site';
import type { Place } from '../data/places';

type Thing = Record<string, unknown>;

export const abs = (path: string, base: URL | string) => new URL(path, base).href;

export function resortSchema(siteUrl: URL | string, image: string): Thing {
  const id = abs('/#resort', siteUrl);
  return {
    '@type': 'Resort',
    '@id': id,
    name: site.name,
    description: site.description,
    url: abs('/', siteUrl),
    image,
    telephone: site.phoneE164,
    email: site.email,
    priceRange: site.priceRange,
    currenciesAccepted: site.currency,
    checkinTime: site.checkIn,
    checkoutTime: site.checkOut,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapsUrl,
    amenityFeature: site.amenities.map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
    containedInPlace: { '@type': 'AdministrativeArea', name: 'Wayanad, Kerala, India' },
    ...(site.socials.length ? { sameAs: site.socials.map((s) => s.url) } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phoneE164,
      contactType: 'reservations',
      availableLanguage: ['English', 'Malayalam', 'Hindi'],
    },
  };
}

export function websiteSchema(siteUrl: URL | string): Thing {
  return {
    '@type': 'WebSite',
    '@id': abs('/#website', siteUrl),
    url: abs('/', siteUrl),
    name: site.name,
    inLanguage: 'en-IN',
    publisher: { '@id': abs('/#resort', siteUrl) },
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

export function roomSchema(
  room: { name: string; summary: string; guests: number; sizeSqft: number; bed: string; priceFrom: number; amenities: string[] },
  url: string,
  image: string,
  siteUrl: URL | string,
): Thing[] {
  const roomId = `${url}#room`;
  return [
    {
      '@type': 'HotelRoom',
      '@id': roomId,
      name: room.name,
      description: room.summary,
      url,
      image,
      bed: { '@type': 'BedDetails', typeOfBed: room.bed },
      occupancy: { '@type': 'QuantitativeValue', maxValue: room.guests },
      floorSize: { '@type': 'QuantitativeValue', value: room.sizeSqft, unitCode: 'FTK' },
      amenityFeature: room.amenities.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
      containedInPlace: { '@id': abs('/#resort', siteUrl) },
    },
    {
      '@type': 'Offer',
      name: `${room.name} – nightly rate with breakfast`,
      url,
      priceCurrency: site.currency,
      price: room.priceFrom,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: room.priceFrom,
        priceCurrency: site.currency,
        unitCode: 'DAY',
        referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'DAY' },
      },
      itemOffered: { '@id': roomId },
      offeredBy: { '@id': abs('/#resort', siteUrl) },
      availability: 'https://schema.org/InStock',
    },
  ];
}

export function placesSchema(places: Place[], images: string[], pageUrl: string): Thing {
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

export { fullAddress };
