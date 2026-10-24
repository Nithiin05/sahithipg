import type { ReservedEntry } from './helpers'
import { gt5a } from './gt5-a'
import { gt5b } from './gt5-b'
import { gt5c } from './gt5-c'
import { gt5d } from './gt5-d'
import { gt5e } from './gt5-e'

/** All 200 questions written for Grand Test 5 (test-reserved). */
export const gt5: ReservedEntry[] = [...gt5a, ...gt5b, ...gt5c, ...gt5d, ...gt5e]
