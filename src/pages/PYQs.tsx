import { Link, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { getSubject, subjects } from '../data/subjects'
import { pooledPYQQuestions, pyqYears } from '../lib/quizEngine'
import type { SubjectSlug } from '../types'

const ALL_YEARS = Array.from({ length: 2026 - 2005 + 1 }, (_, i) => 2026 - i)

export default function PYQs() {
  const [params, setParams] = useSearchParams()
  const subjectSlug = params.get('subject') ?? ''
  const subject = getSubject(subjectSlug)
  const yearsWithContent = new Set(pyqYears())

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Previous Year Questions"
        title={subject ? `PYQ-Style Practice — ${subject.name}` : 'PYQ-Style Practice, by Year'}
        description="Original, pattern-based practice questions written in the structure/style reported for each year — clearly labeled, never a reproduction of an official paper."
      />

      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-sm text-muted-foreground mr-1">Filter by subject:</span>
          <button
            onClick={() => setParams({})}
            className={`tag border transition-colors ${!subject ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}
          >
            All subjects
          </button>
          {subjects.map((s) => (
            <button
              key={s.slug}
              onClick={() => setParams({ subject: s.slug })}
              className={`tag border transition-colors ${subjectSlug === s.slug ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}
            >
              {s.shortName}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {ALL_YEARS.map((year) => {
            const count = pooledPYQQuestions(subject ? (subject.slug as SubjectSlug) : undefined, year).length
            const hasContent = yearsWithContent.has(year) && count > 0
            return hasContent ? (
              <Link
                key={year}
                to={`/pyqs/${year}${subjectSlug ? `?subject=${subjectSlug}` : ''}`}
                className="card card-hover p-4 text-center"
              >
                <p className="font-display font-extrabold text-lg text-primary">{year}</p>
                <p className="text-xs text-muted-foreground mt-1">{count} question{count === 1 ? '' : 's'}</p>
              </Link>
            ) : (
              <div key={year} className="card p-4 text-center opacity-40 cursor-not-allowed">
                <p className="font-display font-extrabold text-lg">{year}</p>
                <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
