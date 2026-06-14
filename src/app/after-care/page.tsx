'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertOctagon, CheckCircle2, Clock, Calendar, Bookmark, Info } from 'lucide-react';
import { afterCareContent } from '@/data/aftercare';
import { SITE_CONFIG } from '@/constants/site';

export default function AfterCarePage() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const currentContent = afterCareContent[lang];

  // Helper icons for sections
  const getSectionIcon = (index: number, title: string) => {
    if (title.toLowerCase().includes('avoid') || title.includes('बचें')) {
      return <AlertOctagon className="text-red-500 shrink-0" size={24} />;
    }
    switch (index) {
      case 0:
        return <Clock className="text-[#c9a84c] shrink-0" size={24} />;
      case 1:
        return <Calendar className="text-[#c9a84c] shrink-0" size={24} />;
      case 2:
        return <Bookmark className="text-[#c9a84c] shrink-0" size={24} />;
      default:
        return <ShieldCheck className="text-[#c9a84c] shrink-0" size={24} />;
    }
  };

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container-custom text-center">
          <span className="inline-block text-[#c9a84c] text-xs font-semibold tracking-[0.3em] uppercase mb-4 font-inter">
            {lang === 'en' ? 'Tattoo Healing Guide' : 'टैटू हीलिंग गाइड'}
          </span>
          <h1 className="font-cinzel font-black section-heading text-[#f5f5f5] mb-5 lg:mb-6">
            {lang === 'en' ? 'Aftercare ' : 'देखभाल '}<span className="gold-text">{lang === 'en' ? 'Instructions' : 'निर्देश'}</span>
          </h1>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-[#888] text-base lg:text-lg max-w-2xl mx-auto font-inter mb-8 leading-relaxed">
            {lang === 'en'
              ? 'Proper aftercare is essential to protect your health and ensure the longevity and vibrancy of your artwork.'
              : 'आपके स्वास्थ्य की रक्षा करने और आपकी कलाकृति की दीर्घायु और जीवंतता सुनिश्चित करने के लिए उचित देखभाल आवश्यक है।'}
          </p>

          {/* Language Toggle */}
          <div className="inline-flex p-1 bg-[#111111] border border-[#2a2a2a] rounded-full">
            <button
              onClick={() => setLang('en')}
              className={`px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 font-inter cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#c9a84c] text-black shadow-md'
                  : 'text-[#888] hover:text-[#f5f5f5]'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 font-inter cursor-pointer ${
                lang === 'hi'
                  ? 'bg-[#c9a84c] text-black shadow-md'
                  : 'text-[#888] hover:text-[#f5f5f5]'
              }`}
            >
              हिंदी (Hindi)
            </button>
          </div>
        </div>
      </div>

      <section className="section-padding bg-[#0a0a0a]">
        <div className="container-custom max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={lang}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2"
            >
              {currentContent.map((section, idx) => {
                const isAvoidSection =
                  section.title.toLowerCase().includes('avoid') ||
                  section.title.includes('बचें');

                return (
                  <div
                    key={section.title}
                    className={`bg-[#111111] rounded-2xl border p-6 md:p-8 shadow-xl relative overflow-hidden transition-all duration-300 ${
                      isAvoidSection
                        ? 'border-red-900/30 hover:border-red-500/30 md:col-span-2'
                        : 'border-[#2a2a2a] hover:border-[#c9a84c]/30'
                    }`}
                  >
                    {/* Background glow card */}
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none ${
                        isAvoidSection ? 'bg-red-500/5' : 'bg-[#c9a84c]/5'
                      }`}
                    />

                    {/* Section Header */}
                    <div className="flex items-center gap-4 mb-6 border-b border-[#2a2a2a] pb-4">
                      {getSectionIcon(idx, section.title)}
                      <h2
                        className={`font-cinzel font-bold text-lg md:text-xl ${
                          isAvoidSection ? 'text-red-400' : 'text-[#f5f5f5]'
                        }`}
                      >
                        {section.title}
                      </h2>
                    </div>

                    {/* Section Items */}
                    <ul
                      className={`grid gap-4 ${
                        isAvoidSection
                          ? 'grid-cols-1 md:grid-cols-2 md:gap-x-8'
                          : 'grid-cols-1'
                      }`}
                    >
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm md:text-base font-inter text-[#ccc] leading-relaxed">
                          {isAvoidSection ? (
                            <AlertOctagon size={16} className="text-red-500 shrink-0 mt-1" />
                          ) : (
                            <CheckCircle2 size={16} className="text-[#c9a84c] shrink-0 mt-1" />
                          )}
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Quick Notice */}
          <div className="mt-12 bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 flex items-start gap-4 shadow-lg">
            <Info className="text-[#c9a84c] shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-cinzel font-semibold text-[#f5f5f5] text-sm mb-1">
                {lang === 'en' ? 'Important Reminder' : 'महत्वपूर्ण अनुस्मारक'}
              </h4>
              <p className="text-[#888] text-xs md:text-sm font-inter leading-relaxed">
                {lang === 'en'
                  ? `Every skin type is unique. Follow the specific instructions provided by your artist. If you experience excessive swelling, throbbing pain, unusual discharge, or fever, please contact us immediately or consult a healthcare professional. You can call our studio at ${SITE_CONFIG.phoneDisplay}.`
                  : `हर त्वचा प्रकार अनोखा होता है। अपने टैटू कलाकार द्वारा दिए गए विशिष्ट निर्देशों का पालन करें। यदि आपको अत्यधिक सूजन, तेज दर्द, असामान्य मवाद, या बुखार महसूस होता है, तो तुरंत हमसे संपर्क करें या चिकित्सक से सलाह लें। आप हमारे स्टूडियो को ${SITE_CONFIG.phoneDisplay} पर कॉल कर सकते हैं।`}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
