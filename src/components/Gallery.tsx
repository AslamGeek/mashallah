import React, { useState } from 'react';
import { Maximize2, X, ExternalLink, Tag } from 'lucide-react';
import { GALLERY_ITEMS, generateWhatsAppUrl } from '../data/content';
import { GalleryProject } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<GalleryProject | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'gates', label: 'Gates' },
    { id: 'grills', label: 'Grills' },
    { id: 'railings', label: 'Railings' },
    { id: 'doors', label: 'Doors' },
    { id: 'stands', label: 'Stands' },
    { id: 'repairs', label: 'Repair Works' },
    { id: 'custom', label: 'Custom Fabrication' },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const openLightbox = (project: GalleryProject) => {
    setActiveModalProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveModalProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className="py-20 bg-stone-100 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <span>Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
            Our Work & Fabrication Gallery
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            A showcase of recently completed iron gates, window safety grills, architectural railings, and heavy custom fittings. Tap any project to enlarge.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-200/90 border border-stone-300/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((project: GalleryProject) => (
            <div
              key={project.id}
              id={`gallery-card-${project.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col group"
            >
              {/* Image Container with Hover Overlay */}
              <div
                className="relative aspect-[4/3] bg-stone-950 overflow-hidden cursor-pointer"
                onClick={() => openLightbox(project)}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center px-3.5 py-2 rounded-lg bg-stone-900/90 text-amber-400 font-semibold text-xs backdrop-blur-sm border border-stone-700 shadow-md">
                    <Maximize2 className="w-4 h-4 mr-1.5" />
                    Enlarge Photo
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-sm text-stone-200 text-xs font-semibold border border-stone-700/60">
                    <Tag className="w-3 h-3 mr-1 text-amber-400" />
                    {project.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3
                  onClick={() => openLightbox(project)}
                  className="font-bold text-stone-900 text-lg mb-2 group-hover:text-amber-600 transition-colors cursor-pointer"
                >
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 mb-4 flex-grow">
                  {project.description}
                </p>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium truncate max-w-[170px] sm:max-w-[200px]">
                    {project.specifications}
                  </span>
                  <a
                    href={generateWhatsAppUrl(`Hello, I saw "${project.title}" in your gallery. Can you provide an estimate for a similar requirement?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-bold shrink-0 ml-2"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 mr-1" />
                    Enquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Zoom Modal */}
        {activeModalProject && (
          <div
            id="gallery-lightbox-modal"
            className="fixed inset-0 z-60 bg-stone-950/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
            onClick={closeLightbox}
          >
            <div
              className="bg-stone-900 text-stone-100 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-stone-800 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-800/90 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors focus:outline-none"
                aria-label="Close project view"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Large Project Image */}
                <div className="md:col-span-7 bg-black flex items-center justify-center p-2 sm:p-4">
                  <img
                    src={activeModalProject.imageUrl}
                    alt={activeModalProject.title}
                    className="max-h-[60vh] md:max-h-[75vh] w-auto object-contain rounded-lg"
                  />
                </div>

                {/* Details Sidebar */}
                <div className="md:col-span-5 p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="inline-block px-3 py-1 rounded-md bg-stone-800 text-amber-400 font-semibold text-xs uppercase tracking-wider">
                      {activeModalProject.categoryLabel}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {activeModalProject.title}
                    </h3>
                    <p className="text-sm text-stone-300 leading-relaxed">
                      {activeModalProject.description}
                    </p>

                    <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700/60">
                      <span className="block text-xs uppercase font-bold text-amber-400 mb-1">
                        Technical Specifications:
                      </span>
                      <p className="text-xs text-stone-300">
                        {activeModalProject.specifications}
                      </p>
                    </div>

                    <div className="text-xs text-stone-400 space-y-1">
                      <p>• Workshop: Auto Nagar, Proddatur, AP</p>
                      <p>• Custom sizing & on-site installation provided</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-stone-800 space-y-2.5 mt-6">
                    <a
                      href={generateWhatsAppUrl(
                        `Hello Mashallah Welding Works, I like this project: "${activeModalProject.title}". Please share approximate cost and details.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors"
                    >
                      <WhatsAppIcon className="w-4 h-4 mr-2" />
                      Enquire for This Design on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={closeLightbox}
                      className="w-full py-2.5 text-center text-xs font-semibold text-stone-400 hover:text-white transition-colors"
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
