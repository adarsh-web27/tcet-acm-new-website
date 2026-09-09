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
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileIdx, setMobileIdx] = useState(0);
  const total = carouselImages.length;

  // Single-source container geometry state
  const [geometry, setGeometry] = useState({
    cardWidth: 440,
    radius: 820,
    perspective: 1600
  });

  // Calculate container-measured geometry via ResizeObserver
  useEffect(() => {
    if (!canvasRef.current) return;

    const updateGeometry = (width) => {
      if (!width) return;
      // Proportional card width locked to canvas dimensions (clamped between 260px and 460px)
      const cardW = Math.round(Math.min(Math.max(width * 0.31, 260), 460));
      // Exact radius calculation: (cardW / 2 + 8px gap) / tan(PI / total)
      const r = Math.round((cardW / 2 + 8) / Math.tan(Math.PI / total));
      // Perspective matched to viewport distance
      const persp = Math.round(Math.max(width * 1.25, 900));
      setGeometry({ cardWidth: cardW, radius: r, perspective: persp });
    };

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        updateGeometry(entry.contentRect.width);
      }
    });

    ro.observe(canvasRef.current);
    updateGeometry(canvasRef.current.clientWidth);

    return () => ro.disconnect();
  }, [total]);

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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D4ED8] font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <span>TCET ACM • 2025 — 2026</span>
          </div>

          <h2 className="font-display font-[900] text-2xl sm:text-3xl text-[#0F172A] uppercase tracking-tight leading-tight">
            GLIMPSE OF <span className="text-[#1D4ED8]">MEMORIES</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1.5 leading-relaxed">
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
                  <span className="font-mono text-xs font-bold text-white px-2.5 py-0.5 rounded-full bg-[#1D4ED8] shadow-xs">
                    {mobileCards[mobileIdx].tag}
                  </span>
                </div>

                {/* Caption */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-display font-bold text-base tracking-tight leading-snug">
                    {mobileCards[mobileIdx].title}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-4 px-2 w-full">
            <button
              onClick={prevMobile}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full bg-white text-slate-800 border border-slate-200/90 flex items-center justify-center shadow-sm active:scale-90 transition-transform shrink-0 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 -ml-0.5" />
            </button>

            {/* Dots */}
            <div className="flex items-center justify-center gap-1">
              {mobileCards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="p-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] rounded-full flex items-center justify-center shrink-0"
                >
                  <span 
                    className={`transition-all duration-300 rounded-full block ${
                      i === mobileIdx 
                        ? 'w-5 h-2 bg-[#1D4ED8]' 
                        : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={nextMobile}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full bg-white text-slate-800 border border-slate-200/90 flex items-center justify-center shadow-sm active:scale-90 transition-transform shrink-0 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 -mr-0.5" />
            </button>
          </div>

          <p className="text-center text-xs font-mono text-slate-400 mt-2.5">
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
      <div className="hidden md:block w-full overflow-hidden bg-[#244B8E] select-none">
        <div 
          ref={canvasRef}
          className="memory-desktop-canvas"
          style={{
            '--card-w': `${geometry.cardWidth}px`,
            '--radius': `${geometry.radius}px`,
            '--perspective': `${geometry.perspective}px`,
            '--n': total
          }}
        >

          {/* Background curves */}
          <div className="absolute inset-0 z-0 pointer-events-none">
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
                  d="M -2880 752.5 Q -2160 602.5 -1440 752.5 Q -720 602.5 0 752.5 Q 720 602.5 1440 752.5 Q 2160 602.5 2880 752.5 Q 3600 602.5 4320 752.5"
                  fill="none"
                />
              </defs>

              <rect width="1440" height="960" fill="#244B8E" />

              <path
                d="M 0 255 Q 720 105 1440 255 L 1440 775 Q 720 625 0 775 Z"
                fill="#F8FAFC"
              />

              <path
                d="M 0 715 Q 720 565 1440 715 L 1440 790 Q 720 640 0 790 Z"
                fill="#FFFFFF"
                opacity="0.99"
                stroke="#CBD5E1"
                strokeWidth="1.5"
              />

              <text
                fontFamily="'JetBrains Mono', monospace"
                fontWeight="800"
                fontSize="14.5"
                letterSpacing="4"
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

          {/* Header */}
          <div className="memory-editorial-header relative z-20 text-center flex flex-col items-center justify-center px-4 pointer-events-none select-none max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border border-slate-200/90 text-[#2563EB] font-mono text-sm font-bold uppercase tracking-[0.2em] shadow-2xs mb-2">
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

            <p className="text-base text-slate-500 font-medium tracking-normal mt-2 max-w-md mx-auto leading-relaxed">
              A visual archive of the moments that shaped TCET ACM.
            </p>
          </div>

          {/* Carousel */}
          <div className="carousel-scene absolute z-10">
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
                  loading={index < 2 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  width={640}
                  height={400}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 1:1 Scoped Optimized CSS Engine */}
      <style>{`
        .memory-desktop-canvas {
          position: relative;
          width: min(100%, 1440px);
          aspect-ratio: 3 / 2;
          margin-inline: auto;
          overflow: hidden;
          isolation: isolate;
        }

        .memory-editorial-header {
          position: absolute;
          inset-inline: 0;
          top: 14.5%;
        }

        .carousel-scene {
          left: 0;
          right: 0;
          top: 28.5%;
          height: 45%;
          overflow: hidden;
          display: grid;
          perspective: var(--perspective, 1600px);
          contain: paint;
          isolation: isolate;
        }

        .carousel-a3d {
          display: grid;
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
          --ba: calc(1turn / var(--n));

          grid-area: 1 / 1;
          width: var(--card-w, 420px);
          aspect-ratio: 16 / 10;
          object-fit: cover;
          border-radius: 1.4rem;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform:
            rotateY(calc(var(--i) * var(--ba)))
            translateZ(calc(-1 * var(--radius, 800px)));
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22);
        }

        @media (prefers-reduced-motion: reduce) {
          .carousel-a3d {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
