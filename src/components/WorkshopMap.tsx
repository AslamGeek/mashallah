import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

export const WorkshopMap: React.FC = () => {
  // Canonical Google Maps place: Mashallah Welding Works (Coordinates: 14.7410663, 78.5710838)
  // Shared canonical URL: BUSINESS_INFO.mapsUrl ('https://maps.app.goo.gl/jNsuWLiv61PiG28G8')
  // Address: 11/276, MG, Lakshmi Nagar, Auto Nagar, Proddatur, Andhra Pradesh 516360

  return (
    <div
      id="workshop-location-map"
      className="mt-10 bg-white rounded-2xl border border-light-border shadow-xs overflow-hidden"
    >
      {/* Map Header */}
      <div className="p-5 sm:p-6 border-b border-light-border bg-stone-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-dark-text">
            Visit Our Workshop in Auto Nagar, Proddatur
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm">
            {BUSINESS_INFO.address}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            id="map-directions-btn"
            href={BUSINESS_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-copper hover:bg-copper-hover text-white text-xs sm:text-sm font-bold shadow-xs transition-colors whitespace-nowrap min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
          >
            <Navigation className="w-4 h-4 mr-2 shrink-0" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-80 shrink-0" />
          </a>
        </div>
      </div>

      {/* Static Google Maps Image Preview (Fast & Lightweight) */}
      <a
        id="static-map-link"
        href={BUSINESS_INFO.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Mashallah Welding Works location in Google Maps (opens in new tab)"
        className="group relative block w-full h-72 sm:h-96 bg-stone-100 overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-copper"
      >
        <picture className="w-full h-full block">
          <source
            type="image/webp"
            srcSet="/images/workshop-map-preview-proddatur-480.webp 480w, /images/workshop-map-preview-proddatur-768.webp 768w"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <img
            src="/images/workshop-map-preview-proddatur-768.webp"
            alt="Static Google Maps street map preview showing Mashallah Welding Works workshop in Auto Nagar, Proddatur"
            width={768}
            height={384}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
          />
        </picture>

        {/* Subtle Map Grid Vignette */}
        <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-stone-900/10 transition-colors pointer-events-none" />

        {/* Floating Location Marker Card */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 max-w-[280px] sm:max-w-xs bg-white/95 backdrop-blur-xs p-3.5 sm:p-4 rounded-xl shadow-md border border-light-border pointer-events-none">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-copper/15 text-copper flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-copper" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-dark-text leading-tight">
                Mashallah Welding Works
              </h4>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1 line-clamp-2">
                Auto Nagar, Proddatur, Kadapa Dist.
              </p>
            </div>
          </div>
        </div>

        {/* Center / Bottom "Open in Google Maps" Overlay Badge */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900/80 hover:bg-stone-900 text-white text-xs font-semibold shadow-lg backdrop-blur-xs transition-all group-hover:bg-copper group-hover:scale-105">
            <Navigation className="w-3.5 h-3.5 shrink-0" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3 h-3 opacity-80 shrink-0" />
          </div>
        </div>

        {/* Map Attribution Tag */}
        <div className="absolute bottom-2 left-3 text-[10px] text-stone-500 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs pointer-events-none">
          Map Preview • Click for Live Directions
        </div>
      </a>
    </div>
  );
};
