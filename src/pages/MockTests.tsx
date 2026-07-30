import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ResumeBanner from '../components/ResumeBanner'
import { mockTests, mockTotals, type MockTestConfig, type MockTestKind } from '../data/mockTests'
import { subjects } from '../data/subjects'

const TABS: { key: MockTestKind; label: string }[] = [
  { key: 'full', label: 'Full-Length Mocks' },
  { key: 'sectional', label: 'Sectional Tests' },
  { key: 'topic', label: 'Topic-Wise Tests' },
  { key: 'previous-year', label: 'Previous Year Papers' },
]

function MockCard({ mock }: { mock: MockTestConfig }) {
  const { totalQuestions, totalMinutes, maxScore } = mockTotals(mock)
  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="tag bg-primary/10 text-primary">{mock.tier}</span>
        {mock.year && <span className="tag bg-secondary text-muted-foreground">{mock.year}</span>}
        {mock.shift && <span className="tag bg-secondary text-muted-foreground">{mock.shift}</span>}
        <span className="tag bg-secondary text-muted-foreground">
          +{mock.marksCorrect} / −{mock.marksWrong} marking
        </span>
      </div>
      <h2 className="font-display font-bold text-xl mb-2">{mock.title}</h2>
      <p className="text-sm text-muted-foreground mb-5" style={{ lineHeight: 1.6 }}>
        {mock.description}
      </p>

      <div className="grid grid-cols-3 gap-4 mb-5 text-center">
        <div className="rounded-lg bg-secondary py-3">
          <p className="font-display font-bold text-lg">{totalQuestions}</p>
          <p className="text-xs text-muted-foreground">Questions</p>
        </div>
        <div className="rounded-lg bg-secondary py-3">
          <p className="font-display font-bold text-lg">{totalMinutes}</p>
          <p className="text-xs text-muted-foreground">Minutes</p>
        </div>
        <div className="rounded-lg bg-secondary py-3">
          <p className="font-display font-bold text-lg">{maxScore}</p>
          <p className="text-xs text-muted-foreground">Max marks</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {mock.sections.map((s) => (
          <span key={s.id} className="tag bg-secondary text-foreground border border-border">
            {s.label} · {s.questionCount}Q · {s.minutes}m
          </span>
        ))}
      </div>

      <Link
        to={`/mock-tests/${mock.id}`}
        className="inline-block bg-primary text-primary-foreground rounded-lg px-5 py-2.5 text-sm font-semibold hover:opacity-90"
      >
        Start Test
      </Link>
    </div>
  )
}

function CrumbBar({ items }: { items: { label: string; onClick?: () => void }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span>&rarr;</span>}
          {it.onClick ? (
            <button onClick={it.onClick} className="font-medium text-primary hover:underline">
              {it.label}
            </button>
          ) : (
            <span className="font-semibold text-foreground">{it.label}</span>
          )}
        </span>
      ))}
    </div>
  )
}

