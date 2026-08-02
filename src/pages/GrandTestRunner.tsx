import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard'
import QuestionPalette from '../components/QuestionPalette'
import Timer from '../components/Timer'
import FloatingCalculator from '../components/FloatingCalculator'
import { getGrandTest } from '../data/grandTests'
import { buildMockQuestions, buildMockQuestionsFromIds } from '../lib/quizEngine'
import { computeAttempt } from '../lib/scoring'
import { saveAttempt } from '../lib/attempts'
import { clearResumeState, readResumeStateFor, saveResumeState } from '../lib/testResume'
import { isBookmarked, toggleBookmark } from '../lib/bookmarks'

/** Full-length Grand Test runner — a single continuous timer across all questions (no per-section stepping). */
export default function GrandTestRunner() {
  const { grandId } = useParams()
  const navigate = useNavigate()
  const config = getGrandTest(grandId ?? '')

  const initialResume = useMemo(
    () => (config ? readResumeStateFor((s) => s.kind === 'grand' && s.mockId === config.id) : null),
    [config],
  )

  const runtime = useMemo(() => {
    if (!config) return []
    if (initialResume?.sectionQuestionIds) return buildMockQuestionsFromIds(config, initialResume.sectionQuestionIds)
    return buildMockQuestions(config)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config])
  const items = useMemo(() => runtime.flatMap((r) => r.items), [runtime])

  const [questionIndex, setQuestionIndex] = useState(() => initialResume?.currentIndex ?? 0)
  const [answers, setAnswers] = useState<Record<string, number>>(() => initialResume?.answers ?? {})
  const [secondsLeft, setSecondsLeft] = useState<number>(() => initialResume?.secondsLeft ?? (config?.durationMinutes ?? 0) * 60)
  const [started] = useState(() => initialResume?.started ?? Date.now())
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>(() => {
    const m: Record<string, boolean> = {}
    initialResume?.markedForReview?.forEach((id) => {
      m[id] = true
    })
    return m
  })
  const [calculatorOpen, setCalculatorOpen] = useState(() => initialResume?.calculatorOpen ?? false)
  const [, setBookmarkTick] = useState(0)
  const finishedRef = useRef(false)

  const answersRef = useRef(answers)
  useEffect(() => {
    answersRef.current = answers
  }, [answers])

  useEffect(() => {
    if (!config || finishedRef.current || items.length === 0) return
    saveResumeState({
      kind: 'grand',
      route: `/grand-tests/${config.id}`,
      label: config.title,
      mockId: config.id,
      secondsLeft,
      started,
      sectionQuestionIds: runtime.map((r) => r.items.map((it) => it.question.id)),
      answers,
      markedForReview: Object.keys(markedForReview).filter((k) => markedForReview[k]),
      currentIndex: questionIndex,
      calculatorOpen,
    })
  }, [config, runtime, items.length, secondsLeft, started, answers, markedForReview, questionIndex, calculatorOpen])

  function finalize() {
    if (finishedRef.current || !config) return
    finishedRef.current = true
    clearResumeState()
    const durationSec = Math.round((Date.now() - started) / 1000)
    const attempt = computeAttempt({
      kind: 'grand',
      label: config.title,
      items,
      answers: answersRef.current,
      marksCorrect: config.marksCorrect,
      marksWrong: config.marksWrong,
      durationSec,
      sourceRoute: `/grand-tests/${config.id}`,
      grandTestId: config.id,
    })
    saveAttempt(attempt)
    navigate(`/grand-tests/${config.id}/result`, { state: { attempt } })
  }

  useEffect(() => {
    if (!config || items.length === 0) return
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.setTimeout(() => finalize(), 0)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, items.length])

  if (!config) return <Navigate to="/grand-tests" replace />
  if (items.length === 0) return null

  const item = items[questionIndex]
  const answeredMask = items.map((it) => answers[it.question.id] !== undefined)
  const markedMask = items.map((it) => !!markedForReview[it.question.id])
  const isLastQuestion = questionIndex === items.length - 1
  const isMarked = !!markedForReview[item.question.id]
  const answeredCount = answeredMask.filter(Boolean).length

  const select = (i: number) => {
    setAnswers((prev) => ({ ...prev, [item.question.id]: i }))
  }

  const toggleMark = () => {
    setMarkedForReview((prev) => ({ ...prev, [item.question.id]: !prev[item.question.id] }))
  }

  const toggleCurrentBookmark = () => {
    toggleBookmark(item.question.id, item.subject)
    setBookmarkTick((t) => t + 1)
  }

  return (
    <div className="pb-20">
      <div className="border-b border-border glass sticky top-[57px] z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">{config.title}</p>
            <p className="font-display font-bold">
              Question {questionIndex + 1} of {items.length} · {answeredCount} answered
            </p>
          </div>
          <Timer secondsLeft={secondsLeft} totalSeconds={config.durationMinutes * 60} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="grid lg:grid-cols-[1fr_260px] gap-6 items-start">
          <div>
            <QuestionCard
              question={item.question}
              index={questionIndex}
              total={items.length}
              selectedIndex={answers[item.question.id] ?? null}
              onSelect={select}
              bookmarked={isBookmarked(item.question.id)}
              onToggleBookmark={toggleCurrentBookmark}
            />
            <div className="flex flex-wrap justify-between items-center gap-3 mt-5">
              <div className="flex gap-3">
                <button
                  onClick={() => setQuestionIndex((q) => Math.max(0, q - 1))}
                  disabled={questionIndex === 0}
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

              <div className="flex gap-3">
                {!isLastQuestion ? (
                  <button
                    onClick={() => setQuestionIndex((q) => Math.min(items.length - 1, q + 1))}
                    className="gradient-primary text-white rounded-lg px-5 py-2 text-sm font-semibold"
                  >
                    Next &rarr;
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (window.confirm('Submit the Grand Test now? This cannot be undone.')) finalize()
                    }}
                    className="bg-success text-white rounded-lg px-5 py-2 text-sm font-semibold"
                  >
                    Submit Test
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <QuestionPalette
              count={items.length}
              currentIndex={questionIndex}
              answeredMask={answeredMask}
              markedMask={markedMask}
              onJump={setQuestionIndex}
            />
            <button
              onClick={() => {
                if (window.confirm('Submit the Grand Test now? This cannot be undone.')) finalize()
              }}
              className="text-sm font-medium text-muted-foreground hover:text-danger border border-border rounded-lg px-4 py-2.5"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>
      <FloatingCalculator initialOpen={calculatorOpen} onOpenChange={setCalculatorOpen} />
    </div>
  )
}
