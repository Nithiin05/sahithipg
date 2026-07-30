import type { AttemptRecord } from '../types'
import { mockTests } from '../data/mockTests'
import { getStudyStreak } from './studyTimer'

export interface Achievement {
  id: string
  icon: string
  title: string
  description: string
  unlocked: boolean
  progress?: string
}

const TOTAL_PYP = mockTests.filter((m) => m.kind === 'previous-year').length

export function getAchievements(attempts: AttemptRecord[]): Achievement[] {
  const totalQuestionsSolved = attempts.reduce((s, a) => s + a.attempted, 0)
  const totalCorrect = attempts.reduce((s, a) => s + a.correct, 0)
  const totalAnswered = attempts.reduce((s, a) => s + a.attempted, 0)
  const overallAccuracy = totalAnswered > 0 ? (totalCorrect / totalAnswered) * 100 : 0
  const mockCompleted = attempts.filter((a) => a.kind === 'mock' && (!a.mockKind || a.mockKind === 'full')).length
  const pypCompleted = new Set(
    attempts.filter((a) => a.kind === 'mock' && a.mockKind === 'previous-year').map((a) => a.label),
  ).size
  const streak = getStudyStreak()
  const bestSingleAttemptAccuracy = attempts.reduce((best, a) => {
    if (a.attempted === 0) return best
    return Math.max(best, (a.correct / a.attempted) * 100)
  }, 0)

  return [
    {
      id: 'first-mock',
      icon: '🏆',
      title: 'First Mock Test Completed',
      description: 'Finish your first full-length mock test.',
      unlocked: mockCompleted >= 1,
    },
    {
      id: 'q-100',
      icon: '🏆',
      title: '100 Questions Solved',
      description: 'Answer 100 questions across any practice or mock.',
      unlocked: totalQuestionsSolved >= 100,
      progress: `${Math.min(totalQuestionsSolved, 100)}/100`,
    },
    {
      id: 'q-500',
      icon: '🏆',
      title: '500 Questions Solved',
      description: 'Answer 500 questions across any practice or mock.',
      unlocked: totalQuestionsSolved >= 500,
      progress: `${Math.min(totalQuestionsSolved, 500)}/500`,
    },
    {
      id: 'streak-7',
      icon: '🏆',
      title: '7-Day Study Streak',
      description: 'Study on 7 consecutive days.',
      unlocked: streak >= 7,
      progress: `${Math.min(streak, 7)}/7`,
    },
    {
      id: 'accuracy-90',
      icon: '🏆',
      title: '90% Accuracy',
      description: 'Score 90%+ accuracy in a single attempt.',
      unlocked: bestSingleAttemptAccuracy >= 90,
    },
    {
      id: 'all-pyp',
      icon: '🏆',
      title: 'Completed All Previous Year Papers',
      description: `Complete all ${TOTAL_PYP} previous-year-pattern papers.`,
      unlocked: TOTAL_PYP > 0 && pypCompleted >= TOTAL_PYP,
      progress: `${Math.min(pypCompleted, TOTAL_PYP)}/${TOTAL_PYP}`,
    },
    {
      id: 'overall-accuracy',
      icon: '🏆',
      title: 'Consistent 75% Overall Accuracy',
      description: 'Maintain 75%+ accuracy across all your attempts.',
      unlocked: totalAnswered >= 30 && overallAccuracy >= 75,
    },
  ]
}
