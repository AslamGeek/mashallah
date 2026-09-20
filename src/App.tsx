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
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. About Mashallah Welding Works */}
        <About />

        {/* 4. Services */}
        <Services />

        {/* 5. Our Work / Gallery */}
        <Gallery />

        {/* 6. Why Choose Us / Business Highlights */}
        <WhyChooseUs />

        {/* 7. Pinterest / Social Work Showcase */}
        <SocialShowcase />

        {/* 8 & 9. Business Hours & Location / Google Maps */}
        <LocationHours />

        {/* 10. Contact Section */}
        <ContactSection />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* 12. Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Mobile Sticky 1-Tap Action Bar (Call, WhatsApp, Directions) */}
      <MobileStickyBar />
    </div>
  );
}
