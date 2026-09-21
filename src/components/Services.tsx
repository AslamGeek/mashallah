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
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { SERVICES_LIST, generateWhatsAppUrl } from '../data/content';
import { ServiceItem } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ServicesProps {
  className?: string;
}

export const Services: React.FC<ServicesProps> = ({ className = 'py-20' }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

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
      default:
        return Wrench;
    }
  };

  const categories = [
    { id: 'all', label: 'All Services (11)' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'fabrication', label: 'Fabrication & Welding' },
    { id: 'repair', label: 'Repairs & Maintenance' },
  ];

  const filteredServices = SERVICES_LIST.filter((service) => {
    if (activeCategory === 'all') return true;
    return service.category === activeCategory;
  });

  return (
    <section id="services" className={`${className} bg-dark-bg text-[#F5F3EE] border-b border-dark-border`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Description */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gunmetal border border-dark-border text-copper text-xs font-bold uppercase tracking-wider">
            <span>What We Do</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Our Iron Fabrication & Welding Services
          </h2>
          <p className="text-base sm:text-lg text-muted-text leading-relaxed">
            From precision architectural iron gates and window safety grills to heavy machine stands and emergency welding repairs in Proddatur.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-copper text-white shadow-xs'
                  : 'bg-gunmetal text-muted-text hover:text-white hover:bg-steel border border-dark-border'
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
            const whatsappText = `Hello Mashallah Welding Works, I would like to enquire about your ${service.title} service.`;
            const serviceUrl = generateWhatsAppUrl(whatsappText);

            return (
              <div
                key={service.id}
                id={`service-${service.id}`}
                className="bg-gunmetal rounded-2xl p-6 border border-dark-border shadow-xs hover:shadow-md hover:border-copper/70 transition-all flex flex-col group"
              >
                {/* Header Icon + Title */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-steel text-copper border border-dark-border flex items-center justify-center group-hover:bg-copper group-hover:text-white transition-colors shrink-0">
                    <IconComponent className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text bg-steel px-2.5 py-1 rounded-md border border-dark-border/60 whitespace-nowrap">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-copper transition-colors">
                  {service.title}
                </h3>

                <p className="text-muted-text text-sm leading-relaxed mb-5 flex-grow">
                  {service.description}
                </p>

                {/* Features checklist */}
                <div className="space-y-1.5 pt-3 border-t border-dark-border mb-5">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center text-xs text-stone-300">
                      <CheckCircle className="w-3.5 h-3.5 text-copper mr-2 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* WhatsApp Action Button */}
                <a
                  href={serviceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-steel hover:bg-emerald-600 text-stone-200 hover:text-white border border-dark-border hover:border-emerald-600 font-semibold text-xs tracking-wide transition-all group-hover:shadow-xs min-h-[44px]"
                >
                  <WhatsAppIcon className="w-4 h-4 mr-1.5 text-emerald-400 group-hover:text-white shrink-0" />
                  <span className="whitespace-nowrap">Enquire for {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-60 group-hover:translate-x-1 transition-transform shrink-0" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Custom Requirements Callout Banner */}
        <div className="mt-12 bg-gunmetal rounded-2xl p-6 sm:p-8 text-stone-100 shadow-xl border border-dark-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-extrabold text-white">
              Have a Custom Metal Blueprint or Unique Measurement?
            </h4>
            <p className="text-muted-text text-sm max-w-2xl leading-relaxed">
              We fabricate bespoke ironwork based on your architect’s drawing, photos from Pinterest, or custom on-site requirements. Free consultation & estimate in Auto Nagar and Proddatur.
            </p>
          </div>
          <a
            href={generateWhatsAppUrl('Hello Mashallah Welding Works, I have a custom design/drawing I would like an estimate for.')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-sm tracking-wide shadow-xs transition-all active:scale-[0.98] whitespace-nowrap min-h-[44px]"
          >
            <WhatsAppIcon className="w-4 h-4 mr-2 shrink-0" />
            <span>Send Your Design on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
