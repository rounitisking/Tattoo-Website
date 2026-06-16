'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_ITEMS, SITE_CONFIG } from '@/constants/site';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change — intentional UI side-effect sync
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'navbar-scrolled'
            : 'navbar-default'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-[72px] xl:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <img src="/logo.webp" alt="Ink Rise" className="w-10 h-10" />
              <div className="flex flex-col">
                <span className="font-cinzel font-bold text-[#f5f5f5] text-base leading-tight tracking-wider">
                  INK RISE
                </span>
                <span className="text-[#c9a84c] text-[10px] tracking-[0.2em] font-inter font-medium uppercase">
                  Tattoo Studio
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              {NAV_ITEMS.map((item) => {
                const isOffers = item.label === 'Offers';
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'px-4 xl:px-5 py-2 text-base font-semibold tracking-wide transition-colors duration-200 rounded-md relative group',
                      isOffers 
                        ? 'text-red-500 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' 
                        : pathname === item.href
                          ? 'text-[#c9a84c]'
                          : 'text-[#cccccc] hover:text-[#f5f5f5]'
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300',
                        isOffers ? 'bg-red-500' : 'bg-gradient-to-r from-[#c9a84c] to-[#e8c76a]',
                        pathname === item.href ? 'w-2/3' : 'w-0 group-hover:w-2/3'
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
              <Link
                href="/admin/login"
                className="px-6 py-2.5 text-base font-semibold text-[#777] hover:text-[#f5f5f5] border border-[#444] hover:border-[#c9a84c] rounded-xl transition-all duration-200 font-inter"
              >
                Admin
              </Link>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-2 text-[#c9a84c] hover:text-[#e8c76a] text-sm font-medium transition-colors"
              >
                <Phone size={14} />
                {SITE_CONFIG.phoneDisplay}
              </a>
              <Link
                href="/contact#contact"
                className="px-10 py-3 bg-gradient-to-r from-[#c9a84c] to-[#a07c28] text-black font-semibold text-sm rounded-full hover:from-[#e8c76a] hover:to-[#c9a84c] transition-all duration-200 shadow-lg hover:shadow-[#c9a84c]/30 whitespace-nowrap"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 flex items-center justify-center text-[#f5f5f5] hover:text-[#c9a84c] transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-[#111111] border-l border-[#2a2a2a] z-50 lg:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-[#2a2a2a]">
                <div className="flex flex-col">
                  <span className="font-cinzel font-bold text-[#f5f5f5] text-base tracking-wider">INK RISE</span>
                  <span className="text-[#c9a84c] text-[10px] tracking-[0.2em] uppercase">Tattoo Studio</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center text-[#888] hover:text-[#f5f5f5] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Nav */}
              <nav className="flex-1 overflow-y-auto py-4">
                {NAV_ITEMS.map((item, i) => {
                  const isOffers = item.label === 'Offers';
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center px-6 py-3.5 text-sm font-medium tracking-wide border-l-2 transition-all duration-200',
                          isOffers
                            ? 'text-red-500 border-red-500 bg-red-500/10 shadow-[inset_4px_0_10px_rgba(239,68,68,0.2)]'
                            : pathname === item.href
                              ? 'text-[#c9a84c] border-[#c9a84c] bg-[#c9a84c]/5'
                              : 'text-[#cccccc] border-transparent hover:text-[#f5f5f5] hover:border-[#c9a84c]/50 hover:bg-white/5'
                        )}
                      >
                        {item.label}
                        {isOffers && <span className="ml-2 w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-[#2a2a2a] space-y-3">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-2 text-[#cccccc] hover:text-[#c9a84c] text-sm transition-colors"
                >
                  <Phone size={14} />
                  {SITE_CONFIG.phoneDisplay}
                </a>
                <Link
                  href="/contact#contact"
                  className="block w-full py-3 bg-gradient-to-r from-[#c9a84c] to-[#a07c28] text-black font-semibold text-sm rounded-full text-center hover:from-[#e8c76a] hover:to-[#c9a84c] transition-all duration-200"
                >
                  Book Consultation
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
