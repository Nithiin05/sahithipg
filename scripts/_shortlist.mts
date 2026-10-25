const pack = process.argv[2]
const raw = await import(`../src/data/questions/fullLength/${pack}.ts`)
const rows: [number, string][] = []
for (const e of raw[pack]) { const o = e.question.options; const l = o.map((x: string) => x.length); const mn = Math.min(...l.slice(1)); if (l[0] < mn) rows.push([l[0] / mn, `${e.question.id} [min ${mn}] ${o[0]}`]) }
rows.sort((a, b) => a[0] - b[0]); for (const r of rows) console.log(r[1]); console.log('count', rows.length)
