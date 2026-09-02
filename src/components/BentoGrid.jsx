import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
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

// Custom CountUp hook for smooth zero-rerender number animation
function useCountUp(end, suffix = "+", duration = 2000) {
  const ref = useRef(null);

  useEffect(() => {
    let animationFrame;
    let hasStarted = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true;
          let startTime = null;
          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const currentCount = Math.floor(progress === 1 ? end : end * (1 - Math.pow(2, -10 * progress)));
            if (ref.current) {
              ref.current.innerText = `${currentCount}${suffix}`;
            }
            if (progress < 1) {
              animationFrame = requestAnimationFrame(animate);
            }
          };
          animationFrame = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, suffix, duration]);

  return ref;
}

export default function BentoGrid() {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const membersRef = useCountUp(165, "+");
  const eventsRef = useCountUp(50, "+");
  const projectsRef = useCountUp(30, "+");

  const switcherTabs = [
    {
      id: 0,
      title: "TCET ACM Chapter",
      tag: "Local Heritage",
      content: {
        headline: "Chartered July 2011 • Department of IT, TCET",
        description: "TCET ACM SIGITE nurtures 165+ active computing scholars, pairing academic excellence with peer-to-peer engineering workshops, Scopus research paper writing, and national hackathons.",
        highlights: [
          "165+ Active Computing Student Scholars",
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
        headline: "To Be A Premier Center For Information Technology Education",
        description: "Empowering students to evolve into ethical technical leaders and industry champions through rigorous practical execution, research excellence, and community sustainability initiatives.",
        highlights: [
          "Host 36-Hour National Hackathons (ACM ReCode & InnovGenius)",
          "1-on-1 Faculty Scopus Research Paper Publication Guidance",
          "Ek Ped Maa Ke Naam Sustainability Drives (300+ Saplings Planted)"
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
      id="mission" 
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-mono font-bold uppercase tracking-[0.25em] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>About The Chapter</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight leading-[1.05] text-[#0F172A] uppercase">
            Institutional Heritage & Objectives
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-slate-600 font-medium max-w-2xl mx-auto">
            Chartered in July 2011, connecting students to the world's largest computing society.
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
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#1D4ED8] text-white shadow-md scale-[1.02]'
                    : 'bg-[#93C5FD] text-[#0B1F33] hover:bg-[#3B82F6] hover:text-white'
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
                <span className="text-xs font-mono font-bold text-[#1E40AF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#DBEAFE] border border-[#93C5FD]">
                  {switcherTabs[activeTab].tag}
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0B1F33] leading-tight">
                  {switcherTabs[activeTab].content.headline}
                </h3>
                <p className="text-sm sm:text-base text-[#1E40AF] font-medium leading-relaxed">
                  {switcherTabs[activeTab].content.description}
                </p>
              </div>

              <div className="lg:col-span-5 bg-[#93C5FD]/50 rounded-2xl p-6 border border-[#93C5FD] space-y-3">
                <h4 className="font-mono text-xs font-bold text-[#1E40AF] uppercase tracking-wider">
                  Key Deliverables & Impact
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#0B1F33] font-medium">
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
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#1E40AF] hover:underline uppercase tracking-wider"
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
              <p className="text-xs sm:text-sm text-[#1E40AF] font-medium">
                Learn • Build • Connect • Lead — Driving complete student engineering growth.
              </p>
            </div>
            <span className="font-mono text-xs font-bold text-[#1E40AF]">
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
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${accentTheme.bg} ${accentTheme.text} shadow-xs`}>
                        {pillar.badge}
                      </span>
                    </div>

                    <h4 className="font-display font-black text-2xl text-[#0B1F33]">
                      {pillar.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#1E40AF] font-medium leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <ul className="space-y-1.5 pt-4 border-t border-[#93C5FD]/60 text-[11px] font-mono text-[#0B1F33]">
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

        {/* ================= METRICS COUNTERS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="p-8 rounded-3xl bg-white/95 border-2 border-[#93C5FD] shadow-md text-center flex flex-col justify-center">
            <span ref={membersRef} className="block font-display font-black text-4xl sm:text-5xl text-[#1D4ED8]">0+</span>
            <span className="text-xs font-mono font-bold text-[#1E40AF] uppercase tracking-wider mt-2">Active Scholars</span>
          </div>
          <div className="p-8 rounded-3xl bg-white/95 border-2 border-[#93C5FD] shadow-md text-center flex flex-col justify-center">
            <span ref={eventsRef} className="block font-display font-black text-4xl sm:text-5xl text-[#D97706]">0+</span>
            <span className="text-xs font-mono font-bold text-[#1E40AF] uppercase tracking-wider mt-2">Annual Events</span>
          </div>
          <div className="p-8 rounded-3xl bg-white/95 border-2 border-[#93C5FD] shadow-md text-center flex flex-col justify-center">
            <span ref={projectsRef} className="block font-display font-black text-4xl sm:text-5xl text-[#059669]">0+</span>
            <span className="text-xs font-mono font-bold text-[#1E40AF] uppercase tracking-wider mt-2">Scopus Papers & Prototypes</span>
          </div>
        </div>

      </div>
    </section>
  );
}
