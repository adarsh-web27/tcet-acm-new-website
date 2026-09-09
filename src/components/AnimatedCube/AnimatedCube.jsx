// AnimatedCube.jsx
import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { MascotEngine } from './MascotEngine';

export default function AnimatedCube() {
  const containerRef = useRef(null);
  const engineRef = useRef(null);

  // Reference manifest passed directly to MascotEngine
  const refs = {
    robot: useRef(null),
    cube: useRef(null),
    shadow: useRef(null),
    speechBubble: useRef(null),
    sparkle: useRef(null),
    leftPupil: useRef(null),
    rightPupil: useRef(null),
    normalEyes: useRef(null),
    happyEyes: useRef(null),
    shyEyes: useRef(null),
    mouthNeutral: useRef(null),
    mouthHappy: useRef(null),
    mouthWide: useRef(null),
    blushLeft: useRef(null),
    blushRight: useRef(null)
  };

  // Instantiates the Mascot Engine
  useLayoutEffect(() => {
    engineRef.current = new MascotEngine(refs);

    return () => {
      if (engineRef.current) engineRef.current.destroy();
    };
  }, []);

  // Window Event Management (Visibility & Intersection Observer)
  useEffect(() => {
    let rafId = null;
    let isVisible = false;

    const handleMouseMove = (e) => {
      if (!isVisible) return;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        if (engineRef.current) {
          engineRef.current.updateLookAt(e.clientX, e.clientY);
        }
        rafId = null;
      });
    };

    const handleVisibilityChange = () => {
      if (!engineRef.current) return;
      if (document.hidden) {
        engineRef.current.pause();
      } else if (isVisible) {
        engineRef.current.resume();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!engineRef.current) return;
        isVisible = entry.isIntersecting;
        if (entry.isIntersecting) {
          engineRef.current.resume();
        } else {
          engineRef.current.pause();
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center justify-center cursor-pointer select-none w-full h-full overflow-visible py-2 touch-manipulation"
      onMouseEnter={() => engineRef.current?.handleMouseEnter()}
      onMouseLeave={() => engineRef.current?.handleMouseLeave()}
      onClick={() => engineRef.current?.handleClick()}
      onTouchEnd={(e) => {
        e.preventDefault();
        engineRef.current?.handleClick();
      }}
    >

      {/* Non-rerender Speech Bubble Ref Container */}
      <div 
        ref={refs.speechBubble}
        className="absolute -top-7 px-3.5 py-1.5 rounded-xl bg-[#132344]/95 border-2 border-[#4674D4]/60 text-white text-sm font-mono shadow-xl backdrop-blur-md z-40 whitespace-nowrap opacity-0"
      />

      {/* Robot Mascot Container */}
      <div 
        ref={refs.robot}
        className="relative will-change-transform flex flex-col items-center cursor-pointer"
      >
        {/* Antenna */}
        <div className="relative flex flex-col items-center mb-2 z-20">
          <div className="w-3 h-3 rounded-full bg-[#4674D4] shadow-[0_0_12px_#2E539F] animate-pulse" />
          <div className="w-1 h-4 bg-[#769CE6] rounded-full" />
        </div>

        {/* CSS 3D Scene */}
        <div className="scene relative" style={{ perspective: '1200px', width: '220px', height: '220px' }}>
          
          {/* Optimized CSS 3D Cube (Direct Front-Facing) */}
          <div 
            ref={refs.cube} 
            className="cube absolute inset-0"
            style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-5deg) rotateY(0deg)' }}
          >
            {/* FRONT FACE - #2E539F ACM Signature Blue Screen */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-[#2E539F] via-[#27488B] to-[#1F396E] border-2 border-[#769CE6]/60 flex flex-col items-center justify-center rounded-2xl shadow-[inset_0_0_25px_rgba(18,35,68,0.5)] overflow-hidden"
              style={{ transform: 'translateZ(110px)' }}
            >
              {/* Screen Glare */}
              <div className="absolute top-4 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

              {/* Soft Radial Blush Cheeks */}
              <div ref={refs.blushLeft} className="absolute top-[82px] left-7 w-6 h-4 rounded-full opacity-0 pointer-events-none" style={{ background: 'radial-gradient(circle, #F472B6 0%, transparent 70%)' }} />
              <div ref={refs.blushRight} className="absolute top-[82px] right-7 w-6 h-4 rounded-full opacity-0 pointer-events-none" style={{ background: 'radial-gradient(circle, #F472B6 0%, transparent 70%)' }} />

              {/* Eyes Container */}
              <div className="relative flex items-center justify-center h-[34px] mt-4">
                
                {/* Normal Eyes */}
                <div ref={refs.normalEyes} className="absolute flex flex-row items-center justify-center gap-7 opacity-100">
                  <div className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden border-2 border-[#769CE6]">
                    <div ref={refs.leftPupil} className="w-[15px] h-[15px] rounded-full bg-[#132344] flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white self-start ml-1 mt-0.5" />
                    </div>
                  </div>
                  <div className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden border-2 border-[#769CE6]">
                    <div ref={refs.rightPupil} className="w-[15px] h-[15px] rounded-full bg-[#132344] flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white self-start ml-1 mt-0.5" />
                    </div>
                  </div>
                </div>

                {/* Happy / Smiling Eyes (^ ^) */}
                <div ref={refs.happyEyes} className="absolute inset-0 flex flex-row items-center justify-center gap-7 opacity-0 pointer-events-none whitespace-nowrap">
                  <span className="w-[34px] text-center font-black text-2xl text-white select-none drop-shadow-[0_0_10px_rgba(255,255,255,0.95)] inline-block">
                    ^
                  </span>
                  <span className="w-[34px] text-center font-black text-2xl text-white select-none drop-shadow-[0_0_10px_rgba(255,255,255,0.95)] inline-block">
                    ^
                  </span>
                </div>

                {/* Shy Eyes (> <) */}
                <div ref={refs.shyEyes} className="absolute inset-0 flex flex-row items-center justify-center gap-7 text-white font-black text-xl font-mono opacity-0 pointer-events-none whitespace-nowrap">
                  <span className="w-[34px] text-center inline-block drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">&gt;</span>
                  <span className="w-[34px] text-center inline-block drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">&lt;</span>
                </div>

              </div>

              {/* Mouth Container */}
              <div className="relative flex items-center justify-center h-6 mt-6">
                <div ref={refs.mouthNeutral} className="absolute w-10 h-3 border-b-4 border-white rounded-full opacity-100" />
                <div ref={refs.mouthHappy} className="absolute w-12 h-5 border-b-4 border-white rounded-full opacity-0" />
                <div ref={refs.mouthWide} className="absolute w-6 h-6 border-2 border-white rounded-full opacity-0" />
              </div>

            </div>

            {/* BACK FACE */}
            <div className="absolute inset-0 bg-[#1A305D] border-2 border-[#2E539F]/40 rounded-2xl" style={{ transform: 'rotateY(180deg) translateZ(110px)' }} />
            
            {/* RIGHT FACE - Lit Side */}
            <div className="absolute inset-0 bg-[#294B90] border-2 border-[#769CE6]/40 rounded-2xl shadow-[inset_0_0_20px_rgba(18,35,68,0.3)]" style={{ transform: 'rotateY(90deg) translateZ(110px)' }} />
            
            {/* LEFT FACE - Shadow Side */}
            <div className="absolute inset-0 bg-[#213D75] border-2 border-[#769CE6]/40 rounded-2xl shadow-[inset_0_0_20px_rgba(18,35,68,0.4)]" style={{ transform: 'rotateY(-90deg) translateZ(110px)' }} />
            
            {/* TOP FACE - Top Highlight */}
            <div className="absolute inset-0 bg-[#3E69C2] border-2 border-[#A8C4F0]/60 rounded-2xl shadow-[inset_0_0_20px_rgba(255,255,255,0.25)]" style={{ transform: 'rotateX(90deg) translateZ(110px)' }} />
            
            {/* BOTTOM FACE - Deep Underside Shadow */}
            <div className="absolute inset-0 bg-[#132344] border-2 border-[#1F396E]/50 rounded-2xl" style={{ transform: 'rotateX(-90deg) translateZ(110px)' }} />

          </div>
        </div>

        {/* Soft Radial Ground Shadow in #2E539F Hue */}
        <div
          ref={refs.shadow}
          className="mt-4 w-[160px] h-5 rounded-full pointer-events-none will-change-transform"
          style={{ background: 'radial-gradient(ellipse at center, rgba(46,83,159,0.35) 0%, transparent 70%)' }}
        />
      </div>
    </div>
  );
}
