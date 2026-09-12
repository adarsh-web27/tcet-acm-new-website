import React, { useEffect, useRef } from 'react';

export default function TechTypographyStack() {
  const containerRef = useRef(null);
  const topOuterRef = useRef(null);
  const topInnerRef = useRef(null);
  const centerLineRef = useRef(null);
  const bottomInnerRef = useRef(null);
  const bottomOuterRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let mm = null;
    let isCancelled = false;

    import('../lib/gsap').then(({ gsap }) => {
      if (isCancelled || !containerRef.current) return;

      mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const isTablet = window.innerWidth < 1024;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 0.8,
            invalidateOnRefresh: true,
          }
        });

        // Dramatic kinetic vertical spread & horizontal tracking expansion on scroll
        tl.fromTo(topOuterRef.current, 
          { y: 48, opacity: 0.15, scale: 0.94, letterSpacing: '0.01em' },
          { y: isTablet ? -38 : -48, opacity: 0.5, scale: 1, letterSpacing: '0.12em', ease: 'power2.out' },
          0
        );

        tl.fromTo(topInnerRef.current, 
          { y: 24, opacity: 0.35, scale: 0.96, letterSpacing: '0.01em' },
          { y: isTablet ? -18 : -24, opacity: 0.85, scale: 1, letterSpacing: '0.08em', ease: 'power2.out' },
          0
        );

        tl.fromTo(centerLineRef.current, 
          { scale: 0.92, opacity: 0.85 },
          { scale: 1.05, opacity: 1, ease: 'power2.out' },
          0
        );

        tl.fromTo(bottomInnerRef.current, 
          { y: -24, opacity: 0.35, scale: 0.96, letterSpacing: '0.01em' },
          { y: isTablet ? 18 : 24, opacity: 0.85, scale: 1, letterSpacing: '0.08em', ease: 'power2.out' },
          0
        );

        tl.fromTo(bottomOuterRef.current, 
          { y: -48, opacity: 0.15, scale: 0.94, letterSpacing: '0.01em' },
          { y: isTablet ? 38 : 48, opacity: 0.5, scale: 1, letterSpacing: '0.12em', ease: 'power2.out' },
          0
        );
      });
    }).catch(() => {});

    return () => {
      isCancelled = true;
      if (mm) mm.revert();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full flex items-center justify-center relative select-none py-6 sm:py-10 md:py-14 px-2 sm:px-4"
    >
      <div className="flex flex-col items-center justify-center text-center font-syne uppercase font-[900] tracking-wide sm:tracking-wider space-y-1 sm:space-y-1.5 md:space-y-2 w-full max-w-6xl mx-auto">
        
        {/* Top Outer Layer: INNOVATION */}
        <div 
          ref={topOuterRef}
          className="text-[clamp(1.35rem,4.5vw,4.6rem)] leading-none text-[#CBD5E1] tracking-wider will-change-transform select-none"
        >
          INNOVATION
        </div>

        {/* Top Inner Layer: ENGINEERING */}
        <div 
          ref={topInnerRef}
          className="text-[clamp(1.35rem,4.5vw,4.6rem)] leading-none text-[#94A3B8] tracking-wider will-change-transform select-none"
        >
          ENGINEERING
        </div>

        {/* Center Hero Line: from CLASSROOM to production */}
        <div 
          ref={centerLineRef}
          className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 my-1 sm:my-1.5 z-10 will-change-transform w-full"
        >
          <span className="font-mono text-xs sm:text-sm md:text-base lg:text-xl font-bold lowercase text-[#204896] shrink-0">
            from
          </span>
          <span 
            className="text-[clamp(2.15rem,6.8vw,6.8rem)] leading-none tracking-tight font-black text-[#204896] shrink-0"
          >
            CLASSROOM
          </span>
          <span className="font-mono text-[10px] sm:text-xs md:text-sm lg:text-base font-bold lowercase text-[#204896] text-left leading-tight shrink-0">
            to<br />production
          </span>
        </div>

        {/* Bottom Inner Layer: LEADERSHIP */}
        <div 
          ref={bottomInnerRef}
          className="text-[clamp(1.35rem,4.5vw,4.6rem)] leading-none text-[#94A3B8] tracking-wider will-change-transform select-none"
        >
          LEADERSHIP
        </div>

        {/* Bottom Outer Layer: COMMUNITY */}
        <div 
          ref={bottomOuterRef}
          className="text-[clamp(1.35rem,4.5vw,4.6rem)] leading-none text-[#CBD5E1] tracking-wider will-change-transform select-none"
        >
          COMMUNITY
        </div>

      </div>
    </div>
  );
}
