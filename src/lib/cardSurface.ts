import type { CardSurface } from '@/components/ui/Card'

/**
 * Section-level card surfaces — every card in a section shares one tone.
 * Adjacent sections alternate mist (dark grey glass) ↔ ink (near black).
 * Order: About → Skills → Projects → Experience → Education → Profiles → Contact
 */
export const sectionCardSurface = {
  about: 'mist',
  skills: 'ink',
  projects: 'mist',
  experience: 'ink',
  education: 'mist',
  profiles: 'ink',
  contact: 'mist',
} as const satisfies Record<string, CardSurface>

export type SectionCardKey = keyof typeof sectionCardSurface
