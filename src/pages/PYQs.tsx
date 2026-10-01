import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Layers } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { getSubject, subjects } from '../data/subjects'
import { pooledBySource } from '../lib/quizEngine'
import { SOURCE_LABELS } from '../lib/questionSource'
import type { SubjectSlug } from '../types'

/**
 * INI-CET Previous-Year Questions. Two strictly separate pools:
 *  - Verified PYQs: actual paper questions with a named source (sourceType 'PYQ' + sourceDetail).
 *  - PYQ-pattern questions: original questions modelled on historical concepts.
 */
export default function PYQs() {
  const [params, setParams] = useSearchParams()
  const subjectSlug = params.get('subject') ?? ''
  const subject = getSubject(subjectSlug)
  const slug = subject ? (subject.slug as SubjectSlug) : undefined

  const verified = pooledBySource('PYQ', slug)
  const pattern = pooledBySource('PYQ_PATTERN', slug)

  // Group verified PYQs by their named paper, e.g. "INI-CET May 2024".
  const papers = new Map<string, number>()
  for (const it of verified) {
    const k = it.question.sourceDetail ?? 'Unknown session'
    papers.set(k, (papers.get(k) ?? 0) + 1)
  }

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Previous-Year Questions"
        title={subject ? `INI-CET PYQs — ${subject.name}` : 'INI-CET Previous-Year Questions'}
        description="Verified previous-year questions and PYQ-pattern practice are kept separate and labelled on every question. An original question is never presented as an actual INI-CET question."
      />

      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground mr-1">Subject:</span>
          <button
            onClick={() => setParams({})}
            className={`tag border transition-colors ${!subject ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}
          >
            All
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

        <section className="card p-6">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 size={18} className="text-success" />
            <h2 className="font-display font-bold">{SOURCE_LABELS.PYQ.label}s</h2>
            <span className="tag bg-secondary text-muted-foreground ml-auto">{verified.length}</span>
          </div>
          <p className="text-sm text-muted-foreground">Actual INI-CET questions, each tagged with the session it appeared in.</p>
          {papers.size > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {[...papers.entries()].map(([paper, n]) => (
                <div key={paper} className="rounded-lg border border-border p-4">
                  <p className="font-semibold text-sm">{paper}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {n} question{n === 1 ? '' : 's'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm mt-4 rounded-lg bg-secondary px-4 py-3">
              No verified PYQs have been added yet. Questions are only added here when their wording and session can be
              confirmed against a reliable source.
            </p>
          )}
        </section>

        <section className="card p-6">
          <div className="flex items-center gap-2 mb-1">
            <Layers size={18} className="text-primary" />
            <h2 className="font-display font-bold">{SOURCE_LABELS.PYQ_PATTERN.label} Questions</h2>
            <span className="tag bg-secondary text-muted-foreground ml-auto">{pattern.length}</span>
          </div>
          <p className="text-sm text-muted-foreground">Original questions modelled on concepts seen in past INI-CET papers — not actual paper questions.</p>
          {pattern.length > 0 ? (
            <Link to="/tests/pyq-pattern-test" className="inline-block mt-4 text-sm font-semibold text-primary hover:underline">
              Practise PYQ-pattern tests →
            </Link>
          ) : (
            <p className="text-sm mt-4 rounded-lg bg-secondary px-4 py-3">
              PYQ-pattern questions are being written and will appear here.
            </p>
          )}
        </section>
      </div>
    </div>
  )
}
