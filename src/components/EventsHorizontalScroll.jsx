import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { ArrowUpRight, MapPin, FileText, Sparkles, Calendar } from 'lucide-react';
import { clubEvents } from '../assets/eventsAssets';

export default function EventsHorizontalScroll() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useLayoutEffect(() => {
    // Only pin and animate horizontal scroll on desktop (lg+ screens)
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;
      const getScrollAmount = () => -(section.scrollWidth - window.innerWidth + 100);

      gsap.to(section, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          refreshPriority: 1,
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={triggerRef} 
      className="relative w-full min-h-0 lg:min-h-screen overflow-hidden bg-[#EFF6FF] transition-colors duration-300 flex flex-col justify-between pt-10 sm:pt-14 lg:pt-10 pb-8 sm:pb-12 z-30 select-none"
    >
      {/* Solid opaque background */}
      <div className="absolute inset-0 bg-[#EFF6FF] -z-20" />

      {/* Header — Elevated with comfortable clearance above cards */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-16 lg:px-24 relative z-10 pointer-events-none flex-shrink-0 mb-4 sm:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl pointer-events-auto space-y-1.5 sm:space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-[900] tracking-[-0.035em] leading-[0.98] text-[#0F172A] uppercase">
              Building Experiences.
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-xl font-medium">
              From technical workshops and hackathons to community initiatives,
              every event is designed to help students learn, collaborate and
              create something meaningful together.
            </p>
          </div>

          <Link
            to="/events"
            className="group inline-flex items-center gap-3 self-start lg:self-end text-[#0F172A] pointer-events-auto px-5 py-2.5 rounded-full bg-white border border-slate-300 shadow-sm hover:shadow-md hover:border-[#1D4ED8] hover:bg-slate-50 transition-all duration-300 cursor-pointer shrink-0 mb-1 lg:mb-2"
          >
            <span className="text-xs uppercase tracking-wider font-mono font-bold text-[#0F172A] transition-colors">
              Explore All Events
            </span>

            <div className="w-7 h-7 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center group-hover:bg-[#0F172A] transition-all">
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        </div>
      </div>

      {/* Horizontal Scrolling Track (Touch swipe on mobile, GSAP scrubbed on desktop) */}
      <div className="w-full overflow-x-auto lg:overflow-visible relative z-10 my-auto scrollbar-none snap-x snap-mandatory lg:snap-none">
        <div ref={sectionRef} className="flex gap-4 sm:gap-7 px-4 sm:px-6 md:pl-24 flex-nowrap w-max items-center py-2">
          
          {clubEvents.map((event, index) => (
            <div
              key={index}
              className="w-[84vw] sm:w-[380px] md:w-[390px] min-w-[280px] sm:min-w-[380px] h-[460px] sm:h-[480px] rounded-[2rem] sm:rounded-[2.2rem] bg-white border-2 border-[#BFDBFE] p-4 sm:p-5 flex flex-col justify-between shadow-[0_12px_35px_-8px_rgba(29,78,216,0.12)] relative group hover:border-[#1D4ED8] hover:shadow-[0_20px_50px_-10px_rgba(29,78,216,0.22)] hover:-translate-y-1 transition-all duration-300 flex-shrink-0 overflow-hidden snap-center"
            >

              <div>
                {/* Media frame */}
                <div className="w-full h-[220px] rounded-2xl overflow-hidden mb-4 relative bg-[#DBEAFE] border border-slate-100">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    loading="lazy"
                    decoding="async"
                    width={390}
                    height={220}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Floating Date Chip */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B1F33]/90 text-[11px] font-mono font-bold text-white border border-white/20 shadow-md flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#FFD43B]" />
                    <span>{event.date}</span>
                  </div>

                  {/* Floating Category Badge */}
                  <span className={`absolute top-3 right-3 rounded-full px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider ${event.badgeTheme.bg} ${event.badgeTheme.text} border ${event.badgeTheme.border} shadow-md`}>
                    {event.badge}
                  </span>

                  {/* Hover Action Circle */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="w-9 h-9 rounded-full bg-[#FFD43B] text-[#0B1F33] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-display font-black text-lg tracking-tight text-[#0B1F33] group-hover:text-[#1D4ED8] transition-colors line-clamp-1 leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-xs font-mono font-semibold text-[#1E40AF] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" />
                    <span>{event.location}</span>
                  </p>
                  
                  <p className="text-xs text-[#1E40AF] font-medium line-clamp-2 leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-[#BFDBFE] flex items-center justify-between">
                {event.reportUrl ? (
                  <a 
                    href={event.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFF6FF] border border-[#93C5FD] text-[11px] font-mono font-bold text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white transition-all shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Report</span>
                  </a>
                ) : (
                  <span className="text-[11px] font-mono font-bold text-[#1E40AF] uppercase tracking-wider">
                    TCET ACM CHAPTER
                  </span>
                )}
                <span className="text-[10px] font-mono font-bold text-[#1D4ED8] px-2 py-0.5 rounded bg-[#DBEAFE] border border-[#93C5FD]">
                  TCET ACM
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-4 flex-shrink-0" />

    </section>
  );
}