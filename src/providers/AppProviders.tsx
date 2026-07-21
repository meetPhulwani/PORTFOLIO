import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { MotionProvider } from '@/providers/MotionProvider'
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider'

type AppProvidersProps = {
  children: ReactNode
}

/**
 * Root provider composition.
 * Order: Router → Motion → Lenis.
 * Reserved slots for future ThemeProvider / AnalyticsProvider wrappers.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      {/* Future: ThemeProvider */}
      <MotionProvider>
        <SmoothScrollProvider>
          {/* Future: AnalyticsProvider */}
          {children}
        </SmoothScrollProvider>
      </MotionProvider>
    </BrowserRouter>
  )
}
