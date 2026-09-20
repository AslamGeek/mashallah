import React from 'react';
import { ExternalLink, Camera, Image, Layers, Sparkles } from 'lucide-react';
import { BUSINESS_INFO, PINTEREST_BOARDS, generateWhatsAppUrl } from '../data/content';

export const SocialShowcase: React.FC = () => {
  return (
    <section id="social-showcase" className="py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
            <span>Online Inspiration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
            Explore Our Designs on Pinterest & Social Media
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Looking for design inspiration? Browse our curated Pinterest boards featuring modern gates, decorative grills, and custom steel patterns. Found a design you like? Send it to us for an exact fabrication quote!
          </p>
        </div>

        {/* Pinterest Boards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PINTEREST_BOARDS.map((board, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all group flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                <img
                  src={board.imageUrl}
                  alt={board.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5 inline-block" />
                  Pinterest Board
                </div>
                <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-sm text-stone-200 text-xs font-semibold px-2.5 py-1 rounded-md border border-stone-700/60">
                  {board.count}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-stone-900 text-lg mb-1.5">{board.title}</h3>
                <p className="text-xs sm:text-sm text-stone-600 mb-4 flex-grow">
                  {board.description}
                </p>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <a
                    href={BUSINESS_INFO.pinterestUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
                  >
                    <span>View on Pinterest</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                  <a
                    href={generateWhatsAppUrl(`Hello Mashallah Welding Works, I want to share a Pinterest pin of "${board.title}" to check if you can make it.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Share Pin on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons & Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pinterest Official Profile Card */}
          <div className="bg-red-50/70 border border-red-200/80 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  P
                </div>
                <h4 className="font-bold text-stone-900 text-base sm:text-lg">
                  Official Pinterest Profile
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-stone-600">
                Follow <strong className="text-stone-800">@skarimulla2018</strong> for daily welding designs, modern iron grill ideas & gate blueprints.
              </p>
            </div>
            <a
              id="view-pinterest-profile-btn"
              href={BUSINESS_INFO.pinterestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors"
            >
              <span>View More on Pinterest</span>
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>

          {/* Instagram Integration Card */}
          <div className="bg-stone-100 border border-stone-200 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-sm">
                  <Camera className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-stone-900 text-base sm:text-lg">
                  Instagram Profile
                </h4>
                <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                  Configurable
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600">
                Instagram profile URL will be connected here once active. In the meantime, message us directly for live workshop photos.
              </p>
            </div>
            <a
              href={generateWhatsAppUrl('Hello Mashallah Welding Works, please send recent photos/videos of your latest welding works.')}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 font-semibold text-xs sm:text-sm transition-colors"
            >
              <span>Request Photos on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
