import type { Variants } from 'framer-motion'

import {
  blurReveal,
  counterReveal,
  fadeDown,
  fadeLeft,
  fadeRight,
  fadeUp,
  heroReveal,
  liftHover,
  magnetic,
  pageTransition,
  parallax,
  scaleIn,
  sectionHeadingAccent,
  sectionHeadingAccentReduced,
  sectionHeadingItem,
  sectionHeadingItemMobile,
  sectionHeadingItemReduced,
  sectionHeadingStagger,
  staggerContainer,
  staggerItem,
  timelineReveal,
  type VariantName,
} from './variants'
import { transitions, type TransitionPreset } from './transitions'

/**
 * Named animation presets for components.
 * Import from `@/animations` — never redefine the same motion inline.
 */
export const presets = {
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  blurReveal,
  heroReveal,
  liftHover,
  scaleIn,
  staggerContainer,
  staggerItem,
  pageTransition,
  counterReveal,
  timelineReveal,
  magnetic,
  parallax,
  sectionHeadingStagger,
  sectionHeadingItem,
  sectionHeadingItemMobile,
  sectionHeadingItemReduced,
  sectionHeadingAccent,
  sectionHeadingAccentReduced,
} as const

export function getVariant(name: VariantName): Variants {
  return presets[name]
}

export function getTransition(name: TransitionPreset) {
  return transitions[name]
}

export type { VariantName, TransitionPreset }
