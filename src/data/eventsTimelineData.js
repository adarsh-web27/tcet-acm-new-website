import { eventImages } from '../assets/images/events';

/**
 * Official Events Dataset for TCET ACM SIGITE Website
 * Sourced directly from tcet.acm.org
 * Covering all academic chapters: 2026-27, 2025-26, 2024-25, and 2023-24
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
        title: 'IIC — Institute Innovation Cell',
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
        id: 'e-2025-local-iv',
        title: 'Local Industrial Visit 2025–26',
        subtitle: 'Hands-on Exposure to Emerging IT & Production Infrastructures',
        date: '6 February 2026',
        location: 'TCET Campus, Kandivali East, Mumbai',
        category: 'Industrial Visit',
        speaker: 'Industry Tech Leads & Faculty Mentors',
        layout: 'image-right',
        image: eventImages.localIv2025,
        stats: [
          { label: 'Students', value: '130+' },
          { label: 'Focus', value: 'Industrial Systems' }
        ],
        desc: 'Industrial visit exposing engineering scholars to real-world software development lifecycle, enterprise server infrastructure, and deployment architecture.'
      },
      {
        id: 'e-2025-ar-vr',
        title: 'AR/VR Hands-on Workshop 2025-26',
        subtitle: 'Augmented & Virtual Reality Immersive Systems',
        date: '6 February 2026',
        location: 'TCET Campus, Kandivali East',
        category: 'Workshop',
        speaker: 'XR Specialization Lab',
        layout: 'image-left',
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
        title: 'Zephyr — 3 Day Fest',
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
      },
      {
        id: 'e-2025-genai',
        title: 'Generative AI & Quantum Computing Seminar',
        subtitle: 'Transformers, Quantum Logic Gates & Neural Architectures',
        date: '17 July 2025',
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
        id: 'e-2025-alumni',
        title: 'Alumni Interaction 2025',
        subtitle: 'Interactive Career Mentorship & Tech Placement Guidance',
        date: '16 July 2025',
        location: 'TCET Seminar Hall-3',
        category: 'Alumni Network',
        speaker: 'Senior TCET Alumni Leaders',
        layout: 'image-right',
        image: eventImages.alumniInteraction2025,
        stats: [
          { label: 'Attendees', value: '180+' },
          { label: 'Focus', value: 'Career & Placements' }
        ],
        desc: 'Distinguished TCET alumni engaged with engineering students, sharing insights into industry standards, technical interviews, and competitive career roadmaps.'
      },
      {
        id: 'e-2025-membership',
        title: 'Membership Drive 2025–26',
        subtitle: 'Campus-Wide Induction into ACM Professional Opportunities',
        date: '7 September 2025',
        location: 'TCET Campus',
        category: 'Orientation',
        speaker: 'TCET ACM Core Committee',
        layout: 'full-hero',
        image: eventImages.membershipDrive2024,
        stats: [
          { label: 'Enrolled', value: '220+' },
          { label: 'Duration', value: '3 Days' }
        ],
        desc: 'Annual chapter enrollment initiative introducing incoming engineering cohorts to ACM publications, hackathons, and international networking.'
      },
      {
        id: 'e-2025-recruitment',
        title: 'Recruitment Process 2025–26',
        subtitle: 'Structured Multi-Round Technical & Core Committee Selection',
        date: '29 May 2025',
        location: 'TCET Campus',
        category: 'Recruitment',
        speaker: 'Faculty Mentors & Executive Core',
        layout: 'image-left',
        image: eventImages.recruitment2025,
        stats: [
          { label: 'Applicants', value: '300+' },
          { label: 'Domains', value: '6 Committees' }
        ],
        desc: 'Comprehensive multi-stage recruitment process selecting passionate student developers, designers, and organizers for the TCET ACM SIGITE leadership team.'
      }
    ]
  },
  {
    year: '2024-25',
    events: [
      {
        id: 'e-2024-meeting',
        title: 'Core Committee Meeting',
        subtitle: 'Annual Chapter Roadmap Planning & Strategic Operations',
        date: '06 July 2024',
        location: 'TCET Campus',
        category: 'Meeting',
        speaker: 'Faculty Counsellors & Core Team',
        layout: 'image-left',
        image: eventImages.coreCommitteeMeeting2024,
        stats: [
          { label: 'Focus', value: 'Annual Strategy' },
          { label: 'Attendees', value: 'Executive Board' }
        ],
        desc: 'Comprehensive annual strategy briefing aligning faculty advisors, domain heads, and student coordinators on calendar milestones and hackathon initiatives.'
      },
      {
        id: 'e-2024-incubation',
        title: 'Incubation Seminar',
        subtitle: 'Entrepreneurship, Product Incubators & Seed Funding',
        date: '26 July 2024',
        location: 'TCET Seminar Hall',
        category: 'Ideation',
        speaker: 'Startup Ecosystem Leaders',
        layout: 'image-right',
        image: eventImages.incubationSeminar2024,
        stats: [
          { label: 'Startups Mentored', value: '20+ Teams' },
          { label: 'Attendees', value: '160+' }
        ],
        desc: 'Focused seminar detailing startup incubation frameworks, intellectual property protection, proof-of-concept testing, and institutional seed grant procedures.'
      },
      {
        id: 'e-2024-edu-drive',
        title: 'Educational Drive',
        subtitle: 'Digital Literacy & Computer Science Community Outreach',
        date: '16 August 2024',
        location: 'STS School',
        category: 'Social Cause',
        speaker: 'TCET ACM Volunteers',
        layout: 'image-left',
        image: eventImages.educationalDrive2024,
        stats: [
          { label: 'Students Reached', value: '200+' },
          { label: 'Volunteers', value: '30+' }
        ],
        desc: 'Social responsibility outreach introducing underprivileged schoolchildren to fundamental computing skills, digital safety, and logic building exercises.'
      },
      {
        id: 'e-2024-devops',
        title: 'Platform Engineering in DevOps',
        subtitle: 'Container Orchestration, CI/CD Pipelines & Cloud Scalability',
        date: '29 January 2025',
        location: 'TCET Computing Laboratories',
        category: 'Workshop',
        speaker: 'DevOps & Cloud Engineers',
        layout: 'full-hero',
        image: eventImages.devopsWorkshop2025,
        stats: [
          { label: 'Tools', value: 'Docker & Kubernetes' },
          { label: 'Participants', value: '140+' }
        ],
        desc: 'Technical deep-dive on modern DevOps workflows, infrastructure as code, automated testing pipelines, and Kubernetes container management.'
      },
      {
        id: 'e-2024-alumni',
        title: 'Alumni Interaction 2025',
        subtitle: 'Corporate Placement Insights & Higher Education Guidance',
        date: '5 February 2025',
        location: 'TCET Campus',
        category: 'Alumni Network',
        speaker: 'Senior Industry Alumni',
        layout: 'image-right',
        image: eventImages.alumniInteractionFeb2025,
        stats: [
          { label: 'Attendees', value: '150+' },
          { label: 'Domain', value: 'Placements & GRE' }
        ],
        desc: 'Interactive mentoring forum connecting students directly with corporate alumni working at Tier-1 software companies and international universities.'
      },
      {
        id: 'e-2024-ngo',
        title: 'NGO Drive — Community Outreach',
        subtitle: 'Student Mentorship & Humanitarian Community Welfare',
        date: '26 March 2025',
        location: 'Caring Hands NGO',
        category: 'Social Cause',
        speaker: 'TCET ACM Social Committee',
        layout: 'image-left',
        image: eventImages.ngoDrive2025,
        stats: [
          { label: 'Beneficiaries', value: '120+' },
          { label: 'Volunteers', value: '35' }
        ],
        desc: 'Voluntary social welfare drive in partnership with Caring Hands NGO, promoting educational empowerment and community care.'
      }
    ]
  },
  {
    year: '2023-24',
    events: [
      {
        id: 'e-2023-ar-vr',
        title: 'AR & VR Exposure Program',
        subtitle: 'Hands-on Spatial Computing & Immersive Lab Tour',
        date: '4 August 2023',
        location: 'TIAT Lab, TCET',
        category: 'Workshop',
        speaker: 'AR/VR Research Specialists',
        layout: 'image-left',
        image: eventImages.arVrExposure2023,
        stats: [
          { label: 'Tech Stack', value: 'Unity 3D & VR' },
          { label: 'Attendees', value: '120+' }
        ],
        desc: 'Specialized lab immersion workshop demonstrating augmented reality overlay software, 3D spatial mapping, and virtual simulation hardware.'
      },
      {
        id: 'e-2023-prototype',
        title: 'Prototype Design Workshop',
        subtitle: 'Design Thinking, User Experience & Wireframe Validation',
        date: '11 August 2023',
        location: 'Online',
        category: 'Workshop',
        speaker: 'Product Design Mentors',
        layout: 'image-right',
        image: eventImages.prototypeDesign2023,
        stats: [
          { label: 'Prototypes Built', value: '45+' },
          { label: 'Duration', value: 'Full Day' }
        ],
        desc: 'Hands-on masterclass guiding engineering undergraduates through rapid user journey mapping, interactive UI prototyping, and usability testing.'
      },
      {
        id: 'e-2023-local-iv',
        title: 'Local Industrial Visit 2023',
        subtitle: 'Industrial Automation & Manufacturing Field Studies',
        date: '9 September 2023',
        location: 'Andheri & Vasai Industrial Parks',
        category: 'Industrial Visit',
        speaker: 'Manufacturing Plant Heads',
        layout: 'image-left',
        image: eventImages.localIv2023,
        stats: [
          { label: 'Facilities Visited', value: '2 Plants' },
          { label: 'Students', value: '100+' }
        ],
        desc: 'Industrial study tour observing real-time production lines, industrial programmable logic controllers (PLCs), and assembly automation systems.'
      },
      {
        id: 'e-2023-idea',
        title: 'Idea Presentation',
        subtitle: 'Platform for Pitching Innovative Technological Solutions',
        date: '8 September 2023',
        location: 'Seminar Hall, TCET',
        category: 'Ideation',
        speaker: 'Department Review Panel',
        layout: 'image-right',
        image: eventImages.ideaPresentation2023,
        stats: [
          { label: 'Teams Pitched', value: '35 Teams' },
          { label: 'Awards', value: 'Best Concept' }
        ],
        desc: 'Competitive technical pitching symposium where student teams presented novel engineering concepts to expert faculty evaluators.'
      },
      {
        id: 'e-2023-toi',
        title: 'Times of India Visit',
        subtitle: 'Media Printing Technologies & Industrial Publishing Workflows',
        date: '15–16 April 2024',
        location: 'Times of India Press, Kandivali',
        category: 'Industrial Visit',
        speaker: 'Press Operations Engineers',
        layout: 'full-hero',
        image: eventImages.timesOfIndia2024,
        stats: [
          { label: 'Print Runs', value: 'High Speed' },
          { label: 'Students', value: '110+' }
        ],
        desc: 'Educational tour exploring automated high-volume press printing workflows, optical character recognition pipelines, and automated distribution grids.'
      },
      {
        id: 'e-2023-genai',
        title: 'Generative AI Seminar',
        subtitle: 'Intro to Large Language Models, Prompting & Neural Workflows',
        date: '27 January 2024',
        location: 'Online',
        category: 'Seminar',
        speaker: 'AI Research Practitioners',
        layout: 'image-left',
        image: eventImages.genaiSeminar2024,
        stats: [
          { label: 'Participants', value: '280+' },
          { label: 'Scope', value: 'LLMs & Diffusion' }
        ],
        desc: 'Introductory seminar covering Transformer architectures, self-attention mechanisms, prompt engineering fundamentals, and practical AI integrations.'
      }
    ]
  }
];
