import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, Maximize2, MapPin, Check, ChevronLeft, ChevronRight, Wrench, ShieldCheck, Copy, Phone } from 'lucide-react';
import { GalleryProject } from '../types';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ProjectShareButton } from './ProjectShareButton';
import { getProjectUrl } from '../data/projects';

export interface ProjectDetailsModalProps {
  project: GalleryProject | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenPhoto: (project: GalleryProject) => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  isOpen,
  onClose,
  onOpenPhoto,
  onNavigate,
  hasPrev = false,
  hasNext = false,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [urlCopied, setUrlCopied] = useState(false);

  // Focus trap and keyboard navigation
  useEffect(() => {
    if (!isOpen || !project) return;

    // Compensate for scrollbar width to prevent page shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Auto focus close button
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft' && onNavigate && hasPrev) {
        e.preventDefault();
        onNavigate('prev');
      } else if (e.key === 'ArrowRight' && onNavigate && hasNext) {
        e.preventDefault();
        onNavigate('next');
      } else if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

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

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, project, onClose, onNavigate, hasPrev, hasNext]);

  const handleCopyUrl = useCallback(async () => {
    if (!project) return;
    const url = getProjectUrl(project.id);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const el = document.createElement('textarea');
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2400);
    } catch {
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2400);
    }
  }, [project]);

  if (!isOpen || !project) return null;

  const whatsappPhotoMessage = generateWhatsAppUrl(
    `Hello, I want this type of work: ${project.title}. I will send a photo.`
  );

  // Parse specifications into individual items
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
      aria-labelledby="project-details-title"
      aria-describedby="project-details-description"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-light-border bg-stone-50/90 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-copper/10 text-copper border border-copper/20">
              {project.categoryLabel || 'Fabrication Work'}
            </span>
            <span className="hidden sm:inline-flex items-center text-xs text-stone-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-copper mr-1 shrink-0" />
              Proddatur
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <ProjectShareButton project={project} variant="modal" />

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-dark-text transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
              aria-label="Close project details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7 space-y-6">
          {/* Photo Showcase with Fullscreen Zoom Trigger */}
          <div className="relative rounded-2xl overflow-hidden bg-stone-900 border border-light-border group/photo shadow-xs">
            <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-stone-950 flex items-center justify-center">
              <img
                src={project.mediumUrl || project.thumbnailUrl || project.imageUrl}
                srcSet={project.srcSetWebp}
                sizes="(max-width: 768px) 100vw, 768px"
                alt={project.imageAlt || project.title}
                width={768}
                height={480}
                decoding="async"
                loading="eager"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover/photo:scale-102 transition-transform duration-300"
              />
            </div>

            {/* View Fullscreen Photo floating button */}
            <div className="absolute bottom-3 right-3">
              <button
                type="button"
                onClick={() => onOpenPhoto(project)}
                className="inline-flex items-center justify-center px-3.5 py-2 rounded-xl bg-stone-900/90 hover:bg-stone-900 text-white text-xs font-semibold backdrop-blur-md shadow-md transition-all cursor-pointer min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
              >
                <Maximize2 className="w-4 h-4 mr-1.5 text-copper shrink-0" />
                <span>View Fullscreen Photo</span>
              </button>
            </div>
          </div>

          {/* Project Title */}
          <div className="space-y-2">
            <h2
              id="project-details-title"
              className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-dark-text tracking-tight leading-snug"
            >
              {project.title}
            </h2>

            {/* Stable Direct URL indicator with quick copy */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-stone-600">
              <span className="font-semibold text-stone-500">Project URL:</span>
              <button
                type="button"
                onClick={handleCopyUrl}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-mono text-[11px] sm:text-xs transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-copper"
                title="Click to copy direct project URL"
              >
                {urlCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="text-emerald-700 font-bold">Copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span className="truncate max-w-[260px] sm:max-w-md">/portfolio/{project.id}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-2 text-stone-700 text-sm sm:text-base leading-relaxed">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Project Overview
            </h3>
            <p id="project-details-description" className="whitespace-pre-line text-stone-700 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Specifications Chips */}
          {specItems.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-light-border">
              <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-copper">
                <Wrench className="w-3.5 h-3.5" />
                <span>Key Specifications & Materials</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {specItems.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-start space-x-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-800"
                  >
                    <ShieldCheck className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                    <span className="leading-snug">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Workshop Details Banner */}
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 flex items-start space-x-3 text-xs sm:text-sm text-stone-700">
            <MapPin className="w-5 h-5 text-copper shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-dark-text">Fabricated in Proddatur</p>
              <p className="text-stone-600 mt-0.5">
                Every unit is fabricated at our Auto Nagar, Proddatur workshop by Abdul Sattar & our skilled welding team with heavy-gauge steel and anti-rust primer treatment.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 border-t border-light-border bg-stone-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          {/* Navigation Controls */}
          <div className="flex items-center space-x-2 justify-between sm:justify-start">
            {onNavigate && (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate('prev')}
                  disabled={!hasPrev}
                  className="inline-flex items-center justify-center px-3 py-2 rounded-xl bg-white hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white text-stone-700 text-xs font-semibold border border-stone-300 transition-colors min-h-[44px] cursor-pointer disabled:cursor-not-allowed"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('next')}
                  disabled={!hasNext}
                  className="inline-flex items-center justify-center px-3 py-2 rounded-xl bg-white hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white text-stone-700 text-xs font-semibold border border-stone-300 transition-colors min-h-[44px] cursor-pointer disabled:cursor-not-allowed"
                  aria-label="Next project"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </>
            )}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => onOpenPhoto(project)}
              className="hidden sm:inline-flex items-center justify-center px-3.5 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-dark-text text-xs font-bold border border-stone-300 transition-colors min-h-[44px] cursor-pointer"
            >
              <Maximize2 className="w-4 h-4 mr-1.5 text-copper shrink-0" />
              <span>View Photo</span>
            </button>

            {/* Direct Call Button (preserves instant phone access) */}
            <a
              href={BUSINESS_INFO.phoneTel}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-copper hover:bg-copper-hover text-white text-xs sm:text-sm font-bold shadow-xs transition-colors min-h-[44px] whitespace-nowrap active:scale-[0.98]"
            >
              <Phone className="w-4 h-4 mr-1.5 stroke-[2.2] shrink-0" />
              <span>Call</span>
            </a>

            {/* Primary Quote Conversion Action */}
            <a
              href={whatsappPhotoMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors min-h-[44px] whitespace-nowrap active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-4 h-4 mr-2 shrink-0" />
              <span>Send Photo on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
