import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show a polite initial tooltip after 3 seconds, then dismiss after 7 seconds
    const showTimer = setTimeout(() => setShowTooltip(true), 3000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 12000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <aside
      id="floating-whatsapp-container"
      aria-label="Floating WhatsApp contact"
      className="fixed bottom-[76px] sm:bottom-6 right-3.5 sm:right-6 z-40 flex flex-col items-end pointer-events-none"
    >
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="mb-2 mr-1 bg-stone-900 text-stone-100 text-xs py-2 px-3.5 rounded-xl shadow-xl border border-stone-700/80 flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2 max-w-[220px] pointer-events-auto">
          <div className="text-left">
            <span className="block font-bold text-amber-400">Need Welding Work?</span>
            <span className="block text-[11px] text-stone-300">Chat with Abdul Sattar on WhatsApp</span>
          </div>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-white p-1 rounded focus:outline-none min-w-[24px] min-h-[24px] flex items-center justify-center"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* WhatsApp Action Button with optimized touch target & z-index */}
      <a
        id="floating-whatsapp-btn"
        href={generateWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto z-40 relative flex items-center justify-center min-w-[56px] min-h-[56px] w-14 h-14 sm:min-w-[60px] sm:min-h-[60px] sm:w-[60px] sm:h-[60px] rounded-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-xl hover:shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-emerald-400/40 touch-manipulation select-none"
        aria-label="Chat with Mashallah Welding Works on WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />

        {/* Small status dot */}
        <span
          className="absolute top-1 right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-stone-900 shadow-xs"
          title="Online / Available"
        />
      </a>
    </aside>
  );
};
