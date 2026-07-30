/** Minimal, dependency-free SVG bar chart — used for the weekly/monthly graphs on Analytics. */
export default function SvgBarChart({
  data,
  height = 140,
  formatValue,
}: {
  data: { label: string; value: number }[]
  height?: number
  formatValue?: (v: number) => string
}) {
  const max = Math.max(1, ...data.map((d) => d.value))
  const slot = 32
  const barWidth = 20

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${data.length * slot} ${height}`}
        className="block"
        style={{ width: '100%', minWidth: data.length * slot }}
        preserveAspectRatio="none"
      >
        {data.map((d, i) => {
          const barHeight = (d.value / max) * (height - 26)
          const x = i * slot + (slot - barWidth) / 2
          return (
            <g key={i}>
              <title>{`${d.label}: ${formatValue ? formatValue(d.value) : d.value}`}</title>
              <rect
                x={x}
                y={height - 20 - barHeight}
                width={barWidth}
                height={Math.max(1, barHeight)}
                rx={3}
                fill="hsl(var(--primary))"
                opacity={0.85}
              />
              <text x={x + barWidth / 2} y={height - 6} fontSize="8" textAnchor="middle" fill="hsl(var(--muted-foreground))">
                {d.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
