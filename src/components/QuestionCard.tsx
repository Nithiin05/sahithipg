import type { Question } from '../types'

const LETTERS = ['A', 'B', 'C', 'D']

export default function QuestionCard({
  question,
  index,
  total,
  selectedIndex,
  onSelect,
  showResult = false,
  bookmarked,
  onToggleBookmark,
}: {
  question: Question
  index: number
  total: number
  selectedIndex: number | null | undefined
  onSelect?: (i: number) => void
  showResult?: boolean
  /** Omit to hide the bookmark affordance entirely. */
  bookmarked?: boolean
  onToggleBookmark?: () => void
}) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Question {index + 1} of {total}
        </span>
        {onToggleBookmark && (
          <button
            type="button"
            onClick={onToggleBookmark}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this question'}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark this question'}
            className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
              bookmarked ? 'text-warning bg-warning-bg' : 'text-muted-foreground hover:bg-secondary'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
      <p className="whitespace-pre-line font-medium mb-6" style={{ lineHeight: 1.7 }}>
        {question.text}
      </p>

      <div className="flex flex-col gap-2.5">
        {question.options.map((option, i) => {
          const isSelected = selectedIndex === i
          const isCorrectOption = i === question.correctIndex

          let stateClass = 'border-border hover:border-primary/40 hover:bg-secondary'
          if (showResult) {
            if (isCorrectOption) stateClass = 'border-success bg-success-bg'
            else if (isSelected && !isCorrectOption) stateClass = 'border-danger bg-danger-bg'
            else stateClass = 'border-border opacity-70'
          } else if (isSelected) {
            stateClass = 'border-primary bg-primary/5'
          }

          return (
            <button
              key={i}
              type="button"
              disabled={showResult}
              onClick={() => onSelect?.(i)}
              className={`flex items-center gap-3 text-left rounded-lg border px-4 py-3 text-sm transition-colors duration-150 ${stateClass} ${
                showResult ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 ${
                  isSelected || (showResult && isCorrectOption)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                } ${showResult && isCorrectOption ? '!bg-success !text-white' : ''} ${
                  showResult && isSelected && !isCorrectOption ? '!bg-danger !text-white' : ''
                }`}
              >
                {LETTERS[i]}
              </span>
              <span>{option}</span>
            </button>
          )
        })}
      </div>

      {showResult && (
        <div className="mt-5 rounded-lg bg-secondary px-4 py-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Explanation: </span>
          {question.explanation}
        </div>
      )}
    </div>
  )
}
