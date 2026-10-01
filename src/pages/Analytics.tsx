import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProgressBar from '../components/ProgressBar'
import LineChart from '../components/charts/LineChart'
import SvgBarChart from '../components/charts/SvgBarChart'
import { getAttempts, clearAttempts } from '../lib/attempts'
import { overall, dailySeries, subjectProgress, topicStats, subjectExtremes, timeStats, mockScores, practiceStreak, weeklyComparison, WEAK_ACCURACY } from '../lib/stats'

function Tile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-2xl font-display font-extrabold mt-1 tabular-nums">{value}</p>
      {hint && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
    </div>
  )
}

function Section({ title, children, right }: { title: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <section className="card p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="font-semibold">{title}</h2>
        {right}
      </div>
      {children}
    </section>
  )
}

export default function Analytics() {
  const [attempts, setAttempts] = useState(() => getAttempts())
  const [topicSort, setTopicSort] = useState<'weakest' | 'most'>('weakest')
  const o = useMemo(() => overall(attempts), [attempts])
  const days30 = useMemo(() => dailySeries(attempts, 30), [attempts])
  const days14 = days30.slice(-14)
  const subs = useMemo(() => subjectProgress(attempts).filter((s) => s.answered > 0).sort((a, b) => (b.accuracy ?? 0) - (a.accuracy ?? 0)), [attempts])
  const topics = useMemo(() => {
    const t = topicStats(attempts)
    return topicSort === 'weakest' ? t.sort((a, b) => a.accuracy - b.accuracy) : t.sort((a, b) => b.attempted - a.attempted)
  }, [attempts, topicSort])
  const ext = useMemo(() => subjectExtremes(attempts), [attempts])
  const time = useMemo(() => timeStats(attempts), [attempts])
  const mocks = useMemo(() => mockScores(attempts), [attempts])
  const streak = practiceStreak(attempts)
  const week = weeklyComparison(attempts)

  if (attempts.length === 0) {
    return (
      <div className="pb-20">
        <PageHeader eyebrow="Analytics" title="Performance analytics" />
        <div className="max-w-3xl mx-auto px-6">
          <div className="card p-10 text-center">
            <p className="font-display font-bold text-lg mb-2">No attempts yet</p>
            <p className="text-muted-foreground mb-6">Answer some questions or take a test and your accuracy, weak topics, speed and mock scores will appear here.</p>
            <div className="flex justify-center gap-3">
              <Link to="/question-bank?cat=clinical" className="bg-primary text-primary-foreground rounded-lg px-5 py-2.5 text-sm font-semibold">
                Practise clinical MCQs
              </Link>
              <Link to="/tests" className="border border-border rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-secondary">
                Take a test
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const delta = week.thisWeek.answered - week.lastWeek.answered

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Analytics"
        title="Performance analytics"
        description="Computed from every question you have answered in this browser."
        actions={
          <button
            onClick={() => {
              if (window.confirm('Clear all attempt history? This cannot be undone.')) {
                clearAttempts()
                setAttempts([])
              }
            }}
            className="text-sm font-medium text-muted-foreground hover:text-danger border border-border rounded-lg px-4 py-2"
          >
            Clear history
          </button>
        }
      />
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <Tile label="Attempted" value={String(o.attempted)} hint={`${o.uniqueQuestions} unique`} />
          <Tile label="Correct" value={String(o.correct)} />
          <Tile label="Incorrect" value={String(o.wrong)} />
          <Tile label="Skipped" value={String(o.skipped)} />
          <Tile label="Accuracy" value={`${o.accuracy}%`} />
          <Tile label="Avg time / question" value={o.avgTime !== null ? `${o.avgTime}s` : '—'} />
          <Tile label="Daily streak" value={`${streak}d`} />
          <Tile label="This week" value={String(week.thisWeek.answered)} hint={`${delta >= 0 ? '+' : ''}${delta} vs last week`} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Section title="Accuracy over time" right={<span className="text-xs text-muted-foreground">Last 30 days</span>}>
            <LineChart data={days30.map((d) => ({ label: d.label, value: d.accuracy }))} ariaLabel="Daily accuracy over the last 30 days" />
          </Section>
          <Section title="Questions solved per day" right={<span className="text-xs text-muted-foreground">Last 14 days</span>}>
            <SvgBarChart data={days14.map((d) => ({ label: d.label.split(' ')[0], value: d.answered }))} formatValue={(v) => `${v} questions`} />
          </Section>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Section title="Subject-wise performance">
            <div className="flex flex-col gap-3">
              {subs.map((s) => (
                <div key={s.slug}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{s.name}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {s.accuracy}% · {s.answered} answered
                    </span>
                  </div>
                  <ProgressBar value={s.accuracy ?? 0} max={100} height={6} colorClass={(s.accuracy ?? 0) < WEAK_ACCURACY ? 'bg-danger' : 'bg-primary'} />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">Bars below {WEAK_ACCURACY}% accuracy are shown in red.</p>
          </Section>
          <div className="flex flex-col gap-6">
            <Section title="Strongest subjects">
              {ext.strongest.length ? (
                <ul className="text-sm flex flex-col gap-1.5">
                  {ext.strongest.map((s) => (
                    <li key={s.slug} className="flex justify-between">
                      {s.name} <span className="tabular-nums text-success font-medium">{s.accuracy}%</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Answer at least 5 questions in a subject to rank it.</p>
              )}
            </Section>
            <Section title="Weakest subjects">
              {ext.weakest.length ? (
                <ul className="text-sm flex flex-col gap-1.5">
                  {ext.weakest.map((s) => (
                    <li key={s.slug} className="flex justify-between">
                      {s.name} <span className="tabular-nums text-danger font-medium">{s.accuracy}%</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Answer at least 5 questions in a subject to rank it.</p>
              )}
            </Section>
          </div>
        </div>

        <Section
          title="Topic-wise performance"
          right={
            <div className="flex gap-1">
              {(['weakest', 'most'] as const).map((k) => (
                <button key={k} onClick={() => setTopicSort(k)} className={`tag border ${topicSort === k ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground'}`}>
                  {k === 'weakest' ? 'Weakest first' : 'Most practised'}
                </button>
              ))}
            </div>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground text-left">
                <tr>
                  <th className="py-1.5 font-medium">Topic</th>
                  <th className="py-1.5 font-medium">Subject</th>
                  <th className="py-1.5 font-medium text-right">Answered</th>
                  <th className="py-1.5 font-medium text-right">Accuracy</th>
                  <th className="py-1.5 font-medium pl-4">Flag</th>
                </tr>
              </thead>
              <tbody>
                {topics.slice(0, 20).map((t) => (
                  <tr key={`${t.subject}-${t.topic}`} className="border-t border-border">
                    <td className="py-1.5">{t.topic}</td>
                    <td className="py-1.5 text-muted-foreground">{t.subjectName}</td>
                    <td className="py-1.5 text-right tabular-nums">{t.attempted}</td>
                    <td className={`py-1.5 text-right tabular-nums font-medium ${t.reasons.length ? 'text-danger' : ''}`}>{t.accuracy}%</td>
                    <td className="py-1.5 pl-4 text-xs text-muted-foreground">{t.reasons.join(' · ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <div className="grid gap-6 lg:grid-cols-3">
          <Section title="Average time per question">
            {time.perSubject.length ? (
              <ul className="text-sm flex flex-col gap-1.5">
                {time.perSubject.map((s) => (
                  <li key={s.name} className="flex justify-between">
                    {s.name} <span className="tabular-nums text-muted-foreground">{s.avg}s</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Per-question timing is recorded in tests.</p>
            )}
          </Section>
          <Section title="Fastest answers">
            <ul className="text-sm flex flex-col gap-1.5">
              {time.fastest.map((t) => (
                <li key={`f-${t.questionId}-${t.seconds}`} className="flex justify-between gap-2">
                  <Link to={`/question/${t.questionId}`} className="truncate hover:text-primary">
                    {t.topic}
                  </Link>
                  <span className={`tabular-nums shrink-0 ${t.isCorrect ? 'text-success' : 'text-danger'}`}>{t.seconds}s</span>
                </li>
              ))}
            </ul>
          </Section>
          <Section title="Slowest answers">
            <ul className="text-sm flex flex-col gap-1.5">
              {time.slowest.map((t) => (
                <li key={`s-${t.questionId}-${t.seconds}`} className="flex justify-between gap-2">
                  <Link to={`/question/${t.questionId}`} className="truncate hover:text-primary">
                    {t.topic}
                  </Link>
                  <span className={`tabular-nums shrink-0 ${t.isCorrect ? 'text-success' : 'text-danger'}`}>{t.seconds}s</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-2">Green = answered correctly, red = wrong.</p>
          </Section>
        </div>

        <Section title="Mock-test scores">
          {mocks.length === 0 ? (
            <p className="text-sm text-muted-foreground">Scores from tests of 20+ questions appear here.</p>
          ) : (
            <>
              <LineChart data={mocks.map((m, i) => ({ label: `#${i + 1}`, value: Math.max(0, m.pct) }))} ariaLabel="Mock-test score percentage, oldest to newest" width={1100} height={180} />
              <table className="w-full text-sm mt-4">
                <thead className="text-xs text-muted-foreground text-left">
                  <tr>
                    <th className="py-1.5 font-medium">#</th>
                    <th className="py-1.5 font-medium">Test</th>
                    <th className="py-1.5 font-medium">Date</th>
                    <th className="py-1.5 font-medium text-right">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {mocks.map((m, i) => (
                    <tr key={m.id} className="border-t border-border">
                      <td className="py-1.5 tabular-nums">{i + 1}</td>
                      <td className="py-1.5">{m.label}</td>
                      <td className="py-1.5 text-muted-foreground">{new Date(m.date).toLocaleDateString('en-IN')}</td>
                      <td className="py-1.5 text-right tabular-nums">
                        {m.score}/{m.max} ({m.pct}%)
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </Section>

        <Section title="History">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground text-left">
                <tr>
                  <th className="py-1.5 font-medium">Date</th>
                  <th className="py-1.5 font-medium">Session</th>
                  <th className="py-1.5 font-medium text-right">Correct</th>
                  <th className="py-1.5 font-medium text-right">Score</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {attempts.slice(0, 30).map((a) => (
                  <tr key={a.id} className="border-t border-border">
                    <td className="py-1.5 text-muted-foreground whitespace-nowrap">{new Date(a.date).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</td>
                    <td className="py-1.5">{a.label}</td>
                    <td className="py-1.5 text-right tabular-nums">
                      {a.correct}/{a.totalQuestions}
                    </td>
                    <td className="py-1.5 text-right tabular-nums">{a.maxScore ? `${a.score}/${a.maxScore}` : '—'}</td>
                    <td className="py-1.5 text-right">
                      {a.sourceRoute && (
                        <Link to={a.sourceRoute} className="text-xs font-semibold text-primary hover:underline">
                          Retake
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </div>
  )
}
