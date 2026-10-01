import type { Topic } from '../../types'

export const communityMedicineTopics: Topic[] = [
  {
    id: 'epidemiology-biostatistics',
    name: 'Epidemiology & Biostatistics',
    description: 'Study designs, screening tests, and measures of disease frequency.',
    questions: [
      {
        id: 'cm-1',
        text: 'Which study design is most appropriate for investigating a rare disease with a suspected exposure, and is generally the fastest/cheapest to conduct?',
        options: [
          'Case-control study',
          'Prospective cohort study',
          'Randomized controlled trial',
          'Cross-sectional study',
        ],
        correctIndex: 0,
        explanation:
          'Case-control studies start with disease status (cases vs. controls) and look backward for exposure, making them efficient and relatively quick/inexpensive for rare diseases — unlike cohort studies, which would require following huge populations to accrue enough rare-disease events.',
        reference: 'Park\'s Textbook of Preventive and Social Medicine',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['study-design'],
      },
      {
        id: 'cm-2',
        text: 'A new screening test for a disease has high sensitivity but low specificity. What is the main practical consequence?',
        options: [
          'The positive predictive value is always 100%',
          'Many false positives, requiring confirmatory testing, but few missed true cases',
          'The test is unsuitable for screening under any circumstance',
          'Many false negatives, missing true cases',
        ],
        correctIndex: 1,
        explanation:
          'High sensitivity means the test rarely misses true cases (few false negatives), making it good for initial screening; low specificity means many healthy people will also test positive (false positives), necessitating a more specific confirmatory test.',
        reference: "Park's Textbook of Preventive and Social Medicine",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['screening', 'sensitivity-specificity'],
        highYieldNote: '"SnNout": high Sensitivity, Negative result rules OUT disease. "SpPin": high Specificity, Positive result rules IN disease.',
      },
      {
        id: 'cm-3',
        text: 'In a case-control study, the appropriate measure of association between exposure and disease is the:',
        options: [
          'Odds ratio',
          'Attributable risk',
          'Relative risk (risk ratio)',
          'Incidence rate ratio',
        ],
        correctIndex: 0,
        explanation:
          'Because case-control studies select participants by disease status (not exposure), true incidence/risk cannot be calculated directly, so the odds ratio is used as the measure of association, approximating relative risk when the disease is rare.',
        reference: "Park's Textbook of Preventive and Social Medicine",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['odds-ratio', 'biostatistics'],
      },
      {
        id: 'cm-4',
        text: "Assertion (A): The prevalence of a chronic disease can be much higher than its incidence.\nReason (R): Prevalence counts only the new cases that arise during a specified period.",
        options: [
          "Both A and R are true, and R is the correct explanation of A",
          "Both A and R are true, but R is NOT the correct explanation of A",
          "A is true but R is false",
          "A is false but R is true",
        ],
        correctIndex: 2,
        explanation:
          "A is true: for long-lasting diseases, existing cases accumulate, so prevalence greatly exceeds incidence (prevalence ≈ incidence × average duration). R is false: counting only new cases in a period defines incidence. Prevalence counts all existing cases, old and new, at a point or over a period.",
        reference: "Park's Textbook of Preventive and Social Medicine",
        difficulty: 'Hard',
        type: 'assertion-reason',
        tags: ['prevalence-incidence'],
      },
    ],
  },
  {
    id: 'national-health-programs',
    name: 'National Health Programs',
    description: "India's national health programs, immunization schedule, and RCH.",
    questions: [
      {
        id: 'cm-5',
        text: 'Under the Universal Immunization Programme (UIP) in India, the BCG vaccine is typically given:',
        options: [
          'At 6 weeks only',
          'At birth (or as early as possible up to 1 year)',
          'At 9 months along with measles',
          'Only to children with a family history of TB',
        ],
        correctIndex: 1,
        explanation:
          'BCG is given at birth (or as soon as possible up to one year of age) under India\'s UIP schedule, to provide early protection against severe childhood forms of tuberculosis (miliary TB, TB meningitis).',
        reference: "Park's Textbook of Preventive and Social Medicine",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['immunization', 'uip'],
      },
      {
        id: 'cm-6',
        text: 'The National Vector Borne Disease Control Programme (NVBDCP) in India covers which set of diseases?',
        options: [
          "Malaria, dengue, chikungunya, filariasis, kala-azar, JE",
          "Diabetes, hypertension, cancer, stroke and COPD",
          "Malaria, dengue, tuberculosis, leprosy and scrub typhus",
          "Tuberculosis, leprosy, HIV/AIDS and viral hepatitis",
        ],
        correctIndex: 0,
        explanation:
          'NVBDCP is India\'s umbrella program addressing major vector-borne diseases: malaria, dengue, chikungunya, lymphatic filariasis, kala-azar (visceral leishmaniasis), and Japanese encephalitis.',
        reference: "Park's Textbook of Preventive and Social Medicine",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['national-programs'],
      },
      {
        id: 'cm-7',
        text: 'The primary objective of the "Pulse Polio" immunization strategy under India\'s Polio Eradication programme was to:',
        options: [
          "Raise population immunity and interrupt wild virus spread",
          "Vaccinate only children who had never received any dose",
          "Target adults over the age of 40 years",
          "Replace all routine immunisation with one campaign",
        ],
        correctIndex: 0,
        explanation:
          'Pulse Polio involved repeated national immunization days administering OPV to ALL children under 5 (regardless of prior vaccination status) in a short period, rapidly boosting population immunity and interrupting wild poliovirus circulation — India was certified polio-free in 2014.',
        reference: "Park's Textbook of Preventive and Social Medicine",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['polio-eradication'],
      },
      {
        id: 'cm-8',
        text: 'Match each national health program/scheme with its primary focus:',
        options: [
          'Janani Suraksha Yojana → reducing malnutrition/stunting; RBSK → promoting institutional delivery; POSHAN Abhiyaan → child health screening and early intervention',
          'Janani Suraksha Yojana → child health screening and early intervention; RBSK → reducing malnutrition/stunting; POSHAN Abhiyaan → promoting institutional delivery',
          'Janani Suraksha Yojana → promoting institutional delivery; RBSK → child health screening and early intervention; POSHAN Abhiyaan → reducing malnutrition/stunting',
          'Janani Suraksha Yojana → promoting institutional delivery; RBSK → reducing malnutrition/stunting; POSHAN Abhiyaan → child health screening and early intervention',
        ],
        correctIndex: 2,
        explanation:
          'Janani Suraksha Yojana promotes institutional delivery through conditional cash transfers to reduce maternal/neonatal mortality; Rashtriya Bal Swasthya Karyakram (RBSK) screens children for defects/diseases/deficiencies/developmental delays; POSHAN Abhiyaan targets reducing stunting, undernutrition, and anemia.',
        reference: "Park's Textbook of Preventive and Social Medicine",
        difficulty: 'Medium',
        type: 'match-following',
        tags: ['national-programs', 'rch'],
        matchPairs: [
          { left: 'Janani Suraksha Yojana', right: 'Institutional delivery promotion' },
          { left: 'RBSK', right: 'Child health screening' },
          { left: 'POSHAN Abhiyaan', right: 'Reducing malnutrition/stunting' },
        ],
      },
    ],
  },
  {
    id: 'nutrition-mch',
    name: 'Nutrition & Maternal-Child Health',
    description: 'Nutritional deficiency disorders and MCH indicators.',
    questions: [
      {
        id: 'cm-9',
        text: 'A child presents with bilateral pitting pedal edema, a "flaky paint" dermatosis, and hair changes, with a relatively preserved weight-for-height. This is most consistent with:',
        options: [
          "Kwashiorkor",
          "Scurvy",
          "Marasmus",
          "Rickets",
        ],
        correctIndex: 0,
        explanation:
          'Kwashiorkor results from severe protein deficiency (relative to energy intake), causing hypoalbuminemia-driven edema, skin changes ("flaky paint" dermatosis), hair depigmentation, and a fatty liver — distinct from marasmus, which shows severe wasting without edema.',
        reference: "Park's Textbook of Preventive and Social Medicine",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['malnutrition', 'kwashiorkor'],
      },
      {
        id: 'cm-10',
        text: 'The Maternal Mortality Ratio (MMR) is defined as:',
        options: [
          'Number of maternal deaths per 1,000 total pregnancies',
          'Number of maternal deaths per 1,000 population',
          'Percentage of pregnant women who die during antenatal care visits',
          'Number of maternal deaths per 100,000 live births in a given period',
        ],
        correctIndex: 3,
        explanation:
          'MMR = (Number of maternal deaths during pregnancy/childbirth/puerperium ÷ Number of live births) × 100,000, over a defined time period — a key indicator of a health system\'s maternal care quality.',
        reference: "Park's Textbook of Preventive and Social Medicine",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['mch-indicators'],
      },
      {
        id: 'cm-11',
        text: 'Iodine deficiency during pregnancy carries the highest risk of causing which condition in the offspring?',
        options: [
          "Cretinism",
          "Neural tube defects",
          "Congenital rubella syndrome",
          "Fetal alcohol syndrome",
        ],
        correctIndex: 0,
        explanation:
          'Severe iodine deficiency during pregnancy is the leading preventable cause of cretinism — irreversible intellectual disability, growth failure, and neurological deficits in the child — underscoring the importance of universal salt iodization programs.',
        reference: "Park's Textbook of Preventive and Social Medicine",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['iodine-deficiency'],
      },
      {
        id: 'cm-12',
        text: "Assertion (A): Exclusive breastfeeding for the first 6 months of life is recommended by the WHO.\nReason (R): Breast milk alone provides complete nutrition and passive immunity, and reduces infant infection/mortality risk.",
        options: [
          'Both A and R are true, and R is the correct explanation of A',
          'Both A and R are true, but R is NOT the correct explanation of A',
          'A is true but R is false',
          'A is false but R is true',
        ],
        correctIndex: 0,
        explanation:
          'WHO recommends exclusive breastfeeding (no other food or fluids, including water) for the first 6 months because breast milk supplies complete nutrition plus maternal antibodies (especially secretory IgA), significantly reducing infant diarrheal and respiratory infection risk and mortality.',
        reference: "Park's Textbook of Preventive and Social Medicine",
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['breastfeeding'],
      },
    ],
  },
]
