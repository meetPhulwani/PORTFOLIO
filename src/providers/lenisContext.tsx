import Lenis from 'lenis'
import { createContext, useContext } from 'react'

export const LenisContext = createContext<Lenis | null>(null)

/** Access the shared Lenis instance for scroll-to and progress consumers. */
export function useLenis(): Lenis | null {
  return useContext(LenisContext)
}
