import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

import { cn } from '@/lib/cn'

const containerVariants = cva('mx-auto w-full px-[var(--spacing-container-x)] md:px-6 lg:px-8', {
  variants: {
    size: {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-none',
    },
  },
  defaultVariants: {
    size: 'xl',
  },
})

type ContainerOwnProps = VariantProps<typeof containerVariants> & {
  as?: ElementType
}

export type ContainerProps = ContainerOwnProps &
  Omit<ComponentPropsWithoutRef<'div'>, keyof ContainerOwnProps>

/** Horizontal page gutter + max-width constraint for editorial layouts. */
export function Container({
  as: Component = 'div',
  size,
  className,
  ...props
}: ContainerProps) {
  return (
    <Component className={cn(containerVariants({ size }), className)} {...props} />
  )
}
