import { Link, Navigate, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProgressBar from '../components/ProgressBar'
import { getSubject } from '../data/subjects'
import { difficultySetCount, pooledPYQQuestions } from '../lib/quizEngine'
import { DIFFICULTIES, DIFFICULTY_DESCRIPTIONS } from '../lib/difficulty'
import { getSyllabusProgress, toggleSyllabusItem } from '../lib/syllabusProgress'
import { SubjectIcon, SUBJECT_COLOR_CLASSES } from '../components/icons'
import { useState } from 'react'
import type { Difficulty, SubjectSlug } from '../types'

const LEVEL_STYLES: Record<Difficulty, string> = {
  Easy: 'bg-success-bg text-success',
  Medium: 'bg-warning-bg text-warning',
  Hard: 'bg-danger-bg text-danger',
  Expert: 'bg-primary/10 text-primary',
}

export default function SubjectDetail() {
  const { subject: subjectSlug } = useParams()
  const subject = getSubject(subjectSlug ?? '')
  const [progress, setProgress] = useState(() => getSyllabusProgress())

  if (!subject) return <Navigate to="/subjects" replace />

  const pyqCount = pooledPYQQuestions(subject.slug as SubjectSlug).length
  const reviewedCount = subject.topics.filter((t) => progress[`${subject.slug}:${t.id}`]).length

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow={subject.category}
        title={subject.name}
        description={subject.description}
        actions={
          <span className={`w-12 h-12 rounded-xl flex items-center justify-center ${SUBJECT_COLOR_CLASSES[subject.color] ?? ''}`}>
            <SubjectIcon name={subject.icon} className="w-6 h-6" />
          </span>
        }
      />

      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-8">
        <div className="card p-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold">Topics reviewed</span>
            <span className="text-muted-foreground">{reviewedCount} / {subject.topics.length}</span>
          </div>
          <ProgressBar value={reviewedCount} max={subject.topics.length} />
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Practice by difficulty
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {DIFFICULTIES.map((level) => {
              const count = difficultySetCount(subject.slug as SubjectSlug, level)
              return (
                <Link
                  key={level}
                  to={`/subjects/${subject.slug}/level/${level}`}
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
          <Link to={`/pyqs?subject=${subject.slug}`} className="card card-hover p-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">PYQ-Style Practice</h3>
              <p className="text-sm text-muted-foreground mt-1">Pattern-based practice questions for {subject.shortName}</p>
            </div>
            <span className="tag bg-secondary text-muted-foreground shrink-0">{pyqCount} question{pyqCount === 1 ? '' : 's'}</span>
          </Link>
        )}

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Topics</h2>
          <div className="flex flex-col gap-3">
            {subject.topics.map((topic) => {
              const key = `${subject.slug}:${topic.id}`
              const reviewed = !!progress[key]
              return (
                <div key={topic.id} className="card card-hover p-5 flex items-center justify-between gap-4">
                  <Link to={`/subjects/${subject.slug}/${topic.id}`} className="min-w-0 flex-1">
                    <h3 className="font-semibold">{topic.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
                  </Link>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="tag bg-secondary text-muted-foreground">{topic.questions.length} Qs</span>
                    <button
                      type="button"
                      onClick={() => setProgress(toggleSyllabusItem(key))}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                        reviewed ? 'bg-success-bg text-success border-success/30' : 'border-border text-muted-foreground hover:bg-secondary'
                      }`}
                    >
                      {reviewed ? 'Reviewed ✓' : 'Mark reviewed'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
