import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, X, UserCheck, Linkedin, Github, Mail } from 'lucide-react';

export default function PerspectiveModal({ selectedPerspective, onClose }) {
  return (
    <AnimatePresence>
      {selectedPerspective && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1D4ED8]/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.35 }}
            className="relative w-full max-w-4xl bg-white border-2 border-[#93C5FD] rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 lg:p-9 shadow-[0_20px_60px_-15px_rgba(3,109,164,0.28)] z-10 overflow-hidden"
          >
            {/* Decorative quotation background symbol watermark */}
            <Quote className="absolute right-4 -bottom-6 w-36 h-36 sm:w-48 sm:h-48 text-[#93C5FD]/25 -z-0 pointer-events-none select-none" />

            {/* Close Button */}
            <button
              aria-label="Close perspective details"
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-[#93C5FD] text-[#0B1F33] hover:bg-[#1D4ED8] hover:text-white transition-all cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center relative z-10">
              {/* Left Column: Portrait & Badge Pill */}
              <div className="md:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-3">
                <div className="relative">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 aspect-square rounded-3xl overflow-hidden border-2 border-[#1D4ED8] shadow-md bg-[#DBEAFE]">
                    <img 
                      src={selectedPerspective.image} 
                      alt={selectedPerspective.name}
                      decoding="async"
                      width={192}
                      height={192}
                      className={`w-full h-full object-cover ${selectedPerspective.id === 'rajesh-bansode' ? 'object-top' : 'object-[center_18%]'}`}
                    />
                  </div>
                </div>

                <span className="inline-block font-mono text-[11px] sm:text-xs font-bold text-[#0B1F33] uppercase tracking-wider px-3 py-1 rounded-full bg-[#93C5FD] border border-[#3B82F6]/30 shadow-sm text-center">
                  {selectedPerspective.badge}
                </span>
              </div>

              {/* Right Column: Narrative Editorial */}
              <div className="md:col-span-8 space-y-3.5 text-left">
                <div>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-[#1E40AF] uppercase tracking-wider block mb-0.5">
                    {selectedPerspective.id === 'rajesh-bansode'
                      ? 'FEATURED COUNSELLOR SPOTLIGHT'
                      : selectedPerspective.perspectiveType === 'faculty'
                        ? 'FACULTY PERSPECTIVE SPOTLIGHT'
                        : 'STUDENT LEADERSHIP SPOTLIGHT'}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0B1F33] leading-tight">
                    {selectedPerspective.name}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm font-bold text-[#0B1F33] mt-0.5">
                    {selectedPerspective.role}
                  </p>
                  <p className="text-xs text-[#1E40AF]">
                    {selectedPerspective.department}
                  </p>
                </div>

                {/* Tinted Pull Quote Box */}
                <div className="relative bg-[#DBEAFE] border border-[#93C5FD] rounded-2xl p-5 sm:p-6 shadow-sm">
                  <p className="italic text-base sm:text-lg text-[#0B1F33] font-medium leading-relaxed">
                    "{selectedPerspective.quote}"
                  </p>
                </div>

                {/* Action Triggers */}
                <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1D4ED8] text-white text-xs font-mono font-bold hover:bg-[#3B82F6] transition-all shadow-sm cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Close Perspective</span>
                  </button>

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
    </AnimatePresence>
  );
}
