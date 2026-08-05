import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { SECTION_IDS } from '@/constants/sectionIds'
import { HomePage } from '@/pages/HomePage'

const SECTION_PATHS = new Set<string>(Object.values(SECTION_IDS))

/**
 * Safety net for mistaken path URLs (`/experience`, `/projects`, …).
 * Keeps the home page mounted and rewrites to a hash target — no blank route.
 */
export function LegacySectionRedirect() {
  const { sectionId } = useParams()
  const navigate = useNavigate()
  const valid = Boolean(sectionId && SECTION_PATHS.has(sectionId))

  useEffect(() => {
    if (!sectionId || !SECTION_PATHS.has(sectionId)) return
    void navigate({ pathname: '/', hash: `#${sectionId}` }, { replace: true })
  }, [navigate, sectionId])

  if (!valid) {
    return <Navigate to="/404" replace />
  }

  return <HomePage />
}
