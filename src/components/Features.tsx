import { Link } from 'react-router-dom'
import { BarChart3, BookOpen, BrainCircuit, CalendarClock, FileStack, Layers } from 'lucide-react'
import { examConfig, markingLabel } from '../config/examConfig'

const FEATURES = [
  {
    title: 'Full INI-CET Mock & Grand Tests',
    desc: `${examConfig.totalQuestions} questions, one ${examConfig.durationMinutes}-minute timer, ${markingLabel()} marking, question palette and "Mark for Review" — like the real exam.`,
    to: '/tests',
    cta: 'Take a Grand Test',
    Icon: FileStack,
  },
  {
    title: 'Subject-Wise & Topic-Wise Practice',
    desc: 'All 19 subjects mapped to the INI-CET syllabus, with clinical vignettes, integrated and image-based questions graded Easy to INI-CET Level.',
    to: '/subjects',
    cta: 'Browse subjects',
    Icon: Layers,
  },
  {
    title: 'Performance Analytics',
    desc: 'Accuracy over time, subject and topic accuracy, time per question, weak-area detection and mock-score trends — from your own attempts.',
    to: '/analytics',
    cta: 'View analytics',
    Icon: BarChart3,
  },
  {
    title: 'My Revision',
    desc: 'Incorrect, marked and weak-topic questions in one place, plus “Revise again” with spaced repetition at 1, 3, 7, 14 and 30 days.',
    to: '/revision?list=incorrect',
    cta: 'Open Mistake Notebook',
    Icon: BrainCircuit,
  },
  {
    title: 'Verified PYQs & PYQ-Pattern Practice',
    desc: 'Actual previous-year questions are tagged with their session; original pattern questions are labelled as such — never mixed up.',
    to: '/pyqs',
    cta: 'Practice PYQs',
    Icon: CalendarClock,
  },
  {
    title: 'Curated Resource Library',
    desc: 'Standard textbook references, subject-wise video searches and flashcards built from the question bank’s clinical pearls.',
    to: '/resources',
    cta: 'Browse library',
    Icon: BookOpen,
  },
]

function FeatureCard({ title, desc, Icon, to, cta }: (typeof FEATURES)[number]) {
  return (
    <Link to={to} className="card card-hover gradient-card flex flex-col p-6 group">
      <span className="w-11 h-11 rounded-xl gradient-primary text-white flex items-center justify-center mb-4 shadow-sm">
        <Icon size={20} strokeWidth={2} />
      </span>
      <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground flex-1" style={{ lineHeight: 1.6 }}>
        {desc}
      </p>
      <span className="mt-4 text-sm font-semibold text-primary inline-flex items-center gap-1">
        {cta}
        <span className="transition-transform duration-150 group-hover:translate-x-0.5">&rarr;</span>
      </span>
    </Link>
  )
}

export default function Features() {
  return (
    <section id="practice" className="relative py-20 px-6 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <span className="block text-xs uppercase tracking-widest text-primary font-semibold mb-3">Platform</span>
        <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)' }}>
          Everything your INI-CET prep needs
        </h2>

        <div className="grid gap-5 mt-10" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  )
}
