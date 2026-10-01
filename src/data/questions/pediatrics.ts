import type { Topic } from '../../types'

export const pediatricsTopics: Topic[] = [
  {
    id: 'neonatology',
    name: 'Neonatology',
    description: 'Newborn assessment, jaundice, and resuscitation.',
    questions: [
      {
        id: 'peds-1',
        text: 'The APGAR score assesses all of the following parameters EXCEPT:',
        options: [
          'Reflex irritability',
          'Respiratory effort',
          'Blood glucose level',
          'Heart rate',
        ],
        correctIndex: 2,
        explanation:
          'APGAR (Appearance, Pulse, Grimace, Activity, Respiration) assesses color/appearance, heart rate, reflex irritability (grimace), muscle tone/activity, and respiratory effort at 1 and 5 minutes after birth — blood glucose is not part of the score.',
        reference: "Ghai Essential Pediatrics / Nelson Textbook of Pediatrics",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['apgar-score'],
      },
      {
        id: 'peds-2',
        text: 'A term neonate develops visible jaundice on day 2 of life, with total bilirubin rising rapidly (>5 mg/dL/day) and predominantly unconjugated. This is most consistent with:',
        options: [
          'Breast milk jaundice (typically peaks around 2 weeks)',
          'Pathological jaundice — most likely hemolytic disease (e.g., ABO/Rh incompatibility) — needing urgent evaluation',
          'Biliary atresia (typically presents later, beyond 2 weeks, with conjugated hyperbilirubinemia)',
          'Neonatal hepatitis with predominantly conjugated bilirubin',
        ],
        correctIndex: 1,
        explanation:
          'A rapid rate of rise of bilirubin (>5 mg/dL/day, or >0.5 mg/dL/hour) with predominantly unconjugated hyperbilirubinemia points to pathological jaundice from hemolytic disease (e.g., ABO/Rh incompatibility, G6PD deficiency) rather than benign physiological jaundice, which rises gradually and peaks by day 3-5; biliary atresia and neonatal hepatitis classically cause conjugated hyperbilirubinemia presenting later, and breast milk jaundice peaks around 2 weeks.',
        reference: "Ghai Essential Pediatrics",
        difficulty: 'Hard',
        type: 'clinical-case',
        tags: ['neonatal-jaundice'],
        clinicalPearl: 'Jaundice in the first 24 hours of life is ALWAYS pathological and needs urgent evaluation.',
      },
      {
        id: 'peds-3',
        text: 'In neonatal resuscitation, if a newborn remains apneic/gasping with heart rate <100/min despite initial steps and stimulation, the next step is:',
        options: [
          'Positive pressure ventilation (PPV)',
          'Immediate chest compressions before any ventilation',
          'Only continued tactile stimulation',
          'Epinephrine administration first',
        ],
        correctIndex: 0,
        explanation:
          'Per the Neonatal Resuscitation Program (NRP) algorithm, if initial steps (warm, dry, stimulate, position airway) fail to establish adequate breathing/heart rate ≥100, positive pressure ventilation is the next step — ventilation is always prioritized before chest compressions in neonates, since respiratory causes predominate.',
        reference: 'NRP (Neonatal Resuscitation Program) Guidelines',
        difficulty: 'Medium',
        type: 'guideline',
        tags: ['neonatal-resuscitation'],
      },
      {
        id: 'peds-4',
        text: 'Assertion (A): Kernicterus is a feared complication of severe unconjugated hyperbilirubinemia in neonates.\nReason (R): Unconjugated bilirubin is lipid-soluble and can cross the immature blood-brain barrier, depositing in the basal ganglia.',
        options: [
          'Both A and R are true, and R is the correct explanation of A',
          'Both A and R are true, but R is NOT the correct explanation of A',
          'A is true but R is false',
          'A is false but R is true',
        ],
        correctIndex: 0,
        explanation:
          'Unconjugated (indirect) bilirubin is lipid-soluble and, when present at very high levels (especially in preterm or sick neonates with an immature blood-brain barrier), crosses into the CNS and deposits in the basal ganglia and brainstem nuclei, causing kernicterus — a preventable cause of cerebral palsy and hearing loss if hyperbilirubinemia is treated promptly (phototherapy/exchange transfusion).',
        reference: "Ghai Essential Pediatrics",
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['kernicterus'],
      },
    ],
  },
  {
    id: 'growth-development-immunization',
    name: 'Growth, Development & Immunization',
    description: 'Developmental milestones and the national immunization schedule.',
    questions: [
      {
        id: 'peds-5',
        text: 'By what age does a normally developing infant typically achieve unsupported sitting?',
        options: [
          '12 months',
          '6 months',
          '3 months',
          '9 months',
        ],
        correctIndex: 1,
        explanation:
          'Unsupported sitting is a classic gross motor milestone achieved around 6 months of age, following head control (~3-4 months) and preceding standing with support (~9 months) and independent walking (~12-15 months).',
        reference: "Ghai Essential Pediatrics",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['developmental-milestones'],
      },
      {
        id: 'peds-6',
        text: 'A 9-month-old presenting for a routine visit is due for which vaccine per the Indian National Immunization Schedule?',
        options: [
          "Measles–rubella (first dose)",
          "DPT second booster",
          "Hepatitis B birth dose",
          "BCG (first dose)",
        ],
        correctIndex: 0,
        explanation:
          'Under India\'s Universal Immunization Programme, the first dose of measles-containing vaccine (MR vaccine) is given at 9 completed months, with a second dose at 16-24 months; BCG and hepatitis B birth dose are given at/near birth.',
        reference: "Ghai Essential Pediatrics / India UIP Schedule",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['immunization-schedule'],
      },
      {
        id: 'peds-7',
        text: 'A 3-year-old fails to speak any words, has poor eye contact, and shows repetitive hand-flapping behavior. These features are most suggestive of:',
        options: [
          'Normal variant of speech delay',
          'Autism spectrum disorder',
          'Attention-deficit/hyperactivity disorder',
          'Selective mutism',
        ],
        correctIndex: 1,
        explanation:
          'Impaired social communication (poor eye contact, absent language) combined with repetitive/stereotyped behaviors (hand-flapping) are core diagnostic features of autism spectrum disorder, typically identifiable by early developmental screening around 18-24 months.',
        reference: "Ghai Essential Pediatrics / DSM-5",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['autism-spectrum-disorder'],
      },
      {
        id: 'peds-8',
        text: 'Match each developmental milestone with its typical age of achievement:',
        options: [
          "Social smile → 6 weeks; Sitting without support → 6 months; Walking independently → 12–15 months; Two-word phrases → 18–24 months",
          "Social smile → 6 weeks; Sitting without support → 6 months; Walking independently → 18–24 months; Two-word phrases → 12–15 months",
          "Social smile → 4 months; Sitting without support → 6 months; Walking independently → 12–15 months; Two-word phrases → 18–24 months",
          "Social smile → 6 weeks; Sitting without support → 3 months; Walking independently → 9 months; Two-word phrases → 12 months",
        ],
        correctIndex: 0,
        explanation:
          'Classic milestone timeline: social smile ~6 weeks, unsupported sitting ~6 months, independent walking ~12-15 months, and 2-word phrases (excluding "mama/dada") by 18-24 months — a frequently tested developmental sequence.',
        reference: "Ghai Essential Pediatrics",
        difficulty: 'Medium',
        type: 'match-following',
        tags: ['developmental-milestones'],
        matchPairs: [
          { left: 'Social smile', right: '~6 weeks' },
          { left: 'Sitting without support', right: '~6 months' },
          { left: 'Walking independently', right: '~12-15 months' },
          { left: '2-word phrases', right: '~18-24 months' },
        ],
      },
    ],
  },
  {
    id: 'pediatric-infections-nutrition',
    name: 'Pediatric Infections & Nutrition',
    description: 'Common childhood infections and malnutrition grading.',
    questions: [
      {
        id: 'peds-9',
        text: 'A 2-year-old with severe acute malnutrition (SAM) develops hypoglycemia and hypothermia during the initial stabilization phase. Feeds should be:',
        options: [
          'Started early/frequently (e.g., every 2-3 hours) with a low-osmolar, low-protein starter formula (F-75)',
          'Withheld completely for the first 48 hours',
          'Replaced entirely by IV dextrose alone with no oral feeds',
          'Given as a high-protein, high-calorie formula immediately (F-100) from day one',
        ],
        correctIndex: 0,
        explanation:
          'WHO SAM management protocol uses F-75 (low protein/calorie, low osmolar) in the initial stabilization phase with frequent small feeds to prevent refeeding syndrome and correct hypoglycemia/hypothermia, before transitioning to the higher-energy F-100 in the rehabilitation phase.',
        reference: 'WHO Guidelines for Management of SAM / Ghai Essential Pediatrics',
        difficulty: 'Medium',
        type: 'guideline',
        tags: ['severe-acute-malnutrition'],
      },
      {
        id: 'peds-10',
        text: 'A 4-year-old presents with high fever, barking cough, inspiratory stridor, and hoarseness. This clinical picture is classic for:',
        options: [
          "Croup (laryngotracheobronchitis)",
          "Foreign body aspiration",
          "Bacterial tracheitis",
          "Acute epiglottitis",
        ],
        correctIndex: 0,
        explanation:
          'Croup, most often from parainfluenza virus, causes the classic barking (seal-like) cough, inspiratory stridor, and hoarseness, usually with a low-to-moderate fever; epiglottitis (now rarer due to Hib vaccination) presents more acutely with high fever, drooling, and a toxic-appearing child in the "tripod" position.',
        reference: "Ghai Essential Pediatrics",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['croup'],
      },
      {
        id: 'peds-11',
        text: 'Kwashiorkor is graded/classified in WHO criteria mainly by the presence of:',
        options: [
          'Weight-for-height below -3 SD without edema',
          'Head circumference alone',
          'Bilateral pitting pedal edema',
          'Mid-upper arm circumference alone',
        ],
        correctIndex: 2,
        explanation:
          'WHO defines kwashiorkor (edematous malnutrition) by the presence of bilateral pitting edema, regardless of weight-for-height; severe wasting without edema (marasmus) is instead defined by weight-for-height <-3 SD or very low MUAC.',
        reference: 'WHO Guidelines for Management of SAM',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['malnutrition-classification'],
      },
      {
        id: 'peds-12',
        text: "Assertion (A): Standard-osmolarity ORS (311 mOsm/L) remains preferred over reduced-osmolarity ORS for acute diarrhoea in children.\nReason (R): Reduced-osmolarity ORS (245 mOsm/L) reduces stool output, vomiting and the need for unscheduled IV fluids.",
        options: [
          "Both A and R are true, and R is the correct explanation of A",
          "Both A and R are true, but R is NOT the correct explanation of A",
          "A is true but R is false",
          "A is false but R is true",
        ],
        correctIndex: 3,
        explanation:
          "A is false: WHO and UNICEF recommend reduced-osmolarity ORS (245 mOsm/L) in place of the older 311 mOsm/L formula. R is true, and it is the reason the recommendation changed: reduced-osmolarity ORS lowers stool output, vomiting and the need for unscheduled IV therapy.",
        reference: 'WHO/UNICEF ORS Guidelines',
        difficulty: 'Hard',
        type: 'assertion-reason',
        tags: ['ors', 'diarrhea-management'],
      },
    ],
  },
]
