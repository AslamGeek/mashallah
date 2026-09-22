import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Hammer } from 'lucide-react';
import { getBusinessHoursStatus } from '../data/content';
import { BusinessHoursState } from '../types';

export const Header: React.FC = () => {
  const location = useLocation();
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
    { name: 'Home', to: '/' },
    { name: 'Our Work', to: '/our-work' },
    { name: 'Services', to: '/services' },
    { name: 'About Us', to: '/about' },
    { name: 'Contact', to: '/contact' },
  ];

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
    setIsVisible(true);
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'bg-dark-bg/95 backdrop-blur-md text-[#F5F3EE] shadow-md border-b border-dark-border'
          : 'bg-dark-bg text-[#F5F3EE] border-b border-dark-border'
      }`}
    >
      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo / Brand Name */}
          <Link
            to="/"
            onClick={handleMobileLinkClick}
            className="flex items-center space-x-3 group text-left"
            id="brand-logo-link"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-copper text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-copper-hover transition-colors">
              <Hammer className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="block font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-copper-hover transition-colors">
                MASHALLAH
              </span>
              <span className="block text-[11px] sm:text-xs tracking-wider uppercase text-copper font-medium">
                Welding & Fabrication Works
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-medium" aria-label="Desktop navigation">
            {navLinks.map((link) => {
              const isWorkLink = link.to === '/our-work';
              const isWorkActive = location.pathname.startsWith('/our-work') || location.pathname.startsWith('/portfolio');
              return (
                <NavLink
                  key={link.name}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => {
                    const active = isWorkLink ? isWorkActive : isActive;
                    return `px-3.5 py-2 rounded-lg transition-colors text-sm font-semibold ${
                      active
                        ? 'text-copper bg-steel/90 shadow-xs ring-1 ring-copper/30'
                        : 'text-muted-text hover:text-white hover:bg-steel/60'
                    }`;
                  }}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-steel text-stone-300 hover:text-white hover:bg-dark-border focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
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
          className="lg:hidden bg-gunmetal border-b border-dark-border px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 py-2.5 px-3 bg-steel border border-dark-border rounded-lg text-xs">
            <span className="text-stone-300 whitespace-nowrap">Workshop Status:</span>
            <div className={`font-semibold flex items-center flex-wrap gap-1 ${hoursStatus.isOpen ? 'text-emerald-400' : 'text-copper'}`}>
              <span className="inline-flex items-center whitespace-nowrap">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-1.5 shrink-0 ${
                    hoursStatus.isOpen ? 'bg-emerald-500' : 'bg-copper'
                  }`}
                />
                {hoursStatus.statusText}
              </span>
              <span className="text-stone-300 font-normal whitespace-nowrap">
                ({hoursStatus.todayHours})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => {
              const isWorkLink = link.to === '/our-work';
              const isWorkActive = location.pathname.startsWith('/our-work') || location.pathname.startsWith('/portfolio');
              return (
                <NavLink
                  key={link.name}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={handleMobileLinkClick}
                  className={({ isActive }) => {
                    const active = isWorkLink ? isWorkActive : isActive;
                    return `block px-3.5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                      active
                        ? 'bg-copper text-white font-bold shadow-xs'
                        : 'text-stone-200 hover:bg-steel'
                    }`;
                  }}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};

