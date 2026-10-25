const [pack, lvl] = process.argv.slice(2)
const raw = await import(`/home/claude/sahithipg/src/data/questions/fullLength/${pack}.ts`)
for (const e of raw[pack]) if (e.question.difficulty === lvl) console.log(e.question.id, '|', e.question.text.slice(0, 90))
