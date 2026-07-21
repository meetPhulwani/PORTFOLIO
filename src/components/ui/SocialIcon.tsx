import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type SocialIconProps = Omit<ComponentPropsWithoutRef<'a'>, 'children'> & {
  label: string
  icon: ReactNode
}

/**
 * Accessible social link icon button.
 * Requires a visible/accessible `label` (used as aria-label).
 */
export function SocialIcon({
  label,
  icon,
  className,
  target = '_blank',
  rel = 'noopener noreferrer',
  ...props
}: SocialIconProps) {
  return (
    <a
      aria-label={label}
      title={label}
      target={target}
      rel={rel}
      className={cn(
        'inline-flex size-11 items-center justify-center rounded-[var(--radius-md)]',
        'border border-white/[0.05] bg-white/[0.025] text-foreground',
        'transition-colors hover:border-accent hover:text-accent',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className="text-lg">
        {icon}
      </span>
    </a>
  )
}
