import type { AttemptRecord, SubjectSlug } from '../types'
import { pooledAllSubjectsQuestions, shuffle, type QuizQuestionItem } from './quizEngine'

export interface WeakTopic {
  subject: SubjectSlug
  subjectName: string
  topic: string
  accuracy: number
  total: number
}

/** Topics with the lowest accuracy across attempt history (min sample size to avoid noise). */
export function getWeakTopics(attempts: AttemptRecord[], minSample = 2): WeakTopic[] {
  const map = new Map<string, { subject: SubjectSlug; subjectName: string; topic: string; correct: number; total: number }>()
  for (const attempt of attempts) {
    for (const ans of attempt.answers) {
      if (ans.isCorrect === null) continue
      const key = `${ans.subject}::${ans.topic}`
      const entry = map.get(key) ?? { subject: ans.subject, subjectName: ans.subjectName, topic: ans.topic, correct: 0, total: 0 }
      entry.total++
      if (ans.isCorrect) entry.correct++
      map.set(key, entry)
    }
  }
  return [...map.values()]
    .filter((t) => t.total >= minSample)
    .map((t) => ({ subject: t.subject, subjectName: t.subjectName, topic: t.topic, accuracy: Math.round((t.correct / t.total) * 100), total: t.total }))
    .sort((a, b) => a.accuracy - b.accuracy)
}

/**
 * AI-style Smart Revision: builds a test weighted toward weak topics (from
 * attempt history) and previously-wrong questions, backfilling with a
 * general pool if there isn't enough weak-topic material yet.
 */
export function buildSmartRevisionQuiz(attempts: AttemptRecord[], count: 20 | 50 | 100): QuizQuestionItem[] {
  const weakTopics = new Set(getWeakTopics(attempts).slice(0, 6).map((t) => `${t.subject}::${t.topic}`))
  const wrongQuestionIds = new Set(
    attempts.flatMap((a) => a.answers.filter((ans) => ans.isCorrect === false).map((ans) => ans.questionId)),
  )

  const allItems = pooledAllSubjectsQuestions()
  const priority: QuizQuestionItem[] = []
  const rest: QuizQuestionItem[] = []

  for (const item of allItems) {
    const key = `${item.subject}::${item.topic}`
    if (wrongQuestionIds.has(item.question.id) || weakTopics.has(key)) priority.push(item)
    else rest.push(item)
  }

  const combined = [...shuffle(priority), ...shuffle(rest)]
  return combined.slice(0, Math.min(count, combined.length))
}
