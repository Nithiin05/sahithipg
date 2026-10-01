/**
 * INI-CET exam configuration — the ONE place exam-pattern numbers live.
 *
 * Every timer, marking calculation, section transition, countdown and
 * exam-information card reads from here. If AIIMS changes the pattern, edit
 * this file only.
 *
 * VERIFICATION STATUS
 * -------------------
 * `verified: false` means the values below match what multiple published
 * sources report for the session, but have NOT yet been checked against the
 * official AIIMS prospectus / information bulletin for this session
 * (aiimsexams.ac.in). Once checked, set `verified: true` and fill
 * `officialSource`. The UI shows a "pending official confirmation" note while
 * this is false.
 */

export type NavigationRule =
  /** Free movement across all questions for the whole exam. */
  | 'free'
  /** Free movement inside the current section; earlier sections lock once left. */
  | 'within-section'
  /** Forward-only: no going back to any earlier question. */
  | 'forward-only'

export interface ExamSection {
  id: string
  label: string
  questionCount: number
  /** Section time limit in minutes. `null` = no separate limit (shares the overall timer). */
  minutes: number | null
}

export interface ExamConfig {
  examName: string
  shortName: string
  conductingBody: string
  session: string
  /** ISO date-time with IST offset — the countdown target. Midnight IST of exam
   * day until the official reporting/shift time is confirmed. */
  examDateTime: string
  mode: string
  language: string
  durationMinutes: number
  totalQuestions: number
  questionFormat: string
  marking: {
    correct: number
    wrong: number
    unattempted: number
  }
  sections: ExamSection[]
  navigation: NavigationRule
  verified: boolean
  officialSource: { label: string; url: string } | null
  instructions: string[]
}

export const examConfig: ExamConfig = {
  examName: 'Institute of National Importance Combined Entrance Test',
  shortName: 'INI-CET',
  conductingBody: 'AIIMS, New Delhi',
  session: 'January 2027 session (exam in November 2026)',
  examDateTime: '2026-11-01T00:00:00+05:30',
  mode: 'Computer-based test (CBT)',
  language: 'English',
  durationMinutes: 180,
  totalQuestions: 200,
  questionFormat: 'Single-best-answer MCQs (4 options)',
  marking: {
    correct: 1,
    wrong: 1 / 3,
    unattempted: 0,
  },
  sections: [{ id: 'full', label: 'Full Paper', questionCount: 200, minutes: null }],
  navigation: 'free',
  verified: false,
  officialSource: null,
  instructions: [
    'Each correct answer earns +1 mark; each wrong answer deducts ⅓ mark. Unattempted questions score 0.',
    'Answer only when you can eliminate options — blind guessing has a negative expected value at −⅓.',
    '"Mark for review" does not count as an answer unless an option is also selected.',
    'The paper auto-submits when time runs out.',
    'Confirm the reporting time, admit-card rules and permitted items in the official AIIMS notice for your session.',
  ],
}

/** Human-readable marking string, e.g. "+1 / −⅓". */
export function markingLabel(c: ExamConfig = examConfig): string {
  const wrong = Math.abs(c.marking.wrong - 1 / 3) < 1e-9 ? '⅓' : String(c.marking.wrong)
  return `+${c.marking.correct} / −${wrong}`
}

export function navigationLabel(rule: NavigationRule): string {
  switch (rule) {
    case 'free':
      return 'Move freely between all questions until submission'
    case 'within-section':
      return 'Move freely within a section; earlier sections lock once you move on'
    case 'forward-only':
      return 'Forward-only — earlier questions cannot be revisited'
  }
}

export const examDate = new Date(examConfig.examDateTime)
