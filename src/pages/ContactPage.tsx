import React from 'react';
import { PageSeo } from '../components/PageSeo';
import { ContactSection } from '../components/ContactSection';
import { BUSINESS_INFO } from '../data/content';

export const ContactPage: React.FC = () => {
  return (
    <>
      <PageSeo
        title="Contact Mashallah Welding Works | Proddatur"
        description={`Contact Abdul Sattar at Mashallah Welding Works in Auto Nagar, Proddatur for custom iron gates, window safety grills, staircase railings, and emergency welding repairs. Phone: ${BUSINESS_INFO.phoneFormatted}.`}
      />

      {/* Main Contact Section with top padding for fixed header */}
      <ContactSection className="pt-28 pb-16 sm:pb-20" />
    </>
  );
};
