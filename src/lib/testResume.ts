const KEY = 'drsahithi:resume-test'

export interface ResumeState {
  /** Which runner this belongs to. */
  kind: 'mock' | 'practice' | 'grand'
  /** Route to navigate to in order to resume. */
  route: string
  /** Human-readable label shown on the "Resume Last Test" prompt. */
  label: string
  savedAt: number

  // Mock-specific
  mockId?: string
  sectionIndex?: number
  secondsLeft?: number
  started?: number
  /** The exact question ids shown per section, so a resume rebuilds the same set instead of re-rolling a fresh one. */
  sectionQuestionIds?: string[][]

  // Common
  answers: Record<string, number>
  markedForReview: string[]
  currentIndex: number
  calculatorOpen?: boolean
}

export function saveResumeState(state: Omit<ResumeState, 'savedAt'>) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...state, savedAt: Date.now() }))
  } catch {
    // ignore storage errors
  }
}

export function readResumeState(): ResumeState | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as ResumeState) : null
  } catch {
    return null
  }
}

export function readResumeStateFor(matcher: (state: ResumeState) => boolean): ResumeState | null {
  const state = readResumeState()
  return state && matcher(state) ? state : null
}

export function clearResumeState() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}
