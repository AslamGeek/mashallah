import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { generateWhatsAppUrl } from '../../data/content';
import { WhatsAppIcon } from '../WhatsAppIcon';

export const HomeFAQSection: React.FC = () => {
  const objectionFaqs = [
    {
      id: 'faq-measurements',
      q: 'Do you visit our location in Proddatur to take measurements?',
      a: 'Yes. For gates, window grills, staircase railings, and sheds, we personally visit your residential or commercial site in Proddatur and neighboring areas to take precise tape measurements before metal cutting begins.',
    },
    {
      id: 'faq-pricing',
      q: 'How is the fabrication price calculated?',
      a: 'Pricing is transparently based on total steel weight (pipe/angle gauge thickness), design complexity (simple geometric bars vs. ornate cutwork), and installation requirements. We provide a straightforward itemized estimate before work starts.',
    },
    {
      id: 'faq-rust',
      q: 'Will the fabricated ironwork rust over time?',
      a: 'We thoroughly degrease all steel joints and apply a coat of red oxide or zinc-chromate anti-corrosive primer before delivery. When finished with good quality enamel paint, our steelwork withstands rain and weather for years.',
    },
    {
      id: 'faq-repairs',
      q: 'How quickly can you attend to emergency welding repairs?',
      a: 'For urgent issues like broken main gate hinges, misaligned sliding rollers, loose railings, or detached security grills, we provide prompt same-day or next-morning on-site service across Auto Nagar and Proddatur.',
    },
    {
      id: 'faq-custom',
      q: 'Can I share a photo from WhatsApp, Pinterest, or the internet for custom work?',
      a: 'Yes, absolutely. Many of our customers share photos or sketches of gates, grills, or furniture they liked. We inspect the design, recommend suitable gauge thickness, and build it to your exact opening dimensions.',
    },
    {
      id: 'faq-quote',
      q: 'How do I get an initial cost estimate?',
      a: 'Simply send approximate measurements (height × width) or a photo on WhatsApp, or call us directly. Lead fabricator Karimulla C. will provide an initial quote and schedule an on-site inspection if needed.',
    },
  ];

  // Local state for interactive FAQ accordion
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-measurements', 'faq-pricing']);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="faq-section"
      className="py-16 sm:py-20 bg-light-bg text-dark-text border-b border-light-border"
      aria-labelledby="faq-home-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <h2
            id="faq-home-heading"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-text"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Everything you need to know about our fabrication pricing, measurements, anti-rust protection, and repairs in Proddatur.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3" role="region" aria-label="Frequently Asked Questions">
          {objectionFaqs.map((faq) => {
            const isOpen = openFaqIds.includes(faq.id);
            const qId = `home-faq-q-${faq.id}`;
            const aId = `home-faq-a-${faq.id}`;

            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-200 bg-white overflow-hidden ${
                  isOpen
                    ? 'border-copper ring-1 ring-copper/40 shadow-xs'
                    : 'border-light-border hover:border-stone-400'
                }`}
              >
                <h3>
                  <button
                    id={qId}
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={aId}
                    className="w-full flex items-center justify-between text-left px-5 sm:px-6 py-4 text-dark-text hover:text-copper transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-base pr-4 leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 ${
                        isOpen ? 'bg-copper text-white rotate-180' : 'bg-stone-100 text-stone-600'
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={aId}
                    role="region"
                    aria-labelledby={qId}
                    className="px-5 sm:px-6 pb-4 pt-2 text-stone-700 text-xs sm:text-sm leading-relaxed border-t border-light-border bg-stone-50/70"
                  >
                    <p>{faq.a}</p>
                    <div className="mt-3 pt-2 border-t border-light-border flex items-center justify-end">
                      <a
                        href={generateWhatsAppUrl(
                          `Hello Mashallah Welding Works, regarding this FAQ: "${faq.q}", I have a question.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 mr-1" />
                        <span>Ask about this on WhatsApp →</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <a
            href={generateWhatsAppUrl('Hello Mashallah Welding Works, I have a question about iron fabrication in Proddatur.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm text-copper hover:text-copper-hover font-bold"
          >
            <span>Have a question not listed here? Ask us directly on WhatsApp</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
