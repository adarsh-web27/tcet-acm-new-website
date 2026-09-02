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
  Sparkles,
  Zap,
  Briefcase,
  Heart
} from 'lucide-react';
import { logoAssets } from '../assets';

const NAV_LINKS = [
  { path: '/', label: 'Home', number: '01' },
  { path: '/who-we-are', label: 'Chapter', number: '02', isChapterMenu: true },
  { path: '/events', label: 'Events', number: '03' },
  { path: '/achievements', label: 'Achievements', number: '04' },
  { path: '/team', label: 'Team', number: '05' },
  { path: '/gallery', label: 'Gallery', number: '06' },
  { path: '/contact', label: 'Contact', number: '07' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const megaMenuTimeoutRef = useRef(null);

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
      <header className="fixed top-2.5 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center px-3 sm:px-6 pointer-events-none">
        <div 
          className={`pointer-events-auto w-[calc(100%-24px)] md:w-[92%] max-w-7xl rounded-full px-3 sm:px-6 py-2 flex items-center justify-between gap-3 sm:gap-4 transition-all duration-200 border bg-white/95 backdrop-blur-md ${
            isScrolled 
              ? 'border-slate-200 shadow-[0_12px_35px_-8px_rgba(15,23,42,0.12)]'
              : 'border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
          }`}
        >
          {/* Left: Brand Identity (Clean, responsive & properly bounded) */}
          <Link 
            to="/" 
            className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 hover:opacity-90 transition-opacity shrink-0 group py-0.5"
          >
            <img 
              src={logoAssets.logoImage} 
              alt="TCET ACM SIGITE Chapter Logo" 
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 object-contain group-hover:scale-105 transition-transform drop-shadow-xs shrink-0"
              width={40}
              height={40}
            />
            <div className="flex flex-col text-left justify-center min-w-0">
              <span className="font-display font-black text-xs sm:text-[13px] lg:text-[14px] tracking-wide text-[#0B1F33] leading-none group-hover:text-[#1D4ED8] transition-colors uppercase whitespace-nowrap">
                {logoAssets.chapterName}
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] lg:text-[9px] font-mono font-bold text-[#1E40AF] tracking-tight mt-0.5 whitespace-nowrap">
                {logoAssets.collegeName}
              </span>
            </div>
          </Link>

          {/* Center: Nav Links & Chapter MegaMenu (Desktop >= 1024px) */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0 relative">
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
                      className={`relative px-4 py-1.5 rounded-full text-[13px] font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-1 group ${
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
                                  <span className="font-display font-extrabold text-[13px] tracking-wide text-[#0B1F33] uppercase">
                                    WHO WE ARE
                                  </span>
                                </div>
                                <Link 
                                  to="/who-we-are" 
                                  className="text-[12px] font-bold text-[#1E40AF] hover:underline inline-flex items-center gap-1 group/link"
                                >
                                  <span>Full Page</span>
                                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                                </Link>
                              </div>

                              <p className="text-[11.5px] text-[#1E40AF] leading-relaxed font-normal">
                                TCET ACM SIGITE (est. July 2011) connects students to computing research and student leadership.
                              </p>
                            </div>

                            {/* 5 Nav Items */}
                            <div className="space-y-1">
                              <Link 
                                to="/who-we-are#heritage" 
                                className="group/item flex items-center gap-3 p-1.5 rounded-xl hover:bg-[#93C5FD]/60 transition-colors"
                              >
                                <div className="w-7 h-7 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                  <Globe className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-[11.5px] text-[#0B1F33] group-hover/item:text-[#1E40AF] transition-colors leading-tight">
                                    ACM Global & SIGITE
                                  </h4>
                                  <p className="text-[10.5px] text-[#1E40AF] leading-tight mt-0.5">
                                    Chartered July 2011 (ACM USA)
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
                                    Vision & Core Values
                                  </h4>
                                  <p className="text-[10.5px] text-[#1E40AF] leading-tight mt-0.5">
                                    Applied computing & leadership
                                  </p>
                                </div>
                              </Link>

                              <Link 
                                to="/who-we-are#vision" 
                                className="group/item flex items-center gap-3 p-1.5 rounded-xl hover:bg-[#93C5FD]/60 transition-colors"
                              >
                                <div className="w-7 h-7 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                  <Sparkles className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-[11.5px] text-[#0B1F33] group-hover/item:text-[#1E40AF] transition-colors leading-tight">
                                    Strategic Objectives
                                  </h4>
                                  <p className="text-[10.5px] text-[#1E40AF] leading-tight mt-0.5">
                                    Academia & industry integration
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
                                  <h4 className="font-bold text-[11.5px] text-[#0B1F33] group-hover/item:text-[#1E40AF] transition-colors leading-tight">
                                    Through Their Lens
                                  </h4>
                                  <p className="text-[10.5px] text-[#1E40AF] leading-tight mt-0.5">
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
                                  <h4 className="font-bold text-[11.5px] text-[#0B1F33] group-hover/item:text-[#1E40AF] transition-colors leading-tight">
                                    Journey & Accolades
                                  </h4>
                                  <p className="text-[10.5px] text-[#1E40AF] leading-tight mt-0.5">
                                    ACM India Summit Best Website
                                  </p>
                                </div>
                              </Link>
                            </div>

                            {/* Bottom Card */}
                            <Link
                              to="/achievements"
                              className="block p-3 rounded-2xl bg-[#DBEAFE] border border-[#93C5FD] hover:border-[#3B82F6] transition-all group/award mt-1"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="font-bold text-[11.5px] text-[#0B1F33]">
                                    ACM India Summit Award
                                  </h5>
                                  <p className="text-[10.5px] font-medium text-[#1E40AF] mt-0.5">
                                    Honorable Mention: Best Chapter Website
                                  </p>
                                </div>
                                <Award className="w-4 h-4 text-amber-500 shrink-0 group-hover/award:scale-110 transition-transform" />
                              </div>
                            </Link>
                          </div>

                          {/* ================= COLUMN 2: WHAT WE DO ================= */}
                          <div className="col-span-7 pl-1 flex flex-col justify-between space-y-4">
                            {/* Header */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-lg bg-[#DBEAFE] flex items-center justify-center text-[#1E40AF]">
                                    <Sparkles className="w-3.5 h-3.5" />
                                  </div>
                                  <span className="font-display font-extrabold text-[13px] tracking-wide text-[#0B1F33] uppercase">
                                    WHAT WE DO
                                  </span>
                                </div>
                                <Link 
                                  to="/events" 
                                  className="text-[12px] font-bold text-[#1E40AF] hover:underline inline-flex items-center gap-1 group/link"
                                >
                                  <span>All Activities</span>
                                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                                </Link>
                              </div>

                              <p className="text-[11.5px] text-[#1E40AF] leading-relaxed font-normal">
                                Competitive hackathons, spatial computing labs, tree plantation drives, and Scopus journals.
                              </p>
                            </div>

                            {/* 2 Sub-Columns */}
                            <div className="grid grid-cols-2 gap-4">
                              {/* Sub-column 1: TECHNICAL & INDUSTRY */}
                              <div className="space-y-2">
                                <span className="block font-mono text-[10px] font-bold tracking-wider text-[#1E40AF] uppercase">
                                  TECHNICAL & INDUSTRY
                                </span>
                                <div className="space-y-1">
                                  <Link 
                                    to="/events" 
                                    className="group/item flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#EFF6FF] transition-colors"
                                  >
                                    <div className="w-7 h-7 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                      <Terminal className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-[11px] text-[#0B1F33] group-hover/item:text-[#1D4ED8] transition-colors leading-tight">
                                        ACM ReCode
                                      </h4>
                                      <p className="text-[10px] text-[#1E40AF] leading-tight mt-0.5">
                                        3-round national hackathon
                                      </p>
                                    </div>
                                  </Link>

                                  <Link 
                                    to="/events" 
                                    className="group/item flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#EFF6FF] transition-colors"
                                  >
                                    <div className="w-7 h-7 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                      <Cpu className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-[11px] text-[#0B1F33] group-hover/item:text-[#1D4ED8] transition-colors leading-tight">
                                        Tech Workshops
                                      </h4>
                                      <p className="text-[10px] text-[#1E40AF] leading-tight mt-0.5">
                                        GenAI, Cloud & DSA bootcamps
                                      </p>
                                    </div>
                                  </Link>
                                </div>
                              </div>

                              {/* Sub-column 2: COMMUNITY & RESEARCH */}
                              <div className="space-y-2">
                                <span className="block font-mono text-[10px] font-bold tracking-wider text-[#1E40AF] uppercase">
                                  COMMUNITY & RESEARCH
                                </span>
                                <div className="space-y-1">
                                  <Link 
                                    to="/events" 
                                    className="group/item flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#EFF6FF] transition-colors"
                                  >
                                    <div className="w-7 h-7 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                      <Trees className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-[11px] text-[#0B1F33] group-hover/item:text-[#1D4ED8] transition-colors leading-tight">
                                        Tree Plantation
                                      </h4>
                                      <p className="text-[10px] text-[#1E40AF] leading-tight mt-0.5">
                                        Ek Ped Maa Ke Naam drives
                                      </p>
                                    </div>
                                  </Link>

                                  <Link 
                                    to="/achievements" 
                                    className="group/item flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#EFF6FF] transition-colors"
                                  >
                                    <div className="w-7 h-7 rounded-lg bg-[#DBEAFE] border border-[#93C5FD]/60 flex items-center justify-center text-[#1E40AF] shrink-0 group-hover/item:scale-105 transition-transform">
                                      <BookOpen className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-[11px] text-[#0B1F33] group-hover/item:text-[#1D4ED8] transition-colors leading-tight">
                                        ACM Ezine Journals
                                      </h4>
                                      <p className="text-[10px] text-[#1E40AF] leading-tight mt-0.5">
                                        Scopus research & papers
                                      </p>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>

                            {/* Bottom Footer Bar */}
                            <div className="border-t border-[#93C5FD]/60 pt-3 flex items-center justify-between text-xs mt-1">
                              <span className="text-[11px] text-[#1E40AF] font-medium">
                                Department of Information Technology, TCET
                              </span>
                              <Link 
                                to="/who-we-are#lens" 
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
                  className={`relative px-4 py-1.5 rounded-full text-[13px] font-bold transition-all duration-200 whitespace-nowrap group ${
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
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <Link 
              to="/contact" 
              aria-label="Contact TCET ACM Chapter"
              className="hidden sm:inline-flex lg:hidden xl:inline-flex items-center justify-center px-3.5 sm:px-4 py-1.5 rounded-full bg-[#FFD43B] text-[#0B1F33] text-xs font-black uppercase tracking-wider shadow-md shadow-[#FFD43B]/25 hover:bg-[#FFC71F] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all whitespace-nowrap"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
            </Link>

            {/* Mobile Menu Toggle Button (44x44px touch target) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 transition-all active:scale-95 focus:outline-none"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
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
              <span className="font-mono text-xs font-bold text-[#93C5FD] uppercase tracking-widest">
                Navigation Menu
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all active:scale-95"
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
                  <span className="font-mono text-xs text-[#93C5FD] font-bold">{link.number}</span>
                </NavLink>
              ))}
            </div>

            <div className="space-y-4 pt-2">
              <Link 
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[48px] py-3.5 rounded-full bg-[#FFD43B] text-[#0B1F33] font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FFD43B]/25 active:scale-98"
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
