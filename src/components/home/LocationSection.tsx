import { Phone, MapPin, Navigation, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/site';
import SectionHeader from '@/components/ui/SectionHeader';

export default function LocationSection() {
  return (
    <section id="location" className="section-padding bg-[#0a0a0a]">
      <div className="container-custom">
        <SectionHeader
          label="Find Us"
          title="Visit Our"
          titleHighlight="Studio"
          subtitle="Come experience the Ink Rise difference in person. We'd love to meet you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          {/* Map */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-[#2a2a2a] h-80 lg:h-full min-h-[320px]">
            <iframe
              src={SITE_CONFIG.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(40%) invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ink Rise Tattoo Studio Location"
              className="w-full h-full"
            />
          </div>

          {/* Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Address Card */}
            <div className="bg-[#111111] rounded-2xl p-6 border border-[#2a2a2a] flex-1">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#c9a84c]" />
                </div>
                <div>
                  <h3 className="font-cinzel font-semibold text-[#f5f5f5] mb-2">Studio Address</h3>
                  <p className="text-[#888] text-sm leading-relaxed font-inter">{SITE_CONFIG.address}</p>
                </div>
              </div>

              <div className="space-y-3 border-t border-[#2a2a2a] pt-5">
                <div className="flex items-center gap-3">
                  <span className="text-[#c9a84c] text-sm">⏰</span>
                  <div>
                    <p className="text-[#888] text-xs font-inter">Working Hours</p>
                    <p className="text-[#f5f5f5] text-sm font-medium font-inter">{SITE_CONFIG.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              <a
                href={SITE_CONFIG.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#111111] rounded-xl p-4 border border-[#2a2a2a] hover:border-[#c9a84c]/50 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-full bg-[#c9a84c]/10 flex items-center justify-center group-hover:bg-[#c9a84c]/20 transition-colors">
                  <Navigation size={16} className="text-[#c9a84c]" />
                </div>
                <div>
                  <p className="text-[#f5f5f5] text-sm font-semibold font-inter">Get Directions</p>
                  <p className="text-[#555] text-xs font-inter">Open in Google Maps</p>
                </div>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-3 bg-[#111111] rounded-xl p-4 border border-[#2a2a2a] hover:border-[#c9a84c]/50 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-full bg-[#c9a84c]/10 flex items-center justify-center group-hover:bg-[#c9a84c]/20 transition-colors">
                  <Phone size={16} className="text-[#c9a84c]" />
                </div>
                <div>
                  <p className="text-[#f5f5f5] text-sm font-semibold font-inter">Call Us</p>
                  <p className="text-[#555] text-xs font-inter">{SITE_CONFIG.phoneDisplay}</p>
                </div>
              </a>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#111111] rounded-xl p-4 border border-[#2a2a2a] hover:border-[#25D366]/50 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                  <MessageCircle size={16} className="text-[#25D366]" />
                </div>
                <div>
                  <p className="text-[#f5f5f5] text-sm font-semibold font-inter">WhatsApp</p>
                  <p className="text-[#555] text-xs font-inter">Chat with us instantly</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
