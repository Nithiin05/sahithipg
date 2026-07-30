import type { AttemptRecord, SubjectSlug } from '../types'
import { getSubject } from '../data/subjects'

export interface Recommendation {
  id: string
  message: string
  actionLabel?: string
  actionRoute?: string
  tone: 'weakness' | 'warning' | 'positive'
}

function daysAgo(dateStr: string): number {
  return (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)
}

/** Personalized "practice next" suggestions derived from attempt history. */
export function getRecommendations(attempts: AttemptRecord[]): Recommendation[] {
  const recs: Recommendation[] = []
  if (attempts.length === 0) return recs

  // 1. Weakest topic with a meaningful sample size.
  const topicMap = new Map<string, { subject: string; subjectSlug: SubjectSlug; correct: number; total: number }>()
  for (const attempt of attempts) {
    for (const ans of attempt.answers) {
      if (ans.isCorrect === null) continue
      const key = `${ans.subject}::${ans.topic}`
      const entry = topicMap.get(key) ?? { subject: ans.subjectName, subjectSlug: ans.subject, correct: 0, total: 0 }
      entry.total++
      if (ans.isCorrect) entry.correct++
      topicMap.set(key, entry)
    }
  }
  const weakTopics = [...topicMap.entries()]
    .map(([key, v]) => ({ topic: key.split('::')[1], ...v, accuracy: Math.round((v.correct / v.total) * 100) }))
    .filter((t) => t.total >= 3 && t.accuracy < 60)
    .sort((a, b) => a.accuracy - b.accuracy)

  if (weakTopics[0]) {
    const t = weakTopics[0]
    const subject = getSubject(t.subjectSlug)
    recs.push({
      id: `weak-${t.subjectSlug}-${t.topic}`,
      message: `Your ${t.topic} accuracy is only ${t.accuracy}%. Spend your next session practicing ${t.topic}.`,
      actionLabel: `Practice ${subject?.shortName ?? t.subject}`,
      actionRoute: `/practice/${t.subjectSlug}`,
      tone: 'weakness',
    })
  }

  // 2. Marks lost to negative marking, across mock attempts in the last 30 days.
  const recentMocks = attempts.filter((a) => a.kind === 'mock' && daysAgo(a.date) <= 30)
  const marksLost = recentMocks.reduce((sum, a) => sum + a.wrong * (a.marksWrong ?? 0), 0)
  if (marksLost >= 5) {
    recs.push({
      id: 'negative-marking',
      message: `You've lost ${Math.round(marksLost * 10) / 10} marks to negative marking in your recent mocks. Try an Easy-difficulty accuracy set before your next mock.`,
      actionLabel: 'Practice for accuracy',
      actionRoute: '/practice',
      tone: 'warning',
    })
  }

  // 3. Week-over-week improvement, per subject.
  const bySubjectWindow = new Map<SubjectSlug, { subjectName: string; thisWeek: { c: number; t: number }; lastWeek: { c: number; t: number } }>()
  for (const attempt of attempts) {
    const age = daysAgo(attempt.date)
    if (age > 14) continue
    for (const ans of attempt.answers) {
      if (ans.isCorrect === null) continue
      const entry = bySubjectWindow.get(ans.subject) ?? {
        subjectName: ans.subjectName,
        thisWeek: { c: 0, t: 0 },
        lastWeek: { c: 0, t: 0 },
      }
      const bucket = age <= 7 ? entry.thisWeek : entry.lastWeek
      bucket.t++
      if (ans.isCorrect) bucket.c++
      bySubjectWindow.set(ans.subject, entry)
    }
  }
  for (const [slug, v] of bySubjectWindow) {
    if (v.thisWeek.t < 5 || v.lastWeek.t < 5) continue
    const thisAcc = (v.thisWeek.c / v.thisWeek.t) * 100
    const lastAcc = (v.lastWeek.c / v.lastWeek.t) * 100
    const delta = Math.round(thisAcc - lastAcc)
    if (delta >= 8) {
      recs.push({
        id: `improved-${slug}`,
        message: `Your ${v.subjectName} performance has improved by ${delta}% this week — keep it up.`,
        tone: 'positive',
      })
    }
  }

  return recs.slice(0, 5)
}
