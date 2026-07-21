/**
 * Color tokens mirroring CSS variables in `styles/globals.css`.
 * Prefer Tailwind classes (`bg-background`, `text-accent`) in components.
 * Use these values when JS needs raw colors (motion, canvas, inline SVG).
 */
export const colors = {
  background: '#090909',
  secondary: '#0c0c0c',
  card: 'rgba(255,255,255,0.025)',
  foreground: '#FAFAFA',
  muted: '#A0A0A0',
  accent: '#E11D2E',
  success: '#22C55E',
  border: 'rgba(255,255,255,.06)',
} as const

export type ColorToken = keyof typeof colors
