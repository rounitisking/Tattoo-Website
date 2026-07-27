// 'use client';

// import { useRef } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { ChevronRight } from 'lucide-react';
// import { SITE_CONFIG } from '@/constants/site';

// const carouselImages = [
//   { src: "/portrait tattoo/WhatsApp Image 2026-07-20 at 16.04.10.webp", alt: 'Ink Rise Tattoo Work 1' },
//   { src: "/geometric tattoo/WhatsApp Image 2026-07-20 at 11.43.01.webp", alt: 'Ink Rise Tattoo Work 2' },
//   { src: "/butterlfy tattoo/WhatsApp Image 2026-07-20 at 16.04.03.webp", alt: 'Ink Rise Tattoo Work 3' },
//   { src: "/animal tattoo/WhatsApp Image 2026-07-20 at 16.04.08.webp", alt: 'Ink Rise Tattoo Work 4' },
//   { src: "/spritual tattoo/WhatsApp Image 2026-07-20 at 11.43.08.webp", alt: 'Ink Rise Tattoo Work 5' },
//   { src: "/eagle tattoo/WhatsApp Image 2026-07-20 at 16.04.07 (1).webp", alt: 'Ink Rise Tattoo Work 6' },
//   { src: "/calligraphy tattoo/WhatsApp Image 2026-07-20 at 11.43.05 (1).webp", alt: 'Ink Rise Tattoo Work 7' },
//   { src: "/arm tattoo/WhatsApp Image 2026-07-20 at 16.04.02.webp", alt: 'Ink Rise Tattoo Work 8' },
//   { src: "/coverup tattoo/WhatsApp Image 2026-07-20 at 11.42.57 (2).webp", alt: 'Ink Rise Tattoo Work 9' },
//   { src: "/calligraphy tattoo/WhatsApp Image 2026-07-20 at 11.43.17 (2).webp", alt: 'Ink Rise Tattoo Work 10' },
//   { src: "/small tattoo/WhatsApp Image 2026-07-20 at 11.42.59.webp", alt: 'Ink Rise Tattoo Work 11' },
//   { src: "/color tattoo /WhatsApp Image 2026-07-20 at 16.04.06 (1).webp", alt: 'Ink Rise Tattoo Work 12' }
// ];

// export default function HeroSection() {
//   const carouselRef = useRef<HTMLDivElement>(null);

//   return (
//     <section
//       id="hero"
//       className="relative w-full bg-[#050505] flex flex-col"
//     >
//       {/* FIRST SCREEN: HERO BANNER (100vh) */}
//       <div className="relative w-full h-screen flex flex-col justify-between overflow-hidden">
//         {/* Background Image */}
//         <div className="absolute inset-0 z-0">
//           <Image
//             src="/coverphoto.webp"
//             alt="Tattoo Artistry"
//             fill
//             priority
//             className="object-cover"
//           />
//           {/* Subtle dark overlay / gradient to improve text contrast */}
//           <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent z-10" />
//           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30 z-10" />
//         </div>

//         {/* Top spacer for navbar */}
//         <div className="h-16 lg:h-[72px] xl:h-20 shrink-0 z-20" />

//         {/* Hero content overlay aligned to the left, vertically centered */}
//         <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-28 flex-grow flex items-center">
//           <div className="max-w-[780px] text-left">
//             {/* Label / Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-[40px]"
//             >
//               <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
//               <span className="text-[#D4AF37] text-[11px] sm:text-sm font-semibold tracking-[0.2em] uppercase font-inter">
//                 Premium Tattoo Studio
//               </span>
//             </motion.div>

//             {/* Main Title */}
//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="font-inter font-black hero-heading text-[#FFFFFF] mb-[56px] tracking-tight leading-none"
//               style={{ lineHeight: '1.05' }}
//             >
//               Where Skin
//               <br />
//               Becomes
//               <br />
//               <span className="text-[#D4AF37]">a Canvas</span>
//             </motion.h1>

//             {/* Subtitle / Description */}
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="text-[#C8C8C8] text-base md:text-lg lg:text-xl leading-relaxed mb-[52px] font-inter max-w-[620px]"
//             >
//               Premium tattoo artistry by world-class artists. Custom designs, hyper-realism, geometric
//               masterpieces — every piece is a story etched in skin forever.
//             </motion.p>

