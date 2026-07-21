import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/lib/cn'

export type ScrollProgressProps = {
  hidden?: boolean
  className?: string
}

/** Thin GPU-friendly top progress bar using the accent token. */
export function ScrollProgress({ hidden = false, className }: ScrollProgressProps) {
  const progress = useScrollProgress()

  if (hidden) return null

  return (
    <div
      className={cn(
        'pointer-events-none fixed top-0 right-0 left-0 z-[60] h-[2px] bg-transparent',
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-accent will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
