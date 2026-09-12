import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Centralized registration of GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  window.ScrollTrigger = ScrollTrigger;
}

export { gsap, ScrollTrigger };
export default gsap;
