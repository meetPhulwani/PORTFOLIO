import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import { useMemo, useRef, type ReactNode } from 'react'

import {
  sectionHeadingAccent,
  sectionHeadingAccentReduced,
  sectionHeadingItem,
  sectionHeadingItemMobile,
  sectionHeadingItemReduced,
  sectionHeadingStagger,
} from '@/animations'
import { BodyText } from '@/components/typography/BodyText'
import { Caption } from '@/components/typography/Caption'
import { Heading } from '@/components/typography/Heading'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'

export type AnimatedSectionHeaderProps = {
  eyebrow: string
  heading: ReactNode
  headingId: string
  description?: string
  /** Outer wrapper — pass existing grid/stack layout classes unchanged. */
  className?: string
  headingColumnClassName?: string
  descriptionColumnClassName?: string
  eyebrowClassName?: string
  headingClassName?: string
  descriptionClassName?: string
  /**
   * `split` — heading + description as sibling columns (most sections).
   * `stack` — description under the heading (Contact).
   * `compact` — eyebrow + heading only (About).
   */
  layout?: 'split' | 'stack' | 'compact'
  /** Accent underline under the main heading (grows L→R after reveal). */
  showAccent?: boolean
}

/**
 * Viewport-once entrance for major section headings.
 * Preserves caller spacing/typography classes; only adds motion.
 */
export function AnimatedSectionHeader({
  eyebrow,
  heading,
  headingId,
  description,
  className,
  headingColumnClassName,
  descriptionColumnClassName,
  eyebrowClassName,
  headingClassName,
  descriptionClassName,
  layout = 'split',
  showAccent = true,
}: AnimatedSectionHeaderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 767px)')

  const itemVariants: Variants = useMemo(() => {
    if (reduceMotion) return sectionHeadingItemReduced
    return isMobile ? sectionHeadingItemMobile : sectionHeadingItem
  }, [isMobile, reduceMotion])

  const accentVariants: Variants = reduceMotion
    ? sectionHeadingAccentReduced
    : sectionHeadingAccent

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ['start end', 'end start'],
  })

  const parallaxDistance = reduceMotion ? 0 : isMobile ? 5 : 8
  const headingY = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxDistance, -parallaxDistance],
  )

  const eyebrowNode = (
    <motion.div variants={itemVariants}>
      <Caption
        tone="accent"
        className={cn('tracking-[0.22em] uppercase', eyebrowClassName)}
      >
        {eyebrow}
      </Caption>
    </motion.div>
  )

  const headingNode = (
    <motion.div variants={itemVariants} className="relative">
      <motion.div style={{ y: headingY }}>
        <Heading id={headingId} size="lg" className={headingClassName}>
          {heading}
        </Heading>
      </motion.div>
      {showAccent ? (
        <motion.span
          aria-hidden="true"
          variants={accentVariants}
          className="pointer-events-none absolute left-0 top-[calc(100%+0.55rem)] h-[2px] w-14 origin-left bg-accent md:w-16"
        />
      ) : null}
    </motion.div>
  )

  const descriptionNode =
    description != null && description.length > 0 ? (
      <motion.div variants={itemVariants}>
        <BodyText className={descriptionClassName}>{description}</BodyText>
      </motion.div>
    ) : null

  return (
    <motion.div
      ref={rootRef}
      className={cn(className)}
      variants={sectionHeadingStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      {layout === 'compact' ? (
        <>
          {eyebrowNode}
          {headingNode}
        </>
      ) : null}

      {layout === 'stack' ? (
        <>
          {eyebrowNode}
          {headingNode}
          {descriptionNode}
        </>
      ) : null}

      {layout === 'split' ? (
        <>
          <div className={headingColumnClassName}>
            {eyebrowNode}
            {headingNode}
          </div>
          {descriptionNode ? (
            <div className={descriptionColumnClassName}>{descriptionNode}</div>
          ) : null}
        </>
      ) : null}
    </motion.div>
  )
}
