import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import { useLocation } from 'react-router';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextValue {
  scrollTo: (target: string | number | HTMLElement) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => {},
});

function shouldEnableLenis(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const isTouchOnly = coarsePointer || window.innerWidth < 1024;
  return !reducedMotion && !isTouchOnly;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let lenis: Lenis | null = null;
    let rafCallback: ((time: number) => void) | null = null;

    const setup = () => {
      if (lenis) {
        if (rafCallback) {
          gsap.ticker.remove(rafCallback);
          rafCallback = null;
        }
        lenis.destroy();
        lenis = null;
        lenisRef.current = null;
      }

      if (!shouldEnableLenis()) {
        return;
      }

      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1,
      });

      lenisRef.current = lenis;
      lenis.on('scroll', ScrollTrigger.update);

      rafCallback = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(rafCallback);
      gsap.ticker.lagSmoothing(0);
    };

    setup();

    const reducedMotionMq = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    const coarsePointerMq = window.matchMedia('(pointer: coarse)');

    const handleChange = () => {
      setup();
      ScrollTrigger.refresh();
    };

    reducedMotionMq.addEventListener('change', handleChange);
    coarsePointerMq.addEventListener('change', handleChange);

    return () => {
      reducedMotionMq.removeEventListener('change', handleChange);
      coarsePointerMq.removeEventListener('change', handleChange);
      if (rafCallback) {
        gsap.ticker.remove(rafCallback);
      }
      if (lenis) {
        lenis.destroy();
      }
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(el, { offset: -72 });
        } else {
          el.scrollIntoView({ behavior: 'auto' });
        }
        return;
      }
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    const frame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  const scrollTo = useCallback((target: string | number | HTMLElement) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: typeof target === 'number' ? 0 : -64 });
      return;
    }

    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
      return;
    }

    const el =
      typeof target === 'string' ? document.querySelector(target) : target;
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const value = useMemo(() => ({ scrollTo }), [scrollTo]);

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSmoothScroll(): SmoothScrollContextValue {
  return useContext(SmoothScrollContext);
}
