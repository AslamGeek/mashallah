import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Home, ArrowLeft, Phone, Grid } from 'lucide-react';
import { PageSeo } from '../components/PageSeo';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <PageSeo
        title="Page Not Found | Mashallah Welding Works"
        description="The requested page could not be found. Return to Mashallah Welding Works homepage or explore our custom iron fabrication portfolio."
      />

      <div className="pt-28 pb-20 min-h-[75vh] flex items-center justify-center bg-dark-bg text-[#F5F3EE] px-4 sm:px-6 lg:px-8 border-b border-dark-border">
        <div className="max-w-xl mx-auto text-center space-y-6">
          {/* Icon Badge */}
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gunmetal border border-dark-border text-copper flex items-center justify-center shadow-xl">
            <Hammer className="w-10 h-10 stroke-[2.2] animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-copper">
              Error 404
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Blueprint Not Found
            </h1>
            <p className="text-base text-muted-text leading-relaxed">
              The page or fabrication link you are looking for does not exist, has been moved, or is temporarily unavailable.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-sm shadow-xs transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/our-work"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gunmetal hover:bg-steel text-stone-200 border border-dark-border font-semibold text-sm transition-colors"
            >
              <Grid className="w-4 h-4 mr-2 text-copper" />
              <span>View Our Work</span>
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-steel hover:bg-dark-border text-stone-200 border border-dark-border font-semibold text-sm transition-colors"
            >
              <Phone className="w-4 h-4 mr-2 text-copper" />
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Direct help callout */}
          <div className="pt-6 border-t border-dark-border text-xs text-muted-text">
            <span>Need immediate welding assistance? </span>
            <a
              href={BUSINESS_INFO.phoneTel}
              className="text-white hover:text-copper font-semibold ml-1"
            >
              Call Now
            </a>
            <span className="mx-2">•</span>
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
