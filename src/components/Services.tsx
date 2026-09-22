import React, { useState } from 'react';
import {
  Shield,
  Grid,
  Layers,
  DoorClosed,
  Box,
  Flame,
  Wrench,
  Compass,
  Home,
  Briefcase,
  Factory,
  School,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SERVICES_LIST, generateWhatsAppUrl } from '../data/content';
import { ServiceItem } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ServicesProps {
  className?: string;
}

export const Services: React.FC<ServicesProps> = ({ className = 'py-20' }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedServiceIds, setExpandedServiceIds] = useState<Record<string, boolean>>({});

  const toggleServiceDetails = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpandedServiceIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Map icon name to Lucide component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return Shield;
      case 'Grid':
        return Grid;
      case 'Layers':
        return Layers;
      case 'DoorClosed':
        return DoorClosed;
      case 'Box':
        return Box;
      case 'Flame':
        return Flame;
      case 'Wrench':
        return Wrench;
      case 'Compass':
        return Compass;
      case 'Home':
        return Home;
      case 'Briefcase':
        return Briefcase;
      case 'Factory':
        return Factory;
      case 'School':
        return School;
      default:
        return Wrench;
    }
  };

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'residential', label: 'Home' },
    { id: 'commercial', label: 'Shop & Office' },
    { id: 'fabrication', label: 'Custom Work' },
    { id: 'repair', label: 'Repairs' },
  ];

  const filteredServices = SERVICES_LIST.filter((service) => {
    if (activeCategory === 'all') return true;
    return service.category === activeCategory;
  });

  return (
    <section id="services" className={`${className} bg-light-bg text-dark-text border-b border-light-border`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Description */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-text">
            What We Make & Fix
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            From strong main gates and window grills to steel racks and quick welding repairs in Proddatur.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-copper text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:text-dark-text hover:bg-stone-50 border border-light-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service: ServiceItem) => {
            const IconComponent = getIcon(service.iconName);
            const isExpanded = !!expandedServiceIds[service.id];
            const whatsappText = `Hello, I would like to ask about ${service.title}.`;
            const serviceUrl = generateWhatsAppUrl(whatsappText);

            return (
              <div
                key={service.id}
                id={`service-${service.id}`}
                className="bg-white rounded-2xl p-6 border border-light-border shadow-xs hover:shadow-md hover:border-copper/70 transition-all flex flex-col group"
              >
                {/* Header Icon + Category */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-warm-tint text-copper border border-light-border flex items-center justify-center group-hover:bg-copper group-hover:text-white transition-colors shrink-0">
                    <IconComponent className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md border border-light-border whitespace-nowrap">
                    {service.category}
                  </span>
                </div>

                {/* Card Title: Clickable to expand/open detailed card view, comfortable 44px+ touch area */}
                <button
                  type="button"
                  onClick={(e) => toggleServiceDetails(service.id, e)}
                  aria-expanded={isExpanded}
                  className="w-full text-left py-1 min-h-[44px] flex items-center justify-between group/title cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-lg mb-2"
                  aria-label={`${service.title} - ${isExpanded ? 'Hide details' : 'View service details'}`}
                >
                  <span className="text-xl font-bold text-dark-text group-hover/title:text-copper transition-colors leading-snug">
                    {service.title}
                  </span>
                  <span className="ml-2 p-1 text-stone-400 group-hover/title:text-copper transition-colors shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-copper" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </span>
                </button>

                <p className="text-stone-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Expanded Detailed Information */}
                {isExpanded && (
                  <div className="p-3.5 mb-4 rounded-xl bg-stone-50 border border-light-border space-y-2 text-xs text-stone-700">
                    <span className="font-bold text-copper block uppercase tracking-wider text-[10px]">
                      Quality & Service Details
                    </span>
                    <div className="space-y-1.5 leading-relaxed">
                      <div className="flex items-start space-x-2">
                        <span className="text-copper font-bold">•</span>
                        <span><strong>Quality Metal:</strong> High-grade strong steel chosen for long life and safety.</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-copper font-bold">•</span>
                        <span><strong>Rust Protection:</strong> Anti-rust primer coating and clean weather-resistant paint.</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-copper font-bold">•</span>
                        <span><strong>Doorstep Service:</strong> Free site measurement, delivery, and welded fitting in Proddatur.</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features checklist */}
                <div className="space-y-1.5 pt-3 border-t border-light-border mb-5 flex-grow">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center text-xs text-stone-600">
                      <CheckCircle className="w-3.5 h-3.5 text-copper mr-2 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons: View Details + WhatsApp */}
                <div className="mt-auto pt-3 border-t border-light-border space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    {/* View Details button */}
                    <button
                      type="button"
                      onClick={(e) => toggleServiceDetails(service.id, e)}
                      className={`inline-flex items-center justify-center px-3 py-2 rounded-xl font-semibold text-xs border transition-colors min-h-[44px] whitespace-nowrap cursor-pointer ${
                        isExpanded
                          ? 'bg-copper text-white border-copper'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-light-border'
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

                    {/* WhatsApp Action Button */}
                    <a
                      href={serviceUrl}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all min-h-[44px] whitespace-nowrap"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 mr-1 shrink-0" />
                      <span>Ask on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Requirements Callout Banner */}
        <div className="mt-12 bg-warm-tint rounded-2xl p-6 sm:p-8 text-dark-text shadow-xs border border-light-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-extrabold text-dark-text">
              Have a Photo, Sketch, or Custom Size?
            </h4>
            <p className="text-stone-600 text-sm max-w-2xl leading-relaxed">
              Show us a photo from WhatsApp, Pinterest, or your own drawing. We will visit, take exact measurements, and give you a clear price.
            </p>
          </div>
          <a
            href={generateWhatsAppUrl('Hello, I would like to get a quote for custom welding/fabrication work.')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-sm tracking-wide shadow-xs transition-all active:scale-[0.98] whitespace-nowrap min-h-[44px]"
          >
            <WhatsAppIcon className="w-4 h-4 mr-2 shrink-0" />
            <span>Get a Quote on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
