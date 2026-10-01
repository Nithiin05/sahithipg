import type { Question } from '../../../types'

/**
 * Compact authoring helper for question batches.
 * `options[0]` is ALWAYS the correct answer when authoring; display order is
 * randomised per question by src/lib/optionShuffle.ts, preserving the key.
 */
export function q(
  id: string,
  text: string,
  options: [string, string, string, string],
  explanation: string,
  meta: Omit<Question, 'id' | 'text' | 'options' | 'correctIndex' | 'explanation'>,
): Question {
  return { id, text, options, correctIndex: 0, explanation, ...meta }
}

export const ORIGINAL_DIAGRAM = 'Original schematic diagram, INI-CET Preparation'
