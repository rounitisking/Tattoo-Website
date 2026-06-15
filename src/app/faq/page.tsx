'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { faqs } from '@/data/faqs';
import { SITE_CONFIG } from '@/constants/site';

// Accordion Item Component
function FAQAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#2a2a2a] last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left font-cinzel font-semibold text-[#f5f5f5] hover:text-[#c9a84c] transition-colors focus:outline-none select-none group"
      >
        <span className="text-sm md:text-base pr-4 flex items-center gap-3">
          <HelpCircle size={18} className="text-[#c9a84c] shrink-0" />
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`text-[#888] group-hover:text-[#c9a84c] transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-[#c9a84c]' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="pb-5 pr-8 text-[#888] text-sm md:text-base leading-relaxed font-inter pl-7">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Group FAQs by category
  const categories = useMemo(() => {
    const set = new Set(faqs.map((f) => f.category).filter((c): c is string => !!c));
    return ['all', ...Array.from(set)];
  }, []);

  // Filter FAQs based on search and category
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleToggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id]
    );
  };

  // Generate FAQ Schema JSON-LD dynamically
  const faqSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: filteredFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }, [filteredFaqs]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Page Hero */}
      <div className="page-hero">
        <div className="container-custom text-center">
          <span className="inline-block text-[#c9a84c] text-xs font-semibold tracking-[0.3em] uppercase mb-4 font-inter">
            Got Questions?
          </span>
          <h1 className="font-cinzel font-black section-heading text-[#f5f5f5] mb-5 lg:mb-6">
            Frequently Asked <span className="gold-text">Questions</span>
          </h1>
          <div className="gold-divider mx-auto mb-5" />
          <p className="text-[#888] text-base lg:text-lg max-w-2xl mx-auto font-inter leading-relaxed">
            Everything you need to know about getting your next masterpiece at Ink Rise.
          </p>
        </div>
      </div>

      <section className="section-padding bg-[#0a0a0a] min-h-[60vh]">
        <div className="container-custom max-w-5xl">
          {/* Search Bar & Category Filter */}
          <div className="mb-10 lg:mb-12 space-y-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search your question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input pl-12 pr-4 py-4 rounded-xl border-[#2a2a2a] w-full"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" size={20} />
            </div>

            {/* Category tabs — premium pill style */}
            <div className="filter-bar hide-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`filter-btn${activeCategory === cat ? ' active' : ''} capitalize`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion List */}
          <div className="bg-[#111111] rounded-2xl border border-[#2a2a2a] p-4 md:p-8 shadow-xl">
            {filteredFaqs.length > 0 ? (
              <div className="divide-y divide-[#2a2a2a]">
                {filteredFaqs.map((faq) => (
                  <FAQAccordionItem
                    key={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIds.includes(faq.id)}
                    onToggle={() => handleToggle(faq.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[#888] font-inter">No questions found matching your search.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="mt-4 text-[#c9a84c] hover:underline text-sm font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Still Have Questions Box */}
          <div className="mt-16 bg-gradient-to-r from-[#1a1a1a] to-[#111111] border border-[#2a2a2a] rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#c9a84c]/5 rounded-full blur-2xl" />
            <h3 className="font-cinzel font-bold text-xl md:text-2xl text-[#f5f5f5] mb-2">
              Still Have <span className="gold-text">Questions?</span>
            </h3>
            <p className="text-[#888] text-sm md:text-base font-inter max-w-lg mx-auto mb-6">
              If your question isn&apos;t covered here, feel free to contact us. We&apos;re happy to help!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black rounded-full font-semibold text-sm transition-all duration-200 font-inter"
              >
                <Phone size={16} /> Call Us
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('Hi! I have some questions regarding tattoos.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c9a84c] to-[#a07c28] text-black hover:from-[#e8c76a] hover:to-[#c9a84c] rounded-full font-bold text-sm transition-all duration-200 font-inter shadow-md"
              >
                <Image src="/whatsappIcon.webp" alt="WhatsApp" width={20} height={20} className="object-contain" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
