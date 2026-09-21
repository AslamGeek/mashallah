import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Grid,
  Layers,
  DoorClosed,
  Box,
  Wrench,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { PageSeo } from '../components/PageSeo';
import { Hero } from '../components/Hero';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import {
  BUSINESS_INFO,
  SERVICES_LIST,
  GALLERY_ITEMS,
  getBusinessHoursStatus,
  generateWhatsAppUrl,
} from '../data/content';

export const HomePage: React.FC = () => {
  const hoursStatus = getBusinessHoursStatus();
  // Feature top 6 services for preview
  const featuredServices = SERVICES_LIST.slice(0, 6);
  // Feature top 3 gallery projects for preview
  const featuredProjects = GALLERY_ITEMS.slice(0, 3);

  return (
    <>
      <PageSeo
        title="Mashallah Welding Works | Welding & Iron Fabrication in Proddatur"
        description="Custom iron fabrication, electric arc welding, and repair works in Auto Nagar, Proddatur by Abdul Sattar. Heavy-gauge iron gates, window safety grills, staircase railings, and custom metalwork."
      />

      {/* Hero Section */}
      <Hero />

      {/* Key Business Information Strip */}
      <section className="bg-gunmetal border-b border-dark-border py-6 px-4 sm:px-6 lg:px-8 text-stone-200 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Location */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-steel text-copper border border-dark-border flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-muted-text block uppercase tracking-wider font-semibold">
                Workshop Location
              </span>
              <p className="font-semibold text-white">Auto Nagar, Proddatur</p>
              <span className="text-xs text-muted-text">Kadapa District, AP</span>
            </div>
          </div>

          {/* Business Hours with Live Indicator */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-steel text-copper border border-dark-border flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-text uppercase tracking-wider font-semibold">
                  Working Hours
                </span>
                <span
                  className={`inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    hoursStatus.isOpen
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-copper/20 text-copper border border-copper/40'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      hoursStatus.isOpen ? 'bg-emerald-400' : 'bg-copper'
                    }`}
                  />
                  {hoursStatus.statusText}
                </span>
              </div>
              <p className="font-semibold text-white">{BUSINESS_INFO.hours.monSat}</p>
              <span className="text-xs text-muted-text">Sunday: {BUSINESS_INFO.hours.sunday}</span>
            </div>
          </div>

          {/* Direct Master Welder Contact */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-steel text-copper border border-dark-border flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-muted-text block uppercase tracking-wider font-semibold">
                Proprietor & Fabricator
              </span>
              <p className="font-semibold text-white">{BUSINESS_INFO.proprietor}</p>
              <a
                href={BUSINESS_INFO.phoneTel}
                className="text-xs text-copper hover:text-copper-hover font-bold transition-colors"
              >
                {BUSINESS_INFO.phoneFormatted}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-light-bg text-dark-text border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-stone-200/80 border border-light-border text-stone-700 text-xs font-bold uppercase tracking-wider">
                <span>Fabrication Capabilities</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-text">
                Custom Iron Fabrication & Repairs
              </h2>
              <p className="text-base text-stone-600">
                From structural main gates and window safety grills to staircase railings, heavy stands, and on-site welding repairs.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 text-copper hover:text-copper-hover font-bold text-sm group shrink-0"
            >
              <span>View All 11 Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-light-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-copper/60"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-stone-100 text-stone-600 border border-light-border">
                      {service.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-dark-text mb-2 group-hover:text-copper transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-1.5 text-xs text-stone-600 mb-6">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-copper shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-light-border flex items-center justify-between">
                  <Link
                    to="/services"
                    className="text-xs font-semibold text-stone-600 hover:text-copper transition-colors"
                  >
                    Details & specs →
                  </Link>
                  <a
                    href={generateWhatsAppUrl(`Hello Mashallah Welding Works, I want an estimate for ${service.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 mr-1" />
                    <span>Get Quote</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gunmetal hover:bg-steel text-white font-bold text-sm border border-dark-border shadow-xs transition-colors"
            >
              <span>Explore All 11 Fabrication & Repair Services</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Selected Work Preview */}
      <section className="py-20 bg-dark-bg text-[#F5F3EE] border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gunmetal border border-dark-border text-copper text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Selected Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Featured Fabrication Projects
              </h2>
              <p className="text-base text-muted-text">
                Real custom ironwork built to exact dimensions with solid steel, smooth grind seams, and anti-rust primer.
              </p>
            </div>
            <Link
              to="/our-work"
              className="inline-flex items-center space-x-2 text-copper hover:text-copper-hover font-bold text-sm group shrink-0"
            >
              <span>Explore Full Work Gallery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gunmetal rounded-2xl overflow-hidden border border-dark-border shadow-xs group flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt || project.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (project.imageUrl.includes('window-safety-grill') && !target.src.endsWith('.jpg')) {
                        target.src = '/images/window-safety-grill-s-curve-design-proddatur-1.jpg';
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-gunmetal/90 text-copper text-[11px] font-bold px-2.5 py-1 rounded-md border border-dark-border capitalize">
                    {project.category.replace('-', ' ')}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-copper transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-text line-clamp-2 mb-3">
                      {project.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-dark-border flex items-center justify-between text-xs">
                    <span className="text-stone-400 truncate max-w-[200px]">{project.specifications || project.categoryLabel}</span>
                    <Link
                      to="/our-work"
                      className="text-copper hover:text-copper-hover font-semibold inline-flex items-center"
                    >
                      View in gallery →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/our-work"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-sm shadow-xs transition-colors"
            >
              <span>View Complete Portfolio & Design Showcase</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Short About Preview Section */}
      <section className="py-20 bg-light-bg text-dark-text border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-stone-200/80 border border-light-border text-stone-700 text-xs font-bold uppercase tracking-wider">
                <span>About The Workshop</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-text">
                Dedicated Metal Craftsmen in Auto Nagar, Proddatur
              </h2>
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
                At <strong>Mashallah Welding Works</strong>, lead fabricator <strong>{BUSINESS_INFO.proprietor}</strong> and our team provide dependable iron fabrication built for long-lasting structural strength and weather protection.
              </p>
              <p className="text-sm text-stone-600 leading-relaxed">
                Whether you are constructing a new residence requiring heavy entrance gates and window safety grills, or need immediate on-site repair for misaligned iron hinges, we ensure heavy-gauge steel, clean weld joints, and anti-rust primer protection.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gunmetal hover:bg-steel text-white font-bold text-sm transition-colors border border-dark-border"
                >
                  <span>Read Our Full Story & Craftsmanship</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-light-border shadow-xs space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-xl bg-gunmetal text-copper flex items-center justify-center font-extrabold text-xl border border-dark-border">
                  AS
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-copper block">
                    Proprietor & Fabricator
                  </span>
                  <h4 className="text-lg font-bold text-dark-text">{BUSINESS_INFO.proprietor}</h4>
                  <span className="text-xs text-stone-500 block">
                    Auto Nagar, Proddatur, Kadapa District
                  </span>
                </div>
              </div>
              <p className="text-stone-600 text-sm italic border-l-2 border-copper pl-3 py-1">
                “Every gate and grill leaving our Auto Nagar workshop is welded with structural discipline to protect your home or business for years to come.”
              </p>
              <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs">
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="flex items-center justify-center py-2 px-3 rounded-lg bg-gunmetal text-white font-semibold hover:bg-steel transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 mr-1.5 text-copper" />
                  Call Directly
                </a>
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center py-2 px-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 mr-1.5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Highlights */}
      <WhyChooseUs />

      {/* Bottom Contact / Quote CTA Banner */}
      <section className="py-16 bg-gunmetal text-[#F5F3EE] border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-steel/60 rounded-3xl p-8 sm:p-12 border border-dark-border shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-copper">
                <Wrench className="w-4 h-4 mr-2" />
                Custom Fabrication & Emergency Repair Service
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Need an Estimate for Your Gate, Grill, or Ironwork?
              </h2>
              <p className="text-muted-text text-sm sm:text-base leading-relaxed">
                Call or message us with your approximate measurements or reference designs for quick, transparent pricing and on-site consultation in Proddatur.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 w-full lg:w-auto shrink-0">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-sm shadow-xs transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span>Call {BUSINESS_INFO.phoneFormatted}</span>
              </a>
              <a
                href={generateWhatsAppUrl('Hello Mashallah Welding Works, I would like to get a quote for fabrication.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xs transition-all active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4 mr-2" />
                <span>WhatsApp Quote</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-gunmetal hover:bg-steel text-stone-200 border border-dark-border font-semibold text-sm transition-colors"
              >
                <span>Contact Details & Map →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
