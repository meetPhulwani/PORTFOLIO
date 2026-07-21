import type { Variants } from 'framer-motion'

import { motion } from '@/theme'

import { transitions } from './transitions'

/** Reusable Framer Motion variants. Compose via presets — do not copy inline. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: motion.distance.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.reveal,
  },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -motion.distance.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.reveal,
  },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -motion.distance.md },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.reveal,
  },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: motion.distance.md },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.reveal,
  },
}

export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: motion.distance.sm },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: transitions.reveal,
  },
}

export const heroReveal: Variants = {
  hidden: { opacity: 0, y: motion.distance.lg, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: transitions.hero,
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.reveal,
  },
}

export const liftHover: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.01,
    transition: transitions.hover,
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: motion.distance.sm },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.fade,
  },
}

export const pageTransition: Variants = {
  initial: { opacity: 0, y: motion.distance.sm },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitions.page,
  },
  exit: {
    opacity: 0,
    y: -motion.distance.xs,
    transition: transitions.fade,
  },
}

/** Target offsets for magnetic / parallax consumers (applied via motion values). */
export const magnetic = {
  strength: 0.35,
  maxDistance: 40,
} as const

export const parallax = {
  slow: 0.15,
  medium: 0.35,
  fast: 0.55,
} as const

export const counterReveal: Variants = {
  hidden: { opacity: 0, y: motion.distance.sm, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: transitions.reveal,
  },
}

export const timelineReveal: Variants = {
  hidden: { opacity: 0, x: -motion.distance.sm },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.reveal,
  },
}

/** Stagger parent for section label → heading → description. */
export const sectionHeadingStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.02,
    },
  },
}

/** Premium section-heading entrance (desktop distances). */
export const sectionHeadingItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: motion.ease.out,
    },
  },
}

/** Slightly reduced travel for small screens. */
export const sectionHeadingItemMobile: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease: motion.ease.out,
    },
  },
}

/** prefers-reduced-motion: fade only. */
export const sectionHeadingItemReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: motion.ease.out,
    },
  },
}

/** Accent underline grows after the heading settles. */
export const sectionHeadingAccent: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: motion.ease.out,
      delay: 0.55,
    },
  },
}

export const sectionHeadingAccentReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: motion.ease.out,
      delay: 0.15,
    },
  },
}

export type VariantName =
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'blurReveal'
  | 'heroReveal'
  | 'scaleIn'
  | 'liftHover'
  | 'staggerContainer'
  | 'staggerItem'
  | 'pageTransition'
  | 'counterReveal'
  | 'timelineReveal'
  | 'sectionHeadingStagger'
  | 'sectionHeadingItem'
  | 'sectionHeadingItemMobile'
  | 'sectionHeadingItemReduced'
  | 'sectionHeadingAccent'
  | 'sectionHeadingAccentReduced'
