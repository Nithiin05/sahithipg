import type { Difficulty, Question } from '../types'

export const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard', 'Expert']

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0
  }
  return h
}

/**
 * Every question resolves to a difficulty. An explicit `difficulty` tag wins;
 * otherwise a stable hash of the question's id assigns one, so older,
 * untagged questions still slot cleanly into Easy/Medium/Hard/Expert sets —
 * and always land in the same bucket across sessions.
 */
export function questionDifficulty(q: Question): Difficulty {
  return q.difficulty ?? DIFFICULTIES[hashString(q.id) % DIFFICULTIES.length]
}

export const DIFFICULTY_DESCRIPTIONS: Record<Difficulty, string> = {
  Easy: 'Foundational, single-concept recall questions to build accuracy.',
  Medium: 'Standard NEET PG-level questions mixing two or more concepts.',
  Hard: 'Applied, clinically-integrated questions at real exam difficulty.',
  Expert: 'AIIMS/INI-CET-caliber questions testing deep integration and reasoning.',
}
