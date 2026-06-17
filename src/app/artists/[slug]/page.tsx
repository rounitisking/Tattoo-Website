'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { ChevronLeft, ChevronRight, Award, Briefcase, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram } from '@/components/ui/SocialIcons';
import { Artist, PortfolioItem } from '@/types';
import CTABanner from '@/components/home/CTABanner';
import { SITE_CONFIG } from '@/constants/site';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ArtistPage({ params }: Props) {
  const { slug } = use(params);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [artistPortfolio, setArtistPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/artists', { cache: 'no-store' }).then((r) => r.json()),
      fetch('/api/portfolio', { cache: 'no-store' }).then((r) => r.json()),
    ])
      .then(([artists, portfolio]: [Artist[], PortfolioItem[]]) => {
        const decodedSlug = decodeURIComponent(slug);
        const found = artists.find((a) => a.slug === decodedSlug || a.slug === slug);
        if (!found) { setNotFound(true); setLoading(false); return; }
        setArtist(found);
        setArtistPortfolio(
          portfolio.filter((p) => p.artist === found.name)
        );
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !artist) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-cinzel text-3xl text-[#f5f5f5] mb-4">Artist Not Found</h1>
        <Link href="/artists" className="text-[#c9a84c] hover:underline">← Back to Artists</Link>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: artist.name,
    jobTitle: artist.specialty,
    worksFor: { '@type': 'Organization', name: SITE_CONFIG.name },
    sameAs: [artist.instagram],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="pt-24 pb-0 bg-[#0d0d0d]">
        <div className="container-custom">
          <Link href="/artists" className="inline-flex items-center gap-2 text-[#888] hover:text-[#c9a84c] text-sm mb-8 transition-colors font-inter">
            <ChevronLeft size={16} /> Back to Artists
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Photo */}
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden border border-[#2a2a2a] aspect-[4/5]">
                <Image
                  src={artist.photo}
                  alt={artist.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                  priority
                  unoptimized={artist.photo.startsWith('/uploads/')}
                />
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-3">
              <span className="inline-block text-[#c9a84c] text-xs font-semibold tracking-[0.3em] uppercase mb-3 font-inter">
                Tattoo Artist
              </span>
              <h1 className="font-cinzel font-black text-4xl md:text-5xl text-[#f5f5f5] mb-2 leading-tight">
                {artist.name}
              </h1>
              <p className="text-[#c9a84c] text-lg font-medium mb-4 font-inter">{artist.specialty}</p>
              <div className="gold-divider mb-6" />

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a] flex items-center gap-3">
                  <Briefcase size={18} className="text-[#c9a84c]" />
                  <div>
                    <p className="text-[#555] text-xs font-inter">Experience</p>
                    <p className="text-[#f5f5f5] font-semibold font-cinzel">{artist.experience}</p>
                  </div>
                </div>
                <a
                  href={artist.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a] flex items-center gap-3 hover:border-[#c9a84c]/50 transition-colors group"
                >
                  <Instagram size={18} className="text-[#c9a84c]" />
                  <div>
                    <p className="text-[#555] text-xs font-inter">Follow</p>
                    <p className="text-[#f5f5f5] font-semibold font-cinzel group-hover:text-[#c9a84c] transition-colors">Instagram</p>
                  </div>
                </a>
              </div>

              {/* Bio */}
              <h2 className="font-cinzel font-semibold text-[#f5f5f5] text-lg mb-3">Biography</h2>
              <p className="text-[#888] text-sm leading-relaxed mb-6 font-inter">{artist.bio}</p>

              {/* Specializations */}
              <h2 className="font-cinzel font-semibold text-[#f5f5f5] text-base mb-3">Specializations</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {artist.specializations.map((spec) => (
                  <span key={spec} className="px-3 py-1.5 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full text-[#c9a84c] text-xs font-medium font-inter">
                    {spec}
                  </span>
                ))}
              </div>

              {/* Awards */}
              {artist.awards.length > 0 && (
                <>
                  <h2 className="font-cinzel font-semibold text-[#f5f5f5] text-base mb-3">Awards &amp; Recognition</h2>
                  <ul className="space-y-2">
                    {artist.awards.map((award) => (
                      <li key={award} className="flex items-start gap-2 text-sm text-[#888] font-inter">
                        <Award size={14} className="text-[#c9a84c] mt-0.5 shrink-0" />
                        {award}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Book CTA */}
              <div className="mt-8">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(`Hi! I'd like to book a session with ${artist.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#c9a84c] to-[#a07c28] text-black font-bold text-sm rounded-full hover:from-[#e8c76a] hover:to-[#c9a84c] transition-all duration-200 shadow-xl font-inter"
                >
                  Book a Session with {artist.name.split(' ')[0]}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Preview */}
      {artistPortfolio.length > 0 && (
        <section className="section-padding bg-[#0a0a0a]">
          <div className="container-custom">
            <h2 className="font-cinzel font-bold text-2xl text-[#f5f5f5] mb-8">
              Portfolio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {artistPortfolio.map((item, index) => (
                <div 
                  key={item.id} 
                  className="relative rounded-xl overflow-hidden border border-[#2a2a2a] group aspect-square cursor-pointer"
                  onClick={() => setLightboxIndex(index)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    unoptimized={item.image.startsWith('/uploads/')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-2">
                      <ZoomIn size={20} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs font-semibold font-cinzel">{item.title}</p>
                    <p className="text-[#c9a84c] text-xs font-inter">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : artistPortfolio.length - 1)); }}
              className="absolute left-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i !== null && i < artistPortfolio.length - 1 ? i + 1 : 0)); }}
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
              <div className="relative w-full" style={{ aspectRatio: `${artistPortfolio[lightboxIndex].width}/${artistPortfolio[lightboxIndex].height}`, maxHeight: '80vh' }}>
                <Image
                  src={artistPortfolio[lightboxIndex].image}
                  alt={artistPortfolio[lightboxIndex].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-contain rounded-xl"
                  priority
                  unoptimized={artistPortfolio[lightboxIndex].image.startsWith('/uploads/')}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-xl">
                <p className="text-white font-semibold font-cinzel">{artistPortfolio[lightboxIndex].title}</p>
                <p className="text-[#c9a84c] text-sm font-inter">{artistPortfolio[lightboxIndex].category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTABanner />
    </>
  );
}
