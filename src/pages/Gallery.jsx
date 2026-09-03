import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { MEMORY_CARDS } from '../data/memories';
import { MapPin, ArrowLeft, ArrowRight } from 'lucide-react';

export default function Gallery() {
  const filteredCards = MEMORY_CARDS;
  const totalItems = filteredCards.length;

  const [active, setActive] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  
  const containerRef = useRef(null);
  const progressBarFillRef = useRef(null);
  const startXRef = useRef(0);
  const isDownRef = useRef(false);
  const progressRef = useRef(0);
  const activeRef = useRef(0);
  const totalItemsRef = useRef(totalItems);
  totalItemsRef.current = totalItems;

  // Direct DOM cursor refs (Zero React re-renders on mousemove!)
  const cursorRef = useRef(null);
  const cursor2Ref = useRef(null);

  // Speed constants
  const speedWheel = 0.035;
  const speedDrag = -0.08;

  // LOCK PAGE BODY SCROLLING WHILE ON GALLERY PAGE
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  // Update active index and progress bar DOM directly & notify React state when active index changes
  const applyProgress = useCallback((newProgress) => {
    const clampedProg = Math.max(0, Math.min(100, newProgress));
    progressRef.current = clampedProg;

    if (progressBarFillRef.current) {
      progressBarFillRef.current.style.width = `${clampedProg}%`;
    }

    const items = totalItemsRef.current;
    const computedActive = items > 1 ? Math.round((clampedProg / 100) * (items - 1)) : 0;
    const clampedActive = Math.max(0, Math.min(items - 1, computedActive));

    if (clampedActive !== activeRef.current) {
      activeRef.current = clampedActive;
      setActive(clampedActive);
    }
  }, []);


  // Helper to jump to a specific card index
  const jumpToIndex = useCallback((index) => {
    const items = totalItemsRef.current;
    const targetIdx = Math.max(0, Math.min(items - 1, index));
    const newProgress = items > 1 ? (targetIdx / (items - 1)) * 100 : 0;
    setDisplayProgress(newProgress);
    applyProgress(newProgress);
  }, [applyProgress]);

  // High-performance direct cursor tracking via requestAnimationFrame
  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let cursorRaf = null;

    const renderCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      if (cursor2Ref.current) {
        cursor2Ref.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      cursorRaf = null;
    };

    const handlePointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!cursorRaf) {
        cursorRaf = requestAnimationFrame(renderCursor);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (cursorRaf) cancelAnimationFrame(cursorRaf);
    };
  }, []);

  // NON-PASSIVE Wheel Event Listener to strictly control carousel progress with 0% page scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }
      const delta = e.deltaY * speedWheel;
      const current = progressRef.current;
      const next = current + delta;
      applyProgress(next);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [speedWheel, applyProgress]);

  // Handle Pointer / Touch / Mouse Drag
  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('button, a, input, select')) return;
    isDownRef.current = true;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startXRef.current = x;
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDownRef.current) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const mouseProgress = (x - startXRef.current) * speedDrag;
    const nextProg = progressRef.current + mouseProgress;
    applyProgress(nextProg);
    startXRef.current = x;
  }, [speedDrag, applyProgress]);

  const handleMouseUp = useCallback(() => {
    isDownRef.current = false;
    setDisplayProgress(progressRef.current);
  }, []);

  // Keyboard Arrow Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        jumpToIndex(activeRef.current + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        jumpToIndex(activeRef.current - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jumpToIndex]);

  // Calculate Z-Index for each item based on distance from active
  const getZIndex = (index, activeIndex, total) => {
    if (index === activeIndex) return total;
    return total - Math.abs(activeIndex - index);
  };

  // Interactive Progress Bar Jump
  const handleProgressBarClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newProg = ratio * 100;
    setDisplayProgress(newProg);
    applyProgress(newProg);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[calc(100dvh-56px)] sm:h-[calc(100vh-80px)] mt-14 sm:mt-20 overflow-hidden bg-white text-[#0B1F33] select-none flex flex-col justify-between pb-2 sm:pb-6"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      {/* ================= PLAYFUL TECH DOODLES BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none z-0 select-none overflow-hidden" aria-hidden="true">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-40" />

        {/* Top-Left: Code tag < / > */}
        <svg className="absolute top-8 left-10 w-24 h-24 text-[#1D4ED8]/30 animate-pulse" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ animationDuration: '4s' }}>
          <path d="M 30 35 L 15 50 L 30 65" />
          <path d="M 45 70 L 55 30" />
          <path d="M 70 35 L 85 50 L 70 65" />
        </svg>

        {/* Top-Left: Starburst & Sparkles */}
        <svg className="absolute top-28 left-44 w-12 h-12 text-[#3B82F6]/35" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M 25 5 L 25 45 M 5 25 L 45 25 M 11 11 L 39 39 M 11 39 L 39 11" />
        </svg>

        {/* Left Side: Curly Braces { } */}
        <svg className="absolute top-1/2 left-8 -translate-y-1/2 w-14 h-28 text-[#2E539F]/25" viewBox="0 0 60 100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 40 10 C 25 10 20 25 20 40 C 20 48 10 50 5 50 C 10 50 20 52 20 60 C 20 75 25 90 40 90" />
        </svg>

        {/* Right Side: Orbiting Atom */}
        <svg className="absolute top-1/2 right-8 -translate-y-1/2 w-28 h-28 text-[#3B82F6]/25 animate-spin" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ animationDuration: '28s' }}>
          <ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(0 50 50)" />
          <ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(120 50 50)" />
          <circle cx="50" cy="50" r="4" fill="currentColor" />
        </svg>

        {/* Bottom-Right: Terminal Prompt >_ */}
        <svg className="absolute bottom-14 right-14 w-28 h-20 text-[#1D4ED8]/30" viewBox="0 0 100 70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="5" width="90" height="60" rx="8" />
          <path d="M 5 20 L 95 20" />
          <circle cx="15" cy="12" r="2" fill="currentColor" />
          <circle cx="22" cy="12" r="2" fill="currentColor" />
          <circle cx="29" cy="12" r="2" fill="currentColor" />
          <path d="M 18 36 L 28 44 L 18 52" />
          <path d="M 34 52 L 48 52" />
        </svg>

        {/* Bottom-Right: Squiggly Line */}
        <svg className="absolute bottom-36 right-44 w-24 h-10 text-[#3B82F6]/30" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M 5 15 Q 18 5 30 15 T 55 15 T 80 15 T 95 15" />
        </svg>
      </div>

      {/* Top Mobile Header Tag — Gives purpose to upper space on mobile */}
      <div className="relative z-20 text-center pt-1 sm:pt-4 px-4 pointer-events-none select-none">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D4ED8] font-mono text-[10px] font-bold uppercase tracking-widest shadow-2xs">
          TCET ACM • GALLERY ARCHIVES
        </span>
      </div>

      {/* ================= DESKTOP NAVIGATION BUTTONS (Top-Right) ================= */}
      <div className="hidden md:flex absolute top-4 right-8 lg:right-14 z-40 items-center gap-4 pointer-events-auto select-none">
        <button
          onClick={(e) => {
            e.stopPropagation();
            jumpToIndex(active - 1);
          }}
          aria-label="Previous card"
          className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] active:scale-95 text-white shadow-2xl shadow-blue-600/35 flex items-center justify-center transition-all duration-200 cursor-pointer border-[2.5px] border-white group hover:scale-105"
        >
          <ArrowLeft className="w-8 h-8 lg:w-10 lg:h-10 stroke-[3.5] transition-transform group-hover:-translate-x-1" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            jumpToIndex(active + 1);
          }}
          aria-label="Next card"
          className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] active:scale-95 text-white shadow-2xl shadow-blue-600/35 flex items-center justify-center transition-all duration-200 cursor-pointer border-[2.5px] border-white group hover:scale-105"
        >
          <ArrowRight className="w-8 h-8 lg:w-10 lg:h-10 stroke-[3.5] transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Custom Dual Follower Cursor (Zero React State Rerender) */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#0F172A]/30 pointer-events-none z-50 hidden md:block will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      />
      <div 
        ref={cursor2Ref}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#1D4ED8] pointer-events-none z-50 hidden md:block will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      />

      {/* ================= MAIN 3D RADIAL CAROUSEL CONTAINER ================= */}
      <div className="carousel relative z-20 w-full flex-1 overflow-hidden pointer-events-none flex items-center justify-center my-auto -mt-4 sm:mt-0">
        {filteredCards.map((item, index) => {
          // Windowed rendering: only render cards within visible radius (active ± 3)
          const distance = Math.abs(index - active);
          if (distance > 3) {
            return null; // Skip rendering offscreen heavy cards!
          }

          const activeRatio = (index - active) / totalItems;
          const zIndex = getZIndex(index, active, totalItems);
          const opacity = Math.max(0.15, (zIndex / totalItems) * 3 - 2);

          const xPercent = activeRatio * 800;
          const yPercent = activeRatio * 200;
          const rotDeg = activeRatio * 120;

          const isActiveCard = index === active;

          return (
            <div
              key={item.id}
              onClick={() => jumpToIndex(index)}
              className="carousel-item absolute top-[45%] sm:top-1/2 left-1/2 pointer-events-auto cursor-pointer rounded-2xl overflow-hidden bg-slate-900 transition-transform duration-500 ease-out group will-change-transform"
              style={{
                zIndex: zIndex,
                width: 'clamp(310px, 90vw, 560px)',
                height: 'clamp(220px, 64vw, 360px)',
                marginLeft: 'calc(clamp(310px, 90vw, 560px) * -0.5)',
                marginTop: 'calc(clamp(220px, 64vw, 360px) * -0.5)',
                transformOrigin: '0% 100%',
                transform: `translate3d(${xPercent}%, ${yPercent}%, 0) rotate(${rotDeg}deg)`,
                border: isActiveCard ? '2px solid rgba(255, 255, 255, 0.9)' : '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: isActiveCard 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.75)' 
                  : '0 15px 35px rgba(0, 0, 0, 0.5)',
              }}
            >
              <div 
                className="carousel-box absolute inset-0 z-10 transition-opacity duration-300"
                style={{ opacity: opacity }}
              >
                {/* Card Number Pill — Visible on Hover */}
                <div className="num absolute top-3 left-4 z-20 font-mono font-black text-white text-3xl sm:text-5xl md:text-6xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Category Badge — Visible on Hover */}
                <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-[#0B1F33]/90 border border-white/20 text-[10px] font-mono font-bold text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {item.category}
                </div>

                {/* Card Title & Location — Visible Only on Hover / Touch */}
                <div className="title absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 text-white p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#0B1F33]/90 border border-white/20 shadow-lg transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-100 group-active:opacity-100 translate-y-2 group-hover:translate-y-0 group-active:translate-y-0">
                  <h3 className="font-display font-black text-base sm:text-lg md:text-xl tracking-tight leading-snug drop-shadow-sm line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-mono text-white/85 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#93C5FD]" />
                    <span className="truncate">{item.location}</span>
                  </p>
                </div>

                {/* High-Definition Crisp Gallery Card Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-500"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 700px, 850px"
                  width={850}
                  height={567}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= BIG "SCROLL" TYPOGRAPHY (Desktop Only - Bottom-Left) ================= */}
      <div className="hidden sm:block absolute bottom-3 left-6 sm:bottom-6 sm:left-10 z-20 pointer-events-none select-none">
        <span className="font-display font-black tracking-tighter text-[clamp(44px,7vw,96px)] leading-none text-[#1D4ED8] opacity-90 drop-shadow-xs">
          SCROLL
        </span>
      </div>

      {/* ================= MOBILE SLIDE COUNTER (Bottom-Right) ================= */}
      <div className="absolute bottom-4 right-6 sm:bottom-6 sm:right-10 z-20 pointer-events-none select-none">
        <div className="px-3.5 py-1 rounded-full bg-[#0B1F33]/90 text-white border border-[#93C5FD]/40 shadow-md font-mono text-xs font-bold tracking-wider">
          <span className="text-[#93C5FD]">{String(active + 1).padStart(2, '0')}</span>
          <span className="text-white/40 mx-1">/</span>
          <span>{String(totalItems).padStart(2, '0')}</span>
        </div>
      </div>

      {/* ================= MOBILE BOTTOM NAVIGATION BUTTONS ================= */}
      <div className="flex md:hidden items-center justify-center gap-7 z-40 pointer-events-auto my-2 shrink-0 select-none">
        <button
          onClick={(e) => {
            e.stopPropagation();
            jumpToIndex(active - 1);
          }}
          aria-label="Previous card"
          className="w-14 h-14 rounded-full bg-[#1D4ED8] active:scale-90 text-white shadow-xl shadow-blue-600/40 flex items-center justify-center transition-all cursor-pointer border-2 border-white shrink-0"
        >
          <ArrowLeft className="w-7 h-7 stroke-[3.5]" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            jumpToIndex(active + 1);
          }}
          aria-label="Next card"
          className="w-14 h-14 rounded-full bg-[#1D4ED8] active:scale-90 text-white shadow-xl shadow-blue-600/40 flex items-center justify-center transition-all cursor-pointer border-2 border-white shrink-0"
        >
          <ArrowRight className="w-7 h-7 stroke-[3.5]" />
        </button>
      </div>

      {/* ================= INTERACTIVE PROGRESS TRACKER ================= */}
      <div className="relative z-30 max-w-xl mx-auto px-6 mb-3 pointer-events-auto shrink-0 w-full">
        <div 
          onClick={handleProgressBarClick}
          className="w-full h-2 bg-[#93C5FD]/30 rounded-full cursor-pointer relative overflow-hidden group shadow-inner"
          title="Click to jump to position"
        >
          <div 
            ref={progressBarFillRef}
            className="h-full bg-[#264E9B] rounded-full transition-[width] duration-150 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      </div>

    </div>
  );
}
