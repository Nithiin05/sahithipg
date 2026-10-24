/**
 * Question-bank integrity check. Run: npm run check:questions
 * Fails (exit 1) on hard errors; prints warnings for things to review.
 */
import { subjects } from '../src/data/subjects'
import { sourceTypeOf, isActualPYQ } from '../src/lib/questionSource'
import { syllabus } from '../src/data/syllabus'
import { loadAllReserved, loadedReservedEntries } from '../src/data/reservedQuestions'
import { CURATED_TESTS } from '../src/data/tests/catalog'
import { examConfig } from '../src/config/examConfig'
import type { Question } from '../src/types'

await loadAllReserved()
const reservedEntries = loadedReservedEntries()
const errors: string[] = []
const warnings: string[] = []
const ids = new Map<string, string>()
const texts = new Map<string, string>()
const positions = [0, 0, 0, 0]
const sequence: number[] = []
const sourceCounts: Record<string, number> = {}
const arKey = [0, 0, 0, 0]
const diffCounts: Record<string, number> = {}
let longestCorrect = 0
let lengthChecked = 0
let total = 0

// Every question: the main bank plus test-reserved questions (full-length tests).
const allQuestions: { where: string; q: Question }[] = [
  ...subjects.flatMap((s) => s.topics.flatMap((t) => t.questions.map((q) => ({ where: `${s.slug}/${t.id}/${q.id}`, q })))),
  ...reservedEntries.map((e) => ({ where: `reserved/${e.subject}/${e.topicId}/${e.question.id}`, q: e.question })),
]
for (const e of reservedEntries) {
  const s = subjects.find((x) => x.slug === e.subject)
  if (!s) errors.push(`${e.question.id}: unknown subject ${e.subject}`)
  else if (!s.topics.some((t) => t.id === e.topicId)) errors.push(`${e.question.id}: unknown topic ${e.subject}/${e.topicId}`)
}
const SUPPORTED_TYPES = new Set(['standard', 'clinical-case', 'image', 'radiology', 'ecg', 'histopath', 'anatomy-image', 'instrument', 'assertion-reason', 'match-following', 'multiple-correct', 'guideline', 'aiims', 'inicet'])
{
  for (const { where, q } of allQuestions) {
    {
      total++
      if (ids.has(q.id)) errors.push(`Duplicate id ${q.id} (${ids.get(q.id)} and ${where})`)
      ids.set(q.id, where)

      const norm = q.text.toLowerCase().replace(/\s+/g, ' ').trim()
      if (texts.has(norm)) errors.push(`Duplicate question text: ${where} and ${texts.get(norm)}`)
      texts.set(norm, where)

      if (q.options.length !== 4) warnings.push(`${where}: ${q.options.length} options (expected 4)`)
      if (q.correctIndex < 0 || q.correctIndex >= q.options.length) errors.push(`${where}: correctIndex out of range`)
      if (new Set(q.options.map((o) => o.trim().toLowerCase())).size !== q.options.length)
        errors.push(`${where}: duplicate option text`)
      if (!q.explanation || q.explanation.length < 40) warnings.push(`${where}: missing/very short explanation`)
      if (/lorem ipsum|TODO|placeholder/i.test(q.text + q.explanation)) errors.push(`${where}: placeholder text`)
      if (q.sourceType === 'PYQ' && !q.sourceDetail) errors.push(`${where}: marked PYQ without sourceDetail`)
      if (q.imageUrl && !q.imageSource) errors.push(`${where}: image without imageSource attribution`)
      if (q.type && !SUPPORTED_TYPES.has(q.type)) errors.push(`${where}: unsupported question type "${q.type}"`)
      if (q.sourceType === 'PYQ_RECALL' && !q.sourceDetail) errors.push(`${where}: PYQ recall without sourceDetail`)
      if (isActualPYQ(q) && !q.sourceUrl && !q.license) errors.push(`${where}: actual PYQ without sourceUrl or licence note`)
      if (q.reviewStatus === 'expert-verified' && !q.reviewedBy) errors.push(`${where}: expert-verified without reviewedBy`)
      if (q.type === 'multiple-correct' && !/\n1\./.test(q.text)) warnings.push(`${where}: multiple-correct question without numbered statements`)
      if (!q.reference) warnings.push(`${where}: no reference`)

      const st = sourceTypeOf(q)
      sourceCounts[st] = (sourceCounts[st] ?? 0) + 1
      diffCounts[q.difficulty ?? 'untagged'] = (diffCounts[q.difficulty ?? 'untagged'] ?? 0) + 1
      if (!q.difficulty) warnings.push(`${where}: no explicit difficulty`)
      if (q.type === 'assertion-reason') arKey[q.correctIndex]++
      if (q.type !== 'assertion-reason' && q.type !== 'match-following') {
        const lens = q.options.map((o) => o.length)
        const c = lens[q.correctIndex]
        lengthChecked++
        if (c === Math.max(...lens) && lens.filter((l) => l === c).length === 1) longestCorrect++
      }
      if (q.type !== 'assertion-reason') {
        positions[q.correctIndex]++
        sequence.push(q.correctIndex)
      }
    }
  }
}

