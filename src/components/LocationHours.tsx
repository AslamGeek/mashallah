import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Navigation, Phone, MessageCircle, Calendar, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO, getBusinessHoursStatus, generateWhatsAppUrl } from '../data/content';
import { BusinessHoursState } from '../types';

export const LocationHours: React.FC = () => {
  const [hoursStatus, setHoursStatus] = useState<BusinessHoursState>(getBusinessHoursStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setHoursStatus(getBusinessHoursStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const schedule = [
    { day: 'Monday', time: '9:00 AM – 8:00 PM', isWeekend: false },
    { day: 'Tuesday', time: '9:00 AM – 8:00 PM', isWeekend: false },
    { day: 'Wednesday', time: '9:00 AM – 8:00 PM', isWeekend: false },
    { day: 'Thursday', time: '9:00 AM – 8:00 PM', isWeekend: false },
    { day: 'Friday', time: '9:00 AM – 8:00 PM', isWeekend: false },
    { day: 'Saturday', time: '9:00 AM – 8:00 PM', isWeekend: false },
    { day: 'Sunday', time: '9:00 AM – 2:00 PM', isWeekend: true },
  ];

  const currentDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...

  return (
    <section id="location" className="py-20 bg-stone-100 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <span>Location & Timings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
            Visit Our Workshop in Auto Nagar, Kottapalle
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Conveniently situated in the Auto Nagar industrial belt. Walk in during working hours to discuss your project or inspect sample materials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Business Hours & Address Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Real-time Status Card */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-lg">Business Hours</h3>
                    <span className="text-xs text-stone-500">Live Workshop Status</span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                      hoursStatus.isOpen
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-1.5 ${
                        hoursStatus.isOpen ? 'bg-emerald-600 animate-ping' : 'bg-amber-600'
                      }`}
                    />
                    {hoursStatus.statusText}
                  </span>
                </div>
              </div>

              <div className="py-2 text-xs text-stone-600 flex items-center justify-between">
                <span>Today’s Timings:</span>
                <span className="font-bold text-stone-900">{hoursStatus.todayHours}</span>
              </div>
              <div className="pb-4 text-xs text-stone-500 italic">
                {hoursStatus.nextEvent}
              </div>

              {/* Day-by-day table */}
              <div className="space-y-2 pt-2 border-t border-stone-100 text-xs sm:text-sm">
                {schedule.map((item, idx) => {
                  const isToday =
                    (idx === 6 && currentDayIndex === 0) || idx + 1 === currentDayIndex;

                  return (
                    <div
                      key={item.day}
                      className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${
                        isToday
                          ? 'bg-amber-50 text-amber-950 font-bold border border-amber-200'
                          : 'text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <span className="flex items-center">
                        {isToday && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 shrink-0" />
                        )}
                        {item.day}
                        {isToday && (
                          <span className="ml-1.5 text-[10px] uppercase font-bold text-amber-700 bg-amber-200/60 px-1.5 py-0.5 rounded">
                            Today
                          </span>
                        )}
                      </span>
                      <span className={item.isWeekend ? 'text-amber-800 font-semibold' : 'text-stone-800'}>
                        {item.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Address & Quick Directions Button */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-base">Workshop Location</h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                    {BUSINESS_INFO.address}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  id="location-get-directions-btn"
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-sm transition-colors"
                >
                  <Navigation className="w-4 h-4 mr-2 text-amber-400" />
                  Get Directions in Google Maps
                </a>
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm border border-stone-200 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-1.5 text-amber-600" />
                  Call Shop
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Display & Navigation Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-sm overflow-hidden flex flex-col">
              {/* Map embed container */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/11] rounded-xl overflow-hidden bg-stone-200 border border-stone-300">
                {/* Embedded responsive Google Map iframe for Kottapalle Auto Nagar */}
                <iframe
                  title="Mashallah Welding Works Map Location"
                  src="https://maps.google.com/maps?q=11/276,%20MG,%20Lakshmi%20Nagar,%20Auto%20Nagar,%20Kottapalle,%20Andhra%20Pradesh%20516360&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Overlaid location tag */}
                <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-sm text-stone-100 p-2.5 rounded-lg border border-stone-700/80 shadow-md text-left max-w-xs">
                  <span className="block text-xs font-bold text-amber-400">
                    Mashallah Welding Works
                  </span>
                  <span className="block text-[11px] text-stone-300">
                    Auto Nagar, Kottapalle, AP
                  </span>
                </div>
              </div>

              {/* Bottom map actions */}
              <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                <div>
                  <span className="text-xs font-bold text-stone-800 block">
                    Google Maps Pin: Mashallah Welding Works
                  </span>
                  <span className="text-xs text-stone-500 block">
                    11/276, MG, Lakshmi Nagar, Auto Nagar, Kottapalle, Andhra Pradesh 516360
                  </span>
                </div>

                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-sm transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 mr-1.5" />
                  Open in Google Maps App
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
