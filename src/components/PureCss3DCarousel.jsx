import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import memory02 from '../assets/images/gallery/memory-02.webp'; // PixxelHack Winners (50 KB)
import memory02Sm from '../assets/images/gallery/memory-02-sm.webp'; // PixxelHack Mobile (12.7 KB)
import memory08 from '../assets/images/gallery/memory-08.webp'; // InnovGenius / Idea to Impact Seminar (40 KB)
import memory05 from '../assets/images/gallery/memory-05.webp'; // Chapter Moments & Innovation (63 KB)
import memory17 from '../assets/images/gallery/memory-17.webp'; // GenAI & Transformers Seminar (33 KB)
import memory01 from '../assets/images/gallery/memory-01.webp'; // Alumni Interaction (29 KB)
import memory06 from '../assets/images/gallery/memory-06.webp'; // Automation Expo (70 KB)

const eventText = "  ★  PIXXELHACK  ★  INNOVGENIUS  ★  ALUMNI INTERACTION  ★  ICAC3N INTERNATIONAL CONFERENCE  ★  ZEPHYR TECH FEST  ★  IIC PROTOTYPE SPRINT  ★  WEBATHON SHOWDOWN  ★  AI & GENAI SUMMIT  ★  ";
const fullTickerText = eventText.repeat(6);

const carouselImages = [
  memory02, // PixxelHack
  memory08, // InnovGenius / Idea to Impact
  memory05, // Chapter Moments & Innovation
  memory17, // Seminar - GenAI
  memory01, // Alumni Interaction
  memory06, // Automation Expo
  memory02, // PixxelHack
  memory08, // InnovGenius / Idea to Impact
  memory05, // Chapter Moments & Innovation
  memory17, // Seminar - GenAI
  memory01, // Alumni Interaction
  memory06  // Automation Expo
];

const mobileCards = [
  { image: memory02Sm, title: "PixxelHack 2025 Winners", tag: "HACKATHON" },
  { image: memory08, title: "InnovGenius / Idea to Impact", tag: "SEMINAR" },
  { image: memory05, title: "Chapter Moments & Innovation", tag: "CHAPTER" },
  { image: memory17, title: "GenAI & Transformers Masterclass", tag: "AI WORKSHOP" },
  { image: memory01, title: "Alumni Interaction 2025", tag: "ALUMNI" },
  { image: memory06, title: "Automation Expo & Robotics", tag: "EXPO" }
];

