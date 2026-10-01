import { Link } from 'react-router-dom'

export default function FinalCTA() {
  return (
    <section className="py-20 px-6 text-center">
      <div className="card gradient-card mx-auto max-w-3xl border-primary/15 glow-primary" style={{ padding: 'clamp(2.5rem, 6vw, 4rem)' }}>
        <span className="block text-xs uppercase tracking-widest text-primary font-semibold mb-4">
          Get started today
        </span>
        <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', letterSpacing: '-0.02em' }}>
          Your INI-CET November 2026 attempt starts here.
        </h2>
        <p className="text-muted-foreground mt-4 max-w-md mx-auto">
          Completely free — no sign-up, no paywalls. Open a full INI-CET mock and see where you stand.
        </p>
        <Link
          to="/tests"
          className="inline-block mt-8 gradient-primary text-white rounded-lg px-8 py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
        >
          Start Free Mock
        </Link>
      </div>
    </section>
  )
}
