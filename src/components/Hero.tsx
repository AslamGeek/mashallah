import React from 'react';
import { Phone } from 'lucide-react';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ConversionTrustPoints } from './ConversionTrustPoints';

export interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section
      id="home"
      className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 bg-light-bg text-dark-text border-b border-light-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Direct Copy & High-Priority Actions */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left min-w-0">
            {/* 1. Clear Headline */}
            <h1
              id="hero-headline"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-text tracking-tight leading-[1.18] sm:leading-[1.15] break-words"
            >
              Iron Gates, Grills &amp; Welding Work in Proddatur
            </h1>

            {/* 2. Supporting Sentence: Photo -> Quote flow with rough measurements */}
            <p
              id="hero-subheadline"
              className="text-base sm:text-lg text-stone-600 leading-relaxed break-words max-w-xl"
            >
              Custom gates, grills, railings, and welding work. Send us a photo, reference design, or approximate measurements on WhatsApp to get started.
            </p>

            {/* 3 & 4. Primary (WhatsApp) and Secondary (Call) CTAs */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Primary: Send Photo & Get Quote */}
              <a
                id="hero-whatsapp-cta"
                href={generateWhatsAppUrl({ type: 'hero' })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-xs transition-colors duration-150 active:scale-[0.98] min-h-[48px] text-center"
              >
                <WhatsAppIcon className="w-5 h-5 mr-2 shrink-0" />
                <span>Send Photo &amp; Get Quote</span>
              </a>

              {/* Secondary: Call Workshop */}
              <a
                id="hero-call-cta"
                href={BUSINESS_INFO.phoneTel}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-bold text-base shadow-2xs transition-colors duration-150 active:scale-[0.98] min-h-[48px] text-center"
              >
                <Phone className="w-5 h-5 mr-2 text-copper stroke-[2.2] shrink-0" />
                <span>Call Workshop</span>
              </a>
            </div>

            {/* 5. Compact Reassurance / Trust Row */}
            <ConversionTrustPoints
              variant="hero"
              showLocation={true}
              className="pt-2"
            />
          </div>

          {/* Right Column: One Large Clean Project Image (No badges, overlays, or stats) */}
          <div className="lg:col-span-5 min-w-0">
            <div className="w-full rounded-2xl overflow-hidden border border-light-border bg-stone-100 shadow-xs">
              <picture className="w-full h-full block">
                <source
                  type="image/webp"
                  srcSet="/images/modern-double-leaf-steel-main-gate-gold-panels-proddatur-480.webp 480w, /images/modern-double-leaf-steel-main-gate-gold-panels-proddatur-768.webp 768w, /images/modern-double-leaf-steel-main-gate-gold-panels-proddatur.webp 1200w"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 550px"
                />
                <img
                  src="/images/modern-double-leaf-steel-main-gate-gold-panels-proddatur-768.webp"
                  srcSet="/images/modern-double-leaf-steel-main-gate-gold-panels-proddatur-480.webp 480w, /images/modern-double-leaf-steel-main-gate-gold-panels-proddatur-768.webp 768w, /images/modern-double-leaf-steel-main-gate-gold-panels-proddatur.webp 1200w"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 550px"
                  alt="Custom fabricated double-leaf residential steel main entrance gate in Proddatur"
                  width={768}
                  height={576}
                  className="w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] object-cover object-center block"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

