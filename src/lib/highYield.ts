import { subjects } from '../data/subjects'

export interface HighYieldItem {
  id: string
  subjectSlug: string
  subjectName: string
  topic: string
  kind: 'pearl' | 'note'
  text: string
}

/**
 * Every Clinical Pearl and High-Yield Note authored into the question bank,
 * collected in one place — this powers the Resources page's flashcards /
 * one-liners section, so it's always in sync with the question data (no
 * separate content to maintain).
 */
export function getAllHighYieldItems(): HighYieldItem[] {
  const items: HighYieldItem[] = []
  for (const subject of subjects) {
    for (const topic of subject.topics) {
      for (const q of topic.questions) {
        if (q.clinicalPearl) {
          items.push({ id: `${q.id}-pearl`, subjectSlug: subject.slug, subjectName: subject.shortName, topic: topic.name, kind: 'pearl', text: q.clinicalPearl })
        }
        if (q.highYieldNote) {
          items.push({ id: `${q.id}-note`, subjectSlug: subject.slug, subjectName: subject.shortName, topic: topic.name, kind: 'note', text: q.highYieldNote })
        }
      }
    }
  }
  return items
}
