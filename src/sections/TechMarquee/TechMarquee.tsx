import { Marquee } from '@/components/ui/Marquee'
import { technologies } from '@/data/technologies'
import { cn } from '@/lib/cn'

type TechMarqueeProps = {
  className?: string
}

/**
 * Full-bleed infinite technology strip on the shared canvas.
 */
export function TechMarquee({ className }: TechMarqueeProps) {
  return (
    <div className={cn('relative bg-transparent', className)} aria-label="Technology marquee">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-28"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-28"
      />
      <Marquee
        items={[...technologies]}
        speedSeconds={32}
        className="border-border py-6 md:py-8"
      />
    </div>
  )
}
