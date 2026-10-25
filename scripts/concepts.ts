/** Prints the first two tags of every question, grouped by subject — a concept ledger to avoid repeats. */
import { subjects } from '../src/data/subjects'
import { loadAllReserved, loadedReservedEntries } from '../src/data/reservedQuestions'
await loadAllReserved()
const by: Record<string, Set<string>> = {}
for (const s of subjects) for (const t of s.topics) for (const q of t.questions) (by[s.slug] ??= new Set()).add((q.tags ?? []).slice(0, 2).join('/') || q.text.slice(0, 30))
for (const e of loadedReservedEntries()) (by[e.subject] ??= new Set()).add((e.question.tags ?? []).slice(0, 2).join('/'))
for (const [k, v] of Object.entries(by)) console.log(`## ${k} (${v.size})\n${[...v].sort().join('; ')}`)
