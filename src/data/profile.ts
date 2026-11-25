import type { AboutStoryData, ProfileData } from '../types/portfolio';

export const PROFILE_DATA: ProfileData = {
  name: 'Sharvi Aggarwal',
  shortMark: 'SA',
  role: 'ASPIRING AI/ML ENGINEER',
  location: 'New Delhi, India',
  openingGreeting: "Hello, I'm Sharvi Aggarwal. Welcome to my small world ♡",
  personalityIntro:
    'Curious engineer who loves building things, experimenting with AI and turning ideas into useful products.',
  resumeSummary:
    'Third-year B.Tech student (ECE, AI/ML minor, 9.44 CGPA) who likes taking AI out of the notebook and turning it into something people can actually use and trust. Strong in DSA and OOP, and I enjoy owning a project from data to API to dashboard.',
  portraitSrc: '/assets/profile/sharvi-portrait.jpg',
  portraitAlt: 'Sharvi Aggarwal portrait photograph',
  resumePdfSrc: '/assets/resume/Sharvi_Aggarwal_Resume.pdf',
  education: [
    {
      id: 'mait-btech',
      institution: 'Maharaja Agrasen Institute of Technology (MAIT)',
      location: 'Rohini, New Delhi',
      degree: 'B.Tech Electronics & Communication Engineering',
      minor: 'AI/ML minor',
      period: '2024–2028',
      cgpa: '9.44/10',
    },
  ],
};

export const ABOUT_STORY_DATA: AboutStoryData = {
  eyebrow: '02 — ABOUT ME',
  headline: 'From silicon logic to intelligent systems.',
  storyParagraphs: [
    'My journey started with Electronics and Communication Engineering. Working with FPGAs and Verilog made me curious about how technology works at a deeper level. Eventually, I developed an urge to explore Artificial Intelligence and Machine Learning.',
    'Today, I focus on taking AI out of the notebook and turning it into something people can actually use and trust—owning projects end to end from data and retrieval pipelines to FastAPI backends and interactive dashboards.',
  ],
  transitionLabel: 'HARDWARE → INTELLIGENCE → AI/ML',
  stages: [
    {
      id: 'hardware',
      stepNumber: '01',
      label: 'HARDWARE',
      title: 'ECE, FPGAs & Verilog',
      caption:
        'Started at the hardware layer—learning how digital logic, signals, and embedded protocols behave down to the gate level.',
      visualType: 'hardware',
    },
    {
      id: 'intelligence',
      stepNumber: '02',
      label: 'INTELLIGENCE',
      title: 'Systems & Deeper Curiosity',
      caption:
        'Curiosity about how technology works beneath the surface bridged low-level engineering with software architecture, DSA, and OOP.',
      visualType: 'bridge',
    },
    {
      id: 'aiml',
      stepNumber: '03',
      label: 'AI/ML',
      title: 'Applied AI, RAG & Agentic Systems',
      caption:
        'Building ML monitoring platforms, grounded RAG systems, video intelligence pipelines, and workflow automations.',
      visualType: 'aiml',
    },
  ],
  highlights: [
    { label: 'DEGREE', value: 'B.Tech ECE (AI/ML Minor)' },
    { label: 'CGPA', value: '9.44 / 10' },
    { label: 'INSTITUTION', value: 'MAIT, New Delhi (2024–2028)' },
  ],
};
