import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import { subjects, totalPYQCount, totalQuestionsAcrossAllSubjects, totalTopicsAcrossAllSubjects } from '../data/subjects'
import { grandTests } from '../data/grandTests'

const ALL_STATS = [
  { value: subjects.length, suffix: '', label: 'Subjects covered' },
  { value: totalQuestionsAcrossAllSubjects(), suffix: '+', label: 'High-yield questions' },
  { value: totalTopicsAcrossAllSubjects(), suffix: '', label: 'Focused topics' },
  { value: grandTests.length, suffix: '+', label: 'Grand Tests' },
  { value: totalPYQCount(), suffix: '', label: 'PYQ & PYQ-pattern questions' },
  { value: 20, suffix: '/day', label: 'Daily Challenge questions' },
]
/** Never show a zero stat on the landing page. */
const STATS = ALL_STATS.filter((s) => s.value > 0)

function StatItem({ value, suffix, label, trigger }: { value: number; suffix: string; label: string; trigger: boolean }) {
  const { value: count, done } = useCountUp(value, trigger)

  return (
    <div className="text-center">
      <div
        className="font-display font-extrabold gradient-text"
        style={{
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          letterSpacing: '-0.02em',
          animation: done ? 'counter-bounce 0.4s ease-out' : 'none',
        }}
      >
        {count}
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
          A growing bank, built to scale — and 100% free
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12">
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} trigger={inView} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
          These are live counts from the current question bank — no inflated numbers. The platform is
          architected to scale to tens of thousands of questions as more are added. No sign-up, no paywalls, ever.
        </p>
      </div>
    </section>
  )
}
