import type { SubjectSlug } from '../types'
import { subjects } from './subjects'
import { pyqYears, pooledPYQQuestions } from '../lib/quizEngine'

export interface MockSection {
  id: string
  label: string
  /** Omit for mixed/rapid-revision sections that pool across every subject. */
  subject?: SubjectSlug
  /** Restrict pooling to a single topic within the subject (used for topic-wise tests). */
  topicId?: string
  questionCount: number
  minutes: number
}

export type MockTestKind = 'subject' | 'topic' | 'rapid-revision' | 'mixed' | 'pyq' | 'daily-challenge' | 'smart-revision'

export interface MockTestConfig {
  id: string
  title: string
  kind: MockTestKind
  /** Which subject this test belongs to — only set for 'subject' and 'topic' kinds. */
  subjectSlug?: SubjectSlug
  /** Which topic this test belongs to — only set for 'topic' kind. */
  topicId?: string
  /** PYQ-style metadata, only set when kind === 'pyq'. */
  year?: number
  description: string
  marksCorrect: number
  marksWrong: number
  sections: MockSection[]
}

/**
 * NEET PG itself carries NO negative marking (+1 per correct answer, 0 for
 * wrong/unattempted) — unlike SSC/INI-CET style exams. Every test on this
 * platform reflects that real marking scheme for accuracy.
 */
const MARKS_CORRECT = 4
const MARKS_WRONG = 1

// ---------------------------------------------------------------------------
// Subject Tests — full-syllabus, single-subject, timed tests.
// ---------------------------------------------------------------------------

function buildSubjectTests(setsPerSubject: number): MockTestConfig[] {
  const out: MockTestConfig[] = []
  for (const subject of subjects) {
    const pool = subject.topics.reduce((s, t) => s + t.questions.length, 0)
    const questionCount = Math.min(15, pool)
    if (questionCount === 0) continue
    for (let i = 1; i <= setsPerSubject; i++) {
      out.push({
        id: `subject-${subject.slug}-${i}`,
        title: `${subject.name} — Subject Test ${i}`,
        kind: 'subject',
        subjectSlug: subject.slug,
        description: `A ${questionCount}-question, full-syllabus subject test for ${subject.name} — set ${i} of ${setsPerSubject}. Freshly shuffled from the ${subject.shortName} question bank on every attempt.`,
        marksCorrect: MARKS_CORRECT,
        marksWrong: MARKS_WRONG,
        sections: [
          { id: `sec-${subject.slug}`, label: subject.name, subject: subject.slug, questionCount, minutes: Math.max(15, questionCount) },
        ],
      })
    }
  }
  return out
}

// ---------------------------------------------------------------------------
// Topic Tests — every topic across every subject, chopped into multiple
// timed, scored sets so students never run out of focused drills.
// ---------------------------------------------------------------------------

function buildTopicTests(setsPerTopic: number): MockTestConfig[] {
  const out: MockTestConfig[] = []
  for (const subject of subjects) {
    for (const topic of subject.topics) {
      const questionCount = Math.min(6, topic.questions.length)
      if (questionCount === 0) continue
      const minutes = Math.max(8, questionCount * 1.5)
      for (let i = 1; i <= setsPerTopic; i++) {
        out.push({
          id: `topic-${subject.slug}-${topic.id}-${i}`,
          title: `${topic.name} — Practice Set ${i}`,
          kind: 'topic',
          subjectSlug: subject.slug,
          topicId: topic.id,
          description: `${questionCount}-question topic-wise practice set for ${topic.name} (${subject.name}) — set ${i} of ${setsPerTopic}.`,
          marksCorrect: MARKS_CORRECT,
          marksWrong: MARKS_WRONG,
          sections: [
            { id: `sec-${topic.id}`, label: topic.name, subject: subject.slug, topicId: topic.id, questionCount, minutes },
          ],
        })
      }
    }
  }
  return out
}

// ---------------------------------------------------------------------------
// Rapid Revision Tests — quick, high-yield, subject-agnostic sprints.
// ---------------------------------------------------------------------------

function buildRapidRevisionTests(count: number): MockTestConfig[] {
  return Array.from({ length: count }, (_, idx) => {
    const n = idx + 1
    const questionCount = 10
    return {
      id: `rapid-${n}`,
      title: `Rapid Revision — Set ${n}`,
      kind: 'rapid-revision' as const,
      description: `A quick ${questionCount}-question sprint pooled across all 19 subjects — perfect for a short revision burst between study blocks.`,
      marksCorrect: MARKS_CORRECT,
      marksWrong: MARKS_WRONG,
      sections: [{ id: `sec-rapid-${n}`, label: 'Rapid Revision', questionCount, minutes: 10 }],
    }
  })
}

// ---------------------------------------------------------------------------
// Mixed Tests — 50 / 100 / 200 question tests pooled across every subject,
// mirroring the size options students expect from a real prep platform.
// ---------------------------------------------------------------------------

function buildMixedTests(sizes: number[], perSize: number): MockTestConfig[] {
  const out: MockTestConfig[] = []
  for (const size of sizes) {
    for (let i = 1; i <= perSize; i++) {
      out.push({
        id: `mixed-${size}-${i}`,
        title: `Mixed Test — ${size} Questions (Set ${i})`,
        kind: 'mixed',
        description: `A ${size}-question test pooled across all subjects and categories, at the same +4/-1 marking scheme as NEET PG — set ${i} of ${perSize}.`,
        marksCorrect: MARKS_CORRECT,
        marksWrong: MARKS_WRONG,
        sections: [{ id: `sec-mixed-${size}-${i}`, label: 'Mixed (All Subjects)', questionCount: size, minutes: size }],
      })
    }
  }
  return out
}

// ---------------------------------------------------------------------------
// PYQ-style tests, grouped by year. These are ORIGINAL practice questions
// written in the pattern/style reported for that year — never a reproduction
// of an official paper. Only years with authored content appear here; the
// PYQs page still lists every year so students can see what's coming.
// ---------------------------------------------------------------------------

function buildPYQTests(): MockTestConfig[] {
  return pyqYears().map((year) => {
    const count = pooledPYQQuestions(undefined, year).length
    return {
      id: `pyq-${year}`,
      title: `NEET PG ${year} — PYQ-Style Practice`,
      kind: 'pyq' as const,
      year,
      description: `${count} original, pattern-based practice questions written in the structure/style reported for ${year} — not a reproduction of any official paper.`,
      marksCorrect: MARKS_CORRECT,
      marksWrong: MARKS_WRONG,
      sections: [{ id: `sec-pyq-${year}`, label: `PYQ Style — ${year}`, questionCount: count, minutes: Math.max(10, count) }],
    }
  })
}

export const mockTests: MockTestConfig[] = [
  ...buildSubjectTests(3),
  ...buildTopicTests(3),
  ...buildRapidRevisionTests(15),
  ...buildMixedTests([50, 100, 200], 3),
  ...buildPYQTests(),
]

export function getMockTest(id: string) {
  return mockTests.find((m) => m.id === id)
}

export function mockTotals(config: MockTestConfig) {
  const totalQuestions = config.sections.reduce((s, sec) => s + sec.questionCount, 0)
  const totalMinutes = config.sections.reduce((s, sec) => s + sec.minutes, 0)
  const maxScore = totalQuestions * config.marksCorrect
  return { totalQuestions, totalMinutes, maxScore }
}
