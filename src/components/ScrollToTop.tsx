import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');

      const getTargetY = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        const headerOffset = window.innerWidth < 768 ? 75 : 95;
        return Math.max(0, rect.top + window.scrollY - headerOffset);
      };

      const performScroll = (behavior: ScrollBehavior = 'instant') => {
        const el = document.getElementById(id);
        if (el) {
          const targetY = getTargetY(el);
          window.scrollTo({ top: targetY, behavior });
          return true;
        }
        return false;
      };

      // 1. Instant positioning BEFORE browser paint (prevents banner flash)
      if (!performScroll('instant')) {
        let retries = 0;
        const checkAndScroll = () => {
          if (!performScroll('instant') && retries < 15) {
            retries++;
            requestAnimationFrame(checkAndScroll);
          }
        };
        requestAnimationFrame(checkAndScroll);
      }

      // 2. Secondary check after layout & images settle for pixel-perfect targeting
      const timer1 = setTimeout(() => performScroll('instant'), 100);
      const timer2 = setTimeout(() => performScroll('smooth'), 300);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}
