import type { AnswerRecord, AttemptRecord } from '../types'
import type { QuizQuestionItem } from './quizEngine'
import { newAttemptId } from './attempts'

export function computeAttempt(params: {
  kind: 'practice' | 'mock'
  label: string
  items: QuizQuestionItem[]
  answers: Record<string, number | undefined>
  marksCorrect: number
  marksWrong: number
  durationSec: number
  sourceRoute?: string
  mockKind?: AttemptRecord['mockKind']
}): AttemptRecord {
  const { kind, label, items, answers, marksCorrect, marksWrong, durationSec, sourceRoute, mockKind } = params
  let correct = 0
  let wrong = 0
  let skipped = 0

  const answerList: AnswerRecord[] = items.map((item) => {
    const selected = answers[item.question.id]
    if (selected === undefined || selected === null) {
      skipped++
      return {
        questionId: item.question.id,
        subject: item.subject,
        subjectName: item.subjectName,
        topic: item.topic,
        selectedIndex: null,
        correctIndex: item.question.correctIndex,
        isCorrect: null,
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
    }
  })

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
    marksCorrect,
    marksWrong,
  }
}
