import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Navigation,
  Send,
  User,
  Share2,
  ExternalLink,
  Camera,
  Instagram,
  CheckCircle2,
} from 'lucide-react';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';
import { WorkshopMap } from './WorkshopMap';

interface ContactSectionProps {
  className?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  className = 'py-20',
}) => {
  const [selectedService, setSelectedService] = useState('Iron Gates');
  const [customService, setCustomService] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [projectNote, setProjectNote] = useState('');
  const [workLocation, setWorkLocation] = useState('');

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceLabel =
      selectedService === 'Other'
        ? customService.trim() || 'Custom Welding & Iron Work'
        : selectedService;
    const namePart = customerName.trim() ? `My name is ${customerName.trim()}. ` : '';
    const locPart = workLocation.trim() ? `Location: ${workLocation.trim()}. ` : '';
    const notePart = projectNote.trim()
      ? `Details: ${projectNote.trim()}`
      : 'Please provide approximate price estimate and timeline.';
    const fullMsg = `Hello Mashallah Welding Works, ${namePart}I would like to enquire about ${serviceLabel}. ${locPart}${notePart}`;
    window.open(generateWhatsAppUrl(fullMsg), '_blank');
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
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-light-border shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-copper block mb-1">
                  Fabrication Workshop
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-dark-text">
                  {BUSINESS_INFO.name}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
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
                    <div>
                      <h4 className="text-base font-bold text-dark-text">
                        {BUSINESS_INFO.primaryContact.name}
                      </h4>
                      <span className="text-xs text-stone-600">
                        {BUSINESS_INFO.primaryContact.role}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 pt-1 sm:pt-0">
                      <a
                        href={BUSINESS_INFO.primaryContact.phoneTel}
                        className="text-sm font-extrabold text-copper hover:text-copper-hover transition-colors whitespace-nowrap"
                      >
                        {BUSINESS_INFO.primaryContact.phoneFormatted}
                      </a>
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-1.5 leading-relaxed">
                    For pricing estimates, design discussions, and on-site measurements across Proddatur.
                  </p>
                </div>

                {/* Proprietor: Abdul Sattar */}
                <div className="bg-stone-50 rounded-xl p-3.5 border border-light-border">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                        Proprietor
                      </span>
                      <h4 className="text-sm font-semibold text-dark-text">
                        {BUSINESS_INFO.proprietorContact.name}
                      </h4>
                    </div>
                    <a
                      href={BUSINESS_INFO.proprietorContact.phoneTel}
                      className="text-xs font-semibold text-stone-600 hover:text-dark-text transition-colors whitespace-nowrap"
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
                  <div>
                    <span className="text-xs text-stone-500 block mb-0.5">Workshop Address</span>
                    <p className="text-stone-700 font-medium leading-relaxed">
                      {BUSINESS_INFO.address}
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-warm-tint text-copper border border-light-border flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-stone-500 block">Business Hours</span>
                    <p className="text-stone-700 font-medium whitespace-nowrap">
                      Monday – Saturday: <strong className="text-dark-text">9:00 AM – 8:00 PM</strong>
                    </p>
                    <p className="text-stone-700 font-medium whitespace-nowrap">
                      Sunday: <strong className="text-dark-text">9:00 AM – 2:00 PM</strong>
                    </p>
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
                    className="flex items-center justify-center py-3 px-3 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-xs sm:text-sm shadow-xs transition-colors min-h-[44px] whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 mr-1.5 shrink-0" />
                    <span>Call Now</span>
                  </a>

                  {/* 2. WhatsApp */}
                  <a
                    id="contact-whatsapp-btn"
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors min-h-[44px] whitespace-nowrap"
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
                    className="flex items-center justify-center py-3 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-dark-text font-semibold text-xs sm:text-sm border border-stone-200 transition-colors min-h-[44px] whitespace-nowrap"
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
                    className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-dark-text border border-light-border text-xs font-semibold transition-colors group min-h-[44px] whitespace-nowrap"
                  >
                    <Instagram className="w-4 h-4 mr-2 text-rose-500 group-hover:scale-110 transition-transform shrink-0" />
                    <span>Instagram: @karimulla955</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-stone-400 group-hover:text-stone-600 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick WhatsApp Enquiry & Quotation Builder */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-light-border shadow-xs space-y-5 text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                  Fast WhatsApp Quote
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-dark-text">
                  Tell Us What You Need
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Fill this quick form to generate an instant enquiry message on WhatsApp.
                </p>
              </div>

              <form onSubmit={handleWhatsAppSend} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Select Service Required
                  </label>
                  <select
                    id="enquiry-service-select"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-stone-50 border border-light-border rounded-xl px-3.5 py-2.5 text-dark-text text-sm focus:outline-none focus:border-copper focus:bg-white transition-colors"
                  >
                    <option value="Iron Gates">Iron Gates (Main Gate, Sliding & Swing)</option>
                    <option value="Iron Grills">Iron Grills (Window Safety & Balcony)</option>
                    <option value="Railings">Railings (Staircase & Balcony)</option>
                    <option value="Metal Doors">Metal Doors & Safety Doors</option>
                    <option value="Iron Stands">Iron Stands (Water Tank, AC, Machinery)</option>
                    <option value="Welding Works">Welding & Joinery Works</option>
                    <option value="Iron Repair Works">Iron Repair & Maintenance</option>
                    <option value="Custom Iron Fabrication">Custom Iron Fabrication</option>
                    <option value="Other">Other (Specify Custom Requirement)</option>
                  </select>
                </div>

                {selectedService === 'Other' && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Specify Requirement
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Spiral staircase, shed truss, rolling shutter..."
                      value={customService}
                      onChange={(e) => setCustomService(e.target.value)}
                      className="w-full bg-stone-50 border border-copper rounded-xl px-3.5 py-2.5 text-dark-text text-sm placeholder:text-stone-400 focus:outline-none focus:border-copper-hover focus:bg-white"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Your Name <span className="text-stone-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh / Mohammed"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-stone-50 border border-light-border rounded-xl px-3.5 py-2.5 text-dark-text text-sm placeholder:text-stone-400 focus:outline-none focus:border-copper focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Your Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Auto Nagar / Proddatur / Nearby"
                      value={workLocation}
                      onChange={(e) => setWorkLocation(e.target.value)}
                      className="w-full bg-stone-50 border border-light-border rounded-xl px-3.5 py-2.5 text-dark-text text-sm placeholder:text-stone-400 focus:outline-none focus:border-copper focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Project Details / Approximate Size
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 10x6 ft sliding main gate with geometric bars, or 4 window safety grills..."
                    value={projectNote}
                    onChange={(e) => setProjectNote(e.target.value)}
                    className="w-full bg-stone-50 border border-light-border rounded-xl p-3 text-dark-text text-sm placeholder:text-stone-400 focus:outline-none focus:border-copper focus:bg-white resize-none"
                  />
                </div>

                <button
                  id="submit-whatsapp-enquiry-btn"
                  type="submit"
                  className="w-full inline-flex items-center justify-center py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xs transition-all active:scale-[0.99] whitespace-nowrap cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 mr-2 shrink-0" />
                  <span>Send Quote Request</span>
                </button>

                <p className="text-center text-xs text-stone-500">
                  Opens directly in WhatsApp. Contact us for a quick response.
                </p>
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
