export default function QuestionPalette({
  count,
  currentIndex,
  answeredMask,
  markedMask,
  onJump,
  disabledMask,
  startNumber = 1,
  title = 'Questions',
}: {
  count: number
  currentIndex: number
  answeredMask: boolean[]
  /** Which question indices are marked for review — optional, omit to hide the affordance. */
  markedMask?: boolean[]
  onJump: (i: number) => void
  /** Questions that can no longer be visited (navigation rules). */
  disabledMask?: boolean[]
  /** Number shown on the first button (for multi-section palettes). */
  startNumber?: number
  title?: string
}) {
  return (
    <div className="card p-4">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">{title}</p>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: count }).map((_, i) => {
          const isCurrent = i === currentIndex
          const isAnswered = answeredMask[i]
          const isMarked = markedMask?.[i]
          let classes = 'bg-secondary text-muted-foreground'
          if (isAnswered) classes = 'bg-success text-white'
          if (isCurrent) classes = 'bg-primary text-primary-foreground ring-2 ring-primary/30'
          if (isMarked && !isCurrent) classes += ' ring-2 ring-warning'
          const disabled = !!disabledMask?.[i] && !isCurrent
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onJump(i)}
              aria-label={`Question ${startNumber + i}${isAnswered ? ', answered' : ''}${isMarked ? ', marked for review' : ''}`}
              className={`h-9 rounded-md text-xs font-semibold transition-colors ${classes} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {startNumber + i}
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
