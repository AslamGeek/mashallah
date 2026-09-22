import React, { useState, useRef } from 'react';
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
  Sparkles,
  ExternalLink,
  Maximize2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Navigation,
  School,
  Hammer,
} from 'lucide-react';
import { PageSeo } from '../components/PageSeo';
import { Hero } from '../components/Hero';
import { WorkshopMap } from '../components/WorkshopMap';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import {
  BUSINESS_INFO,
  SERVICES_LIST,
  GALLERY_ITEMS,
  getBusinessHoursStatus,
  generateWhatsAppUrl,
} from '../data/content';
import { GalleryProject } from '../types';
import { ProjectLightbox } from '../components/ProjectLightbox';
import { ProjectShareButton } from '../components/ProjectShareButton';

export const HomePage: React.FC = () => {
  const hoursStatus = getBusinessHoursStatus();

  // Step 2: Proof - Feature top 6 real fabrication projects
  const featuredProjects = GALLERY_ITEMS.slice(0, 6);

  // State for Project Lightbox modal (Photo Viewer)
  const [activeModalProject, setActiveModalProject] = useState<GalleryProject | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  // State for detailed card view expansion
  const [expandedProjectIds, setExpandedProjectIds] = useState<Record<string, boolean>>({});
  const [expandedServiceIds, setExpandedServiceIds] = useState<Record<string, boolean>>({});

  const toggleProjectDetails = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpandedProjectIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleServiceDetails = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpandedServiceIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openLightbox = (project: GalleryProject, e?: React.MouseEvent) => {
    e?.stopPropagation();
    lastTriggerRef.current = (e?.currentTarget as HTMLElement) || (document.activeElement as HTMLElement) || null;
    setActiveModalProject(project);
  };

  const closeLightbox = () => {
    setActiveModalProject(null);
    if (lastTriggerRef.current) {
      lastTriggerRef.current.focus({ preventScroll: true });
    }
  };

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

  // Step 4: FAQ items for objection handling
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
      a: 'Simply send approximate measurements (height × width) or a photo on WhatsApp, or call us directly. Lead fabricator Karimulla C. will provide an initial quote and schedule an on-site inspection if needed.',
    },
  ];

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
        description="Custom iron fabrication, electric arc welding, and on-site repair works in Auto Nagar, Proddatur. Heavy-gauge iron gates, window safety grills, staircase railings, and custom metalwork by Mashallah Welding Works."
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
        className="py-16 sm:py-20 bg-warm-tint text-dark-text border-b border-light-border"
        aria-labelledby="proof-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div className="max-w-2xl space-y-3">
              <h2
                id="proof-heading"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-text"
              >
                Real Fabrication Work in <span className="text-copper">Proddatur</span>
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
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
            {featuredProjects.map((project) => {
              const isExpanded = !!expandedProjectIds[project.id];
              return (
                <div
                  key={project.id}
                  id={`gallery-card-${project.id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-light-border hover:border-copper/70 transition-all duration-200 shadow-xs flex flex-col group"
                >
                  {/* Clickable Image Container: Opens Photo Viewer only */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(project, e);
                    }}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-black text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper block group/img"
                    aria-haspopup="dialog"
                    aria-label={`View photo of ${project.title}`}
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.imageAlt || project.title}
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (project.imageUrl.includes('window-safety-grill') && !target.src.endsWith('.jpg')) {
                          target.src = '/images/window-safety-grill-s-curve-design-proddatur-1.jpg';
                        }
                      }}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                    />
                  </button>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs font-semibold text-copper uppercase tracking-wider">
                          {project.categoryLabel || project.category.replace(/-/g, ' ')}
                        </div>
                        <ProjectShareButton project={project} />
                      </div>

                      {/* Card Title: Clickable to expand/open detailed card view, comfortable 44px+ touch area */}
                      <button
                        type="button"
                        onClick={(e) => toggleProjectDetails(project.id, e)}
                        aria-expanded={isExpanded}
                        className="w-full text-left py-1 min-h-[44px] flex items-center justify-between group/title cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-lg"
                        aria-label={`${project.title} - ${isExpanded ? 'Hide details' : 'View full details'}`}
                      >
                        <span className="text-base sm:text-lg font-bold text-dark-text group-hover/title:text-copper transition-colors leading-snug">
                          {project.title}
                        </span>
                        <span className="ml-2 p-1 text-stone-400 group-hover/title:text-copper transition-colors shrink-0">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-copper" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </span>
                      </button>

                      {/* Detailed or Summary View */}
                      {isExpanded ? (
                        <div className="space-y-3 pt-1 text-left">
                          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                            {project.description}
                          </p>
                          {project.specifications && (
                            <div className="p-3 rounded-xl bg-stone-50 border border-light-border space-y-1 text-xs">
                              <span className="font-bold text-copper block uppercase tracking-wider text-[10px]">
                                Detailed Specifications
                              </span>
                              <p className="text-stone-700 font-medium leading-relaxed">
                                {project.specifications}
                              </p>
                            </div>
                          )}
                          <div className="text-[11px] text-stone-500 flex items-center space-x-1.5 pt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-copper shrink-0" />
                            <span>Auto Nagar, Proddatur workshop fabrication</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>
                          {project.specifications && (
                            <p className="text-[11px] text-stone-500 truncate">
                              <span className="font-semibold text-stone-700">Spec:</span> {project.specifications}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions: View Photo, View Details, WhatsApp Quote */}
                    <div className="pt-3 border-t border-light-border space-y-2.5">
                      <div className="grid grid-cols-2 gap-2">
                        {/* View Photo button: opens photo viewer only */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openLightbox(project, e);
                          }}
                          className="inline-flex items-center justify-center px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs border border-light-border transition-colors min-h-[44px] whitespace-nowrap cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5 mr-1.5 text-copper shrink-0" />
                          <span>View Photo</span>
                        </button>

                        {/* View Details button: expands/collapses detailed card view */}
                        <button
                          type="button"
                          onClick={(e) => toggleProjectDetails(project.id, e)}
                          className={`inline-flex items-center justify-center px-3 py-2 rounded-xl font-semibold text-xs border transition-colors min-h-[44px] whitespace-nowrap cursor-pointer ${
                            isExpanded
                              ? 'bg-copper text-white border-copper'
                              : 'bg-white hover:bg-stone-50 text-stone-700 border-light-border'
                          }`}
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-3.5 h-3.5 mr-1 text-white shrink-0" />
                              <span>Hide Details</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3.5 h-3.5 mr-1 text-copper shrink-0" />
                              <span>View Details</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* WhatsApp Quote: Performs only WhatsApp action */}
                      <a
                        href={generateWhatsAppUrl(
                          `Hello Mashallah Welding Works, I saw this project on your website: "${project.title}". Can you give me an estimate for something similar?`
                        )}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors min-h-[44px] whitespace-nowrap"
                      >
                        <WhatsAppIcon className="w-4 h-4 mr-1.5 shrink-0" />
                        <span>WhatsApp Quote</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
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

      {/* Featured Project Lightbox Viewer with Full Resolution Option and Scroll Protection */}
      <ProjectLightbox
        project={activeModalProject}
        items={featuredProjects}
        onClose={closeLightbox}
        onNavigate={(item) => setActiveModalProject(item as GalleryProject)}
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
            <div className="max-w-2xl space-y-3">
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
              const isServiceExpanded = !!expandedServiceIds[service.id];
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

                    {/* Service Title Button: Clickable to expand/open details, min 44px hit target */}
                    <button
                      type="button"
                      onClick={(e) => toggleServiceDetails(service.id, e)}
                      aria-expanded={isServiceExpanded}
                      className="w-full text-left py-1 min-h-[44px] flex items-center justify-between group/title cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-lg"
                      aria-label={`${service.title} - ${isServiceExpanded ? 'Hide details' : 'View service details'}`}
                    >
                      <span className="text-lg sm:text-xl font-bold text-dark-text group-hover/title:text-copper transition-colors leading-snug">
                        {service.title}
                      </span>
                      <span className="ml-2 p-1 text-stone-400 group-hover/title:text-copper transition-colors shrink-0">
                        {isServiceExpanded ? (
                          <ChevronUp className="w-4 h-4 text-copper" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </span>
                    </button>

                    <p className="text-stone-600 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    {/* Expanded Detailed Information */}
                    {isServiceExpanded && (
                      <div className="pt-2 space-y-2 border-t border-light-border text-xs text-stone-600">
                        <div className="flex items-start space-x-2">
                          <span className="text-copper font-bold">•</span>
                          <span><strong>Material:</strong> Heavy-gauge mild steel crafted to custom site measurements.</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-copper font-bold">•</span>
                          <span><strong>Protection:</strong> Anti-rust red oxide primer + high-durability synthetic enamel coat.</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-copper font-bold">•</span>
                          <span><strong>Fabrication:</strong> Direct in Auto Nagar workshop with doorstep delivery & fitment in Proddatur.</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Clean Action Row */}
                  <div className="pt-5 mt-4 border-t border-light-border flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={(e) => toggleServiceDetails(service.id, e)}
                      className="text-xs font-semibold text-stone-600 hover:text-copper transition-colors whitespace-nowrap inline-flex items-center min-h-[36px] cursor-pointer"
                    >
                      {isServiceExpanded ? (
                        <>
                          <ChevronUp className="w-3.5 h-3.5 mr-1 text-copper shrink-0" />
                          <span>Hide Details</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3.5 h-3.5 mr-1 text-copper shrink-0" />
                          <span>View Details</span>
                        </>
                      )}
                    </button>
                    <a
                      href={generateWhatsAppUrl(service.whatsappMsg)}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap min-h-[36px]"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 mr-1 shrink-0" />
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
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-sm shadow-xs transition-colors"
            >
              <span>Explore All 11 Fabrication & Repair Services</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. BUSINESS INFO (LOCATION, HOURS & MAP MOVED LOWER) */}
      {/* ========================================================================= */}
      <section
        id="business-info"
        className="py-16 sm:py-20 bg-warm-tint text-dark-text border-b border-light-border"
        aria-labelledby="business-info-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
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
                <div className="w-10 h-10 rounded-xl bg-warm-tint text-copper border border-light-border flex items-center justify-center">
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
                  className="inline-flex items-center text-xs font-bold text-copper hover:text-copper-hover transition-colors whitespace-nowrap min-h-[36px]"
                >
                  <Navigation className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>Open in Google Maps →</span>
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl p-6 border border-light-border shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-warm-tint text-copper border border-light-border flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  {/* Live Status indicator */}
                  <span
                    className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                      hoursStatus.isOpen
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-copper/15 text-copper border border-copper/30'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 ${
                        hoursStatus.isOpen ? 'bg-emerald-600' : 'bg-copper'
                      }`}
                    />
                    {hoursStatus.statusText}
                  </span>
                </div>
                <span className="text-xs text-stone-500 block uppercase tracking-wider font-semibold">
                  Operational Timings
                </span>
                <div className="space-y-1">
                  <p className="font-bold text-dark-text text-sm whitespace-nowrap">
                    Mon – Sat: <span className="font-semibold text-stone-700 whitespace-nowrap">{BUSINESS_INFO.hours.monSat}</span>
                  </p>
                  <p className="font-bold text-dark-text text-sm whitespace-nowrap">
                    Sunday: <span className="font-semibold text-stone-700 whitespace-nowrap">{BUSINESS_INFO.hours.sunday}</span>
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-3 border-t border-light-border text-xs text-stone-500">
                On-site measurement visits available upon appointment.
              </div>
            </div>

            {/* Direct Contact */}
            <div className="bg-white rounded-2xl p-6 border border-light-border shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-warm-tint text-copper border border-light-border flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-xs text-stone-500 block uppercase tracking-wider font-semibold">
                  Customer Enquiries & Fabrication
                </span>
                <p className="font-bold text-dark-text text-base">
                  {BUSINESS_INFO.leadFabricator}
                </p>
                <span className="text-xs text-stone-600 block">
                  Lead Fabricator & On-Site Measurements
                </span>
                <span className="text-[11px] text-stone-400 block pt-1">
                  Proprietor: {BUSINESS_INFO.proprietor}
                </span>
              </div>
              <div className="pt-4 mt-3 border-t border-light-border flex items-center justify-between">
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="text-xs font-bold text-stone-700 hover:text-copper transition-colors whitespace-nowrap min-h-[36px] inline-flex items-center"
                >
                  Call Now
                </a>
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-800 whitespace-nowrap min-h-[36px]"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>WhatsApp Us</span>
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
        className="py-16 sm:py-20 bg-light-bg text-dark-text border-b border-light-border"
        aria-labelledby="faq-home-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10 sm:mb-12">
            <h2
              id="faq-home-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-text"
            >
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
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
                  className={`rounded-xl border transition-all duration-200 bg-white overflow-hidden ${
                    isOpen
                      ? 'border-copper ring-1 ring-copper/40 shadow-xs'
                      : 'border-light-border hover:border-stone-400'
                  }`}
                >
                  <h3>
                    <button
                      id={qId}
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={aId}
                      className="w-full flex items-center justify-between text-left px-5 sm:px-6 py-4 text-dark-text hover:text-copper transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer"
                    >
                      <span className="font-bold text-sm sm:text-base pr-4 leading-snug">
                        {faq.q}
                      </span>
                      <span
                        className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 ${
                          isOpen ? 'bg-copper text-white rotate-180' : 'bg-stone-100 text-stone-600'
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
                      className="px-5 sm:px-6 pb-4 pt-2 text-stone-700 text-xs sm:text-sm leading-relaxed border-t border-light-border bg-stone-50/70"
                    >
                      <p>{faq.a}</p>
                      <div className="mt-3 pt-2 border-t border-light-border flex items-center justify-end">
                        <a
                          href={generateWhatsAppUrl(
                            `Hello Mashallah Welding Works, regarding this FAQ: "${faq.q}", I have a question.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 mr-1" />
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
            <a
              href={generateWhatsAppUrl('Hello Mashallah Welding Works, I have a question about iron fabrication in Proddatur.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm text-copper hover:text-copper-hover font-bold"
            >
              <span>Have a question not listed here? Ask us directly on WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CONVERSION (STRONG WHATSAPP-FOCUSED DARK FINAL CTA) */}
      {/* ========================================================================= */}
      <section
        id="conversion-cta"
        className="py-16 sm:py-20 bg-dark-bg text-[#FAF8F5] border-b border-dark-border"
        aria-labelledby="conversion-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#22272C] rounded-3xl p-8 sm:p-12 border border-dark-border shadow-2xl">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h2
                id="conversion-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
              >
                Ready to Start Your Iron Fabrication Project?
              </h2>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                Send your measurements, reference design, or repair query directly to lead fabricator Karimulla C. on WhatsApp for quick, transparent pricing and on-site scheduling in Proddatur.
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
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer min-h-[40px] ${
                        selectedProjectType === type
                          ? 'bg-copper text-white shadow-xs font-bold'
                          : 'bg-[#181B1E] text-stone-300 hover:text-white border border-dark-border'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary & Secondary Actions: WhatsApp Quote is Primary, Call is Secondary */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                {/* Primary CTA: WhatsApp Us */}
                <a
                  id="final-cta-whatsapp"
                  href={generateWhatsAppUrl(
                    `Hello Mashallah Welding Works, I would like to get a quote for a ${selectedProjectType} in Proddatur.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-lg transition-all duration-150 active:scale-[0.98] cursor-pointer min-h-[48px]"
                >
                  <WhatsAppIcon className="w-5 h-5 mr-2.5 shrink-0" />
                  <span>WhatsApp Us ({selectedProjectType})</span>
                </a>

                {/* Secondary CTA: Call Now */}
                <a
                  id="final-cta-call"
                  href={BUSINESS_INFO.phoneTel}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-base transition-all duration-150 shadow-xs active:scale-[0.98] min-h-[48px]"
                >
                  <Phone className="w-5 h-5 mr-2 stroke-[2.2] shrink-0" />
                  <span>Call Now</span>
                </a>
              </div>

              {/* Reassurance Footer */}
              <div className="pt-6 border-t border-dark-border/80 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-stone-400">
                <span className="whitespace-nowrap">✓ On-Site Measurements in Proddatur</span>
                <span className="whitespace-nowrap">✓ Direct Workshop Team (No Middlemen)</span>
                <span className="whitespace-nowrap">✓ Red Oxide Anti-Rust Primer Treated</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
