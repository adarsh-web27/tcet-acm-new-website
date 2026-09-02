import { Trophy, Sparkles, Zap, Star, Flame, Medal } from 'lucide-react';
import { achievementImages } from './images/achievements';

/**
 * Official TCET ACM SIGITE Achievements & Milestones
 * Extracted directly from official chapter portal (tcetacm.org)
 */

export const achievementsData = [
  {
    id: '01',
    year: '2025',
    category: 'Publication & Editorial Excellence',
    title: 'Third Place - Inter-Department Magazine Presentation',
    organization: 'TCET Inter-Department Magazine Committee',
    description: 'Secured third place in the Inter-Department Magazine Presentation for showcasing creativity, content quality, and effective presentation of ideas through the departmental e-magazine.',
    highlight: '3rd Place • Magazine Presentation • Creative Work',
    tags: ['Third Place', 'Magazine Presentation', 'Creative Work'],
    image: achievementImages.ezineWinners,
    icon: Trophy,
    badgeColor: 'text-amber-500',
  },
  {
    id: '02',
    year: '2025',
    category: 'National Chapter Recognition',
    title: 'Honourable Mention – Best Website Award (ACM India Council)',
    organization: 'ACM India Council',
    description: 'Recognized at the ACM India Council for excellence in web development during PixxelHack Webathon organized by TCET ACM, where a Kartavya student from IT secured first position.',
    highlight: 'Award Winning • ACM India Council Recognition',
    tags: ['Award Winning', 'ACM Recognition', 'Top Performer'],
    image: achievementImages.bestWebsiteAward,
    icon: Trophy,
    badgeColor: 'text-amber-500',
  },
  {
    id: '03',
    year: '2025',
    category: 'Innovation & Engineering',
    title: 'Second Place – Innov Genius 2025 (SE IT Department)',
    organization: 'SE IT Department Innovation Summit',
    description: 'Secured second position in Innov Genius for developing an innovative and impactful solution, demonstrating strong technical execution and problem-solving skills.',
    highlight: '2nd Place • Innovation & Technical Excellence',
    tags: ['Innovation', 'Technical Excellence', 'Competition'],
    image: achievementImages.innovgenius2nd,
    icon: Star,
    badgeColor: 'text-purple-500',
  },
  {
    id: '04',
    year: '2025',
    category: 'Technical Skills & Prototyping',
    title: 'Third Place – Innov Genius 2025 (SE IT Department)',
    organization: 'SE IT Department Innovation Summit',
    description: 'Secured third position in Innov Genius for presenting an innovative solution, showcasing strong technical skills, creativity, and effective problem-solving abilities.',
    highlight: '3rd Place • Creative Problem Solving',
    tags: ['Innovation', 'Technical Skills', 'Competition'],
    image: achievementImages.innovgenius3rd,
    icon: Star,
    badgeColor: 'text-purple-500',
  },
  {
    id: '05',
    year: '2025',
    category: 'Web3 & Blockchain Hackathon',
    title: 'Winner - Coherence - 2025 Blockchain Domain',
    organization: 'National Webathon Coherence Sprint',
    description: 'Rank 1 – PixxelHack Webathon. Awarded for UI/UX and Functional Prototype in decentralized blockchain architecture.',
    highlight: 'Rank 1 Winner • UI/UX & Functional Prototype',
    tags: ['Blockchain', 'Web Dev'],
    image: achievementImages.blockchainWinner,
    icon: Zap,
    badgeColor: 'text-[#1E40AF]',
  },
  {
    id: '06',
    year: '2025',
    category: 'Artificial Intelligence & Healthcare',
    title: 'Health-Guard AI : Predict Protect Prevent',
    organization: 'ACM Research Sprint',
    description: 'AI-based smart assistant created during ACM Research Sprint to forecast critical health metrics and deliver predictive diagnostic insights.',
    highlight: 'AI-Based Smart Diagnostic Assistant',
    tags: ['AI', 'Python'],
    image: achievementImages.healthguardAi,
    icon: Flame,
    badgeColor: 'text-rose-500',
  },
  {
    id: '07',
    year: '2025',
    category: 'National Mathematics Championship',
    title: 'Secured 19th rank in National Maths Olympiad',
    organization: 'National STEM Olympiad Board',
    description: 'National-level mathematics competition achievement demonstrating high-level analytical problem-solving and algorithmic computational speed.',
    highlight: '19th Rank Nationwide • Mathematics Excellence',
    tags: ['Problem Solving', 'Mathematics'],
    image: achievementImages.mathsOlympiad,
    icon: Medal,
    badgeColor: 'text-blue-500',
  },
  {
    id: '08',
    year: '2025',
    category: 'Flagship Webathon Champion',
    title: 'Winner of Pixxelhack Webathon',
    organization: 'TCET ACM Flagship Webathon',
    description: 'Pixxelhack Webathon organized by TCET ACM : Kartavya student of IT secured first position for intuitive thinking and web development.',
    highlight: '1st Position • Intuitive Thinking & Web Dev',
    tags: ['Intuitive Thinking', 'Web development'],
    image: achievementImages.pixxelhackWinner,
    icon: Zap,
    badgeColor: 'text-emerald-500',
  }
];

export const achievementsAssets = {
  achievementsData
};

export default achievementsAssets;
