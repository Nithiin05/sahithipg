import type { AttemptRecord } from '../types'

const KEY = 'one9:attempts'
const MAX_STORED = 100

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
