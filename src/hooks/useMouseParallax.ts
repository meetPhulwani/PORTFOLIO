import { useEffect, useState, type RefObject } from 'react'

import { parallax } from '@/animations'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { BREAKPOINTS } from '@/constants/breakpoints'

type ParallaxOffset = {
  x: number
  y: number
}

/**
 * Desktop mouse parallax offsets normalized roughly to +/-strength range.
 * Disabled on touch, small viewports, and reduced-motion preferences.
 */
export function useMouseParallax(
  containerRef: RefObject<HTMLElement | null>,
  strength: number = parallax.medium,
): ParallaxOffset {
  const prefersReducedMotion = usePrefersReducedMotion()
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`)
  const isFinePointer = useMediaQuery('(pointer: fine)')
  const enabled = isDesktop && isFinePointer && !prefersReducedMotion

  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) {
      return
    }

    const node = containerRef.current
    if (!node) return

    let frameId = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const render = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      setOffset({ x: currentX, y: currentY })
      frameId = requestAnimationFrame(render)
    }

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      const relX = (event.clientX - rect.left) / rect.width - 0.5
      const relY = (event.clientY - rect.top) / rect.height - 0.5
      targetX = relX * 40 * strength
      targetY = relY * 28 * strength
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
    }

    node.addEventListener('mousemove', onMove, { passive: true })
    node.addEventListener('mouseleave', onLeave)
    frameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frameId)
      node.removeEventListener('mousemove', onMove)
      node.removeEventListener('mouseleave', onLeave)
    }
  }, [containerRef, enabled, strength])

  if (!enabled) {
    return { x: 0, y: 0 }
  }

  return offset
}