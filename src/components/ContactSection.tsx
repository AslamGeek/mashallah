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
  CheckCircle2,
} from 'lucide-react';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';

export const ContactSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState('Iron Gate');
  const [customerName, setCustomerName] = useState('');
  const [projectNote, setProjectNote] = useState('');
  const [workLocation, setWorkLocation] = useState('Kottapalle');

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const namePart = customerName ? `My name is ${customerName}. ` : '';
    const locPart = workLocation ? `Location: ${workLocation}. ` : '';
    const notePart = projectNote ? `Details: ${projectNote}` : 'Please provide approximate price estimate.';
    const fullMsg = `Hello Mashallah Welding Works, ${namePart}I would like to enquire about ${selectedService}. ${locPart}${notePart}`;
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 1. Call Now */}
                  <a
                    id="contact-call-btn"
                    href={BUSINESS_INFO.phoneTel}
                    className="flex items-center justify-center py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md transition-colors"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now (9553217643)
                  </a>

                  {/* 2. WhatsApp */}
                  <a
                    id="contact-whatsapp-btn"
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 mr-2" />
                    WhatsApp Us
                  </a>

                  {/* 3. Get Directions */}
                  <a
                    id="contact-directions-btn"
                    href={BUSINESS_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center py-3 px-4 rounded-xl bg-stone-700 hover:bg-stone-600 text-stone-200 font-semibold text-sm border border-stone-600 transition-colors"
                  >
                    <Navigation className="w-4 h-4 mr-2 text-amber-400" />
                    Get Directions
                  </a>

                  {/* 4. Pinterest */}
                  <a
                    id="contact-pinterest-btn"
                    href={BUSINESS_INFO.pinterestUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center py-3 px-4 rounded-xl bg-red-700/90 hover:bg-red-600 text-white font-semibold text-sm transition-colors"
                  >
                    <span className="w-4 h-4 rounded-full bg-white text-red-700 font-bold text-[10px] flex items-center justify-center mr-2">
                      P
                    </span>
                    Pinterest Designs
                  </a>
                </div>

                {/* 5. Instagram */}
                <div className="pt-1">
                  <a
                    id="contact-instagram-btn"
                    href={generateWhatsAppUrl('Hello Mashallah Welding Works, please share your Instagram profile / latest video updates.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-950 text-stone-300 hover:text-white border border-stone-700 text-xs font-semibold transition-colors"
                  >
                    <Camera className="w-4 h-4 mr-2 text-rose-400" />
                    <span>Instagram Profile (Connect directly via WhatsApp)</span>
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
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="Iron Gates">Iron Gates (Main Gate, Sliding Gate)</option>
                    <option value="Iron Grills">Iron Grills (Window Safety, Balcony)</option>
                    <option value="Railings">Railings (Staircase, Terrace)</option>
                    <option value="Metal Doors">Metal Doors & Safety Doors</option>
                    <option value="Iron Stands">Iron Stands (Water Tank, AC, Machinery)</option>
                    <option value="Welding Works">Welding Works (Electric Arc Welding & Joinery)</option>
                    <option value="Iron Repair Works">Iron Repair Works (Hinges, Re-alignment)</option>
                    <option value="Custom Iron Fabrication">Custom Iron Fabrication (Bespoke)</option>
                    <option value="Residential Iron Works">Residential Iron Works</option>
                    <option value="Commercial Iron Works">Commercial Iron Works</option>
                    <option value="Small Industrial Fabrication">Small Industrial Fabrication</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh / Mohammed"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 text-sm placeholder:text-stone-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Your Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kottapalle / Auto Nagar / Nearby"
                      value={workLocation}
                      onChange={(e) => setWorkLocation(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 text-sm placeholder:text-stone-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Project Details / Approximate Size
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Need 12x6ft main sliding gate in geometric pattern, and 4 window safety grills..."
                    value={projectNote}
                    onChange={(e) => setProjectNote(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-stone-100 text-sm placeholder:text-stone-600 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <button
                  id="submit-whatsapp-enquiry-btn"
                  type="submit"
                  className="w-full flex items-center justify-center py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98]"
                >
                  <WhatsAppIcon className="w-5 h-5 mr-2" />
                  Send Instant Enquiry on WhatsApp (+91 95532 17643)
                </button>

                <p className="text-center text-[11px] text-stone-500">
                  Opens WhatsApp directly with your pre-formatted enquiry. No registration required.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
