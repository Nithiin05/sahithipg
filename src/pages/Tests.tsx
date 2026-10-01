import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Clock, FileText } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ResumeBanner from '../components/ResumeBanner'
import { getCatalog, customQuery, poolFor, type TestDef, type TestGroup } from '../lib/testEngine'
import { examConfig, markingLabel, navigationLabel } from '../config/examConfig'
import { subjects } from '../data/subjects'
import { ALL_CATEGORIES, CATEGORY_INFO, type QuestionCategory } from '../data/taxonomy'
import { DIFFICULTIES, DIFFICULTY_LABELS } from '../lib/difficulty'
import { getAttempts } from '../lib/attempts'
import type { Difficulty, SubjectSlug } from '../types'

const TABS: { key: TestGroup | 'full-grand' | 'quick'; label: string }[] = [
  { key: 'full-grand', label: 'Full Mock & Grand Tests' },
  { key: 'subject', label: 'Subject Tests' },
  { key: 'system', label: 'System Tests' },
  { key: 'quick', label: 'Rapid & Image' },
  { key: 'pyq', label: 'PYQ Tests' },
  { key: 'custom', label: 'Custom Test' },
]

function TestCard({ t, best }: { t: TestDef; best?: number }) {
  const n = t.sections.reduce((s, x) => s + x.questionCount, 0)
  const empty = n === 0
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold">{t.title}</h3>
        {best !== undefined && <span className="tag bg-success-bg text-success shrink-0">Best {best}%</span>}
      </div>
      <p className="text-sm text-muted-foreground flex-1" style={{ lineHeight: 1.55 }}>
        {t.description}
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <FileText size={12} /> {empty ? 'No questions yet' : `${n} questions`}
        </span>
        {t.totalMinutes && !empty && (
          <span className="inline-flex items-center gap-1">
            <Clock size={12} /> {t.totalMinutes} min
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
  const catalog = getCatalog()
  const best = useMemo(() => {
    const m = new Map<string, number>()
    for (const a of getAttempts()) {
      if (!a.testId || !a.maxScore) continue
      const pct = Math.round((a.score / a.maxScore) * 100)
      m.set(a.testId, Math.max(m.get(a.testId) ?? -Infinity, pct))
    }
    return m
  }, [])

  const list = catalog.filter((t) => {
    if (tab === 'full-grand') return t.group === 'full' || t.group === 'grand'
    if (tab === 'quick') return t.group === 'rapid' || t.group === 'image'
    return t.group === tab
  })

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Tests"
        title="Mock tests & grand tests"
        description={`Every test uses ${examConfig.shortName} marking (${markingLabel()}). ${navigationLabel(examConfig.navigation)} in the full mock.`}
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
            {tab === 'full-grand' && catalog.filter((t) => t.group === 'grand').length === 0 && (
              <p className="text-sm text-muted-foreground mb-4">Grand Tests appear as the bank grows (150 unique questions per Grand Test).</p>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((t) => (
                <TestCard key={t.id} t={t} best={best.get(t.id)} />
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
