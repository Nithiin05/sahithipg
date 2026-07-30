import { getAttempts } from './attempts'
import type { AnswerRecord } from '../types'

export interface MistakeEntry extends AnswerRecord {
  date: string
}

/**
 * The Wrong Answers Notebook is derived entirely from attempt history — no
 * separate storage needed. For every question ever answered, we look at the
 * *most recent* attempt that included it (getAttempts() already returns
 * newest-first): if that latest attempt got it wrong, it's a live mistake;
 * if the user has since answered it correctly (e.g. via "Reattempt" from the
 * notebook), it naturally drops off the list.
 */
export function getMistakes(): MistakeEntry[] {
  const attempts = getAttempts()
  const latestByQuestion = new Map<string, MistakeEntry>()

  for (const attempt of attempts) {
    for (const ans of attempt.answers) {
      if (ans.isCorrect === null) continue
      if (!latestByQuestion.has(ans.questionId)) {
        latestByQuestion.set(ans.questionId, { ...ans, date: attempt.date })
      }
    }
  }

  return [...latestByQuestion.values()]
    .filter((a) => a.isCorrect === false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
