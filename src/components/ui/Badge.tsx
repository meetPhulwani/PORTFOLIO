import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-[var(--radius-md)] border px-3 py-1.5 font-sans text-xs font-medium tracking-wide',
  {
    variants: {
      tone: {
        accent: 'border-accent/40 bg-accent/10 text-accent',
        success: 'border-success/40 bg-success/10 text-success',
        muted: 'border-border bg-card text-muted',
        solid: 'border-transparent bg-accent text-foreground',
      },
    },
    defaultVariants: {
      tone: 'accent',
    },
  },
)

export type BadgeProps = ComponentPropsWithoutRef<'span'> &
  VariantProps<typeof badgeVariants>

/** Compact status / availability indicator. */
export function Badge({ tone, className, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />
}
