import { useEffect, useState } from 'react'

import { SECTION_IDS } from '@/constants/sectionIds'
import type { NavItem } from '@/data/navigation'

/**
 * Intersection Observer scroll-spy for navbar highlighting.
 * Re-binds when lazy sections mount so active state stays accurate.
 */
export function useActiveSection(items: NavItem[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const navSectionIds = items
      .map((item) => item.sectionId)
      .filter((id): id is string => Boolean(id))

    const watchedIds = [...new Set([SECTION_IDS.hero, ...navSectionIds])]
    let observer: IntersectionObserver | null = null
    let observedCount = -1
    let frame = 0

    const disconnect = () => {
      observer?.disconnect()
      observer = null
    }

    const bind = () => {
      const elements = watchedIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el))

      if (elements.length === observedCount && observer) {
        return elements.length >= navSectionIds.length
      }

      observedCount = elements.length
      if (elements.length === 0) return false

      disconnect()

      const ratios = new Map<string, number>()

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            ratios.set(
              entry.target.id,
              entry.isIntersecting ? entry.intersectionRatio : 0,
            )
          }

          let bestId: string | null = null
          let bestRatio = 0

          for (const id of watchedIds) {
            const ratio = ratios.get(id) ?? 0
            if (ratio > bestRatio) {
              bestRatio = ratio
              bestId = id
            }
          }

          if (!bestId || bestRatio <= 0) return
          setActiveId(bestId)
        },
        {
          rootMargin: '-20% 0px -55% 0px',
          threshold: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 1],
        },
      )

      for (const element of elements) {
        observer.observe(element)
      }

      return elements.length >= navSectionIds.length
    }

    bind()

    const mutationObserver = new MutationObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        bind()
      })
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      cancelAnimationFrame(frame)
      mutationObserver.disconnect()
      disconnect()
    }
  }, [items])

  return activeId
}
