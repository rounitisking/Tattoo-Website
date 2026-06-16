'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { ChevronLeft, Award, Briefcase } from 'lucide-react';
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
          portfolio.filter((p) => p.artist === found.name).slice(0, 6)
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
              {artist.name.split(' ')[0]}&apos;s <span className="gold-text">Work</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {artistPortfolio.map((item) => (
                <div key={item.id} className="relative rounded-xl overflow-hidden border border-[#2a2a2a] group aspect-square">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    unoptimized={item.image.startsWith('/uploads/')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <p className="absolute bottom-3 left-3 text-white text-xs font-semibold font-cinzel opacity-0 group-hover:opacity-100 transition-opacity">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
