import type { Subject } from '../types'
import { randomizeOptions } from '../lib/optionShuffle'
import { anatomyTopics } from './questions/anatomy'
import { physiologyTopics } from './questions/physiology'
import { biochemistryTopics } from './questions/biochemistry'
import { pathologyTopics } from './questions/pathology'
import { pharmacologyTopics } from './questions/pharmacology'
import { microbiologyTopics } from './questions/microbiology'
import { forensicMedicineTopics } from './questions/forensicMedicine'
import { communityMedicineTopics } from './questions/communityMedicine'
import { medicineTopics } from './questions/medicine'
import { surgeryTopics } from './questions/surgery'
import { obgTopics } from './questions/obg'
import { pediatricsTopics } from './questions/pediatrics'
import { orthopedicsTopics } from './questions/orthopedics'
import { entTopics } from './questions/ent'
import { ophthalmologyTopics } from './questions/ophthalmology'
import { dermatologyTopics } from './questions/dermatology'
import { psychiatryTopics } from './questions/psychiatry'
import { radiologyTopics } from './questions/radiology'
import { anesthesiaTopics } from './questions/anesthesia'

const rawSubjects: Subject[] = [
  // ---------------------------------------------------------------- Pre-Clinical
  {
    slug: 'anatomy',
    name: 'Anatomy',
    shortName: 'Anatomy',
    description: 'Gross anatomy, embryology, histology, and clinically-oriented neuroanatomy.',
    category: 'Pre-Clinical',
    color: 'rose',
    icon: 'Bone',
    topics: anatomyTopics,
  },
  {
    slug: 'physiology',
    name: 'Physiology',
    shortName: 'Physio',
    description: 'Organ-system physiology — cardiovascular, respiratory, renal, endocrine, and neuromuscular.',
    category: 'Pre-Clinical',
    color: 'sky',
    icon: 'Activity',
    topics: physiologyTopics,
  },
  {
    slug: 'biochemistry',
    name: 'Biochemistry',
    shortName: 'Biochem',
    description: 'Metabolism, molecular biology, genetics, and vitamins/nutrition.',
    category: 'Pre-Clinical',
    color: 'amber',
    icon: 'FlaskConical',
    topics: biochemistryTopics,
  },
  // ---------------------------------------------------------------- Para-Clinical
  {
    slug: 'pathology',
    name: 'Pathology',
    shortName: 'Pathology',
    description: 'General & systemic pathology, hematology, and blood banking.',
    category: 'Para-Clinical',
    color: 'red',
    icon: 'Microscope',
    topics: pathologyTopics,
  },
  {
    slug: 'pharmacology',
    name: 'Pharmacology',
    shortName: 'Pharma',
    description: 'Autonomic, cardiovascular, CNS pharmacology, chemotherapy, and antimicrobials.',
    category: 'Para-Clinical',
    color: 'emerald',
    icon: 'Pill',
    topics: pharmacologyTopics,
  },
  {
    slug: 'microbiology',
    name: 'Microbiology',
    shortName: 'Micro',
    description: 'Bacteriology, virology, parasitology, and mycology.',
    category: 'Para-Clinical',
    color: 'lime',
    icon: 'Bug',
    topics: microbiologyTopics,
  },
  {
    slug: 'forensic-medicine',
    name: 'Forensic Medicine & Toxicology',
    shortName: 'FMT',
    description: 'Thanatology, medical jurisprudence, and clinical toxicology.',
    category: 'Para-Clinical',
    color: 'slate',
    icon: 'Scale',
    topics: forensicMedicineTopics,
  },
  {
    slug: 'community-medicine',
    name: 'Community Medicine (PSM)',
    shortName: 'PSM',
    description: 'Epidemiology, biostatistics, national health programs, and nutrition.',
    category: 'Para-Clinical',
    color: 'teal',
    icon: 'Users',
    topics: communityMedicineTopics,
  },
  // ---------------------------------------------------------------- Clinical
  {
    slug: 'medicine',
    name: 'General Medicine',
    shortName: 'Medicine',
    description: 'Cardiology, nephrology, endocrinology, infectious disease, and pulmonology.',
    category: 'Clinical',
    color: 'blue',
    icon: 'HeartPulse',
    topics: medicineTopics,
  },
  {
    slug: 'surgery',
    name: 'General Surgery',
    shortName: 'Surgery',
    description: 'Surgical principles, GI surgery, and urology/uro-oncology.',
    category: 'Clinical',
    color: 'orange',
    icon: 'Scissors',
    topics: surgeryTopics,
  },
  {
    slug: 'obg',
    name: 'Obstetrics & Gynecology',
    shortName: 'OBG',
    description: 'Antenatal care, labour, gynecological disorders, and high-risk pregnancy.',
    category: 'Clinical',
    color: 'pink',
    icon: 'Baby',
    topics: obgTopics,
  },
  {
    slug: 'pediatrics',
    name: 'Pediatrics',
    shortName: 'Pediatrics',
    description: 'Neonatology, growth & development, immunization, and childhood infections.',
    category: 'Clinical',
    color: 'cyan',
    icon: 'Smile',
    topics: pediatricsTopics,
  },
  {
    slug: 'orthopedics',
    name: 'Orthopedics',
    shortName: 'Ortho',
    description: 'Fractures & trauma, bone/joint infections, and metabolic bone disease.',
    category: 'Clinical',
    color: 'stone',
    icon: 'Dumbbell',
    topics: orthopedicsTopics,
  },
  {
    slug: 'ent',
    name: 'ENT (Otorhinolaryngology)',
    shortName: 'ENT',
    description: 'Ear disorders, nose & paranasal sinuses, and throat/head-neck conditions.',
    category: 'Clinical',
    color: 'violet',
    icon: 'Ear',
    topics: entTopics,
  },
  {
    slug: 'ophthalmology',
    name: 'Ophthalmology',
    shortName: 'Ophtho',
    description: 'Cornea, refractive errors, glaucoma, retina, and cataract.',
    category: 'Clinical',
    color: 'indigo',
    icon: 'Eye',
    topics: ophthalmologyTopics,
  },
  {
    slug: 'dermatology',
    name: 'Dermatology',
    shortName: 'Derma',
    description: 'Skin infections, papulosquamous/autoimmune disorders, and pigmentary/adnexal disease.',
    category: 'Clinical',
    color: 'fuchsia',
    icon: 'Fingerprint',
    topics: dermatologyTopics,
  },
  {
    slug: 'psychiatry',
    name: 'Psychiatry',
    shortName: 'Psych',
    description: 'Mood/psychotic disorders, anxiety disorders, substance use, and child psychiatry.',
    category: 'Clinical',
    color: 'purple',
    icon: 'Brain',
    topics: psychiatryTopics,
  },
  {
    slug: 'radiology',
    name: 'Radiology',
    shortName: 'Radio',
    description: 'Chest/cardiac imaging, abdominal imaging, and neuroimaging patterns.',
    category: 'Clinical',
    color: 'zinc',
    icon: 'ScanLine',
    topics: radiologyTopics,
  },
  {
    slug: 'anesthesia',
    name: 'Anesthesia',
    shortName: 'Anesthesia',
    description: 'General & regional anesthesia, airway management, and critical care.',
    category: 'Clinical',
    color: 'yellow',
    icon: 'Syringe',
    topics: anesthesiaTopics,
  },
]

