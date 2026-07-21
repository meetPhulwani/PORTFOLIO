import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

import { cn } from '@/lib/cn'

const bodyTextVariants = cva('font-sans text-pretty leading-relaxed', {
  variants: {
    tone: {
      default: 'text-foreground',
      muted: 'text-muted',
    },
    size: {
      lg: 'text-lg md:text-xl',
      md: 'text-base md:text-lg',
      sm: 'text-sm md:text-base',
    },
  },
  defaultVariants: {
    tone: 'muted',
    size: 'md',
  },
})

type BodyTextOwnProps = VariantProps<typeof bodyTextVariants> & {
  as?: ElementType
}

export type BodyTextProps = BodyTextOwnProps &
  Omit<ComponentPropsWithoutRef<'p'>, keyof BodyTextOwnProps>

/** Body copy with muted/default tones for readable editorial paragraphs. */
export function BodyText({
  as: Component = 'p',
  tone,
  size,
  className,
  ...props
}: BodyTextProps) {
  return (
    <Component
      className={cn(bodyTextVariants({ tone, size }), className)}
      {...props}
    />
  )
}
