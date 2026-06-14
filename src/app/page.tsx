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

      {/* About Section */}
      <section className="section-padding bg-[#111111]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-[#c9a84c] text-xs font-semibold tracking-[0.3em] uppercase mb-3 font-inter">
                About Ink Rise
              </span>
              <h2 className="font-cinzel font-bold text-3xl md:text-4xl text-[#f5f5f5] leading-tight mb-4">
                More Than Ink —<br /><span className="gold-text">It&apos;s Your Story</span>
              </h2>
              <div className="gold-divider mb-6" />
              <p className="text-[#888] text-base leading-relaxed mb-4 font-inter">
                At Ink Rise Tattoo Studio, we believe tattoos are more than body art — they are living stories,
                permanent expressions of who you are. Founded by passionate artists with a vision of premium
                quality and genuine care, we&apos;ve helped over 2,000 clients wear their stories with pride.
              </p>
              <p className="text-[#888] text-base leading-relaxed mb-8 font-inter">
                Our studio is built on three pillars: <span className="text-[#c9a84c] font-medium">Artistry</span>,{' '}
                <span className="text-[#c9a84c] font-medium">Hygiene</span>, and{' '}
                <span className="text-[#c9a84c] font-medium">Comfort</span>. Every piece we create is one-of-a-kind,
                designed with you and for you.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🎨', title: 'Custom Designs', desc: 'Unique artwork crafted for you' },
                  { icon: '🛡️', title: 'Safe & Hygienic', desc: 'Sterilized, single-use needles' },
                  { icon: '🏆', title: 'Award-Winning', desc: 'Recognized across India' },
                  { icon: '💬', title: 'Free Consult', desc: 'Book a free consultation' },
                ].map((item) => (
                  <div key={item.title} className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a]">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4 className="text-[#f5f5f5] text-sm font-semibold font-cinzel mb-1">{item.title}</h4>
                    <p className="text-[#666] text-xs font-inter">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=400&q=75',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=75',
                'https://images.unsplash.com/photo-1542856204-00101eb6def4?w=400&q=75',
                'https://images.unsplash.com/photo-1562591229-7b18b44b07df?w=400&q=75',
              ].map((src, i) => (
                <div
                  key={i}
                  className={`relative rounded-xl overflow-hidden border border-[#2a2a2a] ${
                    i === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Tattoo work ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
      <CTABanner />
    </>
  );
}
