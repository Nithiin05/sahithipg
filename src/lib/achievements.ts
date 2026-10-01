import type { AttemptRecord } from '../types'
import { getStudyStreak } from './studyTimer'

export interface Achievement {
  id: string
  icon: string
  title: string
  description: string
  unlocked: boolean
  progress?: string
}

function subjectAccuracy(attempts: AttemptRecord[], subjectSlug: string) {
  let correct = 0
  let total = 0
  for (const a of attempts) {
    for (const ans of a.answers) {
      if (ans.isCorrect === null || ans.subject !== subjectSlug) continue
      total++
      if (ans.isCorrect) correct++
    }
  }
  return { correct, total, accuracy: total > 0 ? (correct / total) * 100 : 0 }
}

function categoryAccuracy(attempts: AttemptRecord[], subjectSlugs: string[]) {
  let correct = 0
  let total = 0
  for (const a of attempts) {
    for (const ans of a.answers) {
      if (ans.isCorrect === null || !subjectSlugs.includes(ans.subject)) continue
      total++
      if (ans.isCorrect) correct++
    }
  }
  return { correct, total, accuracy: total > 0 ? (correct / total) * 100 : 0 }
}

const CLINICAL_SUBJECTS = [
  'medicine', 'surgery', 'obg', 'pediatrics', 'orthopedics', 'ent',
  'ophthalmology', 'dermatology', 'psychiatry', 'radiology', 'anesthesia',
]

export function getAchievements(attempts: AttemptRecord[]): Achievement[] {
  const totalQuestionsSolved = attempts.reduce((s, a) => s + a.attempted, 0)
  const streak = getStudyStreak()
  const mockOrGrandCompleted = attempts.filter((a) => a.kind === 'mock' || a.kind === 'grand').length
  const grandCompleted = attempts.filter((a) => a.kind === 'grand' || a.mockKind === 'grand' || a.mockKind === 'full').length

  const medicine = subjectAccuracy(attempts, 'medicine')
  const surgery = subjectAccuracy(attempts, 'surgery')
  const clinical = categoryAccuracy(attempts, CLINICAL_SUBJECTS)

  return [
    {
      id: 'first-mock',
      icon: '🏆',
      title: 'First Mock Completed',
      description: 'Finish your first mock or grand test.',
      unlocked: mockOrGrandCompleted >= 1,
    },
    {
      id: 'q-100',
      icon: '💯',
      title: '100 Questions Solved',
      description: 'Answer 100 questions across any practice, mock, or grand test.',
      unlocked: totalQuestionsSolved >= 100,
      progress: `${Math.min(totalQuestionsSolved, 100)}/100`,
    },
    {
      id: 'q-500',
      icon: '🎯',
      title: '500 Questions Solved',
      description: 'Answer 500 questions across any practice, mock, or grand test.',
      unlocked: totalQuestionsSolved >= 500,
      progress: `${Math.min(totalQuestionsSolved, 500)}/500`,
    },
    {
      id: 'q-1000',
      icon: '🚀',
      title: '1000 Questions Solved',
      description: 'Answer 1000 questions across any practice, mock, or grand test.',
      unlocked: totalQuestionsSolved >= 1000,
      progress: `${Math.min(totalQuestionsSolved, 1000)}/1000`,
    },
    {
      id: 'streak-7',
      icon: '🔥',
      title: '7-Day Study Streak',
      description: 'Study on 7 consecutive days.',
      unlocked: streak >= 7,
      progress: `${Math.min(streak, 7)}/7`,
    },
    {
      id: 'streak-30',
      icon: '🔥',
      title: '30-Day Study Streak',
      description: 'Study on 30 consecutive days.',
      unlocked: streak >= 30,
      progress: `${Math.min(streak, 30)}/30`,
    },
    {
      id: 'medicine-master',
      icon: '🩺',
      title: 'Medicine Master',
      description: 'Reach 80%+ accuracy in General Medicine across at least 20 questions.',
      unlocked: medicine.total >= 20 && medicine.accuracy >= 80,
      progress: medicine.total > 0 ? `${Math.round(medicine.accuracy)}%` : undefined,
    },
    {
      id: 'surgery-master',
      icon: '🔪',
      title: 'Surgery Master',
      description: 'Reach 80%+ accuracy in General Surgery across at least 20 questions.',
      unlocked: surgery.total >= 20 && surgery.accuracy >= 80,
      progress: surgery.total > 0 ? `${Math.round(surgery.accuracy)}%` : undefined,
    },
    {
      id: 'clinical-genius',
      icon: '🧠',
      title: 'Clinical Genius',
      description: 'Reach 75%+ accuracy across all clinical subjects combined, over 100+ questions.',
      unlocked: clinical.total >= 100 && clinical.accuracy >= 75,
      progress: clinical.total > 0 ? `${Math.round(clinical.accuracy)}% (${Math.min(clinical.total, 100)}/100)` : undefined,
    },
    {
      id: 'grand-test-expert',
      icon: '🏅',
      title: 'Full-Length Test Expert',
      description: 'Complete 5 full INI-CET mocks or Grand Tests.',
      unlocked: grandCompleted >= 5,
      progress: `${Math.min(grandCompleted, 5)}/5`,
    },
  ]
}