export default function MockTests() {
  const [tab, setTab] = useState<MockTestKind>('full')
  const [tierFilter, setTierFilter] = useState<'All' | 'Tier-I' | 'Tier-II'>('All')
  const [drillSubject, setDrillSubject] = useState<string | null>(null)
  const [drillTopic, setDrillTopic] = useState<string | null>(null)

  const changeTab = (t: MockTestKind) => {
    setTab(t)
    setDrillSubject(null)
    setDrillTopic(null)
  }

  const fullFiltered = useMemo(() => {
    const list = mockTests.filter((m) => (m.kind ?? 'full') === 'full')
    return tierFilter === 'All' ? list : list.filter((m) => m.tier === tierFilter)
  }, [tierFilter])

  const previousYearList = useMemo(() => mockTests.filter((m) => m.kind === 'previous-year'), [])

  const sectionalForSubject = useMemo(
    () => (drillSubject ? mockTests.filter((m) => m.kind === 'sectional' && m.subjectSlug === drillSubject) : []),
    [drillSubject]
  )

  const topicsForSubject = useMemo(
    () => subjects.find((s) => s.slug === drillSubject)?.topics ?? [],
    [drillSubject]
  )

  const setsForTopic = useMemo(
    () =>
      drillSubject && drillTopic
        ? mockTests.filter((m) => m.kind === 'topic' && m.subjectSlug === drillSubject && m.topicId === drillTopic)
        : [],
    [drillSubject, drillTopic]
  )

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Mock Tests"
        title="Full-length, sectional-timed mocks"
        description="Each mock uses a fresh, randomly-assembled question set and the exact section structure, timing, and marking scheme published for that tier."
      />

      <ResumeBanner />

      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => {
            const count = mockTests.filter((m) => (m.kind ?? 'full') === t.key).length
            return (
              <button
                key={t.key}
                onClick={() => changeTab(t.key)}
                className={`tag border transition-colors ${
                  tab === t.key ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:bg-secondary'
                }`}
              >
                {t.label} · {count}
              </button>
            )
          })}
        </div>

        {/* Full-length mocks: flat list with a tier filter */}
        {tab === 'full' && (
          <>
            <div className="flex flex-wrap gap-2">
              {(['All', 'Tier-I', 'Tier-II'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTierFilter(t)}
                  className={`tag border transition-colors ${
                    tierFilter === t ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            {fullFiltered.map((mock) => (
              <MockCard key={mock.id} mock={mock} />
            ))}
          </>
        )}

        {/* Sectional tests: pick a subject, then see its sets */}
        {tab === 'sectional' && !drillSubject && (
          <div className="grid gap-4 sm:grid-cols-2">
            {subjects.map((s) => {
              const count = mockTests.filter((m) => m.kind === 'sectional' && m.subjectSlug === s.slug).length
              return (
                <button key={s.slug} onClick={() => setDrillSubject(s.slug)} className="card card-hover p-5 text-left">
                  <h3 className="font-semibold">{s.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{count} sectional tests</p>
                </button>
              )
            })}
          </div>
        )}
        {tab === 'sectional' && drillSubject && (
          <>
            <CrumbBar
              items={[
                { label: 'Sectional Tests', onClick: () => setDrillSubject(null) },
                { label: subjects.find((s) => s.slug === drillSubject)?.name ?? '' },
              ]}
            />
            {sectionalForSubject.map((mock) => (
              <MockCard key={mock.id} mock={mock} />
            ))}
          </>
        )}

        {/* Topic-wise tests: pick a subject, then a topic, then see its sets */}
        {tab === 'topic' && !drillSubject && (
          <div className="grid gap-4 sm:grid-cols-2">
            {subjects.map((s) => (
              <button key={s.slug} onClick={() => setDrillSubject(s.slug)} className="card card-hover p-5 text-left">
                <h3 className="font-semibold">{s.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.topics.length} topics</p>
              </button>
            ))}
          </div>
        )}
        {tab === 'topic' && drillSubject && !drillTopic && (
          <>
            <CrumbBar items={[{ label: 'Topic-Wise Tests', onClick: () => setDrillSubject(null) }, { label: subjects.find((s) => s.slug === drillSubject)?.name ?? '' }]} />
            <div className="flex flex-col gap-3">
              {topicsForSubject.map((topic) => {
                const count = mockTests.filter((m) => m.kind === 'topic' && m.subjectSlug === drillSubject && m.topicId === topic.id).length
                return (
                  <button key={topic.id} onClick={() => setDrillTopic(topic.id)} className="card card-hover p-5 flex items-center justify-between gap-4 text-left">
                    <div>
                      <h3 className="font-semibold">{topic.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
                    </div>
                    <span className="tag bg-secondary text-muted-foreground shrink-0">{count} sets</span>
                  </button>
                )
              })}
            </div>
          </>
        )}
        {tab === 'topic' && drillSubject && drillTopic && (
          <>
            <CrumbBar
              items={[
                { label: 'Topic-Wise Tests', onClick: () => setDrillSubject(null) },
                { label: subjects.find((s) => s.slug === drillSubject)?.name ?? '', onClick: () => setDrillTopic(null) },
                { label: topicsForSubject.find((t) => t.id === drillTopic)?.name ?? '' },
              ]}
            />
            {setsForTopic.map((mock) => (
              <MockCard key={mock.id} mock={mock} />
            ))}
          </>
        )}

        {/* Previous year pattern exams */}
        {tab === 'previous-year' && (
          <>
            {previousYearList.map((mock) => (
              <MockCard key={mock.id} mock={mock} />
            ))}
            <p className="text-xs text-muted-foreground text-center -mt-2">
              These are pattern-based practice exams matching each year's known structure, timing, and marking scheme —
              not verbatim reproductions of the official paper.
            </p>
          </>
        )}

        <p className="text-xs text-muted-foreground text-center mt-2">
          Timings and marking are based on the publicly published SSC CGL exam pattern. Always confirm the latest
          details against the official notification before your exam.
        </p>
      </div>
    </div>
  )
}
