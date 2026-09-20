import React from 'react';
import { Phone, Navigation } from 'lucide-react';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';

export const MobileStickyBar: React.FC = () => {
  return (
    <div
      id="mobile-sticky-cta-bar"
      className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-stone-950/95 backdrop-blur-md border-t border-stone-800 px-3 py-2 shadow-2xl flex items-center justify-around gap-2"
    >
      {/* 1. Call Now */}
      <a
        id="mobile-bar-call-btn"
        href={BUSINESS_INFO.phoneTel}
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-amber-500 active:bg-amber-400 text-stone-950 text-center font-bold text-xs shadow-sm"
      >
        <Phone className="w-4 h-4 mb-0.5 stroke-[2.5]" />
        <span>Call Now</span>
      </a>

      {/* 2. WhatsApp */}
      <a
        id="mobile-bar-whatsapp-btn"
        href={generateWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-emerald-600 active:bg-emerald-500 text-white text-center font-bold text-xs shadow-sm"
      >
        <WhatsAppIcon className="w-4 h-4 mb-0.5" />
        <span>WhatsApp</span>
      </a>

      {/* 3. Directions */}
      <a
        id="mobile-bar-directions-btn"
        href={BUSINESS_INFO.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-stone-800 active:bg-stone-700 text-stone-200 text-center font-medium text-xs border border-stone-700 shadow-sm"
      >
        <Navigation className="w-4 h-4 mb-0.5 text-amber-400" />
        <span>Directions</span>
      </a>
    </div>
  );
};
