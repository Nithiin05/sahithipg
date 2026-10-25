const [pack, min = '1.0'] = process.argv.slice(2)
const raw = await import(`../src/data/questions/fullLength/${pack}.ts`)
const rows: [number, string][] = []
for (const e of raw[pack]) { const o = e.question.options; const l = o.map((x: string) => x.length); const m = Math.max(...l.slice(1)); if (l[0] > m && l[0] / m >= Number(min)) rows.push([l[0] / m, `${e.question.id} [max ${m}] ${o[0]}`]) }
rows.sort((a, b) => b[0] - a[0]); for (const r of rows) console.log(r[1]); console.log('count', rows.length)
