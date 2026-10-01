import type { AttemptRecord } from '../types'
import { getDueRevision, recordRevisionResult } from './revisionQueue'

const KEY = 'drsahithi:attempts'
const MAX_STORED = 300

export function getAttempts(): AttemptRecord[] {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? (JSON.parse(raw) as AttemptRecord[]) : []
    return parsed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch {
    return []
  }
}

export function saveAttempt(record: AttemptRecord) {
  try {
    const existing = getAttempts()
    const next = [record, ...existing].slice(0, MAX_STORED)
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // ignore storage errors
  }
  // Advance spaced-repetition for any due revision questions answered in this attempt.
  const due = new Set(getDueRevision().map((e) => e.questionId))
  for (const a of record.answers) {
    if (a.isCorrect !== null && due.has(a.questionId)) recordRevisionResult(a.questionId, a.isCorrect)
  }
}

export function clearAttempts() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}

export function newAttemptId() {
  return `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
