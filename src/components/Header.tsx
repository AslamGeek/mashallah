import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Hammer } from 'lucide-react';
import { getBusinessHoursStatus } from '../data/content';
import { BusinessHoursState } from '../types';
import { scrollToSection } from '../utils/scrollToSection';

export const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoursStatus, setHoursStatus] = useState<BusinessHoursState>(getBusinessHoursStatus());
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      // Always show when near the very top of the page
      if (currentScrollY < 15) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Keep visible if mobile dropdown menu is open
      if (mobileMenuOpen) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Small threshold to prevent micro-jitter
      const diff = currentScrollY - lastScrollY.current;
      if (Math.abs(diff) > 6) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 70) {
          // Scrolling down -> hide navbar
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          // Scrolling up -> reveal navbar
          setIsVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

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
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setIsVisible(true);
    scrollToSection(href);
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
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
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-medium" aria-label="Desktop navigation">
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

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
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
        </nav>
      )}
    </header>
  );
};
