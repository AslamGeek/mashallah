import React from 'react';
import { Home, Store, Building2, School, Factory, Wrench, Shield, Check, Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, generateWhatsAppUrl } from '../data/content';

export const About: React.FC = () => {
  const clientSectors = [
    {
      icon: Home,
      title: 'Homes & Residences',
      desc: 'Main gates, window safety grills, staircase balustrades, balcony railings, and security mesh doors.',
    },
    {
      icon: Store,
      title: 'Shops & Retail',
      desc: 'Entrance shutters, display stands, security gates, overhead sign brackets, and merchandise racks.',
    },
    {
      icon: Building2,
      title: 'Commercial Businesses',
      desc: 'Office partition frames, safety doors, warehouse storage racks, and structural access ladders.',
    },
    {
      icon: School,
      title: 'Institutions & Schools',
      desc: 'Perimeter boundary fence grills, campus gates, bench frames, and sturdy protective barriers.',
    },
    {
      icon: Factory,
      title: 'Small Industrial Units',
      desc: 'Shed trusses, machine mountings, heavy material trolleys, and structural welding support.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-stone-100 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <span>About Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
            Dedicated Metal Craftsmen in Auto Nagar, Kottapalle
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Reliable, durable, and practical iron fabrication tailored to your exact architectural and structural specifications.
          </p>
        </div>

        {/* Story & Proprietor Highlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-5 text-stone-700 leading-relaxed">
            <h3 className="text-2xl font-bold text-stone-900">
              Transforming Raw Metal into Long-Lasting Protection & Elegance
            </h3>
            <p>
              At <strong className="text-stone-900 font-semibold">Mashallah Welding Works</strong>, we understand that iron structures are not just functional fittings—they are the primary shield for your family, property, and business investments.
            </p>
            <p>
              Under the experienced guidance of proprietor and master craftsman{' '}
              <strong className="text-stone-900 font-semibold">{BUSINESS_INFO.proprietor}</strong>, our workshop specializes in converting high-grade raw mild steel and iron into made-to-requirement gates, grills, railings, and heavy stands.
            </p>
            <p className="bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-r-lg text-stone-800 text-sm">
              <strong>Both New Fabrication & Repair Services:</strong> Whether you are constructing a new home and need complete custom iron fittings, or have an existing sagging gate or broken hinge that needs fast on-site repair, our workshop delivers prompt, honest, and high-quality workmanship.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Heavy-gauge, certified iron materials</span>
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

          {/* Proprietor Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-lg border border-stone-200/90 relative">
              <div className="flex items-center space-x-4 mb-5">
                <div className="w-16 h-16 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center font-extrabold text-2xl shadow-inner border border-stone-800">
                  AS
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
                    Proprietor & Master Welder
                  </span>
                  <h4 className="text-xl font-bold text-stone-900">{BUSINESS_INFO.proprietor}</h4>
                  <span className="text-xs text-stone-500 block">
                    Mashallah Welding Works, Kottapalle
                  </span>
                </div>
              </div>

              <blockquote className="text-stone-600 text-sm italic border-l-2 border-amber-400 pl-3.5 py-1 mb-6">
                “Every gate and grill that leaves our Auto Nagar workshop is welded with pride and structural discipline. We stand by our work so that you and your property stay safe for decades.”
              </blockquote>

              <div className="space-y-2.5 pt-3 border-t border-stone-100">
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2 text-amber-400" />
                  Call Abdul Sattar: {BUSINESS_INFO.phone}
                </a>
                <a
                  href={generateWhatsAppUrl('Hello Abdul Sattar ji, I would like to discuss an iron fabrication requirement.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Direct Enquiry
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sectors Served Grid */}
        <div className="pt-4">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              Tailored Metal Solutions Across Every Sector
            </h3>
            <p className="text-sm text-stone-500 mt-1">
              Custom fabrication and repairs for private residences, commercial shops, and industrial facilities
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {clientSectors.map((sector, index) => {
              const Icon = sector.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-5 border border-stone-200/80 hover:border-amber-400 transition-colors shadow-sm flex flex-col"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3.5 shrink-0 border border-amber-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-base mb-1.5">{sector.title}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed mt-auto">{sector.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
