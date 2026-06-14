import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: 'assets.zyrosite.com' },
    ],
    localPatterns: [
      { pathname: '/uploads/**' },
      { pathname: '/*.webp' },
    ],
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
