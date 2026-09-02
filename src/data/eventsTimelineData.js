import { eventImages } from '../assets/images/events';

/**
 * Official Events Dataset for TCET ACM SIGITE Website
 * Sourced directly from tcet.acm.org
 */

export const EVENTS = [
  {
    year: '2026-27',
    events: [
      {
        id: 'e-2026-pixxelhack-2',
        title: 'PixxelHack Webathon 2.0',
        subtitle: 'National-Level 48-Hour Web Development Showdown',
        date: '2nd August (Round 1) • 7th August (Round 2) 2026',
        location: 'Online & TCET Campus',
        category: 'Hackathon',
        speaker: 'TCET ACM Technical Core',
        layout: 'full-hero',
        image: eventImages.pixxelhack2026,
        stats: [
          { label: 'Rounds', value: '2 Rounds' },
          { label: 'Hackers', value: '400+' },
          { label: 'Scope', value: 'National' }
        ],
        desc: 'PixxelHack Webathon 2.0 provides a national-level platform for students and developers to showcase creativity, technical expertise, and full-stack engineering skills by building innovative solutions for real-world problems.'
      },
      {
        id: 'e-2026-alumni',
        title: 'Alumni Interaction 2026',
        subtitle: 'Knowledge Sharing, Networking & Industry Mentorship',
        date: '31 July 2026',
        location: 'Study Skill Center TIMSR',
        category: 'Alumni Network',
        speaker: 'Distinguished TCET Alumni',
        layout: 'image-left',
        image: eventImages.alumniInteraction2026,
        stats: [
          { label: 'Speakers', value: 'Alumni Leaders' },
          { label: 'Attendees', value: '150+' },
          { label: 'Focus', value: 'Placements & MS' }
        ],
        desc: 'A platform for knowledge sharing, networking, and mentorship between alumni and current students, strengthening institutional bonds and career development.',
        reportUrl: 'https://drive.google.com/file/d/1cssmXgZx2Fa5XZP_vS7sJG43mNi5xYSO/view?usp=sharing'
      },
      {
        id: 'e-2026-local-iv',
        title: 'Local Industrial Visit 2026',
        subtitle: 'Automation Expo 2026 • Robotics & Industry 4.0',
        date: '25 July 2026',
        location: 'NESCO Exhibition Center, Mumbai',
        category: 'Industrial Visit',
        speaker: 'Industrial Automation Leaders',
        layout: 'image-right',
        image: eventImages.localIv2026,
        stats: [
          { label: 'Exhibits', value: '250+' },
          { label: 'Students', value: '120+' },
          { label: 'Domain', value: 'Industry 4.0' }
        ],
        desc: 'Provides students with practical exposure to industrial automation, robotics, smart manufacturing, and IoT control systems through live industry demonstrations.',
        reportUrl: 'https://drive.google.com/file/d/1Y4UEO5yekySd7cqj7YHJKHJ-4jbajO6h/view?usp=sharing'
      },
      {
        id: 'e-2026-tree-plantation',
        title: 'Tree Plantation Drive 2026',
        subtitle: 'Supporting the "Ek Ped Maa Ke Naam" Sustainability Campaign',
        date: '24 July 2026',
        location: 'Thakur Shyam Narayan Marg Junction, Mumbai',
        category: 'Social Cause',
        speaker: 'TCET Environmental Cell',
        layout: 'image-left',
        image: eventImages.treePlantation2026,
        stats: [
          { label: 'Saplings Planted', value: '100+' },
          { label: 'Volunteers', value: '60+' },
          { label: 'Impact', value: 'Road Dividers' }
        ],
        desc: 'Promoting environmental awareness, ecological sustainability, and teamwork among engineering students through active community greening drives.',
        reportUrl: 'https://drive.google.com/file/d/1A49xtgy8nTvzHeEvlam5q0vVF3qqn67j/view?usp=sharing'
      },
      {
        id: 'e-2026-membership-drive',
        title: 'Membership Drive 2026-2027',
        subtitle: 'Welcoming the Next Generation of ACM Computing Scholars',
        date: '11 July 2026',
        location: 'TCET Campus',
        category: 'Orientation',
        speaker: 'TCET ACM Core Committee',
        layout: 'full-hero',
        image: eventImages.membershipDrive2026,
        stats: [
          { label: 'New Members', value: '200+' },
          { label: 'Tracks', value: '4 Domains' },
          { label: 'Benefits', value: 'ACM Global' }
        ],
        desc: 'Annual drive expanding chapter membership, providing incoming students access to international ACM digital libraries, research groups, and technical hackathons.'
      }
    ]
  },

  {
    year: '2025-26',
    events: [
      {
        id: 'e-2025-iic',
        title: 'IIC — Institute Innovation Cell Workshop',
        subtitle: 'Prototype Development & Iterative Design Frameworks',
        date: '16th April 2026',
        location: 'TCET Campus',
        category: 'Workshop',
        speaker: 'Dr. Rajesh Bansode & IIC Mentors',
        layout: 'image-right',
        image: eventImages.iicWorkshop2026,
        stats: [
          { label: 'Prototypes', value: '35+' },
          { label: 'Participants', value: '180+' }
        ],
        desc: 'Students were introduced to core principles of rapid prototyping, CAD design, MVP development, and patent drafting under the Institute Innovation Cell.',
        reportUrl: 'https://drive.google.com/file/d/1xmfaMl78ljRj6xdHLPgPqMxnL1GSCYAa/view?usp=sharing'
      },
      {
        id: 'e-2025-tree-park',
        title: 'Tree Plantation Drive — EcoInitiative',
        subtitle: 'Promoting Greenery & Climate Balance at Dream Park',
        date: '18th April 2026',
        location: 'Dream Park, Kandivali(E)',
        category: 'Social Cause',
        speaker: 'TCET ACM Outreach Team',
        layout: 'image-left',
        image: eventImages.treePlantationDreamPark,
        stats: [
          { label: 'Saplings Planted', value: '150+' },
          { label: 'Volunteers', value: '90+' }
        ],
        desc: 'Organized to foster ecological responsibility and community sustainability. Students actively planted native saplings and learned about biodiversity.'
      },
      {
        id: 'e-2025-recode',
        title: 'ACM ReCode: Redesign, Rebuild & Reimagine',
        subtitle: 'National 3-Round UI/UX & Microservices Hackathon',
        date: '14–15 March (Online) • 3–4 April (Offline)',
        location: 'MPSTME, NMIMS Mumbai',
        category: 'Hackathon',
        speaker: 'Vercel & Industry Evaluators',
        layout: 'full-hero',
        image: eventImages.acmRecodeHackathon,
        stats: [
          { label: 'Prize Pool', value: '₹70K+' },
          { label: 'Hackers', value: '450+' },
          { label: 'Duration', value: '18 Hr Build' }
        ],
        desc: 'A 3-round national hackathon focused on redesigning existing applications using modern design thinking, full-stack microservices, and live jury evaluations.'
      },
      {
        id: 'e-2025-dsa',
        title: 'Pre-Conference Workshop 2025-26',
        subtitle: '3-Day Intensive Data Structures & Algorithms Masterclass',
        date: '10 to 12 March 2026',
        location: 'TCET Campus',
        category: 'Workshop',
        speaker: 'TCET ACM Technical Core',
        layout: 'image-left',
        image: eventImages.preconferenceDsaWorkshop,
        stats: [
          { label: 'Duration', value: '3 Days' },
          { label: 'Problems Solved', value: '500+' }
        ],
        desc: 'Comprehensive DSA training enabling students to master algorithmic problem-solving, graph algorithms, dynamic programming, and technical interview readiness.'
      },
      {
        id: 'e-2025-innovgenius',
        title: 'INNOVGENIUS 2026 – National Level Ideathon',
        subtitle: 'Organized in Collaboration with Tata Consultancy Services (TCS)',
        date: '20 February 2026',
        location: 'TCET Main Auditorium',
        category: 'Ideathon',
        speaker: 'TCS Industry Evaluators & Mentors',
        layout: 'full-hero',
        image: eventImages.innovgeniusIdeathon,
        stats: [
          { label: 'Teams', value: '120+' },
          { label: 'Duration', value: '10 Hours' },
          { label: 'Mentors', value: '12 TCS Experts' }
        ],
        desc: 'Flagship national ideathon where participants pitched tech solutions to real-world industrial problem statements before senior TCS evaluators.'
      },
      {
        id: 'e-2025-ar-vr',
        title: 'AR/VR Hands-on Workshop 2025-26',
        subtitle: 'Augmented & Virtual Reality Immersive Systems',
        date: '6 February 2026',
        location: 'TCET Campus, Kandivali East',
        category: 'Industrial Visit',
        speaker: 'XR Specialization Lab',
        layout: 'image-right',
        image: eventImages.arVrWorkshop,
        stats: [
          { label: 'Hardware', value: 'Meta Quest & VisionOS' },
          { label: 'Students', value: '140+' }
        ],
        desc: 'Interactive hands-on session exploring spatial computing, 3D modeling pipelines, and immersive virtual reality simulation engines.'
      },
      {
        id: 'e-2025-summit',
        title: 'ACM National Summit 2025',
        subtitle: 'National Leadership, Research & Innovation Conference',
        date: '18-20 December 2025',
        location: 'NMIMS, Indore',
        category: 'Summit',
        speaker: 'ACM India Council Leaders',
        layout: 'full-hero',
        image: eventImages.acmSummitIndore,
        stats: [
          { label: 'Chapters', value: '150+' },
          { label: 'Duration', value: '3 Days' }
        ],
        desc: 'Connecting students, research scholars, and industry executives for keynotes, panel debates, and networking across emerging computing disciplines.'
      },
      {
        id: 'e-2025-cyber-safety',
        title: 'Social Cause — Cyber Safety Awareness Drive',
        subtitle: 'Empowering Local Communities in Digital Privacy & Safety',
        date: '29 October 2025',
        location: 'Navayan Buddha Vihar',
        category: 'Social Cause',
        speaker: 'TCET ACM Cyber Cell',
        layout: 'image-left',
        image: eventImages.cyberSafetyDrive,
        stats: [
          { label: 'Outreach', value: '500+ People' },
          { label: 'Volunteers', value: '45' }
        ],
        desc: 'Educating citizens regarding online phishing scams, mobile security hygiene, password management, and safe digital financial transactions.',
        reportUrl: 'https://drive.google.com/file/d/1Xc8EdaZV33WYSWpnJ-53Me6bObYDEceN/view?usp=sharing'
      },
      {
        id: 'e-2025-ezine',
        title: 'ACM E-Magazine (Ezine)',
        subtitle: 'Annual Student Research Publication & Technical Journal',
        date: '20 October 2025',
        location: 'Online',
        category: 'Publication',
        speaker: 'ACM Editorial Board',
        layout: 'image-right',
        image: eventImages.eMagazine,
        stats: [
          { label: 'Papers Published', value: '30+' },
          { label: 'Readership', value: '5,000+' }
        ],
        desc: 'Featuring peer-reviewed student research papers, technical thought pieces, faculty mentorship insights, and annual chapter milestones.'
      },
      {
        id: 'e-2025-zephyr',
        title: 'Zephyr — 3 Day Techno-Cultural Fest',
        subtitle: 'Blending Hackathons, Esports, Robotics & Stage Shows',
        date: '25–27 September 2025',
        location: 'TCET Campus',
        category: 'Fest',
        speaker: 'TCET ACM Organizing Committee',
        layout: 'full-hero',
        image: eventImages.zephyrFest,
        stats: [
          { label: 'Footfall', value: '2,500+' },
          { label: 'Events', value: '18 Showdowns' }
        ],
        desc: 'Vibrant three-day celebration featuring coding hackathons, robotics challenges, gaming tournaments, project showcases, and cultural nights.'
      },
      {
        id: 'e-2025-idea-impact',
        title: 'Seminar on Idea to Impact',
        subtitle: 'From Classroom Code to Commercial Tech Startups',
        date: '19 September 2025',
        location: 'TCET Campus',
        category: 'Ideation',
        speaker: 'Startup Incubator Mentors',
        layout: 'image-left',
        image: eventImages.ideaToImpact,
        stats: [
          { label: 'Startups Mentored', value: '15 Teams' },
          { label: 'Attendees', value: '220+' }
        ],
        desc: 'Mentorship session on transforming student research into viable ventures, covering MVP building, validation, and pitch strategies.',
        reportUrl: 'https://drive.google.com/file/d/1xmfaMl78ljRj6xdHLPgPqMxnL1GSCYAa/view?usp=sharing'
      },
      {
        id: 'e-2025-automation-expo',
        title: 'Automation Expo 2025 — Industrial Visit',
        subtitle: 'Industrial Robotics, PLC & Automated Sensor Grids',
        date: '13–14 August 2025',
        location: 'Nesco Exhibition Complex, Goregaon',
        category: 'Industrial Visit',
        speaker: 'Industrial Automation Engineers',
        layout: 'image-right',
        image: eventImages.automationExpoNesco,
        stats: [
          { label: 'Students', value: '120+' },
          { label: 'Live Systems', value: '180 Exhibits' }
        ],
        desc: 'Students toured international automation pavilions, observing robotic arms, IoT assembly workflows, and smart manufacturing architectures.',
        reportUrl: 'https://drive.google.com/file/d/1EBPWrsQNCj_nX0QrbQei7UZr-PLPHKWv/view?usp=sharing'
      },
      {
        id: 'e-2025-pixxelhack-1',
        title: 'PixxelHack Webathon 1.0',
        subtitle: '48-Hour Continuous High-Intensity Full-Stack Sprint',
        date: '8 August 2025',
        location: 'Online',
        category: 'Hackathon',
        speaker: 'TCET ACM Web Team',
        layout: 'full-hero',
        image: eventImages.pixxelhackWebathon2025,
        stats: [
          { label: 'Duration', value: '48 Hours' },
          { label: 'Apps Deployed', value: '60+' }
        ],
        desc: 'Rapid webathon testing participants in rapid UI development, distributed REST API backends, and live production deployments.',
        reportUrl: 'https://drive.google.com/file/d/1G_N5ys6riXIvhoqzHuTcHZiXuhOUvY_m/view?usp=sharing'
      }
    ]
  },

  {
    year: '2024-25',
    events: [
      {
        id: 'e-2024-genai',
        title: 'Generative AI & Quantum Computing Seminar',
        subtitle: 'Transformers, Quantum Logic Gates & Neural Architectures',
        date: '17 July 2024',
        location: 'TCET Seminar Hall-3',
        category: 'Seminar',
        speaker: 'Quantum & AI Researchers',
        layout: 'image-left',
        image: eventImages.genaiQuantumSeminar,
        stats: [
          { label: 'Attendees', value: '250+' },
          { label: 'Domain', value: 'GenAI & Quantum' }
        ],
        desc: 'In-depth seminar exploring Large Language Models, generative image synthesis, and quantum computing foundations.',
        reportUrl: 'https://drive.google.com/file/d/1e5jipR28WAq7rMC4CkC9GeTvywQcSQxe/view?usp=sharing'
      },
      {
        id: 'e-2024-membership',
        title: 'ACM Chapter Membership Drive 2024',
        subtitle: 'Empowering Student Innovators Across Departmental Domains',
        date: '16 July 2024',
        location: 'TCET Seminar Hall-3',
        category: 'Orientation',
        speaker: 'TCET IT Alumni & Core',
        layout: 'image-right',
        image: eventImages.membershipDrive2024,
        stats: [
          { label: 'Members Enrolled', value: '180+' },
          { label: 'Chapters', value: 'TCET ACM' }
        ],
        desc: 'Interactive induction session guiding second and third-year engineering students into ACM technical domains.'
      }
    ]
  }
];
