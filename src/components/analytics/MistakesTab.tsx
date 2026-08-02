import { useMemo, useState } from 'react'
import QuestionCard from '../QuestionCard'
import AdHocQuiz from '../AdHocQuiz'
import { getMistakes } from '../../lib/mistakes'
import { findQuestionItem } from '../../lib/quizEngine'

export default function MistakesTab() {
  const [reviewing, setReviewing] = useState(false)

  const mistakes = useMemo(() => getMistakes(), [reviewing])

  const rows = useMemo(
    () =>
      mistakes
        .map((m) => ({ mistake: m, item: findQuestionItem(m.questionId) }))
        .filter((r): r is { mistake: (typeof mistakes)[number]; item: NonNullable<ReturnType<typeof findQuestionItem>> } => r.item !== null),
    [mistakes],
  )

  const reattemptItems = useMemo(() => rows.map((r) => r.item), [rows])

  if (reviewing) {
    return <AdHocQuiz items={reattemptItems} label="Mistake Notebook" onExit={() => setReviewing(false)} />
  }

  if (rows.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="font-display font-bold text-lg mb-2">No open mistakes</p>
        <p className="text-muted-foreground">
          Every question you've answered incorrectly shows up here automatically until you get it right.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-muted-foreground">{rows.length} question{rows.length === 1 ? '' : 's'} to revisit</p>
        <button
          onClick={() => setReviewing(true)}
          className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold hover:opacity-90"
        >
          Reattempt all
        </button>
      </div>
      <div className="flex flex-col gap-5">
        {rows.map(({ mistake, item }, i) => (
          <div key={mistake.questionId}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5 text-xs text-muted-foreground">
              <span>{item.subjectName} · {item.topic}</span>
              <span>Attempted {new Date(mistake.date).toLocaleDateString()}</span>
            </div>
            <QuestionCard
              question={item.question}
              index={i}
              total={rows.length}
              selectedIndex={mistake.selectedIndex}
              showResult
            />
          </div>
        ))}
      </div>
    </div>
  )
}
