import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Users, 
  CheckCircle2, 
  Linkedin, 
  Mail, 
  Github,
  Bookmark, 
  Quote, 
  X, 
  ArrowRight,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { 
  branchCounsellor, 
  facultyMentorsList, 
  studentPerspectivesList 
} from '../assets/whoWeAreAssets';

export default function WhoWeAre() {
  const [selectedPerspective, setSelectedPerspective] = useState(null);
  const [perspectiveFilter, setPerspectiveFilter] = useState('all');

  const timelineData = [
    {
      year: '2011',
      title: 'Foundation & ACM SIGITE Charter',
      desc: 'Officially chartered by ACM New York, USA under the Department of IT, TCET Mumbai to empower student computing education.',
      badge: 'Chartered'
    },
    {
      year: '2016',
      title: 'ACM India Chapter Excellence',
      desc: 'Established annual flagship hackathons, Scopus research mentoring, and community technical empowerment across Maharashtra.',
      badge: 'Excellence'
    },
    {
      year: '2021',
      title: 'Cloud & Advanced Computing Hub',
      desc: 'Formed technical domains in cloud computing, modern full-stack architectures, and competitive algorithmic problem solving.',
      badge: 'Innovation'
    },
    {
      year: '2025',
      title: 'ACM India Summit Honorable Mention',
      desc: 'Recognized nationwide by the ACM India Council for outstanding chapter portal engineering, student impact, and community drives.',
      badge: 'National Award'
    },
    {
      year: '2026',
      title: '15 Years of Engineering Leadership',
      desc: '140+ active student scholars, 300+ trees planted, and 50+ annual events scaling global alumni mentorship across Tier-1 US universities.',
      badge: 'Milestone'
    }
  ];

  const allPerspectives = [
    branchCounsellor,
    ...facultyMentorsList,
    ...studentPerspectivesList
  ];

  return (
    <div className="relative min-h-screen text-[#0B1F33] pt-28 pb-24 overflow-x-hidden font-sans">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 space-y-24">
        
        {/* ================= 1. HERO HEADER ================= */}
        <section className="text-center max-w-4xl mx-auto space-y-6 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#93C5FD] border border-[#3B82F6]/30 text-[#0B1F33] text-xs font-mono font-bold uppercase tracking-widest shadow-sm"
          >
            <span>EST. 2011 • 15+ YEARS OF IMPACT • TCET ACM SIGITE</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-[#0B1F33] uppercase tracking-tight leading-[1.12] py-1"
          >
            A Chapter Defined <br className="hidden sm:inline" />
            <span className="inline-block italic pr-3 pb-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1D4ED8] via-[#3B82F6] to-[#0284C7]">
              by Purpose & Progress
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#1E40AF] font-medium leading-relaxed max-w-3xl mx-auto"
          >
            TCET ACM SIGITE, the official ACM SIGITE student chapter under the Department of Information Technology at TCET, has spent over 15 years fostering innovation, research, technical excellence, and leadership through a thriving community of students and mentors.
          </motion.p>
        </section>

        {/* ================= 2. VISION & MISSION COMPARATIVE CARDS ================= */}
        <section id="vision" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/95 border-2 border-[#93C5FD] rounded-3xl p-8 sm:p-10 shadow-[0_12px_35px_-8px_rgba(3,109,164,0.14)] flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#93C5FD] border border-[#3B82F6]/30 text-[#0B1F33] text-xs font-mono font-bold uppercase">
                <Bookmark className="w-3.5 h-3.5" />
                <span>Our IT Department Vision</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0B1F33] uppercase tracking-tight">
                Leadership In IT Education
              </h3>
              <blockquote className="border-l-4 border-[#1D4ED8] pl-4 italic text-base text-[#1E40AF] font-medium leading-relaxed">
                "The department of IT will strive to be at the top position among the renowned providers of IT education"
              </blockquote>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#93C5FD] text-xs font-mono font-semibold text-[#0B1F33]">
              <div>✦ QUALITY EDUCATION</div>
              <div>✦ GLOBAL STANDARDS</div>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/95 border-2 border-[#93C5FD] rounded-3xl p-8 sm:p-10 shadow-[0_12px_35px_-8px_rgba(3,109,164,0.14)] flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#93C5FD] border border-[#3B82F6]/30 text-[#0B1F33] text-xs font-mono font-bold uppercase">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Our IT Department Mission</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0B1F33] uppercase tracking-tight">
                Industry-Ready Excellence
              </h3>
              <blockquote className="border-l-4 border-[#1D4ED8] pl-4 italic text-base text-[#1E40AF] font-medium leading-relaxed">
                "The IT department is committed to enrich students by rigorously implementing quality education with a focus to make them industry ready, while imbibing in them professional ethics and social values to become responsible citizens."
              </blockquote>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#93C5FD] text-xs font-mono font-semibold text-[#0B1F33]">
              <div>✦ INDUSTRY READINESS</div>
              <div>✦ PROFESSIONAL ETHICS</div>
            </div>
          </motion.div>

        </section>

        {/* ================= 4. "THROUGH THEIR LENS" (INTERACTIVE PERSPECTIVES & STORYTELLING) ================= */}
        <section id="lens" className="space-y-14">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#93C5FD] border border-[#3B82F6]/30 text-[#0B1F33] text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
              <Quote className="w-3.5 h-3.5 text-[#0B1F33]" />
              <span>COMMUNITY VOICES & EXPERIENCES</span>
            </div>
            
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#0B1F33] uppercase tracking-tight leading-[1.08]">
              Through Their Lens
            </h2>
            
            <p className="text-base sm:text-lg text-[#1E40AF] font-medium leading-relaxed">
              Stories, experiences and perspectives from the faculty mentors and student leaders shaping the ACM SIGITE legacy.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {[
                { id: 'all', label: 'All Perspectives' },
                { id: 'faculty', label: '🎓 Faculty & Mentors' },
                { id: 'student', label: '🚀 Students Perspective' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setPerspectiveFilter(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                    perspectiveFilter === tab.id
                      ? 'bg-[#1D4ED8] text-white shadow-sm scale-[1.02]'
                      : 'bg-[#93C5FD] text-[#0B1F33] hover:bg-[#3B82F6] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ================= A. BRANCH COUNSELLOR SPOTLIGHT FEATURE ================= */}
          {(perspectiveFilter === 'all' || perspectiveFilter === 'faculty') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/95 border-2 border-[#93C5FD] rounded-[36px] p-8 sm:p-12 md:p-14 shadow-[0_14px_45px_-10px_rgba(3,109,164,0.16)] hover:border-[#1D4ED8]/40 transition-all duration-500 relative overflow-hidden"
            >
              {/* Decorative quotation background symbol */}
              <Quote className="absolute right-6 -bottom-8 w-48 h-48 text-[#93C5FD]/30 -z-0 pointer-events-none select-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                
                {/* Left: Portrait & Badges */}
                <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
                  <div className="relative group cursor-pointer" onClick={() => setSelectedPerspective(branchCounsellor)}>
                    <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-[#1D4ED8] shadow-md group-hover:scale-105 transition-transform duration-300">
                      <img 
                        src={branchCounsellor.image} 
                        alt={branchCounsellor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="absolute bottom-3 right-3 p-2 rounded-xl bg-[#1D4ED8] text-white shadow-md group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>

                  <span className="inline-block font-mono text-xs sm:text-sm font-bold text-[#0B1F33] uppercase tracking-wider px-3 py-1 rounded-full bg-[#93C5FD] border border-[#3B82F6]/30">
                    {branchCounsellor.badge}
                  </span>
                </div>

                {/* Right: Narrative Editorial */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1E40AF] uppercase tracking-wider block mb-1">
                      FEATURED COUNSELLOR SPOTLIGHT
                    </span>
                    <h3 className="font-display font-black text-3xl sm:text-4xl text-[#0B1F33]">
                      {branchCounsellor.name}
                    </h3>
                    <p className="font-mono text-sm font-bold text-[#0B1F33] mt-0.5">
                      {branchCounsellor.role}
                    </p>
                    <p className="text-xs sm:text-sm text-[#1E40AF]">
                      {branchCounsellor.department}
                    </p>
                  </div>

                  {/* Pull Quote */}
                  <div className="relative bg-[#DBEAFE] border border-[#93C5FD] rounded-2xl p-6 shadow-sm space-y-3">
                    <p className="italic text-base sm:text-lg text-[#0B1F33] font-medium leading-relaxed">
                      "{branchCounsellor.quote}"
                    </p>
                    <p className="text-xs sm:text-sm font-mono font-bold text-[#1E40AF]">
                      — On transforming student engineers into ethical computing scholars.
                    </p>
                  </div>

                  {/* Action triggers */}
                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <button
                      onClick={() => setSelectedPerspective(branchCounsellor)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1D4ED8] text-white text-xs sm:text-sm font-mono font-bold hover:bg-[#3B82F6] transition-all shadow-sm cursor-pointer"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Read Full Perspective</span>
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* ================= B. FACULTY IN-CHARGE PERSPECTIVE CARDS ================= */}
          {(perspectiveFilter === 'all' || perspectiveFilter === 'faculty') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#93C5FD] pb-4">
                <div>
                  <h3 className="font-display font-black text-2xl text-[#0B1F33] uppercase tracking-tight">
                    Faculty Mentorship Perspectives
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1E40AF] mt-0.5">
                    Insights from faculty chairs overseeing research, project development, and academic excellence.
                  </p>
                </div>
                <span className="hidden sm:inline-block font-mono text-xs sm:text-sm text-[#1E40AF] font-bold">
                  {facultyMentorsList.length} Mentors
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {facultyMentorsList.map((mentor) => (
                  <motion.div
                    key={mentor.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onClick={() => setSelectedPerspective(mentor)}
                    className="bg-white/95 border-2 border-[#93C5FD] rounded-3xl p-6 sm:p-7 shadow-md hover:shadow-xl hover:border-[#1D4ED8]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-5 cursor-pointer group"
                  >
                    <div className="space-y-4">
                      {/* Header row */}
                      <div className="flex items-center gap-3.5">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#1D4ED8] shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                          <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-display font-black text-lg text-[#0B1F33] leading-tight group-hover:text-[#1E40AF] transition-colors">
                            {mentor.name}
                          </h4>
                          <p className="font-mono text-xs font-bold text-[#0B1F33] mt-0.5">
                            {mentor.role}
                          </p>
                          <span className="inline-block text-xs font-mono font-bold text-[#0B1F33] px-2.5 py-0.5 rounded-full bg-[#93C5FD] border border-[#3B82F6]/20 mt-1">
                            {mentor.badge}
                          </span>
                        </div>
                      </div>

                      {/* Pull Quote excerpt */}
                      <blockquote className="italic text-xs sm:text-sm text-[#1E40AF] font-medium leading-relaxed border-l-2 border-[#1D4ED8] pl-3">
                        "{mentor.quote}"
                      </blockquote>
                    </div>

                    <div className="pt-3 border-t border-[#93C5FD] flex items-center justify-between text-xs sm:text-sm font-mono font-bold text-[#0B1F33] group-hover:text-[#1E40AF] transition-colors">
                      <span>Explore Perspective</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ================= C. STUDENT LEADERSHIP PERSPECTIVES ================= */}
          {(perspectiveFilter === 'all' || perspectiveFilter === 'student') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#93C5FD] pb-4">
                <div>
                  <h3 className="font-display font-black text-2xl text-[#0B1F33] uppercase tracking-tight">
                    Student Leadership Perspectives
                  </h3>
                  <p className="text-xs text-[#1E40AF] mt-0.5">
                    Real reflections and insights from student core committee leaders.
                  </p>
                </div>
                <span className="hidden sm:inline-block font-mono text-xs text-[#1E40AF] font-bold">
                  {studentPerspectivesList.length} Reflections
                </span>
              </div>

              {/* Grid Container */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {studentPerspectivesList.map((student) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onClick={() => setSelectedPerspective(student)}
                    className="bg-white/95 border-2 border-[#93C5FD] rounded-3xl p-6 shadow-md hover:shadow-xl hover:border-[#1D4ED8]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer group"
                  >
                    <div className="space-y-3.5">
                      {/* Top Profile */}
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#1D4ED8] shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                          <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-display font-black text-base text-[#0B1F33] leading-tight group-hover:text-[#1E40AF] transition-colors">
                            {student.name}
                          </h4>
                          <p className="font-mono text-xs font-bold text-[#0B1F33] mt-0.5">
                            {student.role}
                          </p>
                          <span className="inline-block text-[9.5px] font-mono font-bold text-[#0B1F33] px-2 py-0.5 rounded-full bg-[#93C5FD] border border-[#3B82F6]/20 mt-1">
                            {student.badge}
                          </span>
                        </div>
                      </div>

                      {/* Quote */}
                      <p className="italic text-xs text-[#1E40AF] font-medium leading-relaxed line-clamp-4 border-l-2 border-[#1D4ED8] pl-3">
                        "{student.quote}"
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3 border-t border-[#93C5FD] flex items-center justify-between text-[11px] font-mono font-bold text-[#0B1F33] group-hover:text-[#1E40AF] transition-colors">
                      <span>Read Experience</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </section>

        {/* ================= 5. INTERACTIVE MILESTONES & TIMELINE (2011 – 2026) ================= */}
        <section id="timeline" className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-[#1E40AF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#93C5FD]">
              HISTORICAL EVOLUTION
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0B1F33] uppercase tracking-tight">
              15-Year Milestone Roadmap
            </h2>
            <p className="text-sm sm:text-base text-[#1E40AF]">
              Tracing our journey from foundation in July 2011 to receiving national honors at the ACM India Summit.
            </p>
          </div>

          <div className="relative border-l-2 border-[#3B82F6]/30 ml-4 sm:ml-32 space-y-10">
            {timelineData.map((item, idx) => (
              <motion.div 
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-8 sm:pl-10 group"
              >
                {/* Year Label Node */}
                <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-[#1D4ED8] text-white font-mono font-bold text-xs flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  ✦
                </div>

                <div className="hidden sm:block absolute -left-32 top-1 font-mono font-black text-2xl text-[#1E40AF]">
                  {item.year}
                </div>

                <div className="bg-white/95 border-2 border-[#93C5FD] rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="sm:hidden font-mono font-black text-lg text-[#1E40AF]">
                      {item.year}
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#93C5FD] border border-[#3B82F6]/30 text-[#0B1F33]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xl sm:text-2xl text-[#0B1F33]">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#1E40AF] font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      {/* ================= PERSPECTIVE DETAIL MODAL (EDITORIAL EXPANDED VIEW) ================= */}
      <AnimatePresence>
        {selectedPerspective && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPerspective(null)}
              className="fixed inset-0 bg-[#1D4ED8]/40 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-2xl bg-[#DBEAFE] border-2 border-[#93C5FD] rounded-3xl p-6 sm:p-10 shadow-2xl z-10 space-y-6 my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                aria-label="Close perspective details"
                onClick={() => setSelectedPerspective(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#93C5FD] text-[#0B1F33] hover:bg-[#1D4ED8] hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-[#1D4ED8] shrink-0 shadow-md">
                  <img 
                    src={selectedPerspective.image} 
                    alt={selectedPerspective.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="inline-block text-xs sm:text-sm font-mono font-bold text-[#0B1F33] px-3 py-1 rounded-full bg-[#93C5FD] border border-[#3B82F6]/30">
                    {selectedPerspective.badge}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0B1F33]">
                    {selectedPerspective.name}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm font-bold text-[#0B1F33]">
                    {selectedPerspective.role}
                  </p>
                  <p className="text-xs sm:text-sm text-[#1E40AF]">
                    {selectedPerspective.department}
                  </p>
                </div>
              </div>

              {/* Editorial Pull Quote Box */}
              <div className="bg-[#EFF6FF] border border-[#93C5FD] rounded-2xl p-6 shadow-sm space-y-2">
                <Quote className="w-6 h-6 text-[#0B1F33]" />
                <p className="italic text-base sm:text-lg text-[#0B1F33] font-medium leading-relaxed">
                  "{selectedPerspective.quote}"
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
