import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, X, UserCheck, Linkedin, Github, Mail } from 'lucide-react';

export default function PerspectiveModal({ selectedPerspective, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (!selectedPerspective) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedPerspective, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {selectedPerspective && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="perspective-modal-title"
        >
          {/* High-priority full-screen dark backdrop (above navbar z-50) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-0"
          />

          {/* Mid-Sized Modal Container with internal scroll */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="relative w-full max-w-xl md:max-w-2xl max-h-[85vh] sm:max-h-[88vh] bg-white border-2 border-[#93C5FD] rounded-[24px] sm:rounded-[32px] shadow-[0_25px_70px_-15px_rgba(15,23,42,0.35)] z-10 flex flex-col overflow-hidden"
          >
            {/* Always-accessible Top-Right Close Button */}
            <button
              aria-label="Close perspective details"
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-[#DBEAFE] text-[#0B1F33] hover:bg-[#1D4ED8] hover:text-white transition-all cursor-pointer z-30 shadow-xs active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Content Viewport */}
            <div className="overflow-y-auto overscroll-contain p-5 sm:p-7 md:p-8 space-y-4 sm:space-y-5 relative z-10 flex-1">
              {/* Decorative quotation background symbol watermark */}
              <Quote className="absolute right-2 -bottom-4 w-32 h-32 sm:w-40 sm:h-40 text-[#93C5FD]/20 -z-0 pointer-events-none select-none" />

              {/* Profile Header Block: Portrait + Details */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left pr-8 sm:pr-10">
                {/* Portrait Frame */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#1D4ED8] shadow-md bg-[#DBEAFE]">
                  <img 
                    src={selectedPerspective.image} 
                    alt={selectedPerspective.name}
                    decoding="async"
                    width={128}
                    height={128}
                    className={`w-full h-full object-cover ${selectedPerspective.id === 'rajesh-bansode' ? 'object-top' : 'object-[center_18%]'}`}
                  />
                </div>

                {/* Narrative Titles & Role */}
                <div className="space-y-1 min-w-0">
                  <span className="inline-block font-mono text-[10px] sm:text-xs font-bold text-[#0B1F33] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#93C5FD] border border-[#3B82F6]/30 shadow-xs mb-0.5">
                    {selectedPerspective.badge}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-[#1E40AF] uppercase tracking-wider block">
                    {selectedPerspective.id === 'rajesh-bansode'
                      ? 'FEATURED COUNSELLOR SPOTLIGHT'
                      : selectedPerspective.perspectiveType === 'faculty'
                        ? 'FACULTY PERSPECTIVE SPOTLIGHT'
                        : 'STUDENT LEADERSHIP SPOTLIGHT'}
                  </span>
                  <h3 id="perspective-modal-title" className="font-display font-black text-xl sm:text-2xl text-[#0B1F33] leading-tight">
                    {selectedPerspective.name}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm font-bold text-[#0B1F33]">
                    {selectedPerspective.role}
                  </p>
                  <p className="text-xs text-[#1E40AF]">
                    {selectedPerspective.department}
                  </p>
                </div>
              </div>

              {/* Tinted Pull Quote Box */}
              <div className="relative bg-[#DBEAFE]/80 border border-[#93C5FD] rounded-2xl p-4 sm:p-5 shadow-xs">
                <p className="italic text-sm sm:text-base md:text-lg text-[#0B1F33] font-medium leading-relaxed">
                  "{selectedPerspective.quote}"
                </p>
              </div>

              {/* Action Triggers & Connect Links */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1D4ED8] text-white text-xs font-mono font-bold hover:bg-[#3B82F6] transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Close Perspective</span>
                </button>

                <div className="flex items-center gap-2">
                  {selectedPerspective.linkedin && (
                    <a
                      href={selectedPerspective.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[#DBEAFE] text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white transition-all border border-[#93C5FD]"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {selectedPerspective.github && (
                    <a
                      href={selectedPerspective.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[#DBEAFE] text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white transition-all border border-[#93C5FD]"
                      title="GitHub Profile"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {selectedPerspective.perspectiveType !== 'student' && selectedPerspective.email && (
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(selectedPerspective.email)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[#DBEAFE] text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white transition-all border border-[#93C5FD]"
                      title="Compose Email via Gmail"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

