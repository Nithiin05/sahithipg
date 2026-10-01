/**
 * Estimated percentile & predicted rank for Grand Test results.
 *
 * IMPORTANT: this app is entirely local/client-side with no backend or real
 * candidate pool, so there is no real cohort data to compare against. These
 * numbers are a modeled ESTIMATE only (assuming a bell-curve score
 * distribution loosely typical of large competitive exams) — always labeled
 * as such in the UI. They are meant to give a directional sense of
 * performance, not a guarantee of actual INI-CET rank.
 */

const ASSUMED_MEAN_PCT = 50
const ASSUMED_SD_PCT = 16
/** Rough order-of-magnitude applicant pool size, for illustrative rank estimates only. */
const ASSUMED_COHORT_SIZE = 200000

function erf(x: number): number {
  // Abramowitz & Stegun approximation
  const sign = x < 0 ? -1 : 1
  const ax = Math.abs(x)
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911
  const t = 1 / (1 + p * ax)
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax)
  return sign * y
}

function normalCdf(x: number, mean: number, sd: number): number {
  return 0.5 * (1 + erf((x - mean) / (sd * Math.SQRT2)))
}

export interface PercentileEstimate {
  scorePct: number
  percentile: number
  predictedRank: number
  cohortSize: number
}

/** Given a raw score and max possible score, estimate a percentile + rank. Always present as an estimate in the UI. */
export function estimatePercentile(score: number, maxScore: number): PercentileEstimate {
  const scorePct = maxScore > 0 ? Math.max(0, Math.min(100, (score / maxScore) * 100)) : 0
  const cdf = normalCdf(scorePct, ASSUMED_MEAN_PCT, ASSUMED_SD_PCT)
  const percentile = Math.round(Math.max(1, Math.min(99.9, cdf * 100)) * 10) / 10
  const predictedRank = Math.max(1, Math.round(ASSUMED_COHORT_SIZE * (1 - cdf)))
  return { scorePct: Math.round(scorePct * 10) / 10, percentile, predictedRank, cohortSize: ASSUMED_COHORT_SIZE }
}
