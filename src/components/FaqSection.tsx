import React, { useState, useId } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  Phone,
  MessageCircle,
  ShieldCheck,
  Wrench,
  Palette,
  Sparkles,
  X,
} from 'lucide-react';
import { FAQS_LIST, BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';
import { FaqItem } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

type CategoryFilter = 'all' | 'general' | 'custom' | 'repairs' | 'materials';

const CATEGORIES: { id: CategoryFilter; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'all', label: 'All Questions', icon: HelpCircle },
  { id: 'custom', label: 'Custom & Designs', icon: Palette },
  { id: 'repairs', label: 'Repairs & On-Site', icon: Wrench },
  { id: 'materials', label: 'Materials & Anti-Rust', icon: ShieldCheck },
  { id: 'general', label: 'Orders & Workshop', icon: Sparkles },
];

interface FaqSectionProps {
  className?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  className = 'py-16 sm:py-20 lg:py-24',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputId = useId();

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenIds(filteredFaqs.map((f) => f.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  const filteredFaqs = FAQS_LIST.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'all' || faq.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="faq"
      className={`${className} bg-dark-bg text-[#F5F3EE] border-t border-dark-border scroll-mt-20`}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Badge & Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gunmetal border border-dark-border text-copper text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <HelpCircle className="w-4 h-4 text-copper" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Got Questions About Our <span className="text-copper">Iron Fabrication</span>?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-muted-text leading-relaxed">
            Clear, honest answers about our custom welding processes, pricing estimates, on-site measurements, material standards, and repair services in Proddatur.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="mb-8 space-y-4">
          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <label htmlFor={searchInputId} className="sr-only">
              Search frequently asked questions
            </label>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-text pointer-events-none" />
              <input
                id={searchInputId}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g. gates, pricing, anti-rust, repairs, timings)..."
                className="w-full pl-11 pr-10 py-3 rounded-xl border border-dark-border bg-gunmetal text-white placeholder:text-muted-text text-sm focus:outline-none focus:ring-2 focus:ring-copper focus:border-copper shadow-xs transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-white p-1 rounded-full"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-xs whitespace-nowrap min-h-[40px] ${
                    isSelected
                      ? 'bg-copper text-white ring-2 ring-copper/40 font-bold'
                      : 'bg-gunmetal border border-dark-border text-muted-text hover:bg-steel hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-muted-text'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Expand / Collapse helpers */}
          <div className="flex items-center justify-between text-xs text-muted-text px-1 pt-1">
            <span>
              Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'}
            </span>
            <div className="space-x-3">
              <button
                type="button"
                onClick={expandAll}
                className="text-muted-text hover:text-copper font-medium underline underline-offset-2"
              >
                Expand all
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={collapseAll}
                className="text-muted-text hover:text-copper font-medium underline underline-offset-2"
              >
                Collapse all
              </button>
            </div>
          </div>
        </div>

        {/* FAQs Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="bg-gunmetal rounded-2xl p-8 text-center border border-dark-border shadow-xs max-w-xl mx-auto">
            <HelpCircle className="w-10 h-10 text-muted-text mx-auto mb-3" />
            <p className="text-base font-bold text-white">No matching questions found</p>
            <p className="text-sm text-muted-text mt-1 mb-4">
              Try searching with different words or reach out to us directly.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="inline-flex items-center px-4 py-2 text-xs font-bold rounded-lg bg-steel text-white hover:bg-dark-border transition-colors border border-dark-border"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-3.5" role="region" aria-label="Frequently Asked Questions List">
            {filteredFaqs.map((faq: FaqItem) => {
              const isOpen = openIds.includes(faq.id);
              const questionId = `faq-q-${faq.id}`;
              const answerId = `faq-a-${faq.id}`;

              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-all duration-200 bg-gunmetal overflow-hidden ${
                    isOpen
                      ? 'border-copper ring-1 ring-copper/40 shadow-md'
                      : 'border-dark-border hover:border-steel shadow-xs'
                  }`}
                >
                  <h3>
                    <button
                      id={questionId}
                      type="button"
                      onClick={() => toggleItem(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      className="w-full flex items-center justify-between text-left px-5 sm:px-6 py-4 sm:py-4.5 text-white hover:text-copper transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-inset"
                    >
                      <span className="font-bold text-base sm:text-lg pr-4 leading-snug">
                        {faq.question}
                      </span>
                      <span
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 ${
                          isOpen
                            ? 'bg-copper text-white rotate-180'
                            : 'bg-steel text-stone-300 hover:bg-dark-border'
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>
                  </h3>

                  {isOpen && (
                    <div
                      id={answerId}
                      role="region"
                      aria-labelledby={questionId}
                      className="px-5 sm:px-6 pb-5 pt-1 text-stone-300 text-sm sm:text-base leading-relaxed border-t border-dark-border bg-steel/30"
                    >
                      <p>{faq.answer}</p>

                      <div className="mt-4 pt-3 border-t border-dark-border flex flex-wrap items-center justify-between gap-3 text-xs">
                        <span className="text-muted-text inline-flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-copper mr-2" />
                          Category:{' '}
                          <span className="font-semibold text-stone-200 ml-1 capitalize">
                            {faq.category}
                          </span>
                        </span>

                        <a
                          href={generateWhatsAppUrl(`Hello, regarding this question: "${faq.question}", I'd like to know more.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/40 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap min-h-[36px]"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                          <span>Ask about this on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Still Have Questions? Banner */}
        <div className="mt-12 bg-gunmetal text-[#F5F3EE] rounded-2xl p-6 sm:p-8 border border-dark-border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1 max-w-xl">
            <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-copper whitespace-nowrap">
              <MessageCircle className="w-3.5 h-3.5 mr-1.5 shrink-0" />
              Direct Master Welder Consultation
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Have a Question We Haven&apos;t Answered?
            </h3>
            <p className="text-muted-text text-sm">
              Get in touch directly with our team for quick answers, quotation advice, or workshop directions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <a
              id="faq-call-cta"
              href={BUSINESS_INFO.phoneTel}
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-sm transition-all shadow-xs active:scale-95 whitespace-nowrap min-h-[44px]"
            >
              <Phone className="w-4 h-4 mr-2 shrink-0" />
              <span>Call Us</span>
            </a>
            <a
              id="faq-whatsapp-cta"
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-xs active:scale-95 whitespace-nowrap min-h-[44px]"
            >
              <WhatsAppIcon className="w-4 h-4 mr-2 shrink-0" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
