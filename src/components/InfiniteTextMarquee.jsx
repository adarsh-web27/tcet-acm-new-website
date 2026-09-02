import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ArrowUpRight, Sparkles } from 'lucide-react';

const bannerItems = [
  {
    tag: "TCET ACM",
    title: "PIXXELHACK 2.0",
    subtitle: "36-HR NATIONAL HACKATHON",
    prize: "₹1,00,000+ PRIZES",
    link: "/events"
  },
  {
    tag: "REGISTRATIONS LIVE",
    title: "INNOVGENIUS IDEATHON",
    subtitle: "AI • WEB3 • OPEN INNOVATION",
    prize: "NATIONAL PODIUM",
    link: "/events"
  },
  {
    tag: "APRIL 2026",
    title: "TECH SUMMIT & WORKSHOPS",
    subtitle: "HANDS-ON LEARNING",
    prize: "CERTIFICATIONS",
    link: "/events"
  },
  {
    tag: "TCET ACM",
    title: "COMMUNITY DRIVES",
    subtitle: "BUILD • PITCH • WIN",
    prize: "ALUMNI MENTORSHIP",
    link: "/events"
  }
];

export default function InfiniteTextMarquee({ direction = 'left-to-right' }) {
  const isLTR = direction === 'left-to-right';
  const repeated = [...bannerItems, ...bannerItems, ...bannerItems];

  return (
    <div className="w-full overflow-hidden bg-[#1D4ED8] py-2 sm:py-2.5 shadow-sm border-y border-[#60A5FA]/40 select-none">
      
      {/* Infinite Moving Track */}
      <div 
        className="flex items-center gap-4 sm:gap-8 whitespace-nowrap w-max will-change-transform"
        style={{
          animation: `${isLTR ? 'pixxelMarqueeLTR' : 'pixxelMarqueeRTL'} 45s linear infinite`,
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        {repeated.map((item, index) => (
          <div 
            key={index}
            className="flex items-center gap-2.5 sm:gap-4 shrink-0 text-white"
          >
            {/* Tag Pill */}
            <span className="px-2 py-0.5 rounded-full bg-black/20 border border-white/20 text-[#DBEAFE] font-mono font-bold text-[10px] sm:text-xs uppercase tracking-wider">
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

            {/* Prize Highlight (Desktop only) */}
            <span className="font-mono text-[11px] sm:text-xs font-bold text-[#FDE047] uppercase tracking-wider hidden sm:inline-flex items-center gap-1">
              <Trophy className="w-3 h-3 text-[#FDE047] shrink-0" />
              {item.prize}
            </span>

            {/* Interactive Join Now Link (Desktop only) */}
            <Link
              to={item.link}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white hover:bg-amber-300 text-[#1D4ED8] hover:text-[#0F172A] font-mono text-[10px] font-black uppercase tracking-wider shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Explore</span>
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
      `}</style>
    </div>
  );
}
