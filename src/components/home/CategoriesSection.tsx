'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { categories } from '@/data/categories';
import SectionHeader from '@/components/ui/SectionHeader';

export default function CategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="categories" className="section-padding bg-[#0d0d0d]">
      <div className="container-custom mb-8">
        <SectionHeader
          label="Browse Styles"
          title="Tattoo"
          titleHighlight="Categories"
          subtitle="Explore our wide range of tattoo styles and find the perfect art form that speaks to you."
        />
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0d0d0d] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0d0d0d] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-6 px-6 snap-container hide-scrollbar"
        >
          {categories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="snap-child shrink-0"
            >
              <Link href={`/categories/${category.slug}`}>
                <div className="relative w-52 h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden border border-[#2a2a2a] hover:border-[#c9a84c]/60 transition-all duration-300 group cursor-pointer card-hover">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 208px, 256px"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 category-card-overlay" />
                  {/* Hover gold shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#c9a84c]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-cinzel font-bold text-[#f5f5f5] text-sm leading-tight group-hover:text-[#c9a84c] transition-colors duration-200">
                        {category.name}
                      </h3>
                      <ChevronRight size={14} className="text-[#c9a84c] shrink-0 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                    <p className="text-[#888] text-xs leading-relaxed line-clamp-2">
                      {category.description}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                      <span className="text-[#c9a84c] text-xs font-medium">{category.count}+ designs</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* View All */}
      <div className="text-center mt-6">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-[#c9a84c] hover:text-[#e8c76a] text-sm font-medium transition-colors duration-200 font-inter group"
        >
          View All Work
          <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
