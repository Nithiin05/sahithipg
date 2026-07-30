import type { SubjectSlug } from '../types'
import { subjects } from './subjects'

export interface MockSection {
  id: string
  label: string
  subject: SubjectSlug
  /** Restrict pooling to a single topic within the subject (used for sectional/topic-wise tests). */
  topicId?: string
  questionCount: number
  minutes: number
}

export type MockTestKind = 'full' | 'sectional' | 'topic' | 'previous-year'

export interface MockTestConfig {
  id: string
  title: string
  tier: 'Tier-I' | 'Tier-II'
  /** Defaults to 'full' when omitted, for backwards compatibility. */
  kind?: MockTestKind
  /** Which subject this test belongs to — only set for 'sectional' and 'topic' kinds. */
  subjectSlug?: SubjectSlug
  /** Which topic this test belongs to — only set for 'topic' kind. */
  topicId?: string
  /** Previous-year-pattern metadata, only set when kind === 'previous-year'. */
  year?: number
  shift?: string
  session?: string
  description: string
  marksCorrect: number
  marksWrong: number
  sections: MockSection[]
}

// ---------------------------------------------------------------------------
// Full-length mocks — SSC CGL's published Tier-I / Tier-II structure, timing,
// and marking scheme. Every mock draws a fresh, non-repeating, shuffled
// question set from the subject pools each time it's attempted.
// ---------------------------------------------------------------------------

function tier1Sections(): MockSection[] {
  return [
    { id: 'sec-reasoning', label: 'General Intelligence & Reasoning', subject: 'reasoning', questionCount: 25, minutes: 15 },
    { id: 'sec-quant', label: 'Quantitative Aptitude', subject: 'quant', questionCount: 25, minutes: 15 },
    { id: 'sec-english', label: 'English Comprehension', subject: 'english', questionCount: 25, minutes: 15 },
    { id: 'sec-ga', label: 'General Awareness', subject: 'general-awareness', questionCount: 25, minutes: 15 },
  ]
}

function tier2Sections(): MockSection[] {
  return [
    { id: 'sec-quant', label: 'Module-I: Mathematical Abilities', subject: 'quant', questionCount: 30, minutes: 45 },
    { id: 'sec-reasoning', label: 'Module-II: Reasoning & General Intelligence', subject: 'reasoning', questionCount: 30, minutes: 45 },
    { id: 'sec-english', label: 'Module-I: English Language & Comprehension', subject: 'english', questionCount: 45, minutes: 45 },
    { id: 'sec-ga', label: 'Module-II: General Awareness', subject: 'general-awareness', questionCount: 25, minutes: 20 },
  ]
}

function buildFullMocks(tier: 'Tier-I' | 'Tier-II', count: number): MockTestConfig[] {
  const isT1 = tier === 'Tier-I'
  return Array.from({ length: count }, (_, idx) => {
    const n = idx + 1
    return {
      id: `${isT1 ? 'tier1' : 'tier2'}-full-${n}`,
      title: `SSC CGL ${tier} Full Mock ${n}`,
      tier,
      kind: 'full' as const,
      description: isT1
        ? '100 questions across 4 sections, 25 each, with an independent 15-minute timer per section that locks automatically — matching the real Tier-I pattern. A fresh, randomly-assembled set every attempt.'
        : '130 scored questions across 4 modules, each with its own timer, using the higher-stakes Tier-II marking scheme (+3 / −1). A fresh, randomly-assembled set every attempt.',
      marksCorrect: isT1 ? 2 : 3,
      marksWrong: isT1 ? 0.5 : 1,
      sections: isT1 ? tier1Sections() : tier2Sections(),
    }
  })
}

// ---------------------------------------------------------------------------
// Sectional tests — one subject at a time, full syllabus, exam-style timing.
// ---------------------------------------------------------------------------

