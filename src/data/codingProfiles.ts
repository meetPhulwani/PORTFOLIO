import { getSocial } from '@/data/socials'

/**
 * Coding profile cards — only platforms with real resume links.
 */
export type ProfileStat = {
  label: string
  value: number
  suffix?: string
}

export type CodingProfile = {
  id: 'github' | 'linkedin'
  platform: string
  username: string
  description: string
  href: string
  stats: ProfileStat[]
  topLanguages?: string[]
}

const github = getSocial('github')
const linkedin = getSocial('linkedin')

export const codingProfiles: CodingProfile[] = [
  {
    id: 'github',
    platform: 'GitHub',
    username: 'meetPhulwani',
    description:
      'Public repositories spanning full-stack MERN apps, realtime systems, and inventory tools.',
    href: github.href,
    stats: [
      { label: 'Repositories', value: 3, suffix: '+' },
      { label: 'Major Projects', value: 3 },
    ],
    topLanguages: ['JavaScript', 'Java', 'HTML'],
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    username: 'meet-phulwani',
    description:
      'Professional updates, internship experience, and project highlights.',
    href: linkedin.href,
    stats: [
      { label: 'Featured Projects', value: 3 },
      { label: 'Internship', value: 1 },
    ],
  },
]
