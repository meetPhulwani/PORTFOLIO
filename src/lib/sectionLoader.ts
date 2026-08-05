type SectionEnsureFn = () => Promise<HTMLElement | null>

const loaders = new Map<string, SectionEnsureFn>()

/**
 * Registers a lazy section so nav can force-mount it before scrolling.
 */
export function registerSectionLoader(
  sectionId: string,
  ensure: SectionEnsureFn,
): () => void {
  loaders.set(sectionId, ensure)
  return () => {
    if (loaders.get(sectionId) === ensure) {
      loaders.delete(sectionId)
    }
  }
}

function waitForElement(
  sectionId: string,
  timeoutMs: number,
): Promise<HTMLElement | null> {
  const existing = document.getElementById(sectionId)
  if (existing) return Promise.resolve(existing)

  return new Promise((resolve) => {
    const started = performance.now()

    const tick = () => {
      const node = document.getElementById(sectionId)
      if (node) {
        resolve(node)
        return
      }
      if (performance.now() - started >= timeoutMs) {
        resolve(null)
        return
      }
      window.requestAnimationFrame(tick)
    }

    tick()
  })
}

/**
 * Returns a mounted section element, force-loading lazy sections when needed.
 */
export async function ensureSectionElement(
  sectionId: string,
  timeoutMs = 4500,
): Promise<HTMLElement | null> {
  const existing = document.getElementById(sectionId)
  if (existing) return existing

  const ensure = loaders.get(sectionId)
  if (ensure) {
    const loaded = await ensure()
    if (loaded) return loaded
  }

  return waitForElement(sectionId, timeoutMs)
}
