import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProgressBar from '../components/ProgressBar'
import { getStudyPlan, saveStudyPlan, examCountdownParts, toggleFocusSubject } from '../lib/studyPlanner'
import { getAttempts } from '../lib/attempts'
import { getElapsedSeconds, readStudyTimer, formatStudyTime } from '../lib/studyTimer'
import { subjects } from '../data/subjects'
import { SubjectIcon, SUBJECT_COLOR_CLASSES } from '../components/icons'

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export default function StudyPlanner() {
  const [plan, setPlan] = useState(() => getStudyPlan())
  const { weeks, days, totalDays } = examCountdownParts(plan.examDate)

  const todayAttempts = useMemo(
    () => getAttempts().filter((a) => a.date.slice(0, 10) === todayKey()),
    [],
  )
  const questionsToday = todayAttempts.reduce((sum, a) => sum + a.attempted, 0)
  const minutesToday = Math.round(getElapsedSeconds(readStudyTimer()) / 60)

  const questionsPct = plan.dailyGoalQuestions > 0 ? Math.min(100, Math.round((questionsToday / plan.dailyGoalQuestions) * 100)) : 0
  const minutesPct = plan.dailyGoalMinutes > 0 ? Math.min(100, Math.round((minutesToday / plan.dailyGoalMinutes) * 100)) : 0

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Study Planner"
        title="Plan your run-up to exam day"
        description="Set your exam date, daily goals, and focus subjects — tracked automatically against your practice."
      />

      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-8">
        <div className="card gradient-card glow-primary p-8 text-center">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Countdown to exam day</p>
          <p className="font-display font-extrabold gradient-text" style={{ fontSize: 'clamp(2.4rem, 7vw, 3.6rem)' }}>
            {Math.max(0, totalDays)} days
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {weeks} weeks, {days} days · {new Date(plan.examDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <div className="mt-5">
            <label className="text-xs text-muted-foreground mr-2">Exam date:</label>
            <input
              type="date"
              value={plan.examDate}
              onChange={(e) => setPlan(saveStudyPlan({ examDate: e.target.value }))}
              className="border border-border rounded-lg px-3 py-1.5 bg-surface text-sm"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold">Today's questions</h2>
              <span className="text-sm text-muted-foreground">{questionsToday} / {plan.dailyGoalQuestions}</span>
            </div>
            <ProgressBar value={questionsPct} max={100} colorClass={questionsPct >= 100 ? 'bg-success' : 'bg-primary'} />
            <label className="block text-xs text-muted-foreground mt-4">
              Daily question goal
              <input
                type="number"
                min={0}
                value={plan.dailyGoalQuestions}
                onChange={(e) => setPlan(saveStudyPlan({ dailyGoalQuestions: Math.max(0, parseInt(e.target.value, 10) || 0) }))}
                className="block w-full mt-1 border border-border rounded-lg px-3 py-1.5 bg-surface text-sm"
              />
            </label>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold">Today's study time</h2>
              <span className="text-sm text-muted-foreground">{formatStudyTime(minutesToday * 60)} / {formatStudyTime(plan.dailyGoalMinutes * 60)}</span>
            </div>
            <ProgressBar value={minutesPct} max={100} colorClass={minutesPct >= 100 ? 'bg-success' : 'bg-accent'} />
            <label className="block text-xs text-muted-foreground mt-4">
              Daily minutes goal
              <input
                type="number"
                min={0}
                value={plan.dailyGoalMinutes}
                onChange={(e) => setPlan(saveStudyPlan({ dailyGoalMinutes: Math.max(0, parseInt(e.target.value, 10) || 0) }))}
                className="block w-full mt-1 border border-border rounded-lg px-3 py-1.5 bg-surface text-sm"
              />
            </label>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-display font-bold mb-1">Focus subjects</h2>
          <p className="text-sm text-muted-foreground mb-4">Pick the subjects you want to prioritize this cycle.</p>
          <div className="flex flex-wrap gap-2">
            {subjects.map((s) => {
              const active = plan.focusSubjects.includes(s.slug)
              return (
                <button
                  key={s.slug}
                  onClick={() => setPlan(toggleFocusSubject(s.slug))}
                  className={`tag border transition-colors flex items-center gap-1.5 ${
                    active ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  <SubjectIcon name={s.icon} className="w-3 h-3" />
                  {s.shortName}
                </button>
              )
            })}
          </div>
          {plan.focusSubjects.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2 mt-6">
              {plan.focusSubjects.map((slug) => {
                const s = subjects.find((x) => x.slug === slug)
                if (!s) return null
                return (
                  <Link key={slug} to={`/subjects/${slug}`} className="card card-hover p-4 flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${SUBJECT_COLOR_CLASSES[s.color] ?? ''}`}>
                      <SubjectIcon name={s.icon} className="w-4 h-4" />
                    </span>
                    <span className="font-medium text-sm">{s.name}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
