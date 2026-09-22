import React from 'react';
import { Check, MapPin, Clock, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO, getBusinessHoursStatus } from '../data/content';

export interface ConversionTrustPointsProps {
  className?: string;
  variant?: 'hero' | 'service' | 'contact' | 'compact' | 'inline';
  isRepair?: boolean;
  showLocation?: boolean;
  showHours?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}

export const ConversionTrustPoints: React.FC<ConversionTrustPointsProps> = ({
  className = '',
  variant = 'compact',
  isRepair = false,
  showLocation = false,
  showHours = false,
  theme = 'auto',
}) => {
  const hours = showHours ? getBusinessHoursStatus() : null;

  // Determine trust points based on context
  const getPoints = () => {
    if (isRepair) {
      return [
        'Fast local repair response',
        'Clear upfront estimate',
        'On-site welding & hinge replacement',
      ];
    }

    if (variant === 'hero') {
      return [
        'On-site measurement in Proddatur',
        'Clear quotation before fabrication',
        'Custom fabrication from your design',
      ];
    }

    if (variant === 'service') {
      return [
        'Custom sizes & designs',
        'Site measurement available',
        'Fabrication & doorstep installation',
      ];
    }

    // Default / contact / compact
    return [
      'On-site measurements available',
      'Clear quotation before fabrication',
      'Fabrication & installation in Proddatur',
    ];
  };

  const points = getPoints();

  // Styling based on theme
  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-stone-300' : 'text-stone-600';
  const iconColor = isDark ? 'text-emerald-400' : 'text-emerald-600';
  const subLinkColor = isDark ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-dark-text';

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Checkmark Points Row */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs">
        {points.map((point) => (
          <div key={point} className={`inline-flex items-center space-x-1.5 ${textColor}`}>
            <Check className={`w-3.5 h-3.5 ${iconColor} shrink-0 stroke-[2.5]`} aria-hidden="true" />
            <span className="font-medium">{point}</span>
          </div>
        ))}
      </div>

      {/* Optional Location and Live Hours Row */}
      {(showLocation || (showHours && hours)) && (
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs pt-0.5">
          {showLocation && (
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center space-x-1 underline decoration-stone-400/60 underline-offset-2 transition-colors ${subLinkColor}`}
              title="View workshop location on Google Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-copper shrink-0" aria-hidden="true" />
              <span>Local workshop in Auto Nagar, Proddatur</span>
              <ExternalLink className="w-3 h-3 opacity-70 shrink-0" aria-hidden="true" />
            </a>
          )}

          {showHours && hours && (
            <div className={`inline-flex items-center space-x-1.5 ${textColor}`}>
              <span
                className={`inline-block w-2 h-2 rounded-full shrink-0 ${
                  hours.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'
                }`}
                aria-hidden="true"
              />
              <Clock className="w-3.5 h-3.5 opacity-70 shrink-0" aria-hidden="true" />
              <span>{hours.isOpen ? `Open today · ${hours.nextEvent}` : `${hours.statusText} · ${hours.nextEvent}`}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
