/**
 * App-shell feature flags — toggle without touching component internals.
 */
export const SHELL_FLAGS = {
  /** Set false to skip the branded loader entirely. */
  enableLoader: true,
  /** Minimum loader visibility for a polished entrance (ms). */
  loaderMinDurationMs: 1600,
  /** Desktop custom cursor. */
  enableCustomCursor: true,
} as const
