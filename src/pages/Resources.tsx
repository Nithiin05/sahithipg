import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { books, bookLinkTarget } from '../data/resources'
import { resourceGroups, additionalHubs } from '../data/learningHub'
import { getAllHighYieldItems } from '../lib/highYield'
import { Lightbulb, Sparkles, PlayCircle } from 'lucide-react'

const BOOK_FILTER_ALL = 'All'

function VideoHub() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {[...resourceGroups, ...additionalHubs].map((group) => (
        <div key={group.id} className="card gradient-card p-5 flex flex-col">
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
                    <PlayCircle size={14} />
                  </span>
                  <span className="min-w-0 truncate font-medium">{r.label}</span>
                </span>
                <span className="flex items-center gap-1.5 shrink-0">
                  {r.recommended && <span className="tag bg-warning-bg text-warning">&#9733; Search</span>}
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
  const filters = [BOOK_FILTER_ALL, ...new Set(books.map((b) => b.subject))]
  const [filter, setFilter] = useState<string>(BOOK_FILTER_ALL)

  const filtered = useMemo(() => (filter === BOOK_FILTER_ALL ? books : books.filter((b) => b.subject === filter)), [filter])

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
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

function FlashcardsOneLiners() {
  const items = useMemo(() => getAllHighYieldItems(), [])
  const [flippedId, setFlippedId] = useState<string | null>(null)

  if (items.length === 0) {
    return <div className="card p-10 text-center text-muted-foreground">No flashcards yet — check back as more questions are added.</div>
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6">
        {items.length} high-yield one-liners &amp; clinical pearls, pulled directly from the question bank. Tap a
        card to flip it.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const flipped = flippedId === item.id
          return (
            <button
              key={item.id}
              onClick={() => setFlippedId(flipped ? null : item.id)}
              className="card card-hover text-left p-5 min-h-[140px] flex flex-col"
            >
              <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                {item.kind === 'pearl' ? <Lightbulb size={13} className="text-warning" /> : <Sparkles size={13} className="text-primary" />}
                {item.subjectName} · {item.topic}
              </span>
              <span className="text-sm flex-1" style={{ lineHeight: 1.6 }}>
                {flipped ? item.text : 'Tap to reveal'}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const TABS = [
  { key: 'videos', label: 'Video Learning Hub' },
  { key: 'books', label: 'Book Library' },
  { key: 'flashcards', label: 'Flashcards & One-Liners' },
] as const

export default function Resources() {
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('videos')

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Resources"
        title="The NEET PG learning hub"
        description="Standard textbook references, subject-wise video search hubs, and flashcards built from the question bank's clinical pearls."
      />

      <div className="max-w-5xl mx-auto px-6">
        <div className="inline-flex bg-secondary rounded-lg p-1 gap-1 mb-8 flex-wrap">
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

        {tab === 'videos' && <VideoHub />}
        {tab === 'books' && <BookLibrary />}
        {tab === 'flashcards' && <FlashcardsOneLiners />}

        <p className="text-xs text-muted-foreground mt-10 text-center">
          Video links are search results, not endorsements of any specific channel — always verify a source is
          currently active and accurate. Textbooks listed are standard references widely used in Indian medical
          education, not affiliated with this platform.
        </p>
      </div>
    </div>
  )
}
