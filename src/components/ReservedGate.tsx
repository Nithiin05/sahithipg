import type { ReactNode } from 'react'
import { useReserved } from '../hooks/useReserved'

/**
 * Renders children once any test-reserved questions among `ids` have loaded
 * (they live in per-test chunks — see data/reservedQuestions.ts). Shows a
 * loading state meanwhile and a retry button if the network request fails.
 */
export default function ReservedGate({ ids, children }: { ids: string[]; children: ReactNode }) {
  const { state, retry } = useReserved(ids)
  if (state === 'ready') return <>{children}</>
  if (state === 'error') {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center" role="alert">
        <p className="font-display font-bold text-lg mb-2">Couldn't load the test questions</p>
        <p className="text-sm text-muted-foreground mb-6">Check your internet connection and try again. Your saved progress is safe.</p>
        <button onClick={retry} className="bg-primary text-primary-foreground rounded-lg px-5 py-2 text-sm font-semibold">
          Try again
        </button>
      </div>
    )
  }
  return (
    <div className="max-w-lg mx-auto px-6 py-24 text-center text-sm text-muted-foreground" role="status">
      Loading questions…
    </div>
  )
}
