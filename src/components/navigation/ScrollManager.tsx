import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { scrollToSectionId, scrollToTop } from '@/lib/scroll'
import { useLenis } from '@/providers/lenisContext'

/**
 * Handles route scroll restoration and hash deep-links with nav offset.
 */
export function ScrollManager() {
  const location = useLocation()
  const lenis = useLenis()
  const previousPathRef = useRef(location.pathname)

  useEffect(() => {
    if (!location.hash) return
    const sectionId = location.hash.replace('#', '')
    const timer = window.setTimeout(() => {
      void scrollToSectionId(sectionId, lenis)
    }, 80)
    return () => window.clearTimeout(timer)
  }, [location.hash, lenis])

  useEffect(() => {
    const pathChanged = previousPathRef.current !== location.pathname
    previousPathRef.current = location.pathname
    if (!pathChanged || location.hash) return
    scrollToTop(lenis)
  }, [location.pathname, location.hash, lenis])

  return null
}
