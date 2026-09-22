import React, { useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, MapPin } from 'lucide-react';
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

  // Format specifications into clean items if bullet points are used
  const specItems = project.specifications
    ? project.specifications
        .split('•')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

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
        className="relative flex flex-col w-full max-w-2xl lg:max-w-3xl max-h-[92vh] max-h-[92dvh] bg-gunmetal border border-dark-border rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden mx-auto"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Bar: Minimal, image position and large obvious Close button only */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 border-b border-dark-border bg-dark-bg shrink-0 z-10">
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
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-steel/60 hover:bg-steel text-stone-200 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Image Section: Consistent responsive height, object-contain, no jumping or content overlap */}
        <div className="relative w-full h-[36vh] sm:h-[42vh] md:h-[46vh] max-h-[420px] bg-black/95 flex items-center justify-center p-2 sm:p-4 select-none shrink-0 overflow-hidden">
          <img
            key={project.id}
            src={fullPhotoUrl}
            alt={project.imageAlt || project.title}
            className="w-full h-full object-contain rounded-md shadow-lg select-none"
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

        {/* Project Information: Category -> Title -> Description -> Specifications -> Actions */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5 bg-gunmetal space-y-3 text-left">
          {/* 1. Category — small & subtle */}
          {project.categoryLabel && (
            <div>
              <span className="text-xs font-semibold text-copper tracking-wide uppercase">
                {project.categoryLabel}
              </span>
            </div>
          )}

          {/* 2. Project Title */}
          <h2
            id="lightbox-project-title"
            className="text-lg sm:text-xl font-bold text-white leading-snug break-words"
          >
            {project.title}
          </h2>

          {/* 3. Full Description — wraps naturally without truncation */}
          {project.description && (
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed break-words">
              {project.description}
            </p>
          )}

          {/* 4. Specifications / Details — formatted cleanly without cutoff */}
          {project.specifications && (
            <div className="pt-1 space-y-1.5">
              <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                Details
              </h3>
              {specItems.length > 1 ? (
                <ul className="space-y-1 text-xs sm:text-sm text-stone-300">
                  {specItems.map((spec, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-copper mr-2 select-none shrink-0" aria-hidden="true">•</span>
                      <span className="leading-relaxed break-words">{spec}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed break-words">
                  {project.specifications}
                </p>
              )}
            </div>
          )}

          {/* Location details if available */}
          {project.location && (
            <p className="text-xs text-stone-400 flex items-center pt-0.5">
              <MapPin className="w-3.5 h-3.5 text-copper mr-1.5 shrink-0" />
              <span>Location: {project.location}</span>
            </p>
          )}

          {/* 5. Actions: View Full Photo (secondary) & WhatsApp Quote (primary) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 sm:pt-4 border-t border-dark-border/80">
            <a
              href={fullPhotoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-steel/80 hover:bg-steel text-stone-200 hover:text-white font-semibold text-xs sm:text-sm border border-dark-border transition-colors min-h-[48px] text-center"
            >
              <ExternalLink className="w-4 h-4 mr-2 text-copper shrink-0" />
              <span>View Full Photo</span>
            </a>

            <a
              href={generateWhatsAppUrl(whatsappText)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-colors min-h-[48px] text-center flex-1 sm:flex-initial"
            >
              <WhatsAppIcon className="w-4 h-4 mr-2 shrink-0" />
              <span>WhatsApp Quote</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
