import Lenis from 'lenis'
import { useEffect, useState, type ReactNode } from 'react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { LenisContext } from '@/providers/lenisContext'

type SmoothScrollProviderProps = {
  children: ReactNode
}

/**
 * Initializes Lenis smooth scrolling for the document.
 * Disabled when the user prefers reduced motion.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const instance = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    let frameId = 0
    const raf = (time: number) => {
      instance.raf(time)
      frameId = requestAnimationFrame(raf)
    }

    frameId = requestAnimationFrame(raf)

    const settleId = window.setTimeout(() => {
      setLenis(instance)
    }, 0)

    return () => {
      window.clearTimeout(settleId)
      cancelAnimationFrame(frameId)
      instance.destroy()
      setLenis(null)
    }
  }, [prefersReducedMotion])

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  )
}
