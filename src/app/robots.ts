import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/logo.jpg',
          '/logo-creser.jpg',
          '/logo-creser.svg',
          '/logo-schema.json',
        ],
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/logo.jpg',
          '/logo-creser.jpg',
          '/logo-creser.svg',
          '/logo-schema.json',
        ],
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },
    ],
    sitemap: 'https://creser-fibromialgia.vercel.app/sitemap.xml',
    host: 'https://creser-fibromialgia.vercel.app',
  };
}
