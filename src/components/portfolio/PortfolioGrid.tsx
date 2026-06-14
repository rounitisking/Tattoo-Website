'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioItems } from '@/data/portfolio';
import { cn } from '@/lib/utils';

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Portrait', value: 'portrait-tattoo' },
  { label: 'Geometric', value: 'geometric-tattoo' },
  { label: 'Colour', value: 'colour-tattoo' },
  { label: 'Spiritual', value: 'spiritual-tattoo' },
  { label: 'Butterfly', value: 'butterfly-tattoo' },
  { label: 'Animal', value: 'animal-tattoo' },
  { label: 'Small', value: 'small-tattoo' },
];

export default function PortfolioGrid({ slug }: { slug?: string }) {
  const [activeFilter, setActiveFilter] = useState(slug || 'all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter((p) => p.categorySlug === activeFilter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : filtered.length - 1));
  const next = () => setLightboxIndex((i) => (i !== null && i < filtered.length - 1 ? i + 1 : 0));

  return (
    <>
      {/* Filters */}
      {!slug && (
        <div className="filter-bar hide-scrollbar">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveFilter(opt.value)}
              className={`filter-btn${activeFilter === opt.value ? ' active' : ''}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Masonry Grid */}
      <div className="masonry-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="masonry-item"
            >
              <div
                className="portfolio-card group"
                style={{ aspectRatio: `${item.width}/${item.height}` }}
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-2">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs font-semibold font-inter truncate">{item.title}</p>
                  <p className="text-[#c9a84c] text-xs font-inter">{item.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight size={20} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-3xl max-h-[85vh] w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ aspectRatio: `${filtered[lightboxIndex].width}/${filtered[lightboxIndex].height}`, maxHeight: '80vh' }}>
                <Image
                  src={filtered[lightboxIndex].image}
                  alt={filtered[lightboxIndex].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-contain rounded-xl"
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-xl">
                <p className="text-white font-semibold font-cinzel">{filtered[lightboxIndex].title}</p>
                <p className="text-[#c9a84c] text-sm font-inter">{filtered[lightboxIndex].category} · {filtered[lightboxIndex].artist}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
