import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import { subjectsByCategory, totalQuestionCount } from '../data/subjects'
import { SubjectIcon, SUBJECT_COLOR_CLASSES } from './icons'

const GRAND_TEST_STATS = [
  { value: 200, suffix: '', label: 'Max questions per Grand Test' },
  { value: 3.5, suffix: ' hrs', label: 'Total duration', isDecimal: true },
  { value: 4, suffix: '', label: 'Mark per correct answer' },
  { value: 1, suffix: '', label: 'Negative marking (matches real NEET PG)' },
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
  const { value: count, done } = useCountUp(isDecimal ? Math.round(value * 10) : value, trigger)
  const display = isDecimal ? (count / 10).toFixed(1) : count

  return (
    <div className="text-center">
      <div
        className="font-display font-extrabold text-primary"
        style={{
          fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)',
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

export default function ExamPattern() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const categories = subjectsByCategory()

  return (
    <section ref={ref} id="exam-pattern" className="py-16 px-6 border-y border-border scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.9rem)' }}>
            Grand Tests built to feel like the real thing
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
            NEET PG itself carries no negative marking (+4 per correct answer, -1 for wrong/unattempted) — reflected
            exactly here.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {GRAND_TEST_STATS.map((s) => (
            <StatItem key={s.label} {...s} trigger={inView} />
          ))}
        </div>

        <div className="mt-14">
          <span className="block text-xs uppercase tracking-widest text-primary font-semibold mb-4 text-center">
            All 19 subjects, organized by year
          </span>
          <div className="grid gap-6 sm:grid-cols-3">
            {(['Pre-Clinical', 'Para-Clinical', 'Clinical'] as const).map((cat) => (
              <div key={cat} className="card p-5">
                <h3 className="font-display font-bold mb-3">{cat}</h3>
                <div className="flex flex-col gap-2">
                  {categories[cat].map((s) => (
                    <div key={s.slug} className="flex items-center justify-between gap-3 text-sm">
                      <span className="flex items-center gap-2 min-w-0">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${SUBJECT_COLOR_CLASSES[s.color] ?? ''}`}>
                          <SubjectIcon name={s.icon} className="w-3.5 h-3.5" />
                        </span>
                        <span className="truncate">{s.shortName}</span>
                      </span>
                      <span className="text-xs text-muted-foreground shrink-0">{totalQuestionCount(s)} Qs</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-8 max-w-2xl mx-auto text-center">
          Question counts shown are the current, real size of the bank — growing over time. Cross-check the exam
          date and pattern against the official NBEMS notification closer to your exam.
        </p>
      </div>
    </section>
  )
}
