import type { AnswerRecord, AttemptRecord, SubjectSlug } from '../types'
import { subjects } from '../data/subjects'
import { getSyllabusProgress } from './syllabusProgress'

/**
 * All performance analytics, computed from saved attempts (localStorage).
 * Used by the Dashboard, Analytics, Revision and Study Planner pages.
 */

export const WEAK_ACCURACY = 60
const dayKey = (iso: string) => iso.slice(0, 10)
const todayKey = () => new Date().toISOString().slice(0, 10)

export interface Tally {
  attempted: number
  correct: number
  wrong: number
  skipped: number
  accuracy: number
}

function tally(answers: AnswerRecord[]): Tally {
  let correct = 0
  let wrong = 0
  let skipped = 0
  for (const a of answers) {
    if (a.isCorrect === true) correct++
    else if (a.isCorrect === false) wrong++
    else skipped++
  }
  const attempted = correct + wrong
  return { attempted, correct, wrong, skipped, accuracy: attempted ? Math.round((correct / attempted) * 100) : 0 }
}

const allAnswers = (attempts: AttemptRecord[]) =>
  attempts.flatMap((a) => a.answers.map((ans) => ({ ...ans, date: a.date })))

export function overall(attempts: AttemptRecord[]) {
  const answers = allAnswers(attempts)
  const t = tally(answers)
  const timed = answers.filter((a) => (a.timeSpentSec ?? 0) > 0)
  const avgTime = timed.length ? Math.round(timed.reduce((s, a) => s + (a.timeSpentSec ?? 0), 0) / timed.length) : null
  const uniqueQuestions = new Set(answers.filter((a) => a.isCorrect !== null).map((a) => a.questionId)).size
  return { ...t, avgTime, uniqueQuestions, tests: attempts.length }
}

export function today(attempts: AttemptRecord[]) {
  return tally(allAnswers(attempts).filter((a) => dayKey(a.date) === todayKey()))
}

/** Share of practice topics the student has either attempted or marked as reviewed. */
export function topicsCovered(attempts: AttemptRecord[]) {
  const progress = getSyllabusProgress()
  const attempted = new Set(allAnswers(attempts).filter((a) => a.isCorrect !== null).map((a) => `${a.subject}::${a.topic}`))
  let total = 0
  let done = 0
  for (const s of subjects) {
    for (const t of s.topics) {
      total++
      if (attempted.has(`${s.slug}::${t.name}`) || progress[`${s.slug}:${t.id}`]) done++
    }
  }
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }
}

export interface SubjectProgress {
  slug: SubjectSlug
  name: string
  totalQuestions: number
  uniqueAttempted: number
  coverage: number
  answered: number
  accuracy: number | null
}

export function subjectProgress(attempts: AttemptRecord[]): SubjectProgress[] {
  const answers = allAnswers(attempts).filter((a) => a.isCorrect !== null)
  return subjects.map((s) => {
    const mine = answers.filter((a) => a.subject === s.slug)
    const total = s.topics.reduce((n, t) => n + t.questions.length, 0)
    const unique = new Set(mine.map((a) => a.questionId)).size
    const t = tally(mine)
    return {
      slug: s.slug,
      name: s.name,
      totalQuestions: total,
      uniqueAttempted: unique,
      coverage: total ? Math.round((unique / total) * 100) : 0,
      answered: t.attempted,
      accuracy: t.attempted ? t.accuracy : null,
    }
  })
}

export interface TopicStat {
  subject: SubjectSlug
  subjectName: string
  topic: string
  attempted: number
  correct: number
  accuracy: number
  /** Questions answered wrongly more than once. */
  repeatedWrong: number
  reasons: string[]
}

export function topicStats(attempts: AttemptRecord[]): TopicStat[] {
  const map = new Map<string, { subject: SubjectSlug; subjectName: string; topic: string; answers: AnswerRecord[] }>()
  for (const a of allAnswers(attempts)) {
    if (a.isCorrect === null) continue
    const key = `${a.subject}::${a.topic}`
    const e = map.get(key) ?? { subject: a.subject, subjectName: a.subjectName, topic: a.topic, answers: [] }
    e.answers.push(a)
    map.set(key, e)
  }
  const overallAcc = overall(attempts).accuracy
  return [...map.values()].map((e) => {
    const t = tally(e.answers)
    const wrongCounts = new Map<string, number>()
    for (const a of e.answers) if (a.isCorrect === false) wrongCounts.set(a.questionId, (wrongCounts.get(a.questionId) ?? 0) + 1)
    const repeatedWrong = [...wrongCounts.values()].filter((n) => n >= 2).length
    const reasons: string[] = []
    if (t.attempted >= 3 && t.accuracy < WEAK_ACCURACY) reasons.push(`Accuracy ${t.accuracy}%`)
    if (t.attempted >= 10 && t.accuracy < overallAcc - 10) reasons.push(`Below your average across ${t.attempted} answers`)
    if (repeatedWrong > 0) reasons.push(`${repeatedWrong} question${repeatedWrong > 1 ? 's' : ''} wrong more than once`)
    return { subject: e.subject, subjectName: e.subjectName, topic: e.topic, attempted: t.attempted, correct: t.correct, accuracy: t.accuracy, repeatedWrong, reasons }
  })
}

