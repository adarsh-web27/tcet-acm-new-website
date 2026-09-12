import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  ArrowRight,
  ChevronDown, 
  BookOpen, 
  Globe, 
  Users, 
  Award, 
  Cpu, 
  Terminal, 
  Trees, 
  Bookmark, 
  ShieldCheck,
  Calendar,
  Compass,
  Target,
  Zap,
  Briefcase,
  Heart,
  Code,
  MessageSquare
} from 'lucide-react';
import { logoAssets } from '../assets/logoAssets';

const NAV_LINKS = [
  { path: '/', label: 'Home', number: '01' },
  { path: '/who-we-are', label: 'Chapter', number: '02', isChapterMenu: true },
  { path: '/events', label: 'Events', number: '03' },
  { path: '/achievements', label: 'Achievements', number: '04' },
  { path: '/team', label: 'Team', number: '05' },
  { path: '/gallery', label: 'Gallery', number: '06' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const megaMenuTimeoutRef = useRef(null);

  const isHomePage = location.pathname === '/';
  const isHero = isHomePage && !isScrolled;

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  return (
    <>
      <header className={`fixed left-0 right-0 z-50 w-full flex justify-center px-3 sm:px-5 lg:px-6 xl:px-8 pointer-events-none transition-all duration-300 ${
        isHero ? 'top-3 sm:top-4 lg:top-5 xl:top-6' : 'top-2 sm:top-3'
      }`}>
        {/* Unified Symmetrical Floating Navbar Pill */}
        <div 
          className={`pointer-events-auto w-full max-w-7xl rounded-full flex items-center justify-between gap-2 sm:gap-3 xl:gap-4 transition-all duration-300 border bg-white/95 backdrop-blur-md ${
            isHero 
              ? 'px-3.5 sm:px-5 lg:px-5 xl:px-7 py-2 sm:py-2.5 xl:py-3 border-slate-200 shadow-[0_14px_45px_-10px_rgba(15,23,42,0.12)]' 
              : isScrolled
                ? 'px-3 sm:px-4 lg:px-4.5 xl:px-6 py-1.5 sm:py-2 border-slate-200 shadow-[0_12px_35px_-8px_rgba(15,23,42,0.12)]'
                : 'px-3 sm:px-4 lg:px-4.5 xl:px-6 py-1.5 sm:py-2 border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
          }`}
        >
          {/* Left: Brand Identity */}
          <Link 
            to="/" 
            className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 hover:opacity-90 transition-opacity shrink-0 group py-0.5"
          >
            <img 
              src={logoAssets.logoImage} 
              alt="TCET ACM SIGITE Chapter Logo" 
              decoding="async"
              className={`object-contain transition-all duration-300 drop-shadow-md shrink-0 group-hover:scale-105 ${
                isHero 
                  ? 'w-10 h-10 sm:w-12 sm:h-12 lg:w-11 lg:h-11 xl:w-[56px] xl:h-[56px] -my-1 sm:-my-1.5' 
                  : 'w-9 h-9 sm:w-10 sm:h-10 lg:w-10 lg:h-10 xl:w-11 xl:h-11 -my-1'
              }`}
              width={56}
              height={56}
            />
            <div className="flex flex-col text-left justify-center min-w-0 pr-1">
              <span className={`font-display font-black tracking-wide text-[#0B1F33] leading-tight group-hover:text-[#1D4ED8] transition-all uppercase whitespace-nowrap ${
                isHero 
                  ? 'text-xs sm:text-sm lg:text-[13.5px] xl:text-[15.5px]' 
                  : 'text-[11px] sm:text-[12.5px] lg:text-[12.5px] xl:text-[14px]'
              }`}>
                {logoAssets.chapterName}
              </span>
              <span className={`font-mono font-bold text-[#1E40AF] tracking-[0.14em] uppercase whitespace-nowrap transition-all ${
                isHero 
                  ? 'text-[8.5px] sm:text-[9.5px] lg:text-[9.5px] xl:text-[10.5px]' 
                  : 'text-[8px] sm:text-[9px] lg:text-[9.5px] xl:text-[10px]'
              }`}>
                {logoAssets.collegeName}
              </span>
            </div>
          </Link>

          {/* Center: Nav Links & Chapter MegaMenu (Desktop >= 1024px) */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0 relative">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;

              if (link.isChapterMenu) {
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <NavLink
                      to={link.path}
                      className={`relative rounded-full font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-1 group ${
                        isHero 
                          ? 'px-2.5 xl:px-4 py-1.5 xl:py-2 text-xs xl:text-[14.5px]' 
                          : 'px-2 xl:px-3.5 py-1 xl:py-1.5 text-xs xl:text-sm'
                      } ${
                        isActive
                          ? "text-white bg-[#1D4ED8] shadow-md shadow-blue-600/25"
                          : megaMenuOpen
                          ? "text-[#1D4ED8] bg-blue-50"
                          : "text-slate-700 hover:text-[#1D4ED8] hover:bg-slate-50"
                      }`}
                    >
                      <span>Chapter</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? 'text-white' : megaMenuOpen ? 'rotate-180 text-[#1D4ED8]' : 'text-slate-500 group-hover:text-[#1D4ED8]'}`} />
                    </NavLink>

                    {/* CHAPTER MEGAMENU DROPDOWN PANEL */}
                    <AnimatePresence>
                      {megaMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[840px] max-w-[95vw] bg-white border-2 border-[#BFDBFE] rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.25)] z-[100] grid grid-cols-12 gap-6 text-left"
                        >
                          {/* ================= COLUMN 1: WHO WE ARE ================= */}
                          <div className="col-span-5 pr-5 border-r border-[#93C5FD]/60 flex flex-col justify-between space-y-4">
                            {/* Header */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-lg bg-[#DBEAFE] flex items-center justify-center text-[#1E40AF]">
                                    <Compass className="w-3.5 h-3.5" />
                                  </div>
                                  <span className="font-display font-extrabold text-sm tracking-wide text-[#0B1F33] uppercase">
                                    WHO WE ARE
                                  </span>
                                </div>
                                <Link 
                                  to="/who-we-are" 
                                  className="text-xs sm:text-sm font-bold text-[#1E40AF] hover:underline inline-flex items-center gap-1 group/link"
                                >
                                  <span>Full Page</span>
                                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                                </Link>
                              </div>

                              <p className="text-xs text-[#1E40AF] leading-relaxed font-normal">
                                TCET ACM SIGITE (est. September 2011) connects students to computing research and student leadership.
                              </p>
                            </div>

                            {/* 5 Nav Items */}
                            <div className="space-y-1">
                              <Link 
                                to="/who-we-are#vision" 
                                className="group/item flex items-center gap-3 p-1.5 rounded-xl hover:bg-[#93C5FD]/60 transition-colors"
                              >
                                <div className="w-7 h-7 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                  <Target className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-[11.5px] text-[#0B1F33] group-hover/item:text-[#1E40AF] transition-colors leading-tight">
                                    Vision
                                  </h4>
                                  <p className="text-[10.5px] text-[#1E40AF] leading-tight mt-0.5">
                                    Leadership in IT education
                                  </p>
                                </div>
                              </Link>

                              <Link 
                                to="/who-we-are#vision" 
                                className="group/item flex items-center gap-3 p-1.5 rounded-xl hover:bg-[#93C5FD]/60 transition-colors"
                              >
                                <div className="w-7 h-7 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                  <Target className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-[11.5px] text-[#0B1F33] group-hover/item:text-[#1E40AF] transition-colors leading-tight">
                                    Mission
                                  </h4>
                                  <p className="text-[10.5px] text-[#1E40AF] leading-tight mt-0.5">
                                    Industry-ready excellence
                                  </p>
                                </div>
                              </Link>

                              <Link 
                                to="/who-we-are#lens" 
                                className="group/item flex items-center gap-3 p-1.5 rounded-xl hover:bg-[#93C5FD]/60 transition-colors"
                              >
                                <div className="w-7 h-7 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                  <Users className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-xs sm:text-sm text-[#0B1F33] group-hover/item:text-[#1E40AF] transition-colors leading-tight">
                                    Through Their Lens
                                  </h4>
                                  <p className="text-xs text-[#1E40AF] leading-tight mt-0.5">
                                    Faculty & student perspectives
                                  </p>
                                </div>
                              </Link>

                              <Link 
                                to="/who-we-are#timeline" 
                                className="group/item flex items-center gap-3 p-1.5 rounded-xl hover:bg-[#93C5FD]/60 transition-colors"
                              >
                                <div className="w-7 h-7 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                  <Award className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-xs sm:text-sm text-[#0B1F33] group-hover/item:text-[#1E40AF] transition-colors leading-tight">
                                    Journey & Accolades
                                  </h4>
                                  <p className="text-xs text-[#1E40AF] leading-tight mt-0.5">
                                    ACM India Summit Best Website
                                  </p>
                                </div>
                              </Link>
                            </div>

                            {/* Bottom Card: Highlighted Award Banner */}
                            <Link
                              to="/achievements"
                              className="relative block p-3 rounded-2xl bg-gradient-to-r from-[#EFF6FF] via-[#DBEAFE] to-blue-50/80 border-2 border-[#3B82F6]/50 hover:border-[#1D4ED8] shadow-[0_4px_16px_-3px_rgba(29,78,216,0.18)] hover:shadow-[0_6px_22px_-2px_rgba(29,78,216,0.28)] hover:-translate-y-0.5 transition-all group/award mt-1 overflow-hidden"
                            >
                              {/* Ambient soft glow */}
                              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-400/15 rounded-full blur-xl pointer-events-none -mr-4 -mt-4" />

                              <div className="flex items-center justify-between relative z-10">
                                <div>
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <span className="inline-block px-1.5 py-0.5 rounded-full bg-amber-100 border border-amber-300/80 text-amber-800 font-mono text-[9px] font-extrabold uppercase tracking-wider">
                                      ★ National Award
                                    </span>
                                  </div>
                                  <h5 className="font-extrabold text-[12px] text-[#0B1F33] group-hover/award:text-[#1D4ED8] transition-colors">
                                    ACM India Summit Award
                                  </h5>
                                  <p className="text-[10.5px] font-semibold text-[#1E40AF]">
                                    Honorable Mention: Best Chapter Website
                                  </p>
                                </div>
                                <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-600 shadow-xs group-hover/award:scale-110 transition-transform shrink-0 ml-2">
                                  <Award className="w-4 h-4 text-amber-600" />
                                </div>
                              </div>
                            </Link>
                          </div>

                          {/* ================= COLUMN 2: WHAT WE DO ================= */}
                          <div className="col-span-7 pl-2 flex flex-col justify-between space-y-3">
                            {/* Header */}
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-lg bg-[#DBEAFE] flex items-center justify-center text-[#1E40AF]">
                                    <Zap className="w-3.5 h-3.5" />
                                  </div>
                                  <span className="font-display font-extrabold text-sm tracking-wide text-[#0B1F33] uppercase">
                                    WHAT WE DO
                                  </span>
                                </div>
                                <Link 
                                  to="/events" 
                                  className="text-xs sm:text-sm font-bold text-[#1E40AF] hover:underline inline-flex items-center gap-1 group/link"
                                >
                                  <span>All Activities</span>
                                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                                </Link>
                              </div>

                              <p className="text-[11px] text-[#1E40AF] leading-relaxed font-normal">
                                Building technical excellence, research culture, and professional growth through hands-on learning and community-driven initiatives.
                              </p>
                            </div>

                            {/* 2 Sub-Columns */}
                            <div className="grid grid-cols-2 gap-3">
                              {/* Sub-column 1: TECHNICAL & INNOVATION */}
                              <div className="space-y-1.5">
                                <span className="block font-mono text-[9.5px] font-extrabold tracking-wider text-[#1E40AF] uppercase px-1">
                                  TECHNICAL & INNOVATION
                                </span>
                                <div className="space-y-0.5">
                                  <Link 
                                    to="/events#e-2026-pixxelhack-2" 
                                    className="group/item flex items-center gap-2 p-1 rounded-xl hover:bg-[#EFF6FF] transition-colors"
                                  >
                                    <div className="w-6 h-6 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                      <Terminal className="w-3 h-3" />
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="font-bold text-[11px] text-[#0B1F33] group-hover/item:text-[#1D4ED8] transition-colors leading-tight truncate">
                                        PixxelHack Webathon 2.0
                                      </h4>
                                      <p className="text-[9.5px] text-[#1E40AF] leading-tight truncate">
                                        48-Hour Web Development Showdown
                                      </p>
                                    </div>
                                  </Link>

                                  <Link 
                                    to="/events#e-2025-recode" 
                                    className="group/item flex items-center gap-2 p-1 rounded-xl hover:bg-[#EFF6FF] transition-colors"
                                  >
                                    <div className="w-6 h-6 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                      <Cpu className="w-3 h-3" />
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="font-bold text-[11px] text-[#0B1F33] group-hover/item:text-[#1D4ED8] transition-colors leading-tight truncate">
                                        ACM ReCode Hackathon
                                      </h4>
                                      <p className="text-[9.5px] text-[#1E40AF] leading-tight truncate">
                                        UI/UX & Microservices Hackathon
                                      </p>
                                    </div>
                                  </Link>

                                  <Link 
                                    to="/events#e-2025-innovgenius" 
                                    className="group/item flex items-center gap-2 p-1 rounded-xl hover:bg-[#EFF6FF] transition-colors"
                                  >
                                    <div className="w-6 h-6 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                      <Zap className="w-3 h-3" />
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="font-bold text-[11px] text-[#0B1F33] group-hover/item:text-[#1D4ED8] transition-colors leading-tight truncate">
                                        INNOVGENIUS 2026 Ideathon
                                      </h4>
                                      <p className="text-[9.5px] text-[#1E40AF] leading-tight truncate">
                                        National Ideathon with TCS
                                      </p>
                                    </div>
                                  </Link>

                                  <Link 
                                    to="/events#e-2025-dsa" 
                                    className="group/item flex items-center gap-2 p-1 rounded-xl hover:bg-[#EFF6FF] transition-colors"
                                  >
                                    <div className="w-6 h-6 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                      <Code className="w-3 h-3" />
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="font-bold text-[11px] text-[#0B1F33] group-hover/item:text-[#1D4ED8] transition-colors leading-tight truncate">
                                        Pre-Conference DSA Workshop
                                      </h4>
                                      <p className="text-[9.5px] text-[#1E40AF] leading-tight truncate">
                                        3-Day Intensive DSA Masterclass
                                      </p>
                                    </div>
                                  </Link>

                                  <Link 
                                    to="/events#e-2024-devops" 
                                    className="group/item flex items-center gap-2 p-1 rounded-xl hover:bg-[#EFF6FF] transition-colors"
                                  >
                                    <div className="w-6 h-6 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                      <Cpu className="w-3 h-3" />
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="font-bold text-[11px] text-[#0B1F33] group-hover/item:text-[#1D4ED8] transition-colors leading-tight truncate">
                                        Platform Engineering in DevOps
                                      </h4>
                                      <p className="text-[9.5px] text-[#1E40AF] leading-tight truncate">
                                        Container Orchestration & CI/CD Pipelines
                                      </p>
                                    </div>
                                  </Link>
                                </div>
                              </div>

                              {/* Sub-column 2: COMMUNITY & GROWTH */}
                              <div className="space-y-1.5">
                                <span className="block font-mono text-[9.5px] font-extrabold tracking-wider text-[#1E40AF] uppercase px-1">
                                  COMMUNITY & GROWTH
                                </span>
                                <div className="space-y-0.5">
                                  <Link 
                                    to="/events#e-2026-alumni" 
                                    className="group/item flex items-center gap-2 p-1 rounded-xl hover:bg-[#EFF6FF] transition-colors"
                                  >
                                    <div className="w-6 h-6 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                      <Users className="w-3 h-3" />
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="font-bold text-[11px] text-[#0B1F33] group-hover/item:text-[#1D4ED8] transition-colors leading-tight truncate">
                                        Alumni Interaction 2026
                                      </h4>
                                      <p className="text-[9.5px] text-[#1E40AF] leading-tight truncate">
                                        Mentorship & Placement Guidance
                                      </p>
                                    </div>
                                  </Link>

                                  <Link 
                                    to="/events#e-2026-tree-plantation" 
                                    className="group/item flex items-center gap-2 p-1 rounded-xl hover:bg-[#EFF6FF] transition-colors"
                                  >
                                    <div className="w-6 h-6 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                      <Trees className="w-3 h-3" />
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="font-bold text-[11px] text-[#0B1F33] group-hover/item:text-[#1D4ED8] transition-colors leading-tight truncate">
                                        Tree Plantation Drive
                                      </h4>
                                      <p className="text-[9.5px] text-[#1E40AF] leading-tight truncate">
                                        Ek Ped Maa Ke Naam Campaign
                                      </p>
                                    </div>
                                  </Link>

                                  <Link 
                                    to="/events#e-2026-local-iv" 
                                    className="group/item flex items-center gap-2 p-1 rounded-xl hover:bg-[#EFF6FF] transition-colors"
                                  >
                                    <div className="w-6 h-6 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                      <Compass className="w-3 h-3" />
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="font-bold text-[11px] text-[#0B1F33] group-hover/item:text-[#1D4ED8] transition-colors leading-tight truncate">
                                        Local Industrial Visit
                                      </h4>
                                      <p className="text-[9.5px] text-[#1E40AF] leading-tight truncate">
                                        Automation Expo 2026 at NESCO
                                      </p>
                                    </div>
                                  </Link>

                                  <Link 
                                    to="/events#e-2025-cyber-safety" 
                                    className="group/item flex items-center gap-2 p-1 rounded-xl hover:bg-[#EFF6FF] transition-colors"
                                  >
                                    <div className="w-6 h-6 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                      <ShieldCheck className="w-3 h-3" />
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="font-bold text-[11px] text-[#0B1F33] group-hover/item:text-[#1D4ED8] transition-colors leading-tight truncate">
                                        Cyber Safety Awareness
                                      </h4>
                                      <p className="text-[9.5px] text-[#1E40AF] leading-tight truncate">
                                        Community Digital Safety Drive
                                      </p>
                                    </div>
                                  </Link>

                                  <Link 
                                    to="/events#e-2024-ngo" 
                                    className="group/item flex items-center gap-2 p-1 rounded-xl hover:bg-[#EFF6FF] transition-colors"
                                  >
                                    <div className="w-6 h-6 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                      <Heart className="w-3 h-3" />
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="font-bold text-[11px] text-[#0B1F33] group-hover/item:text-[#1D4ED8] transition-colors leading-tight truncate">
                                        NGO Drive — Community Outreach
                                      </h4>
                                      <p className="text-[9.5px] text-[#1E40AF] leading-tight truncate">
                                        Student Mentorship & Humanitarian Care
                                      </p>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>

                            {/* Bottom Footer Bar */}
                            <div className="border-t border-[#93C5FD]/60 pt-2.5 flex items-center justify-between text-xs mt-0.5">
                              <span className="text-[11px] text-[#1E40AF] font-medium">
                                Department of Information Technology, TCET
                              </span>
                              <Link 
                                to="/contact" 
                                className="font-bold text-[11.5px] text-[#1E40AF] hover:underline inline-flex items-center gap-1 group/collab"
                              >
                                <span>Collaborate</span>
                                <ArrowRight className="w-3 h-3 group-hover/collab:translate-x-0.5 transition-transform" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-full font-bold transition-all duration-200 whitespace-nowrap group ${
                    isHero 
                      ? 'px-2.5 xl:px-4 py-1.5 xl:py-2 text-xs xl:text-[14.5px]' 
                      : 'px-2 xl:px-3.5 py-1 xl:py-1.5 text-xs xl:text-sm'
                  } ${
                    isActive
                      ? "text-white bg-[#1D4ED8] shadow-md shadow-blue-600/25"
                      : "text-slate-700 hover:text-[#1D4ED8] hover:bg-slate-50"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link 
              to="/contact?type=feedback" 
              aria-label="Submit Feedback for TCET ACM SIGITE Chapter"
              className={`hidden xl:inline-flex items-center justify-center rounded-full border border-blue-200/80 bg-blue-50/70 text-[#1D4ED8] font-bold tracking-tight hover:bg-blue-100 hover:border-blue-300 hover:text-[#1E40AF] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all whitespace-nowrap gap-1.5 ${
                isHero 
                  ? 'min-h-[38px] xl:min-h-[42px] px-3.5 xl:px-4 py-1.5 xl:py-2 text-xs xl:text-sm' 
                  : 'min-h-[34px] xl:min-h-[36px] px-3 xl:px-3.5 py-1 xl:py-1.5 text-xs'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#1D4ED8]" aria-hidden="true" />
              <span>Feedback</span>
            </Link>

            <Link 
              to="/contact" 
              aria-label="Contact TCET ACM SIGITE Chapter"
              className={`hidden sm:inline-flex items-center justify-center rounded-full bg-[#FFD43B] text-[#0B1F33] font-black uppercase tracking-wider shadow-sm shadow-[#FFD43B]/25 hover:bg-[#FFC71F] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all whitespace-nowrap ${
                isHero 
                  ? 'min-h-[36px] xl:min-h-[42px] px-3.5 lg:px-4 xl:px-5 py-1.5 xl:py-2 text-xs xl:text-sm' 
                  : 'min-h-[32px] xl:min-h-[36px] px-3 lg:px-3.5 xl:px-4 py-1 xl:py-1.5 text-xs xl:text-sm'
              }`}
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className={`lg:hidden flex items-center justify-center rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 transition-all active:scale-95 focus:outline-none ${
                isHero ? 'w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] min-h-[36px]' : 'w-8 h-8 sm:w-9 sm:h-9 min-w-[32px] min-h-[32px]'
              }`}
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer — Smooth GPU-Friendly Slide-in */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden fixed inset-0 z-[100] bg-[#0A2540] text-white flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-[#93C5FD] uppercase tracking-widest">
                Navigation Menu
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="w-12 h-12 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all active:scale-95"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2 my-6">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between min-h-[48px] py-2.5 text-xl font-display font-black uppercase text-white hover:text-[#93C5FD] transition-colors border-b border-white/10"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-sm text-[#93C5FD] font-bold">{link.number}</span>
                </NavLink>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <Link 
                to="/contact?type=feedback"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[48px] py-3 rounded-full border border-white/20 bg-white/10 text-white font-mono text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-98 hover:bg-white/20 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#93C5FD]" />
                <span>Submit Feedback</span>
              </Link>

              <Link 
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[48px] py-3.5 rounded-full bg-[#FFD43B] text-[#0B1F33] font-mono text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FFD43B]/25 active:scale-98"
              >
                <span>Contact Us</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
