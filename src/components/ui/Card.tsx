import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

const cardVariants = cva(
  'rounded-[var(--radius-card)] border text-foreground backdrop-blur-md',
  {
    variants: {
      surface: {
        /** Dark grey glass — blends into the black canvas. */
        mist: 'border-white/[0.05] bg-white/[0.025] shadow-none',
        /** Near-black surface for section rhythm. */
        ink: 'border-white/[0.04] bg-black/55 shadow-none',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      interactive: {
        true: 'transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-white/[0.04] hover:shadow-[0_18px_44px_rgb(225_29_46/0.08)]',
        false: '',
      },
    },
    defaultVariants: {
      surface: 'mist',
      padding: 'md',
      interactive: false,
    },
  },
)

export type CardSurface = NonNullable<VariantProps<typeof cardVariants>['surface']>

export type CardProps = ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof cardVariants>

/** Soft surface card — mist glass or near-black ink, set per section. */
export function Card({
  surface,
  padding,
  interactive,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ surface, padding, interactive }), className)}
      {...props}
    />
  )
}
