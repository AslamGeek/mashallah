import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Maximize2, FileText } from 'lucide-react';
import { GALLERY_ITEMS, GALLERY_CATEGORIES, generateWhatsAppUrl } from '../data/content';
import { GalleryProject } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ProjectLightbox } from './ProjectLightbox';
import { ProjectShareButton } from './ProjectShareButton';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { findProjectBySlug, getProjectUrl } from '../data/projects';

interface GalleryProps {
  className?: string;
}

export const Gallery: React.FC<GalleryProps> = ({ className = 'py-20' }) => {
  const { categorySlug, projectSlug } = useParams<{ categorySlug?: string; projectSlug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Category determination
  const queryCategory = searchParams.get('category');
  const pathCategory = categorySlug && GALLERY_CATEGORIES.some((c) => c.slug === categorySlug) ? categorySlug : undefined;
  const initialCategory = queryCategory || pathCategory || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [activeLightboxProject, setActiveLightboxProject] = useState<GalleryProject | null>(null);
  const [activeDetailsProject, setActiveDetailsProject] = useState<GalleryProject | null>(null);
  const [highlightedProjectId, setHighlightedProjectId] = useState<string | null>(null);

  const lastTriggerRef = useRef<HTMLElement | null>(null);

  // Sync category state from URL query or path
  useEffect(() => {
    if (queryCategory && (queryCategory === 'all' || GALLERY_CATEGORIES.some((c) => c.slug === queryCategory))) {
      setSelectedCategory(queryCategory);
    } else if (pathCategory) {
      setSelectedCategory(pathCategory);
    }
  }, [queryCategory, pathCategory]);

  // Handle direct canonical project URL navigation (/portfolio/:projectSlug)
  useEffect(() => {
    if (projectSlug) {
      const matched = findProjectBySlug(projectSlug, GALLERY_ITEMS);
      if (matched) {
        setActiveDetailsProject(matched);
        setHighlightedProjectId(matched.id);
        // Ensure card is rendered in grid by showing all projects
        setSelectedCategory('all');
      }
    } else {
      // User navigated away or closed modal via browser back button
      setActiveDetailsProject(null);
    }
  }, [projectSlug]);

  const activeCategoryConfig = GALLERY_CATEGORIES.find((c) => c.slug === selectedCategory);

  const categoryTabs = [
    { slug: 'all', label: 'All Projects' },
    ...GALLERY_CATEGORIES,
  ];

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    if (categorySlug && GALLERY_CATEGORIES.some((c) => c.slug === categorySlug)) {
      if (slug === 'all') {
        navigate('/our-work', { replace: true });
      } else {
        navigate(`/our-work/${slug}`, { replace: true });
      }
    } else {
      if (slug === 'all') {
        setSearchParams({}, { replace: true });
      } else {
        setSearchParams({ category: slug }, { replace: true });
      }
    }
  };

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  // Action: Open Lightbox
  const openLightbox = useCallback((project: GalleryProject, e?: React.MouseEvent) => {
    e?.stopPropagation();
    lastTriggerRef.current = (e?.currentTarget as HTMLElement) || (document.activeElement as HTMLElement) || null;
    setActiveLightboxProject(project);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveLightboxProject(null);
    if (lastTriggerRef.current) {
      lastTriggerRef.current.focus({ preventScroll: true });
    }
  }, []);

  // Action: Open Project Details Modal (with stable URL synchronization)
  const openProjectDetails = useCallback((project: GalleryProject, e?: React.MouseEvent) => {
    e?.stopPropagation();
    lastTriggerRef.current = (e?.currentTarget as HTMLElement) || (document.activeElement as HTMLElement) || null;
    setActiveDetailsProject(project);
    setHighlightedProjectId(project.id);

    // Update URL to canonical project slug without full page reload
    const targetPath = `/portfolio/${project.id}`;
    if (location.pathname !== targetPath) {
      navigate(targetPath, {
        state: {
          fromGallery: true,
          returnTo: location.pathname + location.search,
        },
      });
    }
  }, [location.pathname, location.search, navigate]);

  // Action: Close Project Details Modal
  const closeProjectDetails = useCallback(() => {
    setActiveDetailsProject(null);

    // Return URL cleanly back to /our-work or origin page
    if (location.pathname.startsWith('/portfolio/')) {
      const returnTarget = (location.state as { returnTo?: string })?.returnTo || '/our-work';
      navigate(returnTarget, { replace: true });
    }

    if (lastTriggerRef.current) {
      lastTriggerRef.current.focus({ preventScroll: true });
    }
  }, [location.pathname, location.state, navigate]);

  // Navigate between projects in details modal
  const handleNavigateDetails = useCallback((direction: 'prev' | 'next') => {
    if (!activeDetailsProject) return;
    const currentIndex = filteredItems.findIndex((p) => p.id === activeDetailsProject.id);
    if (currentIndex === -1) return;

    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < filteredItems.length) {
      const nextProject = filteredItems[nextIndex];
      setActiveDetailsProject(nextProject);
      setHighlightedProjectId(nextProject.id);
      navigate(`/portfolio/${nextProject.id}`, { replace: true, state: location.state });
    }
  }, [activeDetailsProject, filteredItems, location.state, navigate]);

  const activeIndex = activeDetailsProject ? filteredItems.findIndex((p) => p.id === activeDetailsProject.id) : -1;
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex >= 0 && activeIndex < filteredItems.length - 1;

  return (
    <section id="gallery" className={`${className} bg-light-bg text-dark-text border-b border-light-border`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-text">
            Our Work & Fabrication Gallery
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            A showcase of recently completed iron gates, window safety grills, architectural railings, and heavy custom fittings.
          </p>
        </div>

        {/* Category Filters */}
        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8"
        >
          {categoryTabs.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => handleCategorySelect(cat.slug)}
                aria-pressed={isActive}
                className={`px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 ${
                  isActive
                    ? 'bg-copper text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:text-dark-text hover:bg-stone-100 border border-light-border'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Category Description Banner */}
        {activeCategoryConfig?.description && selectedCategory !== 'all' && (
          <div className="max-w-2xl mx-auto text-center -mt-3 mb-8 px-4">
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic bg-white/70 py-2 px-4 rounded-xl border border-light-border/80 shadow-2xs">
              {activeCategoryConfig.description}
            </p>
          </div>
        )}

        {/* Empty Category State */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-14 px-6 bg-white rounded-2xl border border-light-border max-w-lg mx-auto shadow-xs">
            <p className="text-dark-text font-bold text-lg mb-2">
              {activeCategoryConfig ? activeCategoryConfig.label : 'No projects in this category yet'}
            </p>
            {activeCategoryConfig?.description && (
              <p className="text-stone-600 text-sm mb-4 leading-relaxed max-w-md mx-auto">
                {activeCategoryConfig.description}
              </p>
            )}
            <p className="text-stone-500 text-xs mb-6">
              We fabricate custom units to order. Contact lead fabricator Karimulla C. for immediate requirements and quotation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handleCategorySelect('all')}
                className="inline-flex items-center px-4 py-2 rounded-xl bg-steel text-white font-semibold text-xs sm:text-sm hover:bg-gunmetal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
              >
                Show All Projects
              </button>
              <a
                href={generateWhatsAppUrl('Hello, I would like to ask about custom welding/fabrication work.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs sm:text-sm hover:bg-emerald-500 transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 mr-1.5" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          /* Consistent Project Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((project: GalleryProject, index: number) => {
              const isHighlighted = highlightedProjectId === project.id;
              const whatsappEnquiryUrl = generateWhatsAppUrl(
                `Hello, I would like to ask about this project: ${project.title}.`
              );

              return (
                <article
                  key={project.id}
                  id={`project-card-${project.id}`}
                  className={`bg-white rounded-2xl overflow-hidden border transition-all duration-200 flex flex-col h-full ${
                    isHighlighted
                      ? 'border-copper shadow-md ring-2 ring-copper/40'
                      : 'border-light-border shadow-xs hover:shadow-md'
                  }`}
                >
                  {/* 1. PHOTO: Consistent 4/3 ratio, tap opens lightbox, no random badges */}
                  <button
                    type="button"
                    onClick={(e) => openLightbox(project, e)}
                    className="relative aspect-[4/3] bg-stone-900 overflow-hidden w-full block cursor-pointer group/photo text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
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
                        alt={project.imageAlt || project.title}
                        width={480}
                        height={360}
                        referrerPolicy="no-referrer"
                        loading={index < 3 ? 'eager' : 'lazy'}
                        decoding="async"
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (project.imageUrl.includes('window-safety-grill') && !target.src.endsWith('.jpg')) {
                            target.src = '/images/window-safety-grill-s-curve-design-proddatur-1.jpg';
                          }
                        }}
                        className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-300"
                      />
                    </picture>
                  </button>

                  {/* Card Content: Title -> Short description -> Actions */}
                  <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                    <div className="space-y-2">
                      {/* 2. TITLE: Tapping opens project details */}
                      <button
                        type="button"
                        onClick={(e) => openProjectDetails(project, e)}
                        className="w-full text-left group/title cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-md block"
                        aria-label={`View details for ${project.title}`}
                      >
                        <h3 className="font-bold text-dark-text text-base sm:text-lg group-hover/title:text-copper transition-colors line-clamp-2 min-h-[3rem] leading-snug">
                          {project.title}
                        </h3>
                      </button>

                      {/* 3. SHORT DESCRIPTION: Consistent 2-line clamp, concise preview */}
                      <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 min-h-[2.5rem] leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* 4. ACTIONS: View Photo, View Details, Share, WhatsApp */}
                    <div className="space-y-2 pt-2 border-t border-light-border/80">
                      {/* Action Row 1: View Photo & View Details */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={(e) => openLightbox(project, e)}
                          className="inline-flex items-center justify-center px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-dark-text font-semibold text-xs border border-stone-300 transition-colors min-h-[44px] whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
                        >
                          <Maximize2 className="w-3.5 h-3.5 mr-1.5 text-copper shrink-0" />
                          <span>View Photo</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => openProjectDetails(project, e)}
                          className="inline-flex items-center justify-center px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors min-h-[44px] whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
                        >
                          <FileText className="w-3.5 h-3.5 mr-1.5 text-copper shrink-0" />
                          <span>View Details</span>
                        </button>
                      </div>

                      {/* Action Row 2: Share & WhatsApp */}
                      <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[100px_1fr] gap-2">
                        <ProjectShareButton project={project} />

                        <a
                          href={whatsappEnquiryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xs transition-colors min-h-[44px] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                        >
                          <WhatsAppIcon className="w-4 h-4 mr-1.5 shrink-0" />
                          <span>Ask About This Project</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Project Details Modal (opens on title click, View Details, or direct /portfolio/:slug link) */}
        <ProjectDetailsModal
          project={activeDetailsProject}
          isOpen={!!activeDetailsProject}
          onClose={closeProjectDetails}
          onOpenPhoto={(p) => {
            setActiveLightboxProject(p);
          }}
          onNavigate={handleNavigateDetails}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />

        {/* Portfolio Project Lightbox Viewer with Full Resolution Source and Zoom Controls */}
        <ProjectLightbox
          project={activeLightboxProject}
          items={filteredItems}
          onClose={closeLightbox}
          onNavigate={(item) => setActiveLightboxProject(item as GalleryProject)}
        />
      </div>
    </section>
  );
};
