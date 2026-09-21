import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X, Tag } from 'lucide-react';
import { GALLERY_ITEMS, GALLERY_CATEGORIES, generateWhatsAppUrl } from '../data/content';
import { GalleryProject } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<GalleryProject | null>(null);

  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const triggerRefs = useRef<Record<string, HTMLElement | null>>({});
  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const categoryTabs = [
    { slug: 'all', label: 'All Projects' },
    ...GALLERY_CATEGORIES,
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const openLightbox = (project: GalleryProject) => {
    lastTriggerRef.current = (document.activeElement as HTMLElement) || triggerRefs.current[project.id] || null;
    setActiveModalProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveModalProject(null);
    document.body.style.overflow = '';
    // Restore focus to the gallery item button that opened the modal
    if (lastTriggerRef.current) {
      lastTriggerRef.current.focus();
    }
  };

  // Move focus into the modal once opened
  useEffect(() => {
    if (activeModalProject) {
      const timer = requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
      return () => cancelAnimationFrame(timer);
    }
  }, [activeModalProject]);

  // Handle Escape key and focus trapping inside the modal dialog
  useEffect(() => {
    if (!activeModalProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
        return;
      }

      if (e.key === 'Tab' && modalContainerRef.current) {
        const focusable = modalContainerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalProject]);

  // Reset body overflow if component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <section id="gallery" className="py-20 bg-light-bg text-dark-text border-b border-light-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-stone-200/80 border border-light-border text-stone-700 text-xs font-bold uppercase tracking-wider">
            <span>Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-text">
            Our Work & Fabrication Gallery
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            A showcase of recently completed iron gates, window safety grills, architectural railings, and heavy custom fittings. Tap any project to enlarge.
          </p>
        </div>

        {/* Category Filters */}
        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-10"
        >
          {categoryTabs.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                aria-pressed={isActive}
                className={`px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 ${
                  isActive
                    ? 'bg-steel text-white shadow-xs'
                    : 'bg-white text-dark-text hover:bg-stone-200/90 border border-light-border'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Empty Category State */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-light-border max-w-md mx-auto shadow-xs">
            <p className="text-dark-text font-bold text-lg mb-1.5">No projects in this category yet</p>
            <p className="text-stone-600 text-sm mb-5">
              We fabricate custom units to order. Contact Abdul Sattar for immediate requirements.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="inline-flex items-center px-4 py-2 rounded-xl bg-steel text-white font-semibold text-xs sm:text-sm hover:bg-gunmetal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          /* Projects Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((project: GalleryProject, idx: number) => (
              <article
                key={project.id}
                id={`gallery-card-${project.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-light-border shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group"
              >
                {/* Keyboard-accessible trigger button wrapping the preview */}
                <button
                  type="button"
                  id={`gallery-item-${project.id}`}
                  ref={(el) => {
                    triggerRefs.current[project.id] = el;
                  }}
                  onClick={() => openLightbox(project)}
                  className="w-full text-left flex flex-col flex-grow cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 rounded-t-2xl"
                  aria-haspopup="dialog"
                  aria-label={`View enlarged photo and specifications for ${project.title}`}
                >
                  {/* Image Container with Hover Overlay */}
                  <div className="relative aspect-[4/3] bg-black overflow-hidden w-full">
                    {project.srcSetWebp ? (
                      <picture className="w-full h-full block">
                        <source
                          type="image/webp"
                          srcSet={project.srcSetWebp}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <img
                          src={project.imageUrl}
                          alt={project.imageAlt || project.title}
                          width={1200}
                          height={896}
                          referrerPolicy="no-referrer"
                          loading={idx < 2 ? 'eager' : 'lazy'}
                          decoding="async"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (project.imageUrl.includes('window-safety-grill') && !target.src.endsWith('.jpg')) {
                              target.src = '/images/projects/window-safety-grill-s-curve-design-proddatur-1.jpg';
                            }
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </picture>
                    ) : (
                      <img
                        src={project.imageUrl}
                        alt={project.imageAlt || project.title}
                        width={1200}
                        height={900}
                        referrerPolicy="no-referrer"
                        loading={idx < 2 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute inset-0 bg-dark-bg/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center px-3.5 py-2 rounded-lg bg-gunmetal/95 text-stone-100 font-semibold text-xs backdrop-blur-xs border border-dark-border shadow-xs">
                        <Maximize2 className="w-4 h-4 mr-1.5 text-copper" />
                        Enlarge Photo
                      </span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gunmetal/80 backdrop-blur-xs text-stone-200 text-xs font-semibold border border-dark-border/60">
                        <Tag className="w-3 h-3 mr-1 text-copper" />
                        {project.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Card Meta Content */}
                  <div className="p-5 pb-2 flex flex-col flex-grow w-full">
                    <h3 className="font-bold text-dark-text text-lg mb-2 group-hover:text-copper transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 mb-2 flex-grow">
                      {project.description}
                    </p>
                  </div>
                </button>

                {/* Card Footer with Technical Specifications and WhatsApp Enquire Link */}
                <div className="px-5 pb-5 pt-2 flex flex-col justify-end">
                  <div className="pt-3 border-t border-light-border/60 flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-medium truncate max-w-[170px] sm:max-w-[200px]">
                      {project.specifications}
                    </span>
                    <a
                      href={generateWhatsAppUrl(`Hello, I saw "${project.title}" in your gallery. Can you provide an estimate for a similar requirement?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-bold shrink-0 ml-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 mr-1" />
                      Enquire
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Lightbox Zoom Modal */}
        {activeModalProject && (
          <div
            id="gallery-lightbox-modal"
            className="fixed inset-0 z-60 bg-dark-bg/90 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
            onClick={closeLightbox}
          >
            <div
              ref={modalContainerRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="gallery-modal-title"
              tabIndex={-1}
              className="bg-gunmetal text-[#F5F3EE] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-dark-border shadow-2xl relative focus:outline-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-steel text-stone-300 hover:text-white hover:bg-dark-border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
                aria-label="Close project view"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Large Project Image */}
                <div className="md:col-span-7 bg-black flex items-center justify-center p-2 sm:p-4">
                  {activeModalProject.srcSetWebp ? (
                    <picture className="flex items-center justify-center">
                      <source
                        type="image/webp"
                        srcSet={activeModalProject.srcSetWebp}
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                      <img
                        src={activeModalProject.imageUrl}
                        alt={activeModalProject.imageAlt || activeModalProject.title}
                        width={1200}
                        height={896}
                        referrerPolicy="no-referrer"
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (activeModalProject.imageUrl.includes('window-safety-grill') && !target.src.endsWith('.jpg')) {
                            target.src = '/images/projects/window-safety-grill-s-curve-design-proddatur-1.jpg';
                          }
                        }}
                        className="max-h-[60vh] md:max-h-[75vh] w-auto object-contain rounded-lg"
                      />
                    </picture>
                  ) : (
                    <img
                      src={activeModalProject.imageUrl}
                      alt={activeModalProject.imageAlt || activeModalProject.title}
                      referrerPolicy="no-referrer"
                      className="max-h-[60vh] md:max-h-[75vh] w-auto object-contain rounded-lg"
                    />
                  )}
                </div>

                {/* Details Sidebar */}
                <div className="md:col-span-5 p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="inline-block px-3 py-1 rounded-md bg-steel text-copper border border-dark-border font-semibold text-xs uppercase tracking-wider">
                      {activeModalProject.categoryLabel}
                    </span>
                    <h3 id="gallery-modal-title" className="text-xl sm:text-2xl font-extrabold text-white">
                      {activeModalProject.title}
                    </h3>
                    <p className="text-sm text-stone-300 leading-relaxed">
                      {activeModalProject.description}
                    </p>

                    <div className="bg-steel/80 p-3.5 rounded-xl border border-dark-border">
                      <span className="block text-xs uppercase font-bold text-copper mb-1">
                        Technical Specifications:
                      </span>
                      <p className="text-xs text-stone-300">
                        {activeModalProject.specifications}
                      </p>
                    </div>

                    <div className="text-xs text-muted-text space-y-1">
                      <p>• Workshop: Auto Nagar, Proddatur, AP</p>
                      <p>• Custom sizing & on-site installation provided</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-dark-border space-y-2.5 mt-6">
                    <a
                      href={generateWhatsAppUrl(
                        `Hello Mashallah Welding Works, I like this project: "${activeModalProject.title}". Please share approximate cost and details.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      <WhatsAppIcon className="w-4 h-4 mr-2" />
                      Enquire for This Design on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={closeLightbox}
                      className="w-full py-2.5 text-center text-xs font-semibold text-muted-text hover:text-white transition-colors focus:outline-none focus-visible:underline"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
