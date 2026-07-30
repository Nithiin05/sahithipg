import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

const TIER1_STATS = [
  { value: 100, suffix: '', label: 'Total questions' },
  { value: 200, suffix: '', label: 'Total marks' },
  { value: -0.5, suffix: '', label: 'Marks per wrong answer', isDecimal: true },
  { value: 60, suffix: ' min', label: 'Total duration' },
]

const TIER1_SECTIONS = [
  { name: 'General Intelligence & Reasoning', questions: 25, marks: 50 },
  { name: 'General Awareness', questions: 25, marks: 50 },
  { name: 'Quantitative Aptitude', questions: 25, marks: 50 },
  { name: 'English Comprehension', questions: 25, marks: 50 },
]

interface Tier2Row {
  session: string
  section: string
  module: string
  subject: string
  questions: number
  marks: string
  duration: string
}

const TIER2_PAPER1: Tier2Row[] = [
  { session: 'Session I', section: 'Section I', module: 'Module I', subject: 'Mathematical Abilities', questions: 30, marks: '90', duration: '1 hr (combined)' },
  { session: 'Session I', section: 'Section I', module: 'Module II', subject: 'Reasoning & General Intelligence', questions: 30, marks: '90', duration: '1 hr (combined)' },
  { session: 'Session I', section: 'Section II', module: 'Module I', subject: 'English Language & Comprehension', questions: 45, marks: '135', duration: '1 hr (combined)' },
  { session: 'Session I', section: 'Section II', module: 'Module II', subject: 'General Awareness', questions: 25, marks: '75', duration: '1 hr (combined)' },
  { session: 'Session I', section: 'Section III', module: 'Module I', subject: 'Computer Knowledge Test', questions: 20, marks: '60 (qualifying)', duration: '15 min' },
  { session: 'Session II', section: 'Section III', module: 'Module II', subject: 'Data Entry Speed Test', questions: 1, marks: 'Qualifying', duration: '15 min' },
]

const TIER2_OPTIONAL = [
  {
    paper: 'Paper II',
    title: 'Statistics',
    who: 'Junior Statistical Officer (JSO) & Statistical Investigator Gr. II',
    questions: 100,
    marks: 200,
    duration: '2 hrs',
    negMark: '−0.5',
  },
  {
    paper: 'Paper III',
    title: 'General Studies (Finance & Economics)',
    who: 'Assistant Audit Officer / Assistant Accounts Officer',
    questions: 100,
    marks: 200,
    duration: '2 hrs',
    negMark: '−0.5',
  },
]

function Tier1StatItem({
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

function Tier1Panel({ inView }: { inView: boolean }) {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {TIER1_STATS.map((s) => (
          <Tier1StatItem key={s.label} {...s} trigger={inView} />
        ))}
      </div>

      <div className="card mt-10 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {TIER1_SECTIONS.map((s, i) => (
            <div
              key={s.name}
              className="flex items-center justify-between px-5 py-4"
              style={{
                borderTop: i > 1 ? '1px solid hsl(var(--border))' : 'none',
                borderLeft: i % 2 === 1 ? '1px solid hsl(var(--border))' : 'none',
              }}
            >
              <span className="text-sm font-medium">{s.name}</span>
              <span className="text-xs text-muted-foreground shrink-0 ml-3">
                {s.questions} Q &middot; {s.marks} marks
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-6 max-w-2xl mx-auto text-center">
        Tier-I is computer-based and qualifying in nature — a screening stage before Tier-II.
        Cross-check against the official notification closer to your exam date.
      </p>
    </div>
  )
}

function Tier2Panel() {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        <div className="text-center">
          <div className="font-display font-extrabold text-primary" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)', letterSpacing: '-0.02em' }}>150</div>
          <p className="text-sm text-muted-foreground mt-1">Questions (Paper I)</p>
        </div>
        <div className="text-center">
          <div className="font-display font-extrabold text-primary" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)', letterSpacing: '-0.02em' }}>450</div>
          <p className="text-sm text-muted-foreground mt-1">Marks (Paper I)</p>
        </div>
        <div className="text-center">
          <div className="font-display font-extrabold text-primary" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)', letterSpacing: '-0.02em' }}>−1</div>
          <p className="text-sm text-muted-foreground mt-1">Per wrong answer*</p>
        </div>
        <div className="text-center">
          <div className="font-display font-extrabold text-primary" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)', letterSpacing: '-0.02em' }}>2h 30m</div>
          <p className="text-sm text-muted-foreground mt-1">Total duration</p>
        </div>
      </div>

      <div className="mt-10">
        <span className="block text-xs uppercase tracking-widest text-primary font-semibold mb-3">
          Paper I &middot; compulsory for all posts
        </span>
        <div className="card overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Section / Module</th>
                <th className="px-4 py-3 font-semibold">Subject</th>
                <th className="px-4 py-3 font-semibold text-right">Questions</th>
                <th className="px-4 py-3 font-semibold text-right">Marks</th>
                <th className="px-4 py-3 font-semibold text-right">Duration</th>
              </tr>
            </thead>
            <tbody>
              {TIER2_PAPER1.map((row, i) => (
                <tr key={row.subject} style={{ borderTop: i > 0 ? '1px solid hsl(var(--border))' : 'none' }}>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {row.section} &middot; {row.module}
                  </td>
                  <td className="px-4 py-3 font-medium">{row.subject}</td>
                  <td className="px-4 py-3 text-right">{row.questions}</td>
                  <td className="px-4 py-3 text-right">{row.marks}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">{row.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          *−1 mark per wrong answer in Section I, Section II, and Module I of Section III. The Data
          Entry Speed Test (Module II of Section III) is qualifying only.
        </p>
      </div>

      <div className="mt-10">
        <span className="block text-xs uppercase tracking-widest text-primary font-semibold mb-3">
          Optional papers &middot; post-specific
        </span>
        <div className="grid gap-4 sm:grid-cols-2">
          {TIER2_OPTIONAL.map((p) => (
            <div key={p.paper} className="card p-5">
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-display font-bold">{p.paper} &middot; {p.title}</h4>
                <span className="tag bg-secondary text-muted-foreground shrink-0">{p.negMark}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{p.who}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-muted-foreground">
                <span>{p.questions} questions</span>
                <span>{p.marks} marks</span>
                <span>{p.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-8 max-w-2xl mx-auto text-center">
        Tier-II marks determine final merit. Candidates must clear each section individually.
        Cross-check against the official SSC notification closer to your exam date.
      </p>
    </div>
  )
}

export default function ExamPattern() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const [tier, setTier] = useState<'1' | '2'>('1')

  return (
    <section ref={ref} id="exam-pattern" className="py-16 px-6 border-y border-border scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.9rem)' }}>
            The pattern, straight from the exam notice
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Both stages, laid out clearly — so nothing surprises you on exam day.
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <div className="inline-flex bg-secondary rounded-lg p-1 gap-1" role="tablist" aria-label="Exam tier">
            <button
              type="button"
              role="tab"
              aria-selected={tier === '1'}
              onClick={() => setTier('1')}
              className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors duration-150 ${
                tier === '1' ? 'bg-surface text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Tier-I Pattern
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tier === '2'}
              onClick={() => setTier('2')}
              className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors duration-150 ${
                tier === '2' ? 'bg-surface text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Tier-II Pattern
            </button>
          </div>
        </div>

        <div className="mt-10">{tier === '1' ? <Tier1Panel inView={inView} /> : <Tier2Panel />}</div>
      </div>
    </section>
  )
}
