import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/site';

export default function CTABanner() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0d0d0d]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/10 via-transparent to-[#c9a84c]/5" />
      {/* Decorative lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#c9a84c]/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#c9a84c]/10 to-transparent" />
      </div>

      <div className="container-custom relative z-10 text-center">
        <span className="inline-block text-[#c9a84c] text-xs font-semibold tracking-[0.3em] uppercase mb-4 font-inter">
          Ready to Get Inked?
        </span>
        <h2 className="font-cinzel font-black text-3xl md:text-4xl lg:text-5xl text-[#f5f5f5] mb-4 leading-tight">
          Your Next Tattoo
          <br />
          <span className="gold-text">Starts Here</span>
        </h2>
        <p className="text-[#888] text-base md:text-lg max-w-xl mx-auto mb-10 font-inter leading-relaxed">
          Book a free consultation and let our artists transform your vision into a masterpiece that lasts a lifetime.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact#contact"
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#c9a84c] to-[#a07c28] text-black font-bold text-sm rounded-full hover:from-[#e8c76a] hover:to-[#c9a84c] transition-all duration-200 shadow-xl hover:shadow-[#c9a84c]/40 hover:scale-105 font-inter"
          >
            Book Free Consultation
            <ChevronRight size={16} />
          </Link>
          <Link
            href="/portfolio"
            className="flex items-center gap-2 px-8 py-4 border-2 border-[#c9a84c]/50 text-[#c9a84c] font-bold text-sm rounded-full hover:bg-[#c9a84c]/10 transition-all duration-200 font-inter"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
