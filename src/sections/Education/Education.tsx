import { motion } from 'framer-motion'

import { staggerItem } from '@/animations'
import { AnimatedSectionHeader } from '@/components/effects/AnimatedSectionHeader'
import { RevealStagger } from '@/components/effects/Reveal'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { BodyText } from '@/components/typography/BodyText'
import { Caption } from '@/components/typography/Caption'
import { SubHeading } from '@/components/typography/SubHeading'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { SECTION_IDS } from '@/constants/sectionIds'
import { education } from '@/data/education'
import { educationSectionContent } from '@/data/sections'
import { sectionCardSurface } from '@/lib/cardSurface'
import { cn } from '@/lib/cn'

type EducationProps = {
  className?: string
}

/**
 * Editorial education cards — not a resume table.
 */
export function Education({ className }: EducationProps) {
  const copy = educationSectionContent

  return (
    <Section
      id={SECTION_IDS.education}
      spacing="lg"
      tone="default"
      aria-labelledby="education-heading"
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
          headingId="education-heading"
          headingClassName="mt-4 text-[clamp(2.75rem,10vw,6rem)] leading-none drop-shadow-[0_0_40px_rgba(225,29,46,0.08)]"
          description={copy.description}
          descriptionClassName="max-w-md lg:ml-auto lg:text-right"
        />

        <RevealStagger className="mt-12 space-y-8 md:mt-16">
          {education.map((item) => (
            <motion.div key={item.id} variants={staggerItem}>
              <Card
                interactive
                surface={sectionCardSurface.education}
                padding="lg"
                className="md:p-10"
              >
                <div className="grid gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <Caption tone="accent" className="tracking-[0.18em] uppercase">
                      {item.duration}
                    </Caption>
                    <SubHeading className="mt-3">{item.degree}</SubHeading>
                    <BodyText tone="default" className="mt-3">
                      {item.college}
                    </BodyText>
                    {item.cgpa ? (
                      <Caption className="mt-4 block text-foreground">
                        {copy.labels.cgpa} · {item.cgpa}
                      </Caption>
                    ) : null}
                  </div>

                  <div className="space-y-8 lg:col-span-7">
                    {item.coursework.length > 0 ? (
                      <div>
                        <Caption className="tracking-[0.16em] uppercase">
                          {copy.labels.coursework}
                        </Caption>
                        <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
                          {item.coursework.map((course) => (
                            <li key={course}>
                              <Pill>{course}</Pill>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {item.achievements.length > 0 ? (
                      <div>
                        <Caption className="tracking-[0.16em] uppercase">
                          {copy.labels.highlights}
                        </Caption>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
                          {item.achievements.map((achievement) => (
                            <li key={achievement}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  )
}
