import { useMemo } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProgressBar from '../components/ProgressBar'
import { getGrandTest } from '../data/grandTests'
import { getAttempts } from '../lib/attempts'
import { estimatePercentile } from '../lib/percentile'
import type { AttemptRecord } from '../types'

export default function GrandTestResult() {
  const { grandId } = useParams()
  const location = useLocation()
  const config = getGrandTest(grandId ?? '')

  const attempt: AttemptRecord | undefined = useMemo(() => {
    const fromState = (location.state as { attempt?: AttemptRecord } | null)?.attempt
    if (fromState) return fromState
    return getAttempts().find((a) => a.kind === 'grand' && a.grandTestId === config?.id)
  }, [location.state, config])

  if (!config) return <Navigate to="/grand-tests" replace />
  if (!attempt) return <Navigate to={`/grand-tests/${config.id}`} replace />

  const accuracy = attempt.attempted > 0 ? Math.round((attempt.correct / attempt.attempted) * 100) : 0
  const scorePct = attempt.maxScore > 0 ? Math.max(0, Math.round((attempt.score / attempt.maxScore) * 100)) : 0
  const est = estimatePercentile(attempt.score, attempt.maxScore)
  const avgTimePerQ = attempt.attempted > 0 ? Math.round(attempt.durationSec / attempt.totalQuestions) : 0

  const bySubject = new Map<string, { correct: number; wrong: number; skipped: number; total: number }>()
  for (const ans of attempt.answers) {
    const entry = bySubject.get(ans.subjectName) ?? { correct: 0, wrong: 0, skipped: 0, total: 0 }
    entry.total++
    if (ans.isCorrect === true) entry.correct++
    else if (ans.isCorrect === false) entry.wrong++
    else entry.skipped++
    bySubject.set(ans.subjectName, entry)
  }
  const subjectRows = [...bySubject.entries()]
    .map(([name, s]) => ({ name, ...s, accuracy: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0 }))
    .sort((a, b) => a.accuracy - b.accuracy)
  const weakAreas = subjectRows.filter((s) => s.total >= 3 && s.accuracy < 60).slice(0, 3)

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Grand Test"
        title={`${config.title} — Result`}
        actions={
          <div className="flex gap-2">
            <Link to="/grand-tests" className="border border-border rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary">
              Other Grand Tests
            </Link>
            <Link to="/analytics" className="gradient-primary text-white rounded-lg px-4 py-2 text-sm font-semibold">
              View analytics
            </Link>
          </div>
        }
      />

      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-8">
        <div className="card gradient-card p-6">
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
              <p className="font-display font-bold text-lg">{avgTimePerQ}s</p>
              <p className="text-xs text-muted-foreground">Avg time/Q</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-display font-bold text-lg mb-1">Estimated National Percentile & Rank</h2>
          <p className="text-xs text-muted-foreground mb-5">
            This app is fully local with no real candidate pool to compare against — these figures are a modeled
            estimate (not a guarantee of your actual INI-CET rank), assuming a typical bell-curve score distribution.
          </p>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg bg-secondary py-4">
              <p className="font-display font-extrabold text-2xl text-primary">{est.percentile}th</p>
              <p className="text-xs text-muted-foreground mt-1">Estimated percentile</p>
            </div>
            <div className="rounded-lg bg-secondary py-4">
              <p className="font-display font-extrabold text-2xl text-primary">~{est.predictedRank.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Predicted rank (of ~{est.cohortSize.toLocaleString()})</p>
            </div>
          </div>
        </div>

        {weakAreas.length > 0 && (
          <div className="card p-6 border-warning/30">
            <h2 className="font-display font-bold text-lg mb-1">Weak areas & suggested revision</h2>
            <p className="text-sm text-muted-foreground mb-4">Subjects under 60% accuracy in this attempt.</p>
            <div className="flex flex-col gap-3">
              {weakAreas.map((w) => (
                <div key={w.name} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{w.name}</span>
                  <span className="text-warning font-semibold">{w.accuracy}%</span>
                </div>
              ))}
            </div>
            <Link to="/analytics" className="inline-block mt-4 text-sm font-semibold text-primary hover:underline">
              Generate a Smart Revision test for these &rarr;
            </Link>
          </div>
        )}

        <div className="card p-6">
          <h2 className="font-display font-bold text-lg mb-5">Subject-wise breakdown</h2>
          <div className="flex flex-col gap-5">
            {subjectRows.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">{s.name}</span>
                  <span className="text-muted-foreground">{s.correct} correct · {s.wrong} wrong · {s.skipped} skipped</span>
                </div>
                <ProgressBar value={s.accuracy} max={100} colorClass={s.accuracy < 50 ? 'bg-danger' : s.accuracy < 75 ? 'bg-warning' : 'bg-success'} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
