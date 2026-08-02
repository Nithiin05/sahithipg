import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import ProgressBar from '../ProgressBar'
import SvgBarChart from '../charts/SvgBarChart'
import { getStudyHistoryDays, getLifetimeStudySeconds, getStudyStreak, formatStudyTime } from '../../lib/studyTimer'
import { getRecommendations } from '../../lib/recommendations'
import type { AttemptRecord, SubjectSlug } from '../../types'

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function pct(n: number) {
  return `${Math.round(n)}%`
}

export default function DashboardTab({ attempts }: { attempts: AttemptRecord[] }) {
  const stats = useMemo(() => {
    let totalCorrect = 0
    let totalAttempted = 0
    let totalDurationSec = 0
    let scorePcts: number[] = []
    let mockCompleted = 0
    let pyqCompleted = 0
    let grandCompleted = 0

    for (const a of attempts) {
      totalCorrect += a.correct
      totalAttempted += a.attempted
      totalDurationSec += a.durationSec
      if (a.maxScore > 0) scorePcts.push((a.score / a.maxScore) * 100)
      if (a.kind === 'grand') grandCompleted++
      else if (a.kind === 'mock') {
        if (a.mockKind === 'pyq') pyqCompleted++
        else mockCompleted++
      }
    }

    const overallAccuracy = totalAttempted > 0 ? (totalCorrect / totalAttempted) * 100 : 0
    const avgScore = scorePcts.length > 0 ? scorePcts.reduce((s, v) => s + v, 0) / scorePcts.length : 0
    const highest = scorePcts.length > 0 ? Math.max(...scorePcts) : 0
    const lowest = scorePcts.length > 0 ? Math.min(...scorePcts) : 0
    const avgTimePerQuestion = totalAttempted > 0 ? totalDurationSec / totalAttempted : 0

    return {
      totalTests: attempts.length,
      totalQuestionsSolved: totalAttempted,
      overallAccuracy,
      avgScore,
      highest,
      lowest,
      avgTimePerQuestion,
      mockCompleted,
      pyqCompleted,
      grandCompleted,
    }
  }, [attempts])

  const subjectStats = useMemo(() => {
    const map = new Map<SubjectSlug, { subjectName: string; correct: number; total: number }>()
    for (const attempt of attempts) {
      for (const ans of attempt.answers) {
        if (ans.isCorrect === null) continue
        const entry = map.get(ans.subject) ?? { subjectName: ans.subjectName, correct: 0, total: 0 }
        entry.total++
        if (ans.isCorrect) entry.correct++
        map.set(ans.subject, entry)
      }
    }
    return [...map.entries()]
      .map(([slug, v]) => ({ slug, ...v, accuracy: Math.round((v.correct / v.total) * 100) }))
      .sort((a, b) => b.accuracy - a.accuracy)
  }, [attempts])

  const topicStats = useMemo(() => {
    const map = new Map<string, { subject: string; correct: number; wrong: number; total: number }>()
    for (const attempt of attempts) {
      for (const ans of attempt.answers) {
        if (ans.isCorrect === null) continue
        const key = `${ans.subjectName} · ${ans.topic}`
        const entry = map.get(key) ?? { subject: ans.subjectName, correct: 0, wrong: 0, total: 0 }
        entry.total++
        if (ans.isCorrect) entry.correct++
        else entry.wrong++
        map.set(key, entry)
      }
    }
    return [...map.entries()]
      .map(([topic, s]) => ({ topic, ...s, accuracy: Math.round((s.correct / s.total) * 100) }))
      .sort((a, b) => a.accuracy - b.accuracy)
  }, [attempts])

  const weeklyStudyData = useMemo(
    () =>
      getStudyHistoryDays(7).map((d) => ({
        label: WEEKDAY_LABELS[new Date(d.date).getDay()],
        value: Math.round(d.seconds / 60),
      })),
    [attempts],
  )

  const monthlyProgressData = useMemo(() => {
    const days = getStudyHistoryDays(30).map((d) => d.date)
    const byDate = new Map<string, { correct: number; total: number }>()
    for (const a of attempts) {
      const key = a.date.slice(0, 10)
      const entry = byDate.get(key) ?? { correct: 0, total: 0 }
      entry.correct += a.correct
      entry.total += a.attempted
      byDate.set(key, entry)
    }
    return days.map((date) => {
      const v = byDate.get(date)
      const accuracy = v && v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0
      return { label: String(new Date(date).getDate()), value: accuracy }
    })
  }, [attempts])

  const lifetimeStudySeconds = getLifetimeStudySeconds()
  const studyStreak = getStudyStreak()
  const recommendations = useMemo(() => getRecommendations(attempts), [attempts])

  const bestSubject = subjectStats[0]
  const weakestSubject = subjectStats[subjectStats.length - 1]

  const METRICS = [
    { label: 'Tests Attempted', value: stats.totalTests },
    { label: 'Questions Solved', value: stats.totalQuestionsSolved },
    { label: 'Overall Accuracy', value: pct(stats.overallAccuracy) },
    { label: 'Average Score', value: pct(stats.avgScore) },
    { label: 'Avg Time / Question', value: `${Math.round(stats.avgTimePerQuestion)}s` },
    { label: 'Highest Score', value: pct(stats.highest) },
    { label: 'Lowest Score', value: pct(stats.lowest) },
    { label: 'Best Subject', value: bestSubject?.subjectName ?? '—' },
    { label: 'Weakest Subject', value: weakestSubject?.subjectName ?? '—' },
    { label: 'Total Study Time', value: formatStudyTime(lifetimeStudySeconds) },
    { label: 'Study Streak', value: `${studyStreak} day${studyStreak === 1 ? '' : 's'}` },
    { label: 'Mock Tests Completed', value: stats.mockCompleted },
    { label: 'Grand Tests Completed', value: stats.grandCompleted },
    { label: 'PYQ Sets Completed', value: stats.pyqCompleted },
  ]

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {METRICS.map((m) => (
          <div key={m.label} className="card p-4 text-center">
            <p className="font-display font-extrabold text-xl truncate">{m.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      {recommendations.length > 0 && (
        <div className="card p-6 mb-8">
          <h2 className="font-display font-bold text-lg mb-1">Smart recommendations</h2>
          <p className="text-sm text-muted-foreground mb-5">Personalized based on your recent performance.</p>
          <div className="flex flex-col gap-3">
            {recommendations.map((r) => (
              <div
                key={r.id}
                className={`flex items-start justify-between gap-4 rounded-lg px-4 py-3 text-sm ${
                  r.tone === 'positive' ? 'bg-success-bg text-success' : r.tone === 'warning' ? 'bg-warning-bg text-warning' : 'bg-danger-bg text-danger'
                }`}
              >
                <span>{r.message}</span>
                {r.actionRoute && (
                  <Link to={r.actionRoute} className="shrink-0 font-semibold underline underline-offset-2">
                    {r.actionLabel ?? 'Go'}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="card p-6">
          <h2 className="font-display font-bold text-lg mb-1">Weekly study graph</h2>
          <p className="text-sm text-muted-foreground mb-5">Minutes studied per day, last 7 days.</p>
          <SvgBarChart data={weeklyStudyData} formatValue={(v) => `${v} min`} />
        </div>
        <div className="card p-6">
          <h2 className="font-display font-bold text-lg mb-1">Monthly progress graph</h2>
          <p className="text-sm text-muted-foreground mb-5">Accuracy % per day, last 30 days.</p>
          <SvgBarChart data={monthlyProgressData} formatValue={(v) => `${v}%`} />
        </div>
      </div>

      <div className="card p-6 mb-8">
        <h2 className="font-display font-bold text-lg mb-1">Subject-wise accuracy</h2>
        <p className="text-sm text-muted-foreground mb-5">How you're doing across each subject.</p>
        <div className="flex flex-col gap-4">
          {subjectStats.map((s) => (
            <div key={s.slug}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium">{s.subjectName}</span>
                <span className="text-muted-foreground">{s.accuracy}% ({s.correct}/{s.total})</span>
              </div>
              <ProgressBar value={s.accuracy} max={100} colorClass={s.accuracy < 50 ? 'bg-danger' : s.accuracy < 75 ? 'bg-warning' : 'bg-success'} />
            </div>
          ))}
        </div>
      </div>

      {subjectStats.length >= 2 && (
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="card p-6">
            <h2 className="font-display font-bold text-lg mb-4 text-success">Strengths</h2>
            <div className="flex flex-col gap-3">
              {subjectStats.slice(0, 2).map((s) => (
                <div key={s.slug} className="flex justify-between text-sm">
                  <span>{s.subjectName}</span>
                  <span className="font-semibold text-success">{s.accuracy}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <h2 className="font-display font-bold text-lg mb-4 text-danger">Weaknesses</h2>
            <div className="flex flex-col gap-3">
              {[...subjectStats].reverse().slice(0, 2).map((s) => (
                <div key={s.slug} className="flex justify-between text-sm">
                  <span>{s.subjectName}</span>
                  <span className="font-semibold text-danger">{s.accuracy}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="card p-6">
        <h2 className="font-display font-bold text-lg mb-1">Topic-wise performance</h2>
        <p className="text-sm text-muted-foreground mb-5">Lowest accuracy topics first — drill these to gain the most marks.</p>
        <div className="flex flex-col gap-4">
          {topicStats.map((t) => (
            <div key={t.topic}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium">{t.topic}</span>
                <span className="text-muted-foreground">{t.accuracy}% ({t.correct}/{t.total})</span>
              </div>
              <ProgressBar value={t.accuracy} max={100} colorClass={t.accuracy < 50 ? 'bg-danger' : t.accuracy < 75 ? 'bg-warning' : 'bg-success'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
