import { useEffect, useState } from 'react'
import { loadReservedFor, packsFor, reservedReady } from '../data/reservedQuestions'

export type ReservedState = 'ready' | 'loading' | 'error'

/**
 * Makes sure the test-reserved questions among `ids` are loaded, so that
 * findQuestionItem() can resolve them. Returns 'ready' immediately when no
 * reserved question is involved.
 */
export function useReserved(ids: string[]): { state: ReservedState; retry: () => void } {
  const key = packsFor(ids).join(',')
  const [state, setState] = useState<ReservedState>(() => (reservedReady(ids) ? 'ready' : 'loading'))
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (reservedReady(ids)) {
      setState('ready')
      return
    }
    let live = true
    setState('loading')
    loadReservedFor(ids)
      .then(() => live && setState('ready'))
      .catch(() => live && setState('error'))
    return () => {
      live = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, attempt])

  return { state, retry: () => setAttempt((a) => a + 1) }
}
