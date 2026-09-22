import { useEffect, useRef } from 'react';

export interface UseModalOverlayOptions {
  isOpen: boolean;
  onClose: () => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  restoreFocusRef?: React.RefObject<HTMLElement | null>;
  containerRef?: React.RefObject<HTMLElement | null>;
}

// Module-level state to handle single or nested modals without scroll jumping
let activeModalCount = 0;
let preservedScrollY = 0;
let originalOverflow = '';
let originalPaddingRight = '';

export function useModalOverlay({
  isOpen,
  onClose,
  onKeyDown,
  initialFocusRef,
  restoreFocusRef,
  containerRef,
}: UseModalOverlayOptions) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const onKeyDownRef = useRef(onKeyDown);
  onKeyDownRef.current = onKeyDown;

  const initialFocusRefLatest = useRef(initialFocusRef);
  initialFocusRefLatest.current = initialFocusRef;

  const restoreFocusRefLatest = useRef(restoreFocusRef);
  restoreFocusRefLatest.current = restoreFocusRef;

  const containerRefLatest = useRef(containerRef);
  containerRefLatest.current = containerRef;

  const triggerElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Capture the trigger element for focus restoration if not explicitly provided
    if (restoreFocusRefLatest.current?.current) {
      triggerElementRef.current = restoreFocusRefLatest.current.current;
    } else if (document.activeElement instanceof HTMLElement) {
      triggerElementRef.current = document.activeElement;
    }

    // Only lock and compensate when transitioning from 0 to 1 open modals
    if (activeModalCount === 0) {
      preservedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
      originalOverflow = document.body.style.overflow;
      originalPaddingRight = document.body.style.paddingRight;

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      document.body.style.overflow = 'hidden';
    }

    activeModalCount++;

    // Focus close button or initial focus element with preventScroll to ensure background doesn't move
    const focusTimer = setTimeout(() => {
      if (initialFocusRefLatest.current?.current) {
        initialFocusRefLatest.current.current.focus({ preventScroll: true });
      }
    }, 40);

    const handleWindowKeyDown = (e: KeyboardEvent) => {
      // Allow custom key handler (e.g. ArrowLeft, ArrowRight)
      if (onKeyDownRef.current) {
        onKeyDownRef.current(e);
        if (e.defaultPrevented) return;
      }

      // Escape key closes modal
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
        return;
      }

      // Tab trap inside modal container
      if (e.key === 'Tab' && containerRefLatest.current?.current) {
        const container = containerRefLatest.current.current;
        const focusables = container.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleWindowKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleWindowKeyDown);

      activeModalCount = Math.max(0, activeModalCount - 1);

      // Only unlock when all modals have closed
      if (activeModalCount === 0) {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;

        // Restore exact previous scroll position instantly
        window.scrollTo({
          top: preservedScrollY,
          left: 0,
          behavior: 'instant' as ScrollBehavior,
        });

        // Restore focus with preventScroll
        const targetToFocus = restoreFocusRefLatest.current?.current || triggerElementRef.current;
        if (targetToFocus && typeof targetToFocus.focus === 'function') {
          targetToFocus.focus({ preventScroll: true });
        }
      }
    };
  }, [isOpen]);
}
