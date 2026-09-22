import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SiteLayout } from './layouts/SiteLayout';
import { HomePage } from './pages/HomePage';

// Lazy-load secondary pages to optimize initial bundle size while keeping HomePage eager
const OurWorkPage = lazy(() =>
  import('./pages/OurWorkPage').then((module) => ({ default: module.OurWorkPage }))
);
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((module) => ({ default: module.ServicesPage }))
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((module) => ({ default: module.AboutPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((module) => ({ default: module.ContactPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage }))
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/our-work" element={<OurWorkPage />} />
          <Route path="/our-work/:categorySlug" element={<OurWorkPage />} />
          <Route path="/portfolio" element={<Navigate to="/our-work" replace />} />
          <Route path="/portfolio/:projectSlug" element={<OurWorkPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:serviceSlug" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
