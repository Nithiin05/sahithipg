import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Circle } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { getStudyPlan, saveStudyPlan, examCountdownParts, getTodayPlan, getDoneTasks, toggleDoneTask } from '../lib/studyPlanner'
import { getAttempts } from '../lib/attempts'
import { subjects } from '../data/subjects'
import type { PrepLevel, StudyPlanState, SubjectSlug } from '../types'

const LEVELS: { key: PrepLevel; label: string; hint: string }[] = [
  { key: 'beginner', label: 'Beginner', hint: 'First pass through most subjects' },
  { key: 'intermediate', label: 'Intermediate', hint: 'Covered most subjects once' },
  { key: 'advanced', label: 'Advanced', hint: 'Revising and taking mocks' },
]

function SubjectPicker({ value, onChange, disabled }: { value: SubjectSlug[]; onChange: (v: SubjectSlug[]) => void; disabled: SubjectSlug[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {subjects.map((s) => {
        const on = value.includes(s.slug)
        const off = disabled.includes(s.slug)
        return (
          <button
            key={s.slug}
            type="button"
            disabled={off}
            onClick={() => onChange(on ? value.filter((x) => x !== s.slug) : [...value, s.slug])}
            className={`tag border transition-colors ${on ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:bg-secondary'} ${off ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            {s.shortName}
          </button>
        )
      })}
    </div>
  )
}

export default function StudyPlanner() {
  const [plan, setPlan] = useState<StudyPlanState>(() => getStudyPlan())
  const attempts = useMemo(() => getAttempts(), [])
  const todayDate = new Date().toISOString().slice(0, 10)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const daily = useMemo(() => getTodayPlan(attempts, todayDate), [attempts, todayDate, plan])
  const [done, setDone] = useState(() => getDoneTasks(todayDate))
  const { weeks, days } = examCountdownParts(plan.examDate)
  const update = (patch: Partial<StudyPlanState>) => setPlan(saveStudyPlan(patch))

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Study Planner"
        title="Your adaptive daily plan"
        description="Set your exam date, hours and strengths once. Each day's tasks are chosen from your weak areas, coverage gaps and high-yield modules, and change as your results change."
      />
      <div className="max-w-6xl mx-auto px-6 grid gap-6 lg:grid-cols-[1fr_1.2fr] items-start">
        <section className="card p-6 flex flex-col gap-5">
          <h2 className="font-semibold">Settings</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm font-medium flex flex-col gap-1.5">
              Exam date
              <input
                type="date"
                value={plan.examDate}
                onChange={(e) => update({ examDate: e.target.value })}
                className="border border-border rounded-lg px-3 py-2 bg-surface font-normal"
              />
              <span className="text-xs text-muted-foreground font-normal">
                {weeks} weeks, {days} days left
              </span>
            </label>
            <label className="text-sm font-medium flex flex-col gap-1.5">
              Hours per day
              <select
                value={Math.round(plan.dailyGoalMinutes / 60)}
                onChange={(e) => update({ dailyGoalMinutes: Number(e.target.value) * 60 })}
                className="border border-border rounded-lg px-3 py-2 bg-surface font-normal"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((h) => (
                  <option key={h} value={h}>
                    {h} h
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Current preparation level</p>
            <div className="grid grid-cols-3 gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l.key}
                  type="button"
                  onClick={() => update({ prepLevel: l.key })}
                  className={`rounded-lg border p-3 text-left ${(plan.prepLevel ?? 'intermediate') === l.key ? 'border-primary bg-primary/5' : 'border-border hover:bg-secondary'}`}
                >
                  <p className="text-sm font-semibold">{l.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{l.hint}</p>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Weak subjects</p>
            <SubjectPicker value={plan.focusSubjects} disabled={plan.strongSubjects ?? []} onChange={(v) => update({ focusSubjects: v })} />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Strong subjects</p>
            <SubjectPicker value={plan.strongSubjects ?? []} disabled={plan.focusSubjects} onChange={(v) => update({ strongSubjects: v })} />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="card p-6">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="font-semibold">Today</h2>
              <span className="text-xs text-muted-foreground">
                {done.filter((d) => daily.tasks.some((t) => t.id === d)).length}/{daily.tasks.length} done · ~{daily.mcqTarget} MCQs
              </span>
            </div>
            <ol className="flex flex-col gap-2">
              {daily.tasks.map((t, i) => {
                const isDone = done.includes(t.id)
                return (
                  <li key={t.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                    <button
                      onClick={() => setDone(toggleDoneTask(todayDate, t.id))}
                      aria-label={isDone ? 'Mark not done' : 'Mark done'}
                      className={isDone ? 'text-success' : 'text-muted-foreground hover:text-foreground'}
                    >
                      {isDone ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${isDone ? 'line-through text-muted-foreground' : ''}`}>
                        {i + 1}. {t.title}
                      </p>
                      {t.detail && <p className="text-xs text-muted-foreground mt-0.5">{t.detail}</p>}
                    </div>
                    <Link to={t.to} className="text-xs font-semibold text-primary hover:underline shrink-0 mt-0.5">
                      Start →
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>
          <div className="card p-5">
            <h3 className="text-sm font-semibold mb-2">Why this plan</h3>
            <ul className="text-sm text-muted-foreground list-disc pl-5 flex flex-col gap-1">
              {daily.why.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