/** Weak areas: accuracy < 60% (≥3 answers), high volume but well below average, or repeated mistakes. */
export function weakAreas(attempts: AttemptRecord[], limit = 6): TopicStat[] {
  return topicStats(attempts)
    .filter((t) => t.reasons.length > 0)
    .sort((a, b) => a.accuracy - b.accuracy || b.attempted - a.attempted)
    .slice(0, limit)
}

export function subjectExtremes(attempts: AttemptRecord[], minAnswered = 5) {
  const ranked = subjectProgress(attempts)
    .filter((s) => s.answered >= minAnswered && s.accuracy !== null)
    .sort((a, b) => (b.accuracy ?? 0) - (a.accuracy ?? 0))
  return { strongest: ranked.slice(0, 3), weakest: ranked.slice(-3).reverse() }
}

export interface DayPoint {
  date: string
  label: string
  answered: number
  accuracy: number | null
}

export function dailySeries(attempts: AttemptRecord[], days = 14): DayPoint[] {
  const byDay = new Map<string, AnswerRecord[]>()
  for (const a of allAnswers(attempts)) {
    const k = dayKey(a.date)
    byDay.set(k, [...(byDay.get(k) ?? []), a])
  }
  const out: DayPoint[] = []
  const d = new Date()
  d.setDate(d.getDate() - (days - 1))
  for (let i = 0; i < days; i++) {
    const k = d.toISOString().slice(0, 10)
    const t = tally(byDay.get(k) ?? [])
    out.push({
      date: k,
      label: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      answered: t.attempted,
      accuracy: t.attempted ? t.accuracy : null,
    })
    d.setDate(d.getDate() + 1)
  }
  return out
}

/** Consecutive days (ending today or yesterday) with at least one answered question. */
export function practiceStreak(attempts: AttemptRecord[]): number {
  const days = new Set(allAnswers(attempts).filter((a) => a.isCorrect !== null).map((a) => dayKey(a.date)))
  const d = new Date()
  if (!days.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1)
  let n = 0
  while (days.has(d.toISOString().slice(0, 10))) {
    n++
    d.setDate(d.getDate() - 1)
  }
  return n
}

export function weeklyComparison(attempts: AttemptRecord[]) {
  const series = dailySeries(attempts, 14)
  const sum = (pts: DayPoint[]) => {
    const answered = pts.reduce((s, p) => s + p.answered, 0)
    const correct = pts.reduce((s, p) => s + (p.accuracy !== null ? Math.round((p.accuracy * p.answered) / 100) : 0), 0)
    return { answered, accuracy: answered ? Math.round((correct / answered) * 100) : null }
  }
  return { lastWeek: sum(series.slice(0, 7)), thisWeek: sum(series.slice(7)) }
}

export interface TimedAnswer {
  questionId: string
  subjectName: string
  topic: string
  seconds: number
  isCorrect: boolean | null
}

export function timeStats(attempts: AttemptRecord[]) {
  const timed: TimedAnswer[] = allAnswers(attempts)
    .filter((a) => (a.timeSpentSec ?? 0) > 0 && a.isCorrect !== null)
    .map((a) => ({ questionId: a.questionId, subjectName: a.subjectName, topic: a.topic, seconds: a.timeSpentSec ?? 0, isCorrect: a.isCorrect }))
  const bySubject = new Map<string, number[]>()
  for (const t of timed) bySubject.set(t.subjectName, [...(bySubject.get(t.subjectName) ?? []), t.seconds])
  const sorted = [...timed].sort((a, b) => a.seconds - b.seconds)
  return {
    perSubject: [...bySubject.entries()]
      .map(([name, xs]) => ({ name, avg: Math.round(xs.reduce((s, x) => s + x, 0) / xs.length), n: xs.length }))
      .sort((a, b) => b.avg - a.avg),
    fastest: sorted.slice(0, 5),
    slowest: sorted.slice(-5).reverse(),
  }
}

export function mockScores(attempts: AttemptRecord[]) {
  return attempts
    .filter((a) => a.kind === 'mock' && a.maxScore > 0 && a.totalQuestions >= 20)
    .map((a) => ({
      id: a.id,
      label: a.label,
      date: a.date,
      pct: Math.round((a.score / a.maxScore) * 100),
      score: a.score,
      max: a.maxScore,
    }))
    .reverse()
}

/** Latest outcome per question — basis for "incorrect" and "marked" revision lists. */
export function latestAnswers(attempts: AttemptRecord[]): Map<string, AnswerRecord & { date: string }> {
  const m = new Map<string, AnswerRecord & { date: string }>()
  for (const a of allAnswers(attempts)) if (!m.has(a.questionId)) m.set(a.questionId, a)
  return m
}
