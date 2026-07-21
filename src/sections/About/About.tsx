import { motion } from 'framer-motion'

import { staggerItem } from '@/animations'
import { Container } from '@/components/layout/Container'
import { Grid } from '@/components/layout/Grid'
import { Section } from '@/components/layout/Section'
import { AnimatedSectionHeader } from '@/components/effects/AnimatedSectionHeader'
import { Reveal, RevealStagger } from '@/components/effects/Reveal'
import { BodyText } from '@/components/typography/BodyText'
import { SubHeading } from '@/components/typography/SubHeading'
import { StatCard } from '@/components/cards/StatCard'
import { SECTION_IDS } from '@/constants/sectionIds'
import { profile } from '@/data/profile'
import { aboutSectionContent } from '@/data/sections'
import { stats } from '@/data/stats'
import { sectionCardSurface } from '@/lib/cardSurface'
import { cn } from '@/lib/cn'

type AboutProps = {
  className?: string
}

/**
 * Editorial About section — story, focus, and animated stats.
 * Content sourced exclusively from centralized data files.
 */
export function About({ className }: AboutProps) {
  const { about } = profile
  const copy = aboutSectionContent

  return (
    <Section
      id={SECTION_IDS.about}
      spacing="lg"
      tone="default"
      aria-labelledby="about-heading"
      className={cn('overflow-hidden border-t border-accent/10', className)}
    >
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <AnimatedSectionHeader
              layout="compact"
              eyebrow={copy.eyebrow}
              heading={copy.heading}
              headingId="about-heading"
              headingClassName="mt-4 text-[clamp(3.5rem,12vw,7rem)] leading-none drop-shadow-[0_0_40px_rgba(225,29,46,0.08)]"
            />

            <Reveal preset="blurReveal" className="mt-8 max-w-md lg:mt-12">
              <BodyText size="lg" tone="default">
                {about.introduction}
              </BodyText>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center space-y-12 lg:col-span-7 lg:min-h-[18rem] lg:pt-8">
            <Reveal preset="fadeUp">
              <SubHeading size="sm" className="text-accent">
                {copy.labels.philosophy}
              </SubHeading>
              <BodyText className="mt-3 max-w-2xl">{about.philosophy}</BodyText>
            </Reveal>

            <Reveal preset="fadeUp">
              <SubHeading size="sm" className="text-accent">
                {copy.labels.focus}
              </SubHeading>
              <BodyText className="mt-3 max-w-2xl">{about.focus}</BodyText>
            </Reveal>
          </div>
        </div>

        <RevealStagger className="mt-14 md:mt-16 lg:mt-20">
          <Grid cols={3} gap="md">
            {stats.map((stat) => (
              <motion.div key={stat.id} variants={staggerItem}>
                <StatCard
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                  surface={sectionCardSurface.about}
                />
              </motion.div>
            ))}
          </Grid>
        </RevealStagger>
      </Container>
    </Section>
  )
}
