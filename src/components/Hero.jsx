import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Sparkles } from 'lucide-react';
import { homeAssets } from '../assets';
import { LoadingContext } from '../App';
import InfiniteTextMarquee from './InfiniteTextMarquee';

export default function Hero() {
  return (
    <section 
      className="relative min-h-0 lg:min-h-screen flex flex-col justify-between pt-20 sm:pt-24 lg:pt-20 pb-0 w-full overflow-x-hidden select-none"
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
        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-4 sm:space-y-6 order-1 pl-0">

          {/* Chapter Kicker Micro-Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#1D4ED8] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#1D4ED8]" />
            <span>TCET ACM SIGITE CHAPTER</span>
          </div>

          {/* BIG BOLD STATEMENT HEADLINE (Direct semantic paint for 0ms LCP) */}
          <h1 className="font-display font-[900] text-[clamp(2.25rem,10vw,4.5rem)] text-[#0F172A] tracking-[-0.035em] leading-[0.96] uppercase">
            ENGINEERING <br />
            THE FUTURE <br />
            <span className="text-[#1D4ED8]">
              TOGETHER.
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-[1.6] sm:leading-[1.65] max-w-xl">
            Empowering IT engineering students through hands-on technical workshops, national hackathons, research innovation, and peer-to-peer mentorship at TCET Mumbai.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 w-full sm:w-auto">
            <Link
              to="/team"
              className="w-full sm:w-auto max-w-[340px] inline-flex items-center justify-center min-h-[46px] gap-2.5 px-6 py-3 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md shadow-slate-900/10 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Explore Chapter Crew</span>
              <ArrowUpRight className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
            </Link>

            <Link
              to="/events"
              className="w-full sm:w-auto max-w-[340px] inline-flex items-center justify-center min-h-[46px] gap-2 px-5 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-mono text-xs font-bold uppercase tracking-wider shadow-xs hover:border-slate-300 hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>View Flagship Events</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#1D4ED8]" aria-hidden="true" />
            </Link>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: CORE TEAM SHOWCASE (Expanded Width & Crisp Large Frame) ================= */}
        <div className="lg:col-span-6 w-full flex-1 min-w-0 flex justify-center lg:justify-end [perspective:1400px] order-2 mt-4 lg:mt-0">
          <div className="relative w-full max-w-xl xl:max-w-2xl translate-y-0 lg:-translate-y-[25px]">
            
            {/* Layer A: Core Frame */}
            <div className="w-full">
              {/* Layer B: Subtle Vertical Hover Float */}
              <motion.div
                animate={{ 
                  y: [0, -6, 0] 
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.6
                }}
                className="w-full"
              >
                {/* Layer C: Stable Clean Hero Frame */}
                <div className="relative p-2.5 sm:p-3 rounded-[28px] sm:rounded-[36px] bg-white/95 border-2 border-slate-200/90 shadow-[0_30px_70px_rgba(15,23,42,0.25)] hover:shadow-[0_35px_80px_rgba(37,99,235,0.2)] transition-shadow duration-500">
                  
                  {/* Inner Image Container */}
                  <div className="relative aspect-[16/11] w-full rounded-[20px] sm:rounded-[28px] overflow-hidden bg-slate-100 shadow-inner">
                    {/* Faculty & Core Photo */}
                    <picture className="w-full h-full block">
                      <source media="(max-width: 640px)" srcSet="/images/hero-team-sm.webp" type="image/webp" />
                      <img 
                        src="/images/hero-team.webp" 
                        srcSet="/images/hero-team-sm.webp 480w, /images/hero-team.webp 760w"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 760px"
                        alt="TCET ACM SIGITE Faculty Counsellors and Student Executive Core Committee"
                        className="w-full h-full object-cover object-center transform-gpu [backface-visibility:hidden]"
                        loading="eager"
                        decoding="async"
                        fetchpriority="high"
                        width={760}
                        height={507}
                      />
                    </picture>
                  </div>

                </div>
              </motion.div>
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
