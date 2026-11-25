import type { ExperienceEntry } from '../types/portfolio';

/**
 * Experience, Leadership, Programs & Achievements.
 * Add new internships, leadership positions, or awards here and they will
 * render automatically on the Experience timeline with matching animations.
 */
export const EXPERIENCE_DATA: ExperienceEntry[] = [
  {
    id: 'drdo',
    index: '01',
    organization: 'DRDO',
    role: 'Research Intern',
    period: 'Summer 2026',
    category: 'Internship',
    summary: 'Worked on SPI Protocol implementation.',
    details: [
      'Research internship focusing on Serial Peripheral Interface (SPI) protocol implementation, bridging core Electronics & Communication Engineering foundations with practical hardware-level systems.',
    ],
    accent: 'sky',
  },
  {
    id: 'aws-student-builder-group',
    index: '02',
    organization: 'AWS Student Builder Group',
    role: 'Vice Chairperson',
    period: 'Leadership',
    category: 'Leadership',
    summary:
      'Manage a community of 200 people. Responsible for official events and speaker sessions.',
    details: [
      'Co-led the technical student community of 200 members.',
      'Responsible for organizing official events, speaker sessions, content, and student outreach.',
    ],
    accent: 'lime',
  },
  {
    id: 'samsung-sic',
    index: '03',
    organization: 'Samsung Student Innovation Campus',
    role: 'Selected Participant',
    period: 'AI/ML Program',
    category: 'Program',
    summary: 'Samsung-backed AI-focused program. Received classes in AI/ML.',
    details: [
      'Selected participant in Samsung’s AI-focused innovation program with structured coursework and classes in Artificial Intelligence and Machine Learning.',
    ],
    accent: 'maroon',
  },
  {
    id: 'mckinsey-forward',
    index: '04',
    organization: 'McKinsey Forward Program',
    role: 'Participant',
    period: 'Professional Development',
    category: 'Program',
    summary:
      'Completed learning modules on problem solving, communication and professional skills.',
    details: [
      'Completed structured modules focused on structured problem solving, clear communication, and professional leadership skills.',
    ],
    accent: 'ink',
  },
  {
    id: 'sih-2026',
    index: '05',
    organization: 'Smart India Hackathon 2026',
    role: 'Internal Round Qualifier',
    period: '2026',
    category: 'Achievement',
    summary: 'Cleared the internal round.',
    details: [
      'Qualified through the Smart India Hackathon (SIH) 2026 internal selection round.',
    ],
    accent: 'lime',
  },
];
