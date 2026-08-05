import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { cn } from '@/lib/cn'
import { scrollToSectionId } from '@/lib/scroll'
import { useLenis } from '@/providers/lenisContext'

type SectionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  sectionId: string
  href?: string
}

/**
 * In-page section link — hash scroll only, never path routes like `/experience`.
 */
export function SectionLink({
  sectionId,
  href,
  className,
  onClick,
  children,
  ...props
}: SectionLinkProps) {
  const lenis = useLenis()
  const navigate = useNavigate()
  const location = useLocation()
  // Absolute home + hash so a failed JS fallback never becomes `/sectionId`.
  const targetHref = href ?? `/#${sectionId}`

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Always stop document navigation first (SPA in-page scroll only).
    event.preventDefault()
    event.stopPropagation()

    onClick?.(event)

    const go = () => {
      void scrollToSectionId(sectionId, lenis)
    }

    if (location.pathname !== '/') {
      void navigate(
        { pathname: '/', hash: `#${sectionId}` },
        { replace: true },
      )
      window.setTimeout(go, 100)
      return
    }

    window.history.replaceState(null, '', `/#${sectionId}`)
    go()
  }

  return (
    <a
      href={targetHref}
      className={cn(className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  )
}
