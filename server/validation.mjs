import { z } from 'zod';

const accentSchema = z.enum(['lime', 'sky', 'maroon', 'ink', 'paper']).default('lime');

const safeUrlOrPath = z
  .string()
  .trim()
  .refine(
    (val) =>
      val === '' ||
      val.startsWith('/') ||
      val.startsWith('https://') ||
      val.startsWith('http://') ||
      val.startsWith('mailto:'),
    { message: 'Must be a relative path (/...) or http(s)/mailto URL' }
  );

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6).max(200),
});

export const projectSchema = z.object({
  id: z.string().trim().min(1).max(100),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug may only contain lowercase letters, numbers, and hyphens'),
  order: z.number().int().min(1).max(9999),
  kind: z.enum(['flagship', 'major', 'compact']),
  categoryLabel: z.string().trim().min(1).max(160),
  title: z.string().trim().min(1).max(160),
  subtitle: z.string().trim().min(1).max(200),
  tagline: z.string().trim().max(240).optional().default(''),
  summary: z.string().trim().min(1).max(2000),
  detailedDescription: z.string().trim().max(5000).optional().default(''),
  stack: z.array(z.string().trim().min(1).max(80)).default([]),
  features: z.array(z.string().trim().min(1).max(300)).default([]),
  coverImage: safeUrlOrPath.optional().default(''),
  projectDate: z.string().trim().max(80).optional().default(''),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  metrics: z
    .array(
      z.object({
        label: z.string().trim().min(1).max(80),
        value: z.string().trim().min(1).max(80),
        note: z.string().trim().max(160).optional(),
      })
    )
    .default([]),
  findings: z.array(z.string().trim().min(1).max(400)).default([]),
  distinctionNote: z.string().trim().max(600).optional().default(''),
  screenshots: z
    .array(
      z.object({
        id: z.string().trim().min(1).max(80),
        src: safeUrlOrPath.refine((s) => s.length > 0, 'Screenshot image is required'),
        alt: z.string().trim().min(1).max(300),
        caption: z.string().trim().max(400).default(''),
        tag: z.string().trim().max(80).default('Screenshot'),
      })
    )
    .default([]),
  links: z
    .array(
      z.object({
        label: z.string().trim().min(1).max(80),
        url: safeUrlOrPath.refine((s) => s.length > 0, 'Link URL is required'),
        kind: z.enum(['live', 'github', 'docs']),
      })
    )
    .default([]),
  accentTheme: accentSchema,
  architectureDiagramType: z.enum(['modelops', 'documind', 'deepdive']).optional(),
  caseStudy: z
    .object({
      bigIdea: z.string().trim().max(2000).default(''),
      problem: z.string().trim().max(2000).default(''),
      engineeringApproach: z.array(z.string().trim().min(1).max(500)).default([]),
      architectureSummary: z.string().trim().max(2000).default(''),
      workflowSteps: z
        .array(
          z.object({
            step: z.string().trim().min(1).max(20),
            title: z.string().trim().min(1).max(120),
            detail: z.string().trim().min(1).max(600),
          })
        )
        .default([]),
      resultsAndLearnings: z.array(z.string().trim().min(1).max(500)).default([]),
    })
    .optional(),
});

export const experienceSchema = z.object({
  id: z.string().trim().min(1).max(100),
  index: z.string().trim().min(1).max(20),
  organization: z.string().trim().min(1).max(160),
  role: z.string().trim().min(1).max(160),
  period: z.string().trim().min(1).max(120),
  category: z.enum(['Internship', 'Leadership', 'Program', 'Achievement', 'Certification']),
  summary: z.string().trim().min(1).max(1000),
  details: z.array(z.string().trim().min(1).max(600)).default([]),
  technologies: z.array(z.string().trim().min(1).max(80)).default([]),
  supportingMedia: z
    .array(
      z.object({
        id: z.string().trim().min(1).max(80),
        label: z.string().trim().min(1).max(120),
        url: safeUrlOrPath.refine((s) => s.length > 0, 'Media URL is required'),
        kind: z.enum(['image', 'document']),
      })
    )
    .default([]),
  links: z
    .array(
      z.object({
        label: z.string().trim().min(1).max(80),
        url: safeUrlOrPath.refine((s) => s.length > 0, 'Link URL is required'),
      })
    )
    .default([]),
  accent: accentSchema,
  published: z.boolean().default(true),
});

export const skillSchema = z.object({
  id: z.string().trim().min(1).max(100),
  name: z.string().trim().min(1).max(80),
  iconKey: z.string().trim().min(1).max(60),
  categoryId: z.string().trim().min(1).max(60),
  projectIds: z.array(z.string().trim().min(1).max(100)).default([]),
  isSharedToolkit: z.boolean().default(false),
  published: z.boolean().default(true),
});

export const educationSchema = z.object({
  id: z.string().trim().min(1).max(100),
  institution: z.string().trim().min(1).max(180),
  location: z.string().trim().min(1).max(120),
  degree: z.string().trim().min(1).max(180),
  minor: z.string().trim().max(120).optional().default(''),
  period: z.string().trim().min(1).max(80),
  cgpa: z.string().trim().min(1).max(40),
  description: z.string().trim().max(1000).optional().default(''),
  milestones: z.array(z.string().trim().min(1).max(300)).default([]),
  published: z.boolean().default(true),
});

export const memorySchema = z.object({
  id: z.string().trim().min(1).max(100),
  src: safeUrlOrPath.refine((s) => s.length > 0, 'Image source is required'),
  alt: z.string().trim().min(1).max(300),
  caption: z.string().trim().min(1).max(160),
  tag: z.string().trim().min(1).max(60),
  accent: accentSchema,
  published: z.boolean().default(true),
});

export const profileMetaSchema = z.object({
  name: z.string().trim().min(1).max(120),
  shortMark: z.string().trim().min(1).max(6),
  role: z.string().trim().min(1).max(120),
  location: z.string().trim().min(1).max(120),
  openingGreeting: z.string().trim().min(1).max(240),
  personalityIntro: z.string().trim().min(1).max(600),
  resumeSummary: z.string().trim().min(1).max(1200),
  portraitSrc: safeUrlOrPath.refine((s) => s.length > 0),
  portraitAlt: z.string().trim().min(1).max(200),
  resumePdfSrc: safeUrlOrPath.refine((s) => s.length > 0),
});
