function format(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export default function Timer({ secondsLeft, totalSeconds }: { secondsLeft: number; totalSeconds: number }) {
  const pct = totalSeconds > 0 ? secondsLeft / totalSeconds : 0
  const urgent = pct <= 0.1
  const warn = pct <= 0.25 && !urgent

  const colorClass = urgent ? 'text-danger bg-danger-bg' : warn ? 'text-warning bg-warning-bg' : 'text-primary bg-primary/10'

  return (
    <div className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-sm font-semibold tabular-nums ${colorClass}`}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l3 2M9 2h6" strokeLinecap="round" />
      </svg>
      {format(Math.max(0, secondsLeft))}
    </div>
  )
}
