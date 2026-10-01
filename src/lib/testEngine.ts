import type { Difficulty, MockTestKind, SubjectSlug } from '../types'
import { examConfig, markingLabel, type NavigationRule } from '../config/examConfig'
import { subjects, getSubject } from '../data/subjects'
import { SYSTEMS, inCategory, systemOf, type QuestionCategory, type SystemName } from '../data/taxonomy'
import { pooledAllSubjectsQuestions, shuffle, findQuestionItem, type QuizQuestionItem } from './quizEngine'
import { questionDifficulty } from './difficulty'

/**
 * Test engine. Every test on the platform — full INI-CET mock, grand tests,
 * subject/system tests, rapid, image challenge, PYQ, custom — is a TestDef.
 * Timing, marking and navigation come from src/config/examConfig.ts.
 */

export interface PoolFilter {
  subjects?: SubjectSlug[]
  systems?: SystemName[]
  categories?: QuestionCategory[]
  difficulties?: Difficulty[]
}

export interface TestSectionDef {
  id: string
  label: string
  questionCount: number
  /** Section time limit (minutes). null = shares the overall test timer. */
  minutes: number | null
  filter: PoolFilter
}

export type TestGroup = 'full' | 'grand' | 'subject' | 'system' | 'rapid' | 'image' | 'pyq' | 'custom'

export interface TestDef {
  id: string
  title: string
  group: TestGroup
  kind: MockTestKind
  description: string
  sections: TestSectionDef[]
  /** Overall time limit when sections share one timer. null = untimed. */
  totalMinutes: number | null
  navigation: NavigationRule
  marking: { correct: number; wrong: number }
  /** Grand tests use a fixed, non-overlapping slice of a seeded order of the bank. */
  partition?: { index: number; size: number }
  /** Number of questions actually available (may be below the nominal count). */
  available: number
}

export interface BuiltSection {
  section: TestSectionDef
  items: QuizQuestionItem[]
}

// ---------------------------------------------------------------- helpers

const MIN_PER_Q = examConfig.durationMinutes / examConfig.totalQuestions
const minutesFor = (n: number) => Math.max(5, Math.round(n * MIN_PER_Q))
const MARKING = { correct: examConfig.marking.correct, wrong: examConfig.marking.wrong }

