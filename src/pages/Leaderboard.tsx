import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { getPersonalLeaderboard } from '../lib/leaderboard'

const RANGES = [
  { key: 'week', label: 'This Week' },
  { key: 'month', label: 'This Month' },
  { key: 'all', label: 'All Time' },
] as const

export default function Leaderboard() {
  const [range, setRange] = useState<(typeof RANGES)[number]['key']>('all')
  const rows = useMemo(() => getPersonalLeaderboard(range), [range])

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Leaderboard"
        title="Your personal leaderboard"
        description="This app runs entirely on your device with no accounts or backend, so there's no real pool of other students to rank you against. Instead, here are your own best mock & Grand Test scores over time, ranked, with an estimated percentile for context."
      />

      <div className="max-w-4xl mx-auto px-6">
        <div className="inline-flex bg-secondary rounded-lg p-1 gap-1 mb-8">
          {RANGES.map((r) => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-150 ${
                range === r.key ? 'bg-surface text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {rows.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="font-display font-bold text-lg mb-2">No mock or Grand Test attempts yet</p>
            <p className="text-muted-foreground mb-6">Complete a Mock Test or Grand Test to see your ranked scores here.</p>
            <Link to="/grand-tests" className="gradient-primary text-white rounded-lg px-5 py-2.5 text-sm font-semibold">
              Take a Grand Test
            </Link>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground bg-secondary/50">
                  <th className="py-2.5 px-4 font-medium">Rank</th>
                  <th className="py-2.5 px-4 font-medium">Test</th>
                  <th className="py-2.5 px-4 font-medium">Date</th>
                  <th className="py-2.5 px-4 font-medium text-right">Score</th>
                  <th className="py-2.5 px-4 font-medium text-right">Est. Percentile</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.attempt.id} className="border-t border-border">
                    <td className="py-2.5 px-4 font-display font-bold">#{i + 1}</td>
                    <td className="py-2.5 px-4">{row.attempt.label}</td>
                    <td className="py-2.5 px-4 text-muted-foreground whitespace-nowrap">{new Date(row.attempt.date).toLocaleDateString()}</td>
                    <td className="py-2.5 px-4 text-right">{row.attempt.score}/{row.attempt.maxScore}</td>
                    <td className="py-2.5 px-4 text-right font-semibold text-primary">{row.estimatedPercentile}th</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