//             {/* CTA Buttons in one row */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="flex flex-wrap items-center justify-start gap-4 sm:gap-6 mb-[40px]"
//             >
//               <Link
//                 href="/contact#contact"
//                 className="px-7 sm:px-9 py-4 bg-[#D4AF37] text-[#050505] font-bold text-sm sm:text-base rounded-[10px] hover:bg-[#F3E5AB] transition-colors font-inter tracking-wide flex items-center justify-center gap-1.5"
//               >
//                 Book Consultation <span className="font-normal ml-0.5">&gt;</span>
//               </Link>
//               <Link
//                 href="/portfolio"
//                 className="px-7 sm:px-9 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-bold text-sm sm:text-base rounded-[10px] hover:bg-[#D4AF37]/10 transition-colors font-inter tracking-wide text-center flex items-center justify-center gap-1.5"
//               >
//                 View Portfolio <span className="font-normal ml-0.5">&gt;</span>
//               </Link>
//               <Link
//                 href="/contact#contact"
//                 className="px-7 sm:px-9 py-4 bg-transparent border border-[#25D366] text-[#25D366] font-bold text-sm sm:text-base rounded-[10px] hover:bg-[#25D366]/10 transition-colors font-inter tracking-wide flex items-center justify-center gap-2"
//               >
//                 <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
//                 Contact Us
//               </Link>
//             </motion.div>

//             {/* Our Work section centered relative to the content block */}
//             <div className="flex items-center justify-center gap-3 text-center max-w-[420px] mx-auto sm:mx-0 mt-8">
//               <div className="h-[1px] bg-[#D4AF37]/45 flex-grow" />
//               <span className="text-[#D4AF37] text-xs font-inter tracking-[0.25em] uppercase font-bold">
//                 Our Work
//               </span>
//               <div className="h-[1px] bg-[#D4AF37]/45 flex-grow" />
//             </div>

//           </div>
//         </div>

//         {/* Text Marquee Luxury Ticker at the exact bottom edge of the first screen */}
//         <div className="w-full bg-black/60 border-t border-[#2A2A2A] py-3.5 overflow-hidden z-20 relative">
//           <div className="flex gap-16 whitespace-nowrap animate-scroll-left text-xs font-inter tracking-[0.25em] uppercase font-bold text-[#f5f5f5]">
//             {Array(10).fill([
//               "Custom Tattoos",
//               "Realism",
//               "Portraits",
//               "Fineline",
//               "Geometric",
//               "Cover Ups",
//               "Black & Grey"
//             ]).flat().map((item, idx) => (
//               <span key={idx} className="flex items-center gap-4">
//                 <span>{item}</span>
//                 <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* SECOND SCREEN / PUSHED BELOW THE FOLD: Gallery Carousel */}
//       <div className="relative overflow-hidden py-8 lg:py-12 z-20 w-full bg-[#050505] border-t border-[#2A2A2A]">
//         {/* Fade masks */}
//         <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
//         <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

//         <div
//           ref={carouselRef}
//           className="flex gap-4 lg:gap-6 py-2 animate-scroll-left cursor-grab"
//           style={{ width: 'max-content' }}
//         >
//           {/* Duplicate for infinite loop */}
//           {[...carouselImages, ...carouselImages].map((img, i) => (
//             <div
//               key={i}
//               className="relative w-44 h-56 md:w-52 md:h-64 lg:w-60 lg:h-72 shrink-0 rounded-xl overflow-hidden border border-[#2a2a2a] hover:border-[#D4AF37]/50 transition-all duration-300 group"
//             >
//               <Image
//                 src={img.src}
//                 alt={img.alt}
//                 fill
//                 sizes="(max-width: 768px) 176px, (max-width: 1024px) 208px, 240px"
//                 className="object-cover group-hover:scale-105 transition-transform duration-500"
//                 loading={i < 8 ? 'eager' : 'lazy'}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const carouselImages = [
  { src: "/portrait tattoo/WhatsApp Image 2026-07-20 at 16.04.10.webp", alt: 'Ink Rise Tattoo Work 1' },
  { src: "/geometric tattoo/WhatsApp Image 2026-07-20 at 11.43.01.webp", alt: 'Ink Rise Tattoo Work 2' },
  { src: "/butterlfy tattoo/WhatsApp Image 2026-07-20 at 16.04.03.webp", alt: 'Ink Rise Tattoo Work 3' },
  { src: "/animal tattoo/WhatsApp Image 2026-07-20 at 16.04.08.webp", alt: 'Ink Rise Tattoo Work 4' },
  { src: "/spritual tattoo/WhatsApp Image 2026-07-20 at 11.43.08.webp", alt: 'Ink Rise Tattoo Work 5' },
  { src: "/eagle tattoo/WhatsApp Image 2026-07-20 at 16.04.07 (1).webp", alt: 'Ink Rise Tattoo Work 6' },
  { src: "/calligraphy tattoo/WhatsApp Image 2026-07-20 at 11.43.05 (1).webp", alt: 'Ink Rise Tattoo Work 7' },
  { src: "/arm tattoo/WhatsApp Image 2026-07-20 at 16.04.02.webp", alt: 'Ink Rise Tattoo Work 8' },
  { src: "/coverup tattoo/WhatsApp Image 2026-07-20 at 11.42.57 (2).webp", alt: 'Ink Rise Tattoo Work 9' },
  { src: "/calligraphy tattoo/WhatsApp Image 2026-07-20 at 11.43.17 (2).webp", alt: 'Ink Rise Tattoo Work 10' },
  { src: "/small tattoo/WhatsApp Image 2026-07-20 at 11.42.59.webp", alt: 'Ink Rise Tattoo Work 11' },
  { src: "/color tattoo /WhatsApp Image 2026-07-20 at 16.04.06 (1).webp", alt: 'Ink Rise Tattoo Work 12' }
];

