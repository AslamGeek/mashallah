import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { GalleryProject } from '../types';
import { generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';

export interface ProjectLightboxProps {
  project: GalleryProject | null;
  onClose: () => void;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({ project, onClose }) => {
  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      const timer = requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
      return () => {
        document.body.style.overflow = '';
        cancelAnimationFrame(timer);
      };
    }
  }, [project]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
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
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={modalContainerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gunmetal border border-dark-border rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col text-left"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close modal dialog"
          className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-dark-bg/80 text-stone-300 hover:text-white hover:bg-dark-bg border border-dark-border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden rounded-2xl">
          {/* Main Image Display */}
          <div className="md:col-span-7 bg-black flex items-center justify-center p-3 sm:p-4 min-h-[260px] md:min-h-[420px]">
            {project.srcSetWebp ? (
              <picture>
                <source
                  type="image/webp"
                  srcSet={project.srcSetWebp}
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                <img
                  src={project.imageUrl}
                  alt={project.imageAlt || project.title}
                  width={1200}
                  height={896}
                  referrerPolicy="no-referrer"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (project.imageUrl.includes('window-safety-grill') && !target.src.endsWith('.jpg')) {
                      target.src = '/images/window-safety-grill-s-curve-design-proddatur-1.jpg';
                    }
                  }}
                  className="max-h-[55vh] md:max-h-[70vh] w-auto object-contain rounded-lg"
                />
              </picture>
            ) : (
              <img
                src={project.imageUrl}
                alt={project.imageAlt || project.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (project.imageUrl.includes('window-safety-grill') && !target.src.endsWith('.jpg')) {
                    target.src = '/images/window-safety-grill-s-curve-design-proddatur-1.jpg';
                  }
                }}
                className="max-h-[55vh] md:max-h-[70vh] w-auto object-contain rounded-lg"
              />
            )}
          </div>

          {/* Details Column */}
          <div className="md:col-span-5 p-5 sm:p-6 flex flex-col justify-between bg-gunmetal">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-md bg-steel text-copper border border-dark-border font-semibold text-xs uppercase tracking-wider">
                {project.categoryLabel}
              </span>
              <h3 id="lightbox-project-title" className="text-xl sm:text-2xl font-extrabold text-white">
                {project.title}
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                {project.description}
              </p>

              {project.specifications && (
                <div className="bg-steel/80 p-3.5 rounded-xl border border-dark-border">
                  <span className="block text-xs uppercase font-bold text-copper mb-1">
                    Technical Specifications:
                  </span>
                  <p className="text-xs text-stone-300">
                    {project.specifications}
                  </p>
                </div>
              )}

              <div className="text-xs text-muted-text space-y-1">
                <p>• Workshop: Auto Nagar, Proddatur, AP</p>
                <p>• Custom sizing & on-site installation provided</p>
              </div>
            </div>

            <div className="pt-6 border-t border-dark-border space-y-2.5 mt-6">
              <a
                href={generateWhatsAppUrl(
                  `Hello Mashallah Welding Works, I like this project: "${project.title}". Please share approximate cost and details.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <WhatsAppIcon className="w-4 h-4 mr-2" />
                <span>Enquire for This Design on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-center text-xs font-semibold text-muted-text hover:text-white transition-colors focus:outline-none focus-visible:underline cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
