import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

import { presets } from '@/animations/presets'
import { staggerContainer, type VariantName } from '@/animations'
import { cn } from '@/lib/cn'

type RevealPreset = Extract<
  VariantName,
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'blurReveal'
  | 'scaleIn'
  | 'staggerContainer'
  | 'timelineReveal'
>

type RevealProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode
  /** Named preset from the shared animation system. */
  preset?: RevealPreset
  className?: string
  once?: boolean
  amount?: number
}

/**
 * Scroll-triggered reveal using centralized motion presets.
 * Prefer this over redefining whileInView variants in sections.
 */
export function Reveal({
  children,
  preset = 'fadeUp',
  className,
  once = true,
  amount = 0.25,
  ...props
}: RevealProps) {
  const variants =
    preset === 'staggerContainer' ? staggerContainer : presets[preset]

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/** Stagger parent — children should use `variants={staggerItem}`. */
export function RevealStagger({
  children,
  className,
  once = true,
  amount = 0.2,
  ...props
}: Omit<RevealProps, 'preset'>) {
  return (
    <motion.div
      className={cn(className)}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
