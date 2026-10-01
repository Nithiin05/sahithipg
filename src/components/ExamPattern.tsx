import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { subjectsByCategory, totalQuestionCount } from '../data/subjects'
import { SubjectIcon, SUBJECT_COLOR_CLASSES } from './icons'
import { examConfig, examDate, markingLabel, navigationLabel } from '../config/examConfig'

function infoRows() {
  const c = examConfig
  const sections =
    c.sections.length === 1
      ? `Single paper — ${c.sections[0].questionCount} questions`
      : c.sections
          .map((s) => `${s.label}: ${s.questionCount} Qs${s.minutes ? ` / ${s.minutes} min` : ''}`)
          .join(' · ')
  return [
    ['Exam', `${c.shortName} — ${c.examName}`],
    ['Conducted by', c.conductingBody],
    ['Session', c.session],
    [
      'Exam date',
      examDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }),
    ],
    ['Mode', `${c.mode}, ${c.language}`],
    ['Duration', `${c.durationMinutes} minutes (${c.durationMinutes / 60} hours)`],
    ['Questions', `${c.totalQuestions} — ${c.questionFormat}`],
    ['Marking', `${markingLabel()} · unattempted ${c.marking.unattempted}`],
    ['Negative marking', `Yes — ${markingLabel().split(' / ')[1]} per wrong answer`],
    ['Section structure', sections],
    ['Navigation', navigationLabel(c.navigation)],
  ] as const
}

export default function ExamPattern() {
  const categories = subjectsByCategory()

  return (
    <section id="exam-pattern" className="py-16 px-6 border-y border-border scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.9rem)' }}>
            {examConfig.shortName} Exam Information
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
            Every mock and Grand Test on this platform uses exactly these settings.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5 mt-10">
          <dl className="card p-0 overflow-hidden lg:col-span-3 divide-y divide-border">
            {infoRows().map(([k, v]) => (
              <div key={k} className="grid grid-cols-[130px_1fr] sm:grid-cols-[170px_1fr] gap-3 px-5 py-3 text-sm">
                <dt className="text-muted-foreground font-medium">{k}</dt>
                <dd className="text-foreground">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="card p-5">
              <h3 className="font-display font-bold mb-3 text-sm uppercase tracking-wide">Important instructions</h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground list-disc pl-4">
                {examConfig.instructions.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            {examConfig.verified && examConfig.officialSource ? (
              <div className="rounded-lg bg-success-bg px-4 py-3 text-sm flex gap-2.5">
                <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                <span>
                  Verified against{' '}
                  <a className="underline" href={examConfig.officialSource.url} target="_blank" rel="noreferrer">
                    {examConfig.officialSource.label}
                  </a>
                  .
                </span>
              </div>
            ) : (
              <div className="rounded-lg bg-warning-bg px-4 py-3 text-sm flex gap-2.5">
                <AlertTriangle size={16} className="text-warning shrink-0 mt-0.5" />
                <span>
                  Pending official confirmation. These values match published reports for this session but have not yet
                  been checked against the AIIMS prospectus. Always confirm on{' '}
                  <a className="underline" href="https://www.aiimsexams.ac.in/" target="_blank" rel="noreferrer">
                    aiimsexams.ac.in
                  </a>
                  .
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14">
          <span className="block text-xs uppercase tracking-widest text-primary font-semibold mb-4 text-center">
            All 19 subjects, organized by MBBS phase
          </span>
          <div className="grid gap-6 sm:grid-cols-3">
            {(['Pre-Clinical', 'Para-Clinical', 'Clinical'] as const).map((cat) => (
              <div key={cat} className="card p-5">
                <h3 className="font-display font-bold mb-3">{cat}</h3>
                <div className="flex flex-col gap-2">
                  {categories[cat].map((s) => (
                    <div key={s.slug} className="flex items-center justify-between gap-3 text-sm">
                      <span className="flex items-center gap-2 min-w-0">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${SUBJECT_COLOR_CLASSES[s.color] ?? ''}`}>
                          <SubjectIcon name={s.icon} className="w-3.5 h-3.5" />
                        </span>
                        <span className="truncate">{s.shortName}</span>
                      </span>
                      <span className="text-xs text-muted-foreground shrink-0">{totalQuestionCount(s)} Qs</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-8 max-w-2xl mx-auto text-center">
          Question counts are the real, current size of this bank. AIIMS does not publish official subject-wise
          weightage; topic priorities on this platform come from analysis of past papers and are labelled as such.
        </p>
      </div>
    </section>
  )
}
