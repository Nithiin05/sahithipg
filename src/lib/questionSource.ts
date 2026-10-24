import type { Question, SourceType } from '../types'

const IMAGE_TYPES = new Set(['image', 'radiology', 'ecg', 'histopath', 'anatomy-image', 'instrument'])

/**
 * Resolve a question's source classification.
 * A question is only ever shown as an actual PYQ when it is explicitly marked
 * 'PYQ' AND names the paper it came from — anything else falls back to
 * PYQ_PATTERN, so an unverified question can never be presented as a real PYQ.
 */
export function sourceTypeOf(q: Question): SourceType {
  if (q.sourceType === 'PYQ' || q.sourceType === 'PYQ_RECALL') return q.sourceDetail ? q.sourceType : 'PYQ_PATTERN'
  if (q.sourceType) return q.sourceType
  if (q.isPYQ) return 'PYQ_PATTERN'
  if (q.integratedSubjects && q.integratedSubjects.length > 1) return 'INTEGRATED'
  if (q.imageUrl && q.type && IMAGE_TYPES.has(q.type)) return 'IMAGE'
  return 'PRACTICE'
}

export const SOURCE_LABELS: Record<SourceType, { label: string; detail: string }> = {
  PYQ: { label: 'Verified PYQ', detail: 'Actual INI-CET question from official material' },
  PYQ_RECALL: { label: 'PYQ Recall', detail: 'Memory-based reconstruction — wording is not official' },
  PYQ_PATTERN: { label: 'PYQ-Inspired', detail: 'Original question on a concept seen in past INI-CET papers — not an actual paper question' },
  PRACTICE: { label: 'Practice Question', detail: 'Original educational question' },
  IMAGE: { label: 'Image-Based', detail: 'Original image-interpretation question' },
  INTEGRATED: { label: 'Integrated', detail: 'Original multi-subject question' },
}

/** One-line source description for a specific question, e.g. "INI-CET May 2024". */
export function sourceLine(q: Question): string {
  const t = sourceTypeOf(q)
  if (t === 'PYQ') return q.sourceDetail!
  if (t === 'PYQ_RECALL') return `${q.sourceDetail} — memory-based recall, not official wording`
  if (t === 'PYQ_PATTERN' && q.year) return `Based on concepts tested around ${q.year} — not an actual paper question`
  if (t === 'INTEGRATED' && q.integratedSubjects) return q.integratedSubjects.join(' + ')
  return SOURCE_LABELS[t].detail
}

/** True for questions that claim to come from an actual paper (official or recalled). */
export function isActualPYQ(q: Question): boolean {
  const t = sourceTypeOf(q)
  return t === 'PYQ' || t === 'PYQ_RECALL'
}
