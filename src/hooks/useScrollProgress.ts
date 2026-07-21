import { useEffect, useState } from 'react'

import { useLenis } from '@/providers/lenisContext'

/**
 * Returns 0–1 document scroll progress. Prefers Lenis when available.
 */
export function useScrollProgress(): number {
  const lenis = useLenis()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateFromWindow = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }

    if (!lenis) {
      const frameId = requestAnimationFrame(updateFromWindow)
      window.addEventListener('scroll', updateFromWindow, { passive: true })
      window.addEventListener('resize', updateFromWindow)
      return () => {
        cancelAnimationFrame(frameId)
        window.removeEventListener('scroll', updateFromWindow)
        window.removeEventListener('resize', updateFromWindow)
      }
    }

    const onScroll = () => {
      const limit = lenis.limit || 1
      setProgress(Math.min(1, Math.max(0, lenis.scroll / limit)))
    }

    const frameId = requestAnimationFrame(onScroll)
    lenis.on('scroll', onScroll)
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frameId)
      lenis.off('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [lenis])

  return progress
}
