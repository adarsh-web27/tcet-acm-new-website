import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Sparkles, 
  Zap, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Medal, 
  Flame
} from 'lucide-react';
import { achievementsData } from '../assets/achievementsAssets';

export default function Achievements() {
  const achievements = achievementsData;

  const stats = [
    { label: "National Recognitions", value: "06+" },
    { label: "Hackathon Victories", value: "18+" },
    { label: "Cash Prizes Won", value: "₹1.8L+" },
    { label: "Verified Submissions", value: "100%" }
  ];

  return (
    <section id="achievements" className="py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative overflow-hidden font-sans">
      
      {/* Massive Faded Background Typography Watermark */}
      <div className="absolute top-36 left-1/2 -translate-x-1/2 text-[15vw] font-display font-black text-[#0B1F33]/[0.04] uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
        HALL OF FAME
      </div>

      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-4 mb-20 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs font-bold text-[#1E40AF] uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#DBEAFE] border border-[#93C5FD] shadow-xs"
        >
          CHAPTER HALL OF FAME
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#0B1F33] tracking-tight uppercase"
        >
          HONOURS & ACHIEVEMENTS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-[#1E40AF] max-w-2xl font-medium leading-relaxed"
        >
          Celebrating our student scholars, national hackathon champions, and research pioneers recognized across India for computational excellence.
        </motion.p>

        {/* Quick Highlights Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl pt-4"
        >
          {stats.map((st, idx) => {
            const statColors = ['text-[#1D4ED8]', 'text-[#D97706]', 'text-[#059669]', 'text-[#7C3AED]'];
            const colorClass = statColors[idx % statColors.length];
            return (
              <div
                key={st.label}
                className="p-4 sm:p-5 rounded-2xl bg-white/95 border-2 border-[#93C5FD] shadow-md flex flex-col items-center justify-center text-center space-y-1 hover:border-[#1D4ED8]/40 hover:-translate-y-0.5 transition-all"
              >
                <span className={`font-display font-black text-2xl sm:text-3xl ${colorClass}`}>
                  {st.value}
                </span>
                <span className="font-mono text-[10px] sm:text-xs font-bold text-[#1E40AF] uppercase tracking-wider">
                  {st.label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Dynamic Alternating Timeline Showcase */}
      <div className="space-y-8 sm:space-y-12 relative z-10">
        {achievements.map((item, idx) => {
          const IconComp = item.icon;
          const isImageLeft = idx % 2 === 1; // Alternating pattern

          return (
            <div
              key={item.title}
              className="group relative bg-white rounded-3xl sm:rounded-[36px] border-2 border-[#93C5FD] hover:border-[#1D4ED8]/50 shadow-[0_12px_40px_-10px_rgba(3,109,164,0.12)] hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[360px]">
                
                {/* 1. Image Block */}
                <div
                  className={`md:col-span-5 relative p-3 sm:p-4 md:p-5 lg:p-6 flex ${
                    isImageLeft 
                      ? 'order-1 md:order-1' 
                      : 'order-1 md:order-2'
                  }`}
                >
                  <div className="relative w-full h-64 md:h-full min-h-[250px] sm:min-h-[290px] rounded-2xl lg:rounded-[26px] overflow-hidden bg-slate-100 shadow-inner">
                    
                    {/* Edge-to-Edge Achievement Photograph */}
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                      loading="eager"
                      decoding="async"
                      width={800}
                      height={533}
                    />

                    {/* Floating Milestone Number & Year Badge */}
                    <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-sm border border-white/20 text-white font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                      <IconComp className={`w-3.5 h-3.5 ${item.badgeColor}`} />
                      <span>{item.year}</span>
                    </div>

                    <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-sm border border-white/15 text-white/90 font-mono text-[10px] font-extrabold tracking-widest uppercase shadow-md">
                      NO. {item.id}
                    </div>

                    {/* Bottom Image Caption */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-sm border border-white/20 flex items-center justify-between text-white text-[11px] font-mono font-semibold shadow-md">
                      <span className="truncate opacity-90">{item.organization}</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Content Block */}
                <div
                  className={`md:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6 ${
                    isImageLeft 
                      ? 'order-2 md:order-2' 
                      : 'order-2 md:order-1'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Category Tag + Year Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#DBEAFE] border border-[#93C5FD] text-[#0B1F33] text-xs font-mono font-bold uppercase tracking-wider">
                        <Sparkles className="w-3 h-3 text-[#1D4ED8]" />
                        <span>{item.category}</span>
                      </span>

                      <span className="font-mono text-xs font-bold text-[#0B1F33] px-3.5 py-1 rounded-full bg-[#DBEAFE] border border-[#93C5FD]">
                        {item.year} EDITION
                      </span>
                    </div>

                    {/* Organization Subtitle */}
                    <div className="flex items-center gap-2 pt-1">
                      <div className="w-7 h-7 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0">
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#1E40AF] uppercase tracking-wider">
                        {item.organization}
                      </span>
                    </div>

                    {/* Achievement Title */}
                    <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-[32px] text-[#0B1F33] tracking-tight leading-tight">
                      {item.title}
                    </h3>

                    {/* Descriptive Narrative */}
                    <p className="text-sm sm:text-base text-[#1E40AF] leading-relaxed font-medium">
                      {item.description}
                    </p>

                    {/* Highlight Spec Badge */}
                    <div className="pt-2">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#DBEAFE]/80 border border-[#93C5FD] text-xs font-mono font-bold text-[#0B1F33]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                        <span>{item.highlight}</span>
                      </div>
                    </div>
                  </div>

                  {/* Verification & Institutional Footer */}
                  <div className="pt-5 border-t border-[#93C5FD]/60 flex items-center justify-between text-xs text-[#1E40AF] font-mono">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#059669]" />
                      <span className="font-bold">VERIFIED BY TCET IT DEPT</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] font-bold text-emerald-700 uppercase hidden sm:inline">
                        Institutional Record
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
