import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Shield,
  Check,
  Phone,
  ArrowRight,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  Building,
  Home,
} from 'lucide-react';
import { PageSeo } from '../components/PageSeo';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';

export const AboutPage: React.FC = () => {
  return (
    <>
      <PageSeo
        title="About Mashallah Welding Works | Proddatur"
        description="Learn about Mashallah Welding Works in Auto Nagar, Proddatur. Heavy-gauge mild steel fabrication, precision on-site measurements, and durable repairs."
      />

      {/* Main About Story Section */}
      <section className="pt-28 pb-16 bg-light-bg text-dark-text border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-dark-text">
              Dedicated Metal Craftsmen in Auto Nagar, Proddatur
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              Reliable, durable, and practical iron fabrication tailored to your exact architectural and structural specifications.
            </p>
          </div>

          {/* Workshop Showcase Banner */}
          <div className="mb-14 bg-white rounded-2xl sm:rounded-3xl border border-light-border overflow-hidden shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 relative min-h-[240px] sm:min-h-[320px] lg:min-h-[380px] bg-stone-900 overflow-hidden">
                <img
                  src="/images/mashallah-welding-workshop-proddatur.webp"
                  alt="Mashallah Welding Works workshop in Auto Nagar, Proddatur where custom gates, grills, railings, and repair projects are carried out"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="lg:col-span-5 p-6 sm:p-7 lg:p-8 flex flex-col justify-between bg-white space-y-5">
                <div className="space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-copper">
                      <Wrench className="w-4 h-4" />
                      <span>Fabrication Facility</span>
                    </div>
                    <span className="inline-flex items-center text-xs font-semibold text-stone-600">
                      <MapPin className="w-3.5 h-3.5 text-copper mr-1 shrink-0" />
                      Auto Nagar, Proddatur
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-dark-text tracking-tight">
                    Our Workshop in Auto Nagar
                  </h2>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-5 text-stone-700 leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-bold text-dark-text">
                Transforming Raw Metal into Long-Lasting Protection & Elegance
              </h2>
              <p>
                At <strong className="text-dark-text font-semibold">Mashallah Welding Works</strong>, we understand that iron structures are not just functional fittings—they are the primary shield for your family, property, and business investments.
              </p>
              <p>
                Backed by hands-on metal fabrication experience, our workshop specializes in converting solid mild steel, heavy angle iron, and hollow structural sections into made-to-requirement gates, grills, railings, and heavy machinery stands.
              </p>
              <div className="bg-white border-l-4 border-copper p-4 rounded-r-lg text-dark-text shadow-xs border-y border-r border-light-border text-sm leading-relaxed">
                <strong>Both New Fabrication & Fast Repair Services:</strong> Whether you are constructing a new residence in Proddatur and need complete custom iron fittings, or have an existing sagging gate, detached grill, or broken hinge that needs fast on-site repair, our workshop delivers prompt, honest, and high-quality workmanship.
              </div>

              {/* Fabrication Standards */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm">
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

              {/* Residential & Commercial Scope */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-light-border shadow-xs">
                  <div className="flex items-center space-x-2.5 mb-2">
                    <Home className="w-5 h-5 text-copper" />
                    <h3 className="font-bold text-dark-text text-base">Residential Work</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Custom main gates (sliding and swing), burglar-resistant window safety grills, staircase railings, and balcony safety balustrades.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-light-border shadow-xs">
                  <div className="flex items-center space-x-2.5 mb-2">
                    <Building className="w-5 h-5 text-copper" />
                    <h3 className="font-bold text-dark-text text-base">Commercial & Utility</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Heavy sheet metal shop doors, rooftop water tank stands, AC outdoor cage frames, industrial generator stands, and structural shed fittings.
                  </p>
                </div>
              </div>
            </div>

            {/* Proprietor & Service Area Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-light-border relative">
                <div className="flex items-center space-x-4 mb-5">
                  <div className="w-16 h-16 rounded-xl bg-warm-tint text-copper flex items-center justify-center font-extrabold text-2xl border border-light-border">
                    KC
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-copper block">
                      Lead Fabricator & Customer Enquiries
                    </span>
                    <h3 className="text-xl font-bold text-dark-text">{BUSINESS_INFO.leadFabricator}</h3>
                    <span className="text-xs text-stone-500 block">
                      Mashallah Welding Works • Proprietor: {BUSINESS_INFO.proprietor}
                    </span>
                  </div>
                </div>

                <blockquote className="text-stone-600 text-sm italic border-l-2 border-copper pl-3.5 py-1 mb-6 leading-relaxed">
                  “Every gate and grill that leaves our Auto Nagar workshop is welded with pride and structural discipline. We stand by our work to ensure dependable, long-term durability for your property.”
                </blockquote>

                <div className="space-y-2.5 pt-3 border-t border-light-border">
                  <a
                    href={BUSINESS_INFO.phoneTel}
                    className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-copper hover:bg-copper-hover text-white text-sm font-bold shadow-xs transition-colors min-h-[44px] whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 mr-2 text-white shrink-0" />
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

              {/* Service Area Card */}
              <div className="bg-white rounded-2xl p-6 border border-light-border shadow-xs space-y-3">
                <div className="flex items-center space-x-2 text-dark-text">
                  <MapPin className="w-5 h-5 text-copper" />
                  <h3 className="font-bold text-base">Service Area & Workshop Location</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Located in the industrial fabrication sector of Auto Nagar, Proddatur. We provide on-site measurement, delivery, and installation services across Proddatur and neighboring areas of Kadapa district.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-stone-600">
                  <span className="px-2.5 py-1 bg-stone-100 rounded-md border border-light-border">Auto Nagar</span>
                  <span className="px-2.5 py-1 bg-stone-100 rounded-md border border-light-border">Proddatur Town</span>
                  <span className="px-2.5 py-1 bg-stone-100 rounded-md border border-light-border">Kadapa District</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Highlights Pillars */}
      <WhyChooseUs />

      {/* Cross-linking navigation strip (Dark final CTA area before footer) */}
      <section className="py-14 bg-dark-bg text-[#FAF8F5] border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Explore Our Metalwork or Plan Your Project
          </h2>
          <p className="text-stone-300 text-sm max-w-xl mx-auto mb-6">
            Review completed projects in our portfolio or get in touch for on-site consultation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/our-work"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-copper hover:bg-copper-hover text-white font-bold text-sm shadow-xs transition-colors"
            >
              <span>View Our Work Gallery</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#22272C] hover:bg-stone-800 text-stone-200 border border-dark-border font-semibold text-sm transition-colors"
            >
              <span>View All Services</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#22272C] hover:bg-stone-800 text-stone-200 border border-dark-border font-semibold text-sm transition-colors"
            >
              <span>Contact & Workshop Map</span>
            </Link>
          </div>
        </div>
      </section>

    </>
  );
};
