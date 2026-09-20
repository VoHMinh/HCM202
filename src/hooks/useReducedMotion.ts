import { useEffect, useState } from 'react';
import { useJourney } from '@/store/useJourney';

export function useReducedMotion(): boolean {
  const storeReduced = useJourney((state) => state.reducedMotion);
  const [systemReduced, setSystemReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setSystemReduced(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemReduced(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return storeReduced || systemReduced;
}
