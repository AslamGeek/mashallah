import React from 'react';
import { Phone } from 'lucide-react';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';

export const MobileStickyBar: React.FC = () => {
  return (
    <div
      id="mobile-sticky-cta-bar"
      className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#181B1E]/95 backdrop-blur-md border-t border-dark-border px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl flex items-center gap-2.5"
    >
      {/* 1. Call */}
      <a
        id="mobile-bar-call-btn"
        href={BUSINESS_INFO.phoneTel}
        className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-copper active:bg-copper-hover text-white text-center font-bold text-sm shadow-md transition-all active:scale-[0.98] min-h-[48px]"
        aria-label="Call Mashallah Welding Works"
      >
        <Phone className="w-5 h-5 stroke-[2.2] shrink-0" />
        <span className="font-extrabold tracking-wide">Call</span>
      </a>

      {/* 2. WhatsApp */}
      <a
        id="mobile-bar-whatsapp-btn"
        href={generateWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-600 active:bg-emerald-500 text-white text-center font-bold text-sm shadow-md transition-all active:scale-[0.98] min-h-[48px]"
        aria-label="Chat with Mashallah Welding Works on WhatsApp"
      >
        <WhatsAppIcon className="w-5 h-5 shrink-0" />
        <span className="font-extrabold tracking-wide">WhatsApp</span>
      </a>
    </div>
  );
};

