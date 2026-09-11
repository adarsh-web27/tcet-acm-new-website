import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Users, 
  Trees, 
  CheckCircle2, 
  ArrowUpRight, 
  Layers, 
  Award 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BentoGrid() {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const switcherTabs = [
    {
      id: 0,
      title: "TCET ACM SIGITE Chapter",
      tag: "Local Heritage",
      content: {
        headline: "Chartered September 2011 • Department of IT, TCET",
        description: "TCET ACM SIGITE nurtures 140+ active computing scholars, pairing academic excellence with peer-to-peer engineering workshops, Scopus research paper writing, and national hackathons.",
        highlights: [
          "140+ Active Computing Student Scholars",
          "Annual Research Ezine & Scopus Mentorship",
          "Global Alumni Network across Oracle, Capgemini & US Tier-1 Universities"
        ]
      }
    },
    {
      id: 1,
      title: "ACM & SIGITE Global",
      tag: "International Affiliation",
      content: {
        headline: "Directly Affiliated with ACM Headquarters (New York, USA)",
        description: "Connecting TCET students to the world's largest educational and scientific computing society. Members gain access to world-class computing literature, distinguished international speakers, and global badges.",
        highlights: [
          "ACM Digital Library Access (500k+ Journals & Proceedings)",
          "International Distinguished Lecture Series & Workshops",
          "Globally Recognized Professional Credentials & Badges"
        ]
      }
    },
    {
      id: 2,
      title: "Vision & Mission",
      tag: "Institutional Mandate",
      content: {
        headline: "Leadership in IT Education & Industry-Ready Excellence",
        description: "Vision: \"The department of IT will strive to be at the top position among the renowned providers of IT education.\" • Mission: \"The IT department is committed to enrich students by rigorously implementing quality education with a focus to make them industry ready, while imbibing in them professional ethics and social values to become responsible citizens.\"",
        highlights: [
          "Rigorous Quality Education & Global Computing Standards",
          "Comprehensive Industry Readiness & Technical Hands-on Mastery",
          "Professional Ethics & Responsible Engineering Values"
        ]
      }
    }
  ];

  const pillarsData = [
    {
      title: "Learn",
      desc: "Cutting-edge AI/ML, DevOps, cloud computing, and cybersecurity workshops.",
      icon: Cpu,
      badge: "SKILLS",
      details: ["AI & Generative Models", "Cloud Computing & DevOps", "Data Structures & Algorithms", "Technical Research Papers"]
    },
    {
      title: "Build",
      desc: "36-hour national-level competitive hackathons with cash prize pools.",
      icon: Terminal,
      badge: "HACKATHONS",
      details: ["National Hackathons", "ACM ReCode & InnovGenius", "Open Source Contributions", "Real-world Prototype Lab"]
    },
    {
      title: "Connect",
      desc: "Global alumni network connecting with Oracle, Capgemini, and US universities.",
      icon: Users,
      badge: "NETWORK",
      details: ["Annual ACM Summits", "Alumni Mentorship", "Industrial Visits", "Tech Community Mixers"]
    },
    {
      title: "Lead",
      desc: "Sustainability drives (300+ trees planted) and digital literacy outreach.",
      icon: Trees,
      badge: "SUSTAINABILITY",
      details: ["Tree Plantation Drives", "Chapter Core Committee", "Cyber Safety Drives", "Technical Writing & E-Magazines"]
    }
  ];

  return (
    <section 
      id="about-section" 
      ref={sectionRef}
      className="relative isolate overflow-hidden w-full pt-32 pb-28 px-6 md:px-16 lg:px-24 bg-[#F8FAFC]"
    >
      {/* Top Dark Curve Transition from 3rd Slide — Upward Arch Contour */}
      <div className="absolute top-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none z-10 -translate-y-0.5">
        <svg 
          className="w-full h-20 sm:h-28 md:h-40 block" 
          viewBox="0 0 1440 160" 
          preserveAspectRatio="none" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M 0 0 L 1440 0 L 1440 145 Q 720 35 0 145 Z" 
            fill="#244B8E" 
          />
        </svg>
      </div>

      {/* Giant ACM Watermark (Isolated behind content) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] font-black text-[#0F172A]/[0.03] select-none pointer-events-none tracking-tighter -z-10"
      >
        ACM
      </div>

      <div className="relative z-20 max-w-7xl mx-auto space-y-20">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.25em] shadow-xs">
            <span>About The Chapter</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight leading-[1.05] text-[#0F172A] uppercase">
            Institutional Heritage & Objectives
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-600 font-medium max-w-2xl mx-auto">
            Chartered in September 2011, connecting students to the world's largest computing society.
          </p>
        </div>

        {/* ================= INTERACTIVE 3-WAY SWITCHER TABS ================= */}
        <div className="bg-white/95 border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.06)] space-y-8">
          
          {/* Tab Selection Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 border-b border-slate-200/80 pb-6">
            {switcherTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 rounded-full text-sm sm:text-base font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#1D4ED8] text-white shadow-md scale-[1.02] border-2 border-[#1D4ED8]'
                    : 'bg-white border-2 border-[#BFDBFE] text-[#0B1F33] hover:border-[#1D4ED8] hover:text-[#1D4ED8] hover:bg-[#EFF6FF]'
                }`}
              >
                <span>{tab.title}</span>
              </button>
            ))}
          </div>

          {/* Active Tab Panel Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs sm:text-sm font-mono font-bold text-[#1E40AF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#DBEAFE] border border-[#93C5FD]">
                  {switcherTabs[activeTab].tag}
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0B1F33] leading-tight">
                  {switcherTabs[activeTab].content.headline}
                </h3>
                <p className="text-base sm:text-lg text-[#1E40AF] font-medium leading-relaxed">
                  {switcherTabs[activeTab].content.description}
                </p>
              </div>

              <div className="lg:col-span-5 bg-[#93C5FD]/50 rounded-2xl p-6 border border-[#93C5FD] space-y-3">
                <h4 className="font-mono text-xs sm:text-sm font-bold text-[#1E40AF] uppercase tracking-wider">
                  Key Deliverables & Impact
                </h4>
                <ul className="space-y-2.5 text-sm sm:text-base text-[#0B1F33] font-medium">
                  {switcherTabs[activeTab].content.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="pt-4 border-t border-[#93C5FD]/40 flex justify-end">
            <Link
              to="/who-we-are"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-[#1E40AF] hover:underline uppercase tracking-wider"
            >
              <span>Explore Complete Institutional Profile</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ================= FOUR CORE PILLARS (LEARN • BUILD • CONNECT • LEAD) ================= */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-black text-3xl text-[#0B1F33] uppercase tracking-tight">
                Our 4 Core Pillars
              </h3>
              <p className="text-base sm:text-lg text-[#1E40AF] font-medium">
                Learn • Build • Connect • Lead — Driving complete student engineering growth.
              </p>
            </div>
            <span className="font-mono text-xs sm:text-sm font-bold text-[#1E40AF]">
              Est. 2011
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillarsData.map((pillar, index) => {
              const IconComp = pillar.icon;
              const pillarAccents = [
                { bg: 'bg-amber-400', text: 'text-slate-950' },
                { bg: 'bg-rose-700', text: 'text-white' },
                { bg: 'bg-emerald-200', text: 'text-emerald-950' },
                { bg: 'bg-blue-700', text: 'text-white' },
              ];
              const accentTheme = pillarAccents[index % pillarAccents.length];

              return (
                <div
                  key={pillar.title}
                  className="bg-white/95 border-2 border-[#93C5FD] rounded-3xl p-6 shadow-md hover:shadow-xl hover:border-[#1D4ED8]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] border border-[#93C5FD] flex items-center justify-center text-[#1D4ED8]">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className={`text-xs sm:text-sm font-mono font-bold px-2.5 py-1 rounded-full ${accentTheme.bg} ${accentTheme.text} shadow-xs`}>
                        {pillar.badge}
                      </span>
                    </div>

                    <h4 className="font-display font-black text-2xl text-[#0B1F33]">
                      {pillar.title}
                    </h4>

                    <p className="text-sm sm:text-base text-[#1E40AF] font-medium leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <ul className="space-y-1.5 pt-4 border-t border-[#93C5FD]/60 text-xs sm:text-sm font-mono text-[#0B1F33]">
                    {pillar.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="text-[#1D4ED8]">✦</span>
                        <span className="truncate">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
