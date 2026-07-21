import { useSyncExternalStore } from 'react'

function getServerSnapshot() {
  return false
}

/**
 * Subscribes to a CSS media query for responsive JS behavior (cursor, menus).
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia(query)
      mediaQuery.addEventListener('change', onStoreChange)
      return () => mediaQuery.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia(query).matches,
    getServerSnapshot,
  )
}
