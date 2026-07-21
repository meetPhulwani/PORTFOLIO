import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

const sectionVariants = cva('relative w-full bg-transparent', {
  variants: {
    tone: {
      /** Transparent — sits on the fixed global canvas. */
      default: '',
      secondary: '',
      transparent: '',
    },
    spacing: {
      none: 'py-0',
      sm: 'py-[var(--spacing-section-sm)]',
      md: 'py-[var(--spacing-section-md)]',
      lg: 'py-[var(--spacing-section-lg)]',
    },
  },
  defaultVariants: {
    tone: 'default',
    spacing: 'md',
  },
})

export type SectionProps = ComponentPropsWithoutRef<'section'> &
  VariantProps<typeof sectionVariants>

/** Vertical section rhythm — no per-section background fills. */
export function Section({
  tone,
  spacing,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(sectionVariants({ tone, spacing }), className)} {...props}>
      {children}
    </section>
  )
}
