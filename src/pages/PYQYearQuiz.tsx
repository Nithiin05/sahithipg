import { useMemo, useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import QuestionCard from '../components/QuestionCard'
import QuestionPalette from '../components/QuestionPalette'
import ProgressBar from '../components/ProgressBar'
import { getSubject } from '../data/subjects'
import { pooledPYQQuestions, shuffle } from '../lib/quizEngine'
import { computeAttempt } from '../lib/scoring'
import { saveAttempt } from '../lib/attempts'
import { isBookmarked, toggleBookmark } from '../lib/bookmarks'
import type { AttemptRecord, SubjectSlug } from '../types'

export default function PYQYearQuiz() {
  const { year: yearParam } = useParams()
  const [params] = useSearchParams()
  const subjectSlug = params.get('subject') ?? ''
  const subject = getSubject(subjectSlug)
  const year = parseInt(yearParam ?? '', 10)

  const [attemptKey, setAttemptKey] = useState(0)
  const items = useMemo(
    () => shuffle(pooledPYQQuestions(subject ? (subject.slug as SubjectSlug) : undefined, year)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [subjectSlug, year, attemptKey],
  )

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [startTime] = useState(() => Date.now())
  const [result, setResult] = useState<AttemptRecord | null>(null)
  const [, setBookmarkTick] = useState(0)

  if (!year || Number.isNaN(year)) return <Navigate to="/pyqs" replace />
  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <p className="font-display font-bold text-lg mb-2">No questions yet for {year}</p>
        <Link to="/pyqs" className="text-primary font-semibold hover:underline">Back to PYQs</Link>
      </div>
    )
  }

  const currentItem = items[current]
  const answeredMask = items.map((it) => answers[it.question.id] !== undefined)
  const answeredCount = answeredMask.filter(Boolean).length

  const select = (i: number) => {
    if (result) return
    setAnswers((prev) => ({ ...prev, [currentItem.question.id]: i }))
  }

  const toggleCurrentBookmark = () => {
    toggleBookmark(currentItem.question.id, currentItem.subject)
    setBookmarkTick((t) => t + 1)
  }

  const label = `PYQ-Style ${year}${subject ? ` · ${subject.shortName}` : ''}`

  const submit = () => {
    const durationSec = Math.round((Date.now() - startTime) / 1000)
    const attempt = computeAttempt({
      kind: 'mock',
      mockKind: 'pyq',
      label,
      items,
      answers,
      marksCorrect: 4,
      marksWrong: 1,
      durationSec,
      sourceRoute: `/pyqs/${year}${subjectSlug ? `?subject=${subjectSlug}` : ''}`,
    })
    saveAttempt(attempt)
    setResult(attempt)
  }

  const retake = () => {
    setResult(null)
    setAnswers({})
    setCurrent(0)
    setAttemptKey((k) => k + 1)
  }

  if (result) {
    const accuracy = result.attempted > 0 ? Math.round((result.correct / result.attempted) * 100) : 0
    return (
      <div className="pb-20">
        <PageHeader
          eyebrow={label}
          title="Results"
          actions={
            <div className="flex gap-2">
              <button onClick={retake} className="border border-border rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary">
                Retake
              </button>
              <Link to="/pyqs" className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold">
                Back to PYQs
              </Link>
            </div>
          }
        />
        <div className="max-w-4xl mx-auto px-6">
          <div className="card p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 text-center">
            <div>
              <p className="text-2xl font-display font-extrabold text-primary">{result.correct}/{result.totalQuestions}</p>
              <p className="text-xs text-muted-foreground mt-1">Correct</p>
            </div>
            <div>
              <p className="text-2xl font-display font-extrabold">{accuracy}%</p>
              <p className="text-xs text-muted-foreground mt-1">Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-display font-extrabold text-danger">{result.wrong}</p>
              <p className="text-xs text-muted-foreground mt-1">Wrong</p>
            </div>
            <div>
              <p className="text-2xl font-display font-extrabold text-muted-foreground">{result.skipped}</p>
              <p className="text-xs text-muted-foreground mt-1">Skipped</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {items.map((item, i) => (
              <QuestionCard key={item.question.id} question={item.question} index={i} total={items.length} selectedIndex={answers[item.question.id] ?? null} showResult />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow={label}
        title="PYQ-Style Practice"
        description={`${items.length} questions · untimed`}
        actions={
          <button onClick={submit} className="bg-primary text-primary-foreground rounded-lg px-5 py-2.5 text-sm font-semibold hover:opacity-90">
            Submit Quiz
          </button>
        }
      />
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>{answeredCount} of {items.length} answered</span>
          </div>
          <ProgressBar value={answeredCount} max={items.length} />
        </div>
        <div className="grid lg:grid-cols-[1fr_260px] gap-6 items-start">
          <div>
            <QuestionCard
              question={currentItem.question}
              index={current}
              total={items.length}
              selectedIndex={answers[currentItem.question.id] ?? null}
              onSelect={select}
              bookmarked={isBookmarked(currentItem.question.id)}
              onToggleBookmark={toggleCurrentBookmark}
            />
            <div className="flex justify-between mt-5">
              <button
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
                className="border border-border rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-40 hover:bg-secondary"
              >
                &larr; Previous
              </button>
              {current < items.length - 1 ? (
                <button onClick={() => setCurrent((c) => Math.min(items.length - 1, c + 1))} className="bg-primary text-primary-foreground rounded-lg px-5 py-2 text-sm font-semibold">
                  Next &rarr;
                </button>
              ) : (
                <button onClick={submit} className="bg-primary text-primary-foreground rounded-lg px-5 py-2 text-sm font-semibold">
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
          <QuestionPalette count={items.length} currentIndex={current} answeredMask={answeredMask} onJump={setCurrent} />
        </div>
      </div>
    </div>
  )
}
