/** Prints first tags of every question grouped by subject id, for avoiding repeats. */
import { subjects } from '../src/data/subjects'
import { loadAllReserved, loadedReservedEntries } from '../src/data/reservedQuestions'
await loadAllReserved()
const by = new Map<string, string[]>()
const add = (s: string, t?: string) => { if (!t) return; if (!by.has(s)) by.set(s, []); by.get(s)!.push(t) }
for (const s of subjects) for (const t of s.topics) for (const q of t.questions) add(s.id, q.tags?.[0])
for (const e of loadedReservedEntries()) add((e as any).subject ?? e.question.id.split('-')[1], e.question.tags?.[0])
const want = process.argv.slice(2)
for (const [s, ts] of by) if (!want.length || want.includes(s)) console.log(`== ${s} (${ts.length})\n` + [...new Set(ts)].sort().join(' '))
