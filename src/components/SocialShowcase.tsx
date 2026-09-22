import React, { useState, useRef } from 'react';
import { Instagram, Sparkles, Maximize2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO, PINTEREST_BOARDS, generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ProjectLightbox, LightboxMediaItem } from './ProjectLightbox';

export const SocialShowcase: React.FC = () => {
  const showcaseItems: LightboxMediaItem[] = PINTEREST_BOARDS.map((board, idx) => ({
    id: `board-${idx}`,
    title: board.title,
    imageUrl: board.imageUrl,
    imageAlt: board.imageAlt || board.title,
    categoryLabel: 'Design Inspiration',
    description: board.description,
    specifications: `${board.count} • Custom Fabrication Available`,
    location: 'Proddatur Workshop',
    whatsappMessage: `Hello Mashallah Welding Works, I want to enquire about custom fabrication for "${board.title}".`,
  }));

  const [activeModalItem, setActiveModalItem] = useState<LightboxMediaItem | null>(null);
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>({});
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const toggleCardDetails = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpandedCardIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openLightbox = (item: LightboxMediaItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    lastTriggerRef.current = (e?.currentTarget as HTMLElement) || (document.activeElement as HTMLElement) || null;
    setActiveModalItem(item);
  };

  const closeLightbox = () => {
    setActiveModalItem(null);
    if (lastTriggerRef.current) {
      lastTriggerRef.current.focus({ preventScroll: true });
    }
  };

  return (
    <section id="social-showcase" className="py-20 bg-warm-tint text-dark-text border-b border-light-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-text">
            Explore Modern Fabrication Ideas & Concepts
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Looking for design inspiration? Browse our curated collections featuring modern gates, decorative grills, and custom steel patterns. Found a design you like? Send it to us for an exact fabrication quote!
          </p>
        </div>

        {/* Boards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {showcaseItems.map((item, idx) => {
            const isExpanded = !!expandedCardIds[item.id];
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-light-border shadow-xs hover:shadow-md transition-all group flex flex-col"
              >
                {/* Clickable Image Container: Opens photo viewer only */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(item, e);
                  }}
                  className="relative aspect-[16/10] overflow-hidden bg-black text-left cursor-pointer w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-copper block group/img"
                  aria-haspopup="dialog"
                  aria-label={`View photo of ${item.title}`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    width={800}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (item.imageUrl.includes('window-safety-grill') && !target.src.endsWith('.jpg')) {
                        target.src = '/images/window-safety-grill-s-curve-design-proddatur-1.jpg';
                      }
                    }}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                  />
                </button>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-xs font-semibold text-copper mb-1.5 flex items-center uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-copper mr-1 shrink-0" />
                    <span>Design Idea</span>
                  </div>

                  {/* Card Title: Clickable to expand/open detailed card view, comfortable 44px+ hit area */}
                  <button
                    type="button"
                    onClick={(e) => toggleCardDetails(item.id, e)}
                    aria-expanded={isExpanded}
                    className="w-full text-left py-1 min-h-[44px] flex items-center justify-between group/title cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-lg mb-1"
                    aria-label={`${item.title} - ${isExpanded ? 'Hide details' : 'View design details'}`}
                  >
                    <span className="font-bold text-dark-text text-lg group-hover/title:text-copper transition-colors leading-snug">
                      {item.title}
                    </span>
                    <span className="ml-2 p-1 text-stone-400 group-hover/title:text-copper transition-colors shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-copper" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {/* Detailed vs Summary View */}
                  {isExpanded ? (
                    <div className="space-y-2.5 mb-4 flex-grow text-left pt-1">
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="p-3 rounded-xl bg-stone-50 border border-light-border text-xs space-y-1">
                        <span className="font-bold text-copper block uppercase tracking-wider text-[10px]">
                          Fabrication Availability
                        </span>
                        <p className="text-stone-700">
                          {item.specifications}
                        </p>
                        <p className="text-stone-500 text-[11px] pt-1">
                          Available for custom sizing and site fitting across Proddatur.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-stone-600 mb-4 flex-grow leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  {/* Actions: View Photo, View Details, WhatsApp Quote */}
                  <div className="pt-3 border-t border-light-border/70 space-y-2 mt-auto">
                    <div className="grid grid-cols-2 gap-2">
                      {/* View Photo button: opens photo viewer only */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(item, e);
                        }}
                        className="inline-flex items-center justify-center text-xs font-semibold text-stone-700 hover:text-dark-text py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 min-h-[44px] cursor-pointer text-center"
                      >
                        <Maximize2 className="w-3.5 h-3.5 mr-1.5 text-copper shrink-0" />
                        <span>View Photo</span>
                      </button>

                      {/* View Details button: expands/collapses detailed card view */}
                      <button
                        type="button"
                        onClick={(e) => toggleCardDetails(item.id, e)}
                        className={`inline-flex items-center justify-center px-3 py-2 rounded-xl font-semibold text-xs border transition-colors min-h-[44px] cursor-pointer text-center ${
                          isExpanded
                            ? 'bg-copper text-white border-copper'
                            : 'bg-white hover:bg-stone-50 text-dark-text border-stone-200'
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
                      href={generateWhatsAppUrl(item.whatsappMessage || `Hello Mashallah Welding Works, I want to enquire about fabrication for "${item.title}".`)}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 py-2.5 px-4 rounded-xl shadow-xs min-h-[44px] text-center"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                      <span>Ask About This Project</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instagram Integration Card */}
        <div className="bg-white border border-light-border rounded-2xl p-5 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs min-w-0">
          <div className="space-y-1.5 max-w-2xl min-w-0 flex-1">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Instagram className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-dark-text text-base sm:text-lg break-words">
                Official Instagram Profile
              </h4>
              <span className="text-[10px] font-semibold bg-stone-100 text-stone-700 border border-light-border px-2 py-0.5 rounded-md">
                Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed break-words">
              Follow <strong className="text-dark-text">@karimulla955</strong> on Instagram for recent metalwork reels, workshop fabrication videos & client installations.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full md:w-auto">
            <a
              id="view-instagram-profile-btn"
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-xs transition-opacity min-h-[44px] text-center"
            >
              <Instagram className="w-4 h-4 mr-2 shrink-0" />
              <span>Follow @karimulla955</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1.5 shrink-0" />
            </a>
            <a
              href={generateWhatsAppUrl('Hello Mashallah Welding Works, please send recent photos/videos of your latest welding works.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-dark-text font-semibold text-xs border border-light-border transition-colors min-h-[44px] text-center"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 mr-1.5 text-emerald-600 shrink-0" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Design Inspiration Lightbox Viewer */}
        <ProjectLightbox
          project={activeModalItem}
          items={showcaseItems}
          onClose={closeLightbox}
          onNavigate={(item) => setActiveModalItem(item)}
        />
      </div>
    </section>
  );
};
