import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import { examConfig, markingLabel } from '../config/examConfig'

const STEPS = [
  {
    n: '01',
    title: 'Set your study plan',
    desc: 'Enter your exam date (default: INI-CET, 1 November 2026), mark weak and strong subjects and your hours per day — the planner builds each day’s tasks.',
    to: '/planner',
    cta: 'Open the Study Planner',
  },
  {
    n: '02',
    title: 'Practice by subject & topic',
    desc: 'Work through all 19 subjects by syllabus module and difficulty — Easy to INI-CET Level — with clinical cases and image-based questions.',
    to: '/subjects',
    cta: 'Start subject-wise practice',
  },
  {
    n: '03',
    title: 'Simulate the real exam',
    desc: `Sit the full INI-CET mock — ${examConfig.totalQuestions} questions, one ${examConfig.durationMinutes}-minute timer, ${markingLabel()} marking, question palette and mark-for-review.`,
    to: '/tests',
    cta: 'Take a Grand Test',
  },
  {
    n: '04',
    title: 'Review, revise, repeat',
    desc: 'See your weak areas, revise incorrect and marked questions in My Revision, and use “Revise again” to space repeats until they stick.',
    to: '/analytics',
    cta: 'View your analytics',
  },
]

function Step({ n, title, desc, to, cta, index }: (typeof STEPS)[number] & { index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  return (
    <div
      ref={ref}
      className="flex gap-6 py-8"
      style={{
        borderTop: index > 0 ? '1px solid hsl(var(--border))' : 'none',
        animation: inView ? `slide-in-left 0.6s ease-out ${(index * 0.1).toFixed(2)}s both` : 'none',
        opacity: inView ? undefined : 0,
      }}
    >
      <div className="w-16 shrink-0">
        <span className="font-display font-extrabold text-primary/25" style={{ fontSize: '2.75rem', lineHeight: 1 }}>
          {n}
        </span>
      </div>
      <div>
        <h3 className="font-display font-bold text-xl mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3" style={{ lineHeight: 1.65 }}>
          {desc}
        </p>
        <Link to={to} className="text-sm font-semibold text-primary hover:underline">
          {cta} &rarr;
        </Link>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6 scroll-mt-16">
      <div className="max-w-3xl mx-auto">
        <span className="block text-xs uppercase tracking-widest text-primary font-semibold mb-3">Your prep path</span>
        <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.7rem, 4vw, 2.2rem)' }}>
          From day one to exam-day ready
        </h2>

        <div className="mt-6">
          {STEPS.map((s, i) => (
            <Step key={s.n} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
