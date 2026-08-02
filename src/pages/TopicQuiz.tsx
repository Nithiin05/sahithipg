import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import QuestionCard from '../components/QuestionCard'
import QuestionPalette from '../components/QuestionPalette'
import ProgressBar from '../components/ProgressBar'
import { getTopic } from '../data/subjects'
import { buildTopicQuiz } from '../lib/quizEngine'
import { computeAttempt } from '../lib/scoring'
import { saveAttempt } from '../lib/attempts'
import { clearResumeState, readResumeStateFor, saveResumeState } from '../lib/testResume'
import { isBookmarked, toggleBookmark } from '../lib/bookmarks'
import type { AttemptRecord, SubjectSlug } from '../types'

export default function TopicQuiz() {
  const { subject: subjectSlug, topic: topicId } = useParams()
  const { subject, topic } = getTopic(subjectSlug ?? '', topicId ?? '')
  const route = `/subjects/${subjectSlug}/${topicId}`

  const initialResume = useMemo(
    () => readResumeStateFor((s) => s.kind === 'practice' && s.route === route),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [subjectSlug, topicId],
  )

  const [attemptKey, setAttemptKey] = useState(0)
  const items = useMemo(
    () => (subjectSlug ? buildTopicQuiz(subjectSlug as SubjectSlug, topicId ?? '') : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [subjectSlug, topicId, attemptKey],
  )

  const [current, setCurrent] = useState(() => initialResume?.currentIndex ?? 0)
  const [answers, setAnswers] = useState<Record<string, number>>(() => initialResume?.answers ?? {})
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>(() => {
    const m: Record<string, boolean> = {}
    initialResume?.markedForReview?.forEach((id) => {
      m[id] = true
    })
    return m
  })
  const [startTime, setStartTime] = useState(() => Date.now())
  const [result, setResult] = useState<AttemptRecord | null>(null)
  const [, setBookmarkTick] = useState(0)

  const prevRouteKeyRef = useRef<string | null>(null)
  useEffect(() => {
    const key = `${subjectSlug}:${topicId}`
    if (prevRouteKeyRef.current !== null && prevRouteKeyRef.current !== key) {
      setCurrent(0)
      setAnswers({})
      setMarkedForReview({})
      setResult(null)
      setStartTime(Date.now())
    }
    prevRouteKeyRef.current = key
  }, [subjectSlug, topicId])

  useEffect(() => {
    if (!subject || !topic || result) return
    saveResumeState({
      kind: 'practice',
      route,
      label: `${subject.shortName} · ${topic.name}`,
      answers,
      markedForReview: Object.keys(markedForReview).filter((k) => markedForReview[k]),
      currentIndex: current,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, topic, answers, markedForReview, current, result])

  if (!subject || !topic) return <Navigate to="/subjects" replace />
  if (items.length === 0) return null

  const currentItem = items[current]
  const answeredMask = items.map((it) => answers[it.question.id] !== undefined)
  const markedMask = items.map((it) => !!markedForReview[it.question.id])
  const answeredCount = answeredMask.filter(Boolean).length
  const isMarked = !!markedForReview[currentItem.question.id]

  const select = (i: number) => {
    if (result) return
    setAnswers((prev) => ({ ...prev, [currentItem.question.id]: i }))
  }

  const toggleMark = () => {
    setMarkedForReview((prev) => ({ ...prev, [currentItem.question.id]: !prev[currentItem.question.id] }))
  }

  const toggleCurrentBookmark = () => {
    toggleBookmark(currentItem.question.id, subject.slug as SubjectSlug)
    setBookmarkTick((t) => t + 1)
  }

  const submit = () => {
    const durationSec = Math.round((Date.now() - startTime) / 1000)
    const attempt = computeAttempt({
      kind: 'practice',
      label: `${subject.shortName} · ${topic.name}`,
      items,
      answers,
      marksCorrect: 1,
      marksWrong: 0,
      durationSec,
      sourceRoute: route,
    })
    saveAttempt(attempt)
    clearResumeState()
    setResult(attempt)
  }

  const retake = () => {
    setResult(null)
    setAnswers({})
    setMarkedForReview({})
    setCurrent(0)
    setAttemptKey((k) => k + 1)
  }

  if (result) {
    const accuracy = result.attempted > 0 ? Math.round((result.correct / result.attempted) * 100) : 0
    return (
      <div className="pb-20">
        <PageHeader
          eyebrow={`${subject.shortName} · ${topic.name}`}
          title="Quiz results"
          actions={
            <div className="flex gap-2">
              <button onClick={retake} className="border border-border rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary">
                Retake
              </button>
              <Link to={`/subjects/${subject.slug}`} className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold">
                Back to topics
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
              <QuestionCard
                key={item.question.id}
                question={item.question}
                index={i}
                total={items.length}
                selectedIndex={answers[item.question.id] ?? null}
                showResult
                bookmarked={isBookmarked(item.question.id)}
                onToggleBookmark={() => {
                  toggleBookmark(item.question.id, item.subject)
                  setBookmarkTick((t) => t + 1)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow={`${subject.shortName} · ${topic.name}`}
        title="Topic quiz"
        description={`${items.length} questions · untimed · answer at your own pace`}
        actions={
          <button
            onClick={submit}
            className="bg-primary text-primary-foreground rounded-lg px-5 py-2.5 text-sm font-semibold hover:opacity-90"
          >
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
            <div className="flex flex-wrap justify-between items-center gap-3 mt-5">
              <div className="flex gap-3">
                <button
                  onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                  disabled={current === 0}
                  className="border border-border rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-40 hover:bg-secondary"
                >
                  &larr; Previous
                </button>
                <button
                  onClick={toggleMark}
                  className={`border rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isMarked ? 'border-warning bg-warning-bg text-warning' : 'border-border hover:bg-secondary'
                  }`}
                >
                  {isMarked ? '★ Marked' : '☆ Mark for Review'}
                </button>
              </div>
              {current < items.length - 1 ? (
                <button
                  onClick={() => setCurrent((c) => Math.min(items.length - 1, c + 1))}
                  className="bg-primary text-primary-foreground rounded-lg px-5 py-2 text-sm font-semibold"
                >
                  Next &rarr;
                </button>
              ) : (
                <button onClick={submit} className="bg-primary text-primary-foreground rounded-lg px-5 py-2 text-sm font-semibold">
                  Submit Quiz
                </button>
              )}
            </div>
          </div>

          <QuestionPalette
            count={items.length}
            currentIndex={current}
            answeredMask={answeredMask}
            markedMask={markedMask}
            onJump={setCurrent}
          />
        </div>
      </div>
    </div>
  )
}
