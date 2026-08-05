import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { cn } from '@/lib/cn'
import { scrollToSectionId } from '@/lib/scroll'
import { useLenis } from '@/providers/lenisContext'

type SectionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  sectionId: string
}

/**
 * SPA in-page nav: prevent route changes, smooth-scroll to `#sectionId`.
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

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onClick?.(event)

    const run = () => {
      window.history.replaceState(null, '', `/#${sectionId}`)
      void scrollToSectionId(sectionId, lenis)
    }

    if (location.pathname !== '/') {
      void navigate('/', { replace: true })
      window.setTimeout(run, 120)
      return
    }

    // Let mobile menu unlock / Lenis restart before scrolling when closing overlay.
    window.setTimeout(run, 0)
  }

  return (
    <a
      {...props}
      href={`#${sectionId}`}
      className={cn(className)}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
