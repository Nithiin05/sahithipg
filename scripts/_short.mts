const pack = process.argv[2]
const raw = await import(`../src/data/questions/fullLength/${pack}.ts`)
let n = 0
for (const e of raw[pack]) { const l = e.question.options.map((x: string) => x.length); if (l[0] < Math.min(...l.slice(1))) n++ }
console.log(`${pack}: correct uniquely shortest ${n}/${raw[pack].length}`)
