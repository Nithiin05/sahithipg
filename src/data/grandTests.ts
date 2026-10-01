import type { MockSection, MockTestConfig } from './mockTests'
import { pooledAllSubjectsQuestions } from '../lib/quizEngine'
import { examConfig } from '../config/examConfig'

/**
 * Grand Tests simulate the full INI-CET paper. Question count, duration and
 * marking all come from src/config/examConfig.ts.
 */

export interface GrandTestConfig extends MockTestConfig {
  durationMinutes: number
}

const GRAND_TEST_COUNT = 150
const QUESTIONS_PER_TEST = examConfig.totalQuestions
const DURATION_MINUTES = examConfig.durationMinutes

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
    title: `INI-CET Grand Test ${n}`,
    kind: 'mixed' as const,
    description:
      `A full-length INI-CET simulation: up to ${QUESTIONS_PER_TEST} questions across all 19 subjects, one ${DURATION_MINUTES}-minute timer, question palette with "Mark for Review", and a subject-wise performance report.`,
    marksCorrect: examConfig.marking.correct,
    marksWrong: examConfig.marking.wrong,
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
