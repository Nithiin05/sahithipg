import { Link } from 'react-router-dom'
import { Image, Link2, Stethoscope } from 'lucide-react'
import { syllabus, syllabusCoverage, type FocusArea } from '../data/syllabus'
import { getSubject } from '../data/subjects'
import type { SubjectSlug } from '../types'

function FocusChip({ f }: { f: FocusArea }) {
  const hy = f.tags.includes('High Yield')
  return (
    <span
      title={f.tags.join(' · ')}
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs ${
        hy ? 'bg-primary/10 text-primary font-medium' : 'bg-secondary text-muted-foreground'
      }`}
    >
      {f.name}
      {f.tags.includes('Image-Based Focus') && <Image size={11} aria-label="Image-based focus" />}
      {f.tags.includes('Clinically Important') && <Stethoscope size={11} aria-label="Clinically important" />}
      {f.tags.includes('Integrated Topic') && <Link2 size={11} aria-label="Integrated topic" />}
    </span>
  )
}

/** INI-CET syllabus for one subject: modules, focus areas, and links to existing practice topics. */
export default function SyllabusTree({ slug }: { slug: SubjectSlug }) {
  const modules = syllabus[slug] ?? []
  const subject = getSubject(slug)
  const { covered, total } = syllabusCoverage(slug)
  if (!subject || modules.length === 0) return null
  const topicName = (id: string) => subject.topics.find((t) => t.id === id)?.name ?? id

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-2 mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">INI-CET syllabus</h2>
        <span className="text-xs text-muted-foreground">
          {total} modules · {covered} with practice questions
        </span>
      </div>

      <div className="card p-0 divide-y divide-border overflow-hidden">
        {modules.map((m) => (
          <div key={m.id} className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold">{m.name}</h3>
              {m.focus.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {m.focus.map((f) => (
                    <FocusChip key={f.name} f={f} />
                  ))}
                </div>
              )}
            </div>
            <div className="shrink-0 flex flex-wrap gap-x-3 gap-y-1 sm:justify-end sm:max-w-[45%]">
              {m.practice.length ? (
                m.practice.map((id) => (
                  <Link key={id} to={`/subjects/${slug}/${id}`} className="text-xs font-semibold text-primary hover:underline">
                    {topicName(id)} →
                  </Link>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">Questions coming soon</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-primary/30" /> High yield
        </span>
        <span className="inline-flex items-center gap-1">
          <Image size={12} /> Image-based focus
        </span>
        <span className="inline-flex items-center gap-1">
          <Stethoscope size={12} /> Clinically important
        </span>
        <span className="inline-flex items-center gap-1">
          <Link2 size={12} /> Integrated topic
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Priority labels reflect standard high-yield lists and past-paper trends. AIIMS does not publish official
        subject- or topic-wise weightage.
      </p>
    </section>
  )
}
