import React, { useState } from 'react';
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
  Maximize2,
  HelpCircle,
  ChevronDown,
  Navigation,
  School,
  Hammer,
} from 'lucide-react';
import { PageSeo } from '../components/PageSeo';
import { Hero } from '../components/Hero';
import { WorkshopMap } from '../components/WorkshopMap';
import { ProjectLightbox } from '../components/ProjectLightbox';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import {
  BUSINESS_INFO,
  SERVICES_LIST,
  GALLERY_ITEMS,
  getBusinessHoursStatus,
  generateWhatsAppUrl,
} from '../data/content';
import { GalleryProject } from '../types';

export const HomePage: React.FC = () => {
  const hoursStatus = getBusinessHoursStatus();

  // Step 2: Proof - Feature top 6 real fabrication projects
  const featuredProjects = GALLERY_ITEMS.slice(0, 6);

  // Step 3: Services - Concise 6 core services for homepage
  const homepageServices = [
    {
      id: 'iron-gates',
      title: 'Steel Gates & Doors',
      category: 'Residential & Commercial',
      description: 'Heavy-duty main entrance gates, double-leaf sliding gates, and protective safety doors made with solid steel.',
      icon: Shield,
      whatsappMsg: 'Hello Mashallah Welding Works, I want an estimate for a Steel Gate / Main Entrance Gate.',
    },
    {
      id: 'window-grills',
      title: 'Window & Safety Grills',
      category: 'Residential',
      description: 'Burglar-proof window safety grills and balcony safety frames with geometric bars and durable anti-rust primer.',
      icon: Grid,
      whatsappMsg: 'Hello Mashallah Welding Works, I want an estimate for Window Safety Grills.',
    },
    {
      id: 'railings',
      title: 'Railings & Staircases',
      category: 'Residential & Commercial',
      description: 'Sturdy terrace handrails, staircase railings, and custom outdoor steel stairs built to exact step dimensions.',
      icon: Layers,
      whatsappMsg: 'Hello Mashallah Welding Works, I want an estimate for Staircase Railings / Handrails.',
    },
    {
      id: 'school-furniture',
      title: 'School & College Furniture',
      category: 'Institutional',
      description: 'Heavy-gauge steel student desk-bench sets, classroom tables, laboratory stands, and institutional furniture.',
      icon: School,
      whatsappMsg: 'Hello Mashallah Welding Works, I want an estimate for School & College Steel Furniture.',
    },
    {
      id: 'stands-sheds',
      title: 'Sheds, Racks & Stands',
      category: 'Commercial & Industrial',
      description: 'Corrugated roofing car sheds, water tank stands, AC frames, and heavy-duty commercial storage rack frames.',
      icon: Box,
      whatsappMsg: 'Hello Mashallah Welding Works, I want an estimate for Steel Sheds / Heavy Stands / Storage Racks.',
    },
    {
      id: 'welding-repairs',
      title: 'Welding Repairs & Joinery',
      category: 'Repair & Maintenance',
      description: 'Fast on-site visits across Proddatur for broken gate hinges, detached grill joints, and structural re-welding.',
      icon: Wrench,
      whatsappMsg: 'Hello Mashallah Welding Works, I need urgent Welding Repair work in Proddatur.',
    },
  ];

  // Step 4: Practical Trust Highlights
  const trustSignals = [
    {
      title: 'Heavy-Gauge Raw Steel',
      desc: 'We never compromise on metal thickness. We use structural mild steel, solid bars, and quality angle iron sections built for long-term durability.',
    },
    {
      title: 'Precision On-Site Measurements',
      desc: 'We personally take and verify exact on-site measurements across Proddatur, ensuring zero gaps, seamless gate swings, and flush fits.',
    },
    {
      title: 'Anti-Rust Primer Application',
      desc: 'Every fabricated item receives red oxide or zinc-chromate anti-corrosive primer before delivery to guard against monsoon weathering and rust.',
    },
    {
      title: 'Honest Direct Workshop Pricing',
      desc: 'No middleman commissions. Clear estimates based on raw steel weight, design specifications, and actual installation labor.',
    },
    {
      title: 'Fast Turnaround on Repairs',
      desc: 'Broken hinges, misaligned gates, or detached grills receive prompt on-site repair visits across Auto Nagar and Proddatur.',
    },
    {
      title: 'Experienced Master Welder',
      desc: 'Lead fabricator Abdul Sattar brings hands-on metal fabrication experience with clean weld seams, deep arc penetration, and smooth grinding.',
    },
  ];

  // Step 6: FAQ items for objection handling
  const objectionFaqs = [
    {
      id: 'faq-measurements',
      q: 'Do you visit our location in Proddatur to take measurements?',
      a: 'Yes. For gates, window grills, staircase railings, and sheds, we personally visit your residential or commercial site in Proddatur and neighboring areas to take precise tape measurements before metal cutting begins.',
    },
    {
      id: 'faq-pricing',
      q: 'How is the fabrication price calculated?',
      a: 'Pricing is transparently based on total steel weight (pipe/angle gauge thickness), design complexity (simple geometric bars vs. ornate cutwork), and installation requirements. We provide a straightforward itemized estimate before work starts.',
    },
    {
      id: 'faq-rust',
      q: 'Will the fabricated ironwork rust over time?',
      a: 'We thoroughly degrease all steel joints and apply a coat of red oxide or zinc-chromate anti-corrosive primer before delivery. When finished with good quality enamel paint, our steelwork withstands rain and weather for years.',
    },
    {
      id: 'faq-repairs',
      q: 'How quickly can you attend to emergency welding repairs?',
      a: 'For urgent issues like broken main gate hinges, misaligned sliding rollers, loose railings, or detached security grills, we provide prompt same-day or next-morning on-site service across Auto Nagar and Proddatur.',
    },
    {
      id: 'faq-custom',
      q: 'Can I share a photo from WhatsApp, Pinterest, or the internet for custom work?',
      a: 'Yes, absolutely. Many of our customers share photos or sketches of gates, grills, or furniture they liked. We inspect the design, recommend suitable gauge thickness, and build it to your exact opening dimensions.',
    },
    {
      id: 'faq-quote',
      q: 'How do I get an initial cost estimate?',
      a: 'Simply send approximate measurements (height × width) or a photo on WhatsApp, or call Abdul Sattar directly. We will provide an initial quote and schedule an on-site inspection if needed.',
    },
  ];

  // State for interactive Lightbox in Step 2 (Proof)
  const [activeModalProject, setActiveModalProject] = useState<GalleryProject | null>(null);

  // State for interactive FAQ accordion in Step 6
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-measurements', 'faq-pricing']);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // State for Step 7: Conversion quick project selector
  const [selectedProjectType, setSelectedProjectType] = useState<string>('Steel Gate');
  const projectTypes = ['Steel Gate', 'Window Grill', 'Staircase Railing', 'School Furniture', 'Welding Repair', 'Custom Metalwork'];

  return (
    <>
      <PageSeo
        title="Mashallah Welding Works | Custom Iron Fabrication & Welding in Proddatur"
        description="Custom iron fabrication, electric arc welding, and on-site repair works in Auto Nagar, Proddatur by Abdul Sattar. Heavy-gauge iron gates, window safety grills, staircase railings, and custom metalwork."
      />

      {/* ========================================================================= */}
      {/* 1. HERO (OFFER) */}
      {/* ========================================================================= */}
      <Hero />

      {/* ========================================================================= */}
      {/* 2. PROOF (SHOW WORK EARLY - REAL PROJECTS BEFORE BUSINESS DETAILS) */}
      {/* ========================================================================= */}
      <section
        id="proof-gallery"
        className="py-16 sm:py-20 bg-dark-bg text-[#F5F3EE] border-b border-dark-border"
        aria-labelledby="proof-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gunmetal border border-dark-border text-copper text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Visual Proof & Finished Projects</span>
              </div>
              <h2
                id="proof-heading"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
              >
                Real Fabrication Work in <span className="text-copper">Proddatur</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-text leading-relaxed">
                Genuine custom iron gates, window safety grills, staircase railings, and school furniture built with solid steel and anti-rust primer in our Auto Nagar workshop.
              </p>
            </div>
            <Link
              to="/our-work"
              className="inline-flex items-center space-x-2 text-copper hover:text-copper-hover font-bold text-sm group shrink-0"
            >
              <span>Explore All Projects Gallery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 6 Real Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gunmetal rounded-2xl overflow-hidden border border-dark-border hover:border-copper/60 transition-all duration-200 shadow-sm flex flex-col group"
              >
                {/* Clickable Image Container */}
                <button
                  type="button"
                  onClick={() => setActiveModalProject(project)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-black text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
                  aria-label={`Enlarge photo of ${project.title}`}
                >
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
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-dark-bg/90 backdrop-blur-xs text-copper text-[11px] font-bold px-2.5 py-1 rounded-md border border-dark-border">
                    {project.categoryLabel || project.category.replace(/-/g, ' ')}
                  </div>
                  {/* Enlarge overlay icon */}
                  <div className="absolute bottom-3 right-3 p-2 rounded-lg bg-dark-bg/85 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4 text-copper" />
                  </div>
                </button>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-copper transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-text line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    {project.specifications && (
                      <p className="text-[11px] text-stone-400 truncate">
                        <span className="font-semibold text-stone-300">Spec:</span> {project.specifications}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-3 border-t border-dark-border flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalProject(project)}
                      className="text-xs text-stone-300 hover:text-white font-medium inline-flex items-center cursor-pointer"
                    >
                      <span>View details</span>
                    </button>
                    <a
                      href={generateWhatsAppUrl(
                        `Hello Mashallah Welding Works, I saw this project on your website: "${project.title}". Can you give me an estimate for something similar?`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 mr-1.5" />
                      <span>Quote</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View Full Gallery CTA */}
          <div className="mt-10 text-center">
            <Link
              to="/our-work"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-sm shadow-xs transition-colors"
            >
              <span>View Complete Portfolio & All 12+ Projects</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Photo Inspection */}
      <ProjectLightbox
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />

      {/* ========================================================================= */}
      {/* 3. SERVICES (SIMPLIFIED, CONCISE, SCANNABLE) */}
      {/* ========================================================================= */}
      <section
        id="services-preview"
        className="py-16 sm:py-20 bg-light-bg text-dark-text border-b border-light-border"
        aria-labelledby="services-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-stone-200/80 border border-light-border text-stone-700 text-xs font-bold uppercase tracking-wider">
                <span>Core Capabilities</span>
              </div>
              <h2
                id="services-heading"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-text"
              >
                Fabrication & Welding Services
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Concise breakdown of what we manufacture and repair in Auto Nagar, Proddatur. Tap any service for an instant quote.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 text-copper hover:text-copper-hover font-bold text-sm group shrink-0"
            >
              <span>View All 11 Services & Full Specs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Scannable Cards Grid (Name + Short Description + Action) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homepageServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl p-6 border border-light-border hover:border-copper/70 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-light-bg text-copper border border-light-border flex items-center justify-center group-hover:bg-copper group-hover:text-white transition-colors shrink-0">
                        <Icon className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-stone-100 text-stone-600 border border-light-border">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-dark-text group-hover:text-copper transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-stone-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Clean Action Row */}
                  <div className="pt-5 mt-4 border-t border-light-border flex items-center justify-between">
                    <Link
                      to="/services"
                      className="text-xs font-semibold text-stone-600 hover:text-copper transition-colors"
                    >
                      Specifications →
                    </Link>
                    <a
                      href={generateWhatsAppUrl(service.whatsappMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 mr-1" />
                      <span>Get Quote</span>
                    </a>
                  </div>
                </div>
              );
            })}
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

      {/* ========================================================================= */}
      {/* 4. TRUST (WHY CHOOSE US / PRACTICAL SIGNALS & PROPRIETOR EXPERTISE) */}
      {/* ========================================================================= */}
      <section
        id="trust-section"
        className="py-16 sm:py-20 bg-dark-bg text-[#F5F3EE] border-b border-dark-border"
        aria-labelledby="trust-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-14">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gunmetal border border-dark-border text-copper text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              <span>Practical Trust Signals</span>
            </div>
            <h2
              id="trust-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
            >
              Why Proddatur Chooses <span className="text-copper">Mashallah Welding Works</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-text leading-relaxed">
              No hollow promises. Honest metal fabrication backed by heavy-gauge steel, clean weld penetration, and direct craftsmanship by Abdul Sattar.
            </p>
          </div>

          {/* Trust Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {trustSignals.map((item, index) => (
              <div
                key={index}
                className="bg-gunmetal rounded-2xl p-6 border border-dark-border hover:border-copper/70 transition-all flex flex-col group shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-steel text-copper border border-dark-border flex items-center justify-center mb-4 group-hover:bg-copper group-hover:text-white transition-colors shrink-0">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-copper transition-colors">
                  {item.title}
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Master Welder Spotlight Card */}
          <div className="bg-steel/50 rounded-2xl p-6 sm:p-8 border border-dark-border shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
              <div className="w-14 h-14 rounded-2xl bg-copper text-white flex items-center justify-center font-extrabold text-xl shrink-0 shadow-sm">
                AS
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-copper block">
                  Proprietor & Lead Fabricator
                </span>
                <h4 className="text-xl font-bold text-white">{BUSINESS_INFO.proprietor}</h4>
                <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
                  “Every gate, grill, and railing leaving our Auto Nagar workshop is welded with structural discipline to protect your home or business for years to come.”
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gunmetal hover:bg-steel text-stone-200 border border-dark-border font-semibold text-xs sm:text-sm transition-colors"
              >
                <span>Read Our Craftsmanship Story</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
              <a
                href={BUSINESS_INFO.phoneTel}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
              >
                <Phone className="w-4 h-4 mr-1.5" />
                <span>Call Abdul Sattar</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BUSINESS INFO (LOCATION, HOURS & MAP MOVED LOWER) */}
      {/* ========================================================================= */}
      <section
        id="business-info"
        className="py-16 sm:py-20 bg-light-bg text-dark-text border-b border-light-border"
        aria-labelledby="business-info-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-stone-200/80 border border-light-border text-stone-700 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-copper" />
              <span>Workshop Details</span>
            </div>
            <h2
              id="business-info-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-text"
            >
              Workshop Location & Business Hours
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Conveniently located in Auto Nagar, Proddatur with open space for vehicle loading and on-site consultations.
            </p>
          </div>

          {/* 3 Detail Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Workshop Location */}
            <div className="bg-white rounded-2xl p-6 border border-light-border shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-light-bg text-copper border border-light-border flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-xs text-stone-500 block uppercase tracking-wider font-semibold">
                  Workshop Address
                </span>
                <p className="font-bold text-dark-text text-base leading-snug">
                  11/276, MG, Lakshmi Nagar, Auto Nagar
                </p>
                <p className="text-xs text-stone-600">
                  Proddatur, Kadapa District, Andhra Pradesh 516360
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-light-border">
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-bold text-copper hover:text-copper-hover"
                >
                  <Navigation className="w-3.5 h-3.5 mr-1" />
                  <span>Open in Google Maps →</span>
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl p-6 border border-light-border shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-light-bg text-copper border border-light-border flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  {/* Live Status indicator */}
                  <span
                    className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full ${
                      hoursStatus.isOpen
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-copper/15 text-copper border border-copper/30'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        hoursStatus.isOpen ? 'bg-emerald-600' : 'bg-copper'
                      }`}
                    />
                    {hoursStatus.statusText}
                  </span>
                </div>
                <span className="text-xs text-stone-500 block uppercase tracking-wider font-semibold">
                  Operational Timings
                </span>
                <p className="font-bold text-dark-text text-sm">
                  Mon – Sat: <span className="font-semibold text-stone-700">{BUSINESS_INFO.hours.monSat}</span>
                </p>
                <p className="font-bold text-dark-text text-sm">
                  Sunday: <span className="font-semibold text-stone-700">{BUSINESS_INFO.hours.sunday}</span>
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-light-border text-xs text-stone-500">
                On-site measurement visits available upon appointment.
              </div>
            </div>

            {/* Direct Contact */}
            <div className="bg-white rounded-2xl p-6 border border-light-border shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-light-bg text-copper border border-light-border flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-xs text-stone-500 block uppercase tracking-wider font-semibold">
                  Proprietor & Master Fabricator
                </span>
                <p className="font-bold text-dark-text text-base">
                  {BUSINESS_INFO.proprietor}
                </p>
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="text-base text-copper hover:text-copper-hover font-extrabold block transition-colors"
                >
                  {BUSINESS_INFO.phoneFormatted}
                </a>
              </div>
              <div className="pt-4 mt-3 border-t border-light-border flex items-center justify-between">
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="text-xs font-bold text-stone-700 hover:text-copper transition-colors"
                >
                  Call Directly
                </a>
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 mr-1" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Embedded Google Map Component */}
          <WorkshopMap />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FAQ (OBJECTION HANDLING NEAR BOTTOM) */}
      {/* ========================================================================= */}
      <section
        id="faq-section"
        className="py-16 sm:py-20 bg-dark-bg text-[#F5F3EE] border-b border-dark-border"
        aria-labelledby="faq-home-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10 sm:mb-12">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gunmetal border border-dark-border text-copper text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questions & Answers</span>
            </div>
            <h2
              id="faq-home-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
            >
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-muted-text leading-relaxed">
              Everything you need to know about our fabrication pricing, measurements, anti-rust protection, and repairs in Proddatur.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3" role="region" aria-label="Frequently Asked Questions">
            {objectionFaqs.map((faq) => {
              const isOpen = openFaqIds.includes(faq.id);
              const qId = `home-faq-q-${faq.id}`;
              const aId = `home-faq-a-${faq.id}`;

              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-all duration-200 bg-gunmetal overflow-hidden ${
                    isOpen
                      ? 'border-copper ring-1 ring-copper/40 shadow-md'
                      : 'border-dark-border hover:border-steel'
                  }`}
                >
                  <h3>
                    <button
                      id={qId}
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={aId}
                      className="w-full flex items-center justify-between text-left px-5 sm:px-6 py-4 text-white hover:text-copper transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer"
                    >
                      <span className="font-bold text-sm sm:text-base pr-4 leading-snug">
                        {faq.q}
                      </span>
                      <span
                        className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 ${
                          isOpen ? 'bg-copper text-white rotate-180' : 'bg-steel text-stone-300'
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>
                  </h3>

                  {isOpen && (
                    <div
                      id={aId}
                      role="region"
                      aria-labelledby={qId}
                      className="px-5 sm:px-6 pb-4 pt-1 text-stone-300 text-xs sm:text-sm leading-relaxed border-t border-dark-border bg-steel/30"
                    >
                      <p>{faq.a}</p>
                      <div className="mt-3 pt-2 border-t border-dark-border/60 flex items-center justify-end">
                        <a
                          href={generateWhatsAppUrl(
                            `Hello Mashallah Welding Works, regarding this FAQ: "${faq.q}", I have a question.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                        >
                          <WhatsAppIcon className="w-3 h-3 mr-1" />
                          <span>Ask about this on WhatsApp →</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm text-copper hover:text-copper-hover font-bold"
            >
              <span>Have more questions? View our complete FAQ directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CONVERSION (STRONG WHATSAPP-FOCUSED FINAL CTA) */}
      {/* ========================================================================= */}
      <section
        id="conversion-cta"
        className="py-16 sm:py-20 bg-gunmetal text-[#F5F3EE] border-b border-dark-border"
        aria-labelledby="conversion-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-steel/60 rounded-3xl p-8 sm:p-12 border border-dark-border shadow-2xl">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/50 border border-emerald-800 px-3.5 py-1.5 rounded-full">
                <WhatsAppIcon className="w-4 h-4 mr-2" />
                Direct Workshop Quotation
              </span>

              <h2
                id="conversion-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
              >
                Ready to Start Your Iron Fabrication Project?
              </h2>

              <p className="text-muted-text text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                Send your measurements, reference design, or repair query directly to master welder Abdul Sattar on WhatsApp for quick, transparent pricing and on-site scheduling in Proddatur.
              </p>

              {/* Quick Preset Selector for One-Tap WhatsApp */}
              <div className="pt-2">
                <span className="block text-xs uppercase font-semibold text-stone-400 mb-2">
                  Select Project Type to Pre-fill Message:
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedProjectType(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        selectedProjectType === type
                          ? 'bg-copper text-white shadow-xs font-bold'
                          : 'bg-dark-bg text-stone-300 hover:text-white border border-dark-border'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary & Secondary Actions: WhatsApp Quote is Primary, Call is Secondary */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                {/* Primary CTA: WhatsApp Quote */}
                <a
                  id="final-cta-whatsapp"
                  href={generateWhatsAppUrl(
                    `Hello Mashallah Welding Works, I would like to get a quote for a ${selectedProjectType} in Proddatur.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-xl shadow-emerald-950/50 transition-all duration-150 active:scale-[0.98] cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 mr-2.5 shrink-0" />
                  <span>Get WhatsApp Quote ({selectedProjectType})</span>
                </a>

                {/* Secondary CTA: Call Directly */}
                <a
                  id="final-cta-call"
                  href={BUSINESS_INFO.phoneTel}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-base transition-all duration-150 shadow-xs active:scale-[0.98]"
                >
                  <Phone className="w-5 h-5 mr-2 stroke-[2.2] shrink-0" />
                  <span>Call {BUSINESS_INFO.phoneFormatted}</span>
                </a>
              </div>

              {/* Reassurance Footer */}
              <div className="pt-6 border-t border-dark-border/80 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-stone-400">
                <span>✓ On-Site Measurements in Proddatur</span>
                <span>✓ Direct Master Fabricator (No Middlemen)</span>
                <span>✓ Red Oxide Anti-Rust Primer Treated</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
