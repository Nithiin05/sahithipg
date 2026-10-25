import type { ReservedEntry } from './helpers'
import { gt9a } from './gt9-a'
import { gt9b } from './gt9-b'
import { gt9c } from './gt9-c'
import { gt9d } from './gt9-d'
import { gt9e } from './gt9-e'

/** All 200 questions written for Grand Test 9 (test-reserved). */
export const gt9: ReservedEntry[] = [...gt9a, ...gt9b, ...gt9c, ...gt9d, ...gt9e]
