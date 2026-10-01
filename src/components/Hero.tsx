import { Link } from 'react-router-dom'
import ExamCountdown from './ExamCountdown'
import { examConfig, markingLabel } from '../config/examConfig'

export default function Hero() {
  return (
    <section className="relative px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden">

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <span className="tag glass text-primary font-semibold animate-fade-rise">
          {examConfig.shortName} · {examConfig.conductingBody} · November 2026
        </span>

        <h1
          className="font-display font-extrabold mt-6 animate-fade-rise-delay"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 3.75rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}
        >
          INI-CET Preparation
          <span className="block gradient-text mt-2">Built for how AIIMS tests.</span>
        </h1>

        <p className="text-muted-foreground mt-6 max-w-xl mx-auto animate-fade-rise-delay-2" style={{ lineHeight: 1.7 }}>
          Clinical vignettes, image-based questions, PYQ-pattern practice and full-length INI-CET mocks
          at the {markingLabel()} marking — with analytics that show exactly where you lose marks.
        </p>

        <div className="mt-8 animate-fade-rise-delay-2">
          <ExamCountdown />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-rise-delay-3">
          <Link
            to="/tests"
            className="gradient-primary text-white rounded-lg px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity glow-primary"
          >
            Start a Full Mock
          </Link>
          <Link
            to="/dashboard"
            className="glass text-sm font-medium text-foreground hover:text-primary transition-colors px-6 py-3 rounded-lg"
          >
            Open your dashboard &rarr;
          </Link>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 animate-fade-rise-delay-3">
          <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
            Pre-Clinical · Para-Clinical · Clinical — every subject covered
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {['Anatomy', 'Pathology', 'Medicine', 'Surgery', 'OBG', 'Pediatrics'].map((tag) => (
              <span key={tag} className="tag bg-secondary text-foreground border border-border">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
