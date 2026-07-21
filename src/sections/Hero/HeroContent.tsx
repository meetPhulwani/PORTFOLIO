import { motion } from 'framer-motion'

import { heroReveal, staggerContainer, staggerItem } from '@/animations'
import { BodyText } from '@/components/typography/BodyText'
import { Caption } from '@/components/typography/Caption'
import { Heading } from '@/components/typography/Heading'
import { Badge } from '@/components/ui/Badge'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { SECTION_IDS } from '@/constants/sectionIds'
import { heroActions } from '@/data/sections'
import { profile } from '@/data/profile'
import { cn } from '@/lib/cn'
import { scrollToSectionId } from '@/lib/scroll'
import { useLenis } from '@/providers/lenisContext'

type HeroContentProps = {
  className?: string
  reduceMotion?: boolean
}

/**
 * Typography-first hero copy + CTAs.
 * Order: name → title → focus line → tagline → availability → actions.
 */
export function HeroContent({
  className,
  reduceMotion = false,
}: HeroContentProps) {
  const lenis = useLenis()

  const handleViewProjects = () => {
    scrollToSectionId(SECTION_IDS.projects, lenis)
  }

  return (
    <motion.div
      className={cn('relative z-20 flex w-full flex-col items-center', className)}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={reduceMotion ? undefined : heroReveal}>
        <Heading
          as="h1"
          id="hero-heading"
          size="lg"
          className="text-[clamp(3rem,10vw,6.5rem)] leading-[0.92] tracking-[0.02em]"
        >
          {profile.name.toUpperCase()}
        </Heading>
      </motion.div>

      <motion.div variants={reduceMotion ? undefined : staggerItem}>
        <Caption
          tone="default"
          className="mt-5 block text-base tracking-[0.22em] text-foreground uppercase md:mt-6 md:text-lg"
        >
          {profile.title}
        </Caption>
      </motion.div>

      <motion.div variants={reduceMotion ? undefined : staggerItem}>
        <BodyText
          size="sm"
          className="mt-3 tracking-[0.08em] text-muted uppercase md:text-base"
        >
          {profile.focusLine}
        </BodyText>
      </motion.div>

      <motion.div variants={reduceMotion ? undefined : staggerItem}>
        <BodyText className="mt-6 max-w-2xl text-pretty md:mt-8">
          {profile.tagline}
        </BodyText>
      </motion.div>

      <motion.div variants={reduceMotion ? undefined : staggerItem} className="mt-8">
        <Badge tone="success" className="w-fit">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-success shadow-[0_0_0_3px_rgb(34_197_94/0.18)]"
          />
          {profile.availability}
        </Badge>
      </motion.div>

      <motion.div
        variants={reduceMotion ? undefined : staggerItem}
        className="mt-8 flex flex-wrap justify-center gap-3 md:mt-10"
      >
        <MagneticButton
          variant="primary"
          size="lg"
          onClick={handleViewProjects}
        >
          {heroActions.viewProjects}
        </MagneticButton>
        <a
          href={profile.resumeUrl}
          download
          className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
        >
          {heroActions.downloadResume}
        </a>
      </motion.div>
    </motion.div>
  )
}
