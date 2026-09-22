import React from 'react';
import { Wrench, Shield, Check, Phone, MapPin, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-light-bg text-dark-text border-b border-light-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-stone-200/80 border border-light-border text-stone-700 text-xs font-bold uppercase tracking-wider">
            <span>About Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-text">
            Dedicated Metal Craftsmen in Auto Nagar, Proddatur
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Reliable, durable, and practical iron fabrication tailored to your exact architectural and structural specifications.
          </p>
        </div>

        {/* Workshop Showcase Banner */}
        <div className="mb-14 bg-white rounded-2xl sm:rounded-3xl border border-light-border overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <a
              href="/images/mashallah-welding-workshop-proddatur.webp"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:col-span-7 relative min-h-[240px] sm:min-h-[320px] lg:min-h-[380px] bg-stone-900 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper block group/about overflow-hidden"
              aria-label="Open full-resolution photo of Mashallah Welding Works workshop in a new tab"
            >
              <img
                src="/images/mashallah-welding-workshop-proddatur.webp"
                alt="Mashallah Welding Works workshop in Auto Nagar, Proddatur where custom gates, grills, railings, and repair projects are carried out"
                width={1200}
                height={800}
                className="w-full h-full object-cover object-center group-hover/about:scale-105 transition-transform duration-300"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 bg-gunmetal/90 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-dark-border/60 flex items-center space-x-1.5 shadow-md pointer-events-none whitespace-nowrap">
                <MapPin className="w-3.5 h-3.5 text-copper shrink-0" />
                <span>Auto Nagar, Proddatur</span>
              </div>
              <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 px-3 py-1.5 rounded-lg bg-dark-bg/90 backdrop-blur-xs text-white border border-dark-border text-xs font-bold flex items-center space-x-1.5 shadow-md pointer-events-none whitespace-nowrap">
                <ExternalLink className="w-3.5 h-3.5 text-copper shrink-0" />
                <span>View full photo</span>
              </div>
            </a>
            <div className="lg:col-span-5 p-6 sm:p-7 lg:p-8 flex flex-col justify-between bg-white space-y-5">
              <div className="space-y-3.5">
                <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-copper">
                  <Wrench className="w-4 h-4" />
                  <span>Fabrication Facility</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-dark-text tracking-tight">
                  Our Workshop in Auto Nagar
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  This is the Mashallah Welding Works workshop in Proddatur, where custom gates, grills, railings, repair work, and other welding/fabrication projects are carried out.
                </p>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  Equipped for precision steel cutting, arc welding, and structural assembly, our workshop manages every fabrication stage locally with heavy-gauge materials and anti-rust protection for lasting durability.
                </p>
              </div>

              <div className="pt-4 border-t border-light-border flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
                <span className="font-bold text-dark-text whitespace-nowrap">Workshop Hours:</span>
                <span className="font-semibold text-stone-700 whitespace-nowrap">Mon–Sat: 9:00 AM – 8:00 PM</span>
                <span className="hidden sm:inline text-stone-400" aria-hidden="true">•</span>
                <span className="font-semibold text-stone-700 whitespace-nowrap">Sun: 9:00 AM – 2:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story & Proprietor Highlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-stone-700 leading-relaxed">
            <h3 className="text-2xl font-bold text-dark-text">
              Transforming Raw Metal into Long-Lasting Protection & Elegance
            </h3>
            <p>
              At <strong className="text-dark-text font-semibold">Mashallah Welding Works</strong>, we understand that iron structures are not just functional fittings—they are the primary shield for your family, property, and business investments.
            </p>
            <p>
              Backed by hands-on fabrication experience, our workshop specializes in converting solid mild steel and iron into made-to-requirement gates, grills, railings, and heavy stands.
            </p>
            <p className="bg-white border-l-4 border-copper p-4 rounded-r-lg text-dark-text shadow-xs border-y border-r border-light-border text-sm">
              <strong>Both New Fabrication & Repair Services:</strong> Whether you are constructing a new home and need complete custom iron fittings, or have an existing sagging gate or broken hinge that needs fast on-site repair, our workshop delivers prompt, honest, and high-quality workmanship.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Heavy-gauge structural iron materials</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Accurate on-site measurement visits</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Anti-rust primer coating before painting</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Clean, high-penetration weld joints</span>
              </div>
            </div>
          </div>

          {/* Lead Fabricator Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-light-border relative">
              <div className="flex items-center space-x-4 mb-5">
                <div className="w-16 h-16 rounded-xl bg-gunmetal text-copper flex items-center justify-center font-extrabold text-2xl border border-dark-border">
                  KC
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-copper block">
                    Lead Fabricator & Customer Enquiries
                  </span>
                  <h4 className="text-xl font-bold text-dark-text">{BUSINESS_INFO.leadFabricator}</h4>
                  <span className="text-xs text-stone-500 block">
                    Mashallah Welding Works • Proprietor: {BUSINESS_INFO.proprietor}
                  </span>
                </div>
              </div>

              <blockquote className="text-stone-600 text-sm italic border-l-2 border-copper pl-3.5 py-1 mb-6">
                “Every gate and grill that leaves our Auto Nagar workshop is welded with pride and structural discipline. We stand by our work to ensure dependable, long-term durability for your property.”
              </blockquote>

              <div className="space-y-2.5 pt-3 border-t border-light-border">
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-gunmetal hover:bg-steel text-white text-sm font-semibold transition-colors border border-dark-border min-h-[44px] whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 mr-2 text-copper shrink-0" />
                  <span>Call Now</span>
                </a>
                <a
                  href={generateWhatsAppUrl('Hello, I would like to discuss an iron fabrication requirement.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors min-h-[44px] whitespace-nowrap"
                >
                  <WhatsAppIcon className="w-4 h-4 mr-2 shrink-0" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
