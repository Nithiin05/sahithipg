import { subjects, totalPYQCount, totalQuestionsAcrossAllSubjects } from '../data/subjects'
import { syllabus } from '../data/syllabus'
import { getCatalog, poolFor } from '../lib/testEngine'

/** Real, live counts from the bank — no rounding up, no "+". */
const ALL_STATS = [
  { value: subjects.length, suffix: '', label: 'Subjects' },
  { value: Object.values(syllabus).reduce((n, m) => n + m.length, 0), suffix: '', label: 'Syllabus modules' },
  { value: totalQuestionsAcrossAllSubjects(), suffix: '', label: 'Questions' },
  { value: poolFor({ categories: ['clinical'] }).length, suffix: '', label: 'Clinical vignettes' },
  { value: poolFor({ categories: ['integrated'] }).length, suffix: '', label: 'Integrated questions' },
  { value: poolFor({ categories: ['image'] }).length, suffix: '', label: 'Image-based questions' },
  { value: getCatalog().filter((t) => t.group === 'grand').length, suffix: '', label: 'Grand Tests' },
  { value: totalPYQCount(), suffix: '', label: 'PYQ & PYQ-pattern questions' },
]
/** Never show a zero stat on the landing page. */
const STATS = ALL_STATS.filter((s) => s.value > 0)

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display font-extrabold text-foreground tabular-nums" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)', letterSpacing: '-0.02em' }}>
        {value}
        {suffix}
      </div>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="py-16 px-6 text-center border-y border-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.9rem)' }}>
          What's in the bank today
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
          Live counts from the current question bank — nothing rounded up. Free, with no sign-up; progress is saved in your browser.
        </p>
      </div>
    </section>
  )
}
