import { Seo } from '@/components/seo/Seo'
import { LazySection } from '@/components/layout/LazySection'
import { SECTION_IDS } from '@/constants/sectionIds'
import { Hero } from '@/sections/Hero'

const loadAbout = () =>
  import('@/sections/About').then((module) => ({ default: module.About }))
const loadTechMarquee = () =>
  import('@/sections/TechMarquee').then((module) => ({
    default: module.TechMarquee,
  }))
const loadSkills = () =>
  import('@/sections/Skills').then((module) => ({ default: module.Skills }))
const loadProjects = () =>
  import('@/sections/Projects').then((module) => ({ default: module.Projects }))
const loadExperience = () =>
  import('@/sections/Experience').then((module) => ({
    default: module.Experience,
  }))
const loadEducation = () =>
  import('@/sections/Education').then((module) => ({
    default: module.Education,
  }))
const loadCodingProfiles = () =>
  import('@/sections/CodingProfiles').then((module) => ({
    default: module.CodingProfiles,
  }))
const loadContact = () =>
  import('@/sections/Contact').then((module) => ({ default: module.Contact }))

/**
 * Home landing — section order matches navigation:
 * About → Skills → Projects → Experience → Contact
 */
export function HomePage() {
  return (
    <>
      <Seo path="/" />
      <main id="main" aria-label="Home" className="overflow-x-hidden">
        <Hero />
        <LazySection
          sectionId={SECTION_IDS.about}
          loader={loadAbout}
          minHeightClassName="min-h-[36rem]"
        />
        <LazySection
          loader={loadTechMarquee}
          minHeightClassName="min-h-[6rem]"
        />
        <LazySection sectionId={SECTION_IDS.skills} loader={loadSkills} />
        <LazySection
          sectionId={SECTION_IDS.projects}
          loader={loadProjects}
          minHeightClassName="min-h-[40rem]"
        />
        <LazySection
          sectionId={SECTION_IDS.experience}
          loader={loadExperience}
        />
        <LazySection
          sectionId={SECTION_IDS.education}
          loader={loadEducation}
        />
        <LazySection
          sectionId={SECTION_IDS.profiles}
          loader={loadCodingProfiles}
        />
        <LazySection
          sectionId={SECTION_IDS.contact}
          loader={loadContact}
          minHeightClassName="min-h-[36rem]"
        />
      </main>
    </>
  )
}
