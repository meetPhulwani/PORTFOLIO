import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

const dividerVariants = cva('border-0 bg-border', {
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

export type DividerProps = ComponentPropsWithoutRef<'hr'> &
  VariantProps<typeof dividerVariants>

/** Subtle hairline separator using the border token. */
export function Divider({ orientation, className, ...props }: DividerProps) {
  return (
    <hr
      role="separator"
      aria-orientation={orientation ?? 'horizontal'}
      className={cn(dividerVariants({ orientation }), className)}
      {...props}
    />
  )
}
