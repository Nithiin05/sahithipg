import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard'
import QuestionPalette from '../components/QuestionPalette'
import Timer from '../components/Timer'
import FloatingCalculator from '../components/FloatingCalculator'
import { getMockTest } from '../data/mockTests'
import { buildMockQuestions, buildMockQuestionsFromIds } from '../lib/quizEngine'
import { computeAttempt } from '../lib/scoring'
import { saveAttempt } from '../lib/attempts'
import { clearResumeState, readResumeStateFor, saveResumeState } from '../lib/testResume'
import { isBookmarked, toggleBookmark } from '../lib/bookmarks'
import { usePageTitle } from '../hooks/usePageTitle'

export default function MockRunner() {
  const { mockId } = useParams()
  const navigate = useNavigate()
  const config = getMockTest(mockId ?? '')
  usePageTitle(config?.title ?? 'Mock Test')

  // Only trust a saved resume record if it belongs to this exact mock test.
  const initialResume = useMemo(
    () => (config ? readResumeStateFor((s) => s.kind === 'mock' && s.mockId === config.id) : null),
    [config],
  )

  // Rebuild the exact same question set on resume instead of re-rolling a fresh random one.
  const runtime = useMemo(() => {
    if (!config) return []
    if (initialResume?.sectionQuestionIds) return buildMockQuestionsFromIds(config, initialResume.sectionQuestionIds)
    return buildMockQuestions(config)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config])
  const allItems = useMemo(() => runtime.flatMap((r) => r.items), [runtime])

  const [sectionIndex, setSectionIndex] = useState(() => initialResume?.sectionIndex ?? 0)
  const [questionIndex, setQuestionIndex] = useState(() => initialResume?.currentIndex ?? 0)
  const [answers, setAnswers] = useState<Record<string, number>>(() => initialResume?.answers ?? {})
  const [secondsLeft, setSecondsLeft] = useState<number>(
    () => initialResume?.secondsLeft ?? (runtime[0]?.section.minutes ?? 0) * 60,
  )
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
  // Skip the very next auto-reset-on-section-change effect run once, right after a resume.
  const skipSectionResetRef = useRef(!!initialResume)

  const answersRef = useRef(answers)
  useEffect(() => {
    answersRef.current = answers
  }, [answers])

  const sectionIndexRef = useRef(sectionIndex)
  useEffect(() => {
    sectionIndexRef.current = sectionIndex
  }, [sectionIndex])

  useEffect(() => {
    const section = runtime[sectionIndex]
    if (!section) return
    if (skipSectionResetRef.current) {
      skipSectionResetRef.current = false
      return
    }
    setSecondsLeft(section.section.minutes * 60)
    setQuestionIndex(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIndex])

  // Continuously persist progress so a refresh, tab switch, or accidental close
  // can be resumed later via the "Resume Last Test" prompt.
  useEffect(() => {
    if (!config || finishedRef.current || runtime.length === 0) return
    saveResumeState({
      kind: 'mock',
      route: `/mock-tests/${config.id}`,
      label: config.title,
      mockId: config.id,
      sectionIndex,
      secondsLeft,
      started,
      sectionQuestionIds: runtime.map((r) => r.items.map((it) => it.question.id)),
      answers,
      markedForReview: Object.keys(markedForReview).filter((k) => markedForReview[k]),
      currentIndex: questionIndex,
      calculatorOpen,
    })
  }, [config, runtime, sectionIndex, secondsLeft, started, answers, markedForReview, questionIndex, calculatorOpen])

  function finalize() {
    if (finishedRef.current || !config) return
    finishedRef.current = true
    clearResumeState()
    const durationSec = Math.round((Date.now() - started) / 1000)
    const attempt = computeAttempt({
      kind: 'mock',
      label: config.title,
      items: allItems,
      answers: answersRef.current,
      marksCorrect: config.marksCorrect,
      marksWrong: config.marksWrong,
      durationSec,
      sourceRoute: `/mock-tests/${config.id}`,
      mockKind: config.kind,
    })
    saveAttempt(attempt)
    navigate(`/mock-tests/${config.id}/result`, { state: { attempt } })
  }

  function goNextSectionOrFinish() {
    const nextIndex = sectionIndexRef.current + 1
    if (nextIndex < runtime.length) {
      setSectionIndex(nextIndex)
    } else {
      finalize()
    }
  }

  useEffect(() => {
    if (!config || runtime.length === 0) return
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.setTimeout(() => goNextSectionOrFinish(), 0)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIndex, config, runtime.length])

  if (!config) return <Navigate to="/mock-tests" replace />
  if (runtime.length === 0) return null

  const section = runtime[sectionIndex]
  const item = section.items[questionIndex]
  const answeredMask = section.items.map((it) => answers[it.question.id] !== undefined)
  const markedMask = section.items.map((it) => !!markedForReview[it.question.id])
  const isLastSection = sectionIndex === runtime.length - 1
  const isLastQuestion = questionIndex === section.items.length - 1
  const isMarked = !!markedForReview[item.question.id]

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
      <div className="border-b border-border bg-surface sticky top-[65px] z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
              Section {sectionIndex + 1} of {runtime.length}
            </p>
            <p className="font-display font-bold">{section.section.label}</p>
          </div>
          <Timer secondsLeft={secondsLeft} totalSeconds={section.section.minutes * 60} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="grid lg:grid-cols-[1fr_260px] gap-6 items-start">
          <div>
            <QuestionCard
              question={item.question}
              index={questionIndex}
              total={section.items.length}
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
                {!isLastQuestion && (
                  <button
                    onClick={() => setQuestionIndex((q) => Math.min(section.items.length - 1, q + 1))}
                    className="bg-primary text-primary-foreground rounded-lg px-5 py-2 text-sm font-semibold"
                  >
                    Next &rarr;
                  </button>
                )}
                {isLastSection ? (
                  <button
                    onClick={() => {
                      if (window.confirm('Submit the test now? This cannot be undone.')) finalize()
                    }}
                    className="bg-success text-white rounded-lg px-5 py-2 text-sm font-semibold"
                  >
                    Submit Test
                  </button>
                ) : (
                  isLastQuestion && (
                    <button
                      onClick={() => {
                        if (window.confirm('Move to the next section? You cannot return to this section afterwards.')) {
                          goNextSectionOrFinish()
                        }
                      }}
                      className="bg-primary text-primary-foreground rounded-lg px-5 py-2 text-sm font-semibold"
                    >
                      Next Section &rarr;
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <QuestionPalette
              count={section.items.length}
              currentIndex={questionIndex}
              answeredMask={answeredMask}
              markedMask={markedMask}
              onJump={setQuestionIndex}
            />
            {!isLastSection && (
              <button
                onClick={() => {
                  if (window.confirm('Move to the next section? You cannot return to this section afterwards.')) {
                    goNextSectionOrFinish()
                  }
                }}
                className="text-sm font-medium text-muted-foreground hover:text-primary border border-border rounded-lg px-4 py-2.5"
              >
                Skip to next section &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
      <FloatingCalculator initialOpen={calculatorOpen} onOpenChange={setCalculatorOpen} />
    </div>
  )
}
