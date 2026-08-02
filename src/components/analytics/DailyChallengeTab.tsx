import { useMemo, useState } from 'react'
import AdHocQuiz from '../AdHocQuiz'
import SvgBarChart from '../charts/SvgBarChart'
import {
  getDailyChallengeItems,
  getDailyChallengeResult,
  getDailyChallengeHistory,
  saveDailyChallengeResult,
  todayKey,
} from '../../lib/dailyChallenge'
import type { AttemptRecord } from '../../types'

export default function DailyChallengeTab() {
  const [playing, setPlaying] = useState(false)
  const [tick, setTick] = useState(0)

  const items = useMemo(() => getDailyChallengeItems(), [])
  const todayResult = useMemo(() => getDailyChallengeResult(), [tick])
  const history = useMemo(() => getDailyChallengeHistory(14), [tick])

  const handleComplete = (attempt: AttemptRecord) => {
    saveDailyChallengeResult({
      date: todayKey(),
      correct: attempt.correct,
      total: attempt.totalQuestions,
      accuracy: attempt.attempted > 0 ? Math.round((attempt.correct / attempt.attempted) * 100) : 0,
      timeTakenSec: attempt.durationSec,
      score: attempt.score,
    })
    setTick((t) => t + 1)
  }

  if (playing) {
    return (
      <AdHocQuiz
        items={items}
        label={`Daily Challenge — ${todayKey()}`}
        onExit={() => {
          setPlaying(false)
          setTick((t) => t + 1)
        }}
        onComplete={handleComplete}
      />
    )
  }

  const chartData = [...history].reverse().map((r) => ({
    label: `${new Date(r.date).getDate()}`,
    value: r.accuracy,
  }))

  return (
    <div>
      <div className="card p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-lg mb-1">Today's Daily Challenge</h2>
            <p className="text-sm text-muted-foreground">
              {items.length} fresh questions pooled across all 19 subjects — same set for everyone today.
            </p>
          </div>
          {todayResult ? (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-display font-extrabold text-primary">{todayResult.accuracy}% accuracy</p>
                <p className="text-xs text-muted-foreground">{todayResult.correct}/{todayResult.total} correct</p>
              </div>
              <button
                onClick={() => setPlaying(true)}
                className="border border-border rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary"
              >
                Retry
              </button>
            </div>
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="bg-primary text-primary-foreground rounded-lg px-5 py-2.5 text-sm font-semibold hover:opacity-90"
            >
              Start Challenge
            </button>
          )}
        </div>
      </div>

      {history.length > 1 && (
        <div className="card p-6">
          <h2 className="font-display font-bold text-lg mb-1">Compare with previous days</h2>
          <p className="text-sm text-muted-foreground mb-5">Accuracy % per day for your recent Daily Challenges.</p>
          <SvgBarChart data={chartData} formatValue={(v) => `${v}%`} />
        </div>
      )}
    </div>
  )
}
