import React from 'react';
import { Phone, Navigation } from 'lucide-react';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';

export const MobileStickyBar: React.FC = () => {
  return (
    <div
      id="mobile-sticky-cta-bar"
      className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-dark-bg/95 backdrop-blur-md border-t border-dark-border px-3 py-2 shadow-2xl flex items-center justify-around gap-2"
    >
      {/* 1. Call Now */}
      <a
        id="mobile-bar-call-btn"
        href={BUSINESS_INFO.phoneTel}
        className="flex-1 flex flex-col items-center justify-center py-2 px-1.5 rounded-lg bg-copper active:bg-copper-hover text-white text-center font-bold text-xs shadow-xs min-h-[44px]"
      >
        <Phone className="w-4 h-4 mb-0.5 stroke-[2.5] shrink-0" />
        <span className="whitespace-nowrap">Call Now</span>
      </a>

      {/* 2. WhatsApp */}
      <a
        id="mobile-bar-whatsapp-btn"
        href={generateWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-2 px-1.5 rounded-lg bg-emerald-600 active:bg-emerald-500 text-white text-center font-bold text-xs shadow-xs min-h-[44px]"
      >
        <WhatsAppIcon className="w-4 h-4 mb-0.5 shrink-0" />
        <span className="whitespace-nowrap">WhatsApp Us</span>
      </a>

      {/* 3. Directions */}
      <a
        id="mobile-bar-directions-btn"
        href={BUSINESS_INFO.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-2 px-1.5 rounded-lg bg-gunmetal active:bg-steel text-stone-200 text-center font-medium text-xs border border-dark-border shadow-xs min-h-[44px]"
      >
        <Navigation className="w-4 h-4 mb-0.5 text-copper shrink-0" />
        <span className="whitespace-nowrap">Directions</span>
      </a>
    </div>
  );
};
