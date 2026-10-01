import type { Question, SourceType } from '../types'

const IMAGE_TYPES = new Set(['image', 'radiology', 'ecg', 'histopath', 'anatomy-image', 'instrument'])

/**
 * Resolve a question's source classification.
 * A question is only ever shown as an actual PYQ when it is explicitly marked
 * 'PYQ' AND names the paper it came from — anything else falls back to
 * PYQ_PATTERN, so an unverified question can never be presented as a real PYQ.
 */
export function sourceTypeOf(q: Question): SourceType {
  if (q.sourceType === 'PYQ') return q.sourceDetail ? 'PYQ' : 'PYQ_PATTERN'
  if (q.sourceType) return q.sourceType
  if (q.isPYQ) return 'PYQ_PATTERN'
  if (q.integratedSubjects && q.integratedSubjects.length > 1) return 'INTEGRATED'
  if (q.imageUrl && q.type && IMAGE_TYPES.has(q.type)) return 'IMAGE'
  return 'PRACTICE'
}

export const SOURCE_LABELS: Record<SourceType, { label: string; detail: string }> = {
  PYQ: { label: 'Verified PYQ', detail: 'Actual INI-CET question' },
  PYQ_PATTERN: { label: 'PYQ Pattern', detail: 'Original question based on historical INI-CET concepts' },
  PRACTICE: { label: 'Practice Question', detail: 'Original educational question' },
  IMAGE: { label: 'Image-Based', detail: 'Original image-interpretation question' },
  INTEGRATED: { label: 'Integrated', detail: 'Original multi-subject question' },
}

/** One-line source description for a specific question, e.g. "INI-CET May 2024". */
export function sourceLine(q: Question): string {
  const t = sourceTypeOf(q)
  if (t === 'PYQ') return q.sourceDetail!
  if (t === 'PYQ_PATTERN' && q.year) return `Based on concepts tested around ${q.year} — not an actual paper question`
  if (t === 'INTEGRATED' && q.integratedSubjects) return q.integratedSubjects.join(' + ')
  return SOURCE_LABELS[t].detail
}
