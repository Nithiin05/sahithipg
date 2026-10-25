/** Flags questions in a pack whose first tag already appears in an earlier pack or the bank. */
import { subjects } from '../src/data/subjects'
import { loadAllReserved, loadedReservedEntries } from '../src/data/reservedQuestions'
const pack = process.argv[2]
await loadAllReserved()
const seen = new Map<string, string>()
for (const s of subjects) for (const t of s.topics) for (const q of t.questions) for (const g of (q.tags ?? []).slice(0, 1)) seen.set(g, q.id)
for (const e of loadedReservedEntries()) if (!e.question.id.startsWith(pack + '-')) for (const g of (e.question.tags ?? []).slice(0, 1)) seen.set(g, e.question.id)
const raw = await import(`../src/data/questions/fullLength/${pack}.ts`)
for (const e of raw[pack]) { const g = e.question.tags?.[0]; if (g && seen.has(g)) console.log(e.question.id, g, '<-', seen.get(g)) }
