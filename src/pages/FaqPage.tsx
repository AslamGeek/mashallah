import React from 'react';
import { PageSeo } from '../components/PageSeo';
import { FaqSection } from '../components/FaqSection';

export const FaqPage: React.FC = () => {
  return (
    <>
      <PageSeo
        title="Welding & Fabrication FAQ | Mashallah Welding Works"
        description="Frequently asked questions about custom iron fabrication, gates, window safety grills, steel gauge, anti-rust primer, pricing, and welding repair in Proddatur."
      />

      {/* Full FAQ Section with top padding for fixed navbar */}
      <FaqSection className="pt-28 pb-16 sm:pb-20" />
    </>
  );
};
