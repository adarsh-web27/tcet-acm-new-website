import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedCube from './AnimatedCube/AnimatedCube';
import { Heart, Linkedin, Instagram } from 'lucide-react';

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
      setTerminalStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [steps.length]);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText("tcetacm@thakureducation.org");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = "tcetacm@thakureducation.org";
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = "mailto:tcetacm@thakureducation.org";
    }
  };

  return (
    <footer className="relative w-full py-12 sm:py-16 lg:py-24 px-4 sm:px-8 lg:px-24 bg-white text-[#0B1F33] overflow-hidden select-none border-t border-slate-200">
      
      <div className="max-w-7xl mx-auto relative z-10">

        {/* ================= 2-COLUMN BENTO FOOTER LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-12 sm:mb-16">
          
          {/* LEFT COLUMN: Large Immersive Animation Card (Mascot) */}
          <div className="lg:col-span-5 rounded-3xl sm:rounded-[36px] bg-white border-2 border-[#BFDBFE] p-6 sm:p-8 flex flex-col items-center justify-between relative overflow-hidden backdrop-blur-xl group hover:border-[#2E539F] hover:shadow-[0_20px_50px_-10px_rgba(46,83,159,0.2)] transition-all duration-500 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] min-h-[380px] sm:min-h-[440px]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2E539F]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />
            
            {/* Top Tag */}
            <div className="w-full flex items-center justify-between relative z-10 mb-3">
              <span className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-[#2E539F] font-bold">
                // TCET_ACM_SIGITE
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-950 font-mono text-xs font-bold">
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
              <p className="text-xs sm:text-sm text-[#2E539F] mt-1 font-medium">
                Tap or move cursor to interact with Byte!
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Terminal & Bentos Content */}
          <div className="lg:col-span-7 rounded-3xl sm:rounded-[36px] bg-white border-2 border-[#BFDBFE] p-6 sm:p-8 md:p-10 flex flex-col justify-between backdrop-blur-xl group hover:border-[#2E539F] hover:shadow-[0_20px_50px_-10px_rgba(46,83,159,0.2)] transition-all duration-500 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[#2E539F]/5 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

            <div className="relative z-10">
              {/* Live Terminal Window with #2E539F Ambient Blur and Glow */}
              <div className="relative group/terminal">
                {/* Terminal Ambient #2E539F Blur Glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#2E539F]/45 via-[#4674D4]/35 to-[#2E539F]/45 rounded-3xl blur-xl opacity-75 group-hover/terminal:opacity-100 transition duration-500 pointer-events-none" />

                <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#132344] via-[#0D1C36] to-[#091426] border-2 border-[#2E539F]/60 p-5 sm:p-6 text-left shadow-[0_15px_35px_-5px_rgba(46,83,159,0.45)] backdrop-blur-xl">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2E539F]/30">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/90 block" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/90 block" />
                      <span className="w-3 h-3 rounded-full bg-[#10B981] block" />
                    </div>
                    <span className="text-xs sm:text-sm font-mono text-[#769CE6] font-medium">bash • acm@tcet-sigite</span>
                  </div>
                  
                  <div className="font-mono text-sm md:text-base space-y-2 text-white">
                    <p className="text-[#769CE6] font-bold">$ initialize future</p>
                    {steps.map((step, idx) => (
                      <div key={idx} className="transition-colors duration-300">
                        {idx <= terminalStep ? (
                          <span className="text-[#6EE7B7] font-semibold">✓ {step}</span>
                        ) : (
                          <span className="text-slate-300 font-normal">⏳ {step}</span>
                        )}
                      </div>
                    ))}
                    {terminalStep === steps.length - 1 && (
                      <p className="pt-2 text-white font-bold flex items-center gap-2">
                        <span className="text-[#6EE7B7]">&gt;</span> <span>Ready to execute?</span> <span className="w-2 h-4 bg-[#FFD43B] animate-pulse inline-block" />
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Stages: Join, Learn, Build, Lead */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-6">
                {['Join', 'Learn', 'Build', 'Lead'].map((stage, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-[#EFF6FF] border-2 border-[#BFDBFE] text-center relative group/stage hover:border-[#2E539F] hover:bg-[#DBEAFE] transition-all shadow-xs">
                    <span className="block font-mono font-black text-xs text-[#2E539F] mb-0.5">0{idx + 1}</span>
                    <span className="font-bold text-xs text-[#0B1F33]">{stage}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-200 mb-8" />

        {/* Bottom Bar: Copyright on Left, Socials on Right */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate-600 font-medium tracking-wide text-center md:text-left">
            © 2026 TCET ACM SIGITE Chapter • Made with <Heart className="w-3.5 h-3.5 inline text-rose-500 fill-rose-500 mx-0.5" /> for engineering excellence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Instagram - Refined Brand Pill */}
            <a 
              href="https://www.instagram.com/tcet_acm_sigite" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="TCET ACM Instagram"
              title="Instagram"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 border border-pink-200 text-xs sm:text-sm font-semibold shadow-xs hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#FD1D1D] hover:text-white hover:border-transparent hover:shadow-[0_8px_20px_-4px_rgba(225,48,108,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
            >
              <Instagram className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#E1306C] group-hover:text-white transition-colors shrink-0" />
              <span className="text-[#BE185D] group-hover:text-white transition-colors">Instagram</span>
            </a>

            {/* LinkedIn - Refined Brand Pill */}
            <a 
              href="https://www.linkedin.com/in/acmtcet/" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="TCET ACM LinkedIn"
              title="LinkedIn"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 border border-[#0A66C2]/30 text-xs sm:text-sm font-semibold shadow-xs hover:bg-[#0A66C2] hover:text-white hover:border-transparent hover:shadow-[0_8px_20px_-4px_rgba(10,102,194,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
            >
              <Linkedin className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0A66C2] group-hover:text-white transition-colors shrink-0" />
              <span className="text-[#0A66C2] group-hover:text-white transition-colors">LinkedIn</span>
            </a>
          </div>
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