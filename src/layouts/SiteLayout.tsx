import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileStickyBar } from '../components/MobileStickyBar';
import { ScrollToTop } from '../components/ScrollToTop';

const PageLoadingFallback: React.FC = () => (
  <div
    className="min-h-[50vh] flex items-center justify-center py-16"
    role="status"
    aria-label="Loading page"
  >
    <div className="w-8 h-8 rounded-full border-2 border-stone-200 border-t-copper animate-spin" />
  </div>
);

export const SiteLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-light-bg text-dark-text selection:bg-copper selection:text-white">
      <ScrollToTop />
      {/* Top Fixed Header with Route Navigation */}
      <Header />

      {/* Main Page Route Outlet with Suspense boundary */}
      <main className="flex-grow pb-6 sm:pb-0">
        <Suspense fallback={<PageLoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>

      {/* Shared Global Footer */}
      <Footer />

      {/* Mobile Sticky Action Bar (Call & WhatsApp) */}
      <MobileStickyBar />
    </div>
  );
};

