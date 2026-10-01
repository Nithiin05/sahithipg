import { subjects } from '../data/subjects'
import { syllabus } from '../data/syllabus'
import { pooledAllSubjectsQuestions } from './quizEngine'
import { getBookmarks } from './bookmarks'
import { sourceTypeOf } from './questionSource'
import { isClinical } from '../data/taxonomy'

export type ResultGroup = 'Subjects' | 'Syllabus' | 'Topics' | 'PYQs' | 'Image questions' | 'Clinical questions' | 'Questions' | 'Your notes'

export interface SearchResult {
  group: ResultGroup
  title: string
  subtitle?: string
  to: string
  score: number
}

interface Doc {
  group: ResultGroup
  title: string
  subtitle?: string
  to: string
  /** Primary text (weighted higher) and secondary text. */
  primary: string
  secondary: string
}

let staticDocs: Doc[] | null = null

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9+]+/g, ' ')

function buildStatic(): Doc[] {
  const docs: Doc[] = []
  for (const s of subjects) {
    docs.push({ group: 'Subjects', title: s.name, subtitle: s.category, to: `/subjects/${s.slug}`, primary: norm(`${s.name} ${s.shortName}`), secondary: norm(s.description) })
    for (const t of s.topics) {
      docs.push({ group: 'Topics', title: t.name, subtitle: s.name, to: `/subjects/${s.slug}/${t.id}`, primary: norm(t.name), secondary: norm(t.description) })
    }
    for (const m of syllabus[s.slug] ?? []) {
      docs.push({
        group: 'Syllabus',
        title: `${s.shortName} → ${m.name}`,
        subtitle: m.focus.map((f) => f.name).join(', ') || undefined,
        to: `/subjects/${s.slug}`,
        primary: norm(m.name),
        secondary: norm(m.focus.map((f) => f.name).join(' ')),
      })
    }
  }
  for (const it of pooledAllSubjectsQuestions()) {
    const q = it.question
    const src = sourceTypeOf(q)
    const group: ResultGroup = src === 'PYQ' || src === 'PYQ_PATTERN' ? 'PYQs' : q.imageUrl ? 'Image questions' : isClinical(q) ? 'Clinical questions' : 'Questions'
    docs.push({
      group,
      title: q.text.length > 120 ? `${q.text.slice(0, 117)}…` : q.text,
      subtitle: `${it.subjectName} · ${it.topic}`,
      to: `/question/${q.id}`,
      primary: norm(`${q.text} ${(q.tags ?? []).join(' ')} ${q.imageCaption ?? ''}`),
      secondary: norm(`${q.options.join(' ')} ${q.explanation} ${q.clinicalPearl ?? ''} ${q.highYieldNote ?? ''} ${it.topic}`),
    })
  }
  return docs
}

const GROUP_ORDER: ResultGroup[] = ['Subjects', 'Syllabus', 'Topics', 'Your notes', 'PYQs', 'Clinical questions', 'Image questions', 'Questions']

/** All query words must appear (as word prefixes); matches in titles/stems score higher than in explanations. */
export function search(query: string, perGroup = 5): SearchResult[] {
  const words = norm(query).split(' ').filter((w) => w.length > 0)
  if (!words.length) return []
  staticDocs ??= buildStatic()
  const notes: Doc[] = getBookmarks()
    .filter((b) => b.note)
    .map((b) => ({ group: 'Your notes' as const, title: b.note!, subtitle: 'Bookmark note', to: `/question/${b.questionId}`, primary: norm(b.note!), secondary: '' }))

  const results: SearchResult[] = []
  for (const d of [...staticDocs, ...notes]) {
    let score = 0
    let ok = true
    for (const w of words) {
      const re = new RegExp(`(^| )${w.replace(/[+]/g, '\\+')}`)
      if (re.test(d.primary)) score += 3
      else if (re.test(d.secondary)) score += 1
      else {
        ok = false
        break
      }
    }
    if (ok) results.push({ group: d.group, title: d.title, subtitle: d.subtitle, to: d.to, score })
  }
  const out: SearchResult[] = []
  for (const g of GROUP_ORDER) {
    out.push(...results.filter((r) => r.group === g).sort((a, b) => b.score - a.score).slice(0, perGroup))
  }
  return out
}
