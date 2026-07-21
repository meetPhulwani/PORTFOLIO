/**
 * Shared section chrome — eyebrows, headings, and intros.
 * Keep components free of resume/marketing copy.
 */
export const heroActions = {
  viewProjects: 'View Projects',
  downloadResume: 'Download Resume',
} as const

export const aboutSectionContent = {
  eyebrow: 'Introduction',
  heading: 'ABOUT',
  labels: {
    philosophy: 'Philosophy',
    focus: 'Current focus',
  },
} as const

export const skillsSectionContent = {
  eyebrow: 'Capability',
  heading: 'SKILLS',
  description:
    'A focused stack for building full-stack products — from polished interfaces to resilient APIs and data layers.',
} as const

export const experienceSectionContent = {
  eyebrow: 'Career',
  heading: 'EXPERIENCE',
  description:
    'Internship experience shipping React UI, REST APIs, and performance improvements in an agile product team.',
} as const

export const educationSectionContent = {
  eyebrow: 'Academics',
  heading: 'EDUCATION',
  description:
    'Computer Engineering at VESIT with strong fundamentals in DSA, OOP, and project-based learning.',
  labels: {
    coursework: 'Relevant coursework',
    highlights: 'Highlights',
    cgpa: 'CGPA',
  },
} as const

export const profilesSectionContent = {
  eyebrow: 'Activity',
  heading: 'PROFILES',
  description:
    'Public repositories and professional presence — the platforms where the work and updates live.',
} as const

export const footerContent = {
  description:
    "Thanks for spending time here. If something resonated, let's talk about building it next.",
  navigateLabel: 'Navigate',
  backToTop: 'Back to Top',
  terminal: 'Terminal',
} as const
