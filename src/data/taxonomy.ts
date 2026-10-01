import type { Question, SubjectSlug } from '../types'
import { syllabus } from './syllabus'
import { sourceTypeOf } from '../lib/questionSource'
import type { QuizQuestionItem } from '../lib/quizEngine'

/**
 * Cross-cutting classification used by system tests, the Question Bank,
 * revision lists and search. Everything is derived from question data, so
 * new questions are classified automatically.
 */

// ---------------------------------------------------------------- Systems

export const SYSTEMS = [
  'Cardiovascular',
  'Respiratory',
  'Renal',
  'Endocrine',
  'Nervous system',
  'Gastrointestinal',
  'Haematology',
  'Reproductive & Obstetrics',
  'Paediatrics',
  'Musculoskeletal',
  'Infectious disease',
  'Skin',
  'Eye',
  'ENT',
  'Psychiatry',
  'Forensic & Toxicology',
  'Community health',
] as const

export type SystemName = (typeof SYSTEMS)[number]

/** Default system for every question in a topic. A question's own `system` field overrides it. */
const TOPIC_SYSTEM: Record<string, SystemName> = {
  'anatomy:upper-limb-thorax': 'Musculoskeletal',
  'anatomy:abdomen-pelvis': 'Gastrointestinal',
  'anatomy:head-neck-neuro': 'Nervous system',
  'physiology:cvs-resp': 'Cardiovascular',
  'physiology:renal-endocrine': 'Renal',
  'physiology:nerve-muscle-cns': 'Nervous system',
  'pathology:hematology': 'Haematology',
  'pharmacology:ans-cvs-pharm': 'Cardiovascular',
  'pharmacology:chemo-antimicrobials': 'Infectious disease',
  'pharmacology:cns-pharm': 'Nervous system',
  'pharmacology:general-pharm-toxicology': 'Forensic & Toxicology',
  'microbiology:bacteriology': 'Infectious disease',
  'microbiology:virology': 'Infectious disease',
  'microbiology:parasitology-mycology': 'Infectious disease',
  'forensic-medicine:thanatology': 'Forensic & Toxicology',
  'forensic-medicine:medical-jurisprudence': 'Forensic & Toxicology',
  'forensic-medicine:toxicology': 'Forensic & Toxicology',
  'community-medicine:epidemiology-biostatistics': 'Community health',
  'community-medicine:national-health-programs': 'Community health',
  'community-medicine:nutrition-mch': 'Community health',
  'medicine:cardiology': 'Cardiovascular',
  'medicine:nephro-endo': 'Renal',
  'medicine:infectious-pulm': 'Respiratory',
  'medicine:neurology': 'Nervous system',
  'medicine:gastroenterology': 'Gastrointestinal',
  'surgery:gi-surgery': 'Gastrointestinal',
  'surgery:urology': 'Renal',
  'obg:obstetrics-antenatal-labour': 'Reproductive & Obstetrics',
  'obg:gynecology-menstrual-reproductive': 'Reproductive & Obstetrics',
  'obg:high-risk-pregnancy': 'Reproductive & Obstetrics',
  'pediatrics:neonatology': 'Paediatrics',
  'pediatrics:growth-development-immunization': 'Paediatrics',
  'pediatrics:pediatric-infections-nutrition': 'Paediatrics',
  'orthopedics:fractures-trauma': 'Musculoskeletal',
  'orthopedics:bone-joint-infections': 'Musculoskeletal',
  'orthopedics:metabolic-bone-disease': 'Musculoskeletal',
  'ent:ear-disorders': 'ENT',
  'ent:nose-paranasal-sinuses': 'ENT',
  'ent:throat-head-neck': 'ENT',
  'ophthalmology:cornea-refractive-errors': 'Eye',
  'ophthalmology:glaucoma': 'Eye',
  'ophthalmology:retina-cataract': 'Eye',
  'dermatology:infections-infestations': 'Skin',
  'dermatology:papulosquamous-autoimmune': 'Skin',
  'dermatology:pigmentary-adnexal': 'Skin',
  'psychiatry:mood-psychotic-disorders': 'Psychiatry',
  'psychiatry:anxiety-neurotic-disorders': 'Psychiatry',
  'psychiatry:substance-child-psychiatry': 'Psychiatry',
  'radiology:chest-cardiac-imaging': 'Respiratory',
  'radiology:abdominal-imaging': 'Gastrointestinal',
  'radiology:neuroimaging': 'Nervous system',
  'surgery:trauma-burns': 'Musculoskeletal',
  'surgery:breast-endocrine-surgery': 'Endocrine',
  'pediatrics:pediatric-cardiology': 'Paediatrics',
  'orthopedics:bone-tumours-paediatric-ortho': 'Musculoskeletal',
  'anatomy:embryology-lower-limb': 'Musculoskeletal',
  'biochemistry:inborn-errors': 'Paediatrics',
  'community-medicine:occupational-environmental': 'Community health',
  'ophthalmology:neuro-ophthalmology': 'Eye',
  'psychiatry:neurocognitive': 'Psychiatry',
}

