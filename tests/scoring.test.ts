/**
 * Critical scoring and test-library checks. Run: npm test
 * Uses Node's built-in test runner through tsx (no extra dependencies).
 */
import { before, test } from 'node:test'
import assert from 'node:assert/strict'
import { computeAttempt } from '../src/lib/scoring'
import { buildTest, getCatalog, getTestDef, isListed } from '../src/lib/testEngine'
import { findQuestionItem, type QuizQuestionItem } from '../src/lib/quizEngine'
import { examConfig } from '../src/config/examConfig'
import { CURATED_TESTS } from '../src/data/tests/catalog'
import { LEGACY_GRAND_1, LEGACY_GRAND_2 } from '../src/data/tests/legacyGrandSnapshots'
import { randomizeOptions } from '../src/lib/optionShuffle'
import { loadAllReserved, loadedReservedEntries } from '../src/data/reservedQuestions'
import type { ReservedEntry } from '../src/data/questions/fullLength/helpers'
import { pooledAllSubjectsQuestions } from '../src/lib/quizEngine'
import type { Question } from '../src/types'

let reservedEntries: ReservedEntry[] = []
before(async () => {
  await loadAllReserved()
  reservedEntries = loadedReservedEntries()
})

function item(id: string, correctIndex: number): QuizQuestionItem {
  const question: Question = { id, text: id, options: ['a', 'b', 'c', 'd'], correctIndex, explanation: 'x'.repeat(50) }
  return { question, subject: 'medicine', subjectName: 'Medicine', topic: 'Cardiology', topicId: 'cardiology' }
}
const items = [item('q1', 0), item('q2', 1), item('q3', 2), item('q4', 3), item('q5', 0), item('q6', 1)]
const base = { kind: 'mock' as const, label: 'T', items, marksCorrect: 1, marksWrong: 1 / 3, durationSec: 60 }

test('negative marking: +1 correct, −1/3 wrong, 0 unanswered', () => {
  // q1, q2, q3 correct; q4, q5, q6 wrong → 3 − 1 = 2
  const a = computeAttempt({ ...base, answers: { q1: 0, q2: 1, q3: 2, q4: 0, q5: 1, q6: 0 } })
  assert.equal(a.correct, 3)
  assert.equal(a.wrong, 3)
  assert.equal(a.skipped, 0)
  assert.equal(a.score, 2)
  assert.equal(a.maxScore, 6)
})

test('unanswered questions score zero and count as skipped', () => {
  const a = computeAttempt({ ...base, answers: { q1: 0, q4: 1 } })
  assert.equal(a.correct, 1)
  assert.equal(a.wrong, 1)
  assert.equal(a.skipped, 4)
  assert.equal(a.score, Math.round((1 - 1 / 3) * 100) / 100)
})

test('AIIMS rule: answered but still marked for review scores 0', () => {
  const answers = { q1: 0, q2: 0 } // q1 correct, q2 wrong
  const marked = { q1: true, q2: true }
  const strict = computeAttempt({ ...base, answers, marked, markedForReviewEvaluated: false })
  assert.equal(strict.correct, 0)
  assert.equal(strict.wrong, 0)
  assert.equal(strict.score, 0)
  assert.equal(strict.answers.filter((x) => x.notEvaluated).length, 2)
  // The selected option is kept for review, but not scored.
  assert.equal(strict.answers[0].selectedIndex, 0)
  assert.equal(strict.answers[0].isCorrect, null)

  const lenient = computeAttempt({ ...base, answers, marked })
  assert.equal(lenient.correct, 1)
  assert.equal(lenient.wrong, 1)
})

test('marked for review without an answer is simply unanswered', () => {
  const a = computeAttempt({ ...base, answers: {}, marked: { q1: true }, markedForReviewEvaluated: false })
  assert.equal(a.skipped, 6)
  assert.equal(a.answers[0].notEvaluated, undefined)
})

test('all wrong gives the expected negative score', () => {
  const a = computeAttempt({ ...base, answers: { q1: 1, q2: 0, q3: 0, q4: 0, q5: 1, q6: 0 } })
  assert.equal(a.score, -2)
})

