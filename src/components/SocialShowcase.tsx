import React, { useState } from 'react';
import { ExternalLink, Camera, Instagram, Image, Layers, Sparkles, Maximize2 } from 'lucide-react';
import { BUSINESS_INFO, PINTEREST_BOARDS, generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ProjectLightbox, LightboxMediaItem } from './ProjectLightbox';

export const SocialShowcase: React.FC = () => {
  const [activeBoard, setActiveBoard] = useState<LightboxMediaItem | null>(null);

  const boardItems: LightboxMediaItem[] = PINTEREST_BOARDS.map((board, idx) => ({
    id: `board-${idx}`,
    title: board.title,
    imageUrl: board.imageUrl,
    imageAlt: board.imageAlt || board.title,
    categoryLabel: 'Design Inspiration',
    description: board.description,
    specifications: `${board.count} • Custom Fabrication to Order • Auto Nagar, Proddatur`,
    location: 'Auto Nagar, Proddatur',
    whatsappMessage: `Hello Mashallah Welding Works, I saw "${board.title}" on your website design inspirations and want to discuss fabrication.`,
  }));

  return (
    <section id="social-showcase" className="py-20 bg-light-bg text-dark-text border-b border-light-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-stone-200/80 border border-light-border text-stone-700 text-xs font-bold uppercase tracking-wider">
            <span>Design Inspiration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-text">
            Explore Modern Fabrication Ideas & Concepts
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Looking for design inspiration? Browse our curated collections featuring modern gates, decorative grills, and custom steel patterns. Found a design you like? Send it to us for an exact fabrication quote!
          </p>
        </div>

        {/* Boards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PINTEREST_BOARDS.map((board, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-light-border shadow-xs hover:shadow-md transition-all group flex flex-col"
            >
              <button
                type="button"
                onClick={() => setActiveBoard(boardItems[idx])}
                className="relative aspect-[16/10] overflow-hidden bg-black text-left cursor-pointer w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
                aria-label={`View enlarged photo for ${board.title}`}
              >
                <img
                  src={board.imageUrl}
                  alt={board.imageAlt || board.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (board.imageUrl.includes('window-safety-grill') && !target.src.endsWith('.jpg')) {
                      target.src = '/images/window-safety-grill-s-curve-design-proddatur-1.jpg';
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-gunmetal/90 text-stone-200 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center border border-dark-border whitespace-nowrap">
                  <Sparkles className="w-3 h-3 text-copper mr-1.5 shrink-0" />
                  Design Idea
                </div>
                <div className="absolute bottom-3 left-3 bg-gunmetal/80 backdrop-blur-xs text-stone-200 text-xs font-semibold px-2.5 py-1 rounded-md border border-dark-border/60 whitespace-nowrap">
                  {board.count}
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-dark-bg/90 backdrop-blur-xs text-white border border-dark-border text-[11px] font-bold flex items-center space-x-1 shadow-md whitespace-nowrap">
                  <Maximize2 className="w-3.5 h-3.5 text-copper shrink-0" />
                  <span>Tap to view</span>
                </div>
              </button>

              <div className="p-5 flex flex-col flex-grow">
                <button
                  type="button"
                  onClick={() => setActiveBoard(boardItems[idx])}
                  className="text-left font-bold text-dark-text text-lg mb-1.5 group-hover:text-copper transition-colors cursor-pointer"
                >
                  {board.title}
                </button>
                <p className="text-xs sm:text-sm text-stone-600 mb-4 flex-grow leading-relaxed">
                  {board.description}
                </p>

                <div className="pt-3 border-t border-light-border/70 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveBoard(boardItems[idx])}
                    className="inline-flex items-center text-xs font-semibold text-stone-700 hover:text-dark-text py-1.5 px-2.5 rounded bg-stone-100 border border-stone-200 cursor-pointer min-h-[38px] whitespace-nowrap"
                  >
                    <Maximize2 className="w-3.5 h-3.5 mr-1 text-copper shrink-0" />
                    <span>View Large</span>
                  </button>
                  <a
                    href={generateWhatsAppUrl(`Hello Mashallah Welding Works, I want to enquire about fabrication for "${board.title}".`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-bold text-emerald-600 hover:text-emerald-700 py-1.5 px-2.5 min-h-[38px] whitespace-nowrap"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 mr-1 shrink-0" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Integration Card */}
        <div className="bg-white border border-light-border rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-xs">
                <Instagram className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-dark-text text-base sm:text-lg">
                Official Instagram Profile
              </h4>
              <span className="text-[10px] font-semibold bg-stone-100 text-stone-700 border border-light-border px-2 py-0.5 rounded-md whitespace-nowrap">
                Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Follow <strong className="text-dark-text whitespace-nowrap">@karimulla955</strong> on Instagram for recent metalwork reels, workshop fabrication videos & client installations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              id="view-instagram-profile-btn"
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-xs transition-opacity whitespace-nowrap min-h-[44px]"
            >
              <Instagram className="w-4 h-4 mr-2 shrink-0" />
              <span>Follow @karimulla955</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1.5 shrink-0" />
            </a>
            <a
              href={generateWhatsAppUrl('Hello Mashallah Welding Works, please send recent photos/videos of your latest welding works.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gunmetal hover:bg-steel text-stone-200 font-semibold text-xs border border-dark-border transition-colors whitespace-nowrap min-h-[44px]"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 mr-1.5 text-emerald-400 shrink-0" />
              <span>WhatsApp Photos</span>
            </a>
          </div>
        </div>

        {/* Full-screen Lightbox for Design Ideas */}
        <ProjectLightbox
          project={activeBoard}
          items={boardItems}
          onClose={() => setActiveBoard(null)}
          onNavigate={(item) => setActiveBoard(item)}
        />
      </div>
    </section>
  );
};
