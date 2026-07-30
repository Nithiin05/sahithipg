export default function QuestionPalette({
  count,
  currentIndex,
  answeredMask,
  markedMask,
  onJump,
}: {
  count: number
  currentIndex: number
  answeredMask: boolean[]
  /** Which question indices are marked for review — optional, omit to hide the affordance. */
  markedMask?: boolean[]
  onJump: (i: number) => void
}) {
  return (
    <div className="card p-4">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Questions</p>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: count }).map((_, i) => {
          const isCurrent = i === currentIndex
          const isAnswered = answeredMask[i]
          const isMarked = markedMask?.[i]
          let classes = 'bg-secondary text-muted-foreground'
          if (isAnswered) classes = 'bg-success text-white'
          if (isCurrent) classes = 'bg-primary text-primary-foreground ring-2 ring-primary/30'
          if (isMarked && !isCurrent) classes += ' ring-2 ring-warning'
          return (
            <button
              key={i}
              type="button"
              onClick={() => onJump(i)}
              className={`h-9 rounded-md text-xs font-semibold transition-colors ${classes}`}
            >
              {i + 1}
            </button>
          )
        })}
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-success inline-block" /> Answered
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-secondary inline-block" /> Unanswered
        </span>
        {markedMask && (
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-secondary inline-block ring-2 ring-warning" /> Marked for review
          </span>
        )}
      </div>
    </div>
  )
}
