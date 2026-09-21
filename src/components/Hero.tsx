import React from 'react';
import { Phone, Navigation, CheckCircle2, MapPin } from 'lucide-react';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative pt-24 pb-16 md:pt-30 md:pb-24 bg-dark-bg text-[#F5F3EE] overflow-hidden border-b border-dark-border"
    >
      {/* Subtle industrial steel geometric grid background */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#3B434A_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Copy & Hero CTA Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Location pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gunmetal border border-dark-border text-copper text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-copper" />
              <span>Auto Nagar, Proddatur</span>
            </div>

            {/* Clear Core Offer Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Custom Iron Fabrication & <span className="text-copper">Welding in Proddatur</span>
              </h1>
              <p className="text-base sm:text-xl font-medium text-stone-300">
                Mashallah Welding Works — Heavy-duty gates, window safety grills, staircase railings, and structural steel repairs.
              </p>
            </div>

            {/* Clear Offer Description */}
            <p className="text-sm sm:text-base text-muted-text max-w-2xl leading-relaxed">
              Built to your exact on-site dimensions using heavy-gauge mild steel, clean arc welding, and weather-resistant anti-rust primer by experienced fabricator Abdul Sattar.
            </p>

            {/* Primary & Secondary Actions: WhatsApp quote is Primary, Call is Secondary, Directions is demoted */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              {/* Primary CTA: WhatsApp Quote */}
              <a
                id="hero-whatsapp-us-btn"
                href={generateWhatsAppUrl('Hello Mashallah Welding Works, I would like to get a quote for iron fabrication/welding work in Proddatur.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-lg shadow-emerald-950/40 transition-all duration-150 active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-5 h-5 mr-2 shrink-0" />
                <span>WhatsApp Quote</span>
              </a>

              {/* Secondary CTA: Call Now */}
              <a
                id="hero-call-now-btn"
                href={BUSINESS_INFO.phoneTel}
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-base transition-all duration-150 shadow-xs active:scale-[0.98]"
              >
                <Phone className="w-5 h-5 mr-2 stroke-[2.2] shrink-0" />
                <span>Call Now</span>
              </a>

              {/* Demoted Tertiary Link: Directions */}
              <a
                id="hero-get-directions-btn"
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-3 rounded-xl text-stone-300 hover:text-copper hover:bg-steel/40 text-xs sm:text-sm font-semibold transition-colors duration-150 border border-transparent hover:border-dark-border"
              >
                <Navigation className="w-4 h-4 mr-1.5 text-copper shrink-0" />
                <span>Directions to Workshop</span>
              </a>
            </div>

            {/* Clean Value Signals (No duplicate competing chips) */}
            <div className="pt-4 border-t border-dark-border flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-stone-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-copper shrink-0" />
                <span>On-Site Measurements</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-copper shrink-0" />
                <span>Heavy-Gauge Steel</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-copper shrink-0" />
                <span>Anti-Rust Primer Treated</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gunmetal border border-dark-border p-2 sm:p-3 shadow-xl overflow-hidden group">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-xl overflow-hidden bg-black">
                <img
                  src="/images/modern-double-leaf-steel-main-gate-gold-panels-proddatur.webp"
                  alt="Modern double-leaf steel main gate with gold decorative panels in Proddatur"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  onError={(e) => {
                    // Fallback to unsplash workshop image if local webp not found
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1000&auto=format&fit=crop';
                  }}
                />
                <div className="absolute bottom-3 left-3 right-3 bg-dark-bg/85 backdrop-blur-xs p-2.5 rounded-lg border border-dark-border text-xs text-stone-200 flex items-center justify-between">
                  <span className="font-semibold text-white">Fabricated in Auto Nagar</span>
                  <span className="text-[11px] text-copper font-medium">Custom Main Gate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
