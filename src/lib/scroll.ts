import type Lenis from 'lenis'

/**
 * Sticky nav offset for in-page targeting.
 * Matches `h-16` / `md:h-20` plus a small breathing gap.
 */
export const SECTION_SCROLL_OFFSET = -96

/**
 * Smoothly scrolls to a section id, preferring Lenis when available.
 */
export async function scrollToSectionId(
  sectionId: string,
  lenis: Lenis | null,
  offset: number = SECTION_SCROLL_OFFSET,
): Promise<void> {
  const target = document.getElementById(sectionId)
  if (!target) return

  if (lenis) {
    lenis.start()
    lenis.scrollTo(target, { offset, duration: 1.15 })
    return
  }

  const top = target.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: 'smooth' })
}

/** Scrolls to the top of the document. */
export function scrollToTop(lenis: Lenis | null): void {
  if (lenis) {
    lenis.start()
    lenis.scrollTo(0, { duration: 1.1 })
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
