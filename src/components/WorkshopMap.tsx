import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

export const WorkshopMap: React.FC = () => {
  // Canonical Google Maps place: Mashallah Welding Works (Coordinates: 14.7410663, 78.5710838)
  // Address: 11/276, MG, Lakshmi Nagar, Auto Nagar, Proddatur, Andhra Pradesh 516360
  // Keyless static Google Maps widget centered on the workshop address
  const embedUrl = `https://maps.google.com/maps?q=14.7410663,78.5710838+(Mashallah+Welding+Works)&t=&z=16&ie=UTF8&iwloc=B&output=embed`;

  // Official direct Google Maps navigation / directions URL
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    'Mashallah Welding Works, 11/276, MG, Lakshmi Nagar, Auto Nagar, Proddatur, Andhra Pradesh 516360'
  )}`;

  return (
    <div
      id="workshop-location-map"
      className="mt-10 bg-white rounded-2xl border border-light-border shadow-xs overflow-hidden"
    >
      {/* Map Header / Location Summary */}
      <div className="p-5 sm:p-6 border-b border-light-border bg-stone-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4 min-w-0">
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-copper shrink-0" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-dark-text break-words">
              Visit Our Workshop in Auto Nagar, Proddatur
            </h3>
          </div>
          <p className="text-stone-600 text-xs sm:text-sm break-words pl-7">
            {BUSINESS_INFO.address}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            id="map-directions-btn-header"
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-copper hover:bg-copper-hover text-white text-xs sm:text-sm font-bold shadow-xs transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-copper text-center"
          >
            <Navigation className="w-4 h-4 mr-2 shrink-0" />
            <span>Get Directions</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-80 shrink-0" />
          </a>
        </div>
      </div>

      {/* Real Interactive Google Maps Embed (Responsive & Lazy Loaded) */}
      <div className="relative w-full h-72 sm:h-80 md:h-96 bg-stone-100 overflow-hidden">
        <iframe
          id="google-maps-iframe"
          title="Google Map showing Mashallah Welding Works location in Auto Nagar, Proddatur"
          src={embedUrl}
          className="w-full h-full border-0 block"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          aria-label="Interactive Google Map showing Mashallah Welding Works workshop in Auto Nagar, Proddatur"
        />
      </div>

      {/* Map Footer Action Bar */}
      <div className="p-4 sm:p-5 bg-white border-t border-light-border flex flex-col sm:flex-row items-center justify-between gap-3 min-w-0">
        <div className="text-xs sm:text-sm text-stone-600 text-center sm:text-left min-w-0">
          <span className="font-semibold text-dark-text">Auto Nagar Workshop:</span> Located in Lakshmi Nagar, open Mon–Sat 9:00 AM – 8:00 PM
        </div>
        <a
          id="map-directions-btn-bottom"
          href={BUSINESS_INFO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-copper hover:bg-copper-hover text-white text-sm font-bold shadow-xs transition-colors min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-copper text-center shrink-0"
        >
          <Navigation className="w-4 h-4 mr-2 shrink-0" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-4 h-4 ml-1.5 opacity-80 shrink-0" />
        </a>
      </div>
    </div>
  );
};
