import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

import { cn } from '@/lib/cn'

const captionVariants = cva('font-sans tracking-wide', {
  variants: {
    tone: {
      default: 'text-foreground',
      muted: 'text-muted',
      accent: 'text-accent',
    },
    size: {
      md: 'text-sm',
      sm: 'text-xs',
    },
  },
  defaultVariants: {
    tone: 'muted',
    size: 'md',
  },
})

type CaptionOwnProps = VariantProps<typeof captionVariants> & {
  as?: ElementType
}

export type CaptionProps = CaptionOwnProps &
  Omit<ComponentPropsWithoutRef<'span'>, keyof CaptionOwnProps>

/** Small supporting labels, meta text, and overlines. */
export function Caption({
  as: Component = 'span',
  tone,
  size,
  className,
  ...props
}: CaptionProps) {
  return (
    <Component
      className={cn(captionVariants({ tone, size }), className)}
      {...props}
    />
  )
}
