import { useEffect, useState } from 'react'

/**
 * Tracks whether the Hero H1 (`#hero-heading`) is in view.
 * Used to show/hide the navbar brand without scroll listeners.
 */
export function useHeroTitleInView(): boolean {
  const [inView, setInView] = useState(true)

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    let frame = 0

    const bind = () => {
      const target = document.getElementById('hero-heading')
      if (!target) return false

      observer?.disconnect()
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return
          setInView(entry.isIntersecting)
        },
        {
          // Treat title as leaving once it crosses under the sticky navbar.
          rootMargin: '-72px 0px 0px 0px',
          threshold: [0, 0.15, 0.35],
        },
      )
      observer.observe(target)
      return true
    }

    if (!bind()) {
      const mutationObserver = new MutationObserver(() => {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => {
          if (bind()) mutationObserver.disconnect()
        })
      })
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      })
      return () => {
        cancelAnimationFrame(frame)
        mutationObserver.disconnect()
        observer?.disconnect()
      }
    }

    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
    }
  }, [])

  return inView
}
