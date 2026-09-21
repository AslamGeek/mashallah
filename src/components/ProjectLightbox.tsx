import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { GalleryProject } from '../types';
import { generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';

export interface LightboxMediaItem {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt?: string;
  srcSetWebp?: string;
  categoryLabel?: string;
  description?: string;
  specifications?: string;
  location?: string;
  whatsappMessage?: string;
}

export interface ProjectLightboxProps {
  project: LightboxMediaItem | GalleryProject | null;
  items?: (LightboxMediaItem | GalleryProject)[];
  onClose: () => void;
  onNavigate?: (item: LightboxMediaItem | GalleryProject) => void;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({
  project,
  items,
  onClose,
  onNavigate,
}) => {
  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Determine current active item and index in items list if provided
  const currentIndex = items && project
    ? items.findIndex((item) => item.id === project.id)
    : -1;

  const hasMultiple = items && items.length > 1 && currentIndex !== -1;
  const hasPrev = hasMultiple && currentIndex > 0;
  const hasNext = hasMultiple && currentIndex < items.length - 1;

  const goToPrev = useCallback(() => {
    if (!hasPrev || !items) return;
    const prevItem = items[currentIndex - 1];
    if (onNavigate) {
      onNavigate(prevItem);
    }
  }, [hasPrev, items, currentIndex, onNavigate]);

  const goToNext = useCallback(() => {
    if (!hasNext || !items) return;
    const nextItem = items[currentIndex + 1];
    if (onNavigate) {
      onNavigate(nextItem);
    }
  }, [hasNext, items, currentIndex, onNavigate]);

  // Safe Close that works cleanly with browser history
  const handleClose = useCallback(() => {
    if (window.history.state?.imageModalOpen) {
      window.history.back();
    } else {
      onClose();
    }
  }, [onClose]);

  // Handle Browser / Mobile Hardware Back Button
  useEffect(() => {
    if (!project) return;

    // Push a state entry to history so pressing Android Back button closes the modal
    window.history.pushState({ imageModalOpen: true }, '');

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [project !== null, onClose]);

  // Preserve scroll position and lock background scrolling
  useEffect(() => {
    if (project) {
      const scrollY = window.scrollY;
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalWidth = document.body.style.width;

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      const timer = requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        window.scrollTo(0, scrollY);
        cancelAnimationFrame(timer);
      };
    }
  }, [project !== null]);

  // Keyboard navigation: Escape to close, Left/Right arrow to navigate
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
        return;
      }

      // Focus trap
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
  }, [project, handleClose, goToPrev, goToNext]);

  // Touch swipe support for mobile users
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Minimum swipe threshold of 45px and predominantly horizontal
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      if (deltaX > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!project) return null;

  const whatsappMsg =
    project.whatsappMessage ||
    `Hello Mashallah Welding Works, I like this project: "${project.title}". Please share approximate cost and details.`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-project-title"
      className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/92 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={modalContainerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gunmetal border border-dark-border rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[96vh] sm:max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col text-left"
      >
        {/* Top Control Bar (Mobile-friendly, high contrast) */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3 bg-dark-bg/95 backdrop-blur-md border-b border-dark-border">
          <div className="flex items-center space-x-2 text-xs text-stone-300">
            {hasMultiple ? (
              <span className="font-bold text-copper bg-steel/80 px-2.5 py-1 rounded-md border border-dark-border">
                Photo {currentIndex + 1} of {items!.length}
              </span>
            ) : (
              <span className="font-bold text-copper bg-steel/80 px-2.5 py-1 rounded-md border border-dark-border">
                {project.categoryLabel || 'Fabrication Photo'}
              </span>
            )}
            <span className="hidden sm:inline text-stone-400 text-[11px]">
              {hasMultiple ? 'Swipe left/right or use buttons' : 'Auto Nagar, Proddatur'}
            </span>
          </div>

          {/* Prominent High-Contrast Close Button with Text */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="Close photo view"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-steel hover:bg-dark-border text-white border border-stone-600 hover:border-copper font-bold text-xs sm:text-sm shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer min-h-[42px]"
          >
            <X className="w-4 h-4 text-copper stroke-[2.5]" />
            <span>Close</span>
          </button>
        </div>

        {/* Main Image Stage (Large display) */}
        <div className="relative bg-black flex items-center justify-center p-2 sm:p-4 min-h-[260px] sm:min-h-[340px] md:min-h-[420px] select-none">
          {project.srcSetWebp ? (
            <picture className="flex items-center justify-center w-full">
              <source
                type="image/webp"
                srcSet={project.srcSetWebp}
                sizes="(max-width: 768px) 100vw, 900px"
              />
              <img
                src={project.imageUrl}
                alt={project.imageAlt || project.title}
                width={1200}
                height={900}
                referrerPolicy="no-referrer"
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (project.imageUrl.includes('window-safety-grill') && !target.src.endsWith('.jpg')) {
                    target.src = '/images/window-safety-grill-s-curve-design-proddatur-1.jpg';
                  }
                }}
                className="max-h-[58vh] sm:max-h-[66vh] md:max-h-[72vh] w-auto max-w-full object-contain rounded-lg"
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
              className="max-h-[58vh] sm:max-h-[66vh] md:max-h-[72vh] w-auto max-w-full object-contain rounded-lg"
            />
          )}

          {/* Large Floating Prev/Next Buttons (Desktop and Tablet) */}
          {hasPrev && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              aria-label="Previous photo"
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-dark-bg/85 hover:bg-dark-bg text-white border border-dark-border items-center justify-center shadow-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
            </button>
          )}

          {hasNext && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Next photo"
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-dark-bg/85 hover:bg-dark-bg text-white border border-dark-border items-center justify-center shadow-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.2]" />
            </button>
          )}
        </div>

        {/* Mobile Navigation Bar (Always visible on mobile when multiple items exist) */}
        {hasMultiple && (
          <div className="sm:hidden flex items-center justify-between px-3 py-2 bg-dark-bg border-y border-dark-border text-xs">
            <button
              type="button"
              disabled={!hasPrev}
              onClick={goToPrev}
              className={`inline-flex items-center px-3 py-2 rounded-lg font-bold min-h-[44px] ${
                hasPrev
                  ? 'bg-steel text-white active:bg-dark-border'
                  : 'bg-steel/30 text-stone-500 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              <span>Prev</span>
            </button>

            <span className="font-semibold text-stone-300">
              {currentIndex + 1} / {items!.length}
            </span>

            <button
              type="button"
              disabled={!hasNext}
              onClick={goToNext}
              className={`inline-flex items-center px-3 py-2 rounded-lg font-bold min-h-[44px] ${
                hasNext
                  ? 'bg-steel text-white active:bg-dark-border'
                  : 'bg-steel/30 text-stone-500 cursor-not-allowed'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}

        {/* Details & Action Panel */}
        <div className="p-4 sm:p-6 bg-gunmetal space-y-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block px-2.5 py-1 rounded-md bg-steel text-copper border border-dark-border font-bold text-xs uppercase tracking-wider">
                {project.categoryLabel || 'Custom Metalwork'}
              </span>
              <span className="inline-flex items-center text-xs text-stone-400">
                <MapPin className="w-3.5 h-3.5 text-copper mr-1" />
                {project.location || 'Auto Nagar, Proddatur'}
              </span>
            </div>

            <h3 id="lightbox-project-title" className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              {project.title}
            </h3>

            {project.description && (
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {project.description}
              </p>
            )}

            {project.specifications && (
              <div className="bg-steel/80 p-3 rounded-xl border border-dark-border text-xs">
                <span className="block font-bold text-copper mb-1">
                  Specifications & Work Details:
                </span>
                <p className="text-stone-300 leading-relaxed">
                  {project.specifications}
                </p>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-3 border-t border-dark-border flex flex-col sm:flex-row gap-3">
            <a
              href={generateWhatsAppUrl(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md transition-all active:scale-[0.98] min-h-[48px]"
            >
              <WhatsAppIcon className="w-4 h-4 mr-2 shrink-0" />
              <span>WhatsApp Us for This Design</span>
            </a>

            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center justify-center py-3 px-4 rounded-xl bg-steel hover:bg-dark-border text-stone-200 hover:text-white font-bold text-xs sm:text-sm border border-stone-600 transition-colors cursor-pointer min-h-[44px]"
            >
              <X className="w-4 h-4 mr-1.5" />
              <span>Close View</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

