import { useEffect, useState } from 'react'

import { Caption } from '@/components/typography/Caption'
import { SubHeading } from '@/components/typography/SubHeading'
import { useInViewOnce } from '@/hooks/useInViewOnce'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

export type AnimatedCounterProps = {
  value: number
  label: string
  suffix?: string
  prefix?: string
  durationMs?: number
  className?: string
}

/**
 * Viewport-triggered count-up statistic.
 * Skips animation when reduced motion is preferred.
 */
export function AnimatedCounter({
  value,
  label,
  suffix = '',
  prefix = '',
  durationMs = 1400,
  className,
}: AnimatedCounterProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>()
  const prefersReducedMotion = usePrefersReducedMotion()
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!inView || prefersReducedMotion) return

    let frameId = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplayValue(Math.round(value * eased))
      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [durationMs, inView, prefersReducedMotion, value])

  const shownValue = prefersReducedMotion && inView ? value : displayValue

  return (
    <div ref={ref} className={cn('flex flex-col gap-2', className)}>
      <SubHeading as="p" size="lg" className="font-display tracking-[0.06em]">
        {prefix}
        {shownValue.toLocaleString()}
        {suffix}
      </SubHeading>
      <Caption>{label}</Caption>
    </div>
  )
}