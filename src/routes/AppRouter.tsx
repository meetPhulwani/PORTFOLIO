import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { HomePage } from '@/pages/HomePage'
import { LegacySectionRedirect } from '@/routes/LegacySectionRedirect'

const NotFoundPage = lazy(async () => {
  const module = await import('@/pages/NotFoundPage')
  return { default: module.NotFoundPage }
})

/**
 * Application route table.
 * Home is the only portfolio surface; section paths redirect to `/#section`.
 */
export function AppRouter() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/:sectionId" element={<LegacySectionRedirect />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  )
}
