import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const zephyrEvent = {
  tag: "UPCOMING EVENT",
  title: "ZEPHYR 2026",
  subtitle: "ANNUAL FLAGSHIP TECHNO-CULTURAL FEST",
  highlight: "COMING SOON",
  link: "/events?event=e-2026-zephyr"
};

export default function InfiniteTextMarquee({ direction = 'left-to-right' }) {
  const isLTR = direction === 'left-to-right';
  const repeated = Array.from({ length: 12 }, () => zephyrEvent);

  return (
    <div className="w-full overflow-hidden bg-[#2C4F99] py-2 sm:py-2.5 shadow-sm border-y border-[#4367B0]/60 select-none group">
      
      {/* Infinite Moving Track with pause on hover */}
      <div 
        className="marquee-track flex items-center gap-4 sm:gap-8 whitespace-nowrap w-max will-change-transform group-hover:[animation-play-state:paused]"
        style={{
          animation: `${isLTR ? 'pixxelMarqueeLTR' : 'pixxelMarqueeRTL'} 38s linear infinite`,
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        {repeated.map((item, index) => (
          <div 
            key={index}
            className="flex items-center gap-2.5 sm:gap-4 shrink-0 text-white"
          >
            {/* Tag Pill */}
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-[#FDE047] font-mono font-bold text-[10px] sm:text-xs uppercase tracking-wider">
              {item.tag}
            </span>

            {/* Event Name */}
            <span className="font-display font-black text-xs sm:text-sm md:text-base tracking-wide uppercase text-white drop-shadow-xs">
              {item.title}
            </span>

            {/* Subtitle (Desktop only) */}
            <span className="font-mono text-[11px] sm:text-xs text-blue-100 uppercase tracking-wider hidden md:inline">
              {item.subtitle}
            </span>

            {/* Status Highlight */}
            <span className="font-mono text-[11px] sm:text-xs font-bold text-[#FDE047] uppercase tracking-wider hidden sm:inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FDE047] shrink-0" />
              {item.highlight}
            </span>

            {/* Interactive View Event Link */}
            <Link
              to={item.link}
              aria-label="View Zephyr 2026 upcoming event details"
              className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#FFD43B] hover:bg-[#FFC71F] text-[#0B1F33] font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>View Event</span>
              <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
            </Link>

            {/* Bullet Separator */}
            <span className="text-white/40 font-black text-xs px-1">✦</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pixxelMarqueeLTR {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0%, 0, 0); }
        }
        @keyframes pixxelMarqueeRTL {
          from { transform: translate3d(0%, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-track:hover,
        .group:hover .marquee-track {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}
