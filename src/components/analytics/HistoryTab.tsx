import { Fragment, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import QuestionCard from '../QuestionCard'
import { findQuestionItem } from '../../lib/quizEngine'
import type { AttemptRecord } from '../../types'

type SortKey = 'date' | 'score' | 'accuracy'
type FilterKey = 'all' | 'practice' | 'mock'

function accuracyOf(a: AttemptRecord) {
  return a.attempted > 0 ? Math.round((a.correct / a.attempted) * 100) : 0
}

function formatDuration(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

export default function HistoryTab({ attempts }: { attempts: AttemptRecord[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [filterKey, setFilterKey] = useState<FilterKey>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const rows = useMemo(() => {
    const filtered = filterKey === 'all' ? attempts : attempts.filter((a) => a.kind === filterKey)
    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === 'score') return b.score - a.score
      if (sortKey === 'accuracy') return accuracyOf(b) - accuracyOf(a)
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    return sorted
  }, [attempts, sortKey, filterKey])

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap gap-2">
          {(['all', 'practice', 'mock'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterKey(f)}
              className={`tag border transition-colors capitalize ${
                filterKey === f ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:bg-secondary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Sort by</span>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="border border-border rounded-lg px-2.5 py-1.5 bg-surface text-sm"
          >
            <option value="date">Date</option>
            <option value="score">Score</option>
            <option value="accuracy">Accuracy</option>
          </select>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground bg-secondary/50">
                <th className="py-2.5 px-4 font-medium">Test Name</th>
                <th className="py-2.5 px-4 font-medium">Date</th>
                <th className="py-2.5 px-4 font-medium">Time Taken</th>
                <th className="py-2.5 px-4 font-medium">Score</th>
                <th className="py-2.5 px-4 font-medium">Accuracy</th>
                <th className="py-2.5 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <Fragment key={a.id}>
                  <tr className="border-t border-border">
                    <td className="py-2.5 px-4">{a.label}</td>
                    <td className="py-2.5 px-4 whitespace-nowrap text-muted-foreground">{new Date(a.date).toLocaleDateString()}</td>
                    <td className="py-2.5 px-4 whitespace-nowrap">{formatDuration(a.durationSec)}</td>
                    <td className="py-2.5 px-4 whitespace-nowrap">{a.score}/{a.maxScore}</td>
                    <td className="py-2.5 px-4">{accuracyOf(a)}%</td>
                    <td className="py-2.5 px-4">
                      <div className="flex gap-2 whitespace-nowrap">
                        <button
                          onClick={() => setExpandedId(expandedId === a.id ? null : a.id)}
                          className="text-primary font-medium hover:underline"
                        >
                          {expandedId === a.id ? 'Hide' : 'Review'}
                        </button>
                        {a.sourceRoute && (
                          <Link to={a.sourceRoute} className="text-primary font-medium hover:underline">
                            Reattempt
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                  {expandedId === a.id && (
                    <tr>
                      <td colSpan={6} className="bg-secondary/30 px-4 py-5">
                        <div className="flex flex-col gap-4 max-w-3xl">
                          {a.answers.map((ans, i) => {
                            const item = findQuestionItem(ans.subject, ans.questionId)
                            if (!item) return null
                            return (
                              <QuestionCard
                                key={ans.questionId}
                                question={item.question}
                                index={i}
                                total={a.answers.length}
                                selectedIndex={ans.selectedIndex}
                                showResult
                              />
                            )
                          })}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        Rank isn't shown — One9 is a self-paced local tool with no shared leaderboard to rank against.
      </p>
    </div>
  )
}
