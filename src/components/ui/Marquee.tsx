import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

export type MarqueeProps = {
  items: string[]
  className?: string
  speedSeconds?: number
}

/**
 * Infinite horizontal tech marquee on the shared page background.
 * Separated by borders — not a contrasting band.
 */
export function Marquee({
  items,
  className,
  speedSeconds = 28,
}: MarqueeProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const track = [...items, ...items]

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          'relative overflow-hidden border-y border-border bg-transparent py-5',
          className,
        )}
        aria-label="Technologies"
      >
        <ul className="m-0 flex list-none flex-wrap justify-center gap-x-8 gap-y-3 px-6 p-0">
          {items.map((item) => (
            <li
              key={item}
              className="font-display text-xl tracking-[0.18em] text-foreground/70 md:text-2xl"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden border-y border-border bg-transparent py-5',
        className,
      )}
      aria-label="Technologies"
    >
      <p className="sr-only">{items.join(', ')}</p>
      <div
        className="flex w-max gap-10 whitespace-nowrap will-change-transform"
        style={{
          animation: `marquee-scroll ${speedSeconds}s linear infinite`,
        }}
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="font-display text-2xl tracking-[0.18em] text-foreground/70 md:text-3xl"
            aria-hidden="true"
          >
            {item}
            <span className="ml-10 text-accent">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}
