import React, { useState, useRef } from 'react';
import { Phone, Navigation, CheckCircle2, MapPin, Maximize2 } from 'lucide-react';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ProjectLightbox, LightboxMediaItem } from './ProjectLightbox';

export interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = () => {
  const [activeModalItem, setActiveModalItem] = useState<LightboxMediaItem | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const heroItem: LightboxMediaItem = {
    id: 'hero-main-gate',
    title: 'Modern Double-Leaf Steel Main Gate with Gold Accents',
    imageUrl: '/images/modern-double-leaf-steel-main-gate-gold-panels-proddatur.webp',
    imageAlt: 'Modern double-leaf steel main gate with gold decorative panels in Proddatur',
    categoryLabel: 'Custom Main Gate',
    description: 'Custom-engineered double leaf steel residential main gate fabricated in Auto Nagar, Proddatur with heavy gauge steel framework, vertical privacy louvers, and gold accent decorative motif panels.',
    specifications: 'Heavy Gauge Mild Steel Box Sections • Anti-Rust Red Oxide Primer • Custom Gold Panel Inlays',
    location: 'Auto Nagar, Proddatur',
    whatsappMessage: 'Hello Mashallah Welding Works, I saw the modern double-leaf steel main gate on your homepage and would like an estimate.',
  };

  const openLightbox = (e?: React.MouseEvent) => {
    lastTriggerRef.current = (e?.currentTarget as HTMLElement) || (document.activeElement as HTMLElement) || null;
    setActiveModalItem(heroItem);
  };

  const closeLightbox = () => {
    setActiveModalItem(null);
    if (lastTriggerRef.current) {
      lastTriggerRef.current.focus({ preventScroll: true });
    }
  };
  return (
    <section
      id="home"
      className="relative pt-24 pb-16 md:pt-30 md:pb-24 bg-light-bg text-dark-text overflow-hidden border-b border-light-border"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Copy & Hero CTA Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Clear Core Offer Heading */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-dark-text leading-[1.12]">
                Custom Iron Fabrication & <span className="text-copper">Welding in Proddatur</span>
              </h1>
              <p className="text-base sm:text-xl font-medium text-stone-700">
                Mashallah Welding Works — Heavy-duty gates, window safety grills, staircase railings, and structural steel repairs.
              </p>
            </div>

            {/* Clear Offer Description */}
            <p className="text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
              Built to your exact on-site dimensions using heavy-gauge mild steel, clean arc welding, and weather-resistant anti-rust primer by lead fabricator Karimulla C. and our experienced team.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              {/* Primary CTA: Send Photo on WhatsApp */}
              <a
                id="hero-whatsapp-us-btn"
                href={generateWhatsAppUrl('Hello, I want this type of work. I will send a photo.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-xs transition-all duration-150 active:scale-[0.98] whitespace-nowrap min-h-[48px]"
              >
                <WhatsAppIcon className="w-5 h-5 mr-2 shrink-0" />
                <span>Send Photo on WhatsApp</span>
              </a>

              {/* Secondary CTA: Call Now */}
              <a
                id="hero-call-now-btn"
                href={BUSINESS_INFO.phoneTel}
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-base transition-all duration-150 shadow-xs active:scale-[0.98] whitespace-nowrap min-h-[48px]"
              >
                <Phone className="w-5 h-5 mr-2 stroke-[2.2] shrink-0" />
                <span>Call Now</span>
              </a>

              {/* Tertiary Link: Directions */}
              <a
                id="hero-get-directions-btn"
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-3 rounded-xl text-stone-700 hover:text-copper bg-white hover:bg-stone-50 text-xs sm:text-sm font-semibold transition-colors duration-150 border border-light-border whitespace-nowrap min-h-[44px]"
              >
                <Navigation className="w-4 h-4 mr-1.5 text-copper shrink-0" />
                <span>Directions to Workshop</span>
              </a>
            </div>

            {/* Clean Value Signals */}
            <div className="pt-4 border-t border-light-border flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-stone-700 font-medium">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <CheckCircle2 className="w-4 h-4 text-copper shrink-0" />
                <span>On-Site Measurements</span>
              </div>
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <CheckCircle2 className="w-4 h-4 text-copper shrink-0" />
                <span>Heavy-Gauge Steel</span>
              </div>
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <CheckCircle2 className="w-4 h-4 text-copper shrink-0" />
                <span>Anti-Rust Primer Treated</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white border border-light-border p-2.5 sm:p-3 shadow-xs overflow-hidden group">
              <button
                type="button"
                onClick={(e) => openLightbox(e)}
                className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-xl overflow-hidden bg-black text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper block group/hero"
                aria-haspopup="dialog"
                aria-label="View photo and specifications of modern double-leaf steel main gate"
              >
                <picture className="w-full h-full block">
                  <source
                    type="image/webp"
                    srcSet="/images/modern-double-leaf-steel-main-gate-gold-panels-proddatur-480.webp 480w, /images/modern-double-leaf-steel-main-gate-gold-panels-proddatur-768.webp 768w, /images/modern-double-leaf-steel-main-gate-gold-panels-proddatur.webp 1200w"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 550px"
                  />
                  <img
                    src="/images/modern-double-leaf-steel-main-gate-gold-panels-proddatur-768.webp"
                    alt="Modern double-leaf steel main gate with gold decorative panels in Proddatur"
                    width={768}
                    height={576}
                    className="w-full h-full object-cover group-hover/hero:scale-105 transition-transform duration-500"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback to unsplash workshop image if local webp not found
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1000&auto=format&fit=crop';
                    }}
                  />
                </picture>
              </button>
              <div className="pt-3 px-1 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-copper uppercase tracking-wider">Custom Main Gate</p>
                  <p className="text-xs text-stone-600 font-medium">Fabricated in Auto Nagar, Proddatur</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => openLightbox(e)}
                  className="inline-flex items-center justify-center px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold border border-light-border transition-colors min-h-[44px] cursor-pointer shrink-0"
                >
                  <Maximize2 className="w-3.5 h-3.5 mr-1.5 text-copper shrink-0" />
                  <span>View Photo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Project Lightbox Viewer */}
      <ProjectLightbox
        project={activeModalItem}
        onClose={closeLightbox}
      />
    </section>
  );
};
