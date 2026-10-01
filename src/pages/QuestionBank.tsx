import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { subjects } from '../data/subjects'
import { ALL_CATEGORIES, CATEGORY_INFO, type QuestionCategory } from '../data/taxonomy'
import { customQuery, poolFor } from '../lib/testEngine'
import { DIFFICULTIES, DIFFICULTY_LABELS } from '../lib/difficulty'
import type { Difficulty, SubjectSlug } from '../types'

/** Question Bank: browse by category, filter by subject and difficulty, practise untimed. */
export default function QuestionBank() {
  const [params, setParams] = useSearchParams()
  const cat = (params.get('cat') as QuestionCategory | null) ?? null
  const [subject, setSubject] = useState<SubjectSlug | ''>('')
  const [difficulty, setDifficulty] = useState<Difficulty | ''>('')

  const counts = useMemo(() => Object.fromEntries(ALL_CATEGORIES.map((c) => [c, poolFor({ categories: [c] }).length])), [])
  const filtered = useMemo(
    () =>
      cat
        ? poolFor({ categories: [cat], subjects: subject ? [subject] : undefined, difficulties: difficulty ? [difficulty] : undefined })
        : [],
    [cat, subject, difficulty],
  )
  const bySubject = useMemo(() => {
    const m = new Map<string, number>()
    for (const it of filtered) m.set(it.subjectName, (m.get(it.subjectName) ?? 0) + 1)
    return [...m.entries()].sort((a, b) => b[1] - a[1])
  }, [filtered])

  const start = (n: number) =>
    `/tests/custom?${customQuery({ subjects: subject ? [subject] : [], categories: cat ? [cat] : [], difficulties: difficulty ? [difficulty] : [], count: n, timed: false })}`

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Question Bank"
        title={cat ? CATEGORY_INFO[cat].label : 'Question Bank'}
        description={cat ? CATEGORY_INFO[cat].description : 'Every question is labelled with its source — Verified PYQ, PYQ Pattern, Practice, Image-Based or Integrated.'}
      />
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-8">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
          {ALL_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setParams({ cat: c })}
              className={`card card-hover p-4 text-left ${cat === c ? 'ring-2 ring-primary' : ''}`}
            >
              <p className="font-semibold text-sm">{CATEGORY_INFO[c].label}</p>
              <p className="text-xs text-muted-foreground mt-1">{counts[c]} questions</p>
            </button>
          ))}
        </div>

        {cat && (
          <div className="card p-6 flex flex-col gap-5">
            <div className="flex flex-wrap gap-4">
              <label className="text-sm font-semibold flex flex-col gap-1.5">
                Subject
                <select value={subject} onChange={(e) => setSubject(e.target.value as SubjectSlug | '')} className="border border-border rounded-lg px-3 py-2 bg-surface font-normal min-w-[180px]">
                  <option value="">All subjects</option>
                  {subjects.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-semibold flex flex-col gap-1.5">
                Difficulty
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty | '')} className="border border-border rounded-lg px-3 py-2 bg-surface font-normal min-w-[160px]">
                  <option value="">All levels</option>
                  {DIFFICULTIES.map((d) => (
                    <option key={d} value={d}>
                      {DIFFICULTY_LABELS[d]}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {filtered.length === 0 ? (
              <p className="text-sm rounded-lg bg-secondary px-4 py-3">
                {cat === 'pyq'
                  ? 'No verified PYQs have been added yet. Questions appear here only when their wording and session are confirmed against a reliable source.'
                  : cat === 'pyq-pattern'
                    ? 'PYQ-pattern questions are written against concepts confirmed from past papers and will appear here as they are added.'
                    : 'No questions match these filters yet.'}
              </p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  {bySubject.map(([name, n]) => (
                    <span key={name} className="tag bg-secondary text-muted-foreground">
                      {name} · {n}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-muted-foreground mr-2">{filtered.length} questions · untimed practice with full explanations at the end</span>
                  {[10, 25, 50].filter((n) => n < filtered.length).map((n) => (
                    <Link key={n} to={start(n)} className="border border-border rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary">
                      Practise {n}
                    </Link>
                  ))}
                  <Link to={start(Math.min(200, filtered.length))} className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold">
                    Practise {Math.min(200, filtered.length)}
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
