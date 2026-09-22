import React, { useRef } from 'react';
import { X, Maximize2, ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { GalleryProject } from '../types';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';
import { getProjectUrl } from '../data/projects';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ProjectShareButton } from './ProjectShareButton';
import { useModalOverlay } from '../hooks/useModalOverlay';

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

  // Consolidated modal scroll lock, focus trap, and Escape handling
  useModalOverlay({
    isOpen: isOpen && !!project,
    onClose,
    containerRef: modalRef,
    initialFocusRef: closeBtnRef,
    onKeyDown: (e) => {
      if (e.key === 'ArrowLeft' && onNavigate && hasPrev) {
        e.preventDefault();
        onNavigate('prev');
      } else if (e.key === 'ArrowRight' && onNavigate && hasNext) {
        e.preventDefault();
        onNavigate('next');
      }
    },
  });

  if (!isOpen || !project) return null;

  const whatsappProjectMessage = generateWhatsAppUrl({
    type: 'project',
    projectName: project.title,
    projectSlug: project.id,
    projectUrl: getProjectUrl(project.id),
  });

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
        className="relative w-full max-w-2xl max-h-[92vh] max-h-[92dvh] flex flex-col bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden"
      >
        {/* 1. Close / Share Top Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-3 border-b border-stone-200 bg-stone-50/95 shrink-0 min-w-0 gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-copper truncate min-w-0 flex-1">
            {project.categoryLabel || 'Fabrication Work'}
          </span>

          <div className="flex items-center space-x-2 shrink-0">
            {/* Single discreet Share button */}
            <ProjectShareButton project={project} variant="modal" />

            {/* Close button */}
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

        {/* Scrollable Body: Photo -> Title -> Details */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* 2. Photo (Clean without overlays; tappable to enlarge) */}
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => onOpenPhoto(project)}
              className="w-full rounded-xl sm:rounded-2xl overflow-hidden bg-stone-950 border border-stone-200 shadow-xs cursor-pointer group/photo block focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
              aria-label={`Open full photo of ${project.title}`}
            >
              <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-stone-950 flex items-center justify-center">
                <img
                  src={project.mediumUrl || project.thumbnailUrl || project.imageUrl}
                  srcSet={project.srcSetWebp}
                  sizes="(max-width: 672px) 100vw, 672px"
                  alt={project.imageAlt || project.title}
                  width={672}
                  height={420}
                  decoding="async"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover/photo:scale-102 transition-transform duration-300"
                />
              </div>
            </button>

            {/* Simple discreet View Photo button positioned outside the image */}
            <div className="flex items-center justify-between px-1 text-xs text-stone-500">
              <button
                type="button"
                onClick={() => onOpenPhoto(project)}
                className="inline-flex items-center text-xs font-semibold text-stone-700 hover:text-copper transition-colors cursor-pointer py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-copper rounded-md"
              >
                <Maximize2 className="w-3.5 h-3.5 mr-1.5 text-copper shrink-0" />
                <span>View Photo</span>
              </button>
              <span className="text-[11px] text-stone-400">Tap photo to enlarge</span>
            </div>
          </div>

          {/* 3. Project Title (wraps naturally, no truncation) */}
          <div className="pt-1">
            <h2
              id="project-details-title"
              className="text-lg sm:text-2xl font-extrabold text-dark-text tracking-tight leading-snug break-words"
            >
              {project.title}
            </h2>
          </div>

          {/* 4. Description / Details */}
          <div className="space-y-3 text-stone-700 text-sm sm:text-base leading-relaxed">
            <p id="project-details-description" className="whitespace-pre-line text-stone-700 leading-relaxed break-words">
              {project.description}
            </p>

            {specItems.length > 0 && (
              <div className="pt-3 border-t border-stone-200 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Specifications & Materials
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
                  {specItems.map((spec, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-copper mt-1.5 mr-2 shrink-0" />
                      <span className="leading-snug break-words">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 5 & 6. Bottom Action Controls */}
        <div className="p-3.5 sm:p-5 border-t border-stone-200 bg-stone-50 flex flex-col gap-2.5 sm:gap-3 shrink-0">
          {/* Previous / Next on their own row */}
          {onNavigate && (
            <div className="grid grid-cols-2 gap-2.5 w-full">
              <button
                type="button"
                onClick={() => onNavigate('prev')}
                disabled={!hasPrev}
                className="inline-flex items-center justify-center px-3 sm:px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white text-stone-700 text-xs sm:text-sm font-semibold border border-stone-300 transition-colors min-h-[44px] cursor-pointer disabled:cursor-not-allowed active:scale-[0.98]"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4 mr-1 shrink-0" />
                <span>Previous</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('next')}
                disabled={!hasNext}
                className="inline-flex items-center justify-center px-3 sm:px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white text-stone-700 text-xs sm:text-sm font-semibold border border-stone-300 transition-colors min-h-[44px] cursor-pointer disabled:cursor-not-allowed active:scale-[0.98]"
                aria-label="Next project"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4 ml-1 shrink-0" />
              </button>
            </div>
          )}

          {/* Call + WhatsApp CTA row: wraps/stacks cleanly on narrow screens without overflow */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 w-full">
            {/* Primary CTA: Get Quote for Similar Design */}
            <a
              href={whatsappProjectMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="order-1 sm:order-2 flex-1 inline-flex items-center justify-center px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors min-h-[48px] active:scale-[0.98] text-center"
            >
              <WhatsAppIcon className="w-4 h-4 mr-2 shrink-0" />
              <span>Get Quote for Similar Design</span>
            </a>

            {/* Secondary CTA: Call */}
            <a
              href={BUSINESS_INFO.phoneTel}
              className="order-2 sm:order-1 inline-flex items-center justify-center px-4 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 text-xs sm:text-sm font-semibold border border-stone-300 transition-colors min-h-[44px] sm:min-h-[48px] active:scale-[0.98] text-center"
            >
              <Phone className="w-4 h-4 mr-1.5 text-copper stroke-[2.2] shrink-0" />
              <span>Call</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
