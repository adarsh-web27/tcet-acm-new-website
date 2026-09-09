import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { ArrowUpRight, MapPin, FileText, Calendar } from 'lucide-react';
import { clubEvents } from '../assets/eventsAssets';

export default function EventsHorizontalScroll() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useLayoutEffect(() => {
    const trigger = triggerRef.current;
    const section = sectionRef.current;
    if (!trigger || !section) return;

    const mm = gsap.matchMedia();

    // Desktop: Pin & horizontal scrub when viewport >= 1024px and motion is enabled
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const getScrollAmount = () => {
        const availableWidth = trigger.clientWidth || document.documentElement.clientWidth;
        return -(section.scrollWidth - availableWidth + 80);
      };

      const tween = gsap.to(section, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.5,
          invalidateOnRefresh: true,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          fastScrollEnd: true,
          preventOverlaps: true,
        }
      });

      return () => {
        tween.kill();
      };
    });

    // Mobile / Tablet (< 1024px) or reduced motion fallback: clean transforms for native touch scroll
    mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
      gsap.set(section, { clearProps: "transform" });
    });

    // ResizeObserver to automatically refresh ScrollTrigger if content or fonts resize
    let resizeTimer;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 60);
    });

    ro.observe(section);
    ro.observe(trigger);

    return () => {
      clearTimeout(resizeTimer);
      ro.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <section 
      ref={triggerRef} 
      className="relative w-full min-h-0 lg:h-screen lg:min-h-[640px] overflow-hidden bg-white flex flex-col justify-between pt-5 sm:pt-8 lg:pt-5 pb-6 sm:pb-8 lg:pb-7 z-30 select-none will-change-transform"
    >
      {/* Solid opaque background */}
      <div className="absolute inset-0 bg-white -z-20" />

      {/* Header — Elevated with comfortable clearance above cards */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-16 lg:px-24 relative z-10 pointer-events-none flex-shrink-0 mb-3 sm:mb-6 lg:mb-2 xl:mb-4">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 sm:gap-6">
          <div className="max-w-2xl pointer-events-auto space-y-1 sm:space-y-1.5">
            <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-display font-[900] tracking-[-0.035em] leading-[0.98] text-[#0F172A] uppercase">
              Building Experiences.
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-xl font-medium line-clamp-2 sm:line-clamp-none">
              From technical workshops and hackathons to community initiatives,
              every event is designed to help students learn, collaborate and
              create something meaningful together.
            </p>
          </div>

          <Link
            to="/events"
            className="group inline-flex items-center gap-2.5 self-start lg:self-end text-[#0F172A] pointer-events-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white border border-slate-300 shadow-sm hover:shadow-md hover:border-[#1D4ED8] hover:bg-slate-50 transition-all duration-300 cursor-pointer shrink-0 mb-1"
          >
            <span className="text-xs sm:text-sm uppercase tracking-wider font-mono font-bold text-[#0F172A] transition-colors">
              Explore All Events
            </span>

            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center group-hover:bg-[#0F172A] transition-all">
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
              className="w-[84vw] sm:w-[370px] md:w-[380px] min-w-[280px] sm:min-w-[370px] h-[405px] sm:h-[425px] lg:h-[415px] xl:h-[445px] rounded-[1.8rem] sm:rounded-[2rem] bg-white border border-slate-200/90 p-4 sm:p-4.5 lg:p-4 xl:p-5 flex flex-col justify-between shadow-[0_10px_30px_-8px_rgba(0,0,0,0.06)] relative group hover:border-[#1D4ED8] hover:shadow-[0_20px_50px_-10px_rgba(29,78,216,0.18)] hover:-translate-y-1 transition-all duration-300 flex-shrink-0 overflow-hidden snap-center"
            >

              <div>
                {/* Media frame */}
                <div className="w-full h-[175px] sm:h-[190px] lg:h-[180px] xl:h-[200px] rounded-xl sm:rounded-2xl overflow-hidden mb-3 relative bg-slate-100 border border-slate-100">
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
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B1F33]/90 text-xs font-mono font-bold text-white border border-white/20 shadow-md flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#FFD43B]" />
                    <span>{event.date}</span>
                  </div>

                  {/* Floating Category Badge */}
                  <span className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider ${event.badgeTheme.bg} ${event.badgeTheme.text} border ${event.badgeTheme.border} shadow-md`}>
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
                <div className="space-y-1 sm:space-y-1.5">
                  <h3 className="font-display font-black text-base sm:text-lg tracking-tight text-[#0B1F33] group-hover:text-[#1D4ED8] transition-colors line-clamp-1 leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-mono font-semibold text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" />
                    <span>{event.location}</span>
                  </p>
                  
                  <p className="text-xs sm:text-sm text-slate-600 font-medium line-clamp-2 leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between">
                {event.reportUrl ? (
                  <a 
                    href={event.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Official Event PDF Report for ${event.title}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono font-bold text-slate-700 hover:bg-[#1D4ED8] hover:text-white hover:border-[#1D4ED8] transition-all shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Report</span>
                  </a>
                ) : (
                  <span className="text-xs sm:text-sm font-mono font-bold text-slate-500 uppercase tracking-wider">
                    TCET ACM CHAPTER
                  </span>
                )}
                <span className="text-xs sm:text-sm font-mono font-bold text-[#1D4ED8] px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                  TCET ACM
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-2 sm:h-3 flex-shrink-0" />

    </section>
  );
}