import { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import ArtistsSection from '@/components/home/ArtistsSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import LocationSection from '@/components/home/LocationSection';
import CTABanner from '@/components/home/CTABanner';
import SectionHeader from '@/components/ui/SectionHeader';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import AboutSection from '@/components/home/AboutSection';
import VideoBanner from '@/components/home/VideoBanner';
// TEMPORARILY DISABLED: Waiting for Instagram API Credentials
// import InstagramFeed from '@/components/home/InstagramFeed';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/site';

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — Premium Tattoo Studio`,
  description: SITE_CONFIG.description,
};

// Local Business JSON-LD
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shop No. 12, Sector 18 Market',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201301',
    addressCountry: 'IN',
  },
  openingHours: 'Mo-Su 10:00-21:00',
  sameAs: [SITE_CONFIG.instagram, SITE_CONFIG.facebook, SITE_CONFIG.youtube],
  priceRange: '₹₹',
  image: 'https://inkrisetattoo.com/og-image.jpg',
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />

      <CategoriesSection />

      {/* About Section — dynamically loads images from admin portfolio */}
      <AboutSection />

      {/* Cinematic Video Separator */}
      <VideoBanner />

      {/* Portfolio Preview */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="container-custom">
          <SectionHeader
            label="Our Work"
            title="Featured"
            titleHighlight="Portfolio"
            subtitle="A glimpse of the art we create. Each piece tells a unique story."
          />
          <PortfolioGrid />
          <div className="text-center mt-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#c9a84c] text-[#c9a84c] rounded-full font-bold text-sm hover:bg-[#c9a84c] hover:text-black transition-all duration-200 font-inter group"
            >
              View Full Portfolio
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <ArtistsSection />
      <ReviewsSection />
      <LocationSection />
      
      {/* 
        INSTAGRAM API INTEGRATION (Prepared for future use)
        ====================================================
        To enable this feature, you must first add the following credentials
        to your .env.local file:
        
        INSTAGRAM_APP_ID=your_id_here
        INSTAGRAM_APP_SECRET=your_secret_here
        INSTAGRAM_ACCESS_TOKEN=your_token_here
        INSTAGRAM_USER_ID=your_user_id_here

        Once added, simply uncomment the import statement at the top of this file
        and uncomment the <InstagramFeed /> component below.
      */}
      {/* <InstagramFeed /> */}

      <CTABanner />
    </>
  );
}
