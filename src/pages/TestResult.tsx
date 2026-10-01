import { useMemo, useState } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { RotateCcw } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import QuestionCard from '../components/QuestionCard'
import { getAttempts } from '../lib/attempts'
import { findQuestionItem } from '../lib/quizEngine'
import { isQueued, toggleRevision } from '../lib/revisionQueue'
import type { AttemptRecord } from '../types'

type Filter = 'all' | 'wrong' | 'skipped' | 'marked' | 'correct'

function fmtDuration(sec: number) {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  return h ? `${h}h ${m}m` : m ? `${m}m ${s}s` : `${s}s`
}

export default function TestResult() {
  const { testId = '' } = useParams()
  const location = useLocation()
  const attempt: AttemptRecord | undefined =
    (location.state as { attempt?: AttemptRecord } | null)?.attempt ?? getAttempts().find((a) => a.testId === testId)
  const [filter, setFilter] = useState<Filter>('all')
  const [, setTick] = useState(0)

  const items = useMemo(
    () =>
      (attempt?.answers ?? [])
        .map((a) => ({ a, item: findQuestionItem(a.questionId) }))
        .filter((x): x is { a: (typeof x)['a']; item: NonNullable<(typeof x)['item']> } => !!x.item),
    [attempt],
  )

  const bySubject = useMemo(() => {
    const m = new Map<string, { name: string; total: number; correct: number; wrong: number }>()
    for (const { a } of items) {
      const e = m.get(a.subject) ?? { name: a.subjectName, total: 0, correct: 0, wrong: 0 }
      e.total++
      if (a.isCorrect === true) e.correct++
      if (a.isCorrect === false) e.wrong++
      m.set(a.subject, e)
    }
    return [...m.values()].sort((x, y) => y.total - x.total)
  }, [items])

  if (!attempt) return <Navigate to="/tests" replace />

  const mc = attempt.marksCorrect ?? 1
  const mw = attempt.marksWrong ?? 0
  const accuracy = attempt.attempted ? Math.round((attempt.correct / attempt.attempted) * 100) : 0
  const lost = Math.round(attempt.wrong * mw * 100) / 100
  const timed = items.filter((x) => (x.a.timeSpentSec ?? 0) > 0)
  const avgTime = timed.length ? Math.round(timed.reduce((s, x) => s + (x.a.timeSpentSec ?? 0), 0) / timed.length) : null
  const slowest = [...timed].sort((x, y) => (y.a.timeSpentSec ?? 0) - (x.a.timeSpentSec ?? 0)).slice(0, 5)

  const shown = items.filter(({ a }) => {
    if (filter === 'wrong') return a.isCorrect === false
    if (filter === 'skipped') return a.isCorrect === null
    if (filter === 'marked') return a.marked
    if (filter === 'correct') return a.isCorrect === true
    return true
  })
  const counts: Record<Filter, number> = {
    all: items.length,
    correct: attempt.correct,
    wrong: attempt.wrong,
    skipped: attempt.skipped,
    marked: items.filter((x) => x.a.marked).length,
  }

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Result"
        title={attempt.label}
        description={new Date(attempt.date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
        actions={
          <div className="flex gap-2">
            {attempt.sourceRoute && (
              <Link to={attempt.sourceRoute} className="border border-border rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary">
                Retake
              </Link>
            )}
            <Link to="/revision" className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold">
              My Revision
            </Link>
          </div>
        }
      />

      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-6">
        <div className="card p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          {[
            [`${attempt.score} / ${attempt.maxScore}`, 'Score', 'text-primary'],
            [`${accuracy}%`, 'Accuracy', ''],
            [String(attempt.correct), 'Correct', 'text-success'],
            [String(attempt.wrong), 'Wrong', 'text-danger'],
            [String(attempt.skipped), 'Not answered', 'text-muted-foreground'],
            [`−${lost}`, 'Lost to negative marking', 'text-warning'],
          ].map(([v, l, c]) => (
            <div key={l}>
              <p className={`text-2xl font-display font-extrabold ${c}`}>{v}</p>
              <p className="text-xs text-muted-foreground mt-1">{l}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-5">
            <h2 className="font-semibold mb-3">Subject-wise</h2>
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground text-left">
                <tr>
                  <th className="py-1 font-medium">Subject</th>
                  <th className="py-1 font-medium text-right">Correct</th>
                  <th className="py-1 font-medium text-right">Wrong</th>
                  <th className="py-1 font-medium text-right">Net</th>
                </tr>
              </thead>
              <tbody>
                {bySubject.map((s) => (
                  <tr key={s.name} className="border-t border-border">
                    <td className="py-1.5">{s.name}</td>
                    <td className="py-1.5 text-right">
                      {s.correct}/{s.total}
                    </td>
                    <td className="py-1.5 text-right">{s.wrong}</td>
                    <td className="py-1.5 text-right font-medium">{Math.round((s.correct * mc - s.wrong * mw) * 100) / 100}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <h2 className="font-semibold mb-3">Time</h2>
            <p className="text-sm text-muted-foreground">
              Total {fmtDuration(attempt.durationSec)}
              {avgTime !== null && ` · average ${avgTime}s per question`}
            </p>
            {slowest.length > 0 && (
              <>
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mt-4 mb-2">Slowest questions</p>
                <ul className="text-sm flex flex-col gap-1.5">
                  {slowest.map(({ a, item }) => (
                    <li key={a.questionId} className="flex justify-between gap-3">
                      <span className="truncate">
                        {item.subjectName} · {item.topic}
                      </span>
                      <span className="shrink-0 tabular-nums text-muted-foreground">{a.timeSpentSec}s</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {(['all', 'wrong', 'skipped', 'marked', 'correct'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`tag border capitalize ${filter === f ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}
              >
                {f === 'skipped' ? 'Not answered' : f} ({counts[f]})
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-5">
            {shown.map(({ a, item }) => {
              const idx = items.findIndex((x) => x.a.questionId === a.questionId)
              const queued = isQueued(a.questionId)
              return (
                <div key={a.questionId}>
                  <QuestionCard question={item.question} index={idx} total={items.length} selectedIndex={a.selectedIndex} showResult />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => {
                        toggleRevision(a.questionId, a.subject)
                        setTick((t) => t + 1)
                      }}
                      className={`text-xs font-semibold inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${queued ? 'border-primary text-primary bg-primary/5' : 'border-border text-muted-foreground hover:bg-secondary'}`}
                    >
                      <RotateCcw size={12} /> {queued ? 'In revision queue' : 'Revise again'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
