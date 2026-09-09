import React from 'react';
import TechTypographyStack from './TechTypographyStack';

export default function CurtainSecondPage() {
  return (
    <section 
      id="second-page"
      className="hidden md:flex relative w-full h-screen min-h-screen flex-col items-center justify-center bg-[#F8FAFC] text-[#0F172A] overflow-hidden select-none border-b border-slate-200/80"
    >
      {/* Center Stage: Kinetic Brutalist Typography Stack */}
      <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center max-w-6xl mx-auto my-auto relative z-10 w-full">
        <TechTypographyStack />
      </div>
    </section>
  );
}
