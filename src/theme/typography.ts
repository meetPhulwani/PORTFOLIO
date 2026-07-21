/**
 * Typography tokens — display (Bebas Neue) + body (Inter).
 */
export const typography = {
  fonts: {
    display: '"Bebas Neue", ui-sans-serif, system-ui, sans-serif',
    sans: 'Inter, ui-sans-serif, system-ui, sans-serif',
  },
  /** Background editorial words (PORTFOLIO, etc.) */
  displayGiantOpacity: 0.08,
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const

export type FontToken = keyof typeof typography.fonts
