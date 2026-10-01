import { Link, Navigate, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { getSubject } from '../data/subjects'
import { difficultySetCount, DIFFICULTY_SET_SIZE } from '../lib/quizEngine'
import { DIFFICULTIES, DIFFICULTY_DESCRIPTIONS, DIFFICULTY_LABELS } from '../lib/difficulty'
import type { Difficulty, SubjectSlug } from '../types'

/** Lists the practice sets for one subject + difficulty tier. */
export default function DifficultySetList() {
  const { subject: subjectSlug, difficulty } = useParams<{ subject: string; difficulty?: string }>()
  const subject = getSubject(subjectSlug ?? '')
  const diff = difficulty as Difficulty | undefined

  if (!subject) return <Navigate to="/subjects" replace />
  if (!diff || !DIFFICULTIES.includes(diff)) return <Navigate to={`/subjects/${subject.slug}`} replace />

  const setCount = difficultySetCount(subject.slug as SubjectSlug, diff)

  return (
    <div className="pb-20">
      <PageHeader eyebrow={subject.shortName} title={`${DIFFICULTY_LABELS[diff]} sets`} description={DIFFICULTY_DESCRIPTIONS[diff]} />

      <div className="max-w-4xl mx-auto px-6">
        {setCount === 0 ? (
          <div className="card p-6 text-center text-sm text-muted-foreground">
            No {diff.toLowerCase()} questions in this subject yet — check back soon as more are added.
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: setCount }, (_, i) => i + 1).map((n) => (
              <Link key={n} to={`/subjects/${subject.slug}/level/${diff}/${n}`} className="card card-hover p-5 flex items-center justify-between gap-4">
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
