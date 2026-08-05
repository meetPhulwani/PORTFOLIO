import { Seo } from '@/components/seo/Seo'
import { LazySection } from '@/components/layout/LazySection'
import { About } from '@/sections/About'
import { CodingProfiles } from '@/sections/CodingProfiles'
import { Contact } from '@/sections/Contact'
import { Education } from '@/sections/Education'
import { Experience } from '@/sections/Experience'
import { Hero } from '@/sections/Hero'
import { Projects } from '@/sections/Projects'
import { Skills } from '@/sections/Skills'

const loadTechMarquee = () =>
  import('@/sections/TechMarquee').then((module) => ({
    default: module.TechMarquee,
  }))

/**
 * Home landing — sections are mounted eagerly so navbar hash scroll
 * always has a real DOM target (SPA in-page navigation).
 */
export function HomePage() {
  return (
    <>
      <Seo path="/" />
      <main id="main" aria-label="Home" className="overflow-x-hidden">
        <Hero />
        <About />
        <LazySection
          loader={loadTechMarquee}
          minHeightClassName="min-h-[6rem]"
        />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <CodingProfiles />
        <Contact />
      </main>
    </>
  )
}
