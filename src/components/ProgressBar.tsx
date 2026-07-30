export default function ProgressBar({
  value,
  max,
  colorClass = 'bg-primary',
  trackClass = 'bg-secondary',
  height = 8,
}: {
  value: number
  max: number
  colorClass?: string
  trackClass?: string
  height?: number
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <div className={`w-full rounded-full overflow-hidden ${trackClass}`} style={{ height }}>
      <div
        className={`h-full rounded-full transition-all duration-300 ${colorClass}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
