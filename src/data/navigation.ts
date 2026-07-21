import { SECTION_IDS } from '@/constants/sectionIds'

export type NavItem = {
  id: string
  label: string
  href: string
  sectionId?: string
}

/**
 * Primary navbar destinations — order matches page flow:
 * Home → About → Skills → Projects → Experience → Contact
 */
export const navigation: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: `/#${SECTION_IDS.hero}`,
    sectionId: SECTION_IDS.hero,
  },
  {
    id: 'about',
    label: 'About',
    href: `/#${SECTION_IDS.about}`,
    sectionId: SECTION_IDS.about,
  },
  {
    id: 'skills',
    label: 'Skills',
    href: `/#${SECTION_IDS.skills}`,
    sectionId: SECTION_IDS.skills,
  },
  {
    id: 'projects',
    label: 'Projects',
    href: `/#${SECTION_IDS.projects}`,
    sectionId: SECTION_IDS.projects,
  },
  {
    id: 'experience',
    label: 'Experience',
    href: `/#${SECTION_IDS.experience}`,
    sectionId: SECTION_IDS.experience,
  },
  {
    id: 'contact',
    label: 'Contact',
    href: `/#${SECTION_IDS.contact}`,
    sectionId: SECTION_IDS.contact,
  },
]

export const footerNav = navigation
