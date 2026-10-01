import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FolderPlus, Trash2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { getBookmarks, getCollections, createCollection, deleteCollection, removeBookmark } from '../lib/bookmarks'
import { findQuestionItem } from '../lib/quizEngine'
import { sessionUrl } from '../lib/testEngine'

const ALL = '__all__'
const NOTES = '__notes__'

export default function Bookmarks() {
  const [tick, setTick] = useState(0)
  const [view, setView] = useState(ALL)
  const [newName, setNewName] = useState('')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const bookmarks = useMemo(() => getBookmarks(), [tick])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const collections = useMemo(() => getCollections(), [tick])
  const refresh = () => setTick((t) => t + 1)

  const shown = bookmarks.filter((b) => (view === ALL ? true : view === NOTES ? !!b.note : b.collections?.includes(view)))
  const rows = shown.map((b) => ({ b, item: findQuestionItem(b.questionId) })).filter((r) => r.item)
  const title = view === ALL ? 'All bookmarks' : view === NOTES ? 'With notes' : view

  return (
    <div className="pb-20">
      <PageHeader eyebrow="Bookmarks" title="Bookmarks & collections" description="Save questions, add personal notes and group them into collections like “My Cardiology Mistakes” or “Important Images”." />
      <div className="max-w-6xl mx-auto px-6 grid gap-6 lg:grid-cols-[240px_1fr] items-start">
        <aside className="card p-2 flex flex-col gap-1">
          {[
            [ALL, 'All bookmarks', bookmarks.length],
            [NOTES, 'With notes', bookmarks.filter((b) => b.note).length],
          ].map(([k, label, n]) => (
            <button
              key={k as string}
              onClick={() => setView(k as string)}
              className={`flex justify-between px-3 py-2 rounded-lg text-sm ${view === k ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:bg-secondary'}`}
            >
              {label} <span className="text-xs tabular-nums">{n}</span>
            </button>
          ))}
          <p className="px-3 pt-3 pb-1 text-xs uppercase tracking-wide text-muted-foreground font-semibold">Collections</p>
          {collections.map((c) => (
            <div key={c} className="flex items-center group">
              <button
                onClick={() => setView(c)}
                className={`flex-1 flex justify-between px-3 py-2 rounded-lg text-sm text-left ${view === c ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:bg-secondary'}`}
              >
                <span className="truncate">{c}</span>
                <span className="text-xs tabular-nums">{bookmarks.filter((b) => b.collections?.includes(c)).length}</span>
              </button>
              <button
                aria-label={`Delete collection ${c}`}
                onClick={() => {
                  if (window.confirm(`Delete the collection "${c}"? Questions stay bookmarked.`)) {
                    deleteCollection(c)
                    if (view === c) setView(ALL)
                    refresh()
                  }
                }}
                className="p-2 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-danger"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <form
            className="flex gap-1 px-2 py-2"
            onSubmit={(e) => {
              e.preventDefault()
              createCollection(newName)
              setNewName('')
              refresh()
            }}
          >
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New collection"
              aria-label="New collection name"
              className="flex-1 min-w-0 border border-border rounded-lg px-2 py-1.5 text-sm bg-surface"
            />
            <button aria-label="Create collection" className="px-2 text-muted-foreground hover:text-primary">
              <FolderPlus size={16} />
            </button>
          </form>
        </aside>

        <section className="card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="font-semibold">
              {title} <span className="text-muted-foreground font-normal">({rows.length})</span>
            </h2>
            {rows.length > 0 && (
              <Link
                to={sessionUrl(rows.slice(0, 100).map((r) => r.b.questionId), `Review: ${title}`, 'revision')}
                className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold"
              >
                Review {Math.min(100, rows.length)}
              </Link>
            )}
          </div>
          {rows.length === 0 ? (
            <p className="text-sm rounded-lg bg-secondary px-4 py-3">
              Nothing here yet. Use the bookmark icon on any question, or open a question and add it to a collection.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {rows.map(({ b, item }) => (
                <li key={b.questionId} className="py-3 flex gap-3 items-start">
                  <span className="tag bg-secondary text-muted-foreground shrink-0">{item!.subjectName}</span>
                  <div className="flex-1 min-w-0">
                    <Link to={`/question/${b.questionId}`} className="text-sm hover:text-primary line-clamp-2">
                      {item!.question.text}
                    </Link>
                    {b.note && <p className="text-xs mt-1 rounded bg-warning-bg px-2 py-1 text-foreground/80">Note: {b.note}</p>}
                    {!!b.collections?.length && <p className="text-xs text-muted-foreground mt-1">{b.collections.join(' · ')}</p>}
                  </div>
                  <button
                    aria-label="Remove bookmark"
                    onClick={() => {
                      removeBookmark(b.questionId)
                      refresh()
                    }}
                    className="p-1 text-muted-foreground hover:text-danger shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
