import { Metadata } from 'next';
import { SITE_CONFIG } from '@/constants/site';

interface GenerateMetadataProps {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
}

export function generateMeta({
  title,
  description = SITE_CONFIG.description,
  path = '/',
  ogImage = '/og-image.jpg',
}: GenerateMetadataProps): Metadata {
  const url = `https://inkrisetattoo.com${path}`;
  return {
    title: `${title} | ${SITE_CONFIG.name}`,
    description,
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      images: [ogImage],
    },
    alternates: { canonical: url },
  };
}
