import {
  useCallback,
  useRef,
  type MouseEvent,
  type RefObject,
} from 'react'

import { magnetic } from '@/animations'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type MagneticOptions = {
  strength?: number
  maxDistance?: number
}

type MagneticHandlers<T extends HTMLElement> = {
  ref: RefObject<T | null>
  onMouseMove: (event: MouseEvent<T>) => void
  onMouseLeave: () => void
}

/**
 * Applies a subtle magnetic translate toward the cursor (desktop interactions).
 * Disabled when the user prefers reduced motion.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(
  options: MagneticOptions = {},
): MagneticHandlers<T> {
  const {
    strength = magnetic.strength,
    maxDistance = magnetic.maxDistance,
  } = options

  const ref = useRef<T | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const onMouseMove = useCallback(
    (event: MouseEvent<T>) => {
      const node = ref.current
      if (!node || prefersReducedMotion) return

      const rect = node.getBoundingClientRect()
      const offsetX = event.clientX - (rect.left + rect.width / 2)
      const offsetY = event.clientY - (rect.top + rect.height / 2)

      const x = Math.max(-maxDistance, Math.min(maxDistance, offsetX * strength))
      const y = Math.max(-maxDistance, Math.min(maxDistance, offsetY * strength))

      node.style.transform = `translate3d(${x}px, ${y}px, 0)`
    },
    [maxDistance, prefersReducedMotion, strength],
  )

  const onMouseLeave = useCallback(() => {
    const node = ref.current
    if (!node) return
    node.style.transform = 'translate3d(0, 0, 0)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
