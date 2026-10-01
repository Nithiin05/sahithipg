import type { SubjectSlug } from '../types'

/**
 * "Revise again" queue with simple spaced repetition.
 * A question comes due 1, 3, 7, 14 and then 30 days after each successful
 * review; a wrong answer sends it back to the 1-day step.
 */
const KEY = 'inicet:revision-queue'
const INTERVALS_DAYS = [1, 3, 7, 14, 30]

export interface RevisionEntry {
  questionId: string
  subject: SubjectSlug
  addedAt: string
  /** ISO date-time when it is next due. */
  due: string
  /** Index into INTERVALS_DAYS. */
  stage: number
}

function read(): RevisionEntry[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as RevisionEntry[]) : []
  } catch {
    return []
  }
}

function write(entries: RevisionEntry[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries))
  } catch {
    // ignore storage errors
  }
}

const inDays = (d: number) => new Date(Date.now() + d * 86400000).toISOString()

export function getRevisionQueue(): RevisionEntry[] {
  return read().sort((a, b) => a.due.localeCompare(b.due))
}

export function isQueued(questionId: string): boolean {
  return read().some((e) => e.questionId === questionId)
}

/** Add (due today) or remove a question. Returns the new queued state. */
export function toggleRevision(questionId: string, subject: SubjectSlug): boolean {
  const entries = read()
  const i = entries.findIndex((e) => e.questionId === questionId)
  if (i >= 0) {
    entries.splice(i, 1)
    write(entries)
    return false
  }
  entries.push({ questionId, subject, addedAt: new Date().toISOString(), due: new Date().toISOString(), stage: 0 })
  write(entries)
  return true
}

export function getDueRevision(now = new Date()): RevisionEntry[] {
  return getRevisionQueue().filter((e) => new Date(e.due) <= now)
}

/** Update spacing after the question is answered in a revision session. */
export function recordRevisionResult(questionId: string, correct: boolean) {
  const entries = read()
  const e = entries.find((x) => x.questionId === questionId)
  if (!e) return
  e.stage = correct ? Math.min(e.stage + 1, INTERVALS_DAYS.length - 1) : 0
  e.due = inDays(INTERVALS_DAYS[e.stage])
  write(entries)
}
