import { useEffect, useState } from 'react'
import {
  formatStudyTime,
  getElapsedSeconds,
  pauseStudyTimer,
  readStudyTimer,
  resetStudyTimer,
  startStudyTimer,
  type StudyTimerState,
} from '../lib/studyTimer'

/** Site-wide study stopwatch. Tracks today's cumulative study time in
 * localStorage so it survives refreshes, tab switches, and closing the browser. */
export default function StudyStopwatch() {
  const [state, setState] = useState<StudyTimerState>(() => readStudyTimer())
  const [displaySeconds, setDisplaySeconds] = useState(() => getElapsedSeconds(state))
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplaySeconds(getElapsedSeconds(state))
    }, 1000)
    return () => clearInterval(interval)
  }, [state])

  const isRunning = !!state.runningSince

  function toggle() {
    setState(isRunning ? pauseStudyTimer() : startStudyTimer())
  }

  function reset() {
    if (window.confirm("Reset today's study time to zero?")) {
      setState(resetStudyTimer())
    }
  }

  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col items-start gap-2">
      {expanded && (
        <div className="card shadow-xl p-4 w-56">
          <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">
            Today&apos;s Study Time
          </p>
          <p className="font-display font-extrabold text-2xl text-primary mb-3">
            {formatStudyTime(displaySeconds)}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={toggle}
              className="flex-1 bg-primary text-primary-foreground rounded-lg py-2 text-sm font-semibold hover:opacity-90"
            >
              {isRunning ? 'Pause' : state.totalSeconds > 0 ? 'Resume' : 'Start'}
            </button>
            <button
              type="button"
              onClick={reset}
              className="border border-border rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary"
              aria-label="Reset study time"
              title="Reset"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-2 bg-surface border border-border rounded-full shadow-lg pl-2 pr-3.5 py-2 hover:border-primary/40 transition-colors"
      >
        <span
          className={`w-7 h-7 rounded-full flex items-center justify-center ${
            isRunning ? 'bg-success-bg text-success' : 'bg-secondary text-muted-foreground'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="13" r="8" />
            <path d="M12 9v4l3 2M9 2h6M18.5 5.5l1-1" />
          </svg>
        </span>
        <span className="text-sm font-semibold tabular-nums">{formatStudyTime(displaySeconds)}</span>
      </button>
    </div>
  )
}
