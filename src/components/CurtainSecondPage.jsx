import React from 'react';
import TechTypographyStack from './TechTypographyStack';

export default function CurtainSecondPage() {
  return (
    <section 
      id="second-page"
      className="relative w-full min-h-[55vh] sm:min-h-[65vh] flex flex-col items-center justify-center bg-[#F8FAFC] text-[#0F172A] overflow-hidden select-none py-12 sm:py-16 border-b border-slate-200/80"
    >
      {/* Center Stage: Kinetic Brutalist Typography Stack */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 text-center max-w-5xl mx-auto my-auto relative z-10 w-full">
        <TechTypographyStack />
      </div>
    </section>
  );
}
