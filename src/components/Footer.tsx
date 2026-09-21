import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Phone, MapPin, Navigation, ExternalLink, Clock, Instagram } from 'lucide-react';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#131517] text-muted-text text-sm border-t border-dark-border pt-16 pb-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-dark-border">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-lg bg-copper text-white flex items-center justify-center font-bold group-hover:bg-copper-hover transition-colors">
                <Hammer className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-copper transition-colors">
                Mashallah Welding Works
              </span>
            </Link>

            <p className="text-muted-text text-xs leading-relaxed">
              Custom iron fabrication, electric arc welding, and metal repair works in Auto Nagar, Proddatur, Andhra Pradesh. Dedicated to durable made-to-requirement steel fittings for homes, shops, and institutions.
            </p>

            <div className="pt-1 text-xs text-stone-300 space-y-0.5">
              <div>
                <span className="text-muted-text">Enquiries & Fabrication: </span>
                <strong className="text-white font-semibold">{BUSINESS_INFO.leadFabricator}</strong>
              </div>
              <div className="text-muted-text text-[11px]">
                <span>Proprietor: </span>
                <span className="text-stone-400">{BUSINESS_INFO.proprietor}</span>
              </div>
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
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-gunmetal hover:bg-steel text-stone-300 border border-dark-border text-xs font-semibold flex items-center transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 mr-1.5 text-rose-400" />
                <span>Instagram: @karimulla955</span>
                <ExternalLink className="w-3 h-3 ml-1.5 text-muted-text" />
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
                <Link to="/" className="text-muted-text hover:text-copper transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/our-work" className="text-muted-text hover:text-copper transition-colors">
                  Work Gallery
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-text hover:text-copper transition-colors">
                  Services (11)
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-text hover:text-copper transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/about#highlights" className="text-muted-text hover:text-copper transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-text hover:text-copper transition-colors">
                  FAQ & Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-text hover:text-copper transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Services (SEO Boost) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Fabrication Services
            </h4>
            <ul className="space-y-1.5 text-xs text-muted-text">
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
              <MapPin className="w-4 h-4 text-copper mr-2 shrink-0 mt-0.5" />
              <span>{BUSINESS_INFO.address}</span>
            </p>
            <p className="flex items-center text-stone-300">
              <Phone className="w-4 h-4 text-copper mr-2 shrink-0" />
              <a href={BUSINESS_INFO.phoneTel} className="text-white hover:text-copper font-semibold transition-colors">
                {BUSINESS_INFO.phoneFormatted}
              </a>
            </p>
            <p className="flex items-center text-stone-300">
              <Clock className="w-4 h-4 text-copper mr-2 shrink-0" />
              <span>Mon-Sat: 9am-8pm | Sun: 9am-2pm</span>
            </p>

            <div className="pt-2">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gunmetal hover:bg-steel text-stone-300 border border-dark-border text-xs font-medium transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 mr-1.5 text-copper" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {currentYear} Mashallah Welding Works. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Auto Nagar, Proddatur, Andhra Pradesh 516360
          </p>
        </div>
      </div>
    </footer>
  );
};

