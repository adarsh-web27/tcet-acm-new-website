import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedCube from './AnimatedCube/AnimatedCube';
import { ArrowUpRight, Check, Heart } from 'lucide-react';

export default function FooterBento() {
  const [copied, setCopied] = useState(false);
  const [terminalStep, setTerminalStep] = useState(0);

  const steps = [
    "Finding passionate developers...",
    "Locking in workshop schedules...",
    "Booting up national hackathons...",
    "Connecting TCET to ACM USA..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTerminalStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(interval);
  }, [steps.length]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("acm.sigite@tcet.ac.in");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative w-full py-12 sm:py-16 lg:py-24 px-4 sm:px-8 lg:px-24 bg-gradient-to-b from-[#EFF6FF] via-[#DBEAFE]/80 to-[#BFDBFE]/60 text-[#0B1F33] overflow-hidden select-none border-t-2 border-[#BFDBFE]">
      
      {/* Soft background ambient gradient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#93C5FD]/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#DBEAFE]/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ================= 2-COLUMN BENTO FOOTER LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-12 sm:mb-16">
          
          {/* LEFT COLUMN: Large Immersive Animation Card (Mascot) */}
          <div className="lg:col-span-5 rounded-3xl sm:rounded-[36px] bg-white/95 border-2 border-[#BFDBFE] p-6 sm:p-8 lg:p-10 flex flex-col items-center justify-between relative overflow-hidden backdrop-blur-xl group hover:border-[#1D4ED8] hover:shadow-[0_20px_50px_-10px_rgba(29,78,216,0.16)] transition-all duration-500 shadow-xl min-h-[460px] sm:min-h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />
            
            {/* Top Tag */}
            <div className="w-full flex items-center justify-between relative z-10 mb-3">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-[#1E40AF] font-bold">
                // TCET_ACM_MASCOT
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-950 font-mono text-[9px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                LIVE
              </span>
            </div>

            {/* Scaled Immersive Mascot Container — Elongated and Roomy */}
            <div className="relative z-10 flex items-center justify-center flex-1 w-full my-auto py-8 sm:py-10">
              <div className="w-[200px] sm:w-[240px] md:w-[260px] aspect-square flex items-center justify-center">
                <AnimatedCube />
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="relative z-10 text-center w-full pt-4 border-t border-[#BFDBFE]">
              <h3 className="font-display font-black text-base sm:text-lg text-[#0B1F33] tracking-tight">
                Byte • Chapter Mascot
              </h3>
              <p className="text-xs text-[#1E40AF] mt-1 font-medium">
                Tap or move cursor to interact with Byte!
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Terminal & Bentos Content */}
          <div className="lg:col-span-7 rounded-3xl sm:rounded-[36px] bg-white/95 border-2 border-[#BFDBFE] p-6 sm:p-8 md:p-10 flex flex-col justify-between backdrop-blur-xl group hover:border-[#1D4ED8] hover:shadow-[0_20px_50px_-10px_rgba(29,78,216,0.16)] transition-all duration-500 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[#3B82F6]/5 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

            <div className="relative z-10">
              {/* Live Terminal Window */}
              <div className="w-full rounded-2xl bg-[#0B1F33] border-2 border-slate-700/80 p-5 sm:p-6 mb-6 sm:mb-8 text-left shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/90 block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/90 block" />
                    <span className="w-3 h-3 rounded-full bg-[#10B981] block" />
                  </div>
                  <span className="text-xs font-mono text-[#93C5FD]">bash • acm@tcet-sigite</span>
                </div>
                
                <div className="font-mono text-xs md:text-sm space-y-2 text-neutral-200">
                  <p className="text-[#93C5FD] font-bold">$ initialize future</p>
                  {steps.map((step, idx) => (
                    <div key={idx} className={`transition-opacity duration-300 ${idx <= terminalStep ? 'opacity-100' : 'opacity-30'}`}>
                      {idx <= terminalStep ? (
                        <span className="text-[#34D399]">✓ {step}</span>
                      ) : (
                        <span className="text-neutral-400">⏳ {step}</span>
                      )}
                    </div>
                  ))}
                  {terminalStep === steps.length - 1 && (
                    <p className="pt-2 text-white font-bold flex items-center gap-2 animate-fadeIn">
                      <span className="text-[#93C5FD]">&gt;</span> Ready to execute? <span className="w-2 h-4 bg-[#FFD43B] animate-pulse inline-block" />
                    </p>
                  )}
                </div>
              </div>

              {/* Developer Journey Roadmap */}
              <div>
                <span className="text-xs font-bold font-mono uppercase tracking-[0.25em] text-[#1E40AF] mb-3 block">
                  Your Developer Journey
                </span>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 sm:gap-3">
                  {['Join', 'Learn', 'Build', 'Lead', 'Mentor'].map((stage, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-[#EFF6FF] border-2 border-[#BFDBFE] text-center relative group/stage hover:border-[#1D4ED8] hover:bg-[#DBEAFE] transition-all shadow-xs">
                      <span className="block font-mono font-black text-xs text-[#1D4ED8] mb-0.5">0{idx + 1}</span>
                      <span className="font-bold text-xs text-[#0B1F33]">{stage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Primary Emotional CTA inside Right Bento */}
            <div className="mt-6 sm:mt-8 pt-6 border-t border-[#BFDBFE] flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
              <span className="text-xs text-[#1E40AF] font-bold text-center sm:text-left">
                Ready to build your engineering legacy?
              </span>
              <Link 
                to="/contact" 
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#FFD43B] text-[#0B1F33] font-mono font-black text-xs uppercase tracking-wider shadow-md shadow-[#FFD43B]/25 hover:scale-105 hover:bg-[#FFC71F] transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Join ACM SIGITE</span>
                <span>→</span>
              </Link>
            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#BFDBFE] mb-8" />

        {/* Bottom Bar: Socials & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs md:text-sm font-bold text-[#1E40AF]">
            <a href="https://github.com/tcet-acm" target="_blank" rel="noreferrer" className="hover:text-[#1D4ED8] transition-colors flex items-center gap-1">
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a href="https://linkedin.com/company/tcet-acm" target="_blank" rel="noreferrer" className="hover:text-[#1D4ED8] transition-colors flex items-center gap-1">
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a href="https://instagram.com/tcet_acm" target="_blank" rel="noreferrer" className="hover:text-[#1D4ED8] transition-colors flex items-center gap-1">
              <span>Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button onClick={handleCopyEmail} className="hover:text-[#1D4ED8] transition-colors cursor-pointer flex items-center gap-1">
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="text-[#10B981]">Copied Email!</span>
                </>
              ) : (
                <>
                  <span>Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-[#1E40AF] font-medium tracking-wide text-center">
            © 2026 TCET ACM SIGITE Chapter • Made with <Heart className="w-3.5 h-3.5 inline text-rose-500 fill-rose-500 mx-0.5" /> for engineering excellence.
          </p>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </footer>
  );
}