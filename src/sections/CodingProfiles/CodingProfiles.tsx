import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import { staggerItem } from '@/animations'
import { ProfileCard } from '@/components/cards/ProfileCard'
import { AnimatedSectionHeader } from '@/components/effects/AnimatedSectionHeader'
import { RevealStagger } from '@/components/effects/Reveal'
import { Container } from '@/components/layout/Container'
import { Grid } from '@/components/layout/Grid'
import { Section } from '@/components/layout/Section'
import { SECTION_IDS } from '@/constants/sectionIds'
import { codingProfiles, type CodingProfile } from '@/data/codingProfiles'
import { profilesSectionContent } from '@/data/sections'
import { sectionCardSurface } from '@/lib/cardSurface'
import { cn } from '@/lib/cn'

type CodingProfilesProps = {
  className?: string
}

function profileIcon(id: CodingProfile['id']) {
  switch (id) {
    case 'github':
      return <FaGithub />
    case 'linkedin':
      return <FaLinkedin />
  }
}

/**
 * Technical activity cards — GitHub and LinkedIn from resume links.
 */
export function CodingProfiles({ className }: CodingProfilesProps) {
  const copy = profilesSectionContent

  return (
    <Section
      id={SECTION_IDS.profiles}
      spacing="lg"
      tone="default"
      aria-labelledby="profiles-heading"
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
          headingId="profiles-heading"
          headingClassName="mt-4 text-[clamp(2.5rem,9vw,5.5rem)] leading-none drop-shadow-[0_0_40px_rgba(225,29,46,0.08)]"
          description={copy.description}
          descriptionClassName="max-w-md lg:ml-auto lg:text-right"
        />

        <RevealStagger className="mt-12 md:mt-16">
          <Grid cols={2} gap="md" className="grid-cols-1 md:grid-cols-2">
            {codingProfiles.map((profile) => (
              <motion.div key={profile.id} variants={staggerItem}>
                <ProfileCard
                  platform={profile.platform}
                  username={profile.username}
                  description={profile.description}
                  href={profile.href}
                  stats={profile.stats}
                  topLanguages={profile.topLanguages}
                  icon={profileIcon(profile.id)}
                  surface={sectionCardSurface.profiles}
                />
              </motion.div>
            ))}
          </Grid>
        </RevealStagger>
      </Container>
    </Section>
  )
}
