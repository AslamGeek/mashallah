import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Maximize2, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { GALLERY_ITEMS, GALLERY_CATEGORIES, generateWhatsAppUrl } from '../data/content';
import { GalleryProject } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ProjectLightbox } from './ProjectLightbox';

interface GalleryProps {
  className?: string;
}

export const Gallery: React.FC<GalleryProps> = ({ className = 'py-20' }) => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryCategory = searchParams.get('category') || categorySlug;
  const initialCategory =
    queryCategory &&
    (queryCategory === 'all' || GALLERY_CATEGORIES.some((c) => c.slug === queryCategory))
      ? queryCategory
      : 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [activeModalProject, setActiveModalProject] = useState<GalleryProject | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  // State for expanded detailed card view
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

  // Synchronize category state when URL route param or query string changes
  useEffect(() => {
    if (queryCategory && (queryCategory === 'all' || GALLERY_CATEGORIES.some((c) => c.slug === queryCategory))) {
      setSelectedCategory(queryCategory);
    }
  }, [queryCategory]);

  const activeCategoryConfig = GALLERY_CATEGORIES.find((c) => c.slug === selectedCategory);

  const categoryTabs = [
    { slug: 'all', label: 'All Projects' },
    ...GALLERY_CATEGORIES,
  ];

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    if (categorySlug) {
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

  return (
    <section id="gallery" className={`${className} bg-light-bg text-dark-text border-b border-light-border`}>
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

        {/* Category Description Banner (if present and specific category selected) */}
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
                href={generateWhatsAppUrl(`Hello Mashallah Welding Works, I would like to enquire about custom ${activeCategoryConfig?.label || 'fabrication'}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs sm:text-sm hover:bg-emerald-500 transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 mr-1.5" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        ) : (
          /* Projects Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((project: GalleryProject) => {
              const isExpanded = !!expandedProjectIds[project.id];
              return (
                <article
                  key={project.id}
                  id={`gallery-card-${project.id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-light-border shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group"
                >
                  {/* Image Container: Opens photo viewer only */}
                  <button
                    type="button"
                    id={`gallery-item-${project.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(project, e);
                    }}
                    className="relative aspect-[4/3] bg-black overflow-hidden w-full block cursor-pointer group/img focus:outline-none focus-visible:ring-2 focus-visible:ring-copper text-left"
                    aria-haspopup="dialog"
                    aria-label={`View photo of ${project.title}`}
                  >
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
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (project.imageUrl.includes('window-safety-grill') && !target.src.endsWith('.jpg')) {
                              target.src = '/images/window-safety-grill-s-curve-design-proddatur-1.jpg';
                            }
                          }}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                        />
                      </picture>
                    ) : (
                      <img
                        src={project.imageUrl}
                        alt={project.imageAlt || project.title}
                        width={1200}
                        height={900}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                      />
                    )}
                  </button>

                  {/* Card Meta Content */}
                  <div className="p-5 pb-2 flex flex-col flex-grow w-full">
                    <div className="text-xs font-semibold text-copper mb-1.5 uppercase tracking-wider">
                      {project.categoryLabel}
                    </div>

                    {/* Card Title: Clickable to expand/open detailed card view, comfortable 44px+ touch area */}
                    <button
                      type="button"
                      onClick={(e) => toggleProjectDetails(project.id, e)}
                      aria-expanded={isExpanded}
                      className="w-full text-left py-1 min-h-[44px] flex items-center justify-between group/title cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-lg mb-1"
                      aria-label={`${project.title} - ${isExpanded ? 'Hide details' : 'View full details'}`}
                    >
                      <span className="font-bold text-dark-text text-lg group-hover/title:text-copper transition-colors leading-snug">
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
                      <div className="space-y-3 mb-3 flex-grow text-left pt-1">
                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                          {project.description}
                        </p>
                        {project.specifications && (
                          <div className="p-3 rounded-xl bg-stone-50 border border-light-border space-y-1 text-xs">
                            <span className="font-bold text-copper block uppercase tracking-wider text-[10px]">
                              Detailed Specifications
                            </span>
                            <p className="text-stone-800 font-medium leading-relaxed">
                              {project.specifications}
                            </p>
                          </div>
                        )}
                        <div className="text-[11px] text-stone-500 flex items-center space-x-1.5 pt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-copper shrink-0" />
                          <span>Fabricated at Auto Nagar, Proddatur workshop</span>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-2 flex-grow">
                        <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 mb-2">
                          {project.description}
                        </p>
                        {project.specifications && (
                          <p className="text-stone-500 font-medium text-xs truncate">
                            <span className="font-semibold text-stone-700">Spec:</span> {project.specifications}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Actions: View Photo, View Details, WhatsApp Quote */}
                  <div className="px-5 pb-5 pt-2 flex flex-col justify-end space-y-2.5">
                    <div className="pt-2.5 border-t border-light-border/60 grid grid-cols-2 gap-2">
                      {/* View Photo button: opens photo viewer only */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(project, e);
                        }}
                        className="inline-flex items-center justify-center px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-dark-text font-semibold text-xs border border-stone-300 transition-colors min-h-[44px] whitespace-nowrap cursor-pointer"
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
                            : 'bg-white hover:bg-stone-50 text-dark-text border-stone-300'
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
                      href={generateWhatsAppUrl(`Hello, I saw "${project.title}" in your gallery. Can you provide an estimate for a similar requirement?`)}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors min-h-[44px] whitespace-nowrap"
                    >
                      <WhatsAppIcon className="w-4 h-4 mr-1.5 shrink-0" />
                      <span>WhatsApp Quote</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Portfolio Project Lightbox Viewer with Full Resolution Option and Scroll Protection */}
        <ProjectLightbox
          project={activeModalProject}
          items={filteredItems}
          onClose={closeLightbox}
          onNavigate={(item) => setActiveModalProject(item as GalleryProject)}
        />
      </div>
    </section>
  );
};
