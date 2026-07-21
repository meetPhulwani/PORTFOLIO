import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import { fadeUp, parallax } from '@/animations'
import { Container } from '@/components/layout/Container'
import { SECTION_IDS } from '@/constants/sectionIds'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'
import { HeroContent } from '@/sections/Hero/HeroContent'
import { HeroScrollHint } from '@/sections/Hero/HeroScrollHint'

type HeroProps = {
  className?: string
}

/**
 * Typography-driven cinematic hero — brand-first, no decorative watermark.
 */
export function Hero({ className }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const mouse = useMouseParallax(sectionRef, parallax.medium)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 36],
  )

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.hero}
      aria-labelledby="hero-heading"
      className={cn(
        'relative -mt-16 flex min-h-dvh items-center overflow-hidden bg-transparent md:-mt-20',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_18%,rgba(225,29,46,0.07),transparent_48%),radial-gradient(ellipse_at_78%_72%,rgba(90,8,16,0.09),transparent_42%),radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.015),transparent_55%)]"
      />

      <Container className="relative z-10 w-full pt-24 pb-28 md:pt-28 md:pb-32">
        <motion.div
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
          style={{
            y: contentY,
            x: prefersReducedMotion ? 0 : mouse.x * -0.1,
          }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <HeroContent reduceMotion={prefersReducedMotion} />
        </motion.div>
      </Container>

      <HeroScrollHint />
    </section>
  )
}
