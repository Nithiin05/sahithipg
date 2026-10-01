import type { SubjectSlug } from '../types'

const KEY = 'drsahithi:bookmarks'

export interface BookmarkEntry {
  questionId: string
  subject: SubjectSlug
  bookmarkedAt: string
  /** Personal note. */
  note?: string
  /** Named collections, e.g. "My Cardiology Mistakes". */
  collections?: string[]
}

function read(): BookmarkEntry[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as BookmarkEntry[]) : []
  } catch {
    return []
  }
}

function write(entries: BookmarkEntry[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries))
  } catch {
    // ignore storage errors
  }
}

export function getBookmarks(): BookmarkEntry[] {
  return read().sort((a, b) => new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime())
}

export function isBookmarked(questionId: string): boolean {
  return read().some((b) => b.questionId === questionId)
}

export function toggleBookmark(questionId: string, subject: SubjectSlug): boolean {
  const entries = read()
  const idx = entries.findIndex((b) => b.questionId === questionId)
  if (idx >= 0) {
    entries.splice(idx, 1)
    write(entries)
    return false
  }
  entries.push({ questionId, subject, bookmarkedAt: new Date().toISOString() })
  write(entries)
  return true
}

export function removeBookmark(questionId: string) {
  write(read().filter((b) => b.questionId !== questionId))
}

// ---------------------------------------------------------------------------
// Notes & collections
// ---------------------------------------------------------------------------

const COLLECTIONS_KEY = 'inicet:bookmark-collections'

export function getBookmark(questionId: string): BookmarkEntry | undefined {
  return read().find((b) => b.questionId === questionId)
}

function upsert(questionId: string, subject: SubjectSlug, patch: Partial<BookmarkEntry>) {
  const entries = read()
  const e = entries.find((b) => b.questionId === questionId)
  if (e) Object.assign(e, patch)
  else entries.push({ questionId, subject, bookmarkedAt: new Date().toISOString(), ...patch })
  write(entries)
}

/** Saving a note bookmarks the question if it isn't already. */
export function setBookmarkNote(questionId: string, subject: SubjectSlug, note: string) {
  upsert(questionId, subject, { note: note.trim() || undefined })
}

export function getCollections(): string[] {
  try {
    const saved = JSON.parse(localStorage.getItem(COLLECTIONS_KEY) ?? '[]') as string[]
    const used = read().flatMap((b) => b.collections ?? [])
    return [...new Set([...saved, ...used])].sort((a, b) => a.localeCompare(b))
  } catch {
    return []
  }
}

export function createCollection(name: string): string[] {
  const n = name.trim().slice(0, 40)
  if (!n) return getCollections()
  try {
    const saved = JSON.parse(localStorage.getItem(COLLECTIONS_KEY) ?? '[]') as string[]
    if (!saved.includes(n)) localStorage.setItem(COLLECTIONS_KEY, JSON.stringify([...saved, n]))
  } catch {
    // ignore
  }
  return getCollections()
}

export function deleteCollection(name: string): string[] {
  try {
    const saved = (JSON.parse(localStorage.getItem(COLLECTIONS_KEY) ?? '[]') as string[]).filter((c) => c !== name)
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(saved))
    const entries = read()
    for (const e of entries) if (e.collections) e.collections = e.collections.filter((c) => c !== name)
    write(entries)
  } catch {
    // ignore
  }
  return getCollections()
}

/** Add/remove a question from a collection (bookmarking it if needed). */
export function toggleInCollection(questionId: string, subject: SubjectSlug, name: string) {
  const cur = getBookmark(questionId)?.collections ?? []
  upsert(questionId, subject, { collections: cur.includes(name) ? cur.filter((c) => c !== name) : [...cur, name] })
}
