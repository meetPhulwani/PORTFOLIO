import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

const pillVariants = cva(
  'inline-flex items-center rounded-[var(--radius-md)] border border-white/[0.05] bg-white/[0.025] px-3 py-1 font-sans text-xs text-muted',
  {
    variants: {
      interactive: {
        true: 'cursor-pointer transition-colors hover:border-foreground/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        false: '',
      },
    },
    defaultVariants: {
      interactive: false,
    },
  },
)

export type PillProps = ComponentPropsWithoutRef<'span'> &
  VariantProps<typeof pillVariants>

/** Tech tag / filter chip. Set `interactive` for clickable filters. */
export function Pill({ interactive, className, ...props }: PillProps) {
  return (
    <span className={cn(pillVariants({ interactive }), className)} {...props} />
  )
}
