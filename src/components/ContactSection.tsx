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

export const ContactSection: React.FC = () => {
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
    <section id="contact" className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-stone-800 border border-stone-700 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <span>Contact & Enquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Get in Touch with Mashallah Welding Works
          </h2>
          <p className="text-base sm:text-lg text-stone-400 leading-relaxed">
            Speak directly with proprietor Abdul Sattar for immediate quotes, on-site measurements, or welding repair assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Contact Card with all Required Fields */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-stone-800/90 rounded-2xl p-6 sm:p-8 border border-stone-700 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Fabrication Workshop
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {BUSINESS_INFO.name}
                </h3>
                <div className="mt-2 flex items-center text-stone-300 text-sm">
                  <User className="w-4 h-4 text-amber-500 mr-2 shrink-0" />
                  <span>
                    Proprietor:{' '}
                    <strong className="text-white font-semibold">{BUSINESS_INFO.proprietor}</strong>
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-stone-700/80 text-sm">
                {/* Phone */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-400 block">Phone / WhatsApp</span>
                    <a
                      href={BUSINESS_INFO.phoneTel}
                      className="text-base font-bold text-white hover:text-amber-400 transition-colors"
                    >
                      {BUSINESS_INFO.phoneFormatted}
                    </a>
                    <span className="text-xs text-stone-500 block">Direct Line: 9553217643</span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-400 block">Workshop Address</span>
                    <p className="text-stone-300 font-medium leading-relaxed">
                      {BUSINESS_INFO.address}
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-400 block">Business Hours</span>
                    <p className="text-stone-300 font-medium">
                      Monday – Saturday: <strong className="text-white">9:00 AM – 8:00 PM</strong>
                    </p>
                    <p className="text-stone-300 font-medium">
                      Sunday: <strong className="text-white">9:00 AM – 2:00 PM</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* 5 Prominent Contact Action Buttons as requested in Section 14 */}
              <div className="pt-4 border-t border-stone-700/80 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                  Quick Actions
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* 1. Call Now */}
                  <a
                    id="contact-call-btn"
                    href={BUSINESS_INFO.phoneTel}
                    className="flex items-center justify-center py-3 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-colors"
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
                    className="flex items-center justify-center py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 mr-1.5 shrink-0" />
                    <span>WhatsApp</span>
                  </a>

                  {/* 3. Get Directions */}
                  <a
                    id="contact-directions-btn"
                    href={BUSINESS_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center py-3 px-3 rounded-xl bg-stone-700 hover:bg-stone-600 text-stone-200 font-semibold text-xs sm:text-sm border border-stone-600 transition-colors"
                  >
                    <Navigation className="w-4 h-4 mr-1.5 text-amber-400 shrink-0" />
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
                    className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-950 text-stone-300 hover:text-white border border-stone-700 text-xs font-semibold transition-colors group"
                  >
                    <Instagram className="w-4 h-4 mr-2 text-rose-400 group-hover:scale-110 transition-transform" />
                    <span>Instagram: @karimulla955</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-stone-500 group-hover:text-stone-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick WhatsApp Enquiry & Quotation Builder */}
          <div className="lg:col-span-6">
            <div className="bg-stone-800/90 rounded-2xl p-6 sm:p-8 border border-stone-700 shadow-xl space-y-5 text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  Fast WhatsApp Quote
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Tell Us What You Need
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 mt-1">
                  Fill this quick form to generate an instant enquiry message directly to Abdul Sattar on WhatsApp.
                </p>
              </div>

              <form onSubmit={handleWhatsAppSend} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Select Service Required
                  </label>
                  <select
                    id="enquiry-service-select"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 text-sm focus:outline-none focus:border-amber-500 transition-colors"
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
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Specify Requirement
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Spiral staircase, shed truss, rolling shutter..."
                      value={customService}
                      onChange={(e) => setCustomService(e.target.value)}
                      className="w-full bg-stone-900 border border-amber-500/70 rounded-xl px-3.5 py-2.5 text-stone-100 text-sm placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Your Name <span className="text-stone-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh / Mohammed"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 text-sm placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Your Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Auto Nagar / Kottapalle / Nearby"
                      value={workLocation}
                      onChange={(e) => setWorkLocation(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 text-sm placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Project Details / Approximate Size
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 10x6 ft sliding main gate with geometric bars, or 4 window safety grills..."
                    value={projectNote}
                    onChange={(e) => setProjectNote(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-stone-100 text-sm placeholder:text-stone-500 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <button
                  id="submit-whatsapp-enquiry-btn"
                  type="submit"
                  className="w-full inline-flex items-center justify-center py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition-all active:scale-[0.99] whitespace-nowrap cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 mr-2 shrink-0" />
                  <span>Send Quote Request</span>
                </button>

                <p className="text-center text-xs text-stone-400">
                  Direct message to Abdul Sattar (+91 95532 17643). No registration needed.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
