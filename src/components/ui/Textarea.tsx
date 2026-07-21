import { forwardRef, type TextareaHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean
}

/** Accessible multiline input using design tokens. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, invalid = false, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          'min-h-36 w-full resize-y rounded-[var(--radius-md)] border bg-white/[0.025] px-4 py-3 font-sans text-sm text-foreground',
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
