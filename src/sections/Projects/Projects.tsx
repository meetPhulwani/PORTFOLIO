import { AnimatedSectionHeader } from '@/components/effects/AnimatedSectionHeader'
import { RevealStagger } from '@/components/effects/Reveal'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { SECTION_IDS } from '@/constants/sectionIds'
import { getProjects, projectsSectionContent } from '@/data/projects'
import { sectionCardSurface } from '@/lib/cardSurface'
import { cn } from '@/lib/cn'

type ProjectsProps = {
  className?: string
}

/**
 * Unified projects showcase — featured first, then remaining work.
 */
export function Projects({ className }: ProjectsProps) {
  const projectList = getProjects()
  const copy = projectsSectionContent

  return (
    <Section
      id={SECTION_IDS.projects}
      spacing="lg"
      tone="default"
      aria-labelledby="projects-heading"
      className={cn('overflow-hidden border-t border-accent/10', className)}
    >
      <Container>
        <AnimatedSectionHeader
          layout="split"
          className="grid gap-8 lg:grid-cols-12 lg:items-end"
          headingColumnClassName="lg:col-span-7"
          descriptionColumnClassName="lg:col-span-5"
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          headingId="projects-heading"
          headingClassName="mt-4 text-[clamp(3rem,10vw,6rem)] leading-none drop-shadow-[0_0_40px_rgba(225,29,46,0.08)]"
          description={copy.description}
          descriptionClassName="max-w-md lg:ml-auto lg:text-right"
        />

        <RevealStagger className="mt-12 space-y-8 md:mt-16 md:space-y-12">
          {projectList.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              surface={sectionCardSurface.projects}
            />
          ))}
        </RevealStagger>
      </Container>
    </Section>
  )
}
