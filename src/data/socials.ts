/**
 * Social / coding profile links — from resume.
 */
export const socials = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/meetPhulwani',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/meet-phulwani-58b438343/',
  },
] as const

export type SocialId = (typeof socials)[number]['id']
export type SocialLink = (typeof socials)[number]

export function getSocial(id: SocialId): SocialLink {
  const social = socials.find((item) => item.id === id)
  if (!social) {
    throw new Error(`Unknown social id: ${id}`)
  }
  return social
}
