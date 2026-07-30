import { Link } from 'react-router-dom'
import { useState } from 'react'
import { clearResumeState, readResumeState } from '../lib/testResume'

/** Shows a "Resume Last Test" prompt if the user has an in-progress test saved
 * locally — e.g. after a refresh, closed tab, or accidental navigation away. */
export default function ResumeBanner() {
  const [state, setState] = useState(() => readResumeState())

  if (!state) return null

  function dismiss() {
    clearResumeState()
    setState(null)
  }

  const minutesLeft = typeof state?.secondsLeft === 'number' ? Math.max(0, Math.round(state.secondsLeft / 60)) : null

  return (
    <div className="max-w-5xl mx-auto px-6 mt-6">
      <div className="card border-primary/25 bg-primary/5 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold">Resume Last Test</p>
            <p className="text-xs text-muted-foreground truncate">
              {state?.label}
              {minutesLeft !== null && ` · ${minutesLeft} min left in this section`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={dismiss} className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2">
            Discard
          </button>
          {state && (
            <Link to={state.route} className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold hover:opacity-90">
              Resume
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
