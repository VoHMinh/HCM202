import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export { gsap, useGSAP };

export function useGsapScope() {
  const container = useRef<HTMLDivElement>(null);
  return { container, gsap };
}
