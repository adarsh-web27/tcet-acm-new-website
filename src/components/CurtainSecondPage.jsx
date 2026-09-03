import React from 'react';
import TechTypographyStack from './TechTypographyStack';

export default function CurtainSecondPage() {
  return (
    <section 
      id="second-page"
      className="relative w-full min-h-[45vh] sm:min-h-[60vh] md:min-h-[70vh] flex flex-col items-center justify-center bg-[#F8FAFC] text-[#0F172A] overflow-hidden select-none py-8 sm:py-14 md:py-20 border-b border-slate-200/80"
    >
      {/* Center Stage: Kinetic Brutalist Typography Stack */}
      <div className="flex-1 flex flex-col items-center justify-center px-2 sm:px-6 md:px-8 text-center max-w-7xl mx-auto my-auto relative z-10 w-full">
        <TechTypographyStack />
      </div>
    </section>
  );
}
