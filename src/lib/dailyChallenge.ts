import { pooledAllSubjectsQuestions, type QuizQuestionItem } from './quizEngine'

const HISTORY_KEY = 'drsahithi:daily-challenge-history'
/** Spec target: 20 fresh questions/day, pooled across all 19 subjects. */
const DAILY_COUNT = 20

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

/** 20 questions pooled across all subjects, stable for a given date (same set all day, everywhere). */
export function getDailyChallengeItems(date: string = todayKey()): QuizQuestionItem[] {
  const rand = seededRandom(date)
  const pool = seededShuffle(pooledAllSubjectsQuestions(), rand)
  return pool.slice(0, DAILY_COUNT)
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
