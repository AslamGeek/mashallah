import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Wrench,
  Camera,
  ChevronRight,
  Shield,
  Layers,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { ServiceItem, GalleryProject } from '../types';
import { BUSINESS_INFO, GALLERY_ITEMS, SERVICES_LIST, generateWhatsAppUrl } from '../data/content';
import { getProjectUrl } from '../data/projects';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ConversionTrustPoints } from './ConversionTrustPoints';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { ProjectLightbox } from './ProjectLightbox';

interface ServiceLandingViewProps {
  service: ServiceItem;
}

export const ServiceLandingView: React.FC<ServiceLandingViewProps> = ({ service }) => {
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const [lightboxProject, setLightboxProject] = useState<GalleryProject | null>(null);

  const isRepair = service.id === 'iron-repair-works' || service.category === 'repair';

  // Dynamically surface relevant portfolio projects
  const relevantProjects = GALLERY_ITEMS.filter(
    (p) => p.category === service.projectCategorySlug
  ).slice(0, 6);

  // Cross-service navigation: exclude current service and show up to 4 major alternatives
  const otherServices = SERVICES_LIST.filter((s) => s.id !== service.id).slice(0, 4);

  // WhatsApp intent message
  const whatsappUrl = generateWhatsAppUrl({
    type: isRepair ? 'repair' : 'service',
    serviceName: service.title,
    details: service.title,
  });

  const ctaLabel = service.ctaText || (isRepair ? 'Send Repair Photo' : `Get ${service.title} Quote`);

  return (
    <div className="pt-24 pb-20 bg-light-bg text-dark-text min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-stone-500">
          <Link to="/" className="hover:text-dark-text transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <Link to="/services" className="hover:text-dark-text transition-colors">
            Services
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-dark-text font-semibold truncate">{service.title}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-light-border shadow-xs">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-copper/10 text-copper text-xs font-bold uppercase tracking-wider">
              <span>Fabrication & Repair in Proddatur</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-dark-text leading-[1.15]">
              {service.heroHeadline || `${service.title} in Proddatur`}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              {service.heroDescription || service.description}
            </p>

            {/* High-Intent CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base shadow-sm transition-all active:scale-[0.98] min-h-[48px] text-center"
              >
                <WhatsAppIcon className="w-5 h-5 mr-2 shrink-0" />
                <span>{ctaLabel}</span>
              </a>

              <a
                href={BUSINESS_INFO.phoneTel}
                className="inline-flex items-center justify-center px-6 py-3.5 sm:py-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-dark-text font-bold text-sm sm:text-base transition-colors min-h-[48px] text-center"
              >
                <Phone className="w-4 h-4 mr-2 text-copper shrink-0" />
                <span>Call Workshop</span>
              </a>
            </div>

            {/* Trust Points Subordinate to Hero CTAs */}
            <div className="pt-4 border-t border-stone-100">
              <ConversionTrustPoints
                variant="service"
                isRepair={isRepair}
                showLocation={true}
                showHours={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Common Options / Styles Section */}
      {service.commonOptions && service.commonOptions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-copper block mb-1">
                Options & Variations
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-text tracking-tight">
                {isRepair ? 'Common Repair Services' : `Common ${service.title} Types We Fabricate`}
              </h2>
              <p className="text-sm text-stone-600 mt-1">
                Choose from these standard formats or share any custom design photo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.commonOptions.map((option, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-light-border shadow-2xs flex items-start space-x-3.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-dark-text">{option}</h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Available in mild steel with anti-rust coat and customized fittings.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Relevant Portfolio Work (Dynamically Surfaced from Existing CMS / Gallery Items) */}
      {relevantProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                  Real Workshop Work
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-text tracking-tight">
                  Recent {service.title} Work in Proddatur
                </h2>
                <p className="text-sm text-stone-600 mt-1">
                  Actual jobs fabricated and installed by Mashallah Welding Works.
                </p>
              </div>

              {service.projectCategorySlug && (
                <Link
                  to={`/our-work/${service.projectCategorySlug}`}
                  className="inline-flex items-center text-xs font-bold text-copper hover:text-copper-hover shrink-0 transition-colors"
                >
                  <span>View All in Portfolio</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relevantProjects.map((project) => {
                const projectQuoteUrl = generateWhatsAppUrl({
                  type: 'project',
                  projectName: project.title,
                  projectSlug: project.id,
                  projectUrl: getProjectUrl(project.id),
                });

                return (
                  <article
                    key={project.id}
                    className="bg-white rounded-2xl border border-light-border overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
                  >
                    {/* Project Photo - opens detail modal */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedProject(project)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedProject(project);
                        }
                      }}
                      className="relative aspect-4/3 bg-stone-100 overflow-hidden cursor-pointer group"
                    >
                      <img
                        src={project.thumbnailUrl || project.imageUrl}
                        alt={project.imageAlt || project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-lg bg-black/75 text-white text-xs font-semibold backdrop-blur-xs">
                          View Project Details
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3
                          onClick={() => setSelectedProject(project)}
                          className="text-base font-bold text-dark-text hover:text-copper transition-colors cursor-pointer"
                        >
                          {project.title}
                        </h3>
                        {project.specifications && (
                          <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                            {project.specifications}
                          </p>
                        )}
                      </div>

                      <div className="pt-2 border-t border-stone-100">
                        <a
                          href={projectQuoteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xs transition-colors min-h-[44px] text-center"
                        >
                          <WhatsAppIcon className="w-4 h-4 mr-1.5 shrink-0" />
                          <span>Get Quote for Similar Design</span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* What Affects the Quote? (Transparent Factors) */}
      {service.quoteFactors && service.quoteFactors.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-light-border shadow-2xs space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-copper block mb-1">
                Transparent Pricing Factors
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-text tracking-tight">
                What Affects the Quote for {service.title}?
              </h2>
              <p className="text-sm text-stone-600 mt-1 max-w-2xl">
                Because all our steel work is custom-built to your dimensions and choice of gauge, pricing varies based on:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.quoteFactors.map((factor, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-stone-50 border border-light-border flex items-start space-x-3"
                >
                  <div className="w-6 h-6 rounded-full bg-copper/15 text-copper flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-dark-text">{factor}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-warm-tint/50 border border-copper/20 flex items-start space-x-3 text-xs text-stone-700">
              <Shield className="w-4 h-4 text-copper shrink-0 mt-0.5" />
              <span>
                <strong>No Surprise Charges:</strong> We provide a full quotation after checking your photo, rough measurements, or free on-site visit before beginning fabrication.
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 4-Step Simple Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
              Easy Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-text tracking-tight">
              How Getting {service.title} Works
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              From your initial WhatsApp message to clean doorstep installation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-light-border shadow-2xs space-y-2">
              <span className="text-xs font-extrabold text-copper bg-copper/10 px-2 py-0.5 rounded">Step 1</span>
              <h3 className="text-sm font-bold text-dark-text">Send Design or Photo</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Share your reference picture or rough sizes directly on WhatsApp.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-light-border shadow-2xs space-y-2">
              <span className="text-xs font-extrabold text-copper bg-copper/10 px-2 py-0.5 rounded">Step 2</span>
              <h3 className="text-sm font-bold text-dark-text">Site Measurement</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                We visit your site in Proddatur for exact opening and anchor measurements.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-light-border shadow-2xs space-y-2">
              <span className="text-xs font-extrabold text-copper bg-copper/10 px-2 py-0.5 rounded">Step 3</span>
              <h3 className="text-sm font-bold text-dark-text">Clear Quotation</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                We confirm gauge thickness, primer paint, and full upfront price.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-light-border shadow-2xs space-y-2">
              <span className="text-xs font-extrabold text-copper bg-copper/10 px-2 py-0.5 rounded">Step 4</span>
              <h3 className="text-sm font-bold text-dark-text">Fabrication & Fitting</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Welded in our Auto Nagar workshop and installed securely at your location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* High-Converting Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#22272C] rounded-3xl p-6 sm:p-12 border border-dark-border text-white text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Ready to Discuss Your {service.title}?
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Send a photo of your idea, request a measurement visit in Proddatur, or speak directly with our fabrication team.
            </p>

            <ConversionTrustPoints
              className="pt-2 text-left sm:text-left"
              variant="service"
              isRepair={isRepair}
              showLocation={true}
              theme="dark"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 w-full lg:w-auto shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md transition-all active:scale-[0.98] min-h-[48px] text-center"
            >
              <WhatsAppIcon className="w-5 h-5 mr-2 shrink-0" />
              <span>{ctaLabel}</span>
            </a>

            <a
              href={BUSINESS_INFO.phoneTel}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-sm shadow-xs transition-colors min-h-[48px] text-center"
            >
              <Phone className="w-4 h-4 mr-2 shrink-0" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </section>

      {/* Cross-Service Navigation */}
      {otherServices.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-200/80">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-dark-text">Looking for something else?</h2>
              <Link to="/services" className="text-xs font-bold text-copper hover:text-copper-hover">
                View All Services →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {otherServices.map((other) => (
                <Link
                  key={other.id}
                  to={`/services/${other.id}`}
                  className="p-3.5 rounded-xl bg-white border border-light-border hover:border-copper/40 hover:shadow-xs transition-all flex items-center justify-between text-xs font-bold text-dark-text group"
                >
                  <span className="truncate">{other.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-copper group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenPhoto={(p) => setLightboxProject(p)}
        />
      )}

      {/* Project Lightbox for Full-Screen Viewing */}
      {lightboxProject && (
        <ProjectLightbox
          project={lightboxProject}
          onClose={() => setLightboxProject(null)}
        />
      )}
    </div>
  );
};
