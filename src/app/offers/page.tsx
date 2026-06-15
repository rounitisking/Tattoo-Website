'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tag, ChevronRight } from 'lucide-react';
import { Offer } from '@/types';
import CTABanner from '@/components/home/CTABanner';

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/offers', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data: Offer[]) => {
        if (Array.isArray(data)) {
          // Filter to active offers only
          setOffers(data.filter(o => o.isActive));
        }
      })
      .catch((err) => console.error('Failed to load offers', err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="container-custom text-center">
          <span className="inline-flex items-center gap-2 text-red-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 font-inter">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Limited Time
          </span>
          <h1 className="font-cinzel font-black section-heading text-[#f5f5f5] mb-5 lg:mb-6 drop-shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            Exclusive <span className="text-red-500">Offers</span>
          </h1>
          <div className="gold-divider mx-auto mb-5" />
          <p className="text-[#888] text-base lg:text-lg max-w-2xl mx-auto font-inter leading-relaxed">
            Take advantage of our current specials, flash sales, and exclusive tattoo packages. 
            Offers are valid for a limited time only.
          </p>
        </div>
      </div>

      <section className="section-padding bg-[#0a0a0a]">
        <div className="container-custom max-w-6xl">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="animate-pulse bg-[#111111] rounded-3xl h-96 border border-[#2a2a2a]" />
              ))}
            </div>
          ) : offers.length === 0 ? (
            <div className="text-center py-20 bg-[#111111] rounded-3xl border border-[#2a2a2a]">
              <Tag size={48} className="mx-auto text-[#444] mb-4" />
              <h2 className="text-xl font-bold text-[#f5f5f5] mb-2 font-cinzel">No Active Offers</h2>
              <p className="text-[#888] font-inter">Check back soon or follow us on Instagram for flash sales!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {offers.map((offer) => (
                <div 
                  key={offer.id} 
                  className="group relative bg-[#111111] rounded-3xl overflow-hidden border border-[#2a2a2a] hover:border-red-500/50 hover:shadow-[0_8px_40px_rgba(239,68,68,0.15)] transition-all duration-500 flex flex-col"
                >
                  {/* Media Section */}
                  <div className="relative w-full aspect-video sm:aspect-[16/10] overflow-hidden bg-black">
                    {offer.mediaType === 'video' ? (
                      <video
                        src={offer.mediaUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <Image
                        src={offer.mediaUrl}
                        alt={offer.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        unoptimized={offer.mediaUrl.startsWith('/uploads/')}
                      />
                    )}
                    {/* Badge Overlay */}
                    <div className="absolute top-4 left-4 z-10 px-4 py-1.5 bg-red-500/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg border border-red-400/50 flex items-center gap-2">
                      <Tag size={12} /> Special Offer
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col">
                    <h2 className="font-cinzel font-bold text-2xl text-[#f5f5f5] mb-3 group-hover:text-red-400 transition-colors">
                      {offer.title}
                    </h2>
                    
                    {offer.description && (
                      <p className="text-[#888] text-sm sm:text-base leading-relaxed font-inter mb-6 flex-1">
                        {offer.description}
                      </p>
                    )}

                    <div className="mt-auto pt-6 border-t border-[#2a2a2a]">
                      <Link 
                        href={offer.ctaLink || '/contact'}
                        className="inline-flex items-center justify-between w-full px-6 py-4 bg-[#1a1a1a] hover:bg-red-500 text-[#f5f5f5] hover:text-white rounded-xl font-semibold transition-all duration-300 group/btn"
                      >
                        {offer.ctaText || 'Claim Offer'}
                        <ChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
