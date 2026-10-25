/** Lists questions in a pack where the correct option is the uniquely longest. npx tsx scripts/length-cues.ts gt4 [minRatio] */
import { loadAllReserved, loadedReservedEntries } from '../src/data/reservedQuestions'
const [pack, min = '1.0'] = process.argv.slice(2)
await loadAllReserved()
const raw = await import(`../src/data/questions/fullLength/${pack}.ts`)
const entries = raw[pack] as { question: { id: string; options: string[] } }[]
let n = 0
for (const e of entries) {
  const o = e.question.options // authoring order: correct first
  const l = o.map((x) => x.length)
  const other = Math.max(...l.slice(1))
  if (l[0] > other && l[0] / other >= Number(min)) {
    n++
    console.log(`${e.question.id} ${(l[0] / other).toFixed(2)} | ✔ ${o[0]} | ✘ ${o.slice(1).join(' || ')}`)
  }
}
console.log(`count ${n}/${entries.length}`)
void loadedReservedEntries
