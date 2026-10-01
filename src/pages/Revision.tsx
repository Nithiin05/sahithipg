import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { getAttempts } from '../lib/attempts'
import { latestAnswers, weakAreas } from '../lib/stats'
import { getRevisionQueue, getDueRevision } from '../lib/revisionQueue'
import { pooledAllSubjectsQuestions, findQuestionItem, type QuizQuestionItem } from '../lib/quizEngine'
import { inCategory } from '../data/taxonomy'
import { sessionUrl } from '../lib/testEngine'

type ListKey = 'incorrect' | 'marked' | 'due' | 'weak' | 'high-yield' | 'pyq' | 'image'

const LISTS: { key: ListKey; label: string; description: string }[] = [
  { key: 'incorrect', label: 'Incorrect', description: 'Questions whose most recent attempt was wrong.' },
  { key: 'marked', label: 'Marked', description: 'Questions you marked for review in a test.' },
  { key: 'due', label: 'Due for revision', description: 'Questions you chose to “Revise again”, spaced at 1, 3, 7, 14 and 30 days.' },
  { key: 'weak', label: 'Weak topics', description: 'Questions from topics flagged as weak by your results.' },
  { key: 'high-yield', label: 'High-yield', description: 'High-yield questions you have not attempted yet.' },
  { key: 'pyq', label: 'PYQs', description: 'Verified PYQs and PYQ-pattern questions.' },
  { key: 'image', label: 'Image questions', description: 'Every image-based question.' },
]

const SESSION_MAX = 50

export default function Revision() {
  const [params, setParams] = useSearchParams()
  const active = (params.get('list') as ListKey) ?? 'incorrect'
  const attempts = useMemo(() => getAttempts(), [])

  const lists = useMemo(() => {
    const latest = latestAnswers(attempts)
    const all = pooledAllSubjectsQuestions()
    const byId = (ids: string[]) => ids.map(findQuestionItem).filter((x): x is QuizQuestionItem => !!x)
    const weakKeys = new Set(weakAreas(attempts, 20).map((w) => `${w.subject}::${w.topic}`))
    const attempted = new Set([...latest.values()].filter((a) => a.isCorrect !== null).map((a) => a.questionId))
    const out: Record<ListKey, QuizQuestionItem[]> = {
      incorrect: byId([...latest.values()].filter((a) => a.isCorrect === false).map((a) => a.questionId)),
      marked: byId([...latest.values()].filter((a) => a.marked).map((a) => a.questionId)),
      due: byId(getDueRevision().map((e) => e.questionId)),
      weak: all.filter((it) => weakKeys.has(`${it.subject}::${it.topic}`)),
      'high-yield': all.filter((it) => inCategory(it, 'high-yield') && !attempted.has(it.question.id)),
      pyq: all.filter((it) => inCategory(it, 'pyq') || inCategory(it, 'pyq-pattern')),
      image: all.filter((it) => inCategory(it, 'image')),
    }
    return out
  }, [attempts])

  const queued = getRevisionQueue().length
  const items = lists[active]
  const info = LISTS.find((l) => l.key === active)!

  return (
    <div className="pb-20">
      <PageHeader eyebrow="Revision" title="My Revision" description="Everything you should look at again, in one place. Each list opens an untimed revision session with explanations." />
      <div className="max-w-6xl mx-auto px-6 grid gap-6 lg:grid-cols-[240px_1fr] items-start">
        <nav className="card p-2 flex lg:flex-col gap-1 overflow-x-auto">
          {LISTS.map((l) => (
            <button
              key={l.key}
              onClick={() => setParams({ list: l.key })}
              className={`flex justify-between items-center gap-3 px-3 py-2 rounded-lg text-sm whitespace-nowrap ${active === l.key ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:bg-secondary'}`}
            >
              {l.label}
              <span className="tabular-nums text-xs">{lists[l.key].length}</span>
            </button>
          ))}
        </nav>

        <section className="card p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="font-semibold">{info.label}</h2>
              <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
              {active === 'due' && <p className="text-xs text-muted-foreground mt-1">{queued} question{queued === 1 ? '' : 's'} in your revision queue in total.</p>}
            </div>
            {items.length > 0 && (
              <Link
                to={sessionUrl(items.slice(0, SESSION_MAX).map((i) => i.question.id), `Revision: ${info.label}`, 'revision')}
                className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold shrink-0"
              >
                Revise {Math.min(SESSION_MAX, items.length)} now
              </Link>
            )}
          </div>
          {items.length === 0 ? (
            <p className="text-sm rounded-lg bg-secondary px-4 py-3">
              {active === 'due'
                ? 'Nothing due. Use “Revise again” on any question in a test result to add it here.'
                : active === 'pyq'
                  ? 'No verified PYQs or PYQ-pattern questions yet.'
                  : 'Nothing here yet — take a test or a practice session first.'}
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {items.slice(0, 30).map((it) => (
                <li key={it.question.id} className="py-3 flex gap-3 items-start">
                  <span className="tag bg-secondary text-muted-foreground shrink-0">{it.subjectName}</span>
                  <Link to={`/question/${it.question.id}`} className="text-sm hover:text-primary line-clamp-2">
                    {it.question.text}
                  </Link>
                </li>
              ))}
              {items.length > 30 && <li className="py-3 text-xs text-muted-foreground">and {items.length - 30} more…</li>}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
