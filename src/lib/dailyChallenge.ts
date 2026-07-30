import type { SubjectSlug } from '../types'
import { pooledSubjectQuestions, type QuizQuestionItem } from './quizEngine'

const HISTORY_KEY = 'one9:daily-challenge-history'
const SUBJECTS: SubjectSlug[] = ['quant', 'reasoning', 'english', 'general-awareness']
const PER_SUBJECT = 10

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

/** Small deterministic PRNG seeded from a string, so the same date always produces the same shuffle. */
function seededRandom(seed: string) {
  let h = 1779033703 ^ seed.length
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    h ^= h >>> 16
    return (h >>> 0) / 4294967296
  }
}

function seededShuffle<T>(arr: T[], rand: () => number): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/** 10 Quant + 10 Reasoning + 10 English + 10 GA questions, stable for a given date. */
export function getDailyChallengeItems(date: string = todayKey()): QuizQuestionItem[] {
  const rand = seededRandom(date)
  const items: QuizQuestionItem[] = []
  for (const subject of SUBJECTS) {
    const pool = seededShuffle(pooledSubjectQuestions(subject), rand)
    items.push(...pool.slice(0, PER_SUBJECT))
  }
  return items
}

export interface DailyChallengeResult {
  date: string
  correct: number
  total: number
  accuracy: number
  timeTakenSec: number
  score: number
}

function readHistory(): Record<string, DailyChallengeResult> {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeHistory(history: Record<string, DailyChallengeResult>) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  } catch {
    // ignore storage errors
  }
}

export function saveDailyChallengeResult(result: DailyChallengeResult) {
  const history = readHistory()
  history[result.date] = result
  writeHistory(history)
}

export function getDailyChallengeResult(date: string = todayKey()): DailyChallengeResult | null {
  return readHistory()[date] ?? null
}

/** Most recent results, newest first — for the "compare with previous days" view. */
export function getDailyChallengeHistory(limit = 14): DailyChallengeResult[] {
  return Object.values(readHistory())
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit)
}
