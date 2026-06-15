'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { Instagram } from '@/components/ui/SocialIcons';
import { SITE_CONFIG } from '@/constants/site';
import SectionHeader from '@/components/ui/SectionHeader';

interface InstagramPost {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/instagram')
      .then((res) => res.json())
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setPosts(res.data.slice(0, 8)); // Show latest 8 posts
        }
      })
      .catch((err) => console.error('Error loading Instagram feed:', err))
      .finally(() => setIsLoading(false));
  }, []);

  // If there are no posts (e.g., API not configured yet), do not render the section to keep UI clean
  if (!isLoading && posts.length === 0) {
    return null; 
  }

  return (
    <section className="section-padding bg-[#0d0d0d] border-t border-[#1a1a1a]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <SectionHeader
            label="Social Feed"
            title="Follow on"
            titleHighlight="Instagram"
            subtitle="Stay updated with our latest tattoos, behind-the-scenes, and studio life."
          />
          <a
            href={SITE_CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#111111] border border-[#2a2a2a] hover:border-[#c9a84c] text-[#f5f5f5] rounded-full transition-all duration-300 group shadow-lg"
          >
            <Instagram size={18} className="text-[#c9a84c] group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-sm">@ink_rise_tattoos</span>
          </a>
        </div>

        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-[#1a1a1a] rounded-xl animate-pulse border border-[#2a2a2a]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {posts.map((post) => {
              const isVideo = post.media_type === 'VIDEO';
              const imageUrl = isVideo && post.thumbnail_url ? post.thumbnail_url : post.media_url;

              return (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square rounded-xl overflow-hidden bg-[#111111] border border-[#2a2a2a] hover:border-[#c9a84c]/50 hover:shadow-[0_8px_30px_rgba(201,168,76,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <Image
                    src={imageUrl}
                    alt={post.caption?.slice(0, 50) || 'Instagram post'}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <Instagram size={32} className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" />
                  </div>

                  {/* Video Indicator */}
                  {isVideo && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white pointer-events-none">
                      <Play size={14} className="ml-0.5" />
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
