import React from 'react';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { BUSINESS_INFO, getBusinessHoursStatus, generateWhatsAppUrl } from '../../data/content';
import { WorkshopMap } from '../WorkshopMap';
import { WhatsAppIcon } from '../WhatsAppIcon';

export const HomeWorkshopInfo: React.FC = () => {
  const hoursStatus = getBusinessHoursStatus();

  return (
    <section
      id="business-info"
      className="py-16 sm:py-20 bg-warm-tint text-dark-text border-b border-light-border"
      aria-labelledby="business-info-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <h2
            id="business-info-heading"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-text"
          >
            Workshop Location & Business Hours
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Conveniently located in Auto Nagar, Proddatur with open space for vehicle loading and on-site consultations.
          </p>
        </div>

        {/* 3 Detail Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Workshop Location */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-light-border shadow-xs flex flex-col justify-between">
            <div className="space-y-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-warm-tint text-copper border border-light-border flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs text-stone-500 block uppercase tracking-wider font-semibold">
                Workshop Address
              </span>
              <p className="font-bold text-dark-text text-base leading-snug break-words">
                11/276, MG, Lakshmi Nagar, Auto Nagar
              </p>
              <p className="text-xs text-stone-600 break-words">
                Proddatur, Kadapa District, Andhra Pradesh 516360
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-light-border">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-copper hover:text-copper-hover transition-colors min-h-[36px]"
              >
                <Navigation className="w-3.5 h-3.5 mr-1 shrink-0" />
                <span>Open in Google Maps →</span>
              </a>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-light-border shadow-xs flex flex-col justify-between">
            <div className="space-y-3 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="w-10 h-10 rounded-xl bg-warm-tint text-copper border border-light-border flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                {/* Live Status indicator */}
                <span
                  className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full ${
                    hoursStatus.isOpen
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-copper/15 text-copper border border-copper/30'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 ${
                      hoursStatus.isOpen ? 'bg-emerald-600' : 'bg-copper'
                    }`}
                  />
                  <span>{hoursStatus.statusText}</span>
                </span>
              </div>
              <span className="text-xs text-stone-500 block uppercase tracking-wider font-semibold">
                Operational Timings
              </span>
              <div className="space-y-2 pt-0.5 text-sm">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                  <span className="font-bold text-dark-text">Monday – Saturday</span>
                  <span className="font-semibold text-stone-700">{BUSINESS_INFO.hours.monSat}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                  <span className="font-bold text-dark-text">Sunday</span>
                  <span className="font-semibold text-stone-700">{BUSINESS_INFO.hours.sunday}</span>
                </div>
              </div>
            </div>
            <div className="pt-4 mt-3 border-t border-light-border text-xs text-stone-500">
              On-site measurement visits available upon appointment.
            </div>
          </div>

          {/* Direct Contact */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-light-border shadow-xs flex flex-col justify-between">
            <div className="space-y-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-warm-tint text-copper border border-light-border flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-xs text-stone-500 block uppercase tracking-wider font-semibold">
                Customer Enquiries & Fabrication
              </span>
              <p className="font-bold text-dark-text text-base break-words">
                {BUSINESS_INFO.leadFabricator}
              </p>
              <span className="text-xs text-stone-600 block break-words">
                Lead Fabricator & On-Site Measurements
              </span>
              <span className="text-[11px] text-stone-400 block pt-1 break-words">
                Proprietor: {BUSINESS_INFO.proprietor}
              </span>
            </div>
            <div className="pt-4 mt-3 border-t border-light-border flex items-center justify-between gap-2">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="text-xs font-bold text-stone-700 hover:text-copper transition-colors min-h-[36px] inline-flex items-center"
              >
                Call Now
              </a>
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-800 min-h-[36px]"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 mr-1 shrink-0" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Embedded Google Map Component */}
        <WorkshopMap />
      </div>
    </section>
  );
};
