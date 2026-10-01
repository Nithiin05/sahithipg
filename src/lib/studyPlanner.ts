import type { AttemptRecord } from '../types'
import { subjects as ALL_SUBJECTS } from '../data/subjects'
import { syllabus } from '../data/syllabus'
import { subjectProgress, weakAreas } from './stats'
import { getDueRevision } from './revisionQueue'
import { poolFor } from './testEngine'

import type { StudyPlanState, SubjectSlug } from '../types'
import { examConfig } from '../config/examConfig'

const KEY = 'drsahithi:study-plan'

/** Default countdown target (YYYY-MM-DD), taken from the central exam config. */
export const DEFAULT_EXAM_DATE = examConfig.examDateTime.slice(0, 10)
/** Exam date saved by the old NEET PG build — replaced with the INI-CET date. */
const LEGACY_EXAM_DATE = '2026-08-30'

function defaultPlan(): StudyPlanState {
  return {
    examDate: DEFAULT_EXAM_DATE,
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
    const plan = { ...defaultPlan(), ...(JSON.parse(raw) as Partial<StudyPlanState>) }
    if (plan.examDate === LEGACY_EXAM_DATE) plan.examDate = DEFAULT_EXAM_DATE
    return plan
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

// ---------------------------------------------------------------------------
// Adaptive daily plan
// ---------------------------------------------------------------------------

export interface PlanTask {
  id: string
  title: string
  detail?: string
  to: string
}

export interface DailyPlan {
  date: string
  daysLeft: number
  mcqTarget: number
  tasks: PlanTask[]
  /** Plain-language reasons the plan looks the way it does. */
  why: string[]
}

const MCQ_PER_HOUR: Record<string, number> = { beginner: 25, intermediate: 35, advanced: 45 }

function seeded(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) / 4294967296
}

export function getTodayPlan(attempts: AttemptRecord[], date = new Date().toISOString().slice(0, 10)): DailyPlan {
  const plan = getStudyPlan()
  const daysLeft = Math.max(0, daysUntilExam(plan.examDate))
  const level = plan.prepLevel ?? 'intermediate'
  const hours = Math.max(1, plan.dailyGoalMinutes / 60)
  const weakSubs = new Set(plan.focusSubjects)
  const strongSubs = new Set(plan.strongSubjects ?? [])
  const progress = new Map(subjectProgress(attempts).map((s) => [s.slug, s]))
  const weakTopics = weakAreas(attempts, 20)
  const weakTopicNames = new Set(weakTopics.map((w) => `${w.subject}::${w.topic}`))
  const why: string[] = []

  // Score every syllabus module that has practice questions.
  const candidates: { slug: string; subjectName: string; module: string; focus: string; to: string; score: number }[] = []
  for (const s of ALL_SUBJECTS) {
    const mods = syllabus[s.slug] ?? []
    const prog = progress.get(s.slug)
    for (const m of mods) {
      if (!m.practice.length) continue
      const topic = s.topics.find((t) => t.id === m.practice[0])
      let score = 1
      if (weakSubs.has(s.slug)) score += 2
      if (strongSubs.has(s.slug)) score -= 0.7
      if (m.practice.some((id) => weakTopicNames.has(`${s.slug}::${s.topics.find((t) => t.id === id)?.name}`))) score += 2.5
      if (prog) score += (1 - prog.coverage / 100) * 1.2
      if (prog?.accuracy !== null && prog?.accuracy !== undefined && prog.accuracy < 60) score += 1
      if (m.focus.some((f) => f.tags.includes('High Yield'))) score += 0.8
      score += seeded(`${date}:${s.slug}:${m.id}`) * 1.5 // daily rotation
      candidates.push({
        slug: s.slug,
        subjectName: s.name,
        module: m.name,
        focus: m.focus.slice(0, 3).map((f) => f.name).join(', '),
        to: topic ? `/subjects/${s.slug}/${topic.id}` : `/subjects/${s.slug}`,
        score,
      })
    }
  }
  candidates.sort((a, b) => b.score - a.score)
  const picked: typeof candidates = []
  for (const c of candidates) {
    if (picked.length >= 3) break
    if (!picked.some((p) => p.slug === c.slug)) picked.push(c)
  }

  const mcqTarget = Math.round((hours * MCQ_PER_HOUR[level] * 0.5) / 5) * 5
  const clinicalN = Math.max(10, Math.round((mcqTarget * 0.6) / 5) * 5)
  const secondN = Math.max(5, Math.round((mcqTarget * 0.25) / 5) * 5)
  const pyqPattern = poolFor({ categories: ['pyq-pattern'] }).length
  const due = getDueRevision().length

  const tasks: PlanTask[] = picked.map((p, i) => ({
    id: `study-${i}`,
    title: `${p.subjectName} – ${p.module}`,
    detail: p.focus ? `Focus: ${p.focus}` : undefined,
    to: p.to,
  }))
  const weakForMcq = picked.map((p) => p.slug).join(',')
  tasks.push({
    id: 'clinical',
    title: `${clinicalN} clinical MCQs`,
    detail: 'Vignettes from today’s subjects',
    to: `/tests/custom?s=${weakForMcq}&c=clinical&n=${clinicalN}&t=1`,
  })
  tasks.push(
    pyqPattern > 0
      ? { id: 'pyq', title: `${secondN} PYQ-pattern questions`, to: `/tests/custom?c=pyq-pattern&n=${secondN}&t=1` }
      : { id: 'image', title: `${secondN} image-based or integrated questions`, to: `/tests/custom?c=image,integrated&n=${secondN}&t=1` },
  )
  tasks.push({
    id: 'revision',
    title: 'Revision',
    detail: due ? `${due} question${due === 1 ? '' : 's'} due, plus today’s mistakes` : 'Review today’s mistakes and marked questions',
    to: due ? '/revision?list=due' : '/revision?list=incorrect',
  })
  const dayNum = Math.floor(Date.parse(date) / 86400000)
  if ((daysLeft <= 30 && dayNum % 3 === 0) || (daysLeft <= 7 && daysLeft > 1)) {
    tasks.push({ id: 'mock', title: 'Full INI-CET mock under exam conditions', to: '/tests/full-mock' })
  }

  if (weakSubs.size) why.push(`Subjects you marked as weak are weighted up: ${[...weakSubs].map((s) => ALL_SUBJECTS.find((x) => x.slug === s)?.shortName).join(', ')}.`)
  if (strongSubs.size) why.push('Subjects you marked as strong appear less often.')
  if (weakTopics.length) why.push(`Your results flag ${weakTopics.length} weak topic${weakTopics.length > 1 ? 's' : ''} (e.g. ${weakTopics[0].topic}, ${weakTopics[0].accuracy}%) — these are prioritised.`)
  why.push(`${hours} h/day at ${level} level → about ${mcqTarget} MCQs a day.`)
  if (daysLeft <= 30) why.push(`${daysLeft} days to the exam: full mocks are scheduled regularly.`)

  return { date, daysLeft, mcqTarget, tasks, why }
}

const DONE_KEY = (date: string) => `inicet:plan-done:${date}`

export function getDoneTasks(date: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(DONE_KEY(date)) ?? '[]') as string[]
  } catch {
    return []
  }
}

export function toggleDoneTask(date: string, id: string): string[] {
  const cur = getDoneTasks(date)
  const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
  try {
    localStorage.setItem(DONE_KEY(date), JSON.stringify(next))
  } catch {
    // ignore
  }
  return next
}
