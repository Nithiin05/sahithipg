import { useMemo, useState } from 'react'
import AdHocQuiz from '../AdHocQuiz'
import { getWeakTopics, buildSmartRevisionQuiz } from '../../lib/smartRevision'
import type { AttemptRecord } from '../../types'

const SIZES = [20, 50, 100] as const

export default function SmartRevisionTab({ attempts }: { attempts: AttemptRecord[] }) {
  const [size, setSize] = useState<(typeof SIZES)[number]>(20)
  const [playing, setPlaying] = useState(false)

  const weakTopics = useMemo(() => getWeakTopics(attempts), [attempts])
  const items = useMemo(() => buildSmartRevisionQuiz(attempts, size), [attempts, size, playing])

  if (playing) {
    return <AdHocQuiz items={items} label={`Smart Revision — ${size} Questions`} onExit={() => setPlaying(false)} />
  }

  return (
    <div>
      <div className="card gradient-card p-6 mb-8">
        <h2 className="font-display font-bold text-lg mb-1">AI Smart Revision</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Automatically builds a revision test weighted toward your weakest topics and previously-wrong questions —
          topping up with a general pool if there isn't enough weak-topic material yet.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex bg-secondary rounded-lg p-1 gap-1">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                  size === s ? 'bg-surface text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {s} Qs
              </button>
            ))}
          </div>
          <button
            onClick={() => setPlaying(true)}
            className="gradient-primary text-white rounded-lg px-5 py-2.5 text-sm font-semibold hover:opacity-90"
          >
            Generate & Start
          </button>
        </div>
      </div>

      {weakTopics.length > 0 ? (
        <div className="card p-6">
          <h2 className="font-display font-bold text-lg mb-1">AI Weak-Topic Detection</h2>
          <p className="text-sm text-muted-foreground mb-5">Lowest-accuracy topics detected from your attempt history.</p>
          <div className="flex flex-col gap-3">
            {weakTopics.slice(0, 8).map((t) => (
              <div key={`${t.subject}-${t.topic}`} className="flex items-center justify-between text-sm">
                <span>{t.subjectName} · {t.topic}</span>
                <span className={`font-semibold ${t.accuracy < 50 ? 'text-danger' : 'text-warning'}`}>{t.accuracy}%</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card p-8 text-center text-muted-foreground">
          Attempt a few practice sets or mock tests first — Smart Revision needs some history to detect weak topics.
        </div>
      )}
    </div>
  )
}
