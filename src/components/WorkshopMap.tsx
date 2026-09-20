import React from 'react';
import { MapPin, Navigation, ExternalLink, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

export const WorkshopMap: React.FC = () => {
  // Google Maps embed URL centered on the workshop address in Auto Nagar, Proddatur
  const mapEmbedUrl =
    'https://maps.google.com/maps?q=Auto+Nagar,+Proddatur,+Andhra+Pradesh+516360&t=&z=15&ie=UTF8&iwloc=&output=embed';

  return (
    <div
      id="workshop-location-map"
      className="mt-10 bg-stone-800/90 rounded-2xl border border-stone-700 shadow-xl overflow-hidden"
    >
      {/* Map Header */}
      <div className="p-5 sm:p-6 border-b border-stone-700/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Workshop Location Verification</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Visit Our Workshop in Auto Nagar, Proddatur
          </h3>
          <p className="text-stone-400 text-xs sm:text-sm">
            {BUSINESS_INFO.address}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            id="map-directions-btn"
            href={BUSINESS_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs sm:text-sm font-bold shadow-md transition-colors"
          >
            <Navigation className="w-4 h-4 mr-2 shrink-0" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-70" />
          </a>
        </div>
      </div>

      {/* Embedded Google Map */}
      <div className="relative w-full h-72 sm:h-96 bg-stone-950">
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

      {/* Bottom Features Strip */}
      <div className="p-4 sm:p-5 bg-stone-900/90 border-t border-stone-700/70 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-300">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Industrial Auto Nagar fabrication zone</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Spacious loading for tempos & trucks</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>On-site consultations across Proddatur</span>
        </div>
      </div>
    </div>
  );
};
