import type { MouseEventHandler } from 'react'

import { Button, type ButtonProps } from '@/components/ui/Button'
import { useMagnetic } from '@/hooks/useMagnetic'
import { cn } from '@/lib/cn'

export type MagneticButtonProps = ButtonProps

/**
 * Button with subtle cursor magnetism on desktop.
 * Falls back to a normal button under reduced-motion preferences.
 */
export function MagneticButton({
  className,
  style,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const { ref, onMouseMove: magneticMove, onMouseLeave: magneticLeave } =
    useMagnetic<HTMLButtonElement>()

  const handleMove: MouseEventHandler<HTMLButtonElement> = (event) => {
    magneticMove(event)
    onMouseMove?.(event)
  }

  const handleLeave: MouseEventHandler<HTMLButtonElement> = (event) => {
    magneticLeave()
    onMouseLeave?.(event)
  }

  return (
    <Button
      ref={ref}
      className={cn('will-change-transform', className)}
      style={{ transition: 'transform 180ms ease', ...style }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    />
  )
}
