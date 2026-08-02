import { Link } from 'react-router-dom'
import { FloatingMedicalIcons, GradientBlobs } from './MedicalMotifs'
import { examCountdownParts } from '../lib/studyPlanner'

export default function Hero() {
  const { totalDays } = examCountdownParts()

  return (
    <section className="relative px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden">
      <GradientBlobs />
      <FloatingMedicalIcons />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <span className="tag glass text-primary font-semibold animate-fade-rise">
          {totalDays > 0 ? `${totalDays} days to NEET PG 2026 · August 30, 2026` : 'NEET PG 2026 · August 30, 2026'}
        </span>

        <h1
          className="font-display font-extrabold mt-6 animate-fade-rise-delay"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 3.75rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}
        >
          Dr. Sahithi Preparation
          <span className="block gradient-text mt-2">Every Question Matters.</span>
        </h1>

        <p className="text-muted-foreground mt-6 max-w-xl mx-auto animate-fade-rise-delay-2" style={{ lineHeight: 1.7 }}>
          India's free NEET PG preparation platform. Master high-yield questions, PYQ-style practice,
          clinical cases, AI-powered analytics, and realistic Grand Tests — all 19 subjects, completely free.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-rise-delay-3">
          <Link
            to="/grand-tests"
            className="gradient-primary text-white rounded-lg px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity glow-primary"
          >
            Start Free Mock
          </Link>
          <Link
            to="/subjects"
            className="glass text-sm font-medium text-foreground hover:text-primary transition-colors px-6 py-3 rounded-lg"
          >
            Browse Subjects &rarr;
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
