import type { Subject } from '../types'
import { quantTopics } from './questions/quant'
import { reasoningTopics } from './questions/reasoning'
import { englishTopics } from './questions/english'
import { generalAwarenessTopics } from './questions/generalAwareness'
import { computerKnowledgeTopics } from './questions/computerKnowledge'
import { statisticsTopics } from './questions/statistics'

export const subjects: Subject[] = [
  {
    slug: 'quant',
    name: 'Quantitative Aptitude',
    shortName: 'Quant',
    description: 'Number system, arithmetic, algebra, geometry, and mensuration.',
    color: 'blue',
    topics: quantTopics,
  },
  {
    slug: 'reasoning',
    name: 'General Intelligence & Reasoning',
    shortName: 'Reasoning',
    description: 'Verbal and logical reasoning, series, coding, and puzzles.',
    color: 'violet',
    topics: reasoningTopics,
  },
  {
    slug: 'english',
    name: 'English Language & Comprehension',
    shortName: 'English',
    description: 'Grammar, vocabulary, comprehension, and sentence-level accuracy.',
    color: 'emerald',
    topics: englishTopics,
  },
  {
    slug: 'general-awareness',
    name: 'General Awareness',
    shortName: 'General Awareness',
    description: 'History, polity, geography, economy, science, and static GK.',
    color: 'amber',
    topics: generalAwarenessTopics,
  },
  {
    slug: 'computer-knowledge',
    name: 'Computer Knowledge',
    shortName: 'Computer',
    description: 'Fundamentals, MS Office, internet, and cyber security basics.',
    color: 'rose',
    topics: computerKnowledgeTopics,
  },
  {
    slug: 'statistics',
    name: 'Statistics',
    shortName: 'Statistics',
    description: 'Central tendency, dispersion, and data interpretation (Tier-II Paper-II).',
    color: 'teal',
    topics: statisticsTopics,
  },
]

export function getSubject(slug: string) {
  return subjects.find((s) => s.slug === slug)
}

export function getTopic(subjectSlug: string, topicId: string) {
  const subject = getSubject(subjectSlug)
  const topic = subject?.topics.find((t) => t.id === topicId)
  return { subject, topic }
}

export function totalQuestionCount(subject: Subject) {
  return subject.topics.reduce((sum, t) => sum + t.questions.length, 0)
}
