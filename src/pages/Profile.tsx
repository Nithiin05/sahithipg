import { useMemo, useState } from 'react'
import { getProfileName, setProfileName } from '../lib/profile'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import AchievementsTab from '../components/analytics/AchievementsTab'
import { getAttempts } from '../lib/attempts'
import { getBookmarks } from '../lib/bookmarks'
import { getMistakes } from '../lib/mistakes'
import { getStudyHistoryDays, getStudyStreak, getLifetimeStudySeconds, formatStudyTime } from '../lib/studyTimer'
import { getStudyPlan, examCountdownParts } from '../lib/studyPlanner'

export default function Profile() {
  const [name, setName] = useState(() => getProfileName())
  const attempts = useMemo(() => getAttempts(), [])
  const bookmarkCount = getBookmarks().length
  const mistakeCount = getMistakes().length
  const streak = getStudyStreak()
  const lifetimeSeconds = getLifetimeStudySeconds()
  const plan = getStudyPlan()
  const { totalDays } = examCountdownParts(plan.examDate)
  const calendar = useMemo(() => getStudyHistoryDays(84), [])

  const totalQuestionsSolved = attempts.reduce((s, a) => s + a.attempted, 0)
  const recent = attempts.slice(0, 8)

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Profile"
        title="Your prep at a glance"
        description="Progress, achievements, bookmarks, mistakes, and your revision calendar — all local to this device."
      />

      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Questions Solved', value: totalQuestionsSolved },
            { label: 'Study Streak', value: `${streak}d` },
            { label: 'Total Study Time', value: formatStudyTime(lifetimeSeconds) },
            { label: 'Days to Exam', value: Math.max(0, totalDays) },
          ].map((m) => (
            <div key={m.label} className="card p-4 text-center">
              <p className="font-display font-extrabold text-xl">{m.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
            </div>
          ))}
        </div>

        <label className="card p-5 flex flex-wrap items-center gap-3 text-sm font-semibold">
          Your name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setProfileName(name)}
            placeholder="Shown in your dashboard greeting"
            className="flex-1 min-w-[200px] border border-border rounded-lg px-3 py-2 bg-surface font-normal"
          />
        </label>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link to="/bookmarks" className="card card-hover p-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Bookmarked Questions</h3>
              <p className="text-sm text-muted-foreground mt-1">Saved for later review</p>
            </div>
            <span className="tag bg-secondary text-muted-foreground">{bookmarkCount}</span>
          </Link>
          <Link to="/revision?list=incorrect" className="card card-hover p-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Incorrect questions</h3>
              <p className="text-sm text-muted-foreground mt-1">Questions to revisit</p>
            </div>
            <span className="tag bg-secondary text-muted-foreground">{mistakeCount}</span>
          </Link>
        </div>

        <div className="card p-6">
          <h2 className="font-display font-bold text-lg mb-1">Revision Calendar</h2>
          <p className="text-sm text-muted-foreground mb-5">Last 12 weeks of study activity — darker means more time studied.</p>
          <div className="grid grid-cols-12 gap-1.5" style={{ gridTemplateRows: 'repeat(7, 1fr)', gridAutoFlow: 'column' }}>
            {calendar.map((d) => {
              const minutes = d.seconds / 60
              const intensity = minutes <= 0 ? 0 : minutes < 15 ? 1 : minutes < 45 ? 2 : minutes < 90 ? 3 : 4
              const bgClasses = ['bg-secondary', 'bg-primary/25', 'bg-primary/45', 'bg-primary/70', 'bg-primary']
              return <div key={d.date} title={`${d.date}: ${Math.round(minutes)} min`} className={`w-3.5 h-3.5 rounded-sm ${bgClasses[intensity]}`} />
            })}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-display font-bold text-lg mb-5">Recent activity</h2>
          {recent.length === 0 ? (
            <p className="text-sm text-muted-foreground">No attempts yet — take a practice set or a test to get started.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {recent.map((a) => (
                <div key={a.id} className="flex items-center justify-between text-sm">
                  <span className="truncate">{a.label}</span>
                  <span className="text-muted-foreground shrink-0 ml-3">{new Date(a.date).toLocaleDateString()} · {a.score}/{a.maxScore}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-display font-bold text-lg mb-5">Achievements</h2>
          <AchievementsTab attempts={attempts} />
        </div>
      </div>
    </div>
  )
}
