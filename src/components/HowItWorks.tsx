import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'

const STEPS = [
  {
    n: '01',
    title: 'Map the syllabus',
    desc: 'See every Tier-I and Tier-II topic laid out clearly, so nothing catches you by surprise on exam day.',
    to: '/syllabus',
    cta: 'Open the syllabus tracker',
  },
  {
    n: '02',
    title: 'Practice by topic',
    desc: 'Work through difficulty-tagged sets in Quant, Reasoning, English, and GA, building speed one topic at a time.',
    to: '/practice',
    cta: 'Start topic-wise practice',
  },
  {
    n: '03',
    title: 'Simulate the real exam',
    desc: 'Sit full-length mocks with the same sectional timers and negative marking as the actual Tier-I and Tier-II papers.',
    to: '/mock-tests',
    cta: 'Take a mock test',
  },
  {
    n: '04',
    title: 'Track and improve',
    desc: 'Review your weak-topic breakdown, revise the gaps, and retest — until your accuracy holds under time pressure.',
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
          From open syllabus to exam-day ready
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
