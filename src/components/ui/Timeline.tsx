import type { ReactNode } from 'react'

import { BodyText } from '@/components/typography/BodyText'
import { Caption } from '@/components/typography/Caption'
import { SubHeading } from '@/components/typography/SubHeading'
import type { CardSurface } from '@/components/ui/Card'
import { cn } from '@/lib/cn'

export type TimelineItem = {
  id: string
  title: string
  subtitle: string
  period: string
  description?: string
  meta?: ReactNode
}

export type TimelineProps = {
  items: TimelineItem[]
  /** Shared surface for every entry in this timeline (section-level). */
  surface?: CardSurface
  className?: string
}

/** Vertical editorial timeline for experience / education entries. */
export function Timeline({
  items,
  surface = 'ink',
  className,
}: TimelineProps) {
  return (
    <ol
      className={cn(
        'relative m-0 list-none space-y-10 p-0',
        'before:absolute before:top-2 before:bottom-2 before:left-[0.4rem] before:w-px before:bg-border',
        'md:before:left-1/2 md:before:-translate-x-1/2',
        className,
      )}
    >
      {items.map((item, index) => {
        const isEven = index % 2 === 0

        return (
          <li
            key={item.id}
            className="relative grid gap-4 md:grid-cols-2 md:gap-10"
          >
            <span
              aria-hidden="true"
              className="absolute top-3 left-0 size-3 rounded-full border border-accent bg-background md:left-1/2 md:-translate-x-1/2"
            />
            <div
              className={cn(
                'rounded-[var(--radius-card)] border p-4 pl-8 backdrop-blur-md transition-[transform,border-color,background-color,box-shadow] duration-300 md:p-5',
                surface === 'mist'
                  ? 'border-white/[0.05] bg-white/[0.025]'
                  : 'border-white/[0.04] bg-black/55',
                'hover:-translate-y-1 hover:border-accent/30 hover:bg-white/[0.04] hover:shadow-[0_18px_44px_rgb(225_29_46/0.08)]',
                isEven
                  ? 'md:pr-12 md:pl-5 md:text-right'
                  : 'md:col-start-2 md:pl-12',
              )}
            >
              <Caption tone="accent" className="uppercase tracking-[0.18em]">
                {item.period}
              </Caption>
              <SubHeading className="mt-2">{item.title}</SubHeading>
              <BodyText size="sm" className="mt-1">
                {item.subtitle}
              </BodyText>
              {item.description ? (
                <BodyText size="sm" className="mt-3">
                  {item.description}
                </BodyText>
              ) : null}
              {item.meta ? <div className="mt-4">{item.meta}</div> : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
