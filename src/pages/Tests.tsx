import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Clock, FileText } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ResumeBanner from '../components/ResumeBanner'
import { getCatalog, customQuery, isListed, poolFor, type TestDef, type TestGroup } from '../lib/testEngine'
import { CATEGORY_LABELS, type TestCategory } from '../data/tests/catalog'
import { readResumeState } from '../lib/testResume'
import { examConfig, markingLabel, navigationLabel } from '../config/examConfig'
import { subjects } from '../data/subjects'
import { ALL_CATEGORIES, CATEGORY_INFO, type QuestionCategory } from '../data/taxonomy'
import { DIFFICULTIES, DIFFICULTY_LABELS } from '../lib/difficulty'
import { getAttempts } from '../lib/attempts'
import type { Difficulty, SubjectSlug } from '../types'

const TABS: { key: TestGroup | 'full-grand' | 'quick'; label: string }[] = [
  { key: 'full-grand', label: 'Full-Length Library' },
  { key: 'subject', label: 'Subject Tests' },
  { key: 'system', label: 'System Tests' },
  { key: 'quick', label: 'Rapid & Image' },
  { key: 'pyq', label: 'PYQ Tests' },
  { key: 'custom', label: 'Custom Test' },
]

type Progress = { status: 'completed' | 'in-progress' | 'new'; best?: number; last?: number; attempts: number }

function TestCard({ t, progress }: { t: TestDef; progress?: Progress }) {
  const n = t.sections.reduce((s, x) => s + x.questionCount, 0)
  const empty = n === 0
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {t.category && <p className="text-[11px] uppercase tracking-wide text-primary font-semibold">{CATEGORY_LABELS[t.category]}</p>}
          <h3 className="font-semibold">{t.title}</h3>
        </div>
        {progress?.status === 'in-progress' && <span className="tag bg-warning-bg text-warning shrink-0">In progress</span>}
        {progress?.status === 'completed' && progress.best !== undefined && <span className="tag bg-success-bg text-success shrink-0">Best {progress.best}%</span>}
      </div>
      <p className="text-sm text-muted-foreground flex-1" style={{ lineHeight: 1.55 }}>
        {t.description}
      </p>
      {t.status === 'review' && <span className="tag bg-secondary text-muted-foreground self-start">Expert review pending</span>}
      {t.status === 'draft' && <span className="tag bg-warning-bg text-warning self-start">Draft — preview only</span>}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <FileText size={12} /> {empty ? 'No questions yet' : `${n} questions`}
        </span>
        {t.totalMinutes && !empty && (
          <span className="inline-flex items-center gap-1">
            <Clock size={12} /> {t.totalMinutes} min{t.sections.length > 1 ? ` · ${t.sections.length} parts` : ''}
          </span>
        )}
        {t.difficultyLabel && <span>{t.difficultyLabel}</span>}
        {progress && progress.attempts > 0 && (
          <span>
            {progress.attempts} attempt{progress.attempts === 1 ? '' : 's'}
            {progress.last !== undefined ? ` · last ${progress.last}%` : ''}
          </span>
        )}
      </div>
    </>
  )
  return empty ? (
    <div className="card p-5 flex flex-col gap-3 opacity-60">{body}</div>
  ) : (
    <Link to={`/tests/${t.id}`} className="card card-hover p-5 flex flex-col gap-3">
      {body}
    </Link>
  )
}

