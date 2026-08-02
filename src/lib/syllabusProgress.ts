/**
 * Tracks which topics a student has manually marked "reviewed" — powers the
 * completion % shown on each Subject's topic list. Keyed by `${subjectSlug}:${topicId}`.
 */
const KEY = 'drsahithi:topic-progress'

function read(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function write(data: Record<string, boolean>) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    // ignore storage errors (e.g. private browsing)
  }
}

export function getSyllabusProgress(): Record<string, boolean> {
  return read()
}

export function toggleSyllabusItem(id: string): Record<string, boolean> {
  const data = read()
  data[id] = !data[id]
  write(data)
  return data
}

export function resetSyllabusProgress() {
  write({})
}
