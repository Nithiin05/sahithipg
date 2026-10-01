import type { Question } from '../types'

/**
 * Answer-position randomization.
 *
 * Each question's options are permuted with a PRNG seeded from the question's
 * id. That means:
 *  - the correct answer's position is independent of how the author wrote it
 *    (the old bank had option A correct 35% of the time);
 *  - the order is stable for a given question, so saved attempts, mistakes,
 *    bookmarks and resumed tests always line up with what was displayed;
 *  - `correctIndex` is remapped, so the answer key is preserved exactly.
 *
 * Assertion–reason questions are left untouched: their four options have a
 * fixed conventional order in the real exam.
 */

function hashString(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const FIXED_ORDER_TYPES = new Set(['assertion-reason'])

export function randomizeOptions(q: Question): Question {
  if (q.type && FIXED_ORDER_TYPES.has(q.type)) return q
  const rand = mulberry32(hashString(`opt:${q.id}`))
  const order = q.options.map((_, i) => i)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return {
    ...q,
    options: order.map((i) => q.options[i]),
    correctIndex: order.indexOf(q.correctIndex),
  }
}