function Chip<T extends string>({ value, selected, onToggle, children }: { value: T; selected: boolean; onToggle: (v: T) => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(value)}
      className={`tag border transition-colors ${selected ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}
    >
      {children}
    </button>
  )
}

function toggle<T>(list: T[], v: T): T[] {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v]
}

function CustomBuilder() {
  const navigate = useNavigate()
  const [subs, setSubs] = useState<SubjectSlug[]>([])
  const [cats, setCats] = useState<QuestionCategory[]>([])
  const [diffs, setDiffs] = useState<Difficulty[]>([])
  const [count, setCount] = useState(25)
  const [timed, setTimed] = useState(true)
  const available = useMemo(() => poolFor({ subjects: subs, categories: cats, difficulties: diffs }).length, [subs, cats, diffs])

  return (
    <div className="card p-6 flex flex-col gap-5">
      <div>
        <p className="text-sm font-semibold mb-2">Subjects <span className="text-muted-foreground font-normal">(none = all)</span></p>
        <div className="flex flex-wrap gap-2">
          {subjects.map((s) => (
            <Chip key={s.slug} value={s.slug} selected={subs.includes(s.slug)} onToggle={(v) => setSubs((l) => toggle(l, v))}>
              {s.shortName}
            </Chip>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Question types <span className="text-muted-foreground font-normal">(none = all)</span></p>
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((c) => (
            <Chip key={c} value={c} selected={cats.includes(c)} onToggle={(v) => setCats((l) => toggle(l, v))}>
              {CATEGORY_INFO[c].label}
            </Chip>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Difficulty <span className="text-muted-foreground font-normal">(none = all)</span></p>
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map((d) => (
            <Chip key={d} value={d} selected={diffs.includes(d)} onToggle={(v) => setDiffs((l) => toggle(l, v))}>
              {DIFFICULTY_LABELS[d]}
            </Chip>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-end gap-6">
        <label className="text-sm font-semibold flex flex-col gap-1.5">
          Number of questions
          <select value={count} onChange={(e) => setCount(Number(e.target.value))} className="border border-border rounded-lg px-3 py-2 bg-surface font-normal">
            {[10, 25, 50, 100, 200].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm flex items-center gap-2">
          <input type="checkbox" checked={timed} onChange={(e) => setTimed(e.target.checked)} className="w-4 h-4" />
          Timed (exam pace)
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border">
        <span className="text-sm text-muted-foreground">
          {available} matching question{available === 1 ? '' : 's'}
          {available > 0 && available < count && ` — the test will have ${available}`}
        </span>
        <button
          disabled={available === 0}
          onClick={() => navigate(`/tests/custom?${customQuery({ subjects: subs, categories: cats, difficulties: diffs, count, timed })}`)}
          className="bg-primary text-primary-foreground rounded-lg px-5 py-2.5 text-sm font-semibold disabled:opacity-40"
        >
          Start custom test
        </button>
      </div>
    </div>
  )
}

export default function Tests() {
  const [params, setParams] = useSearchParams()
  const tab = (params.get('tab') as (typeof TABS)[number]['key']) ?? 'full-grand'
  const preview = params.get('preview') === '1'
  const catalog = getCatalog().filter((t) => isListed(t.status, preview))
  const [cat, setCat] = useState<TestCategory | 'all'>('all')
  const [state, setState] = useState<Progress['status'] | 'all'>('all')
  const [diff, setDiff] = useState<string>('all')
  const progress = useMemo(() => {
    const m = new Map<string, Progress>()
    // Attempts come newest first, so the first one seen per test is the latest.
    for (const a of getAttempts()) {
      if (!a.testId || !a.maxScore) continue
      const pct = Math.round((a.score / a.maxScore) * 100)
      const p = m.get(a.testId) ?? { status: 'completed' as const, attempts: 0, last: pct }
      p.attempts++
      p.best = Math.max(p.best ?? -Infinity, pct)
      m.set(a.testId, p)
    }
    const resume = readResumeState()
    const resumeId = resume?.mockId?.split('?')[0]
    if (resumeId) m.set(resumeId, { ...(m.get(resumeId) ?? { attempts: 0 }), status: 'in-progress' })
    return m
  }, [])

  const fullLength = catalog.filter((t) => t.group === 'full' || t.group === 'grand')
  const difficulties = [...new Set(fullLength.map((t) => t.difficultyLabel).filter(Boolean))] as string[]
  const list = catalog.filter((t) => {
    if (tab === 'full-grand') {
      if (t.group !== 'full' && t.group !== 'grand') return false
      if (cat !== 'all' && t.category !== cat) return false
      if (diff !== 'all' && t.difficultyLabel !== diff) return false
      const st = progress.get(t.id)?.status ?? 'new'
      return state === 'all' || st === state
    }
    if (tab === 'quick') return t.group === 'rapid' || t.group === 'image'
    return t.group === tab
  })
  const categoryCounts = (c: TestCategory) => fullLength.filter((t) => t.category === c).length

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Tests"
        title="Mock tests & grand tests"
        description={`Every test uses ${examConfig.shortName} marking (${markingLabel()}). Full-length tests follow the official pattern: ${examConfig.sections.length} parts × ${examConfig.sections[0].questionCount} questions × ${examConfig.sections[0].minutes} min, ${navigationLabel(examConfig.navigation).toLowerCase()}.`}
      />
      <ResumeBanner />
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setParams({ tab: t.key })}
              className={`tag border transition-colors ${tab === t.key ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'custom' ? (
          <CustomBuilder />
        ) : (
          <>
            {tab === 'full-grand' && (
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex flex-wrap gap-2">
                  <Chip value="all" selected={cat === 'all'} onToggle={() => setCat('all')}>
                    All types
                  </Chip>
                  {(Object.keys(CATEGORY_LABELS) as TestCategory[]).map((c) => (
                    <Chip key={c} value={c} selected={cat === c} onToggle={() => setCat(cat === c ? 'all' : c)}>
                      {CATEGORY_LABELS[c]} ({c === 'full-mock' ? fullLength.filter((t) => t.category === 'full-mock').length : categoryCounts(c)})
                    </Chip>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(['all', 'new', 'in-progress', 'completed'] as const).map((st) => (
                    <Chip key={st} value={st} selected={state === st} onToggle={() => setState(st)}>
                      {st === 'all' ? 'Any status' : st === 'new' ? 'Not attempted' : st === 'in-progress' ? 'In progress' : 'Completed'}
                    </Chip>
                  ))}
                  {difficulties.length > 1 && <span className="w-px bg-border mx-1" />}
                  {difficulties.length > 1 &&
                    ['all', ...difficulties].map((d) => (
                      <Chip key={d} value={d} selected={diff === d} onToggle={() => setDiff(d)}>
                        {d === 'all' ? 'Any difficulty' : d}
                      </Chip>
                    ))}
                </div>
              </div>
            )}
            {list.length === 0 && tab === 'full-grand' && (
              <div className="card p-6 text-sm text-muted-foreground" style={{ lineHeight: 1.6 }}>
                {cat === 'pyq'
                  ? 'No actual INI-CET papers have been added. AIIMS does not publish its question papers for reuse, and questions are only listed here when their wording, session and reuse permission can be verified. Practise PYQ-inspired questions instead — they are original and labelled as such.'
                  : cat === 'pyq-inspired' || cat === 'high-difficulty' || cat === 'revision'
                    ? 'Tests in this category are being written and will appear once every question is complete and checked.'
                    : 'No tests match these filters.'}
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((t) => (
                <TestCard key={t.id} t={t} progress={progress.get(t.id)} />
              ))}
            </div>
            {tab === 'system' && (
              <p className="text-xs text-muted-foreground mt-4">System tests draw from every subject, so Cardiovascular includes anatomy, physiology, pathology, pharmacology and medicine.</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
