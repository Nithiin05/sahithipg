import { Link } from 'react-router-dom'
import { BarChart3, BookOpen, BrainCircuit, CalendarClock, FileStack, Layers } from 'lucide-react'

const FEATURES = [
  {
    title: 'Grand Tests — Exam Simulation',
    desc: 'Up to 200 questions, one continuous 3.5-hour timer, question palette, and "Mark for Review" — just like the real exam.',
    to: '/grand-tests',
    cta: 'Take a Grand Test',
    Icon: FileStack,
  },
  {
    title: 'Subject-Wise & Topic-Wise Practice',
    desc: 'All 19 subjects across Pre-Clinical, Para-Clinical, and Clinical years — difficulty-tagged from Easy to Expert.',
    to: '/subjects',
    cta: 'Browse subjects',
    Icon: Layers,
  },
  {
    title: 'AI-Powered Analytics',
    desc: 'Accuracy trends, subject heatmaps, weak-topic detection, and a personalized study summary generated from your attempts.',
    to: '/analytics',
    cta: 'View analytics',
    Icon: BarChart3,
  },
  {
    title: 'Smart Revision & Mistake Notebook',
    desc: 'Every wrong answer is saved automatically, and Smart Revision builds fresh tests weighted toward your weak topics.',
    to: '/mistakes',
    cta: 'Open Mistake Notebook',
    Icon: BrainCircuit,
  },
  {
    title: 'PYQ-Style Practice by Year',
    desc: 'Original, pattern-based practice questions organized by year — clearly labeled, never a reproduction of an official paper.',
    to: '/pyqs',
    cta: 'Practice PYQs',
    Icon: CalendarClock,
  },
  {
    title: 'Curated Resource Library',
    desc: 'Standard textbook references, high-yield notes, mnemonics, flashcards, and one-liners — organized by subject.',
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
          Everything your NEET PG 2026 prep needs
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
