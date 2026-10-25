/**
 * Question-bank import / export (validated JSON).
 *
 *   npm run qbank -- export [out.json]          Export every question (bank + test-reserved) with metadata.
 *   npm run qbank -- import <pack.json> <pack>  Validate a JSON pack and write src/data/questions/fullLength/<pack>.ts
 *
 * JSON pack format (array):
 *   [{ "subject": "medicine", "topicId": "cardiology", "id": "gt4-med-01",
 *      "text": "...", "options": ["correct", "wrong", "wrong", "wrong"], "correctIndex": 0,
 *      "explanation": "...", "difficulty": "Hard", "type": "clinical-case",
 *      "reference": "...", "tags": ["..."], "reviewStatus": "unreviewed", ... }]
 *
 * After importing, register the pack loader in src/data/reservedQuestions.ts,
 * add the test (with its ordered ids) to src/data/tests/catalog.ts, and run
 * `npm run check`.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { subjects } from '../src/data/subjects'
import { loadAllReserved, loadedReservedEntries } from '../src/data/reservedQuestions'
import type { Difficulty, Question, QuestionType, ReviewStatus, SourceType } from '../src/types'

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard', 'Expert']
const TYPES: QuestionType[] = ['standard', 'clinical-case', 'image', 'radiology', 'ecg', 'histopath', 'anatomy-image', 'instrument', 'assertion-reason', 'match-following', 'multiple-correct', 'guideline', 'aiims', 'inicet']
const REVIEW: ReviewStatus[] = ['unreviewed', 'author-checked', 'expert-verified', 'flagged']
const SOURCES: SourceType[] = ['PYQ', 'PYQ_RECALL', 'PYQ_PATTERN', 'PRACTICE', 'IMAGE', 'INTEGRATED']

interface Row extends Question {
  subject: string
  topicId: string
}

function validate(rows: unknown, existingIds: Set<string>): { ok: Row[]; errors: string[] } {
  const errors: string[] = []
  if (!Array.isArray(rows)) return { ok: [], errors: ['Top level must be an array of questions'] }
  const seenIds = new Set<string>()
  const seenText = new Set<string>()
  rows.forEach((r: Partial<Row>, i) => {
    const at = `#${i} (${r?.id ?? 'no id'})`
    if (!r || typeof r !== 'object') return errors.push(`${at}: not an object`)
    const subject = subjects.find((s) => s.slug === r.subject)
    if (!subject) errors.push(`${at}: unknown subject "${r.subject}"`)
    else if (!subject.topics.some((t) => t.id === r.topicId)) errors.push(`${at}: unknown topic "${r.topicId}" for ${r.subject}`)
    if (!r.id || !/^[a-z]+\d+-[a-z]+-\d+$/.test(r.id)) errors.push(`${at}: id must look like "gt4-med-01"`)
    if (r.id && (seenIds.has(r.id) || existingIds.has(r.id))) errors.push(`${at}: duplicate id`)
    if (r.id) seenIds.add(r.id)
    if (!r.text || r.text.length < 20) errors.push(`${at}: missing or very short question text`)
    const norm = (r.text ?? '').toLowerCase().replace(/\s+/g, ' ').trim()
    if (seenText.has(norm)) errors.push(`${at}: duplicate question text`)
    seenText.add(norm)
    if (!Array.isArray(r.options) || r.options.length !== 4) errors.push(`${at}: exactly 4 options required`)
    else if (new Set(r.options.map((o) => String(o).trim().toLowerCase())).size !== 4) errors.push(`${at}: duplicate option text`)
    if (typeof r.correctIndex !== 'number' || r.correctIndex < 0 || r.correctIndex > 3) errors.push(`${at}: correctIndex must be 0–3`)
    if (!r.explanation || r.explanation.length < 80) errors.push(`${at}: explanation missing or under 80 characters`)
    if (!r.difficulty || !DIFFICULTIES.includes(r.difficulty)) errors.push(`${at}: difficulty must be one of ${DIFFICULTIES.join(', ')}`)
    if (r.type && !TYPES.includes(r.type)) errors.push(`${at}: unsupported type "${r.type}"`)
    if (r.reviewStatus && !REVIEW.includes(r.reviewStatus)) errors.push(`${at}: invalid reviewStatus`)
    if (r.reviewStatus === 'expert-verified' && !r.reviewedBy) errors.push(`${at}: expert-verified needs reviewedBy`)
    if (r.sourceType && !SOURCES.includes(r.sourceType)) errors.push(`${at}: invalid sourceType`)
    if ((r.sourceType === 'PYQ' || r.sourceType === 'PYQ_RECALL') && (!r.sourceDetail || (!r.sourceUrl && !r.license)))
      errors.push(`${at}: actual PYQs need sourceDetail and a sourceUrl or licence note`)
    if (!r.reference) errors.push(`${at}: reference required`)
    if (/lorem ipsum|TODO|placeholder/i.test(`${r.text} ${r.explanation}`)) errors.push(`${at}: placeholder text`)
  })
  return { ok: errors.length ? [] : (rows as Row[]), errors }
}

const [cmd, a, b] = process.argv.slice(2)
await loadAllReserved()
const reserved = loadedReservedEntries()
const bankRows: Row[] = subjects.flatMap((s) => s.topics.flatMap((t) => t.questions.map((q) => ({ ...q, subject: s.slug, topicId: t.id }))))
const reservedRows: Row[] = reserved.map((e) => ({ ...e.question, subject: e.subject, topicId: e.topicId }))

if (cmd === 'export') {
  const out = a ?? 'question-bank-export.json'
  const all = [...bankRows.map((r) => ({ ...r, reserved: false })), ...reservedRows.map((r) => ({ ...r, reserved: true }))]
  writeFileSync(out, JSON.stringify(all, null, 2))
  console.log(`Exported ${all.length} questions (${reservedRows.length} test-reserved) to ${out}`)
} else if (cmd === 'import') {
  if (!a || !b || !/^[a-z]+\d+$/.test(b)) {
    console.error('Usage: npm run qbank -- import <pack.json> <packName, e.g. gt4>')
    process.exit(1)
  }
  const target = `src/data/questions/fullLength/${b}.ts`
  if (existsSync(target)) {
    console.error(`${target} already exists — published packs are not overwritten. Use a new pack name.`)
    process.exit(1)
  }
  const existing = new Set([...bankRows, ...reservedRows].map((r) => r.id))
  const { ok, errors } = validate(JSON.parse(readFileSync(a, 'utf8')), existing)
  if (errors.length) {
    errors.forEach((e) => console.error('ERROR', e))
    console.error(`\n${errors.length} error(s); nothing written.`)
    process.exit(1)
  }
  const entries = ok.map(({ subject, topicId, ...question }) => ({ subject, topicId, question: { reviewStatus: 'unreviewed', ...question } }))
  writeFileSync(
    target,
    `import type { ReservedEntry } from './helpers'\n\n/** Imported from ${a.split('/').pop()} — ${entries.length} questions. */\nexport const ${b}: ReservedEntry[] = ${JSON.stringify(entries, null, 2)} as ReservedEntry[]\n`,
  )
  console.log(`Wrote ${entries.length} questions to ${target}.`)
  console.log(`Next: register "${b}" in src/data/reservedQuestions.ts, add the test to src/data/tests/catalog.ts, run npm run check.`)
} else {
  console.log('Usage:\n  npm run qbank -- export [out.json]\n  npm run qbank -- import <pack.json> <packName>')
}