export default function HeroSection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      className="relative w-full bg-[#050505] flex flex-col"
    >
      {/* FIRST SCREEN: HERO BANNER (100vh) */}
      <div className="relative w-full h-screen flex flex-col justify-between overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/coverphoto.webp"
            alt="Tattoo Artistry"
            fill
            priority
            className="object-cover"
          />
          {/* Dark overlay / gradient to improve text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30 z-10" />
        </div>

        {/* Top spacer for navbar */}
        <div className="h-16 lg:h-[72px] xl:h-20 shrink-0 z-20" />

        {/* Hero content overlay aligned to the left, vertically centered */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-28 flex-grow flex items-center">
          <div className="max-w-[780px] text-left py-2">
            {/* Label / Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-3.5 py-1 mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[#D4AF37] text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-inter">
                Premium Tattoo Studio
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-inter font-black text-4xl sm:text-6xl lg:text-7xl xl:text-[80px] text-[#FFFFFF] mb-4 tracking-tight"
              style={{ lineHeight: '1.02' }}
            >
              Where Skin
              <br />
              Becomes
              <br />
              <span className="text-[#D4AF37]">a Canvas</span>
            </motion.h1>

            {/* Subtitle / Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#C8C8C8] text-sm md:text-base lg:text-lg leading-relaxed mb-6 font-inter max-w-[580px]"
            >
              Premium tattoo artistry by world-class artists. Custom designs, hyper-realism, geometric
              masterpieces — every piece is a story etched in skin forever.
            </motion.p>

            {/* CTA Buttons in one row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-start gap-3 sm:gap-4 mb-6"
            >
              <Link
                href="/contact#contact"
                className="px-6 sm:px-7 py-3 bg-[#D4AF37] text-[#050505] font-bold text-xs sm:text-sm rounded-[8px] hover:bg-[#F3E5AB] transition-colors font-inter tracking-wide flex items-center justify-center gap-1.5"
              >
                Book Consultation <span className="font-normal ml-0.5">&gt;</span>
              </Link>
              <Link
                href="/portfolio"
                className="px-6 sm:px-7 py-3 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-bold text-xs sm:text-sm rounded-[8px] hover:bg-[#D4AF37]/10 transition-colors font-inter tracking-wide text-center flex items-center justify-center gap-1.5"
              >
                View Portfolio <span className="font-normal ml-0.5">&gt;</span>
              </Link>
              <Link
                href="/contact#contact"
                className="px-6 sm:px-7 py-3 bg-transparent border border-[#25D366] text-[#25D366] font-bold text-xs sm:text-sm rounded-[8px] hover:bg-[#25D366]/10 transition-colors font-inter tracking-wide flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Contact Us
              </Link>
            </motion.div>

            {/* Our Work section centered relative to the content block */}
            <div className="flex items-center justify-center gap-3 text-center max-w-[380px]">
              <div className="h-[1px] bg-[#D4AF37]/45 flex-grow" />
              <span className="text-[#D4AF37] text-[11px] sm:text-xs font-inter tracking-[0.25em] uppercase font-bold">
                Our Work
              </span>
              <div className="h-[1px] bg-[#D4AF37]/45 flex-grow" />
            </div>

          </div>
        </div>

        {/* Text Marquee Luxury Ticker at the exact bottom edge of the first screen */}
        <div className="w-full bg-black/60 border-t border-[#2A2A2A] py-3.5 overflow-hidden z-20 relative">
          <div className="flex gap-16 whitespace-nowrap animate-scroll-left text-xs font-inter tracking-[0.25em] uppercase font-bold text-[#f5f5f5]">
            {Array(10).fill([
              "Custom Tattoos",
              "Realism",
              "Portraits",
              "Fineline",
              "Geometric",
              "Cover Ups",
              "Black & Grey"
            ]).flat().map((item, idx) => (
              <span key={idx} className="flex items-center gap-4">
                <span>{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SECOND SCREEN / PUSHED BELOW THE FOLD: Gallery Carousel */}
      <div className="relative overflow-hidden py-8 lg:py-12 z-20 w-full bg-[#050505] border-t border-[#2A2A2A]">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <div
          ref={carouselRef}
          className="flex gap-4 lg:gap-6 py-2 animate-scroll-left cursor-grab"
          style={{ width: 'max-content' }}
        >
          {/* Duplicate for infinite loop */}
          {[...carouselImages, ...carouselImages].map((img, i) => (
            <div
              key={i}
              className="relative w-44 h-56 md:w-52 md:h-64 lg:w-60 lg:h-72 shrink-0 rounded-xl overflow-hidden border border-[#2a2a2a] hover:border-[#D4AF37]/50 transition-all duration-300 group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 176px, (max-width: 1024px) 208px, 240px"
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