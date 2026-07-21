import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

import { cn } from '@/lib/cn'

const subHeadingVariants = cva(
  'font-sans font-medium tracking-tight text-foreground text-pretty',
  {
    variants: {
      size: {
        lg: 'text-2xl md:text-3xl',
        md: 'text-xl md:text-2xl',
        sm: 'text-lg md:text-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

type SubHeadingOwnProps = VariantProps<typeof subHeadingVariants> & {
  as?: ElementType
}

export type SubHeadingProps = SubHeadingOwnProps &
  Omit<ComponentPropsWithoutRef<'h3'>, keyof SubHeadingOwnProps>

/** Secondary heading for section intros and card titles. */
export function SubHeading({
  as: Component = 'h3',
  size,
  className,
  ...props
}: SubHeadingProps) {
  return (
    <Component
      className={cn(subHeadingVariants({ size }), className)}
      {...props}
    />
  )
}
