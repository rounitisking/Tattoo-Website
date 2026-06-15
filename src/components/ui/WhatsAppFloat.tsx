'use client';

import { SITE_CONFIG } from '@/constants/site';
import Image from 'next/image';

export default function WhatsAppFloat() {
  const url = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300 whatsapp-pulse group"
    >
      <Image 
        src="/whatsappIcon.webp" 
        alt="WhatsApp" 
        width={56} 
        height={56} 
        className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(37,211,102,0.4)]"
      />
      <span className="absolute right-16 bg-[#111111] text-[#f5f5f5] text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-[#2a2a2a] shadow-lg">
        Chat with us
      </span>
    </a>
  );
}
