'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/site';

const carouselImages = [
  { src: '/homepageScrolling1.webp', alt: 'Ink Rise Tattoo Work 1' },
  { src: '/homepageScrolling2webp.webp', alt: 'Ink Rise Tattoo Work 2' },
  { src: '/homepageScrolling3webp.webp', alt: 'Ink Rise Tattoo Work 3' },
  { src: '/homepageScrolling4.webp', alt: 'Ink Rise Tattoo Work 4' },
  { src: '/homepageScrolling5.webp', alt: 'Ink Rise Tattoo Work 5' },
  { src: '/homepageScrolling6.webp', alt: 'Ink Rise Tattoo Work 6' },
  { src: '/homepageScrolling7webp.webp', alt: 'Ink Rise Tattoo Work 7' },
  { src: '/homepageScrolling8.webp', alt: 'Ink Rise Tattoo Work 8' },
];

export default function HeroSection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section
  id="hero"
  className="relative min-h-screen flex flex-col overflow-hidden bg-[#0a0a0a]"
>
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#c9a84c]/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c9a84c]/3 rounded-full blur-[160px]" />
      </div>

<div className="container-custom pt-44 lg:pt-52 xl:pt-56 pb-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="text-[#c9a84c] text-xs font-semibold tracking-[0.2em] uppercase font-inter">
              Premium Tattoo Studio
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-cinzel font-black hero-heading text-[#f5f5f5] mb-6 lg:mb-8"
          >
            Where Skin Becomes
            <br />
            <span className="gold-text">a Canvas</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#888] text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-10 lg:mb-14 font-inter"
          >
            Premium tattoo artistry by world-class artists. Custom designs, hyper-realism, geometric
            masterpieces — every piece is a story etched in skin forever.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 lg:mb-20"
          >
            <Link
              href="/contact#contact"
              className="px-8 lg:px-10 py-4 lg:py-5 bg-gradient-to-r from-[#c9a84c] to-[#a07c28] text-black font-bold text-sm lg:text-base rounded-full hover:from-[#e8c76a] hover:to-[#c9a84c] transition-all duration-200 shadow-xl hover:shadow-[#c9a84c]/40 hover:scale-105 font-inter tracking-wide flex items-center gap-2"
            >
              Book Consultation
              <ChevronRight size={16} />
            </Link>
            <Link
              href="/portfolio"
              className="px-8 lg:px-10 py-4 lg:py-5 bg-transparent border-2 border-[#c9a84c] text-[#c9a84c] font-bold text-sm lg:text-base rounded-full hover:bg-[#c9a84c] hover:text-black transition-all duration-200 hover:scale-105 font-inter tracking-wide"
            >
              View Portfolio
            </Link>
            <Link
              href="/contact#contact"
              className="px-8 lg:px-10 py-4 lg:py-5 bg-[#25D366]/10 border border-[#25D366]/40 text-[#25D366] font-bold text-sm lg:text-base rounded-full hover:bg-[#25D366]/20 transition-all duration-200 hover:scale-105 font-inter tracking-wide flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Contact Us
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Gallery Carousel */}
      <div className="relative overflow-hidden pb-16 lg:pb-20">
        <div className="mb-3 text-center">
          <span className="text-[#555] text-xs font-inter tracking-widest uppercase">Our Work</span>
        </div>

        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <div
          ref={carouselRef}
          className="flex gap-4 lg:gap-6 py-4 animate-scroll-left cursor-grab"
          style={{ width: 'max-content' }}
        >
          {/* Duplicate for infinite loop */}
          {[...carouselImages, ...carouselImages].map((img, i) => (
            <div
              key={i}
              className="relative w-52 h-64 md:w-64 md:h-80 lg:w-72 lg:h-96 xl:w-80 xl:h-[26rem] shrink-0 rounded-xl overflow-hidden border border-[#2a2a2a] hover:border-[#c9a84c]/50 transition-all duration-300 group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 208px, (max-width: 1024px) 256px, 320px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                loading={i < 8 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
