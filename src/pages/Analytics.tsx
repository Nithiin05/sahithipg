import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import DashboardTab from '../components/analytics/DashboardTab'
import DailyChallengeTab from '../components/analytics/DailyChallengeTab'
import SmartRevisionTab from '../components/analytics/SmartRevisionTab'
import HistoryTab from '../components/analytics/HistoryTab'
import { getAttempts, clearAttempts } from '../lib/attempts'

const TABS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'daily', label: 'Daily Challenge' },
  { key: 'revision', label: 'Smart Revision' },
  { key: 'history', label: 'Test History' },
] as const

export default function Analytics() {
  const [attempts, setAttempts] = useState(() => getAttempts())
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('dashboard')

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Analytics"
        title="Your performance dashboard"
        description="Aggregated from every quiz, mock test, and challenge you've taken in this browser."
        actions={
          tab === 'dashboard' && attempts.length > 0 ? (
            <button
              onClick={() => {
                if (window.confirm('Clear all attempt history? This cannot be undone.')) {
                  clearAttempts()
                  setAttempts([])
                }
              }}
              className="text-sm font-medium text-muted-foreground hover:text-danger border border-border rounded-lg px-4 py-2"
            >
              Clear history
            </button>
          ) : undefined
        }
      />

      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`tag border transition-colors ${
                tab === t.key ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:bg-secondary'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'dashboard' &&
          (attempts.length > 0 ? (
            <DashboardTab attempts={attempts} />
          ) : (
            <div className="card p-10 text-center">
              <p className="font-display font-bold text-lg mb-2">No attempts yet</p>
              <p className="text-muted-foreground mb-6">
                Take a topic quiz, a mock test, or today's Daily Challenge and your accuracy, weak topics, and
                history will show up here.
              </p>
              <div className="flex justify-center gap-3">
                <Link to="/subjects" className="gradient-primary text-white rounded-lg px-5 py-2.5 text-sm font-semibold">
                  Start practicing
                </Link>
                <Link to="/grand-tests" className="border border-border rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-secondary">
                  Take a Grand Test
                </Link>
              </div>
            </div>
          ))}
        {tab === 'daily' && <DailyChallengeTab />}
        {tab === 'revision' && <SmartRevisionTab attempts={attempts} />}
        {tab === 'history' &&
          (attempts.length > 0 ? (
            <HistoryTab attempts={attempts} />
          ) : (
            <div className="card p-10 text-center text-muted-foreground">No tests attempted yet.</div>
          ))}
      </div>
    </div>
  )
}