export default function PureCss3DCarousel() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileIdx, setMobileIdx] = useState(0);
  const total = carouselImages.length;

  // Stop 3D animation when scrolled away from view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextMobile = () => {
    setMobileIdx((prev) => (prev + 1) % mobileCards.length);
  };

  const prevMobile = () => {
    setMobileIdx((prev) => (prev - 1 + mobileCards.length) % mobileCards.length);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full relative select-none overflow-hidden"
    >
      {/* ========================================================= */}
      {/* ================= MOBILE MODE (block md:hidden) ========= */}
      {/* ========================================================= */}
      <div className="block md:hidden w-full bg-gradient-to-b from-[#EFF6FF] via-white to-[#EFF6FF] py-10 px-4">
        
        {/* Mobile Header */}
        <div className="text-center flex flex-col items-center justify-center max-w-sm mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D4ED8] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
            <span>TCET ACM • 2025 — 2026</span>
          </div>

          <h2 className="font-display font-[900] text-2xl sm:text-3xl text-[#0F172A] uppercase tracking-tight leading-tight">
            GLIMPSE OF <span className="text-[#1D4ED8]">MEMORIES</span>
          </h2>

          <p className="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed">
            A visual archive of the moments that shaped our chapter.
          </p>
        </div>

        {/* Swipeable Card Container */}
        <div className="w-full max-w-sm mx-auto">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-slate-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileIdx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full h-full relative"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset }) => {
                  const swipe = offset.x;
                  if (swipe < -35) nextMobile();
                  else if (swipe > 35) prevMobile();
                }}
              >
                <img
                  src={mobileCards[mobileIdx].image}
                  alt={mobileCards[mobileIdx].title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 90vw, 360px"
                  width={360}
                  height={270}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/20 pointer-events-none" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="font-mono text-[9px] font-bold text-white px-2.5 py-0.5 rounded-full bg-[#1D4ED8] shadow-xs">
                    {mobileCards[mobileIdx].tag}
                  </span>
                </div>

                {/* Caption */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-display font-bold text-sm tracking-tight leading-snug">
                    {mobileCards[mobileIdx].title}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-4 px-1">
            <button
              onClick={prevMobile}
              aria-label="Previous slide"
              className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white text-slate-800 border border-slate-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {mobileCards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="w-12 h-12 min-w-[48px] min-h-[48px] flex items-center justify-center p-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] rounded-full"
                >
                  <span 
                    className={`transition-all duration-300 rounded-full block ${
                      i === mobileIdx 
                        ? 'w-6 h-2.5 bg-[#1D4ED8]' 
                        : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={nextMobile}
              aria-label="Next slide"
              className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white text-slate-800 border border-slate-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-center text-[10px] font-mono text-slate-400 mt-2.5">
            ← Swipe left or right →
          </p>
        </div>

        {/* Gentle, Subtle Bottom Curve Divider */}
        <div className="w-full mt-6 -mb-10 overflow-hidden leading-none pointer-events-none">
          <svg 
            className="w-full h-5 text-[#F8FAFC] fill-current" 
            viewBox="0 0 1440 40" 
            preserveAspectRatio="none"
          >
            <path d="M0,0 C480,25 960,25 1440,0 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ================= DESKTOP MODE (hidden md:block) ======== */}
      {/* ========================================================= */}
      <div className="hidden md:flex w-screen min-h-screen flex-col items-center justify-start relative overflow-hidden select-none pt-12 sm:pt-16 pb-8">
        {/* Panoramic Background — Soft Refined ACM Blue (#244B8E) Atmosphere & Pearl White Dome */}
        <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 bg-[#244B8E]">
          <svg 
            className="w-full h-full" 
            viewBox="0 0 1440 960" 
            preserveAspectRatio="none" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <path 
                id="curvedBottomTextTrack" 
                d="M -2880 807.5 Q -2160 657.5 -1440 807.5 Q -720 657.5 0 807.5 Q 720 657.5 1440 807.5 Q 2160 657.5 2880 807.5 Q 3600 657.5 4320 807.5" 
                fill="none" 
              />
            </defs>

            {/* Outer Soft ACM Blue Atmosphere */}
            <rect width="1440" height="960" fill="#244B8E" />

            {/* Center Stage — Upward arched top dome and matching bottom curve in Pearl White */}
            <path 
              d="M 0 220 Q 720 70 1440 220 L 1440 830 Q 720 680 0 830 Z" 
              fill="#F8FAFC" 
            />

            {/* Expanded Bold White Ribbon along Bottom Curve */}
            <path 
              d="M 0 770 Q 720 620 1440 770 L 1440 845 Q 720 695 0 845 Z" 
              fill="#FFFFFF" 
              opacity="0.99"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />

            {/* Infinite Curved Moving Text running inside the Expanded White Ribbon */}
            <text 
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="800"
              fontSize="14.5"
              letterSpacing="4"
              style={{ textTransform: 'uppercase' }}
              fill="#0F172A"
              dominantBaseline="central"
            >
              <textPath 
                href="#curvedBottomTextTrack" 
                startOffset="0%"
              >
                {fullTickerText}
                <animate 
                  attributeName="startOffset" 
                  from="0%" 
                  to="-50%" 
                  dur="32s" 
                  repeatCount="indefinite" 
                />
              </textPath>
            </text>
          </svg>
        </div>

        {/* Editorial Header Section */}
        <div className="relative z-20 text-center flex flex-col items-center justify-center px-4 translate-y-[30px] pointer-events-none select-none max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border border-slate-200/90 text-[#2563EB] font-mono text-xs font-bold uppercase tracking-[0.2em] shadow-2xs mb-2">
            <span>TCET ACM • 2025 — 2026</span>
          </div>

          <h2 className="font-display flex flex-col items-center text-center text-[#0F172A] uppercase leading-[0.96]">
            <span className="text-3xl md:text-4xl font-extrabold text-[#0F172A]/75 tracking-tight">
              GLIMPSE OF
            </span>
            <span className="text-5xl md:text-6xl lg:text-[4.5rem] font-[900] text-[#0F172A] tracking-[-0.04em] mt-0.5">
              MEMORIES.
            </span>
          </h2>

          <p className="text-sm text-slate-500 font-medium tracking-normal mt-2 max-w-md mx-auto leading-relaxed">
            A visual archive of the moments that shaped TCET ACM.
          </p>
        </div>

        {/* 3D Scene Viewport */}
        <div className="carousel-scene w-full h-[62vh] min-h-[460px] max-h-[660px] relative z-10 -mt-4 sm:-mt-8 md:-mt-10">
          <div 
            className="carousel-a3d" 
            style={{ 
              '--n': total,
              animationPlayState: isVisible ? 'running' : 'paused'
            }}
          >
            {carouselImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`TCET ACM Archive Memory ${index + 1}`}
                className="carousel-card"
                style={{ '--i': index }}
                loading="lazy"
                decoding="async"
                width={640}
                height={400}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 1:1 Scoped Optimized CSS Engine */}
      <style>{`
        .carousel-scene, .carousel-a3d {
          display: grid;
        }

        .carousel-scene {
          overflow: hidden;
          perspective: 56em;
          contain: paint;
          isolation: isolate;
        }

        .carousel-a3d {
          place-self: center;
          transform-style: preserve-3d;
          animation: carouselRy 32s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }

        @keyframes carouselRy {
          to {
            transform: translate3d(0, 0, 0) rotateY(1turn);
          }
        }

        .carousel-card {
          --w: clamp(26em, 38vw, 40em);
          --ba: calc(1turn / var(--n));
          grid-area: 1/1;
          width: var(--w);
          aspect-ratio: 16/10;
          object-fit: cover;
          border-radius: 1.6em;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: rotateY(calc(var(--i) * var(--ba))) translateZ(calc(-1 * (0.5 * var(--w) + 0.5em) / tan(0.5 * var(--ba))));
          box-shadow: 0 12px 32px rgba(0,0,0,0.22);
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .carousel-a3d {
            animation-duration: 128s;
          }
        }
      `}</style>
    </div>
  );
}
