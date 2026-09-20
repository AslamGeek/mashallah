import React from 'react';
import { ShieldCheck, Ruler, Clock, Coins, Wrench, Sparkles, Award, ThumbsUp } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

export const WhyChooseUs: React.FC = () => {
  const highlights = [
    {
      icon: ShieldCheck,
      title: 'Heavy-Gauge Raw Iron',
      desc: 'We never compromise on metal thickness. We use structural mild steel, solid bars, and quality angle iron sections built for long-term durability.',
    },
    {
      icon: Ruler,
      title: 'Precision On-Site Measurements',
      desc: 'We personally take and verify exact on-site measurements, ensuring zero gaps, seamless gate swings, and flush grill anchorings.',
    },
    {
      icon: Clock,
      title: 'Fast Turnaround on Repairs',
      desc: 'Broken hinges, misaligned gates, or detached grills receive rapid on-site repair visits across Auto Nagar and Proddatur so your security is never at risk.',
    },
    {
      icon: Coins,
      title: 'Honest, Transparent Pricing',
      desc: 'No hidden charges or inflated raw material markups. Clear quotes based on metal weight, design complexity, and installation needs.',
    },
    {
      icon: Award,
      title: 'Anti-Rust Primer Application',
      desc: 'Every fabricated item receives red oxide/zinc-chromate anti-corrosive primer before delivery to guard against monsoon weathering and rust.',
    },
    {
      icon: ThumbsUp,
      title: 'Experienced Welder',
      desc: 'Hands-on metal fabrication experience with smooth grinding, clean seam welds, and structural strength built to withstand daily usage.',
    },
  ];

  return (
    <section id="highlights" className="py-20 bg-light-bg text-dark-text border-b border-light-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-stone-200/80 border border-light-border text-stone-700 text-xs font-bold uppercase tracking-wider">
            <span>Why Mashallah Welding Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark-text">
            Built for Strength, Security & Longevity
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Local property owners trust our workshop for dependable metal fabrication that stands firm against time, weather, and wear.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-light-border hover:border-copper/70 transition-all flex flex-col group shadow-xs hover:shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-light-bg text-copper border border-light-border flex items-center justify-center mb-4 group-hover:bg-copper group-hover:text-white transition-colors shrink-0">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-lg font-bold text-dark-text mb-2 group-hover:text-copper transition-colors">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
