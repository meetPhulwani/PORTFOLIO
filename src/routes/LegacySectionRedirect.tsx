import { Navigate, useParams } from 'react-router-dom'

import { SECTION_IDS } from '@/constants/sectionIds'

const SECTION_PATHS = new Set<string>(Object.values(SECTION_IDS))

/**
 * Maps mistaken path URLs (`/experience`, `/projects`, …) to home hash targets.
 * Keeps section nav as a single-page experience instead of 404.
 */
export function LegacySectionRedirect() {
  const { sectionId } = useParams()

  if (sectionId && SECTION_PATHS.has(sectionId)) {
    return (
      <Navigate to={{ pathname: '/', hash: `#${sectionId}` }} replace />
    )
  }

  return <Navigate to="/404" replace />
}
