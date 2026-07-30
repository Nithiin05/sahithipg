import { Link, Navigate, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { getSubject } from '../data/subjects'
import { difficultySetCount, previousYearSetCount } from '../lib/quizEngine'
import { DIFFICULTIES, DIFFICULTY_DESCRIPTIONS } from '../lib/difficulty'
import type { Difficulty, SubjectSlug } from '../types'

const LEVEL_STYLES: Record<Difficulty, string> = {
  Easy: 'bg-success-bg text-success',
  Medium: 'bg-warning-bg text-warning',
  Hard: 'bg-danger-bg text-danger',
}

export default function PracticeSubject() {
  const { subject: subjectSlug } = useParams()
  const subject = getSubject(subjectSlug ?? '')

  if (!subject) return <Navigate to="/practice" replace />

  const pyqCount = previousYearSetCount(subject.slug as SubjectSlug)

  return (
    <div className="pb-20">
      <PageHeader eyebrow="Practice" title={subject.name} description={subject.description} />

      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-8">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Practice by difficulty
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {DIFFICULTIES.map((level) => {
              const count = difficultySetCount(subject.slug as SubjectSlug, level)
              return (
                <Link
                  key={level}
                  to={`/practice/${subject.slug}/level/${level}`}
                  className="card card-hover p-5 flex flex-col gap-2"
                >
                  <span className={`tag w-fit ${LEVEL_STYLES[level]}`}>{level}</span>
                  <p className="text-xs text-muted-foreground flex-1" style={{ lineHeight: 1.5 }}>
                    {DIFFICULTY_DESCRIPTIONS[level]}
                  </p>
                  <span className="text-xs font-semibold text-primary">{count} set{count === 1 ? '' : 's'} &rarr;</span>
                </Link>
              )
            })}
          </div>
        </div>

        {pyqCount > 0 && (
          <Link to={`/practice/${subject.slug}/pyq`} className="card card-hover p-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">Previous Year Questions</h3>
              <p className="text-sm text-muted-foreground mt-1">Pattern-based PYQs for {subject.shortName}</p>
            </div>
            <span className="tag bg-secondary text-muted-foreground shrink-0">{pyqCount} set{pyqCount === 1 ? '' : 's'}</span>
          </Link>
        )}

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Practice by topic</h2>
          <div className="flex flex-col gap-3">
        {subject.topics.map((topic) => (
          <Link
            key={topic.id}
            to={`/practice/${subject.slug}/${topic.id}`}
            className="card card-hover p-5 flex items-center justify-between gap-4"
          >
            <div>
              <h3 className="font-semibold">{topic.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
            </div>
            <span className="tag bg-secondary text-muted-foreground shrink-0">{topic.questions.length} Qs</span>
          </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
