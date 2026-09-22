import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileStickyBar } from '../components/MobileStickyBar';
import { ScrollToTop } from '../components/ScrollToTop';

export const SiteLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-light-bg text-dark-text selection:bg-copper selection:text-white">
      <ScrollToTop />
      {/* Top Fixed Header with Route Navigation */}
      <Header />

      {/* Main Page Route Outlet */}
      <main className="flex-grow pb-6 sm:pb-0">
        <Outlet />
      </main>

      {/* Shared Global Footer */}
      <Footer />

      {/* Mobile Sticky Action Bar (Call & WhatsApp) */}
      <MobileStickyBar />
    </div>
  );
};
