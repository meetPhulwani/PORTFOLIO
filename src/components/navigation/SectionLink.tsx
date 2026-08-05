import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { cn } from '@/lib/cn'
import { scrollToSectionId } from '@/lib/scroll'
import { useLenis } from '@/providers/lenisContext'

type SectionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  sectionId: string
}

/**
 * In-page section navigation only.
 * Uses same-document hash links (`#about`) — never path routes (`/about`).
 */
export function SectionLink({
  sectionId,
  className,
  onClick,
  children,
  ...props
}: SectionLinkProps) {
  const lenis = useLenis()
  const navigate = useNavigate()
  const location = useLocation()
  const hashHref = `#${sectionId}`

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Block native navigation / full reload before anything else.
    event.preventDefault()
    onClick?.(event)

    const scroll = () => {
      window.history.replaceState(null, '', `/${hashHref}`)
      void scrollToSectionId(sectionId, lenis)
    }

    // Off the home route (e.g. /404): return home, then scroll.
    if (location.pathname !== '/') {
      void navigate('/', { replace: true })
      window.setTimeout(scroll, 100)
      return
    }

    scroll()
  }

  return (
    <a
      {...props}
      href={hashHref}
      className={cn(className)}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
