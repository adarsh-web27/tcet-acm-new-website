import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { Github, Linkedin, Mail, Users, Award, ShieldCheck } from 'lucide-react';
import { teamAssets } from '../assets';

export default function TeamGrid() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const cardsRowRef = useRef(null);
  const teamGridRef = useRef(null);
  const statsRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredMembers = teamAssets.filter((member) => {
    if (activeFilter === 'faculty') return member.badge.includes('FACULTY');
    if (activeFilter === 'student') return !member.badge.includes('FACULTY');
    return true;
  });

  // 8 cards for the hero fan-out in exact requested order (left to right):
  // Praham, Harshvardhan, Archita, Mary, Rajesh, Apeksha, Girik, Anannya
  const heroSequenceIds = [
    'praham-tiwari',
    'harshvardhan-miskin',
    'archita-agar',
    'mary-margarat',
    'rajesh-bansode',
    'apeksha-waghmare',
    'girik-shukla',
    'anannya-salvi'
  ];

  const heroCards = heroSequenceIds
    .map((id) => teamAssets.find((m) => m.id === id))
    .filter(Boolean);

  const cardConfig = [
    { rot: -9, depth: 14, className: 'w-[80px] h-[110px] sm:w-[130px] sm:h-[180px] left-[1%] sm:left-[4%] top-[20px] sm:top-[30px] z-[1]' },
    { rot: -5, depth: 10, className: 'w-[90px] h-[130px] sm:w-[160px] sm:h-[220px] left-[11%] sm:left-[12%] top-[35px] sm:top-[50px] z-[2]' },
    { rot: -2, depth: 8,  className: 'w-[110px] h-[150px] sm:w-[200px] sm:h-[270px] left-[23%] sm:left-[22%] top-[15px] sm:top-[20px] z-[4]' },
    { rot: 3,  depth: 12, className: 'w-[90px] h-[120px] sm:w-[150px] sm:h-[200px] left-[36%] sm:left-[36%] top-[45px] sm:top-[70px] z-[3]' },
    { rot: 0,  depth: 6,  className: 'w-[130px] h-[180px] sm:w-[230px] sm:h-[310px] left-[45%] sm:left-[44%] top-[0px] z-[5]' },
    { rot: 4,  depth: 11, className: 'w-[95px] h-[130px] sm:w-[160px] sm:h-[215px] left-[61%] sm:left-[59%] top-[40px] sm:top-[55px] z-[3]' },
    { rot: 7,  depth: 9,  className: 'w-[100px] h-[140px] sm:w-[175px] sm:h-[240px] left-[73%] sm:left-[70%] top-[20px] sm:top-[30px] z-[4]' },
    { rot: -4, depth: 13, className: 'w-[80px] h-[110px] sm:w-[130px] sm:h-[175px] left-[85%] sm:left-[84%] top-[35px] sm:top-[50px] z-[2]' },
  ];

  const fanMoves = [
    { x: -260, y: -40, rot: -25 },
    { x: -200, y: 20, rot: -18 },
    { x: -120, y: 80, rot: -10 },
    { x: -40, y: 120, rot: -4 },
    { x: 40, y: 120, rot: 4 },
    { x: 120, y: 80, rot: 12 },
    { x: 200, y: 20, rot: 22 },
    { x: 260, y: -40, rot: 28 }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial hidden setups before paint
      gsap.set('.team-small-title .word > span', { y: '105%' });
      gsap.set('.team-big-title .letter', { y: 80, opacity: 0 });
      gsap.set('.team-lead-card', { opacity: 0, y: 60 });
      gsap.set('.team-stats-box', { opacity: 0, y: 40 });

      const cards = gsap.utils.toArray('.hero-team-card');

      // Set cards off-screen above with rotation & scale down
      cards.forEach((card, i) => {
        const rot = cardConfig[i]?.rot || 0;
        card.dataset.restRot = rot;
        gsap.set(card, { y: -900, rotation: rot + 25, opacity: 0, scale: 0.7 });
      });

      // 2. INTRO TIMELINE - Cards Falling Down from above
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      introTl
        .to('.team-small-title .word > span', {
          y: '0%',
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out'
        }, 0.2)
        .to('.team-big-title .letter', {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.04,
          ease: 'back.out(1.6)'
        }, 0.4)
        .to(cards, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: (i) => cardConfig[i]?.rot || 0,
          duration: 1.2,
          stagger: { each: 0.08, from: 'center' },
          ease: 'back.out(1.4)'
        }, 0.6);

      // 3. Floating sine oscillation on the INNER card element (never conflicts with scroll transforms!)
      const innerCards = gsap.utils.toArray('.hero-team-card-inner');
      innerCards.forEach((inner, i) => {
        gsap.to(inner, {
          y: i % 2 === 0 ? 6 : -6,
          duration: 2.8 + (i % 3) * 0.4,
          delay: 1.8 + i * 0.1,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        });
      });

      // 4. Parallax mouse effect
      const heroElem = heroRef.current;
      if (heroElem) {
        const handleMouseMove = (e) => {
          const r = heroElem.getBoundingClientRect();
          const mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
          const my = ((e.clientY - r.top) / r.height - 0.5) * 2;

          innerCards.forEach((inner, i) => {
            const depth = cardConfig[i]?.depth || 8;
            gsap.to(inner, {
              x: mx * depth,
              duration: 0.6,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          });
        };

        const handleMouseLeave = () => {
          gsap.to(innerCards, {
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        };

        heroElem.addEventListener('mousemove', handleMouseMove, { passive: true });
        heroElem.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      }

      // 5. Hero Scroll Fan-out (Scrubbed Timeline — 100% stable, zero vibration/glitch)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8
        }
      });

      scrollTl
        .to('.team-big-title', { scale: 1.15, opacity: 0.55, ease: 'none' }, 0)
        .to('.team-small-title', { y: -60, opacity: 0, ease: 'none' }, 0);

      cards.forEach((card, i) => {
        const m = fanMoves[i] || { x: 0, y: 0, rot: 0 };
        const baseRot = cardConfig[i]?.rot || 0;
        scrollTl.to(card, {
          x: m.x,
          y: m.y,
          rotation: baseRot + m.rot,
          ease: 'power1.out'
        }, 0);
      });

      // 6. Team Grid Reveal
      ScrollTrigger.create({
        trigger: teamGridRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to('.team-lead-card', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out'
          });
        }
      });

      // 7. Stats Reveal & Counter
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.team-stats-box', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
          });

          document.querySelectorAll('.stat-number').forEach((el) => {
            const target = parseFloat(el.dataset.count) || 0;
            const span = el.querySelector('span');
            if (!span) return;
            gsap.to(
              { v: 0 },
              {
                v: target,
                duration: 2,
                ease: 'power2.out',
                onUpdate: function () {
                  span.textContent = Math.floor(this.targets()[0].v).toLocaleString();
                }
              }
            );
          });
        },
        once: true
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const branchCounsellor = teamAssets.find((m) => m.id === 'rajesh-bansode');
  const facultyMentors = [
    teamAssets.find((m) => m.id === 'mary-margarat'),
    teamAssets.find((m) => m.id === 'apeksha-waghmare'),
    teamAssets.find((m) => m.id === 'archita-agar'),
  ].filter(Boolean);

  const studentOfficers = [
    'girik-shukla',
    'anannya-salvi',
    'vedant-singh',
    'praham-tiwari',
    'vedant-dusane',
    'harshvardhan-miskin',
    'kaushal-pawar',
    'dishi-jain',
    'prashant-shukla',
    'chirag-prajapati',
    'aaditya-gupta',
    'gesu-singh',
  ].map((id) => teamAssets.find((m) => m.id === id)).filter(Boolean);

  const [selectedCardId, setSelectedCardId] = useState(null);

  const renderCard = (member) => {
    const isSelected = selectedCardId === member.id;

    return (
      <div
        key={member.id}
        onClick={() => setSelectedCardId(isSelected ? null : member.id)}
        className="team-lead-card aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden relative group border-2 border-[#93C5FD] bg-white shadow-[0_8px_30px_-8px_rgba(3,109,164,0.16)] hover:shadow-2xl hover:border-[#1D4ED8]/50 transition-all duration-300 flex flex-col justify-between p-2.5 sm:p-4 cursor-pointer"
      >
        {/* Inner Image Frame */}
        <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#DBEAFE]">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading={member.id === 'rajesh-bansode' ? 'eager' : 'lazy'}
            fetchpriority={member.id === 'rajesh-bansode' ? 'high' : 'auto'}
            width={400}
            height={540}
          />
          
          {/* Top Badge */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
            <span className="font-mono text-[9px] sm:text-[10px] font-bold text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#0B1F33]/90 border border-white/10 shadow-sm flex items-center gap-1">
              {member.badge.includes('FACULTY') ? <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FFD43B]" /> : <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#60B6FF]" />}
              <span className="truncate max-w-[120px] sm:max-w-none">{member.badge}</span>
            </span>
          </div>

          {/* Meta Glass Pill Overlay (Visible on hover on desktop, or on tap on mobile) */}
          <div className={`absolute left-2 right-2 bottom-2 sm:left-3 sm:right-3 sm:bottom-3 p-3 sm:p-4 rounded-xl bg-white border border-[#93C5FD]/60 text-[#0B1F33] shadow-xl transition-all duration-300 ${
            isSelected 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-90 sm:opacity-0 group-hover:opacity-100 translate-y-0 sm:translate-y-2 group-hover:translate-y-0'
          }`}>
            <div className="flex flex-col gap-2">
              <h3 className="font-display font-black text-sm sm:text-base md:text-lg text-[#0B1F33] leading-tight truncate">
                {member.name}
              </h3>

              {/* Socials below name */}
              <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name}'s GitHub`}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#0B1F33] hover:bg-[#1D4ED8] hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name}'s LinkedIn`}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#0B1F33] hover:bg-[#1D4ED8] hover:text-white transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                )}
                {member.badge.includes('FACULTY') && member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    aria-label={`Email ${member.name}`}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#0B1F33] hover:bg-[#1D4ED8] hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const scrollToGrid = () => {
    teamGridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      
      {/* ================= SECTION 1: GSAP FAN-OUT HERO ================= */}
      {/* MOBILE HERO INTRO (< md): Compact, Rich & Zero Blank Space */}
      <section className="block md:hidden pt-20 pb-8 px-4 text-center select-none">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-[#DBEAFE] text-[#1E40AF] border border-[#93C5FD] mb-3 shadow-xs">
          <Users className="w-3 h-3 text-[#1E40AF]" />
          <span>TCET ACM • LEADERSHIP 2025–26</span>
        </div>

        <h1 className="font-display font-[900] text-3xl text-[#0B1F33] tracking-tight leading-tight uppercase mb-2">
          Core Leadership, <br />
          <span className="text-[#1D4ED8]">BIG IMPACT.</span>
        </h1>

        <p className="text-xs text-[#1E40AF] max-w-xs mx-auto leading-relaxed mb-6 font-medium">
          Empowering student innovation and research excellence through experienced faculty mentorship and student leadership.
        </p>

        {/* Compact Mobile Featured Trio Stack */}
        <div className="flex items-center justify-center -space-x-4 py-2 cursor-pointer mb-6" onClick={scrollToGrid}>
          {facultyMentors.slice(0, 2).map((m, idx) => (
            <div key={m.id} className={`w-20 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-[#DBEAFE] ${idx === 0 ? '-rotate-6 translate-y-1' : 'rotate-6 translate-y-1'}`}>
              <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
            </div>
          ))}
          {branchCounsellor && (
            <div className="w-24 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#1D4ED8] shadow-2xl bg-white relative z-10 scale-105 -translate-y-1">
              <img src={branchCounsellor.image} alt={branchCounsellor.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 inset-x-0 bg-[#0B1F33]/90 text-white text-[8px] font-mono font-bold py-0.5 px-1 truncate">
                Dr. Rajesh Bansode
              </div>
            </div>
          )}
        </div>

        <button
          onClick={scrollToGrid}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#0B1F33] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all"
        >
          <span>Explore All 16 Members</span>
          <span className="text-[#38BDF8]">↓</span>
        </button>
      </section>

      {/* DESKTOP HERO (>= md): Full GSAP Fan-Out */}
      <section 
        ref={heroRef} 
        className="hidden md:flex relative min-h-screen flex-col items-center justify-start pt-24 sm:pt-28 pb-16 px-4 sm:px-8 select-none overflow-hidden"
      >

        {/* Small Headline — Shifted up directly under navbar */}
        <h1 className="team-small-title font-display font-black text-[clamp(34px,5vw,72px)] text-[#0B1F33] tracking-tight leading-none text-center relative z-10 mb-0">
          <span className="word inline-block overflow-hidden align-top"><span className="inline-block">Core</span></span>&nbsp;
          <span className="word inline-block overflow-hidden align-top"><span className="inline-block">leadership,</span></span>
        </h1>

        {/* Subtle Watermark Big Impact Typography — Positioned in the upper band above cards */}
        <div className="team-big-wrap relative w-full -mt-2 sm:-mt-5 flex justify-center z-[1]">
          <div className="team-big-title font-display italic font-black text-[clamp(80px,16vw,220px)] leading-[0.85] tracking-tighter text-[#1E40AF]/15 text-center whitespace-nowrap select-none drop-shadow-sm">
            {'BIG IMPACT'.split('').map((char, index) => (
              <span 
                key={index} 
                className="letter inline-block transition-transform duration-300 hover:-translate-y-3 cursor-default"
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>

        {/* Floating Cards Row — Positioned below the titles with ample breathing room */}
        <div ref={cardsRowRef} className="cards-row absolute left-0 right-0 top-[52%] sm:top-[55%] h-[260px] sm:h-[340px] z-[3] pointer-events-none">
          {heroCards.map((member, i) => {
            const cfg = cardConfig[i] || cardConfig[0];
            return (
              <div
                key={member.id}
                data-rot={cfg.rot}
                data-depth={cfg.depth}
                className={`hero-team-card absolute ${cfg.className}`}
                onClick={scrollToGrid}
              >
                <div
                  className="hero-team-card-inner w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer pointer-events-auto border-2 border-[#93C5FD] shadow-[0_20px_45px_-10px_rgba(0,96,185,0.35)] group transition-shadow duration-300 relative"
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    const px = (e.clientX - r.left) / r.width - 0.5;
                    const py = (e.clientY - r.top) / r.height - 0.5;
                    gsap.to(e.currentTarget, {
                      rotateX: -py * 16,
                      rotateY: px * 16,
                      scale: 1.08,
                      duration: 0.3,
                      ease: 'power2.out',
                      transformPerspective: 700,
                      overwrite: 'auto'
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      rotateX: 0,
                      rotateY: 0,
                      scale: 1,
                      duration: 0.6,
                      ease: 'power2.out',
                      overwrite: 'auto'
                    });
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 left-2 right-2 text-[9px] font-mono font-bold text-white text-center py-1 px-1.5 rounded-lg bg-[#0B1F33]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 truncate">
                    {member.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= SECTION 2: INTERACTIVE TEAM GRID ================= */}
      <section ref={teamGridRef} className="team-section py-20 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-[#DBEAFE] text-[#1E40AF] border border-[#93C5FD] mb-4 shadow-sm">
              <Users className="w-3.5 h-3.5 text-[#1E40AF]" />
              THE CREW • TCET ACM LEADERSHIP
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#0B1F33] tracking-tight leading-[1.2] pb-1">
              Architects, mentors & the{' '}
              <span className="inline-block pb-1.5 pr-2 italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6]">
                technically brilliant.
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-sm sm:text-base text-[#1E40AF] max-w-sm font-medium">
              Every person here steers technical workshops, hackathons, and community development with direct hands-on execution.
            </p>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 bg-[#DBEAFE] p-1.5 rounded-full border border-[#93C5FD]">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-[#1D4ED8] text-[#EFF6FF] shadow-sm'
                    : 'text-[#1E40AF] hover:text-[#1E40AF]'
                }`}
              >
                All ({teamAssets.length})
              </button>
              <button
                onClick={() => setActiveFilter('faculty')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeFilter === 'faculty'
                    ? 'bg-[#1D4ED8] text-[#EFF6FF] shadow-sm'
                    : 'text-[#1E40AF] hover:text-[#1E40AF]'
                }`}
              >
                Faculty
              </button>
              <button
                onClick={() => setActiveFilter('student')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeFilter === 'student'
                    ? 'bg-[#1D4ED8] text-[#EFF6FF] shadow-sm'
                    : 'text-[#1E40AF] hover:text-[#1E40AF]'
                }`}
              >
                Officers
              </button>
            </div>
          </div>
        </div>

        {/* Hierarchical Team Directory matching tcetacm.org */}
        {activeFilter === 'faculty' ? (
          <div className="space-y-12">
            {/* Tier 1: Branch Counsellor & HOD */}
            {branchCounsellor && (
              <div className="max-w-xs sm:max-w-sm mx-auto">
                {renderCard(branchCounsellor)}
              </div>
            )}

            {/* Tier 2: Faculty Mentors (3 Mams) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {facultyMentors.map((member) => renderCard(member))}
            </div>
          </div>
        ) : activeFilter === 'student' ? (
          /* Tier 3: Student Core Committee Only */
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {studentOfficers.map((member) => renderCard(member))}
          </div>
        ) : (
          /* ALL Members in Authentic TCET ACM Hierarchy */
          <div className="space-y-16">
            {/* Tier 1: Branch Counsellor & HOD IT (Alone at the top center) */}
            {branchCounsellor && (
              <div>
                <div className="text-center mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-[#DBEAFE] text-[#1E40AF] border border-[#93C5FD]">
                    🏛️ BRANCH COUNSELLOR & HOD
                  </span>
                </div>
                <div className="max-w-xs sm:max-w-sm mx-auto">
                  {renderCard(branchCounsellor)}
                </div>
              </div>
            )}

            {/* Tier 2: Faculty Mentors (3 Mams) */}
            <div>
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-[#DBEAFE] text-[#1E40AF] border border-[#93C5FD]">
                  🎓 FACULTY MENTORS & IN-CHARGE
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto">
                {facultyMentors.map((member) => renderCard(member))}
              </div>
            </div>

            {/* Tier 3: Student Core Committee 2025–26 */}
            <div>
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-[#DBEAFE] text-[#1E40AF] border border-[#93C5FD] shadow-xs">
                  🚀 STUDENT CORE COMMITTEE 2025–26
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0B1F33] tracking-tight mt-2">
                  Student Leadership & Domain Directors
                </h3>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                {studentOfficers.map((member) => renderCard(member))}
              </div>
            </div>
          </div>
        )}

      </section>

      {/* ================= SECTION 3: ANIMATED STATS BLOCK ================= */}
      <section ref={statsRef} className="py-16 px-4 sm:px-8 max-w-7xl mx-auto relative z-10 mb-12">        <div className="team-stats-box rounded-[36px] bg-[#0B1F33] text-white p-8 sm:p-14 border border-[#3B82F6]/30 shadow-2xl relative overflow-hidden grid grid-cols-1 md:grid-cols-4 gap-8 items-end">
          
          {/* Left Title */}
          <div className="md:col-span-1 relative z-10">
            <span className="text-xs font-mono font-bold text-[#60B6FF] uppercase tracking-widest block mb-2">
              EXCELLENCE AT SCALE
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-[1.25] pb-1">
              12 leaders.<br />
              One{' '}
              <span className="inline-block pb-1 pr-1.5 italic text-transparent bg-clip-text bg-gradient-to-r from-[#60B6FF] to-[#FFD43B]">
                tight ship.
              </span>
            </h3>
          </div>

          {/* Stat 1 */}
          <div className="stat-block relative z-10">
            <div className="stat-number font-display font-black text-5xl sm:text-6xl text-white tracking-tight leading-none" data-count="10">
              <span>0</span><span className="text-[#FFD43B] text-3xl sm:text-4xl">+</span>
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#93C5FD] mt-3 pt-3 border-t border-white/15">
              Annual Tech Events
            </div>
          </div>

          {/* Stat 2 */}
          <div className="stat-block relative z-10">
            <div className="stat-number font-display font-black text-5xl sm:text-6xl text-white tracking-tight leading-none" data-count="250">
              <span>0</span><span className="text-[#34D399] text-3xl sm:text-4xl">+</span>
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#93C5FD] mt-3 pt-3 border-t border-white/15">
              Active Chapter Members
            </div>
          </div>

          {/* Stat 3 */}
          <div className="stat-block relative z-10">
            <div className="stat-number font-display font-black text-5xl sm:text-6xl text-white tracking-tight leading-none" data-count="100">
              <span>0</span><span className="text-[#60B6FF] text-3xl sm:text-4xl">%</span>
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#93C5FD] mt-3 pt-3 border-t border-white/15">
              Student-Driven Impact
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
