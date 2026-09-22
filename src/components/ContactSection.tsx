import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Navigation,
  ExternalLink,
  Camera,
  Instagram,
  Shield,
  Grid,
  Layers,
  Factory,
  Wrench,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';
import { WorkshopMap } from './WorkshopMap';
import { ConversionTrustPoints } from './ConversionTrustPoints';

interface ContactSectionProps {
  className?: string;
}

const REQUIREMENT_OPTIONS = [
  { id: 'gate', label: 'Gate', icon: Shield, defaultDetail: 'a custom gate' },
  { id: 'grill', label: 'Grill', icon: Grid, defaultDetail: 'window safety grills' },
  { id: 'railing', label: 'Railing', icon: Layers, defaultDetail: 'staircase/balcony railings' },
  { id: 'shed', label: 'Shed / Structural Work', icon: Factory, defaultDetail: 'roof shed / structural steel work' },
  { id: 'repair', label: 'Welding Repair', icon: Wrench, defaultDetail: 'welding repair' },
  { id: 'other', label: 'Other', icon: Sparkles, defaultDetail: 'custom steel fabrication' },
];

export const ContactSection: React.FC<ContactSectionProps> = ({
  className = 'py-20',
}) => {
  const [selectedRequirement, setSelectedRequirement] = useState('Gate');
  const [customRequirement, setCustomRequirement] = useState('');
  const [workLocation, setWorkLocation] = useState('');
  const [optionalNote, setOptionalNote] = useState('');

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const finalRequirement =
      selectedRequirement === 'Other'
        ? customRequirement.trim() || 'Custom Steel Fabrication'
        : selectedRequirement;

    const url = generateWhatsAppUrl({
      type: 'quote_form',
      requirement: finalRequirement,
      location: workLocation.trim() || undefined,
      note: optionalNote.trim() || undefined,
    });

    window.open(url, '_blank');
  };

  return (
    <section id="contact" className={`${className} bg-light-bg text-dark-text border-b border-light-border`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-text">
            Get in Touch with Mashallah Welding Works
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Get in touch directly for immediate quotes, on-site measurements, or welding repair assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Contact Card with all Required Fields */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-5 sm:p-8 border border-light-border shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-copper block mb-1">
                  Fabrication Workshop
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-dark-text break-words">
                  {BUSINESS_INFO.name}
                </h3>
                <p className="text-xs text-stone-500 mt-1 break-words">
                  Custom metal fabrication, arc welding, and on-site repair services in Auto Nagar, Proddatur
                </p>
              </div>

              {/* Direct Contacts Breakdown */}
              <div className="space-y-3 pt-2">
                {/* Primary Customer-Facing Contact: Karimulla C. */}
                <div className="bg-warm-tint rounded-xl p-4 border border-copper/30">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-copper bg-copper/15 px-2 py-0.5 rounded">
                      Primary Contact • Enquiries & Quotes
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base font-bold text-dark-text break-words">
                        {BUSINESS_INFO.primaryContact.name}
                      </h4>
                      <span className="text-xs text-stone-600 block break-words">
                        {BUSINESS_INFO.primaryContact.role}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 pt-1 sm:pt-0">
                      <a
                        href={BUSINESS_INFO.primaryContact.phoneTel}
                        className="text-sm font-extrabold text-copper hover:text-copper-hover transition-colors"
                      >
                        {BUSINESS_INFO.primaryContact.phoneFormatted}
                      </a>
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-1.5 leading-relaxed break-words">
                    For pricing estimates, design discussions, and on-site measurements across Proddatur.
                  </p>
                </div>

                {/* Proprietor: Abdul Sattar */}
                <div className="bg-stone-50 rounded-xl p-3.5 border border-light-border">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                        Proprietor
                      </span>
                      <h4 className="text-sm font-semibold text-dark-text break-words">
                        {BUSINESS_INFO.proprietorContact.name}
                      </h4>
                    </div>
                    <a
                      href={BUSINESS_INFO.proprietorContact.phoneTel}
                      className="text-xs font-semibold text-stone-600 hover:text-dark-text transition-colors"
                    >
                      {BUSINESS_INFO.proprietorContact.phoneFormatted}
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-light-border text-sm">
                {/* Address */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-warm-tint text-copper border border-light-border flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs text-stone-500 block mb-0.5">Workshop Address</span>
                    <p className="text-stone-700 font-medium leading-relaxed break-words">
                      {BUSINESS_INFO.address}
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-warm-tint text-copper border border-light-border flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <span className="text-xs text-stone-500 block">Business Hours</span>
                    <div className="space-y-2 pt-0.5 text-sm">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                        <span className="font-bold text-dark-text">Monday – Saturday</span>
                        <span className="font-semibold text-stone-700">9:00 AM – 8:00 PM</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                        <span className="font-bold text-dark-text">Sunday</span>
                        <span className="font-semibold text-stone-700">9:00 AM – 2:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5 Prominent Contact Action Buttons as requested in Section 14 */}
              <div className="pt-4 border-t border-light-border space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                  Quick Actions
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* 1. Call Now */}
                  <a
                    id="contact-call-btn"
                    href={BUSINESS_INFO.phoneTel}
                    className="flex items-center justify-center py-3 px-3 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-xs sm:text-sm shadow-xs transition-colors min-h-[44px] text-center"
                  >
                    <Phone className="w-4 h-4 mr-1.5 shrink-0" />
                    <span>Call Now</span>
                  </a>

                  {/* 2. WhatsApp */}
                  <a
                    id="contact-whatsapp-btn"
                    href={generateWhatsAppUrl('Hello, I would like to ask about welding/fabrication work.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors min-h-[44px] text-center"
                  >
                    <WhatsAppIcon className="w-4 h-4 mr-1.5 shrink-0" />
                    <span>WhatsApp Us</span>
                  </a>

                  {/* 3. Get Directions */}
                  <a
                    id="contact-directions-btn"
                    href={BUSINESS_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center py-3 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-dark-text font-semibold text-xs sm:text-sm border border-stone-200 transition-colors min-h-[44px] text-center"
                  >
                    <Navigation className="w-4 h-4 mr-1.5 text-copper shrink-0" />
                    <span>Directions</span>
                  </a>
                </div>

                {/* 5. Instagram */}
                <div className="pt-1">
                  <a
                    id="contact-instagram-btn"
                    href={BUSINESS_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-dark-text border border-light-border text-xs font-semibold transition-colors group min-h-[44px] text-center flex-wrap gap-1"
                  >
                    <Instagram className="w-4 h-4 mr-1.5 text-rose-500 group-hover:scale-110 transition-transform shrink-0" />
                    <span className="break-words">Instagram: @karimulla955</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1 text-stone-400 group-hover:text-stone-600 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Simplified Quick-Select WhatsApp Quote Flow */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl p-5 sm:p-8 border border-light-border shadow-xs space-y-6 text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                  Fast WhatsApp Quote
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-dark-text tracking-tight">
                  Get a Quick Quote on WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1 leading-relaxed">
                  Select what you need, add your area, and chat directly with our workshop.
                </p>
              </div>

              <form onSubmit={handleWhatsAppSend} className="space-y-5">
                {/* Field 1: Requirement Quick-Select Buttons */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2.5">
                    1. Select Requirement <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {REQUIREMENT_OPTIONS.map((option) => {
                      const IconComponent = option.icon;
                      const isSelected = selectedRequirement === option.label;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setSelectedRequirement(option.label)}
                          aria-pressed={isSelected}
                          className={`flex items-center space-x-2 p-3 rounded-xl border text-left transition-all duration-150 min-h-[48px] cursor-pointer text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                            isSelected
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs ring-1 ring-emerald-500'
                              : 'bg-stone-50/70 hover:bg-stone-100 border-light-border text-stone-700'
                          }`}
                        >
                          <IconComponent
                            className={`w-4 h-4 shrink-0 ${
                              isSelected ? 'text-emerald-600' : 'text-stone-500'
                            }`}
                          />
                          <span className="truncate">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* If 'Other' is selected, provide clean specification input */}
                {selectedRequirement === 'Other' && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Specify Custom Requirement
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Spiral staircase, rolling frame, custom steel bench..."
                      value={customRequirement}
                      onChange={(e) => setCustomRequirement(e.target.value)}
                      className="w-full bg-stone-50 border border-emerald-500 rounded-xl px-3.5 py-2.5 text-dark-text text-sm placeholder:text-stone-400 focus:outline-none focus:bg-white"
                      autoFocus
                    />
                  </div>
                )}

                {/* Field 2: Location */}
                <div>
                  <label htmlFor="quote-location-input" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    2. Your Area / Location
                  </label>
                  <div className="relative">
                    <input
                      id="quote-location-input"
                      type="text"
                      placeholder="e.g. Proddatur, Jammalamadugu Road, Auto Nagar"
                      value={workLocation}
                      onChange={(e) => setWorkLocation(e.target.value)}
                      className="w-full bg-stone-50 border border-light-border rounded-xl px-3.5 py-3 text-dark-text text-sm placeholder:text-stone-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    No full address needed — just your town, area, or nearby landmark.
                  </p>
                </div>

                {/* Field 3: Short Requirement Note (Optional) */}
                <div>
                  <label htmlFor="quote-notes-input" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    3. Anything you'd like us to know? <span className="text-stone-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    id="quote-notes-input"
                    type="text"
                    placeholder="e.g. Approximate size (10x6 ft) or specific style preference"
                    value={optionalNote}
                    onChange={(e) => setOptionalNote(e.target.value)}
                    className="w-full bg-stone-50 border border-light-border rounded-xl px-3.5 py-2.5 text-dark-text text-sm placeholder:text-stone-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                </div>

                {/* Photo guidance notice */}
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-start space-x-2.5 text-xs text-emerald-900 leading-relaxed">
                  <Camera className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>Send Photo on WhatsApp:</strong> You can send your design, existing gate, repair issue, or reference photo directly after WhatsApp opens.
                  </span>
                </div>

                {/* Primary CTA Button */}
                <button
                  id="submit-whatsapp-enquiry-btn"
                  type="submit"
                  className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base shadow-sm transition-all duration-150 active:scale-[0.99] cursor-pointer text-center min-h-[48px]"
                >
                  <WhatsAppIcon className="w-5 h-5 mr-2 shrink-0" />
                  <span>Continue on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 shrink-0 opacity-80" />
                </button>

                {/* Immediate Trust Reassurances & Location Link */}
                <ConversionTrustPoints
                  className="pt-2 border-t border-stone-100"
                  variant="contact"
                  isRepair={selectedRequirement === 'Welding Repair'}
                  showLocation={true}
                  showHours={true}
                />
              </form>
            </div>
          </div>
        </div>

        {/* Embedded Google Maps Component */}
        <WorkshopMap />
      </div>
    </section>
  );
};
