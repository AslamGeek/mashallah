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
  MessageCircle,
} from 'lucide-react';
import { SERVICES_LIST, generateWhatsAppUrl } from '../data/content';
import { ServiceItem } from '../types';

export const Services: React.FC = () => {
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
    <section id="services" className="py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Description */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <span>What We Do</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
            Our Iron Fabrication & Welding Services
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            From precision architectural iron gates and window safety grills to heavy machine stands and emergency welding repairs in Kottapalle.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 ${
                activeCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-200/80 border border-stone-200'
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
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md hover:border-amber-400 transition-all flex flex-col group"
              >
                {/* Header Icon + Title */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors shrink-0">
                    <IconComponent className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {service.title}
                </h3>

                <p className="text-stone-600 text-sm leading-relaxed mb-5 flex-grow">
                  {service.description}
                </p>

                {/* Features checklist */}
                <div className="space-y-1.5 pt-3 border-t border-stone-100 mb-5">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center text-xs text-stone-600">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-500 mr-2 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* WhatsApp Action Button */}
                <a
                  href={serviceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-stone-50 hover:bg-emerald-600 text-stone-800 hover:text-white border border-stone-200 hover:border-emerald-600 font-semibold text-xs tracking-wide transition-all group-hover:shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 mr-1.5 text-emerald-600 group-hover:text-white" />
                  <span>Enquire for {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-60 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Custom Requirements Callout Banner */}
        <div className="mt-12 bg-stone-900 rounded-2xl p-6 sm:p-8 text-stone-100 shadow-xl border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-extrabold text-white">
              Have a Custom Metal Blueprint or Unique Measurement?
            </h4>
            <p className="text-stone-300 text-sm max-w-2xl">
              We fabricate bespoke ironwork based on your architect’s drawing, photos from Pinterest, or custom on-site requirements. Free consultation & estimate in Auto Nagar and Kottapalle.
            </p>
          </div>
          <a
            href={generateWhatsAppUrl('Hello Mashallah Welding Works, I have a custom design/drawing I would like an estimate for.')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm tracking-wide shadow-md transition-all active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Send Your Design on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
