import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(37,99,235,0.10) 0%, transparent 60%)',
        }}
      />
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <span className="tag bg-primary/10 text-primary animate-fade-rise">
          SSC CGL Tier-I &amp; Tier-II
        </span>

        <h1
          className="font-display font-extrabold mt-6 animate-fade-rise-delay"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 3.75rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}
        >
          Every mark counts.
          <span className="block text-primary">Practice like it's exam day.</span>
        </h1>

        <p className="text-muted-foreground mt-6 max-w-xl mx-auto animate-fade-rise-delay-2" style={{ lineHeight: 1.7 }}>
          A comprehensive SSC CGL preparation platform designed for Tier-I &amp; Tier-II aspirants.
          Practice with exam-pattern mock tests, previous year papers, topic-wise questions,
          detailed analytics, and performance tracking—all in one place.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-rise-delay-3">
          <Link
            to="/mock-tests"
            className="bg-primary text-primary-foreground rounded-lg px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            Take a Free Mock Test
          </Link>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors px-6 py-3"
          >
            See how it works &rarr;
          </a>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 animate-fade-rise-delay-3">
          <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
            Every section covered
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {['Quant', 'Reasoning', 'English', 'General Awareness', 'Tier-II'].map((tag) => (
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