/** Aliases so a question-level `system` string written slightly differently still maps. */
const SYSTEM_ALIASES: Record<string, SystemName> = {
  haematology: 'Haematology',
  hematology: 'Haematology',
  'nervous system': 'Nervous system',
  neurology: 'Nervous system',
  toxicology: 'Forensic & Toxicology',
  'infectious disease': 'Infectious disease',
  breast: 'Reproductive & Obstetrics',
  genetics: 'Paediatrics',
}

export function systemOf(item: QuizQuestionItem): SystemName | null {
  const own = item.question.system
  if (own) {
    const exact = SYSTEMS.find((s) => s.toLowerCase() === own.toLowerCase())
    if (exact) return exact
    const alias = SYSTEM_ALIASES[own.toLowerCase()]
    if (alias) return alias
  }
  return item.topicId ? (TOPIC_SYSTEM[`${item.subject}:${item.topicId}`] ?? null) : null
}

// ---------------------------------------------------------------- Categories

export type QuestionCategory =
  | 'pyq'
  | 'pyq-pattern'
  | 'clinical'
  | 'image'
  | 'conceptual'
  | 'integrated'
  | 'high-yield'
  | 'rapid'

export const CATEGORY_INFO: Record<QuestionCategory, { label: string; description: string }> = {
  pyq: { label: 'Verified PYQs', description: 'Actual INI-CET questions, tagged with their session.' },
  'pyq-pattern': { label: 'PYQ Pattern', description: 'Original questions modelled on concepts from past INI-CET papers.' },
  clinical: { label: 'Clinical MCQs', description: 'Case vignettes: presentation → investigation → diagnosis → management.' },
  image: { label: 'Image-Based', description: 'ECGs, imaging, histopathology, clinical photographs and diagrams.' },
  conceptual: { label: 'Conceptual', description: 'Core MBBS concepts and mechanisms.' },
  integrated: { label: 'Integrated', description: 'Questions that deliberately combine two or more subjects.' },
  'high-yield': { label: 'High-Yield', description: 'Questions with an exam pearl, on topics flagged High Yield in the INI-CET syllabus.' },
  rapid: { label: 'Rapid Revision', description: 'Short, quick questions for final-week revision.' },
}

const VIGNETTE = /\b\d{1,3}-(year|month|week|day)-old\b|\bneonate\b|\bnewborn\b|\bprimigravida\b|\bpresents with\b/i

export function isClinical(q: Question): boolean {
  return q.type === 'clinical-case' || VIGNETTE.test(q.text)
}

export function isImage(q: Question): boolean {
  return !!q.imageUrl
}

export function isIntegrated(q: Question): boolean {
  return sourceTypeOf(q) === 'INTEGRATED' || (q.integratedSubjects?.length ?? 0) > 1
}

/** Topics linked from a syllabus module that has at least one High Yield focus area. */
const HIGH_YIELD_TOPICS: Set<string> = (() => {
  const set = new Set<string>()
  for (const [slug, modules] of Object.entries(syllabus)) {
    for (const m of modules) {
      if (m.focus.some((f) => f.tags.includes('High Yield'))) {
        for (const t of m.practice) set.add(`${slug}:${t}`)
      }
    }
  }
  return set
})()

/** High-yield = carries an author's clinical pearl / high-yield note AND sits in a High Yield syllabus topic. */
export function isHighYield(item: QuizQuestionItem): boolean {
  const q = item.question
  const flagged = !!(q.clinicalPearl || q.highYieldNote || q.tags?.includes('high-yield'))
  return flagged && !!item.topicId && HIGH_YIELD_TOPICS.has(`${item.subject}:${item.topicId}`)
}

export function isRapid(q: Question): boolean {
  return (q.difficulty === 'Easy' || q.difficulty === 'Medium') && !q.imageUrl && q.text.length <= 220
}

export function inCategory(item: QuizQuestionItem, c: QuestionCategory): boolean {
  const q = item.question
  switch (c) {
    case 'pyq':
      return sourceTypeOf(q) === 'PYQ'
    case 'pyq-pattern':
      return sourceTypeOf(q) === 'PYQ_PATTERN'
    case 'clinical':
      return isClinical(q)
    case 'image':
      return isImage(q)
    case 'integrated':
      return isIntegrated(q)
    case 'conceptual':
      return !isClinical(q) && !isImage(q)
    case 'high-yield':
      return isHighYield(item)
    case 'rapid':
      return isRapid(q)
  }
}

export const ALL_CATEGORIES = Object.keys(CATEGORY_INFO) as QuestionCategory[]

export function subjectSlugs(items: QuizQuestionItem[]): SubjectSlug[] {
  return [...new Set(items.map((i) => i.subject))]
}
