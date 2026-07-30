import { useEffect, useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import ProgressBar from '../components/ProgressBar'
import { syllabus } from '../data/syllabus'
import { getSyllabusProgress, toggleSyllabusItem, resetSyllabusProgress } from '../lib/syllabusProgress'

export default function Syllabus() {
  const [progress, setProgress] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setProgress(getSyllabusProgress())
  }, [])

  const toggle = (id: string) => setProgress(toggleSyllabusItem(id))

  const overall = useMemo(() => {
    let total = 0
    let done = 0
    for (const tier of syllabus) {
      for (const section of tier.sections) {
        for (const item of section.items) {
          total++
          if (progress[item.id]) done++
        }
      }
    }
    return { total, done }
  }, [progress])

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Syllabus Tracker"
        title="Every Tier-I & Tier-II topic, in one checklist"
        description="Tick off topics as you cover them. Your progress is saved automatically in this browser."
        actions={
          <button
            onClick={() => {
              resetSyllabusProgress()
              setProgress({})
            }}
            className="text-sm font-medium text-muted-foreground hover:text-danger border border-border rounded-lg px-4 py-2"
          >
            Reset progress
          </button>
        }
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="card p-5 mb-8 flex items-center gap-5">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold">Overall progress</span>
              <span className="text-muted-foreground">
                {overall.done} / {overall.total} topics
              </span>
            </div>
            <ProgressBar value={overall.done} max={overall.total} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {syllabus.map((tier) => (
            <div key={tier.id} className="card p-6">
              <h2 className="font-display font-bold text-xl mb-1">{tier.title}</h2>
              <p className="text-sm text-muted-foreground mb-5">{tier.note}</p>

              <div className="flex flex-col gap-6">
                {tier.sections.map((section) => {
                  const doneCount = section.items.filter((i) => progress[i.id]).length
                  return (
                    <div key={section.id}>
                      <div className="flex items-center justify-between mb-2.5">
                        <h3 className="font-semibold text-sm">{section.title}</h3>
                        <span className="text-xs text-muted-foreground">
                          {doneCount}/{section.items.length}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {section.items.map((item) => (
                          <label
                            key={item.id}
                            className="flex items-center gap-3 text-sm rounded-lg px-2.5 py-2 hover:bg-secondary cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={!!progress[item.id]}
                              onChange={() => toggle(item.id)}
                              className="w-4 h-4 accent-[hsl(var(--primary))] shrink-0"
                            />
                            <span className={progress[item.id] ? 'line-through text-muted-foreground' : ''}>
                              {item.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
