import type { AnswerRecord, AttemptRecord } from '../types'
import type { QuizQuestionItem } from './quizEngine'
import { newAttemptId } from './attempts'

export function computeAttempt(params: {
  kind: AttemptRecord['kind']
  label: string
  items: QuizQuestionItem[]
  answers: Record<string, number | undefined>
  marksCorrect: number
  marksWrong: number
  durationSec: number
  sourceRoute?: string
  mockKind?: AttemptRecord['mockKind']
  grandTestId?: string
  /** Per-question time spent, keyed by question id — enables speed vs. accuracy analytics. */
  timeSpent?: Record<string, number | undefined>
  /** Questions marked for review at submission. */
  marked?: Record<string, boolean | undefined>
  testId?: string
  testVersion?: number
  /** false = an answered question still marked for review is scored 0 (AIIMS rule). Default true. */
  markedForReviewEvaluated?: boolean
}): AttemptRecord {
  const { kind, label, items, answers, marksCorrect, marksWrong, durationSec, sourceRoute, mockKind, grandTestId, timeSpent, marked, testId, testVersion } = params
  const evaluateMarked = params.markedForReviewEvaluated ?? true
  let correct = 0
  let wrong = 0
  let skipped = 0

  const answerList: AnswerRecord[] = items.map((item) => {
    const selected = answers[item.question.id]
    const timeSpentSec = timeSpent?.[item.question.id]
    const isMarked = !!marked?.[item.question.id]
    const notEvaluated = !evaluateMarked && isMarked && selected !== undefined && selected !== null
    if (selected === undefined || selected === null || notEvaluated) {
      skipped++
      return {
        questionId: item.question.id,
        subject: item.subject,
        subjectName: item.subjectName,
        topic: item.topic,
        selectedIndex: notEvaluated ? selected : null,
        correctIndex: item.question.correctIndex,
        isCorrect: null,
        timeSpentSec,
        marked: isMarked,
        ...(notEvaluated ? { notEvaluated: true } : {}),
      }
    }
    const isCorrect = selected === item.question.correctIndex
    if (isCorrect) correct++
    else wrong++
    return {
      questionId: item.question.id,
      subject: item.subject,
      subjectName: item.subjectName,
      topic: item.topic,
      selectedIndex: selected,
      correctIndex: item.question.correctIndex,
      isCorrect,
      timeSpentSec,
      marked: isMarked,
    }
  })

  // Round to 2 dp only for display; −⅓ per wrong answer accumulates exactly before rounding.
  const score = Math.round((correct * marksCorrect - wrong * marksWrong) * 100) / 100
  const maxScore = items.length * marksCorrect

  return {
    id: newAttemptId(),
    kind,
    label,
    date: new Date().toISOString(),
    durationSec,
    totalQuestions: items.length,
    attempted: correct + wrong,
    correct,
    wrong,
    skipped,
    score,
    maxScore,
    answers: answerList,
    sourceRoute,
    mockKind,
    grandTestId,
    testId,
    testVersion,
    marksCorrect,
    marksWrong,
  }
}
