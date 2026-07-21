import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

export type GlassCardProps = ComponentPropsWithoutRef<'div'>

/** Subtle glass surface — use sparingly where depth helps hierarchy. */
export function GlassCard({ className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-card)] border border-border',
        'bg-card/55 text-foreground backdrop-blur-md',
        'shadow-[var(--shadow-soft)]',
        className,
      )}
      {...props}
    />
  )
}
