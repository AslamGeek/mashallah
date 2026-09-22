import React from 'react';
import { MessageSquare, Calculator, Flame, Truck, ArrowRight } from 'lucide-react';
import { generateWhatsAppUrl } from '../../data/content';
import { WhatsAppIcon } from '../WhatsAppIcon';

export const HomeHowItWorks: React.FC = () => {
  const steps = [
    {
      number: '1',
      icon: MessageSquare,
      title: 'Send Idea or Book Visit',
      description:
        'Share a reference photo, rough sketch, or approximate sizes on WhatsApp. We can also visit your site in Proddatur for tape measurements.',
    },
    {
      number: '2',
      icon: Calculator,
      title: 'Clear Estimate & Gauge Choice',
      description:
        'We calculate metal weight, recommend proper steel gauge (pipe/angle thickness), and provide an honest upfront quote with no hidden extras.',
    },
    {
      number: '3',
      icon: Flame,
      title: 'Fabrication & Anti-Rust Primer',
      description:
        'Built in our Auto Nagar workshop with precision arc welding, clean joint grinding, and thorough red oxide anti-corrosive primer coating.',
    },
    {
      number: '4',
      icon: Truck,
      title: 'Doorstep Delivery & Fitting',
      description:
        'We deliver directly to your house or site, weld secure wall anchorings, and ensure smooth gate swing and balanced fit.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-light-bg text-dark-text border-b border-light-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-text">
            How It Works: Easy 4-Step Process
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            From your first message to finished fitting, here is how we make your iron gates, safety grills, and custom steelwork.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-light-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-warm-tint text-copper border border-light-border flex items-center justify-center group-hover:bg-copper group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-2xl font-black text-stone-300 group-hover:text-copper/40 transition-colors">
                      0{step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-dark-text mb-2 group-hover:text-copper transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-light-border text-xs font-semibold text-stone-500">
                  Step {step.number} of 4
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href={generateWhatsAppUrl('Hello, I would like to ask how to start my iron fabrication project.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xs transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4 mr-2 shrink-0" />
            <span>Start with a Quick WhatsApp Quote</span>
          </a>
        </div>
      </div>
    </section>
  );
};
