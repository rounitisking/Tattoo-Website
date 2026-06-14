import Link from 'next/link';
import { Home, Compass } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/site';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c9a84c]/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-md w-full space-y-6 relative z-10">
        {/* Brand Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#a07c28] flex items-center justify-center shadow-lg mx-auto mb-4">
          <Compass size={28} className="text-black animate-spin-slow" />
        </div>

        {/* Error Code */}
        <h1 className="font-cinzel font-black text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] to-[#a07c28]">
          404
        </h1>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="font-cinzel font-bold text-xl md:text-2xl text-[#f5f5f5]">
            Story <span className="gold-text">Not Found</span>
          </h2>
          <p className="text-[#888] text-sm md:text-base font-inter max-w-sm mx-auto leading-relaxed">
            The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s guide you back to the studio.
          </p>
        </div>

        {/* Back Home CTA */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#c9a84c] to-[#a07c28] text-black font-bold text-sm rounded-full hover:from-[#e8c76a] hover:to-[#c9a84c] transition-all duration-200 shadow-xl font-inter cursor-pointer"
          >
            <Home size={16} /> Return to Home
          </Link>
        </div>

        {/* Studio Info Footer */}
        <p className="text-[#555] text-xs font-inter pt-8 tracking-wider uppercase">
          {SITE_CONFIG.name} · Sector 18, Noida
        </p>
      </div>
    </div>
  );
}
