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
      {/* Sparkles Effect Ref */}
      <span ref={refs.sparkle} className="absolute -top-4 right-1/4 opacity-0 text-lg z-50 pointer-events-none">✨</span>

      {/* Non-rerender Speech Bubble Ref Container */}
      <div 
        ref={refs.speechBubble}
        className="absolute -top-7 px-3 py-1 rounded-xl bg-[#181818] border border-[#4F7BFF]/40 text-white text-xs font-mono shadow-xl backdrop-blur-md z-40 whitespace-nowrap opacity-0"
      />

      {/* Robot Mascot Container */}
      <div 
        ref={refs.robot}
        className="relative will-change-transform flex flex-col items-center"
      >
        {/* Antenna */}
        <div className="relative flex flex-col items-center mb-2 z-20">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4F7BFF] shadow-sm animate-pulse" />
          <div className="w-0.5 h-4 bg-[#4F7BFF]/80" />
        </div>

        {/* CSS 3D Scene */}
        <div className="scene relative" style={{ perspective: '1200px', width: '220px', height: '220px' }}>
          
          {/* Optimized CSS 3D Cube (Direct Front-Facing) */}
          <div 
            ref={refs.cube} 
            className="cube absolute inset-0"
            style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-5deg) rotateY(0deg)' }}
          >
            {/* FRONT FACE */}
            <div 
              className="absolute inset-0 bg-[#1d1d1d] border border-white/[0.05] flex flex-col items-center justify-center rounded-xl shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] overflow-hidden"
              style={{ transform: 'translateZ(110px)' }}
            >
              {/* Screen Glare */}
              <div className="absolute top-4 left-6 right-6 h-[2px] bg-[rgba(79,123,255,0.2)]" />

              {/* Soft Radial Blush Cheeks */}
              <div ref={refs.blushLeft} className="absolute top-[82px] left-7 w-6 h-4 bg-[#ff7aa8] rounded-full opacity-0 pointer-events-none" style={{ background: 'radial-gradient(circle, #ff7aa8 0%, transparent 70%)' }} />
              <div ref={refs.blushRight} className="absolute top-[82px] right-7 w-6 h-4 bg-[#ff7aa8] rounded-full opacity-0 pointer-events-none" style={{ background: 'radial-gradient(circle, #ff7aa8 0%, transparent 70%)' }} />

              {/* Eyes Container */}
              <div className="relative flex items-center justify-center h-[34px] mt-4">
                
                {/* Normal Eyes */}
                <div ref={refs.normalEyes} className="absolute flex flex-row items-center justify-center gap-7 opacity-100">
                  <div className="w-[34px] h-[34px] rounded-full bg-[#DBEAFE] flex items-center justify-center shadow-inner overflow-hidden">
                    <div ref={refs.leftPupil} className="w-[14px] h-[14px] rounded-full bg-[#111]" />
                  </div>
                  <div className="w-[34px] h-[34px] rounded-full bg-[#DBEAFE] flex items-center justify-center shadow-inner overflow-hidden">
                    <div ref={refs.rightPupil} className="w-[14px] h-[14px] rounded-full bg-[#111]" />
                  </div>
                </div>

                {/* Happy / Smiling Eyes (^ ^) */}
                <div ref={refs.happyEyes} className="absolute inset-0 flex flex-row items-center justify-center gap-7 opacity-0 pointer-events-none whitespace-nowrap">
                  <span className="w-[34px] text-center font-black text-2xl text-white select-none drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] inline-block">
                    ^
                  </span>
                  <span className="w-[34px] text-center font-black text-2xl text-white select-none drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] inline-block">
                    ^
                  </span>
                </div>

                {/* Shy Eyes (> <) */}
                <div ref={refs.shyEyes} className="absolute inset-0 flex flex-row items-center justify-center gap-7 text-white font-black text-xl font-mono opacity-0 pointer-events-none whitespace-nowrap">
                  <span className="w-[34px] text-center inline-block drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">&gt;</span>
                  <span className="w-[34px] text-center inline-block drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">&lt;</span>
                </div>

              </div>

              {/* Mouth Container */}
              <div className="relative flex items-center justify-center h-6 mt-6">
                <div ref={refs.mouthNeutral} className="absolute w-10 h-3 border-b-4 border-[#4F7BFF] rounded-full opacity-100" />
                <div ref={refs.mouthHappy} className="absolute w-12 h-5 border-b-4 border-[#4F7BFF] rounded-full opacity-0" />
                <div ref={refs.mouthWide} className="absolute w-6 h-6 border-2 border-[#4F7BFF] rounded-full opacity-0" />
              </div>

            </div>

            {/* BACK FACE */}
            <div className="absolute inset-0 bg-[#101010] border border-white/[0.05] rounded-xl" style={{ transform: 'rotateY(180deg) translateZ(110px)' }} />
            
            {/* RIGHT FACE */}
            <div className="absolute inset-0 bg-[#111111] border border-white/[0.05] rounded-xl" style={{ transform: 'rotateY(90deg) translateZ(110px)' }} />
            
            {/* LEFT FACE */}
            <div className="absolute inset-0 bg-[#0d0d0d] border border-white/[0.05] rounded-xl" style={{ transform: 'rotateY(-90deg) translateZ(110px)' }} />
            
            {/* TOP FACE */}
            <div className="absolute inset-0 bg-[#303030] border border-white/[0.05] rounded-xl" style={{ transform: 'rotateX(90deg) translateZ(110px)' }} />
            
            {/* BOTTOM FACE */}
            <div className="absolute inset-0 bg-[#080808] border border-white/[0.05] rounded-xl" style={{ transform: 'rotateX(-90deg) translateZ(110px)' }} />

          </div>
        </div>

        {/* Soft Radial Ground Shadow */}
        <div
          ref={refs.shadow}
          className="mt-4 w-[160px] h-5 rounded-full pointer-events-none will-change-transform"
          style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, transparent 70%)' }}
        />
      </div>
    </div>
  );
}
