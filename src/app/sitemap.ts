import { MetadataRoute } from 'next';
import { artists } from '@/data/artists';
import { categories } from '@/data/categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://inkrisetattoo.com';

  // Static pages
  const staticPages = [
    '',
    '/portfolio',
    '/artists',
    '/faq',
    '/after-care',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? (1.0 as const) : (0.8 as const),
  }));

  // Dynamic artist profile pages
  const artistPages = artists.map((artist) => ({
    url: `${baseUrl}/artists/${artist.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic category portfolio pages
  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...artistPages, ...categoryPages];
}
