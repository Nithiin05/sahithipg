import type { Difficulty, Question, SubjectSlug } from '../types'
import { getSubject, subjects } from '../data/subjects'
import type { MockSection, MockTestConfig } from '../data/mockTests'
import { questionDifficulty } from './difficulty'
import { sourceTypeOf } from './questionSource'
import type { SourceType } from '../types'

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

/** Pool every question across every subject (optionally restricted to a subset) — powers Grand/Mixed tests. */
export function pooledAllSubjectsQuestions(subjectSlugs?: SubjectSlug[]): QuizQuestionItem[] {
  const scope = subjectSlugs && subjectSlugs.length > 0 ? subjects.filter((s) => subjectSlugs.includes(s.slug)) : subjects
  const pool: QuizQuestionItem[] = []
  for (const subject of scope) {
    for (const topic of subject.topics) {
      for (const question of topic.questions) {
        pool.push({ question, subject: subject.slug, subjectName: subject.shortName, topic: topic.name })
      }
    }
  }
  return pool
}

// ---------------------------------------------------------------------------
// Difficulty-tiered practice — Easy / Medium / Hard / Expert sets, pooled
// across every topic in a subject. Set membership is stable (sorted by
// question id before chunking) so "Set 1" always means the same underlying
// questions; the order they're presented in is freshly shuffled on every
// attempt.
// ---------------------------------------------------------------------------

export const DIFFICULTY_SET_SIZE = 6

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
  const count = pooledDifficultyQuestions(subjectSlug, difficulty).length
  return count === 0 ? 0 : Math.ceil(count / DIFFICULTY_SET_SIZE)
}

/** Build one (shuffled-for-play) set of questions for subject + difficulty + 1-based set number. */
export function buildDifficultyQuiz(subjectSlug: SubjectSlug, difficulty: Difficulty, setNumber: number): QuizQuestionItem[] {
  const pool = pooledDifficultyQuestions(subjectSlug, difficulty)
  const start = (setNumber - 1) * DIFFICULTY_SET_SIZE
  const chunk = pool.slice(start, start + DIFFICULTY_SET_SIZE)
  return shuffle(chunk)
}

// ---------------------------------------------------------------------------
// Source-based pools. Verified PYQs (sourceType 'PYQ' with a named paper) and
// PYQ-pattern questions (original, modelled on historical concepts) are kept
// strictly separate — see src/lib/questionSource.ts.
// ---------------------------------------------------------------------------

export function pooledBySource(source: SourceType, subjectSlug?: SubjectSlug): QuizQuestionItem[] {
  const pool = subjectSlug ? pooledSubjectQuestions(subjectSlug) : pooledAllSubjectsQuestions()
  return pool.filter((it) => sourceTypeOf(it.question) === source).sort((a, b) => a.question.id.localeCompare(b.question.id))
}

/** Verified PYQs plus PYQ-pattern questions, optionally for one year. */
export function pooledPYQQuestions(subjectSlug?: SubjectSlug, year?: number): QuizQuestionItem[] {
  return [...pooledBySource('PYQ', subjectSlug), ...pooledBySource('PYQ_PATTERN', subjectSlug)].filter(
    (it) => year === undefined || it.question.year === year,
  )
}

/** Years that have verified or pattern questions tagged with a year. */
export function pyqYears(): number[] {
  const years = new Set<number>()
  for (const it of pooledPYQQuestions()) if (it.question.year) years.add(it.question.year)
  return [...years].sort((a, b) => b - a)
}

export interface MockSectionRuntime {
  section: MockSection
  items: QuizQuestionItem[]
}

function sectionPool(section: MockSection): QuizQuestionItem[] {
  if (section.subject && section.topicId) return buildTopicQuiz(section.subject, section.topicId)
  if (section.subject) return pooledSubjectQuestions(section.subject)
  return pooledAllSubjectsQuestions()
}

/** Build randomized, non-repeating question sets for every section of a mock/grand test. */
export function buildMockQuestions(config: MockTestConfig): MockSectionRuntime[] {
  return config.sections.map((section) => {
    const pool = shuffle(sectionPool(section))
    const items = pool.slice(0, Math.min(section.questionCount, pool.length))
    return { section, items }
  })
}

/** Look up a single question (with its subject/topic context) by id, searching every subject. */
export function findQuestionItem(questionId: string): QuizQuestionItem | null {
  for (const subject of subjects) {
    for (const topic of subject.topics) {
      const question = topic.questions.find((q) => q.id === questionId)
      if (question) return { question, subject: subject.slug, subjectName: subject.shortName, topic: topic.name }
    }
  }
  return null
}

/**
 * Rebuild the exact same mock/grand-test question set from a previously-saved
 * list of question ids (one array per section) — used to resume a test after
 * a refresh without re-rolling a fresh random question set.
 */
export function buildMockQuestionsFromIds(config: MockTestConfig, sectionQuestionIds: string[][]): MockSectionRuntime[] {
  return config.sections.map((section, i) => {
    const ids = sectionQuestionIds[i] ?? []
    const items = ids.map((id) => findQuestionItem(id)).filter((it): it is QuizQuestionItem => it !== null)
    return { section, items }
  })
}
