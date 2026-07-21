/**
 * Stable DOM ids for in-page navigation (navbar anchors).
 */
export const SECTION_IDS = {
  hero: 'hero',
  about: 'about',
  skills: 'skills',
  projects: 'projects',
  experience: 'experience',
  education: 'education',
  profiles: 'profiles',
  contact: 'contact',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]
