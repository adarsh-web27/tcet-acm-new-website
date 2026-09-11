import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, Users, Monitor, ArrowRight } from 'lucide-react';
import { LoadingContext } from '../App';
import InfiniteTextMarquee from './InfiniteTextMarquee';
import { getLenis } from '../hooks/useLenis';

export default function Hero() {
  return (
    <section 
      className="relative min-h-0 lg:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 lg:pt-28 pb-0 w-full overflow-x-hidden select-none"
    >
      {/* ================= HERO BACKGROUND GRAPHIC ASSET ================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden bg-white">
        {/* Mobile & Tablet: Clean White Backdrop with subtle soft ambient glow */}
        <div className="block lg:hidden absolute inset-0 bg-gradient-to-b from-white via-[#EFF6FF]/70 to-white" />

        {/* Desktop (lg+): Symmetrical Right ACM Blue Chevron Wing */}
        <svg 
          className="hidden lg:block w-full h-full" 
          viewBox="0 0 1440 960" 
          preserveAspectRatio="none" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pure Clean White Canvas on the Left */}
          <rect width="1440" height="960" fill="#FFFFFF" />

          {/* Symmetrical Right ACM Blue Chevron Wing */}
          <path 
            d="M 600 0 L 1440 0 L 1440 960 L 560 960 L 960 455 Z" 
            fill="#2E539F" 
          />
        </svg>
      </div>

      {/* ================= MAIN RESPONSIVE HERO GRID CONTAINER ================= */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center w-full relative z-10 py-4 my-auto">
        
        {/* ================= LEFT COLUMN: BIG BOLD STATEMENT TYPOGRAPHY (On Left White Canvas) ================= */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6 order-1 pl-0">


          {/* BIG BOLD STATEMENT HEADLINE (Direct semantic paint for 0ms LCP) */}
          <h1 className="font-display font-[900] text-[clamp(2.25rem,10vw,4.5rem)] text-[#0F172A] tracking-[-0.035em] leading-[0.96] uppercase text-center lg:text-left">
            ENGINEERING <br />
            THE FUTURE <br />
            <span className="text-[#1D4ED8]">
              TOGETHER.
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-[1.6] sm:leading-[1.65] max-w-xl text-center lg:text-left mx-auto lg:mx-0">
            Empowering IT engineering students through hands-on technical workshops, national hackathons, research innovation, social causes, educational drives, and peer-to-peer mentorship at TCET Mumbai.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                const targetEl = document.getElementById('about-section');
                if (targetEl) {
                  const lenis = getLenis();
                  if (lenis) {
                    lenis.scrollTo(targetEl, { offset: 0 });
                  } else {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              aria-label="Explore Our Chapter"
              className="w-full sm:w-auto max-w-[340px] inline-flex items-center justify-center min-h-[46px] gap-2.5 px-6 py-3 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md shadow-slate-900/10 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Explore Our Chapter</span>
              <ArrowDown className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
            </button>

            <Link
              to="/events"
              className="w-full sm:w-auto max-w-[340px] inline-flex items-center justify-center min-h-[46px] gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all border border-blue-400/40 cursor-pointer group/events"
            >
              <span>View Flagship Events</span>
              <ArrowRight className="w-4 h-4 text-cyan-300 font-extrabold stroke-[2.5] group-hover/events:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 sm:gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm font-medium text-slate-700 w-full">
            <div className="inline-flex items-center gap-2">
              <Users className="w-4 h-4 text-[#0284C7] shrink-0" />
              <span><strong className="text-slate-900 font-bold">140+</strong> Active members</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Users className="w-4 h-4 text-[#0284C7] shrink-0" />
              <span><strong className="text-slate-900 font-bold">1155+</strong> members</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Monitor className="w-4 h-4 text-[#0284C7] shrink-0" />
              <span><strong className="text-slate-900 font-bold">120+</strong> events</span>
            </div>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: CORE TEAM SHOWCASE (Expanded Width & Crisp Large Frame) ================= */}
        <div className="lg:col-span-6 w-full flex-1 min-w-0 flex justify-center lg:justify-end order-2 mt-4 lg:mt-0">
          <div className="relative w-full max-w-xl xl:max-w-2xl translate-y-0 lg:-translate-y-[25px]">
            
            {/* Crisp Frame with Clean Hover Lift */}
            <div className="w-full hover:-translate-y-1.5 transition-transform duration-300 ease-out">
              {/* Stable Clean Hero Card Frame */}
              <div className="relative p-2.5 sm:p-3 rounded-[28px] sm:rounded-[36px] bg-white/95 border-2 border-slate-200/90 shadow-[0_30px_70px_rgba(15,23,42,0.25)] hover:shadow-[0_35px_80px_rgba(37,99,235,0.2)] transition-shadow duration-500">
                
                {/* Inner Image Container (exact aspect matching cropped 1900x1400 master photo) */}
                <div className="relative aspect-[19/14] w-full rounded-[20px] sm:rounded-[28px] overflow-hidden bg-slate-100 shadow-inner">
                  {/* Faculty & Core Photo (Rendered directly at native display density) */}
                  <picture className="w-full h-full block">
                    <source media="(max-width: 640px)" srcSet="/images/hero-team-sm.webp?v=1.1" type="image/webp" />
                    <img 
                      src="/images/hero-team.webp?v=1.1" 
                      srcSet="/images/hero-team-sm.webp?v=1.1 1000w, /images/hero-team.webp?v=1.1 1900w"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
                      alt="TCET ACM SIGITE Faculty Counsellors and Student Executive Core Committee"
                      className="w-full h-full object-cover object-center"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      width={1900}
                      height={1400}
                    />
                  </picture>
                </div>

              </div>
            </div>

          </div>
        </div>

        </div>
      </div>

      {/* ================= BOTTOM INFINITE TEXT STRIP (LOCKED FLUSH AT BOTTOM) ================= */}
      <div className="w-full shrink-0 relative z-20 pb-0 mt-auto">
        <InfiniteTextMarquee direction="left-to-right" />
      </div>
    </section>
  );
}
