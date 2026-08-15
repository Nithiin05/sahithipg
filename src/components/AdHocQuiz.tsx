import { useState } from 'react'
import QuestionCard from './QuestionCard'
import QuestionPalette from './QuestionPalette'
import ProgressBar from './ProgressBar'
import PageHeader from './PageHeader'
import FloatingCalculator from './FloatingCalculator'
import { computeAttempt } from '../lib/scoring'
import { saveAttempt } from '../lib/attempts'
import type { QuizQuestionItem } from '../lib/quizEngine'
import type { AttemptRecord } from '../types'

/**
 * A small, self-contained quiz runner for arbitrary, ad-hoc question lists —
 * used to reattempt bookmarked questions or Mistake Notebook entries. Doesn't
 * do resume-on-refresh (these sessions are short and derived, not a "test").
 */
export default function AdHocQuiz({
  items,
  label,
  onExit,
  onComplete,
}: {
  items: QuizQuestionItem[]
  label: string
  onExit: () => void
  /** Fired right after the attempt is scored & saved, before the result screen renders. */
  onComplete?: (attempt: AttemptRecord) => void
}) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [startTime] = useState(() => Date.now())
  const [result, setResult] = useState<AttemptRecord | null>(null)

  if (items.length === 0) return null

  const currentItem = items[current]
  const answeredMask = items.map((it) => answers[it.question.id] !== undefined)
  const answeredCount = answeredMask.filter(Boolean).length

  const select = (i: number) => {
    if (result) return
    setAnswers((prev) => ({ ...prev, [currentItem.question.id]: i }))
  }

  const submit = () => {
    const durationSec = Math.round((Date.now() - startTime) / 1000)
    const attempt = computeAttempt({
      kind: 'practice',
      label,
      items,
      answers,
      marksCorrect: 4,
      marksWrong: 1,
      durationSec,
    })
    saveAttempt(attempt)
    onComplete?.(attempt)
    setResult(attempt)
  }

  if (result) {
    const accuracy = result.attempted > 0 ? Math.round((result.correct / result.attempted) * 100) : 0
    return (
      <div>
        <PageHeader
          eyebrow={label}
          title="Results"
          actions={
            <button onClick={onExit} className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold">
              Done
            </button>
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
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        eyebrow={label}
        title="Reattempt"
        description={`${items.length} questions · untimed`}
        actions={
          <div className="flex gap-2">
            <button onClick={onExit} className="border border-border rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary">
              Exit
            </button>
            <button onClick={submit} className="bg-primary text-primary-foreground rounded-lg px-5 py-2.5 text-sm font-semibold hover:opacity-90">
              Submit
            </button>
          </div>
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
                <button
                  onClick={() => setCurrent((c) => Math.min(items.length - 1, c + 1))}
                  className="bg-primary text-primary-foreground rounded-lg px-5 py-2 text-sm font-semibold"
                >
                  Next &rarr;
                </button>
              ) : (
                <button onClick={submit} className="bg-primary text-primary-foreground rounded-lg px-5 py-2 text-sm font-semibold">
                  Submit
                </button>
              )}
            </div>
          </div>
          <QuestionPalette count={items.length} currentIndex={current} answeredMask={answeredMask} onJump={setCurrent} />
        </div>
      </div>
      <FloatingCalculator />
    </div>
  )
}
