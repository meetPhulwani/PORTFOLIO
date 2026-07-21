import { useEffect, useRef, useState, type RefObject } from 'react'

type UseInViewOnceOptions = {
  rootMargin?: string
  threshold?: number
}

/**
 * Fires once when the element enters the viewport — ideal for counters and reveals.
 */
export function useInViewOnce<T extends HTMLElement = HTMLElement>(
  options: UseInViewOnceOptions = {},
): { ref: RefObject<T | null>; inView: boolean } {
  const { rootMargin = '0px 0px -10% 0px', threshold = 0.25 } = options
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [inView, rootMargin, threshold])

  return { ref, inView }
}
