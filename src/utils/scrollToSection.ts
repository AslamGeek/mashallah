/**
 * Centralized utility for smooth scrolling to page sections with dynamic
 * fixed header height compensation.
 *
 * @param target - The element ID (e.g., 'about' or '#about') or valid CSS selector.
 */
export function scrollToSection(target: string): void {
  if (typeof window === 'undefined' || !target) return;

  // Support IDs passed with or without leading hash '#', or general CSS selectors
  const cleanId = target.startsWith('#') ? target.slice(1) : target;
  let targetElement = document.getElementById(cleanId);

  if (!targetElement) {
    try {
      targetElement = document.querySelector(target);
    } catch {
      targetElement = null;
    }
  }

  if (!targetElement) {
    return;
  }

  // Derive dynamic header height from rendered header, falling back to 80px if unavailable
  const headerElement =
    document.getElementById('site-header') ||
    document.getElementById('main-header') ||
    document.querySelector('header');

  const headerHeight = headerElement
    ? headerElement.getBoundingClientRect().height
    : 80;

  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior: 'smooth',
  });
}