/** Subjects with every question's options position-randomized (see lib/optionShuffle.ts). */
export const subjects: Subject[] = rawSubjects.map((s) => ({
  ...s,
  topics: s.topics.map((t) => ({ ...t, questions: t.questions.map(randomizeOptions) })),
}))

export function getSubject(slug: string) {
  return subjects.find((s) => s.slug === slug)
}

export function getTopic(subjectSlug: string, topicId: string) {
  const subject = getSubject(subjectSlug)
  const topic = subject?.topics.find((t) => t.id === topicId)
  return { subject, topic }
}

export function totalQuestionCount(subject: Subject) {
  return subject.topics.reduce((sum, t) => sum + t.questions.length, 0)
}

export function totalQuestionsAcrossAllSubjects() {
  return subjects.reduce((sum, s) => sum + totalQuestionCount(s), 0)
}

export function subjectsByCategory() {
  return {
    'Pre-Clinical': subjects.filter((s) => s.category === 'Pre-Clinical'),
    'Para-Clinical': subjects.filter((s) => s.category === 'Para-Clinical'),
    Clinical: subjects.filter((s) => s.category === 'Clinical'),
  }
}

export function totalTopicsAcrossAllSubjects() {
  return subjects.reduce((sum, s) => sum + s.topics.length, 0)
}

export function totalPYQCount() {
  return subjects.reduce(
    (sum, s) => sum + s.topics.reduce((tSum, t) => tSum + t.questions.filter((q) => q.isPYQ).length, 0),
    0,
  )
}

export function totalClinicalCaseCount() {
  return subjects.reduce(
    (sum, s) => sum + s.topics.reduce((tSum, t) => tSum + t.questions.filter((q) => q.type === 'clinical-case').length, 0),
    0,
  )
}

export function totalImageBasedCount() {
  const imageTypes = new Set(['image', 'radiology', 'ecg', 'histopath', 'anatomy-image', 'instrument'])
  return subjects.reduce(
    (sum, s) => sum + s.topics.reduce((tSum, t) => tSum + t.questions.filter((q) => q.imageUrl && q.type && imageTypes.has(q.type)).length, 0),
    0,
  )
}
