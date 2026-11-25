export type AccentTheme = 'lime' | 'sky' | 'maroon' | 'ink' | 'paper';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  isRoute?: boolean;
}

export interface EducationEntry {
  id: string;
  institution: string;
  location: string;
  degree: string;
  minor?: string;
  period: string;
  cgpa: string;
  description?: string;
  milestones?: string[];
  published?: boolean;
}

export interface ProfileData {
  name: string;
  shortMark: string;
  role: string;
  location: string;
  openingGreeting: string;
  personalityIntro: string;
  resumeSummary: string;
  portraitSrc: string;
  portraitAlt: string;
  resumePdfSrc: string;
  education: EducationEntry[];
}

export interface AboutStage {
  id: string;
  stepNumber: string;
  label: string;
  title: string;
  caption: string;
  visualType: 'hardware' | 'bridge' | 'aiml';
}

export interface AboutStoryData {
  eyebrow: string;
  headline: string;
  storyParagraphs: string[];
  transitionLabel: string;
  stages: AboutStage[];
  highlights: { label: string; value: string }[];
}

export interface TechItem {
  id: string;
  name: string;
  iconKey: string;
  categoryId: string;
  /** IDs of projects from projects.ts where this technology is established */
  projectIds?: string[];
  /** True for tools used across general engineering rather than tied to a single project */
  isSharedToolkit?: boolean;
  published?: boolean;
}

export interface TechCategory {
  id: string;
  number: string;
  title: string;
  accent: AccentTheme;
  description: string;
}

export interface ProjectScreenshot {
  id: string;
  src: string;
  alt: string;
  caption: string;
  tag: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  note?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  kind: 'live' | 'github' | 'docs';
}

export interface ProjectCaseStudy {
  bigIdea: string;
  problem: string;
  engineeringApproach: string[];
  architectureSummary: string;
  workflowSteps: { step: string; title: string; detail: string }[];
  resultsAndLearnings: string[];
}

export interface ProjectData {
  id: string;
  slug: string;
  order: number;
  kind: 'flagship' | 'major' | 'compact';
  categoryLabel: string;
  title: string;
  subtitle: string;
  tagline?: string;
  summary: string;
  detailedDescription?: string;
  stack: string[];
  features: string[];
  coverImage?: string;
  projectDate?: string;
  featured?: boolean;
  published?: boolean;
  metrics?: ProjectMetric[];
  findings?: string[];
  distinctionNote?: string;
  screenshots: ProjectScreenshot[];
  links: ProjectLink[];
  accentTheme: AccentTheme;
  architectureDiagramType?: 'modelops' | 'documind' | 'deepdive';
  caseStudy?: ProjectCaseStudy;
}

export type ExperienceCategory =
  | 'Internship'
  | 'Leadership'
  | 'Program'
  | 'Achievement'
  | 'Certification';

export interface SupportingMediaItem {
  id: string;
  label: string;
  url: string;
  kind: 'image' | 'document';
}

export interface ExperienceEntry {
  id: string;
  index: string;
  organization: string;
  role: string;
  period: string;
  category: ExperienceCategory;
  summary: string;
  details: string[];
  technologies?: string[];
  supportingMedia?: SupportingMediaItem[];
  links?: { label: string; url: string }[];
  accent: AccentTheme;
  published?: boolean;
}

export interface ContactLinkItem {
  id: string;
  label: string;
  value: string;
  href: string;
  note: string;
}

export interface ContactData {
  eyebrow: string;
  headline: string;
  subline: string;
  email: string;
  links: ContactLinkItem[];
}

export interface TechMemory {
  id: string;
  src: string;
  alt: string;
  caption: string;
  tag: string;
  accent: AccentTheme;
  published?: boolean;
}

export interface PortfolioSnapshot {
  profile: ProfileData;
  aboutStory: AboutStoryData;
  projects: ProjectData[];
  experience: ExperienceEntry[];
  techCategories: TechCategory[];
  skills: TechItem[];
  memories: TechMemory[];
  contact: ContactData;
}
