import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ExternalLink, Tag } from 'lucide-react';
import { GALLERY_ITEMS, GALLERY_CATEGORIES, generateWhatsAppUrl } from '../data/content';
import { GalleryProject } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

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
            A showcase of recently completed iron gates, window safety grills, architectural railings, and heavy custom fittings. Tap any photo to view in full resolution.
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
            {filteredItems.map((project: GalleryProject, idx: number) => (
              <article
                key={project.id}
                id={`gallery-card-${project.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-light-border shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group"
              >
                {/* Image Container with direct full-resolution link */}
                <a
                  href={project.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-[4/3] bg-black overflow-hidden w-full block cursor-pointer group/img focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
                  aria-label={`Open original full-resolution photo of ${project.title} in a new tab`}
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
                        loading={idx < 2 ? 'eager' : 'lazy'}
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
                      loading={idx < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-dark-bg/90 backdrop-blur-xs text-white border border-dark-border text-[11px] font-bold flex items-center space-x-1 shadow-md pointer-events-none whitespace-nowrap">
                    <ExternalLink className="w-3.5 h-3.5 text-copper shrink-0" />
                    <span>View full photo</span>
                  </div>
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gunmetal/85 backdrop-blur-xs text-stone-200 text-xs font-semibold border border-dark-border/60 whitespace-nowrap">
                      <Tag className="w-3 h-3 mr-1 text-copper shrink-0" />
                      {project.categoryLabel}
                    </span>
                  </div>
                </a>

                {/* Card Meta Content */}
                <div className="p-5 pb-2 flex flex-col flex-grow w-full">
                  <h3 className="font-bold text-dark-text text-lg mb-2 group-hover:text-copper transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 mb-2 flex-grow">
                    {project.description}
                  </p>
                </div>

                {/* Card Footer with Technical Specifications and Direct Action Buttons */}
                <div className="px-5 pb-5 pt-2 flex flex-col justify-end space-y-3">
                  <p className="text-stone-500 font-medium text-xs truncate">
                    <span className="font-semibold text-stone-700">Spec:</span> {project.specifications}
                  </p>
                  <div className="pt-2.5 border-t border-light-border/60 flex items-center justify-between gap-2">
                    <a
                      href={project.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-dark-text font-bold text-xs border border-stone-300 transition-colors min-h-[44px] whitespace-nowrap"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-copper shrink-0" />
                      <span>View Full Photo</span>
                    </a>
                    <a
                      href={generateWhatsAppUrl(`Hello, I saw "${project.title}" in your gallery. Can you provide an estimate for a similar requirement?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors min-h-[44px] whitespace-nowrap"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                      <span>WhatsApp Quote</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
