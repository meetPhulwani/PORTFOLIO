import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { staggerContainer, staggerItem } from '@/animations'
import { Heading } from '@/components/typography/Heading'
import { SHELL_FLAGS } from '@/constants/shell'
import { loaderContent } from '@/data/loader'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

export type LoaderProps = {
  /** Force-disable without changing shell flags. */
  enabled?: boolean
  className?: string
  onFinished?: () => void
}

type LoaderOverlayProps = {
  className?: string
  onFinished?: () => void
}

function LoaderOverlay({ className, onFinished }: LoaderOverlayProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [visible, setVisible] = useState(true)
  const letters = loaderContent.word.split('')

  useEffect(() => {
    const duration = prefersReducedMotion
      ? 120
      : SHELL_FLAGS.loaderMinDurationMs
    const timeout = window.setTimeout(() => {
      setVisible(false)
      onFinished?.()
    }, duration)

    return () => window.clearTimeout(timeout)
  }, [onFinished, prefersReducedMotion])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className={cn(
            'fixed inset-0 z-[100] flex items-center justify-center bg-background',
            className,
          )}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: prefersReducedMotion ? 0.01 : 0.5 },
          }}
          aria-live="polite"
          aria-busy="true"
          role="status"
        >
          <Heading
            as="span"
            size="lg"
            className="font-display text-[clamp(2.75rem,8vw,5.5rem)] tracking-[0.22em] text-foreground uppercase"
            aria-label={loaderContent.ariaLabel}
          >
            {prefersReducedMotion ? (
              loaderContent.word
            ) : (
              <motion.span
                className="inline-flex"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                aria-hidden="true"
              >
                {letters.map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    variants={staggerItem}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.span>
            )}
          </Heading>
          <span className="sr-only">Loading portfolio</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

/**
 * Premium entrance loader — staggered "WELCOME" reveal into the homepage.
 * Easy to disable via `SHELL_FLAGS.enableLoader` or `enabled={false}`.
 */
export function Loader({
  enabled = SHELL_FLAGS.enableLoader,
  className,
  onFinished,
}: LoaderProps) {
  useEffect(() => {
    if (!enabled) onFinished?.()
  }, [enabled, onFinished])

  if (!enabled) return null

  return <LoaderOverlay className={className} onFinished={onFinished} />
}
