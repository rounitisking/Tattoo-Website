import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Instagram, Facebook, Youtube } from '@/components/ui/SocialIcons';
import { SITE_CONFIG, NAV_ITEMS } from '@/constants/site';

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-[#2a2a2a]">
      {/* Main Footer */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#a07c28] flex items-center justify-center shadow-lg">
                <span className="text-black font-bold text-sm font-cinzel">IR</span>
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel font-bold text-[#f5f5f5] text-base leading-tight tracking-wider">INK RISE</span>
                <span className="text-[#c9a84c] text-[10px] tracking-[0.2em] font-medium uppercase">Tattoo Studio</span>
              </div>
            </div>
            <p className="text-[#888] text-sm leading-relaxed mb-5 italic font-cinzel">
              &ldquo;{SITE_CONFIG.tagline}&rdquo;
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:text-[#c9a84c] hover:border-[#c9a84c] transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href={SITE_CONFIG.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:text-[#c9a84c] hover:border-[#c9a84c] transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>
              <a
                href={SITE_CONFIG.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:text-[#c9a84c] hover:border-[#c9a84c] transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube size={15} />
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center hover:border-[#25D366] transition-all duration-200 group"
                aria-label="WhatsApp"
              >
                <Image 
                  src="/whatsappIcon.webp" 
                  alt="WhatsApp" 
                  width={16} 
                  height={16} 
                  className="object-contain group-hover:scale-110 transition-transform duration-200"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel font-semibold text-[#f5f5f5] text-sm tracking-widest uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#888] hover:text-[#c9a84c] text-sm transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-cinzel font-semibold text-[#f5f5f5] text-sm tracking-widest uppercase mb-5">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {['Portrait Tattoo', 'Geometric Tattoo', 'Colour Tattoo', 'Cover Up Tattoo', 'Angel Tattoo', 'Small Tattoo', 'Body Piercing'].map((s) => (
                <li key={s}>
                  <span className="text-[#888] text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-cinzel font-semibold text-[#f5f5f5] text-sm tracking-widest uppercase mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#c9a84c] mt-0.5 shrink-0" />
                <a
                  href={SITE_CONFIG.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#888] text-sm leading-relaxed hover:text-[#c9a84c] transition-colors"
                >
                  {SITE_CONFIG.address}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-[#c9a84c] shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="text-[#888] hover:text-[#c9a84c] text-sm transition-colors">
                  {SITE_CONFIG.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-[#c9a84c] shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#888] hover:text-[#c9a84c] text-sm transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] text-xs mt-0.5 shrink-0">⏰</span>
                <span className="text-[#888] text-sm">{SITE_CONFIG.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1f1f1f]">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#555] text-xs font-inter text-center md:text-left">
            &copy; {SITE_CONFIG.year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex flex-col items-center md:items-end gap-1.5">
            <p className="text-[#555] text-xs font-inter text-center md:text-right">
              Crafted with <span className="text-[#c9a84c]">♥</span> for ink lovers
            </p>
            <p className="text-[#444] text-[10px] uppercase tracking-widest font-inter text-center md:text-right">
              Developed by <span className="text-[#666] font-semibold">ROUNIT SINGH</span> <span className="mx-1 text-[#333]">|</span> Contact:{' '}
              <a href="tel:9821770032" className="hover:text-[#c9a84c] transition-colors inline-block">
                9821770032
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
