/**
 * About statistics — resume-aligned metrics only.
 */
export const stats = [
  {
    id: 'projects',
    label: 'Featured Projects',
    value: 3,
    suffix: '',
  },
  {
    id: 'internships',
    label: 'Internships',
    value: 1,
    suffix: '',
  },
  {
    id: 'technologies',
    label: 'Core Technologies',
    value: 10,
    suffix: '+',
  },
] as const

export type StatItem = (typeof stats)[number]
