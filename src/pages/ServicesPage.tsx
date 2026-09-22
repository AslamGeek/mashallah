import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Wrench } from 'lucide-react';
import { PageSeo } from '../components/PageSeo';
import { Services } from '../components/Services';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';

export const ServicesPage: React.FC = () => {
  return (
    <>
      <PageSeo
        title="What We Make & Fix | Mashallah Welding Works Proddatur"
        description="Simple, durable steel work in Proddatur: main gates, window grills, stair railings, metal doors, tank stands, and quick welding repairs."
      />

      {/* Main Services Component with top padding to clear fixed header */}
      <Services className="pt-28 pb-16" />

      {/* Bottom Quote & Contact CTA Banner */}
      <section className="py-16 bg-dark-bg text-[#FAF8F5] border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#22272C] rounded-3xl p-8 sm:p-12 border border-dark-border shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Need a Price or Free Measurement Visit?
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Every home and shop is different. Tell us what you want to make or fix, or ask for a free site visit in Proddatur.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 w-full lg:w-auto shrink-0">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-sm shadow-xs transition-all active:scale-95 whitespace-nowrap min-h-[44px]"
              >
                <Phone className="w-4 h-4 mr-2 shrink-0" />
                <span>Call Now</span>
              </a>
              <a
                href={generateWhatsAppUrl('Hello, I want this type of work. I will send a photo.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xs transition-all active:scale-95 whitespace-nowrap min-h-[44px]"
              >
                <WhatsAppIcon className="w-4 h-4 mr-2 shrink-0" />
                <span>Send Photo on WhatsApp</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-[#181B1E] hover:bg-stone-800 text-stone-200 border border-dark-border font-semibold text-sm transition-colors whitespace-nowrap min-h-[44px]"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
