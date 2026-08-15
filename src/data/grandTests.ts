import type { MockSection, MockTestConfig } from './mockTests'
import { pooledAllSubjectsQuestions } from '../lib/quizEngine'

/**
 * Grand Tests simulate the full NEET PG exam experience: up to 200 questions
 * pooled across every subject, a single 3.5-hour timer, a full question
 * palette with "Mark for Review", and a detailed post-test analysis
 * (percentile/rank estimate, subject-wise breakdown, weak areas).
 *
 * NEET PG itself has NO negative marking (+1 per correct, 0 for wrong or
 * unattempted) — reflected here for accuracy.
 */

export interface GrandTestConfig extends MockTestConfig {
  durationMinutes: number
}

const GRAND_TEST_COUNT = 150
const QUESTIONS_PER_TEST = 200
const DURATION_MINUTES = 210 // 3.5 hours

function grandTestSection(n: number): MockSection {
  const poolSize = pooledAllSubjectsQuestions().length
  return {
    id: `sec-grand-${n}`,
    label: 'Full Syllabus (All Subjects)',
    questionCount: Math.min(QUESTIONS_PER_TEST, poolSize),
    minutes: DURATION_MINUTES,
  }
}

export const grandTests: GrandTestConfig[] = Array.from({ length: GRAND_TEST_COUNT }, (_, idx) => {
  const n = idx + 1
  return {
    id: `grand-${n}`,
    title: `NEET PG Grand Test ${n}`,
    kind: 'mixed' as const,
    description:
      'A full-length, exam-simulation Grand Test: up to 200 questions pooled across all 19 subjects, one continuous 3.5-hour timer, question palette with "Mark for Review", and a detailed performance report with an estimated national percentile and predicted rank.',
    marksCorrect: 4,
    marksWrong: 1,
    durationMinutes: DURATION_MINUTES,
    sections: [grandTestSection(n)],
  }
})

export function getGrandTest(id: string) {
  return grandTests.find((g) => g.id === id)
}

export function grandTestTotals(config: GrandTestConfig) {
  const totalQuestions = config.sections.reduce((s, sec) => s + sec.questionCount, 0)
  const maxScore = totalQuestions * config.marksCorrect
  return { totalQuestions, totalMinutes: config.durationMinutes, maxScore }
}
