import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Eraser } from 'lucide-react'
import QuestionCard from '../components/QuestionCard'
import QuestionPalette from '../components/QuestionPalette'
import Timer from '../components/Timer'
import FloatingCalculator from '../components/FloatingCalculator'
import { buildTest, getTestDef, rebuildFromIds, type BuiltSection } from '../lib/testEngine'
import { computeAttempt } from '../lib/scoring'
import { saveAttempt } from '../lib/attempts'
import { clearResumeState, readResumeStateFor, saveResumeState } from '../lib/testResume'
import { isBookmarked, toggleBookmark } from '../lib/bookmarks'
import { markingLabel, navigationLabel } from '../config/examConfig'
import { usePageTitle } from '../hooks/usePageTitle'

function fmtElapsed(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/**
 * Computer-based-test runner for every test definition (see lib/testEngine.ts).
 * - Timing: one overall timer, per-section timers, or untimed practice.
 * - Navigation: 'free', 'within-section' or 'forward-only', from the test definition.
 * - Tracks answers, mark-for-review, clear response and time per question; resumes after a refresh.
 */
export default function TestRunner() {
  const { testId = '' } = useParams()
  const [search] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const resumeKey = `${testId}?${search.toString()}`
  const def = useMemo(() => getTestDef(testId, search), [testId, search])
  usePageTitle(def?.title ?? 'Test')

  const resume = useMemo(
    () => (def ? readResumeStateFor((s) => s.kind === 'mock' && s.mockId === resumeKey) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [def],
  )

  const built: BuiltSection[] = useMemo(() => {
    if (!def) return []
    if (resume?.sectionQuestionIds) return rebuildFromIds(def, resume.sectionQuestionIds)
    return buildTest(def, search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [def])

  const flat = useMemo(
    () => built.flatMap((b, sectionIdx) => b.items.map((item) => ({ item, sectionIdx }))),
    [built],
  )
  const sectionStart = useMemo(() => {
    const starts: number[] = []
    let n = 0
    for (const b of built) {
      starts.push(n)
      n += b.items.length
    }
    return starts
  }, [built])

  const perSectionTiming = !!def && def.sections.every((s) => s.minutes !== null) && def.sections.length > 1
  const timed = !!def && (perSectionTiming || def.totalMinutes !== null)
  const initialSeconds = (sectionIdx: number) =>
    perSectionTiming ? (def!.sections[sectionIdx].minutes ?? 0) * 60 : (def?.totalMinutes ?? 0) * 60

  const [current, setCurrent] = useState(() => resume?.currentIndex ?? 0)
  const [sectionIdx, setSectionIdx] = useState(() => resume?.sectionIndex ?? 0)
  const [answers, setAnswers] = useState<Record<string, number>>(() => resume?.answers ?? {})
  const [marked, setMarked] = useState<Record<string, boolean>>(() =>
    Object.fromEntries((resume?.markedForReview ?? []).map((id) => [id, true])),
  )
  const [timeSpent, setTimeSpent] = useState<Record<string, number>>(() => resume?.timeSpent ?? {})
  const [secondsLeft, setSecondsLeft] = useState(() => resume?.secondsLeft ?? initialSeconds(0))
  const [elapsed, setElapsed] = useState(0)
  const [started] = useState(() => resume?.started ?? Date.now())
  const [calculatorOpen, setCalculatorOpen] = useState(() => resume?.calculatorOpen ?? false)
  const [, setTick] = useState(0)
  const [maxVisited, setMaxVisited] = useState(() => resume?.currentIndex ?? 0)

  const finished = useRef(false)
  const lastSwitch = useRef(Date.now())
  const stateRef = useRef({ answers, marked, timeSpent, current })
  stateRef.current = { answers, marked, timeSpent, current }

  /** Add time spent on the current question before moving away. */
  const commitTime = useCallback(() => {
    const now = Date.now()
    const it = flat[stateRef.current.current]
    if (!it) return stateRef.current.timeSpent
    const add = Math.round((now - lastSwitch.current) / 1000)
    lastSwitch.current = now
    const next = { ...stateRef.current.timeSpent, [it.item.question.id]: (stateRef.current.timeSpent[it.item.question.id] ?? 0) + add }
    setTimeSpent(next)
    return next
  }, [flat])

  const finalize = useCallback(() => {
    if (finished.current || !def) return
    finished.current = true
    const spent = commitTime()
    clearResumeState()
    const attempt = computeAttempt({
      kind: def.group === 'grand' || def.group === 'full' ? 'mock' : def.kind === 'practice' || def.kind === 'revision' ? 'practice' : 'mock',
      label: def.title,
      items: flat.map((f) => f.item),
      answers: stateRef.current.answers,
      marked: stateRef.current.marked,
      marksCorrect: def.marking.correct,
      marksWrong: def.marking.wrong,
      durationSec: Math.round((Date.now() - started) / 1000),
      timeSpent: spent,
      sourceRoute: `${location.pathname}${location.search}`,
      mockKind: def.kind,
      testId: def.id,
    })
    saveAttempt(attempt)
    navigate(`/tests/${def.id}/result`, { state: { attempt }, replace: true })
  }, [def, flat, started, commitTime, navigate, location])

  // Persist progress for resume.
  useEffect(() => {
    if (!def || finished.current || flat.length === 0) return
    saveResumeState({
      kind: 'mock',
      route: `${location.pathname}${location.search}`,
      label: def.title,
      mockId: resumeKey,
      sectionIndex: sectionIdx,
      secondsLeft,
      started,
      sectionQuestionIds: built.map((b) => b.items.map((it) => it.question.id)),
      answers,
      markedForReview: Object.keys(marked).filter((k) => marked[k]),
      currentIndex: current,
      calculatorOpen,
      timeSpent,
    })
  }, [def, flat.length, built, sectionIdx, secondsLeft, started, answers, marked, current, calculatorOpen, timeSpent, location, resumeKey])

  const goToSection = useCallback(
    (next: number) => {
      if (next >= built.length) return finalize()
      commitTime()
      setSectionIdx(next)
      setCurrent(sectionStart[next])
      setMaxVisited((m) => Math.max(m, sectionStart[next]))
      if (perSectionTiming) setSecondsLeft(initialSeconds(next))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [built.length, sectionStart, perSectionTiming, finalize, commitTime],
  )

  // Clock: count down when timed (auto-advance section / auto-submit), count up otherwise.
  const sectionRef = useRef(sectionIdx)
  sectionRef.current = sectionIdx
  useEffect(() => {
    if (!def || flat.length === 0) return
    const id = window.setInterval(() => {
      if (!timed) {
        setElapsed(Math.round((Date.now() - started) / 1000))
        return
      }
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.setTimeout(() => (perSectionTiming ? goToSection(sectionRef.current + 1) : finalize()), 0)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [def, flat.length, timed, perSectionTiming, goToSection, finalize, started])

  if (!def) return <Navigate to="/tests" replace />
  if (flat.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <p className="font-display font-bold text-lg mb-2">No questions available for this test yet</p>
        <p className="text-sm text-muted-foreground mb-6">The question bank is still growing for this category.</p>
        <Link to="/tests" className="text-primary font-semibold hover:underline">
          Back to tests
        </Link>
      </div>
    )
  }

  const nav = def.navigation
  const secStart = sectionStart[sectionIdx]
  const secEnd = secStart + built[sectionIdx].items.length - 1
  const canVisit = (target: number) => {
    if (target < 0 || target >= flat.length) return false
    if (nav === 'forward-only') return target >= current
    if (nav === 'within-section') return target >= secStart && target <= secEnd
    return true
  }
  const go = (target: number) => {
    if (!canVisit(target)) return
    commitTime()
    setCurrent(target)
    setMaxVisited((m) => Math.max(m, target))
    const sec = flat[target].sectionIdx
    if (sec !== sectionIdx && nav === 'free') setSectionIdx(sec)
  }

  const here = flat[current]
  const q = here.item.question
  const isLastInSection = current === secEnd
  const isLastOverall = current === flat.length - 1
  const answeredCount = Object.keys(answers).filter((id) => answers[id] !== undefined).length
  const markedCount = Object.values(marked).filter(Boolean).length

  const confirmSubmit = () => {
    const unanswered = flat.length - answeredCount
    const msg = `Submit the test?\n\nAnswered: ${answeredCount}\nNot answered: ${unanswered}\nMarked for review: ${markedCount}\n\nThis cannot be undone.`
    if (window.confirm(msg)) finalize()
  }

  // Palette: free navigation shows every question; otherwise only the current section.
  const paletteSections = nav === 'free' ? built.map((_, i) => i) : [sectionIdx]

  return (
    <div className="pb-24">
      <div className="border-b border-border bg-surface sticky top-[65px] z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display font-bold truncate">{def.title}</p>
            <p className="text-xs text-muted-foreground">
              {built.length > 1 && `Section ${sectionIdx + 1} of ${built.length}: ${built[sectionIdx].section.label} · `}
              {answeredCount}/{flat.length} answered · {markingLabel()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {timed ? (
              <Timer secondsLeft={secondsLeft} totalSeconds={initialSeconds(sectionIdx)} />
            ) : (
              <span className="text-sm font-mono text-muted-foreground tabular-nums">Untimed · {fmtElapsed(elapsed)}</span>
            )}
            <button onClick={confirmSubmit} className="bg-success text-white rounded-lg px-4 py-1.5 text-sm font-semibold">
              Submit
            </button>
          </div>
        </div>
        {built.length > 1 && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-2 flex gap-2 overflow-x-auto">
            {built.map((b, i) => {
              const done = b.items.filter((it) => answers[it.question.id] !== undefined).length
              return (
                <span
                  key={b.section.id}
                  className={`tag whitespace-nowrap ${i === sectionIdx ? 'bg-primary/10 text-primary' : i < sectionIdx ? 'bg-secondary text-muted-foreground' : 'border border-border text-muted-foreground'}`}
                >
                  {b.section.label}: {done}/{b.items.length}
                </span>
              )
            })}
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6">
        <div className="grid lg:grid-cols-[1fr_280px] gap-6 items-start">
          <div>
            <QuestionCard
              question={q}
              index={current}
              total={flat.length}
              selectedIndex={answers[q.id] ?? null}
              onSelect={(i) => setAnswers((a) => ({ ...a, [q.id]: i }))}
              bookmarked={isBookmarked(q.id)}
              onToggleBookmark={() => {
                toggleBookmark(q.id, here.item.subject)
                setTick((t) => t + 1)
              }}
            />
            <div className="flex flex-wrap justify-between items-center gap-3 mt-5">
              <div className="flex flex-wrap gap-2">
                {nav !== 'forward-only' && (
                  <button
                    onClick={() => go(current - 1)}
                    disabled={!canVisit(current - 1)}
                    className="border border-border rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-40 hover:bg-secondary"
                  >
                    &larr; Previous
                  </button>
                )}
                <button
                  onClick={() => setAnswers((a) => {
                    const next = { ...a }
                    delete next[q.id]
                    return next
                  })}
                  disabled={answers[q.id] === undefined}
                  className="border border-border rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-40 hover:bg-secondary inline-flex items-center gap-1.5"
                >
                  <Eraser size={14} /> Clear response
                </button>
                <button
                  onClick={() => setMarked((m) => ({ ...m, [q.id]: !m[q.id] }))}
                  className={`border rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    marked[q.id] ? 'border-warning bg-warning-bg text-warning' : 'border-border hover:bg-secondary'
                  }`}
                >
                  {marked[q.id] ? '★ Marked' : '☆ Mark for review'}
                </button>
              </div>
              <div className="flex gap-2">
                {!isLastInSection && (
                  <button onClick={() => go(current + 1)} className="bg-primary text-primary-foreground rounded-lg px-5 py-2 text-sm font-semibold">
                    Save &amp; Next &rarr;
                  </button>
                )}
                {isLastInSection && !isLastOverall && (
                  <button
                    onClick={() => {
                      const warn = nav === 'free' ? '' : ' You cannot return to this section afterwards.'
                      if (window.confirm(`Move to the next section?${warn}`)) goToSection(sectionIdx + 1)
                    }}
                    className="bg-primary text-primary-foreground rounded-lg px-5 py-2 text-sm font-semibold"
                  >
                    Next section &rarr;
                  </button>
                )}
                {isLastOverall && (
                  <button onClick={confirmSubmit} className="bg-success text-white rounded-lg px-5 py-2 text-sm font-semibold">
                    Submit test
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:sticky lg:top-40 lg:max-h-[calc(100vh-11rem)] lg:overflow-y-auto">
            {paletteSections.map((si) => {
              const start = sectionStart[si]
              const items = built[si].items
              return (
                <QuestionPalette
                  key={si}
                  title={built.length > 1 ? built[si].section.label : 'Questions'}
                  startNumber={start + 1}
                  count={items.length}
                  currentIndex={current - start}
                  answeredMask={items.map((it) => answers[it.question.id] !== undefined)}
                  markedMask={items.map((it) => !!marked[it.question.id])}
                  disabledMask={items.map((_, i) => !canVisit(start + i))}
                  onJump={(i) => go(start + i)}
                />
              )
            })}
            <p className="text-xs text-muted-foreground px-1">
              {navigationLabel(nav)}. {maxVisited + 1 < flat.length ? `${flat.length - maxVisited - 1} not yet seen.` : 'All questions seen.'}
            </p>
          </div>
        </div>
      </div>
      <FloatingCalculator initialOpen={calculatorOpen} onOpenChange={setCalculatorOpen} />
    </div>
  )
}
