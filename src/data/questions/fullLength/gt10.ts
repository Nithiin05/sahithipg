import type { ReservedEntry } from './helpers'
import { gt10a } from './gt10-a'
import { gt10b } from './gt10-b'
import { gt10c } from './gt10-c'
import { gt10d } from './gt10-d'
import { gt10e } from './gt10-e'

/** All 200 questions written for Grand Test 10 (test-reserved). */
export const gt10: ReservedEntry[] = [...gt10a, ...gt10b, ...gt10c, ...gt10d, ...gt10e]
