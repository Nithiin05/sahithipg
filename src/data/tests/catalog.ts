import { LEGACY_GRAND_1, LEGACY_GRAND_2 } from './legacyGrandSnapshots'
import { GRAND_TEST_3_IDS } from './grandTest3'
import { GRAND_TEST_4_IDS } from './grandTest4'
import { GRAND_TEST_5_IDS } from './grandTest5'
import { GRAND_TEST_6_IDS } from './grandTest6'
import { GRAND_TEST_7_IDS } from './grandTest7'
import { GRAND_TEST_8_IDS } from './grandTest8'
import { GRAND_TEST_9_IDS } from './grandTest9'
import { GRAND_TEST_10_IDS } from './grandTest10'
import { GRAND_TEST_11_IDS } from './grandTest11'
import { GRAND_TEST_12_IDS } from './grandTest12'

/**
 * Curated test library — fixed, versioned tests whose questions never change
 * once published. Add a test by appending an entry here (and its question ids);
 * no UI code needs to change. `npm run check:questions` validates every entry.
 *
 * Lifecycle (`status`):
 *  - draft:     being assembled; hidden from students (visible with ?preview=1).
 *  - review:    complete and validated, questions awaiting expert medical review;
 *               shown to students with an "Expert review pending" badge.
 *  - published: complete, validated and signed off.
 *  - archived:  retired; hidden from the library but old results still open.
 *
 * To change a published test, bump `version` and keep the old id list in git
 * history — attempts record the version they were taken on.
 */

export type TestCategory = 'grand' | 'full-mock' | 'pyq' | 'pyq-inspired' | 'high-difficulty' | 'revision'
export type TestStatus = 'draft' | 'review' | 'published' | 'archived'
/** Pattern keys resolve to timing/marking/navigation in src/lib/testEngine.ts. */
export type PatternId = 'inicet-cbt' | 'legacy-grand-150'

export interface CuratedTest {
  id: string
  version: number
  title: string
  category: TestCategory
  status: TestStatus
  description: string
  pattern: PatternId
  /** Shown on the card. Derived from the questions' own tags, not chosen freely. */
  difficultyLabel: 'Moderate' | 'Moderate–Hard' | 'Hard'
  /** Ordered question ids. For 'inicet-cbt' they are split into 4 parts of 50 in this order. */
  questionIds: string[]
  /** Free-text editorial note shown to students (e.g. review state). */
  note?: string
}

export const CATEGORY_LABELS: Record<TestCategory, string> = {
  grand: 'Grand Test',
  'full-mock': 'Full-Length Mock',
  pyq: 'Actual PYQs',
  'pyq-inspired': 'PYQ-Inspired',
  'high-difficulty': 'High-Difficulty',
  revision: 'Revision',
}

const REVIEW_NOTE = 'Original questions, answer keys re-checked against the cited references. Expert medical review pending.'

/** A new full-length Grand Test in the official 4-part pattern (200 test-reserved questions). */
function fullLengthGrand(n: number, questionIds: string[], status: TestStatus = 'review'): CuratedTest {
  return {
    id: `grand-${n}`,
    version: 1,
    title: `Grand Test ${n} — Full Length`,
    category: 'grand',
    status,
    description: `Complete INI-CET simulation: 200 new questions in 4 timed parts of 50 (45 min each), parts lock once closed, +1 / −⅓. Moderate-to-hard questions across all 19 subjects; no overlap with any other Grand Test.`,
    pattern: 'inicet-cbt',
    difficultyLabel: 'Moderate–Hard',
    questionIds,
    note: status === 'review' ? REVIEW_NOTE : undefined,
  }
}

export const CURATED_TESTS: CuratedTest[] = [
  {
    id: 'grand-1',
    version: 1,
    title: 'Grand Test 1',
    category: 'grand',
    status: 'published',
    description: '150 mixed questions across all subjects, 135 minutes, exam marking. Fixed question set — the same every attempt, so you can track improvement.',
    pattern: 'legacy-grand-150',
    difficultyLabel: 'Moderate',
    questionIds: LEGACY_GRAND_1,
  },
  {
    id: 'grand-2',
    version: 1,
    title: 'Grand Test 2',
    category: 'grand',
    status: 'published',
    description: '150 mixed questions with no overlap with Grand Test 1, 135 minutes, exam marking. Fixed question set.',
    pattern: 'legacy-grand-150',
    difficultyLabel: 'Moderate',
    questionIds: LEGACY_GRAND_2,
  },
  {
    id: 'grand-3',
    version: 1,
    title: 'Grand Test 3 — Full Length',
    category: 'grand',
    status: 'review',
    description:
      'Complete INI-CET simulation: 200 new questions in 4 timed parts of 50 (45 min each), parts lock once closed, +1 / −⅓. Moderate-to-hard clinical vignettes across all 19 subjects; no overlap with Grand Tests 1–2.',
    pattern: 'inicet-cbt',
    difficultyLabel: 'Moderate–Hard',
    questionIds: GRAND_TEST_3_IDS,
    note: REVIEW_NOTE,
  },
  fullLengthGrand(4, GRAND_TEST_4_IDS),
  fullLengthGrand(5, GRAND_TEST_5_IDS),
  fullLengthGrand(6, GRAND_TEST_6_IDS),
  fullLengthGrand(7, GRAND_TEST_7_IDS),
  fullLengthGrand(8, GRAND_TEST_8_IDS),
  fullLengthGrand(9, GRAND_TEST_9_IDS),
  fullLengthGrand(10, GRAND_TEST_10_IDS),
  fullLengthGrand(11, GRAND_TEST_11_IDS),
  fullLengthGrand(12, GRAND_TEST_12_IDS),
]
