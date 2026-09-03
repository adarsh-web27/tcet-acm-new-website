import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-[#F8FAFC]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full p-8 sm:p-12 rounded-3xl bg-white border-2 border-[#BFDBFE] shadow-xl space-y-6"
      >
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest text-[#1D4ED8] uppercase bg-[#DBEAFE] border border-[#93C5FD]">
          <Compass className="w-3.5 h-3.5" />
          ERROR 404 • ROUTE UNCHARTED
        </span>

        <h1 className="font-display font-black text-6xl sm:text-7xl text-[#0B1F33] tracking-tight">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="font-display font-bold text-xl text-[#0B1F33]">
            Page Not Found
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            The coordinate or milestone you are looking for does not exist on the TCET ACM chapter portal.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1D4ED8] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#1E40AF] transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
