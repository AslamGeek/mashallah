import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Maximize2, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { GALLERY_ITEMS, generateWhatsAppUrl } from '../../data/content';
import { GalleryProject } from '../../types';
import { ProjectLightbox } from '../ProjectLightbox';
import { ProjectShareButton } from '../ProjectShareButton';
import { WhatsAppIcon } from '../WhatsAppIcon';

export const HomeFeaturedProjects: React.FC = () => {
  const featuredProjects = GALLERY_ITEMS.slice(0, 6);

  // Local state for Project Lightbox modal (Photo Viewer)
  const [activeModalProject, setActiveModalProject] = useState<GalleryProject | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  // Local state for detailed card view expansion
  const [expandedProjectIds, setExpandedProjectIds] = useState<Record<string, boolean>>({});

  const toggleProjectDetails = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpandedProjectIds((prev) => ({
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

  return (
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
          {featuredProjects.map((project, index) => {
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
                  <picture className="w-full h-full block">
                    <source
                      type="image/webp"
                      srcSet={project.srcSetWebp || `${project.thumbnailUrl || project.imageUrl} 480w, ${project.mediumUrl || project.imageUrl} 768w`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <img
                      src={project.thumbnailUrl || project.imageUrl}
                      srcSet={project.srcSetWebp || `${project.thumbnailUrl || project.imageUrl} 480w, ${project.mediumUrl || project.imageUrl} 768w`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      alt={project.imageAlt || project.title}
                      width={480}
                      height={360}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : 'auto'}
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
                  </picture>
                </button>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-copper uppercase tracking-wider">
                      {project.categoryLabel || project.category.replace(/-/g, ' ')}
                    </div>

                    {/* Card Title */}
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

                  {/* Actions */}
                  <div className="pt-3 border-t border-light-border space-y-2.5">
                    <div className="grid grid-cols-2 gap-2">
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

                    <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[100px_1fr] gap-2">
                      <ProjectShareButton project={project} />

                      <a
                        href={generateWhatsAppUrl(
                          `Hello, I would like to ask about this project: ${project.title}.`
                        )}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xs transition-colors min-h-[44px] whitespace-nowrap"
                      >
                        <WhatsAppIcon className="w-4 h-4 mr-1.5 shrink-0" />
                        <span>Ask About This Project</span>
                      </a>
                    </div>
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

      {/* Featured Project Lightbox Viewer with Full Resolution Option and Scroll Protection */}
      <ProjectLightbox
        project={activeModalProject}
        items={featuredProjects}
        onClose={closeLightbox}
        onNavigate={(item) => setActiveModalProject(item as GalleryProject)}
      />
    </section>
  );
};
