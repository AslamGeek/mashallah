import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, ArrowRight, Wrench, ChevronLeft } from 'lucide-react';
import { PageSeo } from '../components/PageSeo';
import { Services } from '../components/Services';
import { ServiceLandingView } from '../components/ServiceLandingView';
import { ConversionTrustPoints } from '../components/ConversionTrustPoints';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { BUSINESS_INFO, SERVICES_LIST, generateWhatsAppUrl } from '../data/content';

export const ServicesPage: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug?: string }>();

  // If a specific service slug is requested, find the matching service
  if (serviceSlug) {
    const matchedService = SERVICES_LIST.find(
      (s) => s.id === serviceSlug || s.slug === serviceSlug
    );

    if (matchedService) {
      return (
        <>
          <PageSeo
            title={`${matchedService.heroHeadline || matchedService.title} | Mashallah Welding Works Proddatur`}
            description={matchedService.heroDescription || matchedService.description}
          />
          <ServiceLandingView service={matchedService} />
        </>
      );
    }

    // Fallback if service slug not recognized
    return (
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-2xl font-bold text-dark-text mb-2">Service Not Found</h1>
        <p className="text-stone-600 text-sm mb-6">
          The welding or fabrication service you requested could not be located.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center px-4 py-2 rounded-xl bg-copper text-white text-xs font-bold"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span>View All Services</span>
        </Link>
      </div>
    );
  }

  // Otherwise render the full Services directory
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
          <div className="bg-[#22272C] rounded-3xl p-6 sm:p-12 border border-dark-border shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 min-w-0">
            <div className="space-y-3 max-w-2xl text-center lg:text-left min-w-0 flex-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight break-words">
                Need a Price or Free Measurement Visit?
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed break-words">
                Every home and shop is different. Tell us what you want to make or fix, or ask for a free site visit in Proddatur.
              </p>
              <ConversionTrustPoints
                className="pt-2 text-left"
                variant="service"
                showLocation={true}
                theme="dark"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 w-full lg:w-auto shrink-0">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-sm shadow-xs transition-all active:scale-95 min-h-[44px] text-center"
              >
                <Phone className="w-4 h-4 mr-2 shrink-0" />
                <span>Call Now</span>
              </a>
              <a
                href={generateWhatsAppUrl('Hello, I would like to get a quote for welding/fabrication work in Proddatur.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xs transition-all active:scale-95 min-h-[44px] text-center"
              >
                <WhatsAppIcon className="w-4 h-4 mr-2 shrink-0" />
                <span>Get a Quote on WhatsApp</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-[#181B1E] hover:bg-stone-800 text-stone-200 border border-dark-border font-semibold text-sm transition-colors min-h-[44px] text-center"
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
