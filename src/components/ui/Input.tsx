import { forwardRef, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean
}

/** Accessible text input using design tokens. */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, invalid = false, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          'h-12 w-full rounded-[var(--radius-md)] border bg-white/[0.025] px-4 font-sans text-sm text-foreground',
          'placeholder:text-muted transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:cursor-not-allowed disabled:opacity-40',
          invalid ? 'border-accent' : 'border-border hover:border-foreground/20',
          className,
        )}
        {...props}
      />
    )
  },
)
