import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Hammer } from 'lucide-react';
import { BUSINESS_INFO, getBusinessHoursStatus, generateWhatsAppUrl } from '../data/content';
import { BusinessHoursState } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoursStatus, setHoursStatus] = useState<BusinessHoursState>(getBusinessHoursStatus());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHoursStatus(getBusinessHoursStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Work', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Highlights', href: '#highlights' },
    { name: 'Hours & Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-stone-900/95 backdrop-blur-md text-stone-100 shadow-lg border-b border-stone-800'
          : 'bg-stone-900 text-stone-100 border-b border-stone-800'
      }`}
    >
      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo / Brand Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center space-x-3 group text-left"
            id="brand-logo-link"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold shadow-md group-hover:bg-amber-400 transition-colors">
              <Hammer className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="block font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                MASHALLAH
              </span>
              <span className="block text-[11px] sm:text-xs tracking-wider uppercase text-amber-400/90 font-medium">
                Welding & Fabrication Works
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 rounded-md text-stone-300 hover:text-white hover:bg-stone-800/80 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              id="header-call-btn"
              href={BUSINESS_INFO.phoneTel}
              className="inline-flex items-center justify-center px-3.5 py-2 rounded-lg border border-stone-700 bg-stone-800 text-stone-200 text-sm font-semibold hover:bg-stone-700 hover:text-white transition-all shadow-sm"
              title="Call 9553217643"
            >
              <Phone className="w-4 h-4 mr-1.5 text-amber-400" />
              <span>Call Now</span>
            </a>
            <a
              id="header-whatsapp-btn"
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all shadow-md hover:shadow-emerald-600/30"
              title="WhatsApp enquiry"
            >
              <WhatsAppIcon className="w-4 h-4 mr-1.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="sm:hidden p-2 rounded-lg bg-stone-800 text-amber-400 hover:bg-stone-700 transition-colors"
              aria-label="Call Now"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2"
        >
          <div className="flex items-center justify-between py-2 px-3 bg-stone-800/80 rounded-lg text-xs">
            <span className="text-stone-300">Workshop Status:</span>
            <span className={`font-semibold flex items-center ${hoursStatus.isOpen ? 'text-emerald-400' : 'text-amber-400'}`}>
              <span
                className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                  hoursStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
              {hoursStatus.statusText} ({hoursStatus.todayHours})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-3 py-2.5 rounded-lg text-stone-200 hover:bg-stone-800 font-medium text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-800 flex flex-col gap-2">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="flex items-center justify-center py-2.5 px-4 rounded-lg bg-amber-500 text-stone-950 font-bold text-sm shadow-sm"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now (9553217643)
            </a>
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-2.5 px-4 rounded-lg bg-emerald-600 text-white font-bold text-sm shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4 mr-2" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
