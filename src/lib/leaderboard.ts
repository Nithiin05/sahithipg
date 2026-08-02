import type { AttemptRecord } from '../types'
import { getAttempts } from './attempts'
import { estimatePercentile } from './percentile'

/**
 * This app is fully local/client-side with no accounts or backend, so there
 * is no real pool of other students to rank against. Rather than fabricate
 * fake competitors, the "Leaderboard" is your own personal-best board across
 * mock/grand test attempts, plus an estimated percentile (see percentile.ts)
 * for directional context. Signed-in, multi-user leaderboards would need a
 * backend, which is out of scope for this free, local-only build.
 */

export interface LeaderboardRow {
  attempt: AttemptRecord
  scorePct: number
  estimatedPercentile: number
}

function toRows(attempts: AttemptRecord[]): LeaderboardRow[] {
  return attempts
    .filter((a) => a.kind === 'mock' || a.kind === 'grand')
    .map((attempt) => {
      const est = estimatePercentile(attempt.score, attempt.maxScore || attempt.totalQuestions)
      return { attempt, scorePct: est.scorePct, estimatedPercentile: est.percentile }
    })
    .sort((a, b) => b.scorePct - a.scorePct)
}

function daysAgo(dateStr: string): number {
  return (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)
}

export function getPersonalLeaderboard(range: 'week' | 'month' | 'all'): LeaderboardRow[] {
  const attempts = getAttempts()
  const filtered =
    range === 'all'
      ? attempts
      : attempts.filter((a) => daysAgo(a.date) <= (range === 'week' ? 7 : 30))
  return toRows(filtered)
}
