import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

const gridVariants = cva('grid w-full', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4',
      asymmetric: 'grid-cols-1 lg:grid-cols-12',
    },
    gap: {
      sm: 'gap-4',
      md: 'gap-6 md:gap-8',
      lg: 'gap-8 md:gap-12',
    },
  },
  defaultVariants: {
    cols: 2,
    gap: 'md',
  },
})

export type GridProps = ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof gridVariants>

/** Responsive grid helper for editorial / asymmetric compositions. */
export function Grid({ cols, gap, className, ...props }: GridProps) {
  return <div className={cn(gridVariants({ cols, gap }), className)} {...props} />
}
