import { AnimatedSectionHeader } from '@/components/effects/AnimatedSectionHeader'
import { Reveal } from '@/components/effects/Reveal'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Pill } from '@/components/ui/Pill'
import { Timeline, type TimelineItem } from '@/components/ui/Timeline'
import { SECTION_IDS } from '@/constants/sectionIds'
import { experience } from '@/data/experience'
import { experienceSectionContent } from '@/data/sections'
import { sectionCardSurface } from '@/lib/cardSurface'
import { cn } from '@/lib/cn'

type ExperienceProps = {
  className?: string
}

function toTimelineItems(): TimelineItem[] {
  return experience.map((item) => ({
    id: item.id,
    title: item.role,
    subtitle: `${item.company} · ${item.location}`,
    period: item.duration,
    description: item.summary,
    meta: (
      <div className="space-y-4">
        <ul className="flex list-none flex-wrap gap-2 p-0">
          {item.technologies.map((tech) => (
            <li key={tech}>
              <Pill>{tech}</Pill>
            </li>
          ))}
        </ul>
        <ul className="m-0 list-disc space-y-2 pl-5 text-left text-sm text-muted">
          {item.achievements.map((achievement) => (
            <li key={achievement}>{achievement}</li>
          ))}
        </ul>
      </div>
    ),
  }))
}

/**
 * Premium experience timeline — credibility without resume density.
 */
export function Experience({ className }: ExperienceProps) {
  const items = toTimelineItems()
  const copy = experienceSectionContent

  return (
    <Section
      id={SECTION_IDS.experience}
      spacing="lg"
      tone="default"
      aria-labelledby="experience-heading"
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
          headingId="experience-heading"
          headingClassName="mt-4 text-[clamp(2.75rem,10vw,6rem)] leading-none drop-shadow-[0_0_40px_rgba(225,29,46,0.08)]"
          description={copy.description}
          descriptionClassName="max-w-md lg:ml-auto lg:text-right"
        />

        <Reveal preset="timelineReveal" className="mt-12 md:mt-16">
          <Timeline items={items} surface={sectionCardSurface.experience} />
        </Reveal>
      </Container>
    </Section>
  )
}
