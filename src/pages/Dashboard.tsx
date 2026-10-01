import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, BookmarkCheck, CalendarClock, RotateCcw, Star, XCircle } from 'lucide-react'
import ExamCountdown from '../components/ExamCountdown'
import ProgressBar from '../components/ProgressBar'
import ResumeBanner from '../components/ResumeBanner'
import { getAttempts } from '../lib/attempts'
import { today, topicsCovered, subjectProgress, weakAreas, latestAnswers } from '../lib/stats'
import { readStudyTimer, getElapsedSeconds } from '../lib/studyTimer'
import { getDueRevision } from '../lib/revisionQueue'
import { getProfileName, setProfileName, greeting } from '../lib/profile'
import { examConfig } from '../config/examConfig'
import { usePageTitle } from '../hooks/usePageTitle'
import { getTodayPlan } from '../lib/studyPlanner'

export default function Dashboard() {
  usePageTitle('Dashboard')
  const attempts = useMemo(() => getAttempts(), [])
  const [name, setName] = useState(() => getProfileName())
  const [draft, setDraft] = useState('')

  const t = today(attempts)
  const studyMin = Math.round(getElapsedSeconds(readStudyTimer()) / 60)
  const covered = topicsCovered(attempts)
  const subjects = subjectProgress(attempts)
  const weak = weakAreas(attempts, 5)
  const latest = latestAnswers(attempts)
  const incorrect = [...latest.values()].filter((a) => a.isCorrect === false).length
  const marked = [...latest.values()].filter((a) => a.marked).length
  const due = getDueRevision().length
  const plan = getTodayPlan(attempts)

  const queue = [
    { label: 'Incorrect questions', count: incorrect, to: '/revision?list=incorrect', Icon: XCircle },
    { label: 'Marked for review', count: marked, to: '/revision?list=marked', Icon: Star },
    { label: 'Due for revision', count: due, to: '/revision?list=due', Icon: CalendarClock },
    { label: 'Weak topics', count: weak.length, to: '/revision?list=weak', Icon: AlertTriangle },
    { label: 'High-yield, not yet attempted', count: null, to: '/revision?list=high-yield', Icon: BookmarkCheck },
  ]

  return (
    <div className="pb-20">
      <ResumeBanner />
      <div className="max-w-6xl mx-auto px-6 pt-10 flex flex-col gap-6">
        <div className="card p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="font-display font-extrabold" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
              {greeting()}
              {name ? `, ${name}` : ''}
            </h1>
            <p className="text-muted-foreground mt-1">
              {examConfig.shortName} November 2026 · {examConfig.conductingBody}
            </p>
            {!name && (
              <form
                className="mt-3 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  setProfileName(draft)
                  setName(getProfileName())
                }}
              >
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Your name"
                  className="border border-border rounded-lg px-3 py-1.5 text-sm bg-surface"
                  aria-label="Your name"
                />
                <button className="text-sm font-semibold text-primary">Save</button>
              </form>
            )}
          </div>
          <ExamCountdown compact />
        </div>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Today's progress</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Questions solved', value: String(t.attempted) },
              { label: 'Accuracy', value: t.attempted ? `${t.accuracy}%` : '—' },
              { label: 'Study time', value: `${studyMin} min` },
              { label: 'Topics covered', value: `${covered.pct}%`, hint: `${covered.done} of ${covered.total}` },
            ].map((m) => (
              <div key={m.label} className="card p-5">
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className="text-2xl font-display font-extrabold mt-1">{m.value}</p>
                {m.hint && <p className="text-xs text-muted-foreground mt-0.5">{m.hint}</p>}
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] items-start">
          <section className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Subject progress</h2>
              <span className="text-xs text-muted-foreground">Questions attempted · accuracy</span>
            </div>
            <div className="flex flex-col gap-3">
              {subjects.map((s) => (
                <Link key={s.slug} to={`/subjects/${s.slug}`} className="group">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="group-hover:text-primary">{s.name}</span>
                    <span className="text-muted-foreground tabular-nums">
                      {s.coverage}%{s.accuracy !== null ? ` · ${s.accuracy}% correct` : ''}
                    </span>
                  </div>
                  <ProgressBar value={s.uniqueAttempted} max={s.totalQuestions} height={6} />
                </Link>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-6">
            <section className="card p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold">Today's plan</h2>
                <Link to="/planner" className="text-xs font-semibold text-primary hover:underline">
                  Planner
                </Link>
              </div>
              <ol className="flex flex-col gap-2 text-sm">
                {plan.tasks.map((task, i) => (
                  <li key={task.id}>
                    <Link to={task.to} className="flex gap-3 items-start hover:text-primary">
                      <span className="w-5 h-5 rounded-full bg-secondary text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      <span>
                        {task.title}
                        {task.detail && <span className="block text-xs text-muted-foreground">{task.detail}</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>

            <section className="card p-6">
              <h2 className="font-semibold mb-3">Weak areas</h2>
              {weak.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Weak areas appear once you have answered at least 3 questions in a topic. A topic is flagged when accuracy is below 60%, it is well
                  below your average over many questions, or you have repeated a mistake.
                </p>
              ) : (
                <ol className="flex flex-col gap-2.5">
                  {weak.map((w, i) => (
                    <li key={`${w.subject}-${w.topic}`} className="text-sm">
                      <div className="flex justify-between gap-3">
                        <span>
                          {i + 1}. {w.topic} <span className="text-muted-foreground">· {w.subjectName}</span>
                        </span>
                        <span className="tabular-nums font-medium text-danger shrink-0">{w.accuracy}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{w.reasons.join(' · ')}</p>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          </div>
        </div>

        <section className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Revision queue</h2>
            <Link to="/revision" className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
              My Revision <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {queue.map(({ label, count, to, Icon }) => (
              <Link key={label} to={to} className="rounded-lg border border-border p-4 hover:bg-secondary transition-colors">
                <Icon size={16} className="text-muted-foreground" />
                <p className="text-sm font-medium mt-2">{label}</p>
                {count !== null && <p className="text-xl font-display font-extrabold mt-1">{count}</p>}
              </Link>
            ))}
          </div>
          {attempts.length === 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/tests" className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold">
                Take a test
              </Link>
              <Link to="/question-bank?cat=clinical" className="border border-border rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary inline-flex items-center gap-1.5">
                <RotateCcw size={14} /> Practise clinical MCQs
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
