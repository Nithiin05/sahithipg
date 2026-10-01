import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FolderPlus, RotateCcw } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import QuestionCard from '../components/QuestionCard'
import { findQuestionItem } from '../lib/quizEngine'
import { getBookmark, getCollections, isBookmarked, setBookmarkNote, toggleBookmark, toggleInCollection, createCollection } from '../lib/bookmarks'
import { isQueued, toggleRevision } from '../lib/revisionQueue'

/** A single question: answer it, see the explanation, bookmark, note, collect, or queue for revision. */
export default function QuestionView() {
  const { questionId = '' } = useParams()
  const item = findQuestionItem(questionId)
  const [selected, setSelected] = useState<number | null>(null)
  const [, setTick] = useState(0)
  const [note, setNote] = useState(() => getBookmark(questionId)?.note ?? '')
  const [newCol, setNewCol] = useState('')
  const refresh = () => setTick((t) => t + 1)

  if (!item) {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <p className="font-display font-bold text-lg mb-2">Question not found</p>
        <Link to="/question-bank" className="text-primary font-semibold hover:underline">
          Go to the Question Bank
        </Link>
      </div>
    )
  }
  const q = item.question
  const mine = getBookmark(q.id)?.collections ?? []
  const queued = isQueued(q.id)

  return (
    <div className="pb-20">
      <PageHeader eyebrow={`${item.subjectName} · ${item.topic}`} title="Question" />
      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-5">
        <QuestionCard
          question={q}
          index={0}
          total={1}
          selectedIndex={selected}
          onSelect={setSelected}
          showResult={selected !== null}
          bookmarked={isBookmarked(q.id)}
          onToggleBookmark={() => {
            toggleBookmark(q.id, item.subject)
            refresh()
          }}
        />
        {selected !== null && (
          <button
            onClick={() => setSelected(null)}
            className="self-start text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg px-4 py-2"
          >
            Try again
          </button>
        )}

        <div className="card p-5 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                toggleRevision(q.id, item.subject)
                refresh()
              }}
              className={`text-sm font-semibold inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${queued ? 'border-primary text-primary bg-primary/5' : 'border-border hover:bg-secondary'}`}
            >
              <RotateCcw size={14} /> {queued ? 'In revision queue' : 'Revise again'}
            </button>
          </div>
          <label className="text-sm font-semibold flex flex-col gap-1.5">
            Personal note
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onBlur={() => {
                setBookmarkNote(q.id, item.subject, note)
                refresh()
              }}
              rows={3}
              placeholder="e.g. Remember: delta wave = pre-excitation; never give AV-nodal blockers in pre-excited AF"
              className="border border-border rounded-lg px-3 py-2 bg-surface font-normal text-sm"
            />
            <span className="text-xs text-muted-foreground font-normal">Saved when you click away. Adding a note bookmarks the question.</span>
          </label>
          <div>
            <p className="text-sm font-semibold mb-2">Collections</p>
            <div className="flex flex-wrap gap-2">
              {getCollections().map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    toggleInCollection(q.id, item.subject, c)
                    refresh()
                  }}
                  className={`tag border ${mine.includes(c) ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}
                >
                  {c}
                </button>
              ))}
              <form
                className="inline-flex gap-1"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!newCol.trim()) return
                  createCollection(newCol)
                  toggleInCollection(q.id, item.subject, newCol.trim())
                  setNewCol('')
                  refresh()
                }}
              >
                <input
                  value={newCol}
                  onChange={(e) => setNewCol(e.target.value)}
                  placeholder="New collection"
                  className="border border-border rounded-lg px-2 py-1 text-xs bg-surface w-36"
                  aria-label="New collection name"
                />
                <button className="text-muted-foreground hover:text-primary" aria-label="Create collection">
                  <FolderPlus size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
