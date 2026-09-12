import { useEffect } from 'react';

let globalLenis = null;

export function getLenis() {
  return globalLenis;
}

export function scrollToTop(immediate = true) {
  if (globalLenis) {
    globalLenis.scrollTo(0, { immediate });
  } else {
    window.scrollTo(0, 0);
  }
}

export default function useLenis() {
  useEffect(() => {
    let lenisInstance = null;
    let updateTicker = null;
    let cleanupGsap = null;
    let isCancelled = false;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileTouchQuery = window.matchMedia('(max-width: 767px) and (pointer: coarse)');

    const shouldEnableLenis = () => {
      if (reducedMotionQuery.matches) return false;
      if (mobileTouchQuery.matches) return false;
      return true;
    };

    const startLenis = async () => {
      if (lenisInstance || isCancelled) return;

      try {
        const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
          import('lenis'),
          import('../lib/gsap')
        ]);

        if (isCancelled || lenisInstance) return;

        lenisInstance = new Lenis({
          duration: 1.0,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1,
          syncTouch: false,
        });

        globalLenis = lenisInstance;
        lenisInstance.on('scroll', ScrollTrigger.update);

        updateTicker = (time) => {
          if (lenisInstance) {
            lenisInstance.raf(time * 1000);
          }
        };

        gsap.ticker.add(updateTicker);
        cleanupGsap = () => {
          gsap.ticker.remove(updateTicker);
        };
      } catch {
        // Fallback gracefully
      }
    };

    const stopLenis = () => {
      if (cleanupGsap) {
        cleanupGsap();
        cleanupGsap = null;
      }
      updateTicker = null;
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
      }
      globalLenis = null;
    };

    const syncState = () => {
      if (shouldEnableLenis()) {
        startLenis();
      } else {
        stopLenis();
      }
    };

    syncState();

    const handleQueryChange = () => syncState();

    if (reducedMotionQuery.addEventListener) {
      reducedMotionQuery.addEventListener('change', handleQueryChange);
      mobileTouchQuery.addEventListener('change', handleQueryChange);
    } else {
      reducedMotionQuery.addListener(handleQueryChange);
      mobileTouchQuery.addListener(handleQueryChange);
    }

    return () => {
      isCancelled = true;
      if (reducedMotionQuery.removeEventListener) {
        reducedMotionQuery.removeEventListener('change', handleQueryChange);
        mobileTouchQuery.removeEventListener('change', handleQueryChange);
      } else {
        reducedMotionQuery.removeListener(handleQueryChange);
        mobileTouchQuery.removeListener(handleQueryChange);
      }
      stopLenis();
    };
  }, []);
}



