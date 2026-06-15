'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PortfolioItem } from '@/types';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=400&q=75',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=75',
  'https://images.unsplash.com/photo-1542856204-00101eb6def4?w=400&q=75',
  'https://images.unsplash.com/photo-1562591229-7b18b44b07df?w=400&q=75',
];

export default function AboutSection() {
  const [images, setImages] = useState<string[]>(FALLBACK_IMAGES);

  useEffect(() => {
    fetch('/api/portfolio')
      .then((r) => r.json())
      .then((items: PortfolioItem[]) => {
        const top4 = items.slice(0, 4).map((item) => item.image);
        if (top4.length > 0) setImages(top4);
      })
      .catch(() => {/* keep fallbacks */});
  }, []);

  return (
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
            {images.slice(0, 4).map((src, i) => (
              <div
                key={i}
                className={`relative rounded-xl overflow-hidden border border-[#2a2a2a] ${
                  i === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
                }`}
              >
                <Image
                  src={src}
                  alt={`Tattoo work ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  unoptimized={src.startsWith('/uploads/')}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
