/**
 * Corner radius tokens (spec range: 18–24px).
 */
export const radius = {
  md: '1.125rem', // 18px
  card: '1.25rem', // 20px
  lg: '1.5rem', // 24px
  full: '9999px',
} as const

export type RadiusToken = keyof typeof radius
