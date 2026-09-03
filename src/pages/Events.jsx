import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ChevronDown, FileText, Instagram, ArrowRight } from 'lucide-react';
import { EVENTS } from '../data/eventsTimelineData';

export default function Events() {
  // Active state management
  const [expandedYear, setExpandedYear] = useState(String(EVENTS[0].year));
  const [activeEventId, setActiveEventId] = useState(EVENTS[0].events[0].id);

  // Find currently active event record
  const allEvents = EVENTS.flatMap((group) => group.events);
  const activeEvent = allEvents.find((e) => e.id === activeEventId) || allEvents[0];

  // Toggle year chapter expansion
  const handleToggleYear = (yearStr) => {
    setExpandedYear(yearStr);
    // Automatically select the first event of the newly expanded year
    const targetYearGroup = EVENTS.find((g) => String(g.year) === yearStr);
    if (targetYearGroup && targetYearGroup.events.length > 0) {
      setActiveEventId(targetYearGroup.events[0].id);
    }
  };

  const getCategoryTheme = (cat) => {
    const c = (cat || '').toLowerCase();
    if (c.includes('workshop')) return { bg: 'bg-[#FFD43B]', text: 'text-[#0B1F33]', border: 'border-amber-300' };
    if (c.includes('hackathon') || c.includes('code')) return { bg: 'bg-[#1D4ED8]', text: 'text-white', border: 'border-blue-300' };
    if (c.includes('social') || c.includes('tree') || c.includes('drive')) return { bg: 'bg-[#10B981]', text: 'text-white', border: 'border-emerald-300' };
    if (c.includes('ideathon') || c.includes('summit')) return { bg: 'bg-[#8B5CF6]', text: 'text-white', border: 'border-purple-300' };
    return { bg: 'bg-[#06B6D4]', text: 'text-white', border: 'border-cyan-300' };
  };

  const activeCategoryTheme = getCategoryTheme(activeEvent?.category);

  return (
    <div className="relative min-h-screen text-[#0B1F33] pt-28 pb-20 overflow-x-hidden font-sans">
      
      {/* 1. Hero Header */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center pt-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center space-y-3"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest text-[#0B1F33] uppercase bg-[#DBEAFE] border border-[#93C5FD] shadow-xs">
            OUR JOURNEY • TIMELINE ARCHIVE
          </span>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[1.12] text-[#0B1F33] py-2">
            ARCHITECTING TECH <br className="hidden sm:inline" />
            <span className="inline-block italic pr-4 pb-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1D4ED8] via-[#3B82F6] to-[#0284C7]">
              MILESTONES
            </span>
          </h1>

          <p className="text-[#1E40AF] text-sm sm:text-base md:text-lg max-w-2xl font-medium leading-relaxed">
            Explore flagship hackathons, technical workshops, and social drives at TCET ACM SIGITE across our chapter timeline.
          </p>
        </motion.div>
      </section>

      {/* 2. Main Events Section Container */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-8 my-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* LEFT COLUMN (5 Cols): Sticky Timeline Navigation Rail on Desktop, Compact on Mobile */}
          <div className="lg:col-span-5 w-full max-w-lg lg:max-w-none mx-auto lg:sticky lg:top-28 space-y-4 bg-white/95 backdrop-blur-2xl border-2 border-[#BFDBFE] rounded-3xl p-4 sm:p-6 shadow-[0_12px_35px_-8px_rgba(29,78,216,0.12)]">
            
            <div className="text-xs font-mono font-bold text-[#0B1F33] uppercase tracking-widest pb-3 flex items-center justify-between border-b border-[#BFDBFE]">
              <span>CHAPTER TIMELINE</span>
              <span className="px-3 py-1 rounded-full bg-[#1D4ED8] text-white font-bold">{expandedYear} CHAPTER</span>
            </div>

            {/* Accordion Chapters List */}
            <div className="space-y-3">
              {EVENTS.map((yearGroup) => {
                const yrStr = String(yearGroup.year);
                const isExpanded = expandedYear === yrStr;

                return (
                  <div 
                    key={yrStr}
                    className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                      isExpanded 
                        ? 'bg-[#EFF6FF] border-[#1D4ED8] shadow-md' 
                        : 'bg-white border-[#BFDBFE] hover:border-[#3B82F6]'
                    }`}
                  >
                    {/* Year Chapter Header Button */}
                    <button
                      onClick={() => handleToggleYear(yrStr)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left group transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isExpanded ? 'rotate-0 text-[#1D4ED8]' : '-rotate-90 text-[#1E40AF]'
                          }`} 
                        />
                        <span className="font-display font-black text-xl text-[#0B1F33] tracking-tight">{yrStr}</span>
                        <span className="text-[10px] font-mono font-bold text-[#1D4ED8] bg-[#DBEAFE] px-2.5 py-0.5 rounded-full border border-[#93C5FD]">
                          {yearGroup.events.length} Events
                        </span>
                      </div>

                      <span className={`text-[11px] font-mono font-bold ${isExpanded ? 'text-[#1D4ED8]' : 'text-[#1E40AF]'}`}>
                        {isExpanded ? 'ACTIVE' : 'VIEW'}
                      </span>
                    </button>

                    {/* Smooth Accordion Sub-list for Events with scroll container */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="border-t border-[#BFDBFE] bg-white/70"
                        >
                          <div 
                            data-lenis-prevent="true"
                            data-lenis-prevent-touch="true"
                            data-lenis-prevent-wheel="true"
                            className="p-2 space-y-1.5 max-h-[220px] sm:max-h-[280px] overflow-y-auto overscroll-contain pr-1.5 touch-pan-y"
                            style={{ 
                              scrollbarWidth: 'thin', 
                              scrollbarColor: '#93C5FD transparent',
                              WebkitOverflowScrolling: 'touch',
                              overscrollBehavior: 'contain',
                              touchAction: 'pan-y'
                            }}
                          >
                            {yearGroup.events.map((ev) => {
                              const isSelected = activeEventId === ev.id;
                              const theme = getCategoryTheme(ev.category);

                              return (
                                <button
                                  key={ev.id}
                                  onClick={() => setActiveEventId(ev.id)}
                                  className={`w-full p-2 sm:p-2.5 rounded-xl text-left transition-all duration-200 flex items-center justify-between gap-2 cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#1D4ED8] text-white shadow-md scale-[1.01]'
                                      : 'bg-white hover:bg-[#EFF6FF] text-[#0B1F33] border border-slate-100 hover:border-[#93C5FD]'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 overflow-hidden">
                                    <div className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-[#FFD43B] animate-pulse' : 'bg-[#93C5FD]'}`} />
                                    <div className="flex flex-col truncate">
                                      <span className="text-xs font-bold truncate leading-tight">
                                        {ev.title}
                                      </span>
                                      <span className={`text-[10px] font-mono ${isSelected ? 'text-white/80' : 'text-[#1E40AF]'}`}>
                                        {ev.date}
                                      </span>
                                    </div>
                                  </div>

                                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                                    isSelected
                                      ? 'bg-white/20 text-white'
                                      : `${theme.bg} ${theme.text} shadow-2xs`
                                  }`}>
                                    {ev.category}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN (7 Cols): Active Event Showcase Dynamic Card */}
          <div className="lg:col-span-7 w-full max-w-lg lg:max-w-none mx-auto">
            <div className="bg-white/95 backdrop-blur-2xl border-2 border-[#BFDBFE] rounded-3xl p-4 sm:p-7 shadow-[0_12px_40px_-8px_rgba(29,78,216,0.14)] relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEvent.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-5 sm:space-y-6"
                >
                  {/* Event Showcase Image */}
                  <div className="relative group overflow-hidden rounded-2xl border-2 border-[#BFDBFE] shadow-md aspect-[16/9] bg-[#DBEAFE]">
                    <img
                      src={activeEvent.image}
                      alt={activeEvent.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width={640}
                      height={360}
                    />
                    <span className={`absolute top-2.5 left-2.5 sm:top-3 sm:left-3 font-mono text-[9px] sm:text-[10px] font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full ${activeCategoryTheme.bg} ${activeCategoryTheme.text} border ${activeCategoryTheme.border} shadow-md uppercase tracking-wider`}>
                      {activeEvent.category}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-2.5 sm:space-y-3">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
                      <span className="flex items-center gap-1.5 bg-[#DBEAFE] px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-[#93C5FD] font-bold text-[#0B1F33] shadow-xs text-[11px] sm:text-xs">
                        <Calendar className="w-3.5 h-3.5 text-[#D97706]" />
                        {activeEvent.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-[#1E40AF] font-semibold text-[11px] sm:text-xs">
                        <MapPin className="w-3.5 h-3.5 text-[#EF4444]" />
                        {activeEvent.location}
                      </span>
                    </div>

                    <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-[#0B1F33] tracking-tight leading-snug">
                      {activeEvent.title}
                    </h2>

                    <p className="text-xs sm:text-sm font-bold text-[#1D4ED8]">
                      {activeEvent.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-[#1E40AF] leading-relaxed font-medium">
                      {activeEvent.desc}
                    </p>
                  </div>

                  {/* Event Statistics Grid */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-[#EFF6FF] border-2 border-[#BFDBFE]">
                    {activeEvent.stats.map((st, i) => {
                      const statCol = ['text-[#1D4ED8]', 'text-[#D97706]', 'text-[#059669]'][i % 3];
                      return (
                        <div key={i} className="flex flex-col text-left">
                          <span className={`font-display font-black text-base sm:text-xl md:text-2xl ${statCol}`}>
                            {st.value}
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#1E40AF] uppercase tracking-wider mt-0.5">
                            {st.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dual Action Cards: EVENT REPORT & INSTAGRAM REEL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {/* 1. EVENT REPORT BUTTON */}
                    {activeEvent.reportUrl && (
                      <a
                        href={activeEvent.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Official Event PDF Report for ${activeEvent.title}`}
                        className="group flex items-center justify-between p-3.5 rounded-2xl bg-white border-2 border-[#93C5FD] hover:border-[#1D4ED8] hover:bg-[#1D4ED8] hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-[#DBEAFE] text-[#1D4ED8] flex items-center justify-center group-hover:bg-white group-hover:text-[#1D4ED8] transition-colors shadow-xs">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="font-mono text-[11px] font-black text-[#0B1F33] group-hover:text-white tracking-wider uppercase">
                              VIEW REPORT
                            </span>
                            <span className="text-[9px] text-[#1E40AF] group-hover:text-white/80 font-medium">
                              Official Event PDF Report
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#1D4ED8] group-hover:text-white group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}

                    {/* 2. INSTAGRAM REEL BUTTON */}
                    {activeEvent.instagramUrl && (
                      <a
                        href={activeEvent.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 hover:border-pink-500 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-pink-500 text-white flex items-center justify-center shadow-xs">
                            <Instagram className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="font-mono text-[11px] font-black text-pink-950 tracking-wider uppercase">
                              INSTAGRAM REEL
                            </span>
                            <span className="text-[9px] text-pink-700 font-medium">
                              Watch event highlights
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-pink-600 group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}