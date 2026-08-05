import {
  useCallback,
  useEffect,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react'

import { useInViewOnce } from '@/hooks/useInViewOnce'
import { cn } from '@/lib/cn'
import { registerSectionLoader } from '@/lib/sectionLoader'

type SectionModule = { default: ComponentType }

type LazySectionProps = {
  /** Stable import factory (define at module scope, not inline). */
  loader: () => Promise<SectionModule>
  /** When set, nav can force-mount this section before scrolling to it. */
  sectionId?: string
  minHeightClassName?: string
  className?: string
  fallback?: ReactNode
}

/**
 * Mounts a section only when near the viewport, then loads its chunk.
 * Nav targets can still force-load via `sectionId` so links work before scroll.
 */
export function LazySection({
  loader,
  sectionId,
  minHeightClassName = 'min-h-[28rem]',
  className,
  fallback,
}: LazySectionProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>({
    rootMargin: '280px 0px',
    threshold: 0.01,
  })
  const [forced, setForced] = useState(false)
  const [Section, setSection] = useState<ComponentType | null>(null)
  const shouldLoad = inView || forced

  const waitForMountedSection = useCallback(
    (id: string) =>
      new Promise<HTMLElement | null>((resolve) => {
        const started = performance.now()
        const tick = () => {
          const node = document.getElementById(id)
          if (node) {
            resolve(node)
            return
          }
          if (performance.now() - started > 4500) {
            resolve(null)
            return
          }
          window.requestAnimationFrame(tick)
        }
        tick()
      }),
    [],
  )

  useEffect(() => {
    if (!sectionId) return

    return registerSectionLoader(sectionId, async () => {
      setForced(true)
      return waitForMountedSection(sectionId)
    })
  }, [sectionId, waitForMountedSection])

  useEffect(() => {
    if (!shouldLoad || Section) return

    let active = true
    void loader().then((module) => {
      if (active) setSection(() => module.default)
    })

    return () => {
      active = false
    }
  }, [Section, shouldLoad, loader])

  return (
    <div
      ref={ref}
      className={cn(className)}
      data-lazy-section={sectionId || undefined}
    >
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
