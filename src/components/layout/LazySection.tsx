import { useEffect, useState, type ComponentType, type ReactNode } from 'react'

import { useInViewOnce } from '@/hooks/useInViewOnce'
import { cn } from '@/lib/cn'

type SectionModule = { default: ComponentType }

type LazySectionProps = {
  /** Stable import factory (define at module scope, not inline). */
  loader: () => Promise<SectionModule>
  minHeightClassName?: string
  className?: string
  fallback?: ReactNode
}

/**
 * Mounts a section only when near the viewport, then loads its chunk.
 * Reduces initial JS while preserving section layout space (CLS-safe).
 */
export function LazySection({
  loader,
  minHeightClassName = 'min-h-[28rem]',
  className,
  fallback,
}: LazySectionProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>({
    rootMargin: '280px 0px',
    threshold: 0.01,
  })
  const [Section, setSection] = useState<ComponentType | null>(null)

  useEffect(() => {
    if (!inView || Section) return

    let active = true
    void loader().then((module) => {
      if (active) setSection(() => module.default)
    })

    return () => {
      active = false
    }
  }, [Section, inView, loader])

  return (
    <div ref={ref} className={cn(className)}>
      {Section ? (
        <Section />
      ) : (
        (fallback ?? (
          <div className={minHeightClassName} aria-hidden="true" />
        ))
      )}
    </div>
  )
}
