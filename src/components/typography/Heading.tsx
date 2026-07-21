import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

import { cn } from '@/lib/cn'

const headingVariants = cva(
  'font-display uppercase tracking-[0.04em] text-foreground text-balance',
  {
    variants: {
      size: {
        xl: 'text-5xl md:text-7xl lg:text-8xl',
        lg: 'text-4xl md:text-6xl lg:text-7xl',
        md: 'text-3xl md:text-5xl',
        sm: 'text-2xl md:text-4xl',
        giant:
          'pointer-events-none select-none text-[clamp(4.5rem,18vw,14rem)] leading-none text-foreground/8',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
)

type HeadingOwnProps = VariantProps<typeof headingVariants> & {
  as?: ElementType
}

export type HeadingProps = HeadingOwnProps &
  Omit<ComponentPropsWithoutRef<'h2'>, keyof HeadingOwnProps>

/** Display heading (Bebas Neue). Use `giant` for low-opacity background words. */
export function Heading({
  as: Component = 'h2',
  size,
  className,
  ...props
}: HeadingProps) {
  return (
    <Component className={cn(headingVariants({ size }), className)} {...props} />
  )
}
