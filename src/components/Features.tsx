import { Link } from 'react-router-dom'

const FEATURES = [
  {
    title: 'Real Exam-Pattern Mocks',
    desc: 'Sectional timers and question counts matched to Tier-I and Tier-II, with authentic −0.5 / −1 negative marking.',
    to: '/mock-tests',
    cta: 'Take a mock test',
    icon: (
      <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.2 6.8 3.8-6.8 3.8-6.8-3.8L12 4.2ZM5 9.3l6 3.4v6.9l-6-3.4V9.3Zm14 0v6.9l-6 3.4v-6.9l6-3.4Z" />
    ),
  },
  {
    title: 'Topic-Wise Practice',
    desc: 'Difficulty-tagged question sets across Quant, Reasoning, English, and General Awareness — drill weak spots first.',
    to: '/practice',
    cta: 'Start practicing',
    icon: <path d="M4 4h16v2H4V4Zm0 7h10v2H4v-2Zm0 7h16v2H4v-2Z" />,
  },
  {
    title: 'Weak-Topic Analytics',
    desc: 'Accuracy, question-level breakdowns, and a topic heatmap that shows exactly where your score is leaking marks.',
    to: '/analytics',
    cta: 'View analytics',
    icon: <path d="M3 3h2v18H3V3Zm4 10h2v8H7v-8Zm5-6h2v14h-2V7Zm5 3h2v11h-2V10Z" />,
  },
  {
    title: 'Full Syllabus Tracker',
    desc: 'Every Tier-I and Tier-II topic laid out as a checklist, so you always know what is left before exam day.',
    to: '/syllabus',
    cta: 'Open syllabus',
    icon: <path d="m9 16.2-3.5-3.5L4 14.2 9 19.2l11-11-1.5-1.4L9 16.2Z" />,
  },
  {
    title: 'General Awareness Practice',
    desc: 'Static GK, history, polity, geography, economy, and science — the highest-yield section for quick score gains.',
    to: '/practice/general-awareness',
    cta: 'Practice GA',
    icon: <path d="M4 5h16v2H4V5Zm0 6h16v2H4v-2Zm0 6h10v2H4v-2Z" />,
  },
  {
    title: 'Curated Book Library',
    desc: "The books toppers use — Rakesh Yadav, Neetu Singh, Lucent's, R.S. Aggarwal — organized by subject and use case.",
    to: '/resources',
    cta: 'Browse library',
    icon: <path d="M6 4h9a3 3 0 0 1 3 3v13H8a2 2 0 0 0-2 2V4Zm0 16.5A2.5 2.5 0 0 1 8.5 18H18" />,
  },
]

function FeatureCard({ title, desc, icon, to, cta }: (typeof FEATURES)[number]) {
  return (
    <Link to={to} className="card card-hover flex flex-col p-6 group">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="text-primary mb-4">
        {icon}
      </svg>
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
          Everything your Tier-I &amp; Tier-II prep needs
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
