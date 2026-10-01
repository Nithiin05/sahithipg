export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert'

/**
 * Where a question comes from. Shown to the user on every question.
 * - PYQ:          an actual INI-CET question, verified against a named source. Requires `sourceDetail`.
 * - PYQ_PATTERN:  an original question modelled on concepts/style seen in past papers — never a reproduction.
 * - PRACTICE:     an original educational question.
 * - IMAGE:        an original image-interpretation question.
 * - INTEGRATED:   an original question that deliberately combines two or more subjects.
 */
export type SourceType = 'PYQ' | 'PYQ_PATTERN' | 'PRACTICE' | 'IMAGE' | 'INTEGRATED'

export type ImageCategory =
  | 'histopathology'
  | 'x-ray'
  | 'ct'
  | 'mri'
  | 'ecg'
  | 'fundus'
  | 'dermatology'
  | 'gross-specimen'
  | 'anatomy'
  | 'microbiology'
  | 'instrument'
  | 'clinical-photo'
  | 'diagram'

/** Every distinct question format INI-CET prep needs to support. */
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
  /** Set only for PYQ-pattern questions — the year whose concepts they're modelled on. */
  year?: number
  /** Legacy flag: true = PYQ-PATTERN question (original, modelled on that year's
   * concepts). It never means an actual paper question — use sourceType 'PYQ'
   * with sourceDetail for that. */
  isPYQ?: boolean
  /** A short "remember this for the exam" pearl shown after answering. */
  clinicalPearl?: string
  /** A high-yield one-liner fact related to the question, for quick revision. */
  highYieldNote?: string
  /** For image questions — path under /public. */
  imageUrl?: string
  imageAlt?: string
  imageCaption?: string
  imageType?: ImageCategory
  /** Attribution shown under the image, e.g. "Wikimedia Commons / Author, CC BY-SA 4.0" or "Original diagram". */
  imageSource?: string
  /** Defaults from `isPYQ` / `type` when omitted — see src/lib/questionSource.ts. */
  sourceType?: SourceType
  /** Required when sourceType === 'PYQ': the exact paper, e.g. "INI-CET May 2024". */
  sourceDetail?: string
  /** Organ system (e.g. "Cardiovascular") for system-wise tests. */
  system?: string
  /** Subjects combined in an INTEGRATED question, e.g. ['Medicine', 'Pathology']. */
  integratedSubjects?: string[]
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
  /** True if the question was marked for review when the attempt was submitted. */
  marked?: boolean
}

export type AttemptKind = 'practice' | 'mock' | 'grand'
export type MockTestKind =
  | 'full'
  | 'grand'
  | 'subject'
  | 'system'
  | 'rapid'
  | 'image'
  | 'pyq'
  | 'pyq-pattern'
  | 'custom'
  | 'practice'
  | 'revision'
  // legacy values that may exist in older saved attempts
  | 'topic'
  | 'rapid-revision'
  | 'mixed'
  | 'daily-challenge'
  | 'smart-revision'

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
  /** Test catalogue id, for attempts from the test engine. */
  testId?: string
  /** Marking scheme used for this attempt — enables computing marks lost to negative marking later. */
  marksCorrect?: number
  marksWrong?: number
}

export type PrepLevel = 'beginner' | 'intermediate' | 'advanced'

export interface StudyPlanState {
  examDate: string
  dailyGoalMinutes: number
  dailyGoalQuestions: number
  /** Subjects the student marked as weak — prioritised by the planner. */
  focusSubjects: SubjectSlug[]
  /** Subjects the student marked as strong — scheduled less often. */
  strongSubjects?: SubjectSlug[]
  prepLevel?: PrepLevel
  createdAt: string
}
