/**
 * Motion timing tokens shared by Framer Motion presets and CSS transitions.
 * Keep animations smooth and restrained (Apple / Framer feel).
 */
export const motion = {
  duration: {
    instant: 0.12,
    fast: 0.2,
    base: 0.4,
    slow: 0.7,
    slower: 1.1,
  },
  ease: {
    /** Soft deceleration for entrances */
    out: [0.16, 1, 0.3, 1] as const,
    /** Balanced for hover / micro-interactions */
    inOut: [0.45, 0, 0.55, 1] as const,
    /** Snappy lift */
    springSoft: { type: 'spring', stiffness: 260, damping: 24 } as const,
    springSnappy: { type: 'spring', stiffness: 380, damping: 28 } as const,
  },
  distance: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 40,
  },
} as const
