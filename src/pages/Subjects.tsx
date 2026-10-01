import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { subjectsByCategory, totalQuestionCount } from '../data/subjects'
import { SubjectIcon, SUBJECT_COLOR_CLASSES } from '../components/icons'
import { getSyllabusProgress } from '../lib/syllabusProgress'

export default function Subjects() {
  const categories = subjectsByCategory()
  const progress = getSyllabusProgress()

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Subjects"
        title="Pick a subject, then a topic"
        description="All 19 MBBS subjects tested in INI-CET — Pre-Clinical, Para-Clinical and Clinical — with topic-wise practice, difficulty tiers and PYQ-pattern sets."
      />

      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-12">
        {(['Pre-Clinical', 'Para-Clinical', 'Clinical'] as const).map((cat) => (
          <div key={cat}>
            <h2 className="font-display font-bold text-lg mb-4">{cat}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories[cat].map((subject) => {
                const reviewedCount = subject.topics.filter((t) => progress[`${subject.slug}:${t.id}`]).length
                const completionPct = subject.topics.length > 0 ? Math.round((reviewedCount / subject.topics.length) * 100) : 0
                return (
                  <Link key={subject.slug} to={`/subjects/${subject.slug}`} className="card card-hover p-6 flex flex-col">
                    <span className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${SUBJECT_COLOR_CLASSES[subject.color] ?? ''}`}>
                      <SubjectIcon name={subject.icon} className="w-5 h-5" />
                    </span>
                    <h3 className="font-display font-bold text-lg mb-1.5">{subject.name}</h3>
                    <p className="text-sm text-muted-foreground flex-1" style={{ lineHeight: 1.6 }}>
                      {subject.description}
                    </p>
                    <div className="flex items-center justify-between mt-5 text-xs text-muted-foreground">
                      <span>{subject.topics.length} topics · {totalQuestionCount(subject)} questions</span>
                      <span className="font-semibold text-primary">{completionPct}% reviewed</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
