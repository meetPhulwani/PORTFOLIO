import {
  buttonVariants,
  type ButtonVariantProps,
} from '@/components/ui/buttonVariants'
import { cn } from '@/lib/cn'

type ProjectActionsProps = {
  githubUrl: string | null
  liveUrl: string | null
  size?: ButtonVariantProps['size']
  githubVariant?: ButtonVariantProps['variant']
  liveVariant?: ButtonVariantProps['variant']
  /** When true and liveUrl exists, Live Demo renders before GitHub. */
  prioritizeLive?: boolean
  className?: string
}

/**
 * Shared project CTAs — Live Demo only when a real URL exists.
 */
export function ProjectActions({
  githubUrl,
  liveUrl,
  size = 'sm',
  githubVariant = 'secondary',
  liveVariant = 'outline',
  prioritizeLive = false,
  className,
}: ProjectActionsProps) {
  const githubButton = githubUrl ? (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant: githubVariant, size }))}
    >
      GitHub
    </a>
  ) : null

  const liveButton = liveUrl ? (
    <a
      href={liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant: liveVariant, size }))}
    >
      Live Demo
    </a>
  ) : null

  if (!githubButton && !liveButton) return null

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {prioritizeLive && liveButton}
      {githubButton}
      {!prioritizeLive && liveButton}
    </div>
  )
}
