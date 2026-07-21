import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

type MotionProviderProps = {
  children: ReactNode
}

/**
 * Global Framer Motion configuration.
 * `reducedMotion="user"` honors OS/browser accessibility preferences.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
