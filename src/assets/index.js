/**
 * Central Assets Index
 * 
 * Re-exports dedicated, modular asset configurations for each section:
 * - logoAssets: Logos & Branding
 * - heroAssets / homeAssets: Hero showcase & responsive images
 * - teamAssets: Core leadership & Faculty counsellor photos
 * - eventsAssets / clubEvents: Event card images & details
 * - galleryAssets / MEMORY_CARDS: 3D Spatial Gallery cards
 * - achievementsAssets / achievementsData: Awards & recognitions
 * - whoWeAreAssets: Perspectives & mentor quotes
 */

export * from './logoAssets';
export * from './heroAssets';
export * from './teamAssets';
export * from './eventsAssets';
export * from './galleryAssets';
export * from './achievementsAssets';
export * from './whoWeAreAssets';

export const officialProjects = [
  {
    id: "p1",
    title: "TCET ACM Official Portal & Spatial Hub",
    category: "Web & Spatial Computing",
    desc: "The next-generation official web application for TCET ACM SIGITE featuring 3D memory clouds, GSAP scroll engines, and real-time event portals.",
    badge: "FLAGSHIP PORTAL",
    link: "https://tcet.acm.org"
  },
  {
    id: "p2",
    title: "Health-Guard AI — Predict Protect Prevent",
    category: "Artificial Intelligence",
    desc: "An intelligent healthcare prediction engine leveraging machine learning to analyze patient vitals and forecast disease risks in real-time.",
    badge: "AWARD WINNER",
    link: "https://tcet.acm.org/achievements"
  },
  {
    id: "p3",
    title: "Coherence 2025 — Blockchain Decentralized Vault",
    category: "Web3 & Blockchain",
    desc: "Winner of Coherence 2025 Blockchain domain. A zero-knowledge decentralized file vault built on Polygon EVM.",
    badge: "1ST PLACE WINNER",
    link: "https://tcet.acm.org/achievements"
  },
  {
    id: "p4",
    title: "PixxelHack Webathon App Engine",
    category: "Full Stack Development",
    desc: "A rapid deployment platform and submission portal engineered for high-concurrency 48-hour hackathon judging.",
    badge: "WEBATHON WINNER",
    link: "https://tcet.acm.org/events"
  }
];
