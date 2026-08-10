import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      
      const scrollToElement = (isInstant = false) => {
        const element = document.getElementById(id);
        if (element) {
          const navbarHeight = 84;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = Math.max(0, elementPosition - navbarHeight);

          window.scrollTo({
            top: offsetPosition,
            behavior: isInstant ? 'auto' : 'smooth'
          });
          return true;
        }
        return false;
      };

      // 1. Immediate scroll on page load to prevent showing banner first
      const found = scrollToElement(true);
      
      if (!found) {
        requestAnimationFrame(() => {
          scrollToElement(true);
        });
      }

      // 2. Smooth micro-adjustment after layout & images settle
      const timer1 = setTimeout(() => scrollToElement(false), 120);
      const timer2 = setTimeout(() => scrollToElement(false), 400);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);

  return null;
}
