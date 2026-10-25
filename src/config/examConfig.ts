/**
 * INI-CET exam configuration — the ONE place exam-pattern numbers live.
 *
 * Every timer, marking calculation, section transition, countdown and
 * exam-information card reads from here. If AIIMS changes the pattern, edit
 * this file only.
 *
 * SOURCE
 * ------
 * The sectional pattern below is quoted from the official AIIMS prospectus
 * (INI-CET July 2025 session, Part-A, Section X-B "Mode and Scheme of
 * Examination"): 200 questions in 4 parts of 50, 45 minutes per part, parts
 * auto-submitted and not revisitable, +1 / −⅓, and "Unanswered / Marked for
 * Review: 0". Secondary sources report the same pattern for the November 2026
 * exam (January 2027 session), but its prospectus has not been checked line by
 * line here, so `verified` stays false and the UI shows a confirmation note.
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
  /** false = an answered question that is still "marked for review" at submission scores 0. */
  markedForReviewEvaluated: boolean
  /** false = a section can only end when its timer runs out (no early move to the next part). */
  allowEarlySectionSubmit: boolean
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
  questionFormat: 'Objective MCQs — single correct choice and multiple correct choice (combination) questions',
  marking: {
    correct: 1,
    wrong: 1 / 3,
    unattempted: 0,
  },
  sections: [
    { id: 'part-1', label: 'Part 1', questionCount: 50, minutes: 45 },
    { id: 'part-2', label: 'Part 2', questionCount: 50, minutes: 45 },
    { id: 'part-3', label: 'Part 3', questionCount: 50, minutes: 45 },
    { id: 'part-4', label: 'Part 4', questionCount: 50, minutes: 45 },
  ],
  navigation: 'within-section',
  markedForReviewEvaluated: false,
  allowEarlySectionSubmit: false,
  verified: false,
  officialSource: {
    label: 'AIIMS INI-CET Prospectus Part-A, July 2025 session (Section X-B)',
    url: 'https://docs.aiimsexams.ac.in/sites/2_PROSPECTUS%20PART-A%20INI-CET%20JULY%202025%20SESSION.pdf',
  },
  instructions: [
    'The paper has 200 questions in 4 parts of 50. Each part has its own 45-minute timer; only the active part is visible.',
    'When a part\'s 45 minutes end it is submitted automatically and the next part opens. You cannot return to an earlier part.',
    'Each correct answer earns +1 mark; each wrong answer deducts ⅓ mark. Unanswered questions score 0.',
    'Questions still "marked for review" at submission score 0, even if an option is selected (AIIMS prospectus: "Unanswered / Marked for Review: 0"). Unmark a question to have your answer scored.',
    'Multiple-correct-choice questions list combinations as options (e.g. "1, 2 and 3"); select the single option with the right combination.',
    'Answer only when you can eliminate options — a blind guess among four has a negative expected value at −⅓.',
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
