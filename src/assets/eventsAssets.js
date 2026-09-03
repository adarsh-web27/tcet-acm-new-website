import { eventImages } from './images/events';

/**
 * Events Section Assets & Data — Official TCET ACM SIGITE Events
 * 
 * Sourced directly from tcet.acm.org
 */

export const clubEvents = [
  {
    id: "e-2026-pixxelhack-2",
    title: "PixxelHack Webathon 2.0",
    date: "2 Aug • 7 Aug 2026",
    location: "Online & TCET Campus",
    desc: "National-level platform for developers to build innovative full-stack solutions for real-world problems.",
    badge: "Hackathon",
    badgeTheme: { bg: "bg-[#1D4ED8]", text: "text-white", border: "border-blue-400/40" },
    hasReport: false,
    image: eventImages.pixxelhack2026
  },
  {
    id: "e-2026-local-iv",
    title: "Automation Expo 2026 IV",
    date: "25 July 2026",
    location: "NESCO Exhibition Center",
    desc: "Practical exposure to industrial automation, robotics, smart manufacturing, and Industry 4.0 systems.",
    badge: "Industrial Visit",
    badgeTheme: { bg: "bg-[#0E7490]", text: "text-white", border: "border-cyan-500/40" },
    hasReport: true,
    reportUrl: "https://drive.google.com/file/d/1Y4UEO5yekySd7cqj7YHJKHJ-4jbajO6h/view?usp=sharing",
    image: eventImages.localIv2026
  },
  {
    id: "e-2026-tree-plantation",
    title: "Tree Plantation Drive 2026",
    date: "24 July 2026",
    location: "Thakur Shyam Narayan Marg",
    desc: "Promoting sustainability and supporting the Ek Ped Maa Ke Naam community greening campaign.",
    badge: "Social Cause",
    badgeTheme: { bg: "bg-[#047857]", text: "text-white", border: "border-emerald-500/40" },
    hasReport: true,
    reportUrl: "https://drive.google.com/file/d/1A49xtgy8nTvzHeEvlam5q0vVF3qqn67j/view?usp=sharing",
    image: eventImages.treePlantation2026
  },
  {
    id: "e-2025-iic",
    title: "IIC — Institute Innovation Cell",
    date: "16 April 2026",
    location: "TCET Campus",
    desc: "Rapid prototyping, CAD design, MVP validation, and patent drafting under the Institute Innovation Cell.",
    badge: "Workshop",
    badgeTheme: { bg: "bg-[#FFD43B]", text: "text-[#0B1F33]", border: "border-[#F59E0B]/30" },
    hasReport: true,
    reportUrl: "https://drive.google.com/file/d/1xmfaMl78ljRj6xdHLPgPqMxnL1GSCYAa/view?usp=sharing",
    image: eventImages.iicWorkshop2026
  },
  {
    id: "e-2025-recode",
    title: "ACM ReCode: Redesign, Rebuild & Reimagine",
    date: "14-15 March • 3-4 April",
    location: "MPSTME, NMIMS Mumbai",
    desc: "National 3-round hackathon focused on redesigning existing applications using modern microservices.",
    badge: "Hackathon",
    badgeTheme: { bg: "bg-[#1D4ED8]", text: "text-white", border: "border-blue-400/40" },
    hasReport: false,
    image: eventImages.acmRecodeHackathon
  },
  {
    id: "e-2025-dsa",
    title: "Pre-Conference DSA Workshop",
    date: "10 to 12 March 2026",
    location: "TCET Campus",
    desc: "Comprehensive 3-day DSA masterclass on graph algorithms, dynamic programming, and interview problem solving.",
    badge: "Workshop",
    badgeTheme: { bg: "bg-[#FFD43B]", text: "text-[#0B1F33]", border: "border-[#F59E0B]/30" },
    hasReport: false,
    image: eventImages.preconferenceDsaWorkshop
  },
  {
    id: "e-2025-innovgenius",
    title: "INNOVGENIUS 2026 (with TCS)",
    date: "20 Feb 2026",
    location: "TCET Main Auditorium",
    desc: "National-level ideathon with Tata Consultancy Services (TCS) pitching breakthrough technological solutions.",
    badge: "Ideathon",
    badgeTheme: { bg: "bg-[#6D28D9]", text: "text-white", border: "border-purple-500/40" },
    hasReport: false,
    image: eventImages.innovgeniusIdeathon
  },
  {
    id: "e-2025-summit",
    title: "ACM National Summit 2025",
    date: "18-20 December 2025",
    location: "NMIMS, Indore",
    desc: "National conference connecting student developers, research fellows, and industry executives.",
    badge: "Summit",
    badgeTheme: { bg: "bg-[#BE123C]", text: "text-white", border: "border-rose-500/40" },
    hasReport: false,
    image: eventImages.acmSummitIndore
  },
  {
    id: "e-2025-zephyr",
    title: "Zephyr 2025 Techno Fest",
    date: "25-27 September 2025",
    location: "TCET Campus Grounds",
    desc: "Annual 3-day flagship festival blending coding showdowns, robotics, console leagues, and live stage shows.",
    badge: "Fest",
    badgeTheme: { bg: "bg-[#BE185D]", text: "text-white", border: "border-pink-500/40" },
    hasReport: false,
    image: eventImages.zephyrFest
  }
];

export const eventsAssets = {
  clubEvents
};
