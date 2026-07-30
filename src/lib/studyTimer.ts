const KEY = 'one9:study-timer'

export interface StudyTimerState {
  /** ISO date (YYYY-MM-DD) the "today" fields below apply to. */
  date: string
  /** Accumulated seconds for `date`, excluding any currently-running segment. */
  totalSeconds: number
  /** Timestamp (ms) the current run segment started, or null if paused/stopped. */
  runningSince: number | null
  /** Every day's finalized total (including today's, kept in sync on every write) — powers streaks & lifetime totals. */
  history: Record<string, number>
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function defaultState(): StudyTimerState {
  return { date: todayKey(), totalSeconds: 0, runningSince: null, history: {} }
}

export function readStudyTimer(): StudyTimerState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw) as StudyTimerState
    const history = parsed.history ?? {}
    if (parsed.date !== todayKey()) {
      // Day rolled over. Finalize whatever was tracked for the old day (drop
      // any still-running overnight session rather than attributing it to
      // the wrong day) and start a fresh counter for today.
      if (parsed.date) history[parsed.date] = parsed.totalSeconds
      return { date: todayKey(), totalSeconds: history[todayKey()] ?? 0, runningSince: null, history }
    }
    return { ...parsed, history }
  } catch {
    return defaultState()
  }
}

function write(state: StudyTimerState) {
  try {
    const history = { ...state.history, [state.date]: state.totalSeconds }
    localStorage.setItem(KEY, JSON.stringify({ ...state, history }))
  } catch {
    // ignore storage errors
  }
}

export function startStudyTimer(): StudyTimerState {
  const state = readStudyTimer()
  if (state.runningSince) return state
  const next = { ...state, runningSince: Date.now() }
  write(next)
  return next
}

export function pauseStudyTimer(): StudyTimerState {
  const state = readStudyTimer()
  if (!state.runningSince) return state
  const elapsed = (Date.now() - state.runningSince) / 1000
  const next: StudyTimerState = { ...state, totalSeconds: state.totalSeconds + elapsed, runningSince: null }
  write(next)
  return next
}

export function resetStudyTimer(): StudyTimerState {
  const state = readStudyTimer()
  const next: StudyTimerState = { ...state, totalSeconds: 0, runningSince: null }
  write(next)
  return next
}

export function getElapsedSeconds(state: StudyTimerState): number {
  const running = state.runningSince ? (Date.now() - state.runningSince) / 1000 : 0
  return state.totalSeconds + running
}

export function formatStudyTime(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

/** Sum of every day's studied time (including today, in-flight session included). */
export function getLifetimeStudySeconds(): number {
  const state = readStudyTimer()
  const historyTotal = Object.entries(state.history).reduce(
    (sum, [date, seconds]) => (date === state.date ? sum : sum + seconds),
    0,
  )
  return historyTotal + getElapsedSeconds(state)
}

/** The last `days` days of study time (oldest first), including today's in-flight session. */
export function getStudyHistoryDays(days: number): { date: string; seconds: number }[] {
  const state = readStudyTimer()
  const history = { ...state.history, [state.date]: getElapsedSeconds(state) }
  const out: { date: string; seconds: number }[] = []
  const cursor = new Date()
  cursor.setDate(cursor.getDate() - (days - 1))
  for (let i = 0; i < days; i++) {
    const key = cursor.toISOString().slice(0, 10)
    out.push({ date: key, seconds: history[key] ?? 0 })
    cursor.setDate(cursor.getDate() + 1)
  }
  return out
}

/**
 * Consecutive-day study streak. Counts backward from today; if today has no
 * recorded study time yet, starts counting from yesterday instead so an
 * unbroken streak isn't reset to 0 just because the user hasn't opened the
 * app yet today.
 */
export function getStudyStreak(minSecondsPerDay = 60): number {
  const state = readStudyTimer()
  const history = { ...state.history, [state.date]: getElapsedSeconds(state) }

  const cursor = new Date()
  if ((history[todayKey()] ?? 0) < minSecondsPerDay) {
    cursor.setDate(cursor.getDate() - 1)
  }

  let streak = 0
  for (;;) {
    const key = cursor.toISOString().slice(0, 10)
    if ((history[key] ?? 0) >= minSecondsPerDay) {
      streak++
      cursor.setDate(cursor.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}
