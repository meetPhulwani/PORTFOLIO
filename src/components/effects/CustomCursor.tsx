import { useEffect, useState } from 'react'

import { SHELL_FLAGS } from '@/constants/shell'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'
import { BREAKPOINTS } from '@/constants/breakpoints'

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, .cursor-hover'

export type CustomCursorProps = {
  enabled?: boolean
  className?: string
}

/**
 * Small elegant desktop cursor with hover scaling.
 * Hidden on touch / coarse pointers and when reduced motion is preferred.
 */
export function CustomCursor({
  enabled = SHELL_FLAGS.enableCustomCursor,
  className,
}: CustomCursorProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const isFinePointer = useMediaQuery('(pointer: fine)')
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`)
  const active =
    enabled && isFinePointer && isDesktop && !prefersReducedMotion

  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!active) {
      document.documentElement.classList.remove('has-custom-cursor')
      return
    }

    document.documentElement.classList.add('has-custom-cursor')

    let frameId = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const render = () => {
      currentX += (targetX - currentX) * 0.22
      currentY += (targetY - currentY) * 0.22
      setPosition({ x: currentX, y: currentY })
      frameId = requestAnimationFrame(render)
    }

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      setVisible(true)
    }

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      setHovering(Boolean(target?.closest(INTERACTIVE)))
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    frameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [active])

  if (!active) return null

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed top-0 left-0 z-[90] mix-blend-difference',
        'transition-opacity duration-200',
        visible ? 'opacity-100' : 'opacity-0',
        className,
      )}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div
        className={cn(
          '-translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground bg-foreground/10',
          'transition-[width,height,background-color] duration-200',
          hovering ? 'size-10 bg-foreground/20' : 'size-3',
        )}
      />
    </div>
  )
}
