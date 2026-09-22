import React from 'react';
import { PageSeo } from '../components/PageSeo';
import { Hero } from '../components/Hero';
import { HomeFeaturedProjects } from '../components/home/HomeFeaturedProjects';
import { HomeServices } from '../components/home/HomeServices';
import { HomeWhyChooseUs } from '../components/home/HomeWhyChooseUs';
import { HomeHowItWorks } from '../components/home/HomeHowItWorks';
import { HomeWorkshopInfo } from '../components/home/HomeWorkshopInfo';
import { HomeFAQSection } from '../components/home/HomeFAQSection';
import { HomeFinalCTA } from '../components/home/HomeFinalCTA';

export const HomePage: React.FC = () => {
  return (
    <>
      <PageSeo
        title="Mashallah Welding Works | Custom Iron Fabrication & Welding in Proddatur"
        description="Custom iron fabrication, electric arc welding, and on-site repair works in Auto Nagar, Proddatur. Heavy-gauge iron gates, window safety grills, staircase railings, and custom metalwork by Mashallah Welding Works."
      />

      {/* 1. Hero: Core Offer & Direct CTAs */}
      <Hero />

      {/* 2. Proof: Top Real Fabrication Projects */}
      <HomeFeaturedProjects />

      {/* 3. Services: Core Services derived from SERVICES_LIST */}
      <HomeServices />

      {/* 4. Trust: Why Choose Us Craftsmanship Pillars */}
      <HomeWhyChooseUs />

      {/* 5. How It Works: 4-Step Fabrication Process */}
      <HomeHowItWorks />

      {/* 6. Workshop Location, Hours & Interactive Map */}
      <HomeWorkshopInfo />

      {/* 7. FAQ Objection Handling */}
      <HomeFAQSection />

      {/* 8. Final WhatsApp-Focused Conversion CTA */}
      <HomeFinalCTA />
    </>
  );
};
