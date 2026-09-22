import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, Tag, MapPin, Maximize2 } from 'lucide-react';
import { generateWhatsAppUrl, getFullResolutionImageUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';

export interface LightboxMediaItem {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt?: string;
  categoryLabel?: string;
  description?: string;
  specifications?: string;
  location?: string;
  whatsappMessage?: string;
}

export interface ProjectLightboxProps {
  project: LightboxMediaItem | null;
  items?: LightboxMediaItem[];
  onClose: () => void;
  onNavigate?: (item: LightboxMediaItem) => void;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({
  project,
  items = [],
  onClose,
  onNavigate,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Compute current index and navigation availability
  const currentIndex = project && items.length > 0
    ? items.findIndex((i) => i.id === project.id)
    : -1;
  const hasMultiple = items.length > 1;
  const hasPrev = hasMultiple && currentIndex > 0;
  const hasNext = hasMultiple && currentIndex >= 0 && currentIndex < items.length - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev && onNavigate) {
      onNavigate(items[currentIndex - 1]);
    }
  }, [hasPrev, onNavigate, items, currentIndex]);

  const handleNext = useCallback(() => {
    if (hasNext && onNavigate) {
      onNavigate(items[currentIndex + 1]);
    }
  }, [hasNext, onNavigate, items, currentIndex]);

  // Lock scroll cleanly and handle keyboard events
  useEffect(() => {
    if (!project) return;

    // Record the exact scroll position before opening the modal
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Compensate for scrollbar removal to prevent layout shifts
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    // Focus close button initially with preventScroll
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus({ preventScroll: true });
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;

      // Restore exact scroll position instantly without any smooth-scroll animation
      window.scrollTo({
        top: scrollY,
        left: 0,
        behavior: 'instant' as ScrollBehavior,
      });
    };
  }, [project, handlePrev, handleNext, onClose]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartXRef.current;
    const diffY = touchEndY - touchStartYRef.current;

    touchStartXRef.current = null;
    touchStartYRef.current = null;

    // Horizontal swipe threshold: 50px, must be predominantly horizontal
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX > 0 && hasPrev) {
        handlePrev();
      } else if (diffX < 0 && hasNext) {
        handleNext();
      }
    }
  };

  if (!project) return null;

  // Resolve full resolution source image url
  const fullResolutionUrl = getFullResolutionImageUrl(project.imageUrl);
  const whatsappText = project.whatsappMessage ||
    `Hello Mashallah Welding Works, I saw "${project.title}" on your website and would like an estimate.`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-project-title"
      ref={dialogRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-2 sm:p-4 md:p-6 transition-opacity duration-200"
      onClick={(e) => {
        // Close if clicking outside the modal dialog box
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="relative flex flex-col w-full max-w-5xl max-h-[96vh] sm:max-h-[92vh] bg-gunmetal border border-dark-border rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-dark-border bg-dark-bg/95 z-10 shrink-0">
          <div className="flex items-center space-x-2.5 min-w-0 pr-2">
            {project.categoryLabel && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-steel/60 text-stone-200 text-xs font-semibold border border-dark-border/80 whitespace-nowrap shrink-0">
                <Tag className="w-3 h-3 mr-1 text-copper shrink-0" />
                {project.categoryLabel}
              </span>
            )}
            {hasMultiple && (
              <span className="text-xs text-stone-400 font-medium whitespace-nowrap">
                {currentIndex + 1} of {items.length}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {/* Direct Full-Resolution External Link in Header */}
            <a
              href={fullResolutionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-steel/80 hover:bg-steel text-stone-200 hover:text-white text-xs font-semibold border border-dark-border transition-colors min-h-[38px] whitespace-nowrap"
              title="Open full-resolution photo in a new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-copper shrink-0" />
              <span className="hidden sm:inline">View Full Resolution</span>
              <span className="sm:hidden">Full Res</span>
            </a>

            {/* Accessible Close Button */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-dark-border/60 hover:bg-dark-border text-stone-300 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
              aria-label="Close project viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Image Container: Constrained to viewport, object-contain, no overflow */}
        <div className="relative flex-1 min-h-0 flex items-center justify-center bg-black/95 p-2 sm:p-4 overflow-hidden select-none">
          <img
            key={project.id}
            src={fullResolutionUrl}
            alt={project.imageAlt || project.title}
            className="max-h-[50vh] sm:max-h-[58vh] lg:max-h-[64vh] max-w-full w-auto h-auto object-contain rounded-lg shadow-xl transition-transform duration-200"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (project.imageUrl.includes('window-safety-grill') && !target.src.endsWith('.jpg')) {
                target.src = '/images/window-safety-grill-s-curve-design-proddatur-1.jpg';
              }
            }}
          />

          {/* Previous Arrow Button */}
          {hasPrev && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-dark-bg/85 hover:bg-dark-bg text-white border border-dark-border flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper z-10"
              aria-label="Previous project photo"
            >
              <ChevronLeft className="w-6 h-6 text-stone-200" />
            </button>
          )}

          {/* Next Arrow Button */}
          {hasNext && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-dark-bg/85 hover:bg-dark-bg text-white border border-dark-border flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper z-10"
              aria-label="Next project photo"
            >
              <ChevronRight className="w-6 h-6 text-stone-200" />
            </button>
          )}
        </div>

        {/* Bottom Details Panel & Action Buttons */}
        <div className="bg-gunmetal px-4 sm:px-6 py-4 border-t border-dark-border shrink-0 overflow-y-auto max-h-[36vh] sm:max-h-[28vh]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1 min-w-0 pr-0 lg:pr-4">
              <h2
                id="lightbox-project-title"
                className="text-lg sm:text-xl font-bold text-white leading-tight"
              >
                {project.title}
              </h2>
              {project.description && (
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {project.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-400 pt-1">
                {project.specifications && (
                  <span className="truncate">
                    <strong className="text-stone-300 font-semibold">Spec:</strong> {project.specifications}
                  </span>
                )}
                {project.location && (
                  <span className="inline-flex items-center text-copper font-medium whitespace-nowrap">
                    <MapPin className="w-3 h-3 mr-1 shrink-0" />
                    {project.location}
                  </span>
                )}
              </div>
            </div>

            {/* Actions: View Full Resolution & WhatsApp Quote */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
              <a
                href={fullResolutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-steel hover:bg-steel/80 text-white font-bold text-xs sm:text-sm border border-dark-border transition-colors min-h-[44px] whitespace-nowrap"
              >
                <ExternalLink className="w-4 h-4 mr-2 text-copper shrink-0" />
                <span>View Full Resolution</span>
              </a>

              <a
                href={generateWhatsAppUrl(whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors min-h-[44px] whitespace-nowrap"
              >
                <WhatsAppIcon className="w-4 h-4 mr-2 shrink-0" />
                <span>WhatsApp Quote</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
