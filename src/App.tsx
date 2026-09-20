import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { WhyChooseUs } from './components/WhyChooseUs';
import { SocialShowcase } from './components/SocialShowcase';
import { LocationHours } from './components/LocationHours';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileStickyBar } from './components/MobileStickyBar';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-500 selection:text-white">
      {/* Top Fixed Header with Business Identity and Navigation */}
      <Header />

      {/* Main Page Flow following Section 20 */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Portfolio / Gallery Section (kept just below Hero) */}
        <Gallery />

        {/* 3. About Mashallah Welding Works */}
        <About />

        {/* 4. Services */}
        <Services />

        {/* 5. Why Choose Us / Business Highlights */}
        <WhyChooseUs />

        {/* 6. Pinterest / Social Work Showcase */}
        <SocialShowcase />

        {/* 7. Location & Timings / Google Maps (just above Contact section) */}
        <LocationHours />

        {/* 8. Contact Section */}
        <ContactSection />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Floating WhatsApp Action & Tooltip */}
      <FloatingWhatsApp />

      {/* Mobile Sticky 1-Tap Action Bar (Call, WhatsApp, Directions) */}
      <MobileStickyBar />
    </div>
  );
}
