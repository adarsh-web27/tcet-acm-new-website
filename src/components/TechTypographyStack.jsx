import React, { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export default function TechTypographyStack() {
  const containerRef = useRef(null);
  const topOuterRef = useRef(null);
  const topInnerRef = useRef(null);
  const centerLineRef = useRef(null);
  const bottomInnerRef = useRef(null);
  const bottomOuterRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'bottom 20%',
          scrub: 0.6,
        }
      });

      // Kinetic vertical expansion on scroll
      tl.fromTo(topOuterRef.current, 
        { y: 25, opacity: 0.2, scale: 0.96 },
        { y: -15, opacity: 0.45, scale: 1, ease: 'power2.out' },
        0
      );

      tl.fromTo(topInnerRef.current, 
        { y: 15, opacity: 0.4, scale: 0.98 },
        { y: -8, opacity: 0.75, scale: 1, ease: 'power2.out' },
        0
      );

      tl.fromTo(centerLineRef.current, 
        { scale: 0.95, opacity: 0.85 },
        { scale: 1.02, opacity: 1, ease: 'power2.out' },
        0
      );

      tl.fromTo(bottomInnerRef.current, 
        { y: -15, opacity: 0.4, scale: 0.98 },
        { y: 8, opacity: 0.75, scale: 1, ease: 'power2.out' },
        0
      );

      tl.fromTo(bottomOuterRef.current, 
        { y: -25, opacity: 0.2, scale: 0.96 },
        { y: 15, opacity: 0.45, scale: 1, ease: 'power2.out' },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full flex items-center justify-center relative select-none py-6 sm:py-10 md:py-16 px-2 sm:px-4"
    >
      <div className="flex flex-col items-center justify-center text-center font-syne uppercase font-[900] tracking-wide sm:tracking-wider space-y-1.5 sm:space-y-2.5 md:space-y-4 w-full max-w-6xl mx-auto">
        
        {/* Top Outer Layer: INNOVATION */}
        <div 
          ref={topOuterRef}
          className="text-[clamp(1.35rem,5.5vw,5.5rem)] leading-none text-[#CBD5E1] tracking-wide sm:tracking-wider will-change-transform select-none"
        >
          INNOVATION
        </div>

        {/* Top Inner Layer: ENGINEERING */}
        <div 
          ref={topInnerRef}
          className="text-[clamp(1.35rem,5.5vw,5.5rem)] leading-none text-[#94A3B8] tracking-wide sm:tracking-wider will-change-transform select-none"
        >
          ENGINEERING
        </div>

        {/* Center Hero Line: from CLASSROOM to production */}
        <div 
          ref={centerLineRef}
          className="flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-4 md:gap-6 my-1 sm:my-2 z-10 will-change-transform w-full"
        >
          <span className="font-mono text-[9px] xs:text-[11px] sm:text-sm md:text-base lg:text-lg font-bold lowercase text-[#204896] shrink-0">
            from
          </span>
          <span 
            className="text-[clamp(1.75rem,7.5vw,7.5rem)] leading-none tracking-tight font-black text-[#204896] shrink-0"
          >
            CLASSROOM
          </span>
          <span className="font-mono text-[7.5px] xs:text-[9px] sm:text-xs md:text-sm font-bold lowercase text-[#204896] text-left leading-tight shrink-0">
            to<br />production
          </span>
        </div>

        {/* Bottom Inner Layer: LEADERSHIP */}
        <div 
          ref={bottomInnerRef}
          className="text-[clamp(1.35rem,5.5vw,5.5rem)] leading-none text-[#94A3B8] tracking-wide sm:tracking-wider will-change-transform select-none"
        >
          LEADERSHIP
        </div>

        {/* Bottom Outer Layer: COMMUNITY */}
        <div 
          ref={bottomOuterRef}
          className="text-[clamp(1.35rem,5.5vw,5.5rem)] leading-none text-[#CBD5E1] tracking-wide sm:tracking-wider will-change-transform select-none"
        >
          COMMUNITY
        </div>

      </div>
    </div>
  );
}
