'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { Review } from '@/types';
import SectionHeader from '@/components/ui/SectionHeader';
import { SITE_CONFIG } from '@/constants/site';

interface ReviewsApiResponse {
  source: 'google' | 'admin';
  placeRating: number | null;
  totalRatings: number | null;
  reviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? 'text-[#f59e0b] fill-[#f59e0b]' : 'text-[#333]'}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [data, setData] = useState<ReviewsApiResponse | null>(null);

  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((json: ReviewsApiResponse) => setData(json))
      .catch(() => {});
  }, []);

  const reviews = data?.reviews ?? [];
  const isGoogleSource = data?.source === 'google';

  // Hardcode rating and count as requested
  const displayRating = '5.0';
  const displayCount = 125;

  return (
    <section id="reviews" className="section-padding bg-[#0d0d0d]">
      <div className="container-custom">
        <SectionHeader
          label="Client Love"
          title="Google"
          titleHighlight="Reviews"
          subtitle="Don't just take our word for it — hear what our clients say about their experience at Ink Rise."
        />

        {/* Rating Summary */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 p-6 bg-[#111111] rounded-2xl border border-[#2a2a2a] max-w-lg mx-auto">
          <div className="text-center">
            <div className="font-cinzel font-black text-5xl text-[#c9a84c]">{displayRating}</div>
            <StarRating rating={5} />
            <p className="text-[#888] text-xs mt-1 font-inter">Average Rating</p>
          </div>
          <div className="h-16 w-px bg-[#2a2a2a] hidden sm:block" />
          <div className="text-center">
            <div className="font-cinzel font-bold text-3xl text-[#f5f5f5]">
              {displayCount > 0 ? `${displayCount}+` : '—'}
            </div>
            <p className="text-[#888] text-xs mt-1 font-inter">
              {isGoogleSource ? 'Google Reviews' : 'Verified Reviews'}
            </p>
            <a
              href={SITE_CONFIG.googleReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-[#c9a84c] text-xs hover:underline"
            >
              View on Google →
            </a>
          </div>
          {isGoogleSource && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a2a1a] border border-green-800/40 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="text-[#4ade80] text-[10px] font-medium font-inter">Live from Google</span>
            </div>
          )}
        </div>

        {/* Reviews Grid */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="bg-[#111111] rounded-xl p-5 border border-[#2a2a2a] hover:border-[#c9a84c]/30 transition-all duration-300 group relative"
              >
                <Quote size={18} className="text-[#c9a84c]/30 mb-3" />
                <p className="text-[#aaa] text-sm leading-relaxed mb-4 line-clamp-4 font-inter">
                  {review.text}
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  {/* Avatar: use Google photo if available, else initial */}
                  {review.avatar ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#2a2a2a]"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/30 flex items-center justify-center shrink-0">
                      <span className="text-[#c9a84c] text-xs font-bold font-cinzel">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-[#f5f5f5] text-sm font-semibold font-inter leading-none mb-1">
                      {review.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <StarRating rating={review.rating} />
                      <span className="text-[#555] text-xs">· {review.date}</span>
                    </div>
                  </div>
                </div>
                {review.verified && (
                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#4ade80]" />
                    <span className="text-[#4ade80] text-[10px] font-medium">Verified</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-[#111111] rounded-xl p-5 border border-[#2a2a2a] animate-pulse h-48" />
            ))}
          </div>
        )}

        {/* Write Review CTA */}
        <div className="text-center mt-10">
          <a
            href={SITE_CONFIG.googleReviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#c9a84c]/40 text-[#c9a84c] rounded-full text-sm font-medium hover:bg-[#c9a84c]/10 transition-all duration-200 font-inter"
          >
            <Star size={14} className="fill-[#c9a84c]" />
            Write a Review on Google
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