function hashString(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function seededShuffle<T>(arr: T[], seed: string): T[] {
  let a = hashString(seed)
  const rand = () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function poolFor(filter: PoolFilter): QuizQuestionItem[] {
  return pooledAllSubjectsQuestions(filter.subjects).filter((it) => {
    if (filter.systems?.length) {
      const sys = systemOf(it)
      if (!sys || !filter.systems.includes(sys)) return false
    }
    if (filter.categories?.length && !filter.categories.some((c) => inCategory(it, c))) return false
    if (filter.difficulties?.length && !filter.difficulties.includes(questionDifficulty(it.question))) return false
    return true
  })
}

/** Pick `n` items spread across subjects in proportion to how many each subject has. */
function stratifiedPick(pool: QuizQuestionItem[], n: number, order: (x: QuizQuestionItem[]) => QuizQuestionItem[]): QuizQuestionItem[] {
  if (n >= pool.length) return order(pool)
  const bySubject = new Map<string, QuizQuestionItem[]>()
  for (const it of order(pool)) {
    const list = bySubject.get(it.subject) ?? []
    list.push(it)
    bySubject.set(it.subject, list)
  }
  const groups = [...bySubject.values()]
  const exact = groups.map((g) => (g.length / pool.length) * n)
  const alloc = exact.map(Math.floor)
  let left = n - alloc.reduce((a, b) => a + b, 0)
  exact
    .map((v, i) => ({ i, r: v - Math.floor(v) }))
    .sort((a, b) => b.r - a.r)
    .forEach(({ i }) => {
      if (left > 0 && alloc[i] < groups[i].length) {
        alloc[i]++
        left--
      }
    })
  return order(groups.flatMap((g, i) => g.slice(0, alloc[i])))
}

// ---------------------------------------------------------------- catalogue

function fullMock(): TestDef {
  const available = poolFor({}).length
  const sections: TestSectionDef[] = examConfig.sections.map((s) => ({
    id: s.id,
    label: s.label,
    questionCount: s.questionCount,
    minutes: s.minutes,
    filter: {},
  }))
  return {
    id: 'full-mock',
    title: `Full ${examConfig.shortName} Mock`,
    group: 'full',
    kind: 'full',
    description: `Complete exam simulation: ${examConfig.totalQuestions} questions, ${examConfig.durationMinutes} minutes, ${markingLabel()} marking. Questions are drawn across all subjects in proportion to the bank.`,
    sections,
    totalMinutes: examConfig.durationMinutes,
    navigation: examConfig.navigation,
    marking: MARKING,
    available,
  }
}

const GRAND_SIZE = 150

function grandTests(): TestDef[] {
  const available = poolFor({}).length
  const count = Math.floor(available / GRAND_SIZE)
  return Array.from({ length: count }, (_, index) => ({
    id: `grand-${index + 1}`,
    title: `Grand Test ${index + 1}`,
    group: 'grand' as const,
    kind: 'grand' as const,
    description: `${GRAND_SIZE} mixed questions with no overlap with other Grand Tests, ${minutesFor(GRAND_SIZE)} minutes, exam marking. The same questions every attempt, so you can track improvement.`,
    sections: [{ id: 'all', label: 'All subjects', questionCount: GRAND_SIZE, minutes: null, filter: {} }],
    totalMinutes: minutesFor(GRAND_SIZE),
    navigation: 'free' as const,
    marking: MARKING,
    partition: { index, size: GRAND_SIZE },
    available: GRAND_SIZE,
  }))
}

function single(
  id: string,
  title: string,
  group: TestGroup,
  kind: MockTestKind,
  description: string,
  filter: PoolFilter,
  maxCount: number,
): TestDef {
  const available = poolFor(filter).length
  const n = Math.min(maxCount, available)
  return {
    id,
    title,
    group,
    kind,
    description,
    sections: [{ id: 'all', label: title, questionCount: n, minutes: null, filter }],
    totalMinutes: n > 0 ? minutesFor(n) : null,
    navigation: 'free',
    marking: MARKING,
    available,
  }
}

function subjectTests(): TestDef[] {
  return subjects.map((s) =>
    single(`subject-${s.slug}`, `${s.name} Test`, 'subject', 'subject', `Up to 50 questions from ${s.name}.`, { subjects: [s.slug] }, 50),
  )
}

function systemTests(): TestDef[] {
  return SYSTEMS.map((sys) =>
    single(
      `system-${sys.toLowerCase().replace(/[^a-z]+/g, '-')}`,
      `${sys} System Test`,
      'system',
      'system',
      `Up to 40 questions on the ${sys.toLowerCase()} system, drawn across subjects.`,
      { systems: [sys] },
      40,
    ),
  ).filter((t) => t.available >= 10)
}

let cache: TestDef[] | null = null

export function getCatalog(): TestDef[] {
  if (cache) return cache
  cache = [
    fullMock(),
    ...grandTests(),
    ...subjectTests(),
    ...systemTests(),
    single('rapid-25', 'Rapid Mock', 'rapid', 'rapid', '25 short questions for a quick timed sprint.', { categories: ['rapid'] }, 25),
    single('image-challenge', 'Image Challenge', 'image', 'image', 'Image-only questions: ECGs, imaging, histopathology and clinical photographs.', { categories: ['image'] }, 50),
    single('pyq-test', 'Verified PYQ Test', 'pyq', 'pyq', 'Only actual INI-CET questions verified against a named session.', { categories: ['pyq'] }, 100),
    single('pyq-pattern-test', 'PYQ Pattern Test', 'pyq', 'pyq-pattern', 'Original questions modelled on historical INI-CET concepts — not actual paper questions.', { categories: ['pyq-pattern'] }, 100),
  ]
  return cache
}

// ---------------------------------------------------------------- custom tests (encoded in the URL)

export interface CustomParams {
  subjects: SubjectSlug[]
  categories: QuestionCategory[]
  difficulties: Difficulty[]
  count: number
  timed: boolean
}

export function parseCustom(search: URLSearchParams): CustomParams {
  const list = (k: string) => (search.get(k) ?? '').split(',').filter(Boolean)
  return {
    subjects: list('s').filter((s) => getSubject(s)) as SubjectSlug[],
    categories: list('c') as QuestionCategory[],
    difficulties: list('d') as Difficulty[],
    count: Math.max(5, Math.min(200, parseInt(search.get('n') ?? '25', 10) || 25)),
    timed: search.get('t') !== '0',
  }
}

export function customQuery(p: CustomParams): string {
  const q = new URLSearchParams()
  if (p.subjects.length) q.set('s', p.subjects.join(','))
  if (p.categories.length) q.set('c', p.categories.join(','))
  if (p.difficulties.length) q.set('d', p.difficulties.join(','))
  q.set('n', String(p.count))
  q.set('t', p.timed ? '1' : '0')
  return q.toString()
}

export function customDef(p: CustomParams): TestDef {
  const filter: PoolFilter = { subjects: p.subjects, categories: p.categories, difficulties: p.difficulties }
  const def = single('custom', 'Custom Test', 'custom', 'custom', 'Your own selection of subjects, question types and difficulty.', filter, p.count)
  return { ...def, totalMinutes: p.timed ? def.totalMinutes : null }
}

/** Practice / revision sessions over a fixed list of question ids (untimed). */
export function idsDef(id: string, title: string, kind: MockTestKind, ids: string[], timed = false): TestDef {
  const n = ids.length
  return {
    id,
    title,
    group: 'custom',
    kind,
    description: '',
    sections: [{ id: 'all', label: title, questionCount: n, minutes: null, filter: {} }],
    totalMinutes: timed ? minutesFor(n) : null,
    navigation: 'free',
    marking: MARKING,
    available: n,
  }
}

export function getTestDef(id: string, search: URLSearchParams): TestDef | null {
  if (id === 'custom') return customDef(parseCustom(search))
  if (id === 'session') {
    const ids = (search.get('ids') ?? '').split(',').filter(Boolean)
    const title = search.get('title') ?? 'Practice session'
    return ids.length ? idsDef('session', title, (search.get('kind') as MockTestKind) ?? 'practice', ids, search.get('t') === '1') : null
  }
  return getCatalog().find((t) => t.id === id) ?? null
}

// ---------------------------------------------------------------- building

export function buildTest(def: TestDef, search?: URLSearchParams): BuiltSection[] {
  if (def.id === 'session' && search) {
    const ids = (search.get('ids') ?? '').split(',').filter(Boolean)
    const items = ids.map(findQuestionItem).filter((x): x is QuizQuestionItem => !!x)
    return [{ section: { ...def.sections[0], questionCount: items.length }, items }]
  }
  if (def.partition) {
    const ordered = seededShuffle(poolFor({}), 'grand-tests-v1')
    const { index, size } = def.partition
    const items = shuffle(ordered.slice(index * size, (index + 1) * size))
    return [{ section: def.sections[0], items }]
  }
  const used = new Set<string>()
  return def.sections.map((section) => {
    const pool = poolFor(section.filter).filter((it) => !used.has(it.question.id))
    const items = def.group === 'full' ? stratifiedPick(pool, section.questionCount, shuffle) : shuffle(pool).slice(0, section.questionCount)
    items.forEach((it) => used.add(it.question.id))
    return { section, items }
  })
}

export function rebuildFromIds(def: TestDef, ids: string[][]): BuiltSection[] {
  return def.sections.map((section, i) => ({
    section,
    items: (ids[i] ?? []).map(findQuestionItem).filter((x): x is QuizQuestionItem => !!x),
  }))
}

/** URL for starting a practice/revision session over specific questions. */
export function sessionUrl(ids: string[], title: string, kind: MockTestKind = 'practice', timed = false): string {
  const q = new URLSearchParams({ ids: ids.join(','), title, kind, t: timed ? '1' : '0' })
  return `/tests/session?${q.toString()}`
}
