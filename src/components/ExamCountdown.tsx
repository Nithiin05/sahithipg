import { useEffect, useState } from 'react'
import { examConfig, examDate } from '../config/examConfig'

function partsUntil(target: Date, now: number) {
  const ms = Math.max(0, target.getTime() - now)
  const s = Math.floor(ms / 1000)
  return {
    done: ms === 0,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

/** Live countdown to the exam date in src/config/examConfig.ts. */
export default function ExamCountdown({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const p = partsUntil(examDate, now)
  const dateLabel = examDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  })

  if (p.done) {
    return (
      <p className="text-sm font-semibold text-primary">
        {examConfig.shortName} exam day — {dateLabel}. All the best.
      </p>
    )
  }

  const units: [number, string][] = [
    [p.days, 'Days'],
    [p.hours, 'Hours'],
    [p.minutes, 'Minutes'],
    [p.seconds, 'Seconds'],
  ]

  return (
    <div className="flex flex-col items-center gap-2" role="timer" aria-live="off">
      <span className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
        {examConfig.shortName} {examDate.getFullYear()} starts in
      </span>
      <div className="flex gap-2 sm:gap-3">
        {units.map(([v, label]) => (
          <div
            key={label}
            className={`card flex flex-col items-center ${compact ? 'px-2.5 py-1.5 min-w-[54px]' : 'px-3 py-2.5 sm:px-4 min-w-[64px] sm:min-w-[76px]'}`}
          >
            <span className={`font-display font-bold tabular-nums ${compact ? 'text-lg' : 'text-2xl sm:text-3xl'}`}>
              {String(v).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
          </div>
        ))}
      </div>
      <span className="text-xs text-muted-foreground">{dateLabel}</span>
    </div>
  )
}
