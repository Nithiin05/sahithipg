import { useState } from 'react'
import { Bookmark, Lightbulb, Maximize2, Sparkles, X } from 'lucide-react'
import type { Question } from '../types'

const LETTERS = ['A', 'B', 'C', 'D']

const TYPE_LABELS: Record<string, string> = {
  'clinical-case': 'Clinical Case',
  image: 'Image Based',
  radiology: 'Radiology',
  ecg: 'ECG',
  histopath: 'Histopathology',
  'anatomy-image': 'Anatomy Image',
  instrument: 'Instrument ID',
  'assertion-reason': 'Assertion & Reason',
  'match-following': 'Match the Following',
  guideline: 'Guideline Based',
  aiims: 'AIIMS Pattern',
  inicet: 'INI-CET Pattern',
}

function ImageViewer({ src, alt, onClose }: { src: string; alt?: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6" onClick={onClose}>
      <button className="absolute top-5 right-5 text-white/80 hover:text-white" onClick={onClose} aria-label="Close">
        <X size={28} />
      </button>
      <img src={src} alt={alt ?? ''} className="max-w-full max-h-full rounded-lg" onClick={(e) => e.stopPropagation()} />
    </div>
  )
}

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
  const [zoomed, setZoomed] = useState(false)
  const typeLabel = question.type && question.type !== 'standard' ? TYPE_LABELS[question.type] : undefined

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Question {index + 1} of {total}
          </span>
          {typeLabel && <span className="tag bg-accent/10 text-accent font-semibold">{typeLabel}</span>}
          {question.difficulty && <span className="tag bg-secondary text-muted-foreground">{question.difficulty}</span>}
          {question.isPYQ && <span className="tag bg-primary/10 text-primary font-semibold">PYQ-style{question.year ? ` · ${question.year}` : ''}</span>}
        </div>
        {onToggleBookmark && (
          <button
            type="button"
            onClick={onToggleBookmark}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this question'}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark this question'}
            className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors shrink-0 ${
              bookmarked ? 'text-warning bg-warning-bg' : 'text-muted-foreground hover:bg-secondary'
            }`}
          >
            <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      <p className="whitespace-pre-line font-medium mb-4" style={{ lineHeight: 1.7 }}>
        {question.text}
      </p>

      {question.imageUrl && (
        <div className="relative mb-6 inline-block">
          <img
            src={question.imageUrl}
            alt={question.imageAlt ?? 'Question image'}
            className="max-w-full rounded-lg border border-border cursor-zoom-in"
            onClick={() => setZoomed(true)}
          />
          <button
            type="button"
            onClick={() => setZoomed(true)}
            className="absolute bottom-2 right-2 bg-black/60 text-white rounded-md p-1.5 hover:bg-black/80"
            aria-label="Zoom image"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      )}
      {zoomed && question.imageUrl && (
        <ImageViewer src={question.imageUrl} alt={question.imageAlt} onClose={() => setZoomed(false)} />
      )}

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
        <div className="mt-5 flex flex-col gap-3">
          <div className="rounded-lg bg-secondary px-4 py-3 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Explanation: </span>
            {question.explanation}
            {question.reference && <p className="mt-2 text-xs italic">Reference: {question.reference}</p>}
          </div>
          {question.clinicalPearl && (
            <div className="rounded-lg bg-warning-bg px-4 py-3 text-sm flex gap-2.5">
              <Lightbulb size={16} className="text-warning shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-warning">Clinical Pearl: </span>
                <span className="text-foreground/90">{question.clinicalPearl}</span>
              </div>
            </div>
          )}
          {question.highYieldNote && (
            <div className="rounded-lg bg-primary/5 px-4 py-3 text-sm flex gap-2.5">
              <Sparkles size={16} className="text-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-primary">High-Yield Note: </span>
                <span className="text-foreground/90">{question.highYieldNote}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
