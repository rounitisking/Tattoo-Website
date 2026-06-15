'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function VideoBanner() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Ensure autoplay works across different browsers
  useEffect(() => {
    if (videoRef.current) {
      // Industry-standard cross-browser autoplay hack
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay was prevented by browser, fallback to muted if it wasn't already
      });
    }
  }, []);

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-black border-y border-[#1f1f1f]">
      {/* Video */}
      <video
        ref={videoRef}
        src="/homepageVideo.mp4"
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      
      {/* Premium Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />

      {/* Sound Toggle Button */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10">
        <button
          onClick={toggleMute}
          className="group flex items-center justify-center w-12 h-12 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white hover:text-[#c9a84c] hover:border-[#c9a84c]/50 hover:bg-black/80 transition-all duration-300 shadow-2xl cursor-pointer"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX size={20} className="opacity-80 group-hover:opacity-100" /> : <Volume2 size={20} />}
        </button>
      </div>
    </section>
  );
}