test('reserved packs are loaded', () => {
  const expected = CURATED_TESTS.filter((t) => t.pattern === 'inicet-cbt').reduce((n, t) => n + t.questionIds.length, 0)
  assert.equal(reservedEntries.length, expected)
  assert.equal(new Set(reservedEntries.map((e) => e.question.id)).size, reservedEntries.length)
})

test('option shuffling preserves the answer key', () => {
  for (const e of reservedEntries.slice(0, 50)) {
    // reservedEntries are already shuffled; the correct option text must be the one authored first.
    const raw = { ...e.question }
    const again = randomizeOptions({ ...raw, options: [...raw.options] })
    assert.equal(again.options[again.correctIndex], raw.options[raw.correctIndex])
  }
})

test('exam config follows the AIIMS sectional pattern', () => {
  assert.equal(examConfig.totalQuestions, 200)
  assert.equal(examConfig.durationMinutes, 180)
  assert.equal(examConfig.sections.length, 4)
  assert.ok(examConfig.sections.every((s) => s.questionCount === 50 && s.minutes === 45))
  assert.equal(examConfig.navigation, 'within-section')
  assert.equal(examConfig.markedForReviewEvaluated, false)
})

test('original Grand Tests 1 and 2 are frozen and intact', () => {
  assert.equal(LEGACY_GRAND_1.length, 150)
  assert.equal(LEGACY_GRAND_2.length, 150)
  assert.equal(new Set([...LEGACY_GRAND_1, ...LEGACY_GRAND_2]).size, 300)
  for (const id of [...LEGACY_GRAND_1, ...LEGACY_GRAND_2]) assert.ok(findQuestionItem(id), `missing ${id}`)
  for (const id of ['grand-1', 'grand-2']) {
    const def = getTestDef(id, new URLSearchParams())
    assert.ok(def)
    const built = buildTest(def!)
    assert.equal(built.flatMap((b) => b.items).length, 150)
    assert.equal(def!.navigation, 'free')
    assert.equal(def!.markedForReviewEvaluated, true)
  }
})

test('every listed curated test is complete with no duplicate questions', () => {
  for (const t of CURATED_TESTS.filter((x) => isListed(x.status))) {
    const def = getTestDef(t.id, new URLSearchParams())!
    const built = buildTest(def)
    const ids = built.flatMap((b) => b.items.map((i) => i.question.id))
    assert.equal(ids.length, t.questionIds.length, t.id)
    assert.equal(new Set(ids).size, ids.length, `${t.id} has duplicates`)
    assert.deepEqual(new Set(ids), new Set(t.questionIds))
  }
})

test('every full-length Grand Test uses 4 timed, locked parts of 50', () => {
  for (const t of CURATED_TESTS.filter((x) => x.pattern === 'inicet-cbt')) {
  const def = getTestDef(t.id, new URLSearchParams())!
  assert.equal(def.sections.length, 4)
  assert.ok(def.sections.every((s) => s.questionCount === 50 && s.minutes === 45))
  assert.equal(def.navigation, 'within-section')
  assert.equal(def.allowEarlySectionSubmit, false)
  const built = buildTest(def)
  assert.ok(built.every((b) => b.items.length === 50))
  }
})

test('test-reserved questions stay out of practice pools', () => {
  const pool = new Set(pooledAllSubjectsQuestions().map((i) => i.question.id))
  for (const e of reservedEntries) assert.ok(!pool.has(e.question.id), `${e.question.id} leaked into the practice pool`)
})

test('full mock draws 200 unique questions in 4 parts', () => {
  const def = getCatalog().find((t) => t.id === 'full-mock')!
  const built = buildTest(def)
  const ids = built.flatMap((b) => b.items.map((i) => i.question.id))
  assert.equal(built.length, 4)
  assert.equal(ids.length, 200)
  assert.equal(new Set(ids).size, 200)
})

test('no curated test is labelled as actual PYQs without sourced PYQs', () => {
  for (const t of CURATED_TESTS.filter((x) => x.category === 'pyq')) {
    for (const id of t.questionIds) {
      const q = findQuestionItem(id)?.question
      assert.ok(q && (q.sourceType === 'PYQ' || q.sourceType === 'PYQ_RECALL') && q.sourceDetail, `${t.id}: ${id}`)
    }
  }
})
