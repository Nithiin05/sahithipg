import type { SubjectSlug } from '../types'

const KEY = 'one9:bookmarks'

export interface BookmarkEntry {
  questionId: string
  subject: SubjectSlug
  bookmarkedAt: string
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
