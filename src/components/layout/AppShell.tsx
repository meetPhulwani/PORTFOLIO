import { useCallback, useEffect, useState, type ReactNode } from 'react'

import { CustomCursor } from '@/components/effects/CustomCursor'
import { ScrollProgress } from '@/components/effects/ScrollProgress'
import { Footer } from '@/components/layout/Footer'
import { Loader } from '@/components/layout/Loader'
import { Navbar } from '@/components/navigation/Navbar'
import { ScrollManager } from '@/components/navigation/ScrollManager'
import { ScrollToTop } from '@/components/navigation/ScrollToTop'
import { TerminalMode } from '@/components/terminal'

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  if (target.isContentEditable) return true
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
}

export type AppShellProps = {
  children: ReactNode
}

/**
 * Global application chrome: overlays, navigation, outlet region, footer.
 * Primarily black canvas with very subtle deep-crimson depth (~10%).
 */
export function AppShell({ children }: AppShellProps) {
  const [loading, setLoading] = useState(true)
  const [terminalOpen, setTerminalOpen] = useState(false)

  const handleLoaderFinished = useCallback(() => {
    setLoading(false)
  }, [])

  const openTerminal = useCallback(() => {
    setTerminalOpen(true)
  }, [])

  const closeTerminal = useCallback(() => {
    setTerminalOpen(false)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const toggleChord =
        (event.ctrlKey || event.metaKey) &&
        !event.altKey &&
        (event.key === '`' || event.code === 'Backquote')

      if (toggleChord) {
        event.preventDefault()
        setTerminalOpen((current) => !current)
        return
      }

      if (event.key !== '~' || event.ctrlKey || event.metaKey || event.altKey) {
        return
      }

      // Optional easter egg — never steal `~` from form fields / open terminal input.
      if (isEditableTarget(event.target)) return

      event.preventDefault()
      setTerminalOpen(true)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="relative min-h-dvh text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-background"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_18%_0%,rgba(225,29,46,0.055),transparent_46%),radial-gradient(ellipse_at_88%_28%,rgba(90,8,16,0.11),transparent_52%),radial-gradient(ellipse_at_50%_100%,rgba(225,29,46,0.035),transparent_48%),radial-gradient(ellipse_at_70%_70%,rgba(255,255,255,0.015),transparent_40%)]"
      />

      <a href="#main" className="skip-link sr-only">
        Skip to content
      </a>

      <ScrollManager />
      <Loader onFinished={handleLoaderFinished} />
      <ScrollProgress hidden={loading} />
      <CustomCursor />
      <Navbar />

      <div className="relative z-0 pt-16 md:pt-20">{children}</div>

      <Footer onOpenTerminal={openTerminal} />
      <ScrollToTop />
      <TerminalMode open={terminalOpen} onClose={closeTerminal} />
    </div>
  )
}
