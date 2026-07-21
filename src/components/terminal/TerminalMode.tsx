import { AnimatePresence, motion } from 'framer-motion'
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { createPortal } from 'react-dom'

import { terminalContent } from '@/data/terminal'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { cn } from '@/lib/cn'
import {
  runTerminalCommand,
  scrollToContact,
} from '@/lib/terminalCommands'
import { useLenis } from '@/providers/lenisContext'

export type TerminalModeProps = {
  open: boolean
  onClose: () => void
}

type OutputBlock = {
  id: string
  kind: 'system' | 'command' | 'result'
  lines: string[]
}

function welcomeBlocks(seed: string): OutputBlock[] {
  return [
    {
      id: `${seed}-welcome`,
      kind: 'system',
      lines: [...terminalContent.welcome],
    },
  ]
}

/**
 * Hidden easter-egg terminal modal — optional overlay; does not replace the portfolio.
 */
export function TerminalMode({ open, onClose }: TerminalModeProps) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  const [blocks, setBlocks] = useState<OutputBlock[]>(() => welcomeBlocks('init'))
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [draft, setDraft] = useState('')
  const sessionRef = useRef(0)

  useBodyScrollLock(open)
  useFocusTrap(panelRef, open)

  useEffect(() => {
    if (!open) return
    sessionRef.current += 1
    setBlocks(welcomeBlocks(String(sessionRef.current)))
    setValue('')
    setHistoryIndex(-1)
    setDraft('')
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => {
    const node = scrollerRef.current
    if (!node) return
    node.scrollTop = node.scrollHeight
  }, [blocks, value, open])

  const execute = useCallback(
    (raw: string) => {
      const trimmed = raw.trim()
      const commandLine = `${terminalContent.prompt} ${raw}`

      if (trimmed) {
        setHistory((prev) => {
          if (prev[prev.length - 1] === trimmed) return prev
          return [...prev, trimmed]
        })
      }
      setHistoryIndex(-1)
      setDraft('')
      setValue('')

      const action = runTerminalCommand(raw)

      if (action.type === 'clear') {
        setBlocks([])
        return
      }

      if (action.type === 'exit') {
        setBlocks((prev) => [
          ...prev,
          { id: `${Date.now()}-cmd`, kind: 'command', lines: [commandLine] },
          {
            id: `${Date.now()}-exit`,
            kind: 'result',
            lines: [terminalContent.exitMessage],
          },
        ])
        window.setTimeout(() => onClose(), 120)
        return
      }

      if (action.type === 'contact') {
        setBlocks((prev) => [
          ...prev,
          { id: `${Date.now()}-cmd`, kind: 'command', lines: [commandLine] },
          {
            id: `${Date.now()}-contact`,
            kind: 'result',
            lines: [terminalContent.contactScrolling],
          },
        ])
        window.setTimeout(() => {
          onClose()
          window.setTimeout(() => scrollToContact(lenis), 80)
        }, 100)
        return
      }

      setBlocks((prev) => {
        const next: OutputBlock[] = [
          ...prev,
          { id: `${Date.now()}-cmd`, kind: 'command', lines: [commandLine] },
        ]
        if (action.lines.length > 0) {
          next.push({
            id: `${Date.now()}-out`,
            kind: 'result',
            lines: action.lines,
          })
        }
        return next
      })
    },
    [lenis, onClose],
  )

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    execute(value)
  }

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (history.length === 0) return
      const nextIndex =
        historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      if (historyIndex === -1) setDraft(value)
      setHistoryIndex(nextIndex)
      setValue(history[nextIndex] ?? '')
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex === -1) return
      if (historyIndex >= history.length - 1) {
        setHistoryIndex(-1)
        setValue(draft)
        return
      }
      const nextIndex = historyIndex + 1
      setHistoryIndex(nextIndex)
      setValue(history[nextIndex] ?? '')
    }
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <button
            type="button"
            aria-label="Close terminal"
            className="absolute inset-0 bg-black/55 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={cn(
              'relative z-10 flex w-full max-w-3xl flex-col overflow-hidden',
              'rounded-xl border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.65)]',
              'font-mono text-[13px] leading-relaxed text-zinc-200 sm:text-sm',
              'max-h-[min(78dvh,640px)]',
            )}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p
                  id={titleId}
                  className="truncate text-sm font-medium tracking-wide text-zinc-100"
                >
                  {terminalContent.title}
                </p>
                <p className="mt-0.5 text-xs text-emerald-500/90">
                  {terminalContent.status}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-zinc-400 transition-colors hover:border-white/20 hover:text-zinc-200"
              >
                Esc
              </button>
            </header>

            <div
              ref={scrollerRef}
              className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5"
              aria-live="polite"
              aria-relevant="additions"
            >
              {blocks.map((block) => (
                <div
                  key={block.id}
                  className={cn(
                    'whitespace-pre-wrap break-words',
                    block.kind === 'command' && 'mt-3 text-zinc-100',
                    block.kind === 'result' && 'mt-1 text-zinc-300',
                    block.kind === 'system' && 'text-zinc-400',
                  )}
                >
                  {block.lines.map((line, index) => (
                    <div key={`${block.id}-${index}`}>
                      {line.length === 0 ? '\u00A0' : line}
                    </div>
                  ))}
                </div>
              ))}

              <form
                onSubmit={onSubmit}
                className="mt-3 flex items-center gap-2"
                aria-label="Terminal command input"
              >
                <span className="select-none text-accent" aria-hidden="true">
                  {terminalContent.prompt}
                </span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(event) => {
                    setValue(event.target.value)
                    if (historyIndex !== -1) {
                      setHistoryIndex(-1)
                      setDraft(event.target.value)
                    }
                  }}
                  onKeyDown={onInputKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  aria-label="Command"
                  className="terminal-input min-w-0 flex-1 bg-transparent text-zinc-100 outline-none placeholder:text-zinc-600"
                  placeholder="Type a command…"
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
