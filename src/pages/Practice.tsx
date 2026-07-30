import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { subjects, totalQuestionCount } from '../data/subjects'

const COLOR_CLASSES: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600',
  violet: 'bg-violet-50 text-violet-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  rose: 'bg-rose-50 text-rose-600',
  teal: 'bg-teal-50 text-teal-600',
}

export default function Practice() {
  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Topic-Wise Practice"
        title="Pick a subject, then a topic"
        description="Every topic is a short, focused quiz with instant scoring and explanations for every question."
      />

      <div className="max-w-6xl mx-auto px-6 grid gap-6 sm:grid-cols-2">
        {subjects.map((subject) => (
          <Link key={subject.slug} to={`/practice/${subject.slug}`} className="card card-hover p-6 flex flex-col">
            <span className={`w-11 h-11 rounded-xl flex items-center justify-center font-display font-bold mb-4 ${COLOR_CLASSES[subject.color]}`}>
              {subject.shortName.slice(0, 2).toUpperCase()}
            </span>
            <h2 className="font-display font-bold text-lg mb-1.5">{subject.name}</h2>
            <p className="text-sm text-muted-foreground flex-1" style={{ lineHeight: 1.6 }}>
              {subject.description}
            </p>
            <div className="flex items-center justify-between mt-5 text-xs text-muted-foreground">
              <span>{subject.topics.length} topics</span>
              <span>{totalQuestionCount(subject)} questions</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
