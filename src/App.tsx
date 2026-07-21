import { AppShell } from '@/components/layout/AppShell'
import { AppProviders } from '@/providers/AppProviders'
import { AppRouter } from '@/routes/AppRouter'

/** Application root — providers + global shell + routes. */
function App() {
  return (
    <AppProviders>
      <AppShell>
        <AppRouter />
      </AppShell>
    </AppProviders>
  )
}

export default App
