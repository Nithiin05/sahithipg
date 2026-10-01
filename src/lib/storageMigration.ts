/**
 * One-time migration from the old NEET PG build.
 *
 * Old attempt records stored answers by option POSITION and were scored at
 * +4/−1. Option order is now randomized and marking follows examConfig, so
 * those records would show the wrong option as selected and incomparable
 * scores. They are cleared once; bookmarks, theme, study timer, study plan and
 * topic progress (all keyed by stable ids) are kept.
 */
const SCHEMA_KEY = 'inicet:storage-schema'
const SCHEMA_VERSION = '1'

const LEGACY_KEYS = ['drsahithi:attempts', 'drsahithi:resume-test', 'drsahithi:daily-challenge-history']

export function migrateStorage() {
  try {
    if (localStorage.getItem(SCHEMA_KEY) === SCHEMA_VERSION) return
    for (const k of LEGACY_KEYS) localStorage.removeItem(k)
    localStorage.setItem(SCHEMA_KEY, SCHEMA_VERSION)
  } catch {
    // Storage blocked (private mode etc.) — nothing to migrate.
  }
}
