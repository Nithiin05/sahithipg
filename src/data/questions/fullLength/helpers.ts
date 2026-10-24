import type { Question, SubjectSlug } from '../../../types'

/**
 * Test-reserved questions.
 *
 * Questions written for a specific full-length test live here instead of in
 * the subject files, so they do not appear in the Question Bank, topic
 * quizzes, search or custom tests before a student sits the test. After the
 * test, review, bookmarks and revision find them through findQuestionItem().
 */
export interface ReservedEntry {
  subject: SubjectSlug
  /** An existing topic id of that subject (keeps topic-wise analytics consistent). */
  topicId: string
  question: Question
}

/**
 * Authoring helper. `options[0]` is ALWAYS the correct answer when authoring;
 * the displayed order is randomised per question (src/lib/optionShuffle.ts).
 */
export function r(
  subject: SubjectSlug,
  topicId: string,
  id: string,
  text: string,
  options: [string, string, string, string],
  explanation: string,
  meta: Omit<Question, 'id' | 'text' | 'options' | 'correctIndex' | 'explanation'>,
): ReservedEntry {
  return {
    subject,
    topicId,
    question: { id, text, options, correctIndex: 0, explanation, reviewStatus: 'author-checked', lastReviewed: '2026-10-24', ...meta },
  }
}
