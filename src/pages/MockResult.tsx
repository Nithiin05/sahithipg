import { useMemo } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProgressBar from '../components/ProgressBar'
import { getMockTest } from '../data/mockTests'
import { getAttempts } from '../lib/attempts'
import type { AttemptRecord } from '../types'

export default function MockResult() {
  const { mockId } = useParams()
  const location = useLocation()
  const config = getMockTest(mockId ?? '')

  const attempt: AttemptRecord | undefined = useMemo(() => {
    const fromState = (location.state as { attempt?: AttemptRecord } | null)?.attempt
    if (fromState) return fromState
    return getAttempts().find((a) => a.kind === 'mock' && a.label === config?.title)
  }, [location.state, config])

  if (!config) return <Navigate to="/mock-tests" replace />
  if (!attempt) return <Navigate to={`/mock-tests/${config.id}`} replace />

  const accuracy = attempt.attempted > 0 ? Math.round((attempt.correct / attempt.attempted) * 100) : 0
  const scorePct = attempt.maxScore > 0 ? Math.max(0, Math.round((attempt.score / attempt.maxScore) * 100)) : 0

  const bySubject = new Map<string, { correct: number; wrong: number; skipped: number; total: number }>()
  for (const ans of attempt.answers) {
    const entry = bySubject.get(ans.subjectName) ?? { correct: 0, wrong: 0, skipped: 0, total: 0 }
    entry.total++
    if (ans.isCorrect === true) entry.correct++
    else if (ans.isCorrect === false) entry.wrong++
    else entry.skipped++
    bySubject.set(ans.subjectName, entry)
  }

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Mock Test"
        title={`${config.title} — Result`}
        actions={
          <div className="flex gap-2">
            <Link to="/mock-tests" className="border border-border rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary">
              Retake / other mocks
            </Link>
            <Link to="/analytics" className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold">
              View analytics
            </Link>
          </div>
        }
      />

      <div className="max-w-4xl mx-auto px-6">
        <div className="card p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div>
              <p className="text-sm text-muted-foreground">Your score</p>
              <p className="font-display font-extrabold text-3xl">
                {attempt.score} <span className="text-muted-foreground text-lg font-medium">/ {attempt.maxScore}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="font-display font-extrabold text-3xl">{accuracy}%</p>
            </div>
          </div>
          <ProgressBar value={scorePct} max={100} />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-center">
            <div>
              <p className="font-display font-bold text-lg text-success">{attempt.correct}</p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div>
              <p className="font-display font-bold text-lg text-danger">{attempt.wrong}</p>
              <p className="text-xs text-muted-foreground">Wrong</p>
            </div>
            <div>
              <p className="font-display font-bold text-lg text-muted-foreground">{attempt.skipped}</p>
              <p className="text-xs text-muted-foreground">Skipped</p>
            </div>
            <div>
              <p className="font-display font-bold text-lg">{Math.round(attempt.durationSec / 60)}m</p>
              <p className="text-xs text-muted-foreground">Time taken</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-display font-bold text-lg mb-5">Section-wise breakdown</h2>
          <div className="flex flex-col gap-5">
            {[...bySubject.entries()].map(([subject, stats]) => (
              <div key={subject}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">{subject}</span>
                  <span className="text-muted-foreground">
                    {stats.correct} correct · {stats.wrong} wrong · {stats.skipped} skipped
                  </span>
                </div>
                <ProgressBar value={stats.correct} max={stats.total} colorClass="bg-success" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
