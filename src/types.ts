export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export interface Question {
  id: string
  text: string
  options: string[]
  correctIndex: number
  explanation: string
  /** Optional explicit difficulty tag. Untagged (legacy) questions still get
   * deterministically bucketed — see src/lib/difficulty.ts. */
  difficulty?: Difficulty
  /** True for previous-year-pattern questions, surfaced in the PYQ practice pool. */
  isPreviousYear?: boolean
}

export interface Topic {
  id: string
  name: string
  description: string
  questions: Question[]
}

export type SubjectSlug = 'quant' | 'reasoning' | 'english' | 'general-awareness' | 'computer-knowledge' | 'statistics'

export interface Subject {
  slug: SubjectSlug
  name: string
  shortName: string
  description: string
  color: string
  topics: Topic[]
}

export interface AnswerRecord {
  questionId: string
  subject: SubjectSlug
  subjectName: string
  topic: string
  selectedIndex: number | null
  correctIndex: number
  isCorrect: boolean | null
}

export interface AttemptRecord {
  id: string
  kind: 'practice' | 'mock'
  label: string
  date: string
  durationSec: number
  totalQuestions: number
  attempted: number
  correct: number
  wrong: number
  skipped: number
  score: number
  maxScore: number
  answers: AnswerRecord[]
  /** Route to reattempt (start fresh) — populated by whichever runner saved this attempt. */
  sourceRoute?: string
  /** Only set for mock-kind attempts; mirrors MockTestKind without importing across module boundaries. */
  mockKind?: 'full' | 'sectional' | 'topic' | 'previous-year'
  /** Marking scheme used for this attempt — enables computing marks lost to negative marking later. */
  marksCorrect?: number
  marksWrong?: number
}
