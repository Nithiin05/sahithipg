import { useMemo, useState } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { RotateCcw } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import QuestionCard from '../components/QuestionCard'
import { getAttempts } from '../lib/attempts'
import { findQuestionItem } from '../lib/quizEngine'
import { isQueued, toggleRevision } from '../lib/revisionQueue'
import { questionDifficulty, DIFFICULTY_LABELS, DIFFICULTIES } from '../lib/difficulty'
import type { AttemptRecord } from '../types'
import ReservedGate from '../components/ReservedGate'

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
  return (
    <ReservedGate ids={attempt?.answers.map((a) => a.questionId) ?? []}>
      <ResultView />
    </ReservedGate>
  )
}

function ResultView() {
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

  const byDifficulty = useMemo(() => {
    const m = new Map<string, { total: number; correct: number; wrong: number }>()
    for (const { a, item } of items) {
      const d = questionDifficulty(item.question)
      const e = m.get(d) ?? { total: 0, correct: 0, wrong: 0 }
      e.total++
      if (a.isCorrect === true) e.correct++
      if (a.isCorrect === false) e.wrong++
      m.set(d, e)
    }
    return DIFFICULTIES.filter((d) => m.has(d)).map((d) => ({ d, ...m.get(d)! }))
  }, [items])

  // Topics with at least 2 questions, ranked by net accuracy — weakest and strongest.
  const topics = useMemo(() => {
    const m = new Map<string, { name: string; total: number; correct: number }>()
    for (const { a, item } of items) {
      const key = `${item.subjectName} · ${item.topic}`
      const e = m.get(key) ?? { name: key, total: 0, correct: 0 }
      e.total++
      if (a.isCorrect === true) e.correct++
      m.set(key, e)
    }
    const list = [...m.values()].filter((t) => t.total >= 2).map((t) => ({ ...t, pct: Math.round((t.correct / t.total) * 100) }))
    list.sort((x, y) => x.pct - y.pct || y.total - x.total)
    return { weak: list.slice(0, 5), strong: [...list].reverse().filter((t) => t.pct >= 70).slice(0, 5) }
  }, [items])

  if (!attempt) return <Navigate to="/tests" replace />
  const notEvaluated = attempt.answers.filter((a) => a.notEvaluated).length

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

        {notEvaluated > 0 && (
          <p className="rounded-lg bg-warning-bg px-4 py-3 text-sm">
            {notEvaluated} answered question{notEvaluated === 1 ? ' was' : 's were'} still marked for review at submission and scored 0, as in the
            AIIMS pattern. They are counted under “Not answered”.
          </p>
        )}
        <p className="text-xs text-muted-foreground -mt-2">
          Score = correct × {mc} − wrong × {Math.round(mw * 1000) / 1000}. No percentile or rank is shown: that needs results from a real cohort of
          candidates, which this site does not collect.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-5">
            <h2 className="font-semibold mb-3">By difficulty</h2>
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground text-left">
                <tr>
                  <th className="py-1 font-medium">Level</th>
                  <th className="py-1 font-medium text-right">Correct</th>
                  <th className="py-1 font-medium text-right">Wrong</th>
                  <th className="py-1 font-medium text-right">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {byDifficulty.map((r) => (
                  <tr key={r.d} className="border-t border-border">
                    <td className="py-1.5">{DIFFICULTY_LABELS[r.d]}</td>
                    <td className="py-1.5 text-right">
                      {r.correct}/{r.total}
                    </td>
                    <td className="py-1.5 text-right">{r.wrong}</td>
                    <td className="py-1.5 text-right font-medium">{r.correct + r.wrong ? Math.round((r.correct / (r.correct + r.wrong)) * 100) : 0}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <h2 className="font-semibold mb-3">Topics</h2>
            {topics.weak.length === 0 ? (
              <p className="text-sm text-muted-foreground">Not enough questions per topic to compare.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1.5">Weakest</p>
                  <ul className="flex flex-col gap-1">
                    {topics.weak.map((t) => (
                      <li key={t.name} className="flex justify-between gap-3">
                        <span className="truncate">{t.name}</span>
                        <span className="shrink-0 tabular-nums text-danger">
                          {t.correct}/{t.total}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                {topics.strong.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1.5">Strongest</p>
                    <ul className="flex flex-col gap-1">
                      {topics.strong.map((t) => (
                        <li key={t.name} className="flex justify-between gap-3">
                          <span className="truncate">{t.name}</span>
                          <span className="shrink-0 tabular-nums text-success">
                            {t.correct}/{t.total}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
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
                  <div className="flex justify-between items-center gap-3 mt-2">
                    <span className="text-xs text-muted-foreground">
                      {a.notEvaluated ? 'Answered but still marked for review — scored 0.' : a.isCorrect === false ? `−${Math.round(mw * 100) / 100} mark` : ''}
                    </span>
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
