import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { HomePage } from '@/pages/HomePage'

const NotFoundPage = lazy(async () => {
  const module = await import('@/pages/NotFoundPage')
  return { default: module.NotFoundPage }
})

/**
 * Application route table.
 * Home is eager; 404 is code-split. Case-study routes removed.
 */
export function AppRouter() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  )
}
