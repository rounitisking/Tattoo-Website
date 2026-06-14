import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Instagram } from '@/components/ui/SocialIcons';
import { artists } from '@/data/artists';
import CTABanner from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Our Artists',
  description:
    'Meet the talented artists at Ink Rise Tattoo Studio. Specialists in realism, geometric, colour, portrait, and more tattoo styles.',
};

export default function ArtistsPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container-custom text-center">
          <span className="inline-block text-[#c9a84c] text-xs font-semibold tracking-[0.3em] uppercase mb-4 font-inter">
            The Team
          </span>
          <h1 className="font-cinzel font-black section-heading text-[#f5f5f5] mb-5 lg:mb-6">
            Meet Our <span className="gold-text">Artists</span>
          </h1>
          <div className="gold-divider mx-auto mb-5" />
          <p className="text-[#888] text-base lg:text-lg max-w-2xl mx-auto font-inter leading-relaxed">
            Passionate, skilled, and dedicated — our artists bring years of expertise and a unique creative
            voice to every tattoo.
          </p>
        </div>
      </div>

      <section className="section-padding bg-[#0a0a0a]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {artists.map((artist) => (
              <div key={artist.id} className="relative bg-[#111111] rounded-2xl overflow-hidden border border-[#2a2a2a] hover:border-[#c9a84c]/50 transition-all duration-300 group card-hover">
                <Link href={`/artists/${artist.slug}`} className="block">
                  <div className="relative h-80 lg:h-96 overflow-hidden">
                    <Image
                      src={artist.photo}
                      alt={artist.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                  </div>
                  <div className="p-6 lg:p-8">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="font-cinzel font-bold text-xl lg:text-2xl text-[#f5f5f5] group-hover:text-[#c9a84c] transition-colors">
                        {artist.name}
                      </h2>
                      <ChevronRight size={18} className="text-[#555] group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-[#c9a84c] text-sm font-medium mb-4 font-inter">{artist.specialty}</p>
                    <p className="text-[#888] text-sm leading-relaxed mb-5 font-inter line-clamp-3">{artist.bio}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full text-[#c9a84c] text-xs font-medium">
                        {artist.experience} Experience
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {artist.specializations.map((spec) => (
                        <span key={spec} className="px-2 py-0.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-[#888] text-xs">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
                {/* Absolute Instagram badge - outside Link to avoid nested <a> and click handlers */}
                <a
                  href={artist.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/60 rounded-full flex items-center justify-center text-white hover:text-[#c9a84c] border border-white/10 transition-colors"
                >
                  <Instagram size={15} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
