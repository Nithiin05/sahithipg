import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ResumeBanner from '../components/ResumeBanner'
import { grandTests, grandTestTotals } from '../data/grandTests'
import { examConfig, markingLabel } from '../config/examConfig'

const PAGE_SIZE = 24

export default function GrandTests() {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(grandTests.length / PAGE_SIZE)
  const pageItems = grandTests.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Grand Tests"
        title="Full-length exam simulation"
        description={`Full-length INI-CET simulations — ${examConfig.totalQuestions} questions across all 19 subjects, one ${examConfig.durationMinutes}-minute timer, question palette, "Mark for Review" and ${markingLabel()} marking, followed by a subject-wise performance report.`}
      />

      <ResumeBanner />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((g) => {
            const totals = grandTestTotals(g)
            return (
              <Link key={g.id} to={`/grand-tests/${g.id}`} className="card card-hover gradient-card p-5 flex flex-col gap-3">
                <h3 className="font-display font-bold">{g.title}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{totals.totalQuestions} Qs</span>
                  <span>{totals.totalMinutes} min</span>
                  <span>+1 / 0 marking</span>
                </div>
                <span className="mt-1 text-sm font-semibold text-primary">Start Grand Test &rarr;</span>
              </Link>
            )
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="border border-border rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-40 hover:bg-secondary"
            >
              &larr; Previous
            </button>
            <span className="text-sm text-muted-foreground">Page {page + 1} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="border border-border rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-40 hover:bg-secondary"
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
