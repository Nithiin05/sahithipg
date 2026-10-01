/**
 * Question-bank integrity check. Run: npm run check:questions
 * Fails (exit 1) on hard errors; prints warnings for things to review.
 */
import { subjects } from '../src/data/subjects'
import { sourceTypeOf } from '../src/lib/questionSource'
import { syllabus } from '../src/data/syllabus'

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

for (const s of subjects) {
  for (const t of s.topics) {
    for (const q of t.questions) {
      total++
      const where = `${s.slug}/${t.id}/${q.id}`
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

// Longest run of the same answer position in canonical bank order.
let maxRun = 1
let run = 1
for (let i = 1; i < sequence.length; i++) {
  run = sequence[i] === sequence[i - 1] ? run + 1 : 1
  maxRun = Math.max(maxRun, run)
}

const n = sequence.length
console.log(`Questions: ${total} across ${subjects.length} subjects`)
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
