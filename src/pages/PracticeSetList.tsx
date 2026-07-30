import { Link, Navigate, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { getSubject } from '../data/subjects'
import { difficultySetCount, previousYearSetCount, DIFFICULTY_SET_SIZE } from '../lib/quizEngine'
import { DIFFICULTY_DESCRIPTIONS } from '../lib/difficulty'
import type { Difficulty, SubjectSlug } from '../types'

/** Lists the practice sets for a subject, either for one difficulty tier
 * (Easy/Medium/Hard) or for the previous-year-question pool. */
export default function PracticeSetList({ mode }: { mode: 'level' | 'pyq' }) {
  const { subject: subjectSlug, difficulty } = useParams<{ subject: string; difficulty?: string }>()
  const subject = getSubject(subjectSlug ?? '')
  const diff = (difficulty as Difficulty | undefined) ?? null

  if (!subject) return <Navigate to="/practice" replace />
  if (mode === 'level' && (!diff || !['Easy', 'Medium', 'Hard'].includes(diff))) {
    return <Navigate to={`/practice/${subject.slug}`} replace />
  }

  const setCount =
    mode === 'level'
      ? difficultySetCount(subject.slug as SubjectSlug, diff as Difficulty)
      : previousYearSetCount(subject.slug as SubjectSlug)

  const basePath = mode === 'level' ? `/practice/${subject.slug}/level/${diff}` : `/practice/${subject.slug}/pyq`

  const title = mode === 'level' ? `${subject.shortName} · ${diff} sets` : `${subject.shortName} · Previous Year Questions`
  const description =
    mode === 'level'
      ? DIFFICULTY_DESCRIPTIONS[diff as Difficulty]
      : 'Previous-year-pattern questions for this subject, grouped into timed practice sets.'

  return (
    <div className="pb-20">
      <PageHeader eyebrow="Practice" title={title} description={description} />

      <div className="max-w-4xl mx-auto px-6">
        {setCount === 0 ? (
          <div className="card p-6 text-center text-sm text-muted-foreground">
            No sets available here yet — check back soon as more questions are added.
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: setCount }, (_, i) => i + 1).map((n) => (
              <Link key={n} to={`${basePath}/${n}`} className="card card-hover p-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold">Set {n}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Up to {DIFFICULTY_SET_SIZE} questions</p>
                </div>
                <span className="text-muted-foreground">&rarr;</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
