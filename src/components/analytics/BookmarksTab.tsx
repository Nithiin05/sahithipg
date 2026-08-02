import { useMemo, useState } from 'react'
import QuestionCard from '../QuestionCard'
import AdHocQuiz from '../AdHocQuiz'
import { getBookmarks, toggleBookmark } from '../../lib/bookmarks'
import { findQuestionItem } from '../../lib/quizEngine'

export default function BookmarksTab() {
  const [tick, setTick] = useState(0)
  const [reviewing, setReviewing] = useState(false)

  const items = useMemo(() => {
    return getBookmarks()
      .map((b) => findQuestionItem(b.questionId))
      .filter((it): it is NonNullable<typeof it> => it !== null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick])

  if (reviewing) {
    return <AdHocQuiz items={items} label="Bookmarked Questions" onExit={() => setReviewing(false)} />
  }

  if (items.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="font-display font-bold text-lg mb-2">No bookmarks yet</p>
        <p className="text-muted-foreground">
          Tap the star icon on any question while practicing to save it here for later review.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-muted-foreground">{items.length} bookmarked question{items.length === 1 ? '' : 's'}</p>
        <button
          onClick={() => setReviewing(true)}
          className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold hover:opacity-90"
        >
          Reattempt all
        </button>
      </div>
      <div className="flex flex-col gap-5">
        {items.map((item, i) => (
          <div key={item.question.id}>
            <p className="text-xs text-muted-foreground mb-1.5">{item.subjectName} · {item.topic}</p>
            <QuestionCard
              question={item.question}
              index={i}
              total={items.length}
              selectedIndex={null}
              showResult
              bookmarked
              onToggleBookmark={() => {
                toggleBookmark(item.question.id, item.subject)
                setTick((t) => t + 1)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
