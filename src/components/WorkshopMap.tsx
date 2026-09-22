import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

export const WorkshopMap: React.FC = () => {
  // Canonical Google Maps place: Mashallah Welding Works (Coordinates: 14.7410663, 78.5710838)
  // Shared canonical URL: BUSINESS_INFO.mapsUrl ('https://maps.app.goo.gl/jNsuWLiv61PiG28G8')
  // Address: 11/276, MG, Lakshmi Nagar, Auto Nagar, Proddatur, Andhra Pradesh 516360
  // TODO: The business owner can optionally supply a dedicated Google Maps Embed API key or place ID if custom styled embedding is desired.
  const mapEmbedUrl =
    'https://maps.google.com/maps?q=Mashallah+Welding+Works,+Auto+Nagar,+Proddatur,+Andhra+Pradesh+516360&t=&z=16&ie=UTF8&iwloc=&output=embed';

  return (
    <div
      id="workshop-location-map"
      className="mt-10 bg-white rounded-2xl border border-light-border shadow-xs overflow-hidden"
    >
      {/* Map Header */}
      <div className="p-5 sm:p-6 border-b border-light-border bg-stone-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 text-copper text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Workshop Location</span>
          </div>
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
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-copper hover:bg-copper-hover text-white text-xs sm:text-sm font-bold shadow-xs transition-colors whitespace-nowrap min-h-[44px]"
          >
            <Navigation className="w-4 h-4 mr-2 shrink-0" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-80 shrink-0" />
          </a>
        </div>
      </div>

      {/* Embedded Google Map */}
      <div className="relative w-full h-72 sm:h-96 bg-stone-100">
        <iframe
          id="google-maps-iframe"
          title="Mashallah Welding Works Workshop Location - Auto Nagar, Proddatur"
          src={mapEmbedUrl}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};
