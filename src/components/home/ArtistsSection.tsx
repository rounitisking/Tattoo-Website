'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Instagram } from '@/components/ui/SocialIcons';
import { Artist } from '@/types';
import SectionHeader from '@/components/ui/SectionHeader';

export default function ArtistsSection() {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    fetch('/api/artists', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data: Artist[]) => setArtists(data))
      .catch(() => {});
  }, []);

  return (
    <section id="artists" className="section-padding bg-[#0a0a0a]">
      <div className="container-custom">
        <SectionHeader
          label="Meet the Team"
          title="Our"
          titleHighlight="Artists"
          subtitle="Talented artists who pour their passion into every piece. Each with a unique style and years of expertise."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artists.map((artist, i) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              // Use relative positioning so the Instagram badge (outside Link) overlaps correctly
              className="relative"
            >
              {/* Main card link — wraps the entire card content */}
              <Link href={`/artists/${artist.slug}`} className="block outline-none">
                <div className="bg-[#111111] rounded-2xl overflow-hidden border border-[#2a2a2a] hover:border-[#c9a84c]/60 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(201,168,76,0.15)] active:scale-[0.98] transition-all duration-300 group card-hover">
                  {/* Photo */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={artist.photo}
                      alt={artist.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      unoptimized={artist.photo.startsWith('/uploads/')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-cinzel font-bold text-[#f5f5f5] text-lg group-hover:text-[#c9a84c] transition-colors">
                        {artist.name}
                      </h3>
                      <ChevronRight size={16} className="text-[#555] group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-[#c9a84c] text-xs font-medium font-inter mb-3">{artist.specialty}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2.5 py-1 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full text-[#c9a84c] text-xs font-medium">
                        {artist.experience}
                      </span>
                      <span className="text-[#555] text-xs">Experience</span>
                    </div>
                    {/* Specializations */}
                    <div className="flex flex-wrap gap-1.5">
                      {artist.specializations.slice(0, 3).map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-0.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-[#888] text-xs"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>

              {/*
               * Instagram badge — placed OUTSIDE the <Link> to avoid <a> inside <a>.
               * Absolutely positioned over the card photo area using z-10.
               * The z-index ensures it sits above the Link but receives its own clicks.
               */}
              <a
                href={artist.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${artist.name} on Instagram`}
                className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-[#f5f5f5] hover:text-[#c9a84c] transition-colors border border-white/10"
              >
                <Instagram size={15} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
