import type { Difficulty, Question } from '../types'

/** Internal keys (stable — used in URLs and saved data). Display names come from DIFFICULTY_LABELS. */
export const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard', 'Expert']

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  Easy: 'Easy',
  Medium: 'Moderate',
  Hard: 'Difficult',
  Expert: 'INI-CET Level',
}

/**
 * Difficulty is assigned by the question author against these criteria —
 * never randomly. Questions without an explicit tag are treated as Moderate
 * and flagged by `npm run check:questions`.
 */
export function questionDifficulty(q: Question): Difficulty {
  return q.difficulty ?? 'Medium'
}

export const DIFFICULTY_DESCRIPTIONS: Record<Difficulty, string> = {
  Easy: 'One step: direct recall of a single fact or definition.',
  Medium: 'One interpretation step: a short vignette to diagnosis, a single calculation, or applying one concept.',
  Hard: 'Two or more reasoning steps: diagnosis → mechanism/management, close differentials, or judging a causal link.',
  Expert:
    'INI-CET level: a full clinical vignette with labs/imaging, several reasoning steps, and integration across subjects.',
}
