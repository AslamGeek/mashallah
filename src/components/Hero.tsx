import React from 'react';
import { Phone, Navigation, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative pt-24 pb-16 md:pt-30 md:pb-24 bg-stone-900 text-stone-100 overflow-hidden border-b border-stone-800"
    >
      {/* Subtle industrial steel geometric grid background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Copy & Hero CTA Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Primary Business Name Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Mashallah <span className="text-amber-400">Welding Works</span>
              </h1>
              <p className="text-lg sm:text-2xl font-semibold text-stone-300">
                Custom Iron Fabrication, Welding & Repair Works
              </p>
            </div>

            {/* Value Proposition Description */}
            <p className="text-base sm:text-lg text-stone-300/90 max-w-2xl leading-relaxed">
              We build heavy-duty, made-to-requirement iron gates, window safety grills, staircase railings, metal doors, and durable industrial structures with high-gauge steel and precision arc welding.
            </p>

            {/* 3 Prominent Primary Action Buttons as specifically requested in requirements */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5">
              {/* Call Now */}
              <a
                id="hero-call-now-btn"
                href={BUSINESS_INFO.phoneTel}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-base tracking-wide transition-all duration-150 shadow-lg shadow-amber-500/20 active:scale-[0.98]"
              >
                <Phone className="w-5 h-5 mr-2 stroke-[2.5]" />
                Call Now
              </a>

              {/* WhatsApp Us */}
              <a
                id="hero-whatsapp-us-btn"
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base transition-all duration-150 shadow-lg shadow-emerald-600/20 active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-5 h-5 mr-2" />
                WhatsApp Us
              </a>

              {/* Get Directions */}
              <a
                id="hero-get-directions-btn"
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold text-base transition-all duration-150 active:scale-[0.98]"
              >
                <Navigation className="w-5 h-5 mr-2 text-amber-400" />
                Get Directions
              </a>
            </div>

            {/* Quick feature checklist */}
            <div className="pt-4 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-stone-400">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>On-Site Measurements</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Heavy Gauge Mild Steel</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Prompt On-Site Repairs</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-stone-800/70 border border-stone-700/80 p-2 sm:p-3 shadow-2xl overflow-hidden group">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-xl overflow-hidden bg-stone-950">
                <img
                  src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1000&auto=format&fit=crop"
                  alt="Craftsman welding iron framework with precision sparks"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
              </div>

              {/* Stat Chips below photo */}
              <div className="mt-3 grid grid-cols-3 gap-2 text-center py-2 px-1">
                <div className="p-2 rounded-lg bg-stone-900/60 border border-stone-700/50">
                  <span className="block text-lg font-black text-amber-400">100%</span>
                  <span className="block text-[11px] text-stone-400 font-medium">Custom Fit</span>
                </div>
                <div className="p-2 rounded-lg bg-stone-900/60 border border-stone-700/50">
                  <span className="block text-lg font-black text-amber-400">Electric Arc</span>
                  <span className="block text-[11px] text-stone-400 font-medium">Welding</span>
                </div>
                <div className="p-2 rounded-lg bg-stone-900/60 border border-stone-700/50">
                  <span className="block text-lg font-black text-amber-400">Fast</span>
                  <span className="block text-[11px] text-stone-400 font-medium">Repairs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
