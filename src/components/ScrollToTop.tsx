import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    const prev = prevPathnameRef.current;
    const curr = pathname;
    prevPathnameRef.current = curr;

    if (hash) {
      // Small timeout to allow target element to be mounted in the DOM
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
      return () => clearTimeout(timer);
    }

    // Modal-only route check: /portfolio/:projectSlug
    const isProjectModalRoute = (path: string | null) =>
      !!path && path.startsWith('/portfolio/') && path !== '/portfolio';

    if (prev !== null) {
      const wasModal = isProjectModalRoute(prev);
      const isModal = isProjectModalRoute(curr);

      // Skip scroll-to-top for modal navigation:
      // 1. Opening modal: from page to /portfolio/:projectSlug
      // 2. Next/Prev modal: between /portfolio/:slugA and /portfolio/:slugB
      // 3. Closing modal: from /portfolio/:projectSlug back to /our-work or origin page
      if (
        (isModal && !wasModal) ||
        (isModal && wasModal) ||
        (wasModal && (curr === '/our-work' || curr.startsWith('/our-work') || curr === '/'))
      ) {
        return;
      }
    }

    // Standard page-to-page navigation: scroll instantly to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname, hash]);

  return null;
};

