'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AftercareVideo() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay fallback
      });
    }
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[40vh] md:h-[50vh] lg:h-[60vh] rounded-2xl overflow-hidden border border-[#2a2a2a] shadow-2xl mb-12">
      {/* Video */}
      <video
        ref={videoRef}
        src="/aftercareVideo.mp4"
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      
      {/* Premium Overlay Gradient for borders */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Sound Toggle Button */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10">
        <button
          onClick={toggleMute}
          className="group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white hover:text-[#c9a84c] hover:border-[#c9a84c]/50 hover:bg-black/80 transition-all duration-300 shadow-xl cursor-pointer"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX size={18} className="opacity-80 group-hover:opacity-100" /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
}
