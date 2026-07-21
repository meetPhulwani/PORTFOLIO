import { motion } from 'framer-motion'

import { Caption } from '@/components/typography/Caption'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

type HeroScrollHintProps = {
  className?: string
}

/** Subtle scroll affordance at the bottom of the hero. */
export function HeroScrollHint({ className }: HeroScrollHintProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div
      className={cn(
        'pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-10',
        className,
      )}
    >
      <Caption size="sm" className="tracking-[0.24em] uppercase">
        Scroll
      </Caption>
      <motion.span
        aria-hidden="true"
        className="block h-10 w-px origin-top bg-gradient-to-b from-accent to-transparent"
        animate={
          prefersReducedMotion
            ? { scaleY: 1, opacity: 0.7 }
            : { scaleY: [0.35, 1, 0.35], opacity: [0.35, 0.9, 0.35] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
        }
      />
    </div>
  )
}
