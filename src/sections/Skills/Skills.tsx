import { motion } from 'framer-motion'

import { staggerItem } from '@/animations'
import { AnimatedSectionHeader } from '@/components/effects/AnimatedSectionHeader'
import { RevealStagger } from '@/components/effects/Reveal'
import { SkillCard } from '@/components/cards/SkillCard'
import { Container } from '@/components/layout/Container'
import { Grid } from '@/components/layout/Grid'
import { Section } from '@/components/layout/Section'
import { SECTION_IDS } from '@/constants/sectionIds'
import { skillsSectionContent } from '@/data/sections'
import { skillCategories } from '@/data/skills'
import { sectionCardSurface } from '@/lib/cardSurface'
import { cn } from '@/lib/cn'

type SkillsProps = {
  className?: string
}

/**
 * Category-based skills grid using SkillCard primitives.
 */
export function Skills({ className }: SkillsProps) {
  const copy = skillsSectionContent

  return (
    <Section
      id={SECTION_IDS.skills}
      spacing="lg"
      tone="default"
      aria-labelledby="skills-heading"
      className={cn('overflow-hidden border-t border-accent/10', className)}
    >
      <Container>
        <AnimatedSectionHeader
          layout="split"
          className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10"
          headingColumnClassName="lg:col-span-7"
          descriptionColumnClassName="lg:col-span-5 lg:pb-2"
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          headingId="skills-heading"
          headingClassName="mt-4 text-[clamp(3rem,10vw,6rem)] leading-none drop-shadow-[0_0_40px_rgba(225,29,46,0.08)]"
          description={copy.description}
          descriptionClassName="max-w-md lg:ml-auto lg:text-right"
        />

        <RevealStagger className="mt-12 md:mt-16">
          <Grid
            cols={3}
            gap="md"
            className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={staggerItem}
                className={cn(
                  // Asymmetric close on tablet: last card spans full row when odd count
                  index === skillCategories.length - 1 &&
                    'sm:col-span-2 xl:col-span-1',
                )}
              >
                <SkillCard
                  category={category.category}
                  description={category.description}
                  skills={[...category.skills]}
                  surface={sectionCardSurface.skills}
                />
              </motion.div>
            ))}
          </Grid>
        </RevealStagger>
      </Container>
    </Section>
  )
}
