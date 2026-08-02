export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert'

/** Every distinct question format NEET PG-style prep needs to support. */
export type QuestionType =
  | 'standard'
  | 'clinical-case'
  | 'image'
  | 'radiology'
  | 'ecg'
  | 'histopath'
  | 'anatomy-image'
  | 'instrument'
  | 'assertion-reason'
  | 'match-following'
  | 'guideline'
  | 'aiims'
  | 'inicet'

export interface MatchPair {
  left: string
  right: string
}

export interface Question {
  id: string
  /** The question stem / vignette. For clinical-case questions this is the full case description. */
  text: string
  options: string[]
  correctIndex: number
  explanation: string
  /** Textbook / guideline reference, e.g. "Harrison's 21st Ed., Ch. 12". */
  reference?: string
  /** Optional explicit difficulty tag. Untagged (legacy) questions still get
   * deterministically bucketed — see src/lib/difficulty.ts. */
  difficulty?: Difficulty
  /** Defaults to 'standard' when omitted. */
  type?: QuestionType
  /** Free-form tags for search/filter (e.g. "guideline-2024", "high-yield"). */
  tags?: string[]
  /** Set only for PYQ-style practice questions — the year they're patterned after. */
  year?: number
  /** True for previous-year-pattern questions, surfaced in the PYQ practice pool.
   * These are ORIGINAL practice questions written in the style/structure reported
   * for that year — never a reproduction of an official paper. */
  isPYQ?: boolean
  /** A short "remember this for the exam" pearl shown after answering. */
  clinicalPearl?: string
  /** A high-yield one-liner fact related to the question, for quick revision. */
  highYieldNote?: string
  /** For image/radiology/ecg/histopath/anatomy-image/instrument questions — path under /public. */
  imageUrl?: string
  imageAlt?: string
  /** Only for 'match-following' questions — rendered alongside the options for reference. */
  matchPairs?: MatchPair[]
}

export interface Topic {
  id: string
  name: string
  description: string
  questions: Question[]
}

export type SubjectCategory = 'Pre-Clinical' | 'Para-Clinical' | 'Clinical'

export type SubjectSlug =
  | 'anatomy'
  | 'physiology'
  | 'biochemistry'
  | 'pathology'
  | 'pharmacology'
  | 'microbiology'
  | 'forensic-medicine'
  | 'community-medicine'
  | 'medicine'
  | 'surgery'
  | 'obg'
  | 'pediatrics'
  | 'orthopedics'
  | 'ent'
  | 'ophthalmology'
  | 'dermatology'
  | 'psychiatry'
  | 'radiology'
  | 'anesthesia'

export interface Subject {
  slug: SubjectSlug
  name: string
  shortName: string
  description: string
  category: SubjectCategory
  /** Tailwind color family key — see COLOR_CLASSES maps in components. */
  color: string
  /** lucide-react icon name, resolved via the ICONS map in components/icons.tsx. */
  icon: string
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
  /** Seconds spent on this specific question, when tracked by the runner. */
  timeSpentSec?: number
}

export type AttemptKind = 'practice' | 'mock' | 'grand'
export type MockTestKind = 'subject' | 'topic' | 'rapid-revision' | 'mixed' | 'pyq' | 'daily-challenge' | 'smart-revision'

export interface AttemptRecord {
  id: string
  kind: AttemptKind
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
  /** Only set for mock-kind attempts. */
  mockKind?: MockTestKind
  /** Set for kind === 'grand'. */
  grandTestId?: string
  /** Marking scheme used for this attempt — enables computing marks lost to negative marking later. */
  marksCorrect?: number
  marksWrong?: number
}

export interface StudyPlanState {
  examDate: string
  dailyGoalMinutes: number
  dailyGoalQuestions: number
  focusSubjects: SubjectSlug[]
  createdAt: string
}
