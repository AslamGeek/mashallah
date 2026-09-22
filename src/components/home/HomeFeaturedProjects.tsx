import React, { useState, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GALLERY_ITEMS, generateWhatsAppUrl } from '../../data/content';
import { getProjectUrl } from '../../data/projects';
import { GalleryProject } from '../../types';
import { ProjectLightbox } from '../ProjectLightbox';
import { ProjectDetailsModal } from '../ProjectDetailsModal';
import { WhatsAppIcon } from '../WhatsAppIcon';

export const HomeFeaturedProjects: React.FC = () => {
  const featuredProjects = GALLERY_ITEMS.slice(0, 6);
  const navigate = useNavigate();
  const location = useLocation();

  // Local state for Project Details modal
  const [activeDetailsProject, setActiveDetailsProject] = useState<GalleryProject | null>(null);
  // Local state for Project Lightbox modal (Photo Viewer)
  const [activeLightboxProject, setActiveLightboxProject] = useState<GalleryProject | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const openProjectDetails = useCallback((project: GalleryProject, e?: React.MouseEvent) => {
    e?.stopPropagation();
    lastTriggerRef.current = (e?.currentTarget as HTMLElement) || (document.activeElement as HTMLElement) || null;
    setActiveDetailsProject(project);

    // Sync URL cleanly so browser back button works and shareable URL is reflected
    const targetPath = `/portfolio/${project.id}`;
    if (location.pathname !== targetPath) {
      navigate(targetPath, {
        state: {
          fromHome: true,
          returnTo: '/',
        },
      });
    }
  }, [location.pathname, navigate]);

  const closeProjectDetails = useCallback(() => {
    setActiveDetailsProject(null);
    if (location.pathname.startsWith('/portfolio/')) {
      const returnTarget = (location.state as { returnTo?: string })?.returnTo || '/';
      navigate(returnTarget, { replace: true });
    }
    if (lastTriggerRef.current) {
      lastTriggerRef.current.focus({ preventScroll: true });
    }
  }, [location.pathname, location.state, navigate]);

  const handleNavigateDetails = useCallback((direction: 'prev' | 'next') => {
    if (!activeDetailsProject) return;
    const currentIndex = featuredProjects.findIndex((p) => p.id === activeDetailsProject.id);
    if (currentIndex === -1) return;

    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < featuredProjects.length) {
      const nextProject = featuredProjects[nextIndex];
      setActiveDetailsProject(nextProject);
      navigate(`/portfolio/${nextProject.id}`, { replace: true, state: location.state });
    }
  }, [activeDetailsProject, featuredProjects, location.state, navigate]);

  const closeLightbox = useCallback(() => {
    setActiveLightboxProject(null);
    if (lastTriggerRef.current) {
      lastTriggerRef.current.focus({ preventScroll: true });
    }
  }, []);

  const activeIndex = activeDetailsProject ? featuredProjects.findIndex((p) => p.id === activeDetailsProject.id) : -1;
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex >= 0 && activeIndex < featuredProjects.length - 1;

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
            const projectWhatsAppUrl = generateWhatsAppUrl({
              type: 'project',
              projectName: project.title,
              projectSlug: project.id,
              projectUrl: getProjectUrl(project.id),
            });

            return (
              <div
                key={project.id}
                id={`gallery-card-${project.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-light-border hover:border-copper/70 transition-all duration-200 shadow-xs flex flex-col group"
              >
                {/* Clickable Image Container: Opens Project Detail View */}
                <button
                  type="button"
                  onClick={(e) => openProjectDetails(project, e)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-black text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper block group/img"
                  aria-haspopup="dialog"
                  aria-label={`View project details for ${project.title}`}
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

                    {/* Card Title: Clicking opens Project Detail View */}
                    <button
                      type="button"
                      onClick={(e) => openProjectDetails(project, e)}
                      className="w-full text-left py-0.5 group/title cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-lg block"
                      aria-label={`View details for ${project.title}`}
                    >
                      <h3 className="text-base sm:text-lg font-bold text-dark-text group-hover/title:text-copper transition-colors leading-snug line-clamp-2 min-h-[2.75rem] break-words">
                        {project.title}
                      </h3>
                    </button>

                    {/* Description preview */}
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 min-h-[2.5rem] leading-relaxed break-words">
                      {project.description}
                    </p>
                  </div>

                  {/* Actions: One clear, prominent enquiry CTA */}
                  <div className="pt-3 border-t border-light-border">
                    <a
                      href={projectWhatsAppUrl}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-2xs transition-colors min-h-[44px] active:scale-[0.98] text-center"
                    >
                      <WhatsAppIcon className="w-4 h-4 mr-2 shrink-0" />
                      <span>Get Quote for Similar Design</span>
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
            <span>View Complete Portfolio &amp; All 12+ Projects</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>

      {/* Project Details Modal (opens on image or title click) */}
      <ProjectDetailsModal
        project={activeDetailsProject}
        isOpen={!!activeDetailsProject}
        onClose={closeProjectDetails}
        onOpenPhoto={(p) => setActiveLightboxProject(p)}
        onNavigate={handleNavigateDetails}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />

      {/* Featured Project Lightbox Viewer (when opened from details modal) */}
      <ProjectLightbox
        project={activeLightboxProject}
        items={featuredProjects}
        onClose={closeLightbox}
        onNavigate={(item) => setActiveLightboxProject(item as GalleryProject)}
      />
    </section>
  );
};
