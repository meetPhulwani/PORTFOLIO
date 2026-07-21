import type { LabelHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

/** Form label with consistent caption typography. */
export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'mb-2 block font-sans text-xs tracking-[0.16em] text-muted uppercase',
        className,
      )}
      {...props}
    />
  )
}
