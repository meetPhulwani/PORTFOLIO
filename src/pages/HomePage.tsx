import { Seo } from '@/components/seo/Seo'
import { LazySection } from '@/components/layout/LazySection'
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
        <LazySection loader={loadAbout} minHeightClassName="min-h-[36rem]" />
        <LazySection
          loader={loadTechMarquee}
          minHeightClassName="min-h-[6rem]"
        />
        <LazySection loader={loadSkills} />
        <LazySection
          loader={loadProjects}
          minHeightClassName="min-h-[40rem]"
        />
        <LazySection loader={loadExperience} />
        <LazySection loader={loadEducation} />
        <LazySection loader={loadCodingProfiles} />
        <LazySection
          loader={loadContact}
          minHeightClassName="min-h-[36rem]"
        />
      </main>
    </>
  )
}
