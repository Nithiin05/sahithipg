import { randomizeOptions } from '../lib/optionShuffle'
import type { ReservedEntry } from './questions/fullLength/helpers'

/**
 * Test-reserved question packs, loaded on demand.
 *
 * Each full-length test ships its own questions as a separate code-split
 * chunk, so the home page and practice pages never download them and the
 * library can grow without slowing first load. A question id's prefix names
 * its pack ("gt3-med-01" → pack "gt3"). To add a test: write its pack under
 * questions/fullLength/, register the loader here, add the test to
 * data/tests/catalog.ts.
 */
const PACKS: Record<string, () => Promise<ReservedEntry[]>> = {
  gt3: () => import('./questions/fullLength/gt3').then((m) => m.gt3),
  gt4: () => import('./questions/fullLength/gt4').then((m) => m.gt4),
  gt5: () => import('./questions/fullLength/gt5').then((m) => m.gt5),
  gt6: () => import('./questions/fullLength/gt6').then((m) => m.gt6),
  gt7: () => import('./questions/fullLength/gt7').then((m) => m.gt7),
  gt8: () => import('./questions/fullLength/gt8').then((m) => m.gt8),
  gt9: () => import('./questions/fullLength/gt9').then((m) => m.gt9),
  gt10: () => import('./questions/fullLength/gt10').then((m) => m.gt10),
}

const store = new Map<string, ReservedEntry>()
const loaded = new Set<string>()
const pending = new Map<string, Promise<void>>()

export function packOf(id: string): string | null {
  const m = /^([a-z]+\d+)-/.exec(id)
  return m && PACKS[m[1]] ? m[1] : null
}

export function packsFor(ids: string[]): string[] {
  return [...new Set(ids.map(packOf).filter((p): p is string => !!p))].sort()
}

function loadPack(pack: string): Promise<void> {
  if (loaded.has(pack)) return Promise.resolve()
  let p = pending.get(pack)
  if (!p) {
    p = PACKS[pack]()
      .then((entries) => {
        for (const e of entries) store.set(e.question.id, { ...e, question: randomizeOptions(e.question) })
        loaded.add(pack)
      })
      .finally(() => pending.delete(pack))
    pending.set(pack, p)
  }
  return p
}

/** Load the packs needed for these question ids (no-op if already loaded). */
export function loadReservedFor(ids: string[]): Promise<void> {
  return Promise.all(packsFor(ids).map(loadPack)).then(() => undefined)
}

export function loadAllReserved(): Promise<void> {
  return Promise.all(Object.keys(PACKS).map(loadPack)).then(() => undefined)
}

export function reservedReady(ids: string[]): boolean {
  return packsFor(ids).every((p) => loaded.has(p))
}

export function findReserved(id: string): ReservedEntry | undefined {
  return store.get(id)
}

/** Every reserved entry currently loaded (call loadAllReserved first for the full set). */
export function loadedReservedEntries(): ReservedEntry[] {
  return [...store.values()]
}
