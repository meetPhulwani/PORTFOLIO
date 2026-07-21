import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { scrollToSectionId } from '@/lib/scroll'
import { cn } from '@/lib/cn'
import { useLenis } from '@/providers/lenisContext'

type SectionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  sectionId: string
  href?: string
}

/**
 * In-page section link with sticky-nav offset and cross-route support.
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
  const targetHref = href ?? `/#${sectionId}`

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    event.preventDefault()

    const go = () => scrollToSectionId(sectionId, lenis)

    if (location.pathname !== '/') {
      void navigate(`/#${sectionId}`)
      window.setTimeout(go, 80)
      return
    }

    go()
    window.history.replaceState(null, '', `/#${sectionId}`)
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
