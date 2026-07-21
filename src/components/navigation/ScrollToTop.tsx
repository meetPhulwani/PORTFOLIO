import { AnimatePresence, motion } from 'framer-motion'
import { HiArrowUp } from 'react-icons/hi2'

import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/lib/cn'
import { scrollToTop } from '@/lib/scroll'
import { useLenis } from '@/providers/lenisContext'

export type ScrollToTopProps = {
  threshold?: number
  className?: string
}

/** Circular floating control — fades in after scroll, smooth return to top. */
export function ScrollToTop({ threshold = 0.08, className }: ScrollToTopProps) {
  const progress = useScrollProgress()
  const lenis = useLenis()
  const visible = progress > threshold

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => scrollToTop(lenis)}
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.92 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className={cn(
            'fixed right-4 bottom-4 z-50 inline-flex size-12 items-center justify-center',
            'rounded-full border border-white/[0.05] bg-white/[0.025] text-foreground shadow-[var(--shadow-soft)]',
            'backdrop-blur-md transition-colors hover:border-accent/50 hover:bg-white/[0.04] hover:text-accent',
            'focus-visible:outline-none md:right-8 md:bottom-8',
            className,
          )}
        >
          <HiArrowUp aria-hidden="true" className="size-5" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}
