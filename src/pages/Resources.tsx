import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { books, bookLinkTarget } from '../data/resources'
import { resourceGroups } from '../data/learningHub'

const BOOK_FILTERS = ['All', 'Quant', 'Reasoning', 'English', 'General Awareness', 'Previous Papers'] as const

function YouTubeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  )
}

function VideoHub() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {resourceGroups.map((group) => (
        <div key={group.id} className="card p-5 flex flex-col">
          <h3 className="font-display font-bold text-lg mb-1">{group.title}</h3>
          <p className="text-sm text-muted-foreground mb-4" style={{ lineHeight: 1.6 }}>
            {group.description}
          </p>
          <div className="flex flex-col gap-2 mt-auto">
            {group.resources.map((r) => (
              <a
                key={r.label}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-lg border border-border px-3.5 py-2.5 text-sm hover:border-primary/40 hover:bg-secondary/60 transition-colors"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="w-6 h-6 rounded-md bg-danger-bg text-danger flex items-center justify-center shrink-0">
                    <YouTubeIcon />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium truncate">{r.label}</span>
                    {r.creator && <span className="block text-xs text-muted-foreground truncate">{r.creator}</span>}
                  </span>
                </span>
                <span className="flex items-center gap-1.5 shrink-0">
                  {r.recommended && <span className="tag bg-warning-bg text-warning">&#9733; Recommended</span>}
                  <span className="text-muted-foreground">&rarr;</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function BookLibrary() {
  const [filter, setFilter] = useState<(typeof BOOK_FILTERS)[number]>('All')

  const filtered = useMemo(
    () => (filter === 'All' ? books : books.filter((b) => b.subject === filter)),
    [filter]
  )

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {BOOK_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`tag border transition-colors ${
              filter === f ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:bg-secondary'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {filtered.map((book) => {
          const target = bookLinkTarget(book)
          return (
            <div key={book.title} className="card p-5 flex flex-col">
              <span className="tag bg-secondary text-muted-foreground w-fit mb-3">{book.subject}</span>
              <h3 className="font-display font-bold mb-1">{book.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">by {book.author}</p>
              <p className="text-sm text-muted-foreground flex-1" style={{ lineHeight: 1.6 }}>
                {book.description}
              </p>
              <a
                href={target.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                {target.internal ? 'Open PDF' : 'Find this book'} &rarr;
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const TABS = [
  { key: 'videos', label: 'Video Learning Hub' },
  { key: 'books', label: 'Book Library' },
] as const

export default function Resources() {
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('videos')

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Resources"
        title="The SSC CGL learning hub"
        description="Curated YouTube educators and playlists organized by subject, plus the standard books most toppers use."
      />

      <div className="max-w-5xl mx-auto px-6">
        <div className="inline-flex bg-secondary rounded-lg p-1 gap-1 mb-8">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-150 ${
                tab === t.key ? 'bg-surface text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'videos' ? <VideoHub /> : <BookLibrary />}

        <p className="text-xs text-muted-foreground mt-10 text-center">
          These are independent, third-party educators and channels — not affiliated with One9. Always verify a
          channel is currently active before committing to a full course.
        </p>
      </div>
    </div>
  )
}
