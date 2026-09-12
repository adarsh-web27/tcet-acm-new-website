import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { MEMORY_CARDS, GALLERY_YEAR_OPTIONS } from '../data/memories';
import { MapPin, ArrowLeft, ArrowRight, Calendar } from 'lucide-react';

export default function Gallery() {
  const [selectedYear, setSelectedYear] = useState('2026-27');

  const filteredCards = useMemo(() => {
    return MEMORY_CARDS.filter((card) => card.year === selectedYear);
  }, [selectedYear]);

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
  const wheelCooldownRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);
  const wheelResetTimeoutRef = useRef(null);

  // Year filter switch with immediate carousel reset to image 01
  const handleYearChange = useCallback((year) => {
    if (year === selectedYear) return;
    setSelectedYear(year);
    setActive(0);
    setDisplayProgress(0);
    progressRef.current = 0;
    activeRef.current = 0;
    if (progressBarFillRef.current) {
      progressBarFillRef.current.style.width = '0%';
    }
  }, [selectedYear]);

  // Synchronize reset if selectedYear ever changes from another source
  useEffect(() => {
    setActive(0);
    setDisplayProgress(0);
    progressRef.current = 0;
    activeRef.current = 0;
    if (progressBarFillRef.current) {
      progressBarFillRef.current.style.width = '0%';
    }
  }, [selectedYear]);

  // Direct DOM cursor refs (Zero React re-renders on mousemove!)
  const cursorRef = useRef(null);
  const cursor2Ref = useRef(null);

  // Speed constants
  const speedDrag = -0.08;

  // LOCK PAGE BODY SCROLLING WHILE ON GALLERY PAGE
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow || '';
      document.documentElement.style.overflow = originalHtmlOverflow || '';
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

  // High-performance direct cursor tracking via requestAnimationFrame (desktop fine pointer only)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;

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

  // Discrete 1-Card Wheel Event Listener: exactly 1 wheel scroll tick advances 1 card
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }

      // Ignore if currently in debounce cooldown from a recent notch/gesture
      if (wheelCooldownRef.current) return;

      if (wheelResetTimeoutRef.current) {
        clearTimeout(wheelResetTimeoutRef.current);
      }

      wheelAccumulatorRef.current += e.deltaY;

      // Threshold: 30px ensures a single standard notch (100-120 deltaY) triggers immediately,
      // while trackpad or smooth scrolling triggers smoothly after deliberate swipe
      const THRESHOLD = 30;

      if (Math.abs(wheelAccumulatorRef.current) >= THRESHOLD) {
        const direction = wheelAccumulatorRef.current > 0 ? 1 : -1;
        wheelAccumulatorRef.current = 0;
        wheelCooldownRef.current = true;

        jumpToIndex(activeRef.current + direction);

        // 220ms cooldown ensures 1 clean step per physical notch, avoiding runaway jumps
        setTimeout(() => {
          wheelCooldownRef.current = false;
        }, 220);
      } else {
        // Reset small lingering movements if scrolling stops
        wheelResetTimeoutRef.current = setTimeout(() => {
          wheelAccumulatorRef.current = 0;
        }, 120);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (wheelResetTimeoutRef.current) {
        clearTimeout(wheelResetTimeoutRef.current);
      }
    };
  }, [jumpToIndex]);

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
    if (isDownRef.current) {
      isDownRef.current = false;
      jumpToIndex(activeRef.current);
    }
  }, [jumpToIndex]);

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

  // Compute active card index clamped within safe bounds
  const currentActive = Math.min(active, Math.max(0, totalItems - 1));
  const currentCard = filteredCards[currentActive] || filteredCards[0];

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[100dvh] sm:h-screen overflow-hidden bg-white text-[#0B1F33] select-none flex flex-col justify-between pt-16 sm:pt-20 pb-3 sm:pb-6"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >

      {/* ================= TOP HEADER & YEAR FILTER BAR ================= */}
      <div className="relative z-40 flex flex-col items-center pt-2 sm:pt-3 px-4 gap-2.5 pointer-events-auto select-none shrink-0">
        <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D4ED8] font-mono text-xs font-bold uppercase tracking-widest shadow-2xs">
          TCET ACM SIGITE • GALLERY ARCHIVES
        </span>

        {/* Year Filter Buttons */}
        <div className="inline-flex items-center p-1 bg-slate-100/90 backdrop-blur-md rounded-full border border-slate-200 shadow-xs">
          {GALLERY_YEAR_OPTIONS.map((opt) => {
            const isSelected = selectedYear === opt.value;
            const count = MEMORY_CARDS.filter((c) => c.year === opt.value).length;

            return (
              <button
                key={opt.value}
                onClick={(e) => {
                  e.stopPropagation();
                  handleYearChange(opt.value);
                }}
                className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-bold font-mono tracking-wide transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1D4ED8] text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span>{opt.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= TOP-RIGHT NAVIGATION PILL ================= */}
      <div className="hidden md:flex absolute top-24 sm:top-28 lg:top-28 right-6 lg:right-12 z-40 items-center pointer-events-auto select-none">
        <div className="inline-flex items-center p-1 sm:p-1.5 bg-slate-100/90 backdrop-blur-md rounded-full border border-slate-200/90 shadow-md">
          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              jumpToIndex(currentActive - 1);
            }}
            aria-label="Previous card"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-sm hover:shadow active:scale-95 text-[#0F172A] flex items-center justify-center transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#0F172A] stroke-[2.5] transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Slide Counter */}
          <div className="px-4 sm:px-5 font-mono text-xs sm:text-sm font-bold tracking-wider select-none flex items-center">
            <span className="text-[#1D4ED8] font-bold">
              {String(currentActive + 1).padStart(2, '0')}
            </span>
            <span className="text-slate-400 mx-1.5 font-normal">/</span>
            <span className="text-slate-500">
              {String(totalItems).padStart(2, '0')}
            </span>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              jumpToIndex(currentActive + 1);
            }}
            aria-label="Next card"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-sm hover:shadow active:scale-95 text-[#0F172A] flex items-center justify-center transition-all cursor-pointer group"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#0F172A] stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
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
          // Windowed rendering: only render cards within visible radius (currentActive ± 3)
          const distance = Math.abs(index - currentActive);
          if (distance > 3) {
            return null; // Skip rendering offscreen heavy cards!
          }

          const activeRatio = (index - currentActive) / totalItems;
          const zIndex = getZIndex(index, currentActive, totalItems);
          const opacity = Math.max(0.15, (zIndex / totalItems) * 3 - 2);

          const xPercent = activeRatio * 800;
          const yPercent = activeRatio * 200;
          const rotDeg = activeRatio * 120;

          const isActiveCard = index === currentActive;

          return (
            <div
              key={item.id}
              onClick={() => jumpToIndex(index)}
              className="carousel-item absolute top-[45%] sm:top-[47%] left-1/2 pointer-events-auto cursor-pointer rounded-2xl overflow-hidden bg-slate-900 transition-transform duration-500 ease-out group will-change-transform"
              style={{
                zIndex: zIndex,
                width: 'clamp(310px, 80vw, 640px)',
                height: 'clamp(230px, 58vw, 480px)',
                marginLeft: 'calc(clamp(310px, 80vw, 640px) * -0.5)',
                marginTop: 'calc(clamp(230px, 58vw, 480px) * -0.5)',
                transformOrigin: '0% 100%',
                transform: `translate3d(${xPercent}%, ${yPercent}%, 0) rotate(${rotDeg}deg)`,
                border: '3px solid #FFFFFF',
                boxShadow: 'none',
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

                {/* Year & Category Badges — Visible on Hover */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-[#1D4ED8] border border-white/20 text-xs font-mono font-bold text-white shadow-md">
                    {item.year}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#0B1F33]/90 border border-white/20 text-xs font-mono font-bold text-white shadow-md">
                    {item.category}
                  </span>
                </div>

                {/* Card Title & Location — Visible Only on Hover / Touch */}
                <div className="title absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 text-white p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#0B1F33]/90 border border-white/20 shadow-lg transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-100 group-active:opacity-100 translate-y-2 group-hover:translate-y-0 group-active:translate-y-0">
                  <h3 className="font-display font-black text-base sm:text-lg md:text-xl tracking-tight leading-snug drop-shadow-sm line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-white/85 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#93C5FD]" />
                    <span className="truncate">{item.location}</span>
                  </p>
                </div>

                {/* High-Definition Crisp Gallery Card Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 700px, 850px"
                  width={850}
                  height={567}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= ACTIVE EVENT INFO (Desktop Bottom-Left) ================= */}
      {currentCard && (
        <div className="hidden sm:block absolute bottom-3 sm:bottom-5 left-4 sm:left-6 lg:left-8 z-30 w-[240px] sm:w-[260px] lg:w-[280px] max-w-[280px] pointer-events-auto select-none transition-all duration-300">
          <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-900/5 min-h-[190px] sm:min-h-[210px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 flex-wrap mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#1D4ED8] text-white font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
                  {currentCard.category}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#1D4ED8] font-mono text-[10px] sm:text-xs font-bold">
                  {currentCard.year}
                </span>
                <span className="text-[10px] sm:text-xs font-mono font-medium text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#1D4ED8]" />
                  {currentCard.date}
                </span>
              </div>

              <h3 className="font-display font-black text-sm sm:text-base text-[#0B1F33] tracking-tight leading-snug line-clamp-2">
                {currentCard.title}
              </h3>

              <p className="text-xs font-mono text-slate-600 flex items-center gap-1.5 font-medium mt-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" />
                <span className="truncate">{currentCard.location}</span>
              </p>
            </div>

            {currentCard.description && (
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed pt-2 border-t border-slate-100 mt-2">
                {currentCard.description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ================= MOBILE ACTIVE EVENT INFO ================= */}
      {currentCard && (
        <div className="block sm:hidden z-30 px-4 w-full max-w-sm mx-auto pointer-events-auto select-none shrink-0 my-1">
          <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200/90 shadow-md flex flex-col gap-1 text-left">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-full bg-[#1D4ED8] text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-xs">
                {currentCard.category}
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#1D4ED8] font-mono text-[10px] font-bold">
                {currentCard.year}
              </span>
              <span className="text-[10px] font-mono font-medium text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#1D4ED8]" />
                {currentCard.date}
              </span>
            </div>

            <h3 className="font-display font-black text-sm text-[#0B1F33] tracking-tight leading-snug line-clamp-1">
              {currentCard.title}
            </h3>

            <p className="text-[11px] font-mono text-slate-600 flex items-center gap-1.5 font-medium">
              <MapPin className="w-3 h-3 text-[#1D4ED8] shrink-0" />
              <span className="truncate">{currentCard.location}</span>
            </p>

            {currentCard.description && (
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed pt-1 border-t border-slate-100">
                {currentCard.description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ================= MOBILE BOTTOM NAVIGATION PILL ================= */}
      <div className="flex md:hidden items-center justify-center z-40 pointer-events-auto my-1.5 shrink-0 select-none">
        <div className="inline-flex items-center p-1 bg-slate-100/90 backdrop-blur-md rounded-full border border-slate-200/90 shadow-md">
          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              jumpToIndex(currentActive - 1);
            }}
            aria-label="Previous card"
            className="w-10 h-10 rounded-full bg-white shadow-sm active:scale-90 text-[#0F172A] flex items-center justify-center transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#0F172A] stroke-[2.5]" />
          </button>

          {/* Slide Counter */}
          <div className="px-4 font-mono text-xs font-bold tracking-wider select-none flex items-center">
            <span className="text-[#1D4ED8] font-bold">
              {String(currentActive + 1).padStart(2, '0')}
            </span>
            <span className="text-slate-400 mx-1.5 font-normal">/</span>
            <span className="text-slate-500">
              {String(totalItems).padStart(2, '0')}
            </span>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              jumpToIndex(currentActive + 1);
            }}
            aria-label="Next card"
            className="w-10 h-10 rounded-full bg-white shadow-sm active:scale-90 text-[#0F172A] flex items-center justify-center transition-all cursor-pointer"
          >
            <ArrowRight className="w-4 h-4 text-[#0F172A] stroke-[2.5]" />
          </button>
        </div>
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
