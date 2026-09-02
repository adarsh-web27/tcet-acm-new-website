import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PageLoader({ onComplete }) {
  const [isComplete, setIsComplete] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const progressFillRef = useRef(null);

  // Keep latest onComplete callback ref
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    const startTime = Date.now();
    const duration = 650; // Preserved snappy display duration

    let rafId;
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);

      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${pct}%`;
      }

      if (elapsed < duration) {
        rafId = requestAnimationFrame(tick);
      } else {
        setIsComplete(true);
        setTimeout(() => {
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
        }, 150);
      }
    };

    rafId = requestAnimationFrame(tick);

    // Fallback safety timeout in case background tab throttles RAF
    const safetyTimeout = setTimeout(() => {
      if (progressFillRef.current) {
        progressFillRef.current.style.width = '100%';
      }
      setIsComplete(true);
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, 1200);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      }}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#BFDBFE] text-[#0B1F33] select-none overflow-hidden font-sans"
    >
      {/* ================= BACKGROUND ARTWORK & SVG CONNECTORS ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* Background Dot Matrix Clusters */}
        {/* Top-Right Matrix */}
        <div className="absolute top-8 right-[24%] grid grid-cols-6 gap-2.5 opacity-35">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
          ))}
        </div>
        {/* Bottom-Center Matrix */}
        <div className="absolute bottom-28 left-[34%] grid grid-cols-8 gap-2.5 opacity-30">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
          ))}
        </div>

        {/* Small Solid Blue Accent Dots */}
        <div className="absolute top-[18%] left-[37%] w-2.5 h-2.5 rounded-full bg-[#3B6FC5]" />
        <div className="absolute top-[34%] left-[3.5%] w-2.5 h-2.5 rounded-full bg-[#3B6FC5]" />
        <div className="absolute top-[23%] right-[32%] w-2 h-2 rounded-full bg-[#3B6FC5]" />
        <div className="absolute bottom-[24%] right-[37%] w-2.5 h-2.5 rounded-full bg-[#3B6FC5]" />

        {/* Dotted Circuit Connector Lines */}
        <svg className="absolute inset-0 w-full h-full stroke-[#BFDBFE] fill-none opacity-80 hidden md:block">
          {/* Top-Left Code to Bubble to Laptop */}
          <path d="M 145 95 L 205 95 L 205 130" strokeDasharray="3 3" strokeWidth="1.5" />
          {/* Laptop to Curly Brackets */}
          <path d="M 140 280 L 60 280 L 60 380" strokeDasharray="3 3" strokeWidth="1.5" />
          {/* Curly Brackets to Community */}
          <path d="M 60 410 L 60 480 L 80 480" strokeDasharray="3 3" strokeWidth="1.5" />
          {/* Community to Wifi */}
          <path d="M 215 500 L 245 500 L 245 540" strokeDasharray="3 3" strokeWidth="1.5" />
          
          {/* Top-Right Data to Cloud */}
          <path d="M 820 95 L 880 95" strokeDasharray="3 3" strokeWidth="1.5" />
          {/* Top-Right Data to Monitor */}
          <path d="M 830 115 L 830 180" strokeDasharray="3 3" strokeWidth="1.5" />
          {/* Monitor to Terminal */}
          <path d="M 770 270 L 730 270" strokeDasharray="3 3" strokeWidth="1.5" />
          {/* Monitor to Connect */}
          <path d="M 740 370 L 740 450 L 770 450" strokeDasharray="3 3" strokeWidth="1.5" />
          {/* Connect to Share */}
          <path d="M 820 545 L 820 600 L 750 600" strokeDasharray="3 3" strokeWidth="1.5" />
        </svg>

        {/* Bottom Layered Fluid Blue Waves */}
        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 overflow-hidden pointer-events-none">
          {/* Wave 1: Soft Sky Blue (#DCEBFC) */}
          <svg className="absolute bottom-0 w-full h-full text-[#DCEBFC]" viewBox="0 0 1440 160" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,53.3C1120,53,1280,75,1360,80L1440,85L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z" />
          </svg>
          {/* Wave 2: Vibrant Blue (#2563EB) */}
          <svg className="absolute -bottom-2 w-full h-[85%] text-[#3B6FC5] opacity-95" viewBox="0 0 1440 140" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,32L80,42.7C160,53,320,75,480,80C640,85,800,75,960,64C1120,53,1280,43,1360,48L1440,53L1440,140L1360,140C1280,140,1120,140,960,140C800,140,640,140,480,140C320,140,160,140,80,140L0,140Z" />
          </svg>
          {/* Wave 3: Deep Royal Navy Wave (#0052A3) */}
          <svg className="absolute -bottom-4 w-full h-[68%] text-[#3A6DAD]" viewBox="0 0 1440 120" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,48L80,42.7C160,37,320,27,480,37.3C640,48,800,80,960,85.3C1120,91,1280,69,1360,58.7L1440,48L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>

        {/* Botanical Foliage Leaves (Bottom-Left Corner) */}
        <div className="absolute bottom-2 left-2 sm:left-4 w-20 sm:w-28 text-[#3A6DAD] pointer-events-none z-10">
          <svg viewBox="0 0 100 130" fill="currentColor">
            <path d="M12,120 Q30,85 18,50 Q28,62 32,85 Q44,45 54,22 Q48,50 38,78 Q65,45 76,32 Q65,65 44,92 L22,120 Z" />
            <circle cx="18" cy="50" r="7" />
            <circle cx="54" cy="22" r="7" />
            <circle cx="76" cy="32" r="6" />
            <circle cx="34" cy="38" r="5.5" />
          </svg>
        </div>

        {/* Botanical Foliage Leaves (Bottom-Right Corner) */}
        <div className="absolute bottom-2 right-2 sm:right-4 w-20 sm:w-28 text-[#3A6DAD] pointer-events-none scale-x-[-1] z-10">
          <svg viewBox="0 0 100 130" fill="currentColor">
            <path d="M12,120 Q30,85 18,50 Q28,62 32,85 Q44,45 54,22 Q48,50 38,78 Q65,45 76,32 Q65,65 44,92 L22,120 Z" />
            <circle cx="18" cy="50" r="7" />
            <circle cx="54" cy="22" r="7" />
            <circle cx="76" cy="32" r="6" />
            <circle cx="34" cy="38" r="5.5" />
          </svg>
        </div>

      </div>


      {/* ================= MAIN COMPOSITION (100% MATCH TO REFERENCE) ================= */}
      <div className="relative flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">

        {/* ================= LEFT WING ILLUSTRATIONS ================= */}

        {/* 1. Top-Left Code Card */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="absolute top-8 left-4 lg:left-10 hidden md:flex flex-col p-3 rounded-2xl bg-white border-2 border-[#A8C6EE] shadow-sm w-24"
        >
          <div className="text-[#3B6FC5] font-mono font-black text-xs mb-1">
            {'</>'}
          </div>
          <span className="text-[10px] font-extrabold tracking-wider text-[#0B1F33] uppercase mb-1.5">
            CODE
          </span>
          <div className="w-12 h-[2.5px] bg-[#C2DBFC] rounded-full mb-1" />
          <div className="w-8 h-[2.5px] bg-[#D6E8FC] rounded-full" />
        </motion.div>

        {/* 2. Top-Left Thought Bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-10 left-36 lg:left-44 hidden lg:flex items-center justify-center w-12 h-10 rounded-2xl bg-white border-2 border-[#A8C6EE] shadow-xs"
        >
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B6FC5]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B6FC5]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B6FC5]" />
          </div>
        </motion.div>

        {/* 3. Mid-Left Laptop Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="absolute top-[42%] -translate-y-1/2 left-2 lg:left-8 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-48 lg:w-60 drop-shadow-md"
          >
            <svg viewBox="0 0 240 175" fill="none" className="w-full h-auto">
              {/* Screen Frame */}
              <rect x="25" y="10" width="190" height="125" rx="12" fill="#004A99" stroke="#003366" strokeWidth="2.5" />
              <rect x="35" y="20" width="170" height="105" rx="6" fill="#0F172A" />
              
              {/* Code Lines on Screen */}
              <line x1="45" y1="36" x2="110" y2="36" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
              <line x1="45" y1="48" x2="145" y2="48" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="55" y1="60" x2="165" y2="60" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="55" y1="72" x2="135" y2="72" stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="45" y1="84" x2="95" y2="84" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
              <line x1="45" y1="96" x2="155" y2="96" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />

              {/* Laptop Keyboard Deck Base */}
              <path d="M5 135 L235 135 L215 168 L25 168 Z" fill="#E8F1FC" stroke="#C2DBFC" strokeWidth="2" />
              {/* Keyboard keys grid outline */}
              <rect x="35" y="139" width="170" height="14" rx="2" fill="#D4E5FA" />
              {/* Trackpad */}
              <rect x="95" y="156" width="50" height="10" rx="2" fill="#C5DCF8" />
            </svg>
          </motion.div>
        </motion.div>

        {/* 4. Left Curly Brackets Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="absolute top-[58%] left-4 lg:left-6 hidden md:flex items-center justify-center w-10 h-10 rounded-2xl bg-white border-2 border-[#A8C6EE] text-[#3B6FC5] font-mono font-bold text-sm shadow-xs"
        >
          {'{ }'}
        </motion.div>

        {/* 5. Bottom-Left Community Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="absolute bottom-20 left-4 lg:left-10 hidden md:flex flex-col p-3 rounded-2xl bg-white border-2 border-[#A8C6EE] shadow-sm"
        >
          <span className="text-[10px] font-extrabold text-[#0B1F33] uppercase tracking-wider mb-2">
            COMMUNITY
          </span>
          <div className="flex items-center gap-1.5">
            {/* Avatar 1 */}
            <div className="w-7 h-7 rounded-full bg-[#93C5FD] flex items-center justify-center text-white">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            {/* Avatar 2 */}
            <div className="w-7 h-7 rounded-full bg-[#3B6FC5] flex items-center justify-center text-white">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            {/* Avatar 3 */}
            <div className="w-7 h-7 rounded-full bg-[#3B6FC5] flex items-center justify-center text-white">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            {/* Avatar 4 */}
            <div className="w-7 h-7 rounded-full bg-[#60A5FA] flex items-center justify-center text-white">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* 6. Left Wifi & Globe Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="absolute bottom-16 left-48 lg:left-56 hidden lg:flex items-center justify-center text-[#3B6FC5]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute bottom-8 left-16 hidden md:flex items-center justify-center w-11 h-11 rounded-2xl bg-white border-2 border-[#A8C6EE] text-[#3B6FC5] shadow-xs"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </motion.div>


        {/* ================= CENTER MAIN ACM SIGITE BRANDING ================= */}
        <div className="relative flex flex-col items-center text-center max-w-md w-full px-4 z-20">

          {/* ACM Official Diamond Emblem */}
          <div className="relative mb-5 flex items-center justify-center">
            {/* Diamond Shape */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rotate-45 rounded-2xl bg-[#3B6FC5] shadow-lg flex items-center justify-center border-[2.5px] border-white">
              {/* Inner Circle with 'acm' typography */}
              <div className="-rotate-45 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center shadow-inner">
                <span className="text-xl sm:text-2xl font-black text-[#3B6FC5] font-display tracking-tighter lowercase">
                  acm
                </span>
              </div>

              {/* Side Diamond Accent Cutouts */}
              <div className="absolute left-1 w-1.5 h-1.5 bg-white rotate-45" />
              <div className="absolute right-1 w-1.5 h-1.5 bg-white rotate-45" />
            </div>
          </div>

          {/* Main Title Typography (Renders immediately for 0ms FCP & LCP) */}
          <div className="space-y-1 mb-2">
            <h3 className="text-xl sm:text-2xl font-black tracking-widest text-[#0B1F33] uppercase font-display">
              TCET
            </h3>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0B1F33] font-display">
              ACM SIGITE
            </h1>
          </div>

          {/* Subtitle with Balance Lines */}
          <div className="flex items-center justify-center gap-3 w-full my-1.5">
            <div className="h-[2px] w-8 sm:w-12 bg-[#0F172A]" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-[#0B1F33] uppercase font-display">
              STUDENT CHAPTER
            </span>
            <div className="h-[2px] w-8 sm:w-12 bg-[#0F172A]" />
          </div>

          {/* Tagline */}
          <p className="text-sm sm:text-base font-bold text-[#3B6FC5] tracking-wide mb-6 font-display">
            Learn. Build. Connect. Lead.
          </p>

          {/* Progress Bar Container */}
          <div className="w-full max-w-xs space-y-2.5">
            <div className="relative h-2.5 w-full rounded-full bg-[#BFDBFE] overflow-hidden shadow-inner">
              <div
                ref={progressFillRef}
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#3B6FC5] to-[#3B82F6] rounded-full shadow-sm will-change-[width]"
                style={{ width: '0%' }}
              />
            </div>

            {/* Status Text Transition */}
            <div className="h-5 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isComplete ? (
                  <motion.span
                    key="ready"
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-bold text-[#3B6FC5] font-display"
                  >
                    Welcome to TCET ACM SIGITE
                  </motion.span>
                ) : (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-semibold text-[#4A607A] font-display"
                  >
                    Loading Innovation...
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>


        {/* ================= RIGHT WING ILLUSTRATIONS ================= */}

        {/* 1. Top-Right Data Chart Card */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="absolute top-8 right-4 lg:right-10 hidden md:flex flex-col p-3 rounded-2xl bg-white border-2 border-[#A8C6EE] shadow-sm w-24"
        >
          <span className="text-[10px] font-extrabold text-[#0B1F33] uppercase tracking-wider mb-1.5">
            DATA
          </span>
          <div className="flex items-center gap-2">
            {/* Pie Chart */}
            <div className="w-6 h-6 rounded-full bg-[#3B6FC5] flex items-center justify-center relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-3 h-3 bg-[#93C5FD]" />
            </div>
            <div className="space-y-1 w-full">
              <div className="w-full h-1 bg-[#C2DBFC] rounded-full" />
              <div className="w-4 h-1 bg-[#D6E8FC] rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* 2. Top-Right Cloud Upload Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-10 right-36 lg:right-44 hidden lg:flex items-center justify-center w-12 h-10 rounded-2xl bg-white border-2 border-[#A8C6EE] text-[#3B6FC5] shadow-xs"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            <polyline points="12 13 12 9 12 13" />
            <path d="m9 12 3-3 3 3" />
          </svg>
        </motion.div>

        {/* 3. Mid-Right Desktop Monitor Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-[42%] -translate-y-1/2 right-2 lg:right-8 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="w-48 lg:w-60 drop-shadow-md"
          >
            <svg viewBox="0 0 240 195" fill="none" className="w-full h-auto">
              {/* Monitor Screen Frame */}
              <rect x="20" y="10" width="200" height="140" rx="12" fill="#E8F1FC" stroke="#C2DBFC" strokeWidth="2" />
              <rect x="28" y="18" width="184" height="114" rx="6" fill="#004A99" />
              
              {/* Screen Code Content */}
              <line x1="38" y1="32" x2="60" y2="32" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
              <text x="120" y="76" fill="#FFFFFF" fontSize="30" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                {'</>'}
              </text>
              <line x1="55" y1="102" x2="165" y2="102" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="75" y1="114" x2="145" y2="114" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
              
              {/* Monitor Stand & Base */}
              <path d="M105 150 L135 150 L140 178 L100 178 Z" fill="#DCE8FA" stroke="#C2DBFC" strokeWidth="1.5" />
              <rect x="80" y="178" width="80" height="8" rx="4" fill="#E8F1FC" stroke="#C2DBFC" strokeWidth="1.5" />
            </svg>
          </motion.div>
        </motion.div>

        {/* 4. Right Terminal Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="absolute top-[38%] right-48 lg:right-56 hidden lg:flex items-center justify-center w-10 h-10 rounded-2xl bg-white border-2 border-[#A8C6EE] text-[#3B6FC5] font-mono font-bold text-sm shadow-xs"
        >
          {'>_'}
        </motion.div>

        {/* 5. Bottom-Right Connect Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="absolute bottom-20 right-4 lg:right-10 hidden md:flex flex-col p-3 rounded-2xl bg-white border-2 border-[#A8C6EE] shadow-sm"
        >
          <span className="text-[10px] font-extrabold text-[#0B1F33] uppercase tracking-wider mb-2">
            CONNECT
          </span>
          <div className="flex items-center gap-1.5">
            {/* LinkedIn */}
            <div className="w-7 h-7 rounded-full bg-[#3B6FC5] text-white flex items-center justify-center font-bold text-[10px]">
              in
            </div>
            {/* Instagram */}
            <div className="w-7 h-7 rounded-full bg-[#3B6FC5] text-white flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
            {/* GitHub */}
            <div className="w-7 h-7 rounded-full bg-[#0F172A] text-white flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </div>
            {/* Community Avatar Group */}
            <div className="w-7 h-7 rounded-full bg-[#93C5FD] text-[#3B6FC5] flex items-center justify-center">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* 6. Right Share Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="absolute bottom-10 right-48 lg:right-56 hidden lg:flex items-center justify-center w-11 h-11 rounded-2xl bg-white border-2 border-[#A8C6EE] text-[#3B6FC5] shadow-xs"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </motion.div>

      </div>


      {/* ================= BOTTOM FOOTER LOCATION PIN ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-20 pb-4 flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-extrabold tracking-[0.2em] text-[#2C5A9A] uppercase font-display"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#3B6FC5]">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>THAKUR COLLEGE OF ENGINEERING & TECHNOLOGY</span>
      </motion.div>

    </motion.div>
  );
}

export default PageLoader;