function buildSectionalTests(perSubject: number): MockTestConfig[] {
  const out: MockTestConfig[] = []
  for (const subject of subjects) {
    for (let i = 1; i <= perSubject; i++) {
      out.push({
        id: `sectional-${subject.slug}-${i}`,
        title: `${subject.name} Sectional Test ${i}`,
        tier: 'Tier-I',
        kind: 'sectional',
        subjectSlug: subject.slug,
        description: `A standalone, timed sectional test covering the full ${subject.name} syllabus — set ${i} of ${perSubject}.`,
        marksCorrect: 2,
        marksWrong: 0.5,
        sections: [{ id: `sec-${subject.slug}`, label: subject.name, subject: subject.slug, questionCount: 25, minutes: 15 }],
      })
    }
  }
  return out
}

// ---------------------------------------------------------------------------
// Topic-wise practice tests — every topic across every subject, chopped into
// multiple timed, scored sets so users never run out of drills for a topic.
// ---------------------------------------------------------------------------

function buildTopicTests(setsPerTopic: number): MockTestConfig[] {
  const out: MockTestConfig[] = []
  for (const subject of subjects) {
    for (const topic of subject.topics) {
      const questionCount = Math.min(15, topic.questions.length)
      const minutes = Math.max(10, questionCount)
      for (let i = 1; i <= setsPerTopic; i++) {
        out.push({
          id: `topic-${subject.slug}-${topic.id}-${i}`,
          title: `${topic.name} — Practice Set ${i}`,
          tier: 'Tier-I',
          kind: 'topic',
          subjectSlug: subject.slug,
          topicId: topic.id,
          description: `${questionCount}-question topic-wise practice set for ${topic.name} (${subject.name}) — set ${i} of ${setsPerTopic}.`,
          marksCorrect: 1,
          marksWrong: 0,
          sections: [
            {
              id: `sec-${topic.id}`,
              label: topic.name,
              subject: subject.slug,
              topicId: topic.id,
              questionCount,
              minutes,
            },
          ],
        })
      }
    }
  }
  return out
}

// ---------------------------------------------------------------------------
// Previous-year-pattern exams. These are NOT reproductions of the official
// SSC CGL papers — they are freshly generated exams that match the publicly
// known structure, timing, and marking scheme reported for that year/tier/
// shift, clearly labeled as such.
// ---------------------------------------------------------------------------

const PYP_YEARS: { year: number; tier: 'Tier-I' | 'Tier-II'; shift: string }[] = [
  { year: 2025, tier: 'Tier-I', shift: 'Shift 1' },
  { year: 2025, tier: 'Tier-I', shift: 'Shift 2' },
  { year: 2024, tier: 'Tier-I', shift: 'Shift 1' },
  { year: 2024, tier: 'Tier-I', shift: 'Shift 2' },
  { year: 2024, tier: 'Tier-II', shift: 'Shift 1' },
  { year: 2023, tier: 'Tier-I', shift: 'Shift 1' },
  { year: 2023, tier: 'Tier-I', shift: 'Shift 2' },
  { year: 2023, tier: 'Tier-II', shift: 'Shift 1' },
  { year: 2022, tier: 'Tier-I', shift: 'Shift 1' },
  { year: 2022, tier: 'Tier-I', shift: 'Shift 2' },
  { year: 2021, tier: 'Tier-I', shift: 'Shift 1' },
]

function buildPreviousYearTests(): MockTestConfig[] {
  return PYP_YEARS.map(({ year, tier, shift }) => {
    const isT1 = tier === 'Tier-I'
    return {
      id: `pyp-${year}-${isT1 ? 'tier1' : 'tier2'}-${shift.toLowerCase().replace(' ', '')}`,
      title: `SSC CGL ${year} ${tier} — ${shift} (Pattern)`,
      tier,
      kind: 'previous-year' as const,
      year,
      shift,
      description: `A pattern-based practice exam matching the structure, timing, and marking scheme reported for the ${year} ${tier} exam (${shift}). Questions are freshly generated in the same style — not a reproduction of the official paper.`,
      marksCorrect: isT1 ? 2 : 3,
      marksWrong: isT1 ? 0.5 : 1,
      sections: isT1 ? tier1Sections() : tier2Sections(),
    }
  })
}

export const mockTests: MockTestConfig[] = [
  ...buildFullMocks('Tier-I', 100),
  ...buildFullMocks('Tier-II', 75),
  ...buildSectionalTests(40),
  ...buildTopicTests(9),
  ...buildPreviousYearTests(),
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
