import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

const STATS = [
  { value: 100, suffix: '', label: 'Tier-I questions' },
  { value: -0.5, suffix: '', label: 'Marks per wrong answer (Tier-I)', isDecimal: true },
  { value: 4, suffix: '', label: 'Core sections tested' },
  { value: 60, suffix: ' min', label: 'Tier-I total duration' },
]

function StatItem({
  value,
  suffix,
  label,
  isDecimal,
  trigger,
}: {
  value: number
  suffix: string
  label: string
  isDecimal?: boolean
  trigger: boolean
}) {
  const { value: count, done } = useCountUp(isDecimal ? Math.abs(value * 10) : Math.abs(value), trigger)
  const display = isDecimal ? (value < 0 ? '−' : '') + (count / 10).toFixed(1) : (value < 0 ? '−' : '') + count

  return (
    <div className="text-center">
      <div
        className="font-display font-extrabold text-primary"
        style={{
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          letterSpacing: '-0.02em',
          animation: done ? 'counter-bounce 0.4s ease-out' : 'none',
        }}
      >
        {display}
        {suffix}
      </div>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  )
}

export default function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)

  return (
    <section ref={ref} className="py-16 px-6 text-center border-y border-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.9rem)' }}>
          The pattern, straight from the exam notice
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} trigger={inView} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-8 max-w-lg mx-auto">
          Based on the publicly published SSC CGL exam pattern. Always cross-check details against the
          official notification closer to your exam date.
        </p>
      </div>
    </section>
  )
}
