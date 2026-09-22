import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Sparkles } from 'lucide-react';
import { PageSeo } from '../components/PageSeo';
import { Gallery } from '../components/Gallery';
import { SocialShowcase } from '../components/SocialShowcase';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';

export const OurWorkPage: React.FC = () => {
  return (
    <>
      <PageSeo
        title="Our Work & Fabrication Gallery | Mashallah Welding Works"
        description="Browse our portfolio of custom iron gates, window safety grills, staircase railings, and metal fabrication projects in Proddatur by Mashallah Welding Works."
      />

      {/* Primary Gallery Component with top padding for fixed header */}
      <Gallery className="pt-28 pb-16" />

      {/* Social & Modern Design Showcase (Pinterest & Instagram) */}
      <SocialShowcase />

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-dark-bg text-[#FAF8F5] border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#22272C] rounded-3xl p-8 sm:p-12 border border-dark-border shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-copper">
                <Sparkles className="w-4 h-4 mr-2" />
                Custom Blueprint & Estimation
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Found a Design You Like or Have Your Own Drawing?
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Send us a photo or sketch on WhatsApp. We will inspect dimensions, calculate metal requirements, and provide a clear quotation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 w-full lg:w-auto shrink-0">
              <a
                href={generateWhatsAppUrl('Hello Mashallah Welding Works, I am looking at your portfolio and would like to share a design for a quote.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xs transition-all active:scale-95 whitespace-nowrap min-h-[44px]"
              >
                <WhatsAppIcon className="w-4 h-4 mr-2 shrink-0" />
                <span>Send Photo on WhatsApp</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-sm shadow-xs transition-colors whitespace-nowrap min-h-[44px]"
              >
                <span>Request On-Site Measurement</span>
                <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
