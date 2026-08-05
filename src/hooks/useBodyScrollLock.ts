import { useEffect } from 'react'

import { useLenis } from '@/providers/lenisContext'

/**
 * Locks document scroll while `locked` is true (mobile menu / terminal).
 * Stops Lenis and blocks touchmove so the page cannot scroll under overlays.
 */
export function useBodyScrollLock(locked: boolean): void {
  const lenis = useLenis()

  useEffect(() => {
    if (!locked) return

    const { body, documentElement } = document
    const scrollY = window.scrollY
    const previous = {
      bodyOverflow: body.style.overflow,
      htmlOverflow: documentElement.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
    }
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth

    lenis?.stop()

    body.style.overflow = 'hidden'
    documentElement.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }

    // Native iOS / reduced-motion path — Lenis already owns scroll when present.
    if (!lenis) {
      body.style.position = 'fixed'
      body.style.top = `-${scrollY}px`
      body.style.width = '100%'
    }

    const preventTouch = (event: TouchEvent) => {
      const target = event.target
      if (
        target instanceof Element &&
        target.closest('[data-scroll-lock-allow]')
      ) {
        return
      }
      event.preventDefault()
    }

    document.addEventListener('touchmove', preventTouch, { passive: false })

    return () => {
      document.removeEventListener('touchmove', preventTouch)

      body.style.overflow = previous.bodyOverflow
      documentElement.style.overflow = previous.htmlOverflow
      body.style.position = previous.bodyPosition
      body.style.top = previous.bodyTop
      body.style.width = previous.bodyWidth
      body.style.paddingRight = previous.bodyPaddingRight

      if (lenis) {
        lenis.start()
      } else {
        window.scrollTo(0, scrollY)
      }
    }
  }, [locked, lenis])
}
