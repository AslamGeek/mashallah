import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { WhyChooseUs } from './components/WhyChooseUs';
import { SocialShowcase } from './components/SocialShowcase';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-dark-text selection:bg-copper selection:text-white">
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

        {/* 7. FAQs Section */}
        <FaqSection />

        {/* 8. Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky 1-Tap Action Bar (Call, WhatsApp, Directions) */}
      <MobileStickyBar />
    </div>
  );
}
