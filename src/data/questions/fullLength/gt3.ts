import type { ReservedEntry } from './helpers'
import { gt3Preclinical } from './gt3-preclinical'
import { gt3Paraclinical } from './gt3-paraclinical'
import { gt3Medicine } from './gt3-medicine'
import { gt3SurgeryObgPeds } from './gt3-surgery-obg-peds'
import { gt3Specialties } from './gt3-specialties'

/** All 200 questions written for Grand Test 3 (test-reserved — see helpers.ts). */
export const gt3: ReservedEntry[] = [...gt3Preclinical, ...gt3Paraclinical, ...gt3Medicine, ...gt3SurgeryObgPeds, ...gt3Specialties]
