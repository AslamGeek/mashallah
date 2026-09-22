import React, { useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
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

  // Resolve original photo source URL
  const fullPhotoUrl = getFullResolutionImageUrl(project.imageUrl);
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
        className="relative flex flex-col w-full max-w-2xl lg:max-w-3xl max-h-[92vh] max-h-[92dvh] bg-[#181B1E] border border-stone-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden mx-auto"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Bar: Minimal, image position and large obvious Close button only */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 border-b border-stone-800 bg-[#141619] shrink-0 z-10">
          <div>
            {hasMultiple ? (
              <span className="text-xs sm:text-sm font-semibold text-stone-300 tracking-wider">
                {currentIndex + 1} / {items.length}
              </span>
            ) : (
              <span />
            )}
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Photo Viewport: Generous responsive height, object-contain, clean navigation */}
        <div className="relative w-full h-[60vh] sm:h-[68vh] md:h-[72vh] max-h-[700px] bg-black/95 flex items-center justify-center p-2 sm:p-4 select-none shrink-0 overflow-hidden">
          <img
            key={project.id}
            src={fullPhotoUrl}
            alt={project.imageAlt || project.title}
            className="w-full h-full object-contain rounded-md select-none"
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

          {/* Previous Photo Button */}
          {hasPrev && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Next Photo Button */}
          {hasNext && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper z-10"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}
        </div>

        {/* Clean Photo Viewer Footer: Title & Actions Only (No category badges) */}
        <div className="px-4 sm:px-6 py-3 sm:py-3.5 bg-[#181B1E] border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-3 text-left shrink-0">
          <div className="max-w-md w-full">
            <h2
              id="lightbox-project-title"
              className="text-sm sm:text-base font-bold text-white truncate"
            >
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <a
              href={fullPhotoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3.5 py-2 rounded-xl bg-steel/80 hover:bg-steel text-stone-200 hover:text-white font-semibold text-xs border border-dark-border transition-colors min-h-[44px] whitespace-nowrap"
            >
              <ExternalLink className="w-4 h-4 mr-1.5 text-copper shrink-0" />
              <span>Full Photo</span>
            </a>

            <a
              href={generateWhatsAppUrl(whatsappText)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors min-h-[44px] whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4 mr-1.5 shrink-0" />
              <span>WhatsApp Quote</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