// ---------------------------------------------------------------- curated tests
const byId = new Map(allQuestions.map((x) => [x.q.id, x.q]))
const testIds = new Set<string>()
const perTest: string[] = []
for (const t of CURATED_TESTS) {
  const tag = `test ${t.id} v${t.version}`
  if (testIds.has(t.id)) errors.push(`Duplicate test id ${t.id}`)
  testIds.add(t.id)
  const live = t.status === 'published' || t.status === 'review'
  const expectedCount = t.pattern === 'inicet-cbt' ? examConfig.sections.reduce((n, x) => n + x.questionCount, 0) : t.questionIds.length
  if (t.questionIds.length === 0) (live ? errors : warnings).push(`${tag}: no questions`)
  if (t.questionIds.length !== expectedCount) (live ? errors : warnings).push(`${tag}: ${t.questionIds.length} questions, pattern needs ${expectedCount}`)
  const seen = new Set<string>()
  let flagged = 0
  const diff: Record<string, number> = {}
  for (const id of t.questionIds) {
    if (seen.has(id)) errors.push(`${tag}: question ${id} appears twice`)
    seen.add(id)
    const q = byId.get(id)
    if (!q) { errors.push(`${tag}: unknown question id ${id}`); continue }
    if (q.reviewStatus === 'flagged') flagged++
    diff[q.difficulty ?? 'untagged'] = (diff[q.difficulty ?? 'untagged'] ?? 0) + 1
    if (t.category === 'pyq' && !isActualPYQ(q)) errors.push(`${tag}: "Actual PYQs" test contains ${id}, which is not a sourced PYQ`)
  }
  if (live && flagged) errors.push(`${tag}: ${flagged} flagged question(s) in a live test`)
  if (t.status === 'published' && t.questionIds.some((id) => byId.get(id)?.reviewStatus === 'unreviewed') && t.pattern === 'inicet-cbt')
    warnings.push(`${tag}: published with unreviewed questions`)
  perTest.push(`  ${t.id} v${t.version} [${t.status}] ${t.questionIds.length} Qs ${JSON.stringify(diff)}`)
}
// Different live full-length tests should not share questions.
const owner = new Map<string, string>()
for (const t of CURATED_TESTS.filter((x) => x.status !== 'archived')) {
  for (const id of t.questionIds) {
    if (owner.has(id) && owner.get(id) !== t.id) errors.push(`Question ${id} is in both ${owner.get(id)} and ${t.id}`)
    owner.set(id, t.id)
  }
}

// Longest run of the same answer position in canonical bank order.
let maxRun = 1
let run = 1
for (let i = 1; i < sequence.length; i++) {
  run = sequence[i] === sequence[i - 1] ? run + 1 : 1
  maxRun = Math.max(maxRun, run)
}

const n = sequence.length
console.log(`Questions: ${total} across ${subjects.length} subjects (${reservedEntries.length} test-reserved)`)
console.log('Curated tests:\n' + perTest.join('\n'))
console.log('Source types:', sourceCounts)
console.log(
  'Correct-answer position (shuffled, excl. assertion-reason):',
  positions.map((c, i) => `${'ABCD'[i]} ${c} (${((c / n) * 100).toFixed(1)}%)`).join('  '),
)
console.log(`Longest same-position run in bank order: ${maxRun}`)
console.log('Difficulty:', diffCounts)
const longestPct = (longestCorrect / lengthChecked) * 100
console.log(`Correct option is the uniquely longest: ${longestCorrect}/${lengthChecked} (${longestPct.toFixed(0)}%, chance ≈ 25%)`)
if (longestPct > 35) warnings.push(`Correct option is the longest in ${longestPct.toFixed(0)}% of questions — a test-wiseness giveaway`)
const arTotal = arKey.reduce((a, b) => a + b, 0)
console.log(`Assertion–reason key (fixed order) A/B/C/D: ${arKey.join(' / ')}`)
arKey.forEach((c, i) => {
  if (arTotal >= 8 && c / arTotal > 0.4) warnings.push(`Assertion–reason answer ${'ABCD'[i]} is ${c}/${arTotal} — too predictable`)
})

// Syllabus ↔ question-bank links
let mods = 0
let covered = 0
for (const sub of subjects) {
  const tree = syllabus[sub.slug]
  if (!tree) { errors.push(`No syllabus for ${sub.slug}`); continue }
  const topicIds = new Set(sub.topics.map((t) => t.id))
  const linked = new Set<string>()
  for (const m of tree) {
    mods++
    if (m.practice.length) covered++
    for (const id of m.practice) {
      if (!topicIds.has(id)) errors.push(`Syllabus ${sub.slug}/${m.id} links unknown topic "${id}"`)
      linked.add(id)
    }
  }
  for (const id of topicIds) if (!linked.has(id)) warnings.push(`Topic ${sub.slug}/${id} is not linked from any syllabus module`)
}
console.log(`Syllabus: ${mods} modules, ${covered} with practice questions linked`)

const expected = n / 4
for (let i = 0; i < 4; i++) {
  if (Math.abs(positions[i] - expected) / expected > 0.25)
    warnings.push(`Answer position ${'ABCD'[i]} is ${positions[i]} vs ~${expected.toFixed(0)} expected`)
}
if (maxRun > 4) warnings.push(`Same answer position repeats ${maxRun} times in a row in bank order`)

warnings.forEach((w) => console.log('WARN ', w))
errors.forEach((e) => console.log('ERROR', e))
console.log(errors.length ? `\n${errors.length} error(s)` : '\nNo errors')
process.exit(errors.length ? 1 : 0)
