import React from 'react';
import { Hammer, Phone, MapPin, Navigation, ExternalLink, Clock, Instagram } from 'lucide-react';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-400 text-sm border-t border-stone-800/80 pt-16 pb-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                <Hammer className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                Mashallah Welding Works
              </span>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed">
              Custom iron fabrication, electric arc welding, and metal repair works in Auto Nagar, Kottapalle, Andhra Pradesh. Dedicated to durable made-to-requirement steel fittings for homes, shops, and institutions.
            </p>

            <div className="pt-1 text-xs text-stone-300">
              <span>Proprietor: </span>
              <strong className="text-amber-400 font-semibold">{BUSINESS_INFO.proprietor}</strong>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/60 text-xs font-semibold flex items-center transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 mr-1.5" />
                <span>WhatsApp: 9553217643</span>
              </a>
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/60 text-xs font-semibold flex items-center transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 mr-1.5" />
                <span>Instagram: @karimulla955</span>
                <ExternalLink className="w-3 h-3 ml-1.5" />
              </a>
              <a
                href={BUSINESS_INFO.pinterestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/60 text-xs font-semibold flex items-center transition-colors"
              >
                <span>Pinterest: @skarimulla2018</span>
                <ExternalLink className="w-3 h-3 ml-1.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="hover:text-amber-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => handleScroll(e, '#gallery')} className="hover:text-amber-400 transition-colors">
                  Work Gallery
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleScroll(e, '#about')} className="hover:text-amber-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScroll(e, '#services')} className="hover:text-amber-400 transition-colors">
                  Services (11)
                </a>
              </li>
              <li>
                <a href="#highlights" onClick={(e) => handleScroll(e, '#highlights')} className="hover:text-amber-400 transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#location" onClick={(e) => handleScroll(e, '#location')} className="hover:text-amber-400 transition-colors">
                  Location & Hours
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="hover:text-amber-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Services (SEO Boost) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Fabrication Services
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>• Iron Gates (Sliding & Swing)</li>
              <li>• Window Safety Grills</li>
              <li>• Staircase & Balcony Railings</li>
              <li>• Heavy Sheet Metal Doors</li>
              <li>• Water Tank & AC Stands</li>
              <li>• Electric Arc Welding Works</li>
              <li>• Gate Re-alignment & Repair Works</li>
              <li>• Small Industrial Shed Fabrication</li>
            </ul>
          </div>

          {/* Col 4: Location & Direct Contact */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Workshop Contact
            </h4>
            <p className="flex items-start text-stone-300">
              <MapPin className="w-4 h-4 text-amber-500 mr-2 shrink-0 mt-0.5" />
              <span>{BUSINESS_INFO.address}</span>
            </p>
            <p className="flex items-center text-stone-300">
              <Phone className="w-4 h-4 text-amber-500 mr-2 shrink-0" />
              <a href={BUSINESS_INFO.phoneTel} className="hover:text-white font-semibold">
                {BUSINESS_INFO.phoneFormatted}
              </a>
            </p>
            <p className="flex items-center text-stone-300">
              <Clock className="w-4 h-4 text-amber-500 mr-2 shrink-0" />
              <span>Mon-Sat: 9am-8pm | Sun: 9am-2pm</span>
            </p>

            <div className="pt-2">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs font-medium transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {currentYear} Mashallah Welding Works. All rights reserved. Proprietor: Abdul Sattar.</p>
          <p className="text-center sm:text-right">
            Auto Nagar, Kottapalle, Andhra Pradesh 516360 • Mobile: 9553217643
          </p>
        </div>
      </div>
    </footer>
  );
};
