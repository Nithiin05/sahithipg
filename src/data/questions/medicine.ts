import type { Topic } from '../../types'

export const medicineTopics: Topic[] = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    description: 'ECG patterns, acute coronary syndromes, and heart failure.',
    questions: [
      {
        id: 'med-1',
        text: 'A 58-year-old with crushing chest pain has an ECG showing ST-segment elevation in leads II, III, and aVF. Which coronary artery territory and infarct location does this represent?',
        options: [
          'Left main coronary artery — global ischemia',
          'Right coronary artery — inferior wall MI',
          'Left anterior descending artery — anterior wall MI',
          'Left circumflex artery — lateral wall MI',
        ],
        correctIndex: 1,
        explanation:
          'Leads II, III, and aVF are the inferior leads; ST elevation here indicates an inferior wall MI, most often due to right coronary artery occlusion (which also frequently supplies the AV node, risking heart block).',
        reference: "Harrison's Principles of Internal Medicine",
        difficulty: 'Medium',
        type: 'ecg',
        tags: ['ecg', 'stemi'],
        imageAlt: 'Schematic ECG strip showing ST-segment elevation in the inferior leads (II, III, aVF)',
        clinicalPearl: 'Always check a right-sided ECG (V4R) in inferior MI to screen for right ventricular infarction before giving nitrates.',
      },
      {
        id: 'med-2',
        text: 'A patient with acute heart failure has an S3 gallop on auscultation. What does this finding suggest?',
        options: [
          'Rapid ventricular filling into a volume-overloaded/non-compliant ventricle',
          'Aortic valve closure occurring earlier than normal',
          'A physiological finding always seen in healthy elderly adults',
          'Mitral valve opening snap from stenosis',
        ],
        correctIndex: 0,
        explanation:
          'An S3 (third heart sound) occurs during rapid early diastolic filling and is a classic sign of volume overload / systolic heart failure (though it can be physiological in young, healthy people and pregnancy); an S4 instead reflects a stiff, non-compliant ventricle during atrial contraction.',
        reference: "Harrison's Principles of Internal Medicine",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['heart-failure', 'auscultation'],
      },
      {
        id: 'med-3',
        text: "Which combination consists entirely of drug classes shown to reduce mortality in heart failure with reduced ejection fraction (HFrEF)?",
        options: [
          'ACE inhibitors/ARNI, beta-blockers, and mineralocorticoid receptor antagonists',
          'Loop diuretics, thiazide diuretics, and short-acting nitrates',
          'Digoxin, loop diuretics, and central alpha-2 agonists',
          'Non-dihydropyridine calcium channel blockers and short-acting nitrates',
        ],
        correctIndex: 0,
        explanation:
          'The mortality-reducing "four pillars" of HFrEF therapy are ACE inhibitors/ARBs (or ARNI like sacubitril-valsartan), beta-blockers, mineralocorticoid receptor antagonists, and SGLT2 inhibitors — targeting the maladaptive neurohormonal (RAAS/sympathetic) activation. Diuretics improve symptoms but do not clearly reduce mortality.',
        reference: "Harrison's Principles of Internal Medicine",
        difficulty: 'Medium',
        type: 'guideline',
        tags: ['heart-failure', 'pharmacotherapy'],
      },
      {
        id: 'med-4',
        text: "Assertion (A): Atrial fibrillation does not increase the risk of ischaemic stroke once the ventricular rate is controlled.\nReason (R): Loss of coordinated atrial contraction promotes stasis and thrombus formation in the left atrial appendage.",
        options: [
          "Both A and R are true, and R is the correct explanation of A",
          "Both A and R are true, but R is NOT the correct explanation of A",
          "A is true but R is false",
          "A is false but R is true",
        ],
        correctIndex: 3,
        explanation:
          "A is false: rate control does not remove the thromboembolic risk, which depends on the CHA2DS2-VASc score and is reduced by anticoagulation. R is true: atrial stasis, especially in the left atrial appendage, promotes thrombus and embolic stroke.",
        reference: "Harrison's Principles of Internal Medicine",
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['atrial-fibrillation', 'stroke-risk'],
      },
    ],
  },
  {
    id: 'nephro-endo',
    name: 'Nephrology & Endocrinology',
    description: 'Acid-base disorders, diabetes, and thyroid disease.',
    questions: [
      {
        id: 'med-5',
        text: 'An arterial blood gas shows pH 7.28, PaCO2 25 mmHg, HCO3- 12 mEq/L. This represents:',
        options: [
          "Metabolic acidosis, compensated",
          "Primary metabolic alkalosis",
          "Primary respiratory acidosis",
          "Primary respiratory alkalosis",
        ],
        correctIndex: 0,
        explanation:
          'Low pH (acidemia) with low HCO3- indicates a primary metabolic acidosis; the appropriately low PaCO2 reflects respiratory compensation (hyperventilation blowing off CO2) — consistent with Winter\'s formula for expected compensation.',
        reference: "Harrison's Principles of Internal Medicine",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['acid-base'],
      },
      {
        id: 'med-6',
        text: 'A patient with type 1 diabetes presents with polyuria, vomiting, Kussmaul breathing, and fruity breath odor, with blood glucose 450 mg/dL and serum ketones positive. First-line management priorities include:',
        options: [
          'IV insulin bolus and continuous infusion alone, without fluid resuscitation',
          'IV isotonic fluids first, then insulin infusion with careful potassium monitoring/replacement',
          'Immediate IV sodium bicarbonate infusion followed by insulin, irrespective of arterial pH',
          'Oral hypoglycemic agents with fluids given only if the patient becomes hypotensive',
        ],
        correctIndex: 1,
        explanation:
          'DKA management begins with aggressive isotonic fluid resuscitation (correcting volume depletion), followed by an insulin infusion; because insulin drives potassium intracellularly, serum potassium must be monitored closely and replaced before/alongside insulin if low-normal, to prevent life-threatening hypokalemia.',
        reference: "Harrison's Principles of Internal Medicine",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['dka', 'diabetes'],
        clinicalPearl: 'Never give insulin before checking (and if needed correcting) serum potassium in DKA — risk of fatal hypokalemia-induced arrhythmia.',
      },
      {
        id: 'med-7',
        text: 'A patient with hyperthyroidism, exophthalmos, and a diffusely enlarged, non-tender thyroid with a bruit most likely has:',
        options: [
          "Toxic multinodular goiter",
          "Subacute (de Quervain) thyroiditis",
          "Hashimoto thyroiditis",
          "Graves disease (diffuse toxic goiter)",
        ],
        correctIndex: 3,
        explanation:
          'Graves disease, an autoimmune condition driven by TSH-receptor stimulating antibodies, classically presents with diffuse goiter (often with an audible bruit from hypervascularity), hyperthyroidism, and unique extrathyroidal features like exophthalmos and pretibial myxedema.',
        reference: "Harrison's Principles of Internal Medicine",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['graves-disease', 'thyroid'],
      },
      {
        id: 'med-8',
        text: 'Match each acid-base disorder with its classic clinical scenario:',
        options: [
          "High anion gap metabolic acidosis → DKA; Metabolic alkalosis → prolonged vomiting; Respiratory acidosis → COPD with CO2 retention; Respiratory alkalosis → anxiety hyperventilation",
          "High anion gap metabolic acidosis → prolonged vomiting; Metabolic alkalosis → DKA; Respiratory acidosis → COPD with CO2 retention; Respiratory alkalosis → anxiety hyperventilation",
          "High anion gap metabolic acidosis → DKA; Metabolic alkalosis → prolonged vomiting; Respiratory acidosis → anxiety hyperventilation; Respiratory alkalosis → COPD with CO2 retention",
          "High anion gap metabolic acidosis → DKA; Metabolic alkalosis → anxiety hyperventilation; Respiratory acidosis → COPD with CO2 retention; Respiratory alkalosis → prolonged vomiting",
        ],
        correctIndex: 0,
        explanation:
          'High anion-gap metabolic acidosis is classic for DKA, lactic acidosis, and toxin ingestion ("MUDPILES"); metabolic alkalosis follows loss of gastric acid (vomiting) or diuretic use; respiratory acidosis reflects CO2 retention from hypoventilation (e.g., COPD); respiratory alkalosis follows hyperventilation (e.g., anxiety, high altitude, PE).',
        reference: "Harrison's Principles of Internal Medicine",
        difficulty: 'Medium',
        type: 'match-following',
        tags: ['acid-base'],
        matchPairs: [
          { left: 'High anion-gap metabolic acidosis', right: 'DKA, lactic acidosis' },
          { left: 'Metabolic alkalosis', right: 'Prolonged vomiting' },
          { left: 'Respiratory acidosis', right: 'COPD / hypoventilation' },
          { left: 'Respiratory alkalosis', right: 'Anxiety / hyperventilation' },
        ],
      },
    ],
  },
  {
    id: 'infectious-pulm',
    name: 'Infectious Diseases & Pulmonology',
    description: 'Tuberculosis, pneumonia, and obstructive airway disease.',
    questions: [
      {
        id: 'med-9',
        text: 'Under the current India TB program (NTEP), the first-line intensive-phase regimen for a new drug-sensitive pulmonary TB case typically includes:',
        options: [
          'Isoniazid and Rifampicin only',
          'A single-drug Isoniazid regimen',
          'Streptomycin, Ethambutol, and Pyrazinamide only, without Rifampicin',
          'Isoniazid, Rifampicin, Pyrazinamide, and Ethambutol (HRZE)',
        ],
        correctIndex: 3,
        explanation:
          'The standard intensive phase for new drug-sensitive TB combines four first-line drugs — Isoniazid, Rifampicin, Pyrazinamide, Ethambutol (HRZE) — to rapidly reduce bacillary load and prevent resistance, followed by a continuation phase.',
        reference: 'Harrison\'s Principles of Internal Medicine / India NTEP guidelines',
        difficulty: 'Easy',
        type: 'guideline',
        tags: ['tuberculosis', 'ntep'],
      },
      {
        id: 'med-10',
        text: 'A 65-year-old smoker with COPD presents with an acute exacerbation — increased dyspnea, increased sputum volume, and purulence. Initial management includes:',
        options: [
          'Antibiotics only, without bronchodilators',
          'Immediate mechanical ventilation for all exacerbations regardless of severity',
          'Bronchodilators, systemic corticosteroids, and antibiotics if criteria for bacterial exacerbation are met',
          'High-flow 100% oxygen without monitoring in all COPD patients',
        ],
        correctIndex: 2,
        explanation:
          "Acute COPD exacerbations are managed with short-acting inhaled bronchodilators and a short course of systemic corticosteroids. Antibiotics are indicated when all three cardinal symptoms are present (increased dyspnoea, sputum volume and sputum purulence), when two are present and one of them is increased purulence, or when ventilatory support is needed (Anthonisen criteria as used in GOLD). Oxygen is titrated to a target saturation of about 88–92% to avoid worsening CO2 retention.",
        reference: "Harrison's Principles of Internal Medicine / GOLD Guidelines",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['copd'],
      },
      {
        id: 'med-11',
        text: 'A community-acquired pneumonia patient has a CURB-65 score of 3. This indicates:',
        options: [
          'Safe for outpatient management',
          'The score is irrelevant to management decisions',
          'Severe pneumonia, warranting hospital (often ICU-level) admission',
          'Guaranteed need for mechanical ventilation regardless of other findings',
        ],
        correctIndex: 2,
        explanation:
          'CURB-65 (Confusion, Urea >7 mmol/L, Respiratory rate ≥30, low Blood pressure, age ≥65) scores ≥3 indicate severe pneumonia with substantially increased mortality risk, warranting hospital admission and consideration of higher-level (ICU) care.',
        reference: "Harrison's Principles of Internal Medicine",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['pneumonia', 'curb-65'],
      },
      {
        id: 'med-12',
        text: "Assertion (A): Multidrug-resistant tuberculosis (MDR-TB) is defined as resistance to at least isoniazid and rifampicin.\nReason (R): Rifampicin resistance alone (detected by rapid molecular tests like CBNAAT/GeneXpert) is used clinically as a strong proxy for MDR-TB.",
        options: [
          'Both A and R are true, and R is the correct explanation of A',
          'Both A and R are true, but R is NOT the correct explanation of A',
          'A is true but R is false',
          'A is false but R is true',
        ],
        correctIndex: 1,
        explanation:
          'MDR-TB is indeed defined as resistance to at least isoniazid and rifampicin (A is true). Rifampicin resistance detected on GeneXpert/CBNAAT is used as a rapid proxy to flag likely MDR-TB and start appropriate treatment pending full susceptibility testing (R is also true) — but R explains programmatic practice/screening strategy, not the formal definition itself, so R is not the direct explanation of A.',
        reference: 'Harrison\'s Principles of Internal Medicine / WHO TB Guidelines',
        difficulty: 'Hard',
        type: 'assertion-reason',
        tags: ['mdr-tb'],
      },
    ],
  },
]
