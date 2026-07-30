import type { Difficulty, Question, SubjectSlug } from '../types'
import { getSubject } from '../data/subjects'
import type { MockSection, MockTestConfig } from '../data/mockTests'
import { questionDifficulty } from './difficulty'

export interface QuizQuestionItem {
  question: Question
  subject: SubjectSlug
  subjectName: string
  topic: string
}

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/** Build a shuffled quiz for a single topic within a subject. */
export function buildTopicQuiz(subjectSlug: SubjectSlug, topicId: string): QuizQuestionItem[] {
  const subject = getSubject(subjectSlug)
  const topic = subject?.topics.find((t) => t.id === topicId)
  if (!subject || !topic) return []
  return shuffle(topic.questions).map((question) => ({
    question,
    subject: subject.slug,
    subjectName: subject.shortName,
    topic: topic.name,
  }))
}

/** Pool every question for a subject across all its topics, tagged with topic name. */
export function pooledSubjectQuestions(subjectSlug: SubjectSlug): QuizQuestionItem[] {
  const subject = getSubject(subjectSlug)
  if (!subject) return []
  const pool: QuizQuestionItem[] = []
  for (const topic of subject.topics) {
    for (const question of topic.questions) {
      pool.push({ question, subject: subject.slug, subjectName: subject.shortName, topic: topic.name })
    }
  }
  return pool
}

// ---------------------------------------------------------------------------
// Difficulty-tiered practice — Easy / Medium / Hard sets, pooled across every
// topic in a subject. Set membership is stable (sorted by question id before
// chunking) so "Set 1" always means the same underlying questions; the order
// they're presented in is freshly shuffled on every attempt.
// ---------------------------------------------------------------------------

export const DIFFICULTY_SET_SIZE = 12

export function pooledDifficultyQuestions(subjectSlug: SubjectSlug, difficulty: Difficulty): QuizQuestionItem[] {
  const subject = getSubject(subjectSlug)
  if (!subject) return []
  const pool: QuizQuestionItem[] = []
  for (const topic of subject.topics) {
    for (const question of topic.questions) {
      if (questionDifficulty(question) === difficulty) {
        pool.push({ question, subject: subject.slug, subjectName: subject.shortName, topic: topic.name })
      }
    }
  }
  return pool.sort((a, b) => a.question.id.localeCompare(b.question.id))
}

export function difficultySetCount(subjectSlug: SubjectSlug, difficulty: Difficulty): number {
  return Math.ceil(pooledDifficultyQuestions(subjectSlug, difficulty).length / DIFFICULTY_SET_SIZE)
}

/** Build one (shuffled-for-play) set of questions for subject + difficulty + 1-based set number. */
export function buildDifficultyQuiz(subjectSlug: SubjectSlug, difficulty: Difficulty, setNumber: number): QuizQuestionItem[] {
  const pool = pooledDifficultyQuestions(subjectSlug, difficulty)
  const start = (setNumber - 1) * DIFFICULTY_SET_SIZE
  const chunk = pool.slice(start, start + DIFFICULTY_SET_SIZE)
  return shuffle(chunk)
}

// ---------------------------------------------------------------------------
// Previous-year-tagged practice — pools every question marked isPreviousYear
// across a subject, same stable-set-then-shuffle approach as difficulty pools.
// ---------------------------------------------------------------------------

export function pooledPreviousYearQuestions(subjectSlug: SubjectSlug): QuizQuestionItem[] {
  const subject = getSubject(subjectSlug)
  if (!subject) return []
  const pool: QuizQuestionItem[] = []
  for (const topic of subject.topics) {
    for (const question of topic.questions) {
      if (question.isPreviousYear) {
        pool.push({ question, subject: subject.slug, subjectName: subject.shortName, topic: topic.name })
      }
    }
  }
  return pool.sort((a, b) => a.question.id.localeCompare(b.question.id))
}

export function previousYearSetCount(subjectSlug: SubjectSlug): number {
  return Math.ceil(pooledPreviousYearQuestions(subjectSlug).length / DIFFICULTY_SET_SIZE)
}

export function buildPreviousYearQuiz(subjectSlug: SubjectSlug, setNumber: number): QuizQuestionItem[] {
  const pool = pooledPreviousYearQuestions(subjectSlug)
  const start = (setNumber - 1) * DIFFICULTY_SET_SIZE
  const chunk = pool.slice(start, start + DIFFICULTY_SET_SIZE)
  return shuffle(chunk)
}

export interface MockSectionRuntime {
  section: MockSection
  items: QuizQuestionItem[]
}

/** Build randomized, non-repeating question sets for every section of a mock test. */
export function buildMockQuestions(config: MockTestConfig): MockSectionRuntime[] {
  return config.sections.map((section) => {
    const pool = section.topicId
      ? shuffle(buildTopicQuiz(section.subject, section.topicId))
      : shuffle(pooledSubjectQuestions(section.subject))
    const items = pool.slice(0, Math.min(section.questionCount, pool.length))
    return { section, items }
  })
}

/** Look up a single question (with its subject/topic context) by id, anywhere in a subject. */
export function findQuestionItem(subjectSlug: SubjectSlug, questionId: string): QuizQuestionItem | null {
  const subject = getSubject(subjectSlug)
  if (!subject) return null
  for (const topic of subject.topics) {
    const question = topic.questions.find((q) => q.id === questionId)
    if (question) return { question, subject: subject.slug, subjectName: subject.shortName, topic: topic.name }
  }
  return null
}

/**
 * Rebuild the exact same mock-test question set from a previously-saved list
 * of question ids (one array per section) — used to resume a test after a
 * refresh without re-rolling a fresh random question set.
 */
export function buildMockQuestionsFromIds(config: MockTestConfig, sectionQuestionIds: string[][]): MockSectionRuntime[] {
  return config.sections.map((section, i) => {
    const ids = sectionQuestionIds[i] ?? []
    const items = ids
      .map((id) => findQuestionItem(section.subject, id))
      .filter((it): it is QuizQuestionItem => it !== null)
    return { section, items }
  })
}
