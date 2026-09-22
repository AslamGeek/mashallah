import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../../data/content';
import { WhatsAppIcon } from '../WhatsAppIcon';

export const HomeFinalCTA: React.FC = () => {
  const projectTypes = [
    'Steel Gate',
    'Window Grill',
    'Staircase Railing',
    'School Furniture',
    'Welding Repair',
    'Custom Metalwork',
  ];

  // Local state for conversion quick project selector
  const [selectedProjectType, setSelectedProjectType] = useState<string>('Steel Gate');

  return (
    <section
      id="conversion-cta"
      className="py-16 sm:py-20 bg-dark-bg text-[#FAF8F5] border-b border-dark-border"
      aria-labelledby="conversion-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#22272C] rounded-3xl p-8 sm:p-12 border border-dark-border shadow-2xl">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2
              id="conversion-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
            >
              Ready to Start Your Iron Fabrication Project?
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Send your measurements, reference design, or repair query directly to lead fabricator Karimulla C. on WhatsApp for quick, transparent pricing and on-site scheduling in Proddatur.
            </p>

            {/* Quick Preset Selector for One-Tap WhatsApp */}
            <div className="pt-2">
              <span className="block text-xs uppercase font-semibold text-stone-400 mb-2">
                Select Project Type to Pre-fill Message:
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedProjectType(type)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer min-h-[40px] ${
                      selectedProjectType === type
                        ? 'bg-copper text-white shadow-xs font-bold'
                        : 'bg-[#181B1E] text-stone-300 hover:text-white border border-dark-border'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              {/* Primary CTA: Get a Quote on WhatsApp */}
              <a
                id="final-cta-whatsapp"
                href={generateWhatsAppUrl(
                  `Hello, I would like to get a quote for ${selectedProjectType} work.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-lg transition-all duration-150 active:scale-[0.98] cursor-pointer min-h-[48px]"
              >
                <WhatsAppIcon className="w-5 h-5 mr-2.5 shrink-0" />
                <span>Get a Quote on WhatsApp</span>
              </a>

              {/* Secondary CTA: Call Now */}
              <a
                id="final-cta-call"
                href={BUSINESS_INFO.phoneTel}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-base transition-all duration-150 shadow-xs active:scale-[0.98] min-h-[48px]"
              >
                <Phone className="w-5 h-5 mr-2 stroke-[2.2] shrink-0" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Reassurance Footer */}
            <div className="pt-6 border-t border-dark-border/80 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-stone-400">
              <span className="whitespace-nowrap">✓ On-Site Measurements in Proddatur</span>
              <span className="whitespace-nowrap">✓ Direct Workshop Team (No Middlemen)</span>
              <span className="whitespace-nowrap">✓ Red Oxide Anti-Rust Primer Treated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
