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
          invalidateOnRefresh: true,
        }
      });

      // Kinetic expansion animation: layers spread out vertically from center as you scroll
      tl.fromTo(topOuterRef.current, 
        { y: 50, opacity: 0.04, scale: 0.92 },
        { y: -30, opacity: 0.18, scale: 1, ease: 'power2.out' },
        0
      );

      tl.fromTo(topInnerRef.current, 
        { y: 25, opacity: 0.15, scale: 0.95 },
        { y: -15, opacity: 0.45, scale: 1, ease: 'power2.out' },
        0
      );

      tl.fromTo(centerLineRef.current, 
        { scale: 0.85, opacity: 0.2 },
        { scale: 1.04, opacity: 1, ease: 'power2.out' },
        0
      );

      tl.fromTo(bottomInnerRef.current, 
        { y: -25, opacity: 0.15, scale: 0.95 },
        { y: 15, opacity: 0.45, scale: 1, ease: 'power2.out' },
        0
      );

      tl.fromTo(bottomOuterRef.current, 
        { y: -50, opacity: 0.04, scale: 0.92 },
        { y: 30, opacity: 0.18, scale: 1, ease: 'power2.out' },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full flex items-center justify-center relative select-none py-8 sm:py-12"
    >
      <div className="flex flex-col items-center justify-center text-center font-['Syne',sans-serif] uppercase font-[900] tracking-tight space-y-1 sm:space-y-2">
        
        {/* Top Outer Layer */}
        <div 
          ref={topOuterRef}
          className="text-[clamp(1.8rem,5.5vw,4.8rem)] leading-none text-[#0F172A] will-change-transform"
        >
          INNOVATION
        </div>

        {/* Top Inner Layer */}
        <div 
          ref={topInnerRef}
          className="text-[clamp(1.8rem,5.5vw,4.8rem)] leading-none text-[#0F172A] will-change-transform"
        >
          ENGINEERING
        </div>

        {/* Center Hero Line */}
        <div 
          ref={centerLineRef}
          className="flex items-center justify-center gap-[clamp(0.4rem,1.5vw,1.2rem)] my-2 z-10 will-change-transform"
        >
          <span className="font-mono text-[clamp(0.75rem,1.8vw,1.3rem)] font-bold lowercase text-[#1D4ED8]">
            from
          </span>
          <span 
            className="text-[clamp(2.2rem,6.5vw,5.6rem)] leading-none tracking-tight font-black text-transparent"
            style={{ WebkitTextStroke: '2px #1D4ED8' }}
          >
            CLASSROOM
          </span>
          <span className="font-mono text-[clamp(0.75rem,1.8vw,1.3rem)] font-bold lowercase text-[#1D4ED8]">
            to production
          </span>
        </div>

        {/* Bottom Inner Layer */}
        <div 
          ref={bottomInnerRef}
          className="text-[clamp(1.8rem,5.5vw,4.8rem)] leading-none text-[#0F172A] will-change-transform"
        >
          LEADERSHIP
        </div>

        {/* Bottom Outer Layer */}
        <div 
          ref={bottomOuterRef}
          className="text-[clamp(1.8rem,5.5vw,4.8rem)] leading-none text-[#0F172A] will-change-transform"
        >
          COMMUNITY
        </div>

      </div>
    </div>
  );
}
