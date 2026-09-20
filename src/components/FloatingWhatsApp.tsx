import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';

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
    <div
      id="floating-whatsapp-container"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end pointer-events-auto"
    >
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="mb-2 mr-1 bg-stone-900 text-stone-100 text-xs py-2 px-3.5 rounded-xl shadow-xl border border-stone-700/80 flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2 max-w-[220px]">
          <div className="text-left">
            <span className="block font-bold text-amber-400">Need Welding Work?</span>
            <span className="block text-[11px] text-stone-300">Chat with Abdul Sattar on WhatsApp</span>
          </div>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-white p-0.5 rounded focus:outline-none"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* WhatsApp Action Button */}
      <a
        id="floating-whatsapp-btn"
        href={generateWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl hover:shadow-emerald-600/50 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        aria-label="Chat with Mashallah Welding Works on WhatsApp"
      >
        {/* Radar ping ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />

        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />

        {/* Small verified dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-stone-900" />
      </a>
    </div>
  );
};
