import type { StudyPlanState, SubjectSlug } from '../types'

const KEY = 'drsahithi:study-plan'

/** NEET PG 2026 exam date, used as the default countdown target. */
export const NEET_PG_2026_EXAM_DATE = '2026-08-30'

function defaultPlan(): StudyPlanState {
  return {
    examDate: NEET_PG_2026_EXAM_DATE,
    dailyGoalMinutes: 180,
    dailyGoalQuestions: 50,
    focusSubjects: [],
    createdAt: new Date().toISOString(),
  }
}

export function getStudyPlan(): StudyPlanState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultPlan()
    return { ...defaultPlan(), ...(JSON.parse(raw) as Partial<StudyPlanState>) }
  } catch {
    return defaultPlan()
  }
}

export function saveStudyPlan(patch: Partial<StudyPlanState>) {
  const current = getStudyPlan()
  const next: StudyPlanState = { ...current, ...patch }
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // ignore storage errors
  }
  return next
}

export function toggleFocusSubject(slug: SubjectSlug) {
  const plan = getStudyPlan()
  const has = plan.focusSubjects.includes(slug)
  const focusSubjects = has ? plan.focusSubjects.filter((s) => s !== slug) : [...plan.focusSubjects, slug]
  return saveStudyPlan({ focusSubjects })
}

/** Days remaining until the exam date (can be negative if the date has passed). */
export function daysUntilExam(examDate: string = getStudyPlan().examDate): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(examDate)
  target.setHours(0, 0, 0, 0)
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

export function examCountdownParts(examDate: string = getStudyPlan().examDate) {
  const totalDays = Math.max(0, daysUntilExam(examDate))
  const weeks = Math.floor(totalDays / 7)
  const days = totalDays % 7
  return { totalDays, weeks, days }
}
