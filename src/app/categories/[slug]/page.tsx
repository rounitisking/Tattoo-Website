'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, DollarSign, Zap, Palette, HelpCircle, ArrowRight, Phone, MessageCircle, Star } from 'lucide-react';
import { Category } from '@/types';
import CTABanner from '@/components/home/CTABanner';
import { SITE_CONFIG } from '@/constants/site';

interface Props { params: Promise<{ slug: string }> }

function PainBar({ score }: { score: number }) {
  const colors = ['#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444'];
  return (
    <div className="flex gap-1 items-center mt-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex-1 h-2 rounded-full transition-all" style={{ background: i < score ? colors[Math.min(Math.floor(i / 2), 4)] : '#2a2a2a' }} />
      ))}
      <span className="ml-3 text-sm font-bold text-[#f5f5f5] font-cinzel">{score}/10</span>
    </div>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border border-[#2a2a2a] rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/2 transition-colors cursor-pointer">
        <span className="text-[#f5f5f5] font-medium text-sm font-inter pr-4">{q}</span>
        <ChevronDown size={16} className={`text-[#c9a84c] shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="px-5 pb-4 text-[#888] text-sm font-inter leading-relaxed border-t border-[#1a1a1a] pt-3">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CategoryPage({ params }: Props) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(({ slug: s }) => {
      fetch(`/api/categories/${s}`)
        .then(r => r.ok ? r.json() : null)
        .then(data => { setCategory(data); setLoading(false); });
    });
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-cinzel text-3xl text-[#f5f5f5] mb-4">Category Not Found</h1>
        <Link href="/portfolio" className="text-[#c9a84c] hover:underline">← Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] flex items-end">
        <div className="absolute inset-0">
          <Image src={category.image} alt={category.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        </div>
        <div className="relative container-custom pb-16 pt-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-full mb-4">
              <Star size={11} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-medium tracking-wider font-inter uppercase">{category.count}+ Designs</span>
            </div>
            <h1 className="font-cinzel font-black text-4xl md:text-6xl text-[#f5f5f5] mb-4 leading-tight">
              {category.name}
            </h1>
            <p className="text-[#888] text-base md:text-lg font-inter max-w-2xl leading-relaxed">
              {category.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      {category.intro && (
        <section className="section-padding bg-[#0d0d0d]">
          <div className="container-custom max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-[#c9a84c] to-[#a07c28] rounded-full" />
              <h2 className="font-cinzel font-bold text-2xl md:text-3xl text-[#f5f5f5]">About <span className="gold-text">{category.name}</span></h2>
            </div>
            <p className="text-[#999] text-base md:text-lg font-inter leading-relaxed">{category.intro}</p>
          </div>
        </section>
      )}

      {/* Meaning */}
      {category.meaning && (
        <section className="section-padding bg-[#0a0a0a]">
          <div className="container-custom max-w-4xl">
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-3xl p-8 md:p-10">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center shrink-0">
                  <Palette size={18} className="text-[#c9a84c]" />
                </div>
                <h2 className="font-cinzel font-bold text-xl md:text-2xl text-[#f5f5f5] mt-1">Meaning &amp; Symbolism</h2>
              </div>
              <p className="text-[#999] font-inter leading-relaxed text-base">{category.meaning}</p>
            </div>
          </div>
        </section>
      )}

      {/* Types */}
      {category.types && category.types.length > 0 && (
        <section className="section-padding bg-[#0d0d0d]">
          <div className="container-custom">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-inter font-medium">Styles</span>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#c9a84c]" />
              </div>
              <h2 className="font-cinzel font-bold text-3xl md:text-4xl text-[#f5f5f5]">Types of <span className="gold-text">{category.name}</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {category.types.map((type, i) => (
                <motion.div key={type.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 hover:border-[#c9a84c]/30 transition-all duration-300 card-hover">
                  <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center mb-4">
                    <span className="text-[#c9a84c] font-bold text-xs font-cinzel">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-cinzel font-bold text-[#f5f5f5] text-lg mb-2">{type.name}</h3>
                  <p className="text-[#888] text-sm font-inter leading-relaxed">{type.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Placements */}
      {category.placements && category.placements.length > 0 && (
        <section className="section-padding bg-[#0a0a0a]">
          <div className="container-custom max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-[#c9a84c]" />
              </div>
              <h2 className="font-cinzel font-bold text-2xl md:text-3xl text-[#f5f5f5]">Best <span className="gold-text">Placements</span></h2>
            </div>
            <div className="space-y-3">
              {category.placements.map((p, i) => (
                <motion.div key={p.area} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-4 bg-[#111111] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#c9a84c]/20 transition-all">
                  <div className="w-6 h-6 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#c9a84c] text-[10px] font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-[#f5f5f5] font-semibold text-sm font-cinzel">{p.area}</p>
                    <p className="text-[#888] text-sm font-inter mt-0.5">{p.reason}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pain Level */}
      {category.painLevel && (
        <section className="py-16 bg-[#0d0d0d]">
          <div className="container-custom max-w-4xl">
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center">
                  <Zap size={18} className="text-[#c9a84c]" />
                </div>
                <h2 className="font-cinzel font-bold text-xl md:text-2xl text-[#f5f5f5]">Pain Level</h2>
              </div>
              <PainBar score={category.painLevel.score} />
              <p className="text-[#888] font-inter text-sm mt-4 leading-relaxed">{category.painLevel.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      {category.pricing && (
        <section className="section-padding bg-[#0a0a0a]">
          <div className="container-custom max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center shrink-0">
                <DollarSign size={18} className="text-[#c9a84c]" />
              </div>
              <h2 className="font-cinzel font-bold text-2xl md:text-3xl text-[#f5f5f5]"><span className="gold-text">Pricing</span> Guide</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {([['Small', category.pricing.small, 'Under 4 inches'], ['Medium', category.pricing.medium, '4–8 inches'], ['Large', category.pricing.large, '8 inches+']] as const).map(([size, price, note]) => (
                <div key={size} className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 text-center hover:border-[#c9a84c]/30 transition-all">
                  <p className="text-[#555] text-xs uppercase tracking-wider font-inter mb-2">{note}</p>
                  <p className="font-cinzel font-bold text-2xl text-[#c9a84c] mb-1">{size}</p>
                  <p className="text-[#f5f5f5] font-semibold font-inter">{price}</p>
                </div>
              ))}
            </div>
            {category.pricing.note && (
              <p className="text-[#666] text-xs font-inter border border-[#2a2a2a] rounded-xl px-4 py-3 bg-[#111111]">
                ℹ️ {category.pricing.note}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Design Ideas */}
      {category.designIdeas && category.designIdeas.length > 0 && (
        <section className="section-padding bg-[#0d0d0d]">
          <div className="container-custom max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-[#c9a84c] to-[#a07c28] rounded-full" />
              <h2 className="font-cinzel font-bold text-2xl md:text-3xl text-[#f5f5f5]">Design <span className="gold-text">Ideas</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.designIdeas.map((idea, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 bg-[#111111] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#c9a84c]/20 transition-all">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] mt-2 shrink-0" />
                  <p className="text-[#999] text-sm font-inter">{idea}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {category.faqs && category.faqs.length > 0 && (
        <section className="section-padding bg-[#0a0a0a]">
          <div className="container-custom max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center shrink-0">
                <HelpCircle size={18} className="text-[#c9a84c]" />
              </div>
              <h2 className="font-cinzel font-bold text-2xl md:text-3xl text-[#f5f5f5]">Frequently Asked <span className="gold-text">Questions</span></h2>
            </div>
            <div className="space-y-3">
              {category.faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Book CTA */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="container-custom max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-cinzel font-black text-3xl md:text-4xl text-[#f5f5f5] mb-4">
              Ready for Your <span className="gold-text">{category.name}?</span>
            </h2>
            <p className="text-[#888] font-inter mb-8 text-base">Book a free consultation with our artists and bring your vision to life.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#c9a84c] to-[#a07c28] text-black font-bold rounded-full hover:from-[#e8c76a] hover:to-[#c9a84c] transition-all shadow-xl">
                <Image src="/whatsappIcon.webp" alt="WhatsApp" width={20} height={20} className="object-contain" /> Book via WhatsApp
              </a>
              <a href={`tel:${SITE_CONFIG.phone}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#c9a84c]/40 text-[#c9a84c] rounded-full hover:bg-[#c9a84c]/10 transition-all font-semibold">
                <Phone size={16} /> Call Us
              </a>
            </div>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-[#555] hover:text-[#888] text-sm font-inter mt-8 transition-colors">
              ← View All Portfolio <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
