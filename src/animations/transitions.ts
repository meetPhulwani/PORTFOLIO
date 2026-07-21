import type { Transition } from 'framer-motion'

import { motion } from '@/theme'

/** Shared transition primitives — never duplicate easing/duration ad hoc. */
export const transitions = {
  fade: {
    duration: motion.duration.base,
    ease: motion.ease.out,
  } satisfies Transition,

  reveal: {
    duration: motion.duration.slow,
    ease: motion.ease.out,
  } satisfies Transition,

  hero: {
    duration: motion.duration.slower,
    ease: motion.ease.out,
  } satisfies Transition,

  hover: {
    duration: motion.duration.fast,
    ease: motion.ease.inOut,
  } satisfies Transition,

  springSoft: motion.ease.springSoft satisfies Transition,

  springSnappy: motion.ease.springSnappy satisfies Transition,

  page: {
    duration: motion.duration.base,
    ease: motion.ease.inOut,
  } satisfies Transition,
} as const

export type TransitionPreset = keyof typeof transitions
