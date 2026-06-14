import { Metadata } from 'next';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import CTABanner from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Portfolio — Our Tattoo Gallery',
  description:
    'Explore the complete portfolio of Ink Rise Tattoo Studio. Browse realism, geometric, colour, portrait, spiritual, and more tattoo styles.',
};

export default function PortfolioPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container-custom text-center">
          <span className="inline-block text-[#c9a84c] text-xs font-semibold tracking-[0.3em] uppercase mb-4 font-inter">
            Our Work
          </span>
          <h1 className="font-cinzel font-black section-heading text-[#f5f5f5] mb-5 lg:mb-6">
            Tattoo <span className="gold-text">Portfolio</span>
          </h1>
          <div className="gold-divider mx-auto mb-5" />
          <p className="text-[#888] text-base lg:text-lg max-w-2xl mx-auto font-inter leading-relaxed">
            Every tattoo is a unique story. Browse our gallery of work across all styles and categories.
          </p>
        </div>
      </div>

      <div className="section-padding bg-[#0a0a0a]">
        <div className="container-custom">
          <PortfolioGrid />
        </div>
      </div>

      <CTABanner />
    </>
  );
}
