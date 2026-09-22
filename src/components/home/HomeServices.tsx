import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Grid,
  Layers,
  Box,
  Wrench,
  School,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SERVICES_LIST, generateWhatsAppUrl } from '../../data/content';
import { WhatsAppIcon } from '../WhatsAppIcon';

export const HomeServices: React.FC = () => {
  // Local state for expandable service details
  const [expandedServiceIds, setExpandedServiceIds] = useState<Record<string, boolean>>({});

  const toggleServiceDetails = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpandedServiceIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Map icon name to Lucide icon component
  const getServiceIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Shield':
        return Shield;
      case 'Grid':
        return Grid;
      case 'Layers':
        return Layers;
      case 'School':
        return School;
      case 'Box':
        return Box;
      case 'Wrench':
        return Wrench;
      default:
        return Wrench;
    }
  };

  // 6 core featured service IDs from the single source of truth SERVICES_LIST
  const coreServiceIds = [
    'iron-gates',
    'iron-grills',
    'railings',
    'school-furniture',
    'iron-stands',
    'iron-repair-works',
  ];

  // Derive homepage services from centralized SERVICES_LIST
  const homepageServices = coreServiceIds
    .map((id) => SERVICES_LIST.find((s) => s.id === id))
    .filter(Boolean)
    .map((s) => ({
      ...s!,
      categoryDisplay:
        s!.category === 'residential'
          ? 'Home & Safety'
          : s!.category === 'commercial'
          ? 'School & Office'
          : s!.category === 'repair'
          ? 'Repairs'
          : 'Racks & Sheds',
    }));

  return (
    <section
      id="services-preview"
      className="py-16 sm:py-20 bg-light-bg text-dark-text border-b border-light-border"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div className="max-w-2xl space-y-3">
            <h2
              id="services-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-text"
            >
              What We Make & Fix
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Simple overview of what we make and fix in Auto Nagar, Proddatur. Tap any service for a quick WhatsApp quote.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 text-copper hover:text-copper-hover font-bold text-sm group shrink-0"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Scannable Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homepageServices.map((service) => {
            const Icon = getServiceIcon(service.iconName);
            const isServiceExpanded = !!expandedServiceIds[service.id];

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-light-border hover:border-copper/70 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-light-bg text-copper border border-light-border flex items-center justify-center group-hover:bg-copper group-hover:text-white transition-colors shrink-0">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-stone-100 text-stone-600 border border-light-border">
                      {service.categoryDisplay}
                    </span>
                  </div>

                  {/* Service Title Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleServiceDetails(service.id, e)}
                    aria-expanded={isServiceExpanded}
                    className="w-full text-left py-1 min-h-[44px] flex items-center justify-between group/title cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-lg"
                    aria-label={`${service.title} - ${isServiceExpanded ? 'Hide details' : 'View service details'}`}
                  >
                    <span className="text-lg sm:text-xl font-bold text-dark-text group-hover/title:text-copper transition-colors leading-snug break-words flex-1 min-w-0">
                      {service.title}
                    </span>
                    <span className="ml-2 p-1 text-stone-400 group-hover/title:text-copper transition-colors shrink-0">
                      {isServiceExpanded ? (
                        <ChevronUp className="w-4 h-4 text-copper" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  <p className="text-stone-600 text-sm leading-relaxed break-words">
                    {service.description}
                  </p>

                  {/* Expanded Detailed Information with Features from SERVICES_LIST */}
                  {isServiceExpanded && (
                    <div className="pt-2 space-y-2 border-t border-light-border text-xs text-stone-600 min-w-0">
                      {service.features && service.features.length > 0 ? (
                        service.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <span className="text-copper font-bold">•</span>
                            <span className="break-words">{feat}</span>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="flex items-start space-x-2">
                            <span className="text-copper font-bold">•</span>
                            <span className="break-words"><strong>Quality Metal:</strong> Strong steel made to your exact measurements.</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-copper font-bold">•</span>
                            <span className="break-words"><strong>Rust Protection:</strong> Anti-rust primer coating and clean paint finish.</span>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Row */}
                <div className="pt-5 mt-4 border-t border-light-border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <button
                    type="button"
                    onClick={(e) => toggleServiceDetails(service.id, e)}
                    className="text-xs font-semibold text-stone-600 hover:text-copper transition-colors inline-flex items-center justify-center sm:justify-start min-h-[36px] cursor-pointer"
                  >
                    {isServiceExpanded ? (
                      <>
                        <ChevronUp className="w-3.5 h-3.5 mr-1 text-copper shrink-0" />
                        <span>Hide Details</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3.5 h-3.5 mr-1 text-copper shrink-0" />
                        <span>View Details</span>
                      </>
                    )}
                  </button>
                  <a
                    href={generateWhatsAppUrl({
                      type: service.category === 'repair' ? 'repair' : 'service',
                      serviceName: service.title,
                      details: service.title,
                    })}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-lg transition-colors min-h-[36px] text-center"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 mr-1 shrink-0" />
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-sm shadow-xs transition-colors"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};
