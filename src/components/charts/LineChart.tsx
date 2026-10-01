/**
 * Minimal single-series line chart (SVG). One hue, 2px line, 8px markers,
 * recessive gridlines, gaps where a value is null, and a native hover
 * tooltip on every point. Pair it with a table view for exact values.
 */
export default function LineChart({
  data,
  height = 160,
  yMax = 100,
  formatValue = (v: number) => `${v}%`,
  ariaLabel,
  width = 600,
}: {
  data: { label: string; value: number | null }[]
  height?: number
  yMax?: number
  formatValue?: (v: number) => string
  ariaLabel: string
  /** viewBox width — use a larger value for full-width charts so text keeps its size. */
  width?: number
}) {
  const W = width
  const padL = 32
  const padR = 8
  const padT = 10
  const padB = 22
  const plotW = W - padL - padR
  const plotH = height - padT - padB
  const x = (i: number) => padL + (data.length <= 1 ? plotW / 2 : (i / (data.length - 1)) * plotW)
  const y = (v: number) => padT + plotH - (Math.min(v, yMax) / yMax) * plotH

  // Split into runs of consecutive non-null points so gaps stay visible.
  const runs: { i: number; v: number }[][] = []
  let run: { i: number; v: number }[] = []
  data.forEach((d, i) => {
    if (d.value === null) {
      if (run.length) runs.push(run)
      run = []
    } else run.push({ i, v: d.value })
  })
  if (run.length) runs.push(run)

  const ticks = [0, yMax / 2, yMax]
  const every = Math.max(1, Math.ceil(data.length / 7))

  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="w-full h-auto block" role="img" aria-label={ariaLabel}>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="hsl(var(--border))" strokeWidth={1} />
          <text x={padL - 6} y={y(t) + 3} textAnchor="end" fontSize={10} fill="hsl(var(--muted-foreground))">
            {formatValue(t)}
          </text>
        </g>
      ))}
      {data.map((d, i) =>
        i % every === 0 || i === data.length - 1 ? (
          <text key={i} x={x(i)} y={height - 6} textAnchor="middle" fontSize={10} fill="hsl(var(--muted-foreground))">
            {d.label}
          </text>
        ) : null,
      )}
      {runs.map((r, k) => (
        <polyline
          key={k}
          points={r.map((p) => `${x(p.i)},${y(p.v)}`).join(' ')}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}
      {data.map((d, i) =>
        d.value === null ? null : (
          <g key={i}>
            <circle cx={x(i)} cy={y(d.value)} r={4} fill="hsl(var(--primary))" stroke="hsl(var(--surface))" strokeWidth={2} />
            {/* larger invisible hit target for the tooltip */}
            <circle cx={x(i)} cy={y(d.value)} r={12} fill="transparent">
              <title>{`${d.label}: ${formatValue(d.value)}`}</title>
            </circle>
          </g>
        ),
      )}
    </svg>
  )
}
