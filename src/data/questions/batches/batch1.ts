import type { Question, SubjectSlug, Topic } from '../../../types'

/**
 * INI-CET question batch 1 — Medicine, Pathology, Pharmacology.
 *
 * All questions are ORIGINAL. None is presented as an actual INI-CET question.
 * In every question the correct answer is written first (index 0) for ease of
 * review; display order is randomised per question by src/lib/optionShuffle.ts.
 *
 * Merged into the subject banks by src/data/subjects.ts.
 */

const ECG_SOURCE = 'Original schematic diagram, INI-CET Preparation'

export interface BatchAdditions {
  /** New topics appended to the subject. */
  newTopics?: Topic[]
  /** Extra questions appended to existing topics, keyed by topic id. */
  addTo?: Record<string, Question[]>
}

// ============================================================================
// MEDICINE
// ============================================================================

const med: BatchAdditions = {
  addTo: {
    cardiology: [
      {
        id: 'med-101',
        text: 'A 19-year-old has recurrent episodes of palpitations that start and stop abruptly. Between episodes he is well. His resting ECG is shown. What is the definitive treatment?',
        options: [
          'Radiofrequency ablation of the accessory pathway',
          'Lifelong oral verapamil to suppress recurrences',
          'Lifelong oral digoxin to slow AV conduction',
          'Permanent dual-chamber pacemaker implantation',
        ],
        correctIndex: 0,
        explanation:
          'The strip shows a short PR interval, a slurred initial upstroke of the QRS (delta wave) and a broad QRS — ventricular pre-excitation. With symptomatic tachycardia this is Wolff–Parkinson–White syndrome. Catheter ablation of the accessory pathway is curative in most patients. Digoxin and verapamil slow AV-nodal conduction and can favour conduction down the accessory pathway if atrial fibrillation occurs, so they are avoided. A pacemaker has no role.',
        reference: "Harrison's Principles of Internal Medicine; ACC/AHA/HRS SVT guideline",
        difficulty: 'Hard',
        type: 'ecg',
        sourceType: 'IMAGE',
        imageUrl: '/images/ecg/wpw-lead-ii.svg',
        imageAlt: 'Lead II rhythm strip: sinus rhythm, short PR interval, slurred delta wave and broad QRS complexes',
        imageCaption: 'Lead II rhythm strip',
        imageType: 'ecg',
        imageSource: ECG_SOURCE,
        system: 'Cardiovascular',
        tags: ['ecg', 'wpw', 'arrhythmia', 'image'],
        clinicalPearl: 'Short PR + delta wave + broad QRS = pre-excitation. Symptoms make it WPW syndrome.',
      },
      {
        id: 'med-102',
        text: 'A 24-year-old with known Wolff–Parkinson–White syndrome presents with palpitations. He is alert; BP 118/76 mmHg. ECG shows an irregularly irregular broad-complex tachycardia at about 220/min, with QRS morphology varying from beat to beat. Which drug is most appropriate?',
        options: ['IV procainamide', 'IV adenosine', 'IV verapamil', 'IV metoprolol'],
        correctIndex: 0,
        explanation:
          'This is pre-excited atrial fibrillation: AF conducting down the accessory pathway, giving fast, irregular, broad and varying complexes. Drugs that block the AV node (adenosine, verapamil/diltiazem, beta-blockers, digoxin) remove the node’s competition and can accelerate pathway conduction into ventricular fibrillation. A haemodynamically stable patient is treated with a drug that slows pathway conduction, such as IV procainamide (or ibutilide); an unstable patient needs synchronised DC cardioversion.',
        reference: 'ACC/AHA/HRS Atrial Fibrillation Guideline',
        difficulty: 'Expert',
        type: 'clinical-case',
        integratedSubjects: ['Medicine', 'Pharmacology'],
        system: 'Cardiovascular',
        tags: ['wpw', 'atrial-fibrillation', 'antiarrhythmics'],
        clinicalPearl: 'In pre-excited AF, never give AV-nodal blockers. Stable → procainamide; unstable → DC cardioversion.',
      },
      {
        id: 'med-111',
        text: 'A 72-year-old man has had two episodes of syncope while climbing stairs. He has a slow-rising, low-volume pulse, a soft single second heart sound and an ejection systolic murmur radiating to both carotids. Echocardiography: aortic valve area 0.7 cm², mean gradient 52 mmHg, LVEF 60%. What is the most appropriate management?',
        options: [
          'Aortic valve replacement (surgical or TAVI)',
          'Balloon aortic valvuloplasty as definitive treatment',
          'Beta-blocker with a long-acting nitrate, then review',
          'Repeat echocardiography after 6 months of observation',
        ],
        correctIndex: 0,
        explanation:
          'Severe aortic stenosis (valve area < 1.0 cm², mean gradient ≥ 40 mmHg) with symptoms is a class I indication for valve replacement; once syncope, angina or heart failure appear, survival without intervention is poor. Transcatheter (TAVI) or surgical replacement is chosen by age and surgical risk. Balloon valvuloplasty gives only temporary relief and is a bridge, not definitive therapy. Vasodilators such as nitrates can precipitate hypotension and syncope in fixed outflow obstruction. Surveillance is for asymptomatic patients.',
        reference: 'ACC/AHA Valvular Heart Disease Guideline; ESC/EACTS Valvular Guideline',
        difficulty: 'Hard',
        type: 'clinical-case',
        system: 'Cardiovascular',
        tags: ['aortic-stenosis', 'valvular-disease'],
      },
    ],
    'nephro-endo': [
      {
        id: 'med-103',
        text: 'A 58-year-old on maintenance haemodialysis has missed two sessions and feels weak. Serum K+ is 7.4 mmol/L. His ECG is shown. Which drug should be given first?',
        options: ['IV calcium gluconate', 'IV insulin with dextrose', 'IV sodium bicarbonate', 'Oral sodium polystyrene sulfonate'],
        correctIndex: 0,
        explanation:
          'The strip shows flattened P waves, a broad QRS and tall, narrow-based peaked T waves — hyperkalaemia with ECG changes. The first step is to stabilise the myocardium with IV calcium, which acts within minutes but does not lower potassium. Potassium is then shifted into cells (insulin with dextrose, nebulised salbutamol) and removed from the body; in a dialysis patient, urgent haemodialysis is the definitive step. Bicarbonate has little effect in dialysis patients, and oral resins act over hours.',
        reference: "Harrison's Principles of Internal Medicine",
        difficulty: 'Hard',
        type: 'ecg',
        sourceType: 'IMAGE',
        imageUrl: '/images/ecg/hyperkalaemia-lead-ii.svg',
        imageAlt: 'Lead II rhythm strip: flattened P waves, broad QRS complexes and tall, peaked T waves',
        imageCaption: 'Lead II rhythm strip',
        imageType: 'ecg',
        imageSource: ECG_SOURCE,
        integratedSubjects: ['Medicine', 'Physiology'],
        system: 'Renal',
        tags: ['hyperkalaemia', 'ecg', 'electrolytes', 'image'],
        clinicalPearl: 'Hyperkalaemia sequence: stabilise (calcium) → shift (insulin–glucose, salbutamol) → remove (dialysis, binders).',
      },
      {
        id: 'med-106',
        text: 'A 60-year-old smoker has weight loss, polyuria and confusion. Serum calcium 14.2 mg/dL, phosphate 2.3 mg/dL (low), intact PTH 6 pg/mL (normal 15–65), and 1,25-dihydroxyvitamin D low-normal. Chest X-ray shows a central hilar mass; a skeletal survey shows no lytic lesions. What is the most likely mechanism of the hypercalcaemia?',
        options: [
          'PTH-related peptide secreted by a squamous cell carcinoma',
          'Ectopic secretion of intact PTH by a small cell carcinoma',
          'Production of 1,25-dihydroxyvitamin D by tumour cells',
          'Osteolytic metastases releasing calcium from bone',
        ],
        correctIndex: 0,
        explanation:
          'Severe hypercalcaemia with SUPPRESSED PTH excludes primary hyperparathyroidism and true ectopic PTH secretion (which would raise measured PTH). Low phosphate with suppressed PTH points to PTHrP, which acts on PTH receptors in bone and kidney but is not detected by the intact-PTH assay. Squamous cell lung cancer is the classic source. Calcitriol-mediated hypercalcaemia (lymphoma, granulomatous disease) shows a high 1,25-dihydroxyvitamin D, and osteolytic metastases would usually be visible on imaging.',
        reference: "Harrison's Principles of Internal Medicine; Robbins & Cotran Pathologic Basis of Disease",
        difficulty: 'Expert',
        type: 'clinical-case',
        integratedSubjects: ['Medicine', 'Pathology'],
        system: 'Endocrine',
        tags: ['hypercalcaemia', 'paraneoplastic', 'pthrp', 'lung-cancer'],
        clinicalPearl: 'Hypercalcaemia + low PTH: think PTHrP (solid tumours), calcitriol (lymphoma, granulomas) or bone destruction (myeloma, metastases).',
      },
      {
        id: 'med-107',
        text: 'A 42-year-old woman has hypertension requiring three drugs. Serum K+ is 3.3 mmol/L. Plasma aldosterone is 16 ng/dL with suppressed plasma renin activity, giving a markedly raised aldosterone-to-renin ratio. What is the next step?',
        options: [
          'Saline infusion (or oral salt-loading) suppression test',
          'Proceed directly to laparoscopic unilateral adrenalectomy',
          'Adrenal vein sampling before any further biochemical test',
          'Overnight dexamethasone suppression test to confirm it',
        ],
        correctIndex: 0,
        explanation:
          'A raised aldosterone-to-renin ratio is a screening result. The diagnosis of primary aldosteronism is confirmed by showing that aldosterone fails to suppress with sodium loading (saline infusion, oral salt loading or fludrocortisone suppression). Only then is adrenal CT done, followed by adrenal vein sampling to separate a unilateral adenoma (treated surgically) from bilateral hyperplasia (treated with mineralocorticoid antagonists). Dexamethasone suppression tests for cortisol excess, not aldosteronism.',
        reference: 'Endocrine Society Clinical Practice Guideline: Primary Aldosteronism',
        difficulty: 'Hard',
        type: 'clinical-case',
        system: 'Endocrine',
        tags: ['primary-aldosteronism', 'secondary-hypertension'],
      },
      {
        id: 'med-108',
        text: 'A 30-year-old with type 1 diabetes has had 3 days of persistent vomiting. ABG: pH 7.31, PaCO2 29 mmHg, HCO3− 14 mmol/L. Na+ 140 mmol/L, Cl− 90 mmol/L, albumin normal. Which best describes the acid–base status?',
        options: [
          'High anion gap acidosis plus metabolic alkalosis, compensated',
          'Pure high anion gap metabolic acidosis, appropriately compensated',
          'High anion gap acidosis plus normal anion gap acidosis, compensated',
          'High anion gap metabolic acidosis plus respiratory acidosis',
        ],
        correctIndex: 0,
        explanation:
          'Anion gap = 140 − (90 + 14) = 36, so there is a high anion gap metabolic acidosis (ketoacidosis). Winter’s formula: expected PaCO2 = 1.5 × 14 + 8 = 29 ± 2 mmHg; the measured 29 means respiratory compensation is appropriate, with no separate respiratory disorder. Delta–delta: the rise in anion gap (36 − 12 = 24) is much larger than the fall in bicarbonate (24 − 14 = 10), a ratio of 2.4. A ratio above 2 means bicarbonate is higher than the acidosis alone would leave it — a coexisting metabolic alkalosis, here from vomiting.',
        reference: "Harrison's Principles of Internal Medicine",
        difficulty: 'Expert',
        type: 'clinical-case',
        integratedSubjects: ['Medicine', 'Physiology'],
        system: 'Renal',
        tags: ['acid-base', 'anion-gap', 'delta-delta', 'dka', 'calculation'],
        clinicalPearl: 'Delta ratio (ΔAG/ΔHCO3−): < 1 → added normal-gap acidosis; 1–2 → pure high-gap acidosis; > 2 → added metabolic alkalosis.',
      },
    ],
    'infectious-pulm': [
      {
        id: 'med-110',
        text: 'A 45-year-old woman taking oral contraceptives becomes acutely breathless after a long-haul flight. HR 130/min, BP 78/50 mmHg despite a fluid bolus, SpO2 85% on room air. Bedside echocardiography shows a dilated, hypokinetic right ventricle; CT pulmonary angiography is not immediately available. She has no contraindication to anticoagulation or thrombolysis. What is the most appropriate next step?',
        options: [
          'Systemic thrombolysis (e.g. alteplase) with unfractionated heparin',
          'Subcutaneous low-molecular-weight heparin and observation',
          'Insertion of an inferior vena cava filter',
          'Defer treatment until CT pulmonary angiography confirms the diagnosis',
        ],
        correctIndex: 0,
        explanation:
          'Sustained hypotension with right ventricular dysfunction indicates high-risk (massive) pulmonary embolism. When CT is not immediately available in an unstable patient, bedside echocardiographic RV dysfunction is enough to justify reperfusion therapy. Systemic thrombolysis is first-line, with surgical or catheter-directed embolectomy if it is contraindicated or fails. LMWH alone is for haemodynamically stable patients, and an IVC filter is reserved for patients who cannot be anticoagulated.',
        reference: 'ESC Guidelines on Acute Pulmonary Embolism',
        difficulty: 'Expert',
        type: 'clinical-case',
        system: 'Respiratory',
        tags: ['pulmonary-embolism', 'thrombolysis', 'shock'],
      },
      {
        id: 'med-112',
        text: 'A 34-year-old man with newly diagnosed HIV (CD4 count 60/µL) has had 2 weeks of headache and fever. CSF opening pressure is 32 cm H2O, India ink shows encapsulated yeasts and CSF cryptococcal antigen is positive. Induction antifungal therapy is started. When should antiretroviral therapy (ART) be started?',
        options: [
          '4–6 weeks after starting antifungal therapy',
          'Within 48 hours of diagnosis',
          'On the same day as antifungal therapy',
          'Only after the CD4 count rises above 200/µL',
        ],
        correctIndex: 0,
        explanation:
          'In cryptococcal meningitis, starting ART early (within 1–2 weeks) increased mortality in randomised trials, largely from immune reconstitution inflammatory syndrome in the CNS. WHO guidance is to defer ART for 4–6 weeks after starting antifungal therapy. ART should not wait for CD4 recovery — CD4 counts rise only once ART is started. Raised intracranial pressure is managed with repeated therapeutic lumbar punctures.',
        reference: 'WHO Guidelines for the Diagnosis, Prevention and Management of Cryptococcal Disease in HIV',
        difficulty: 'Expert',
        type: 'clinical-case',
        integratedSubjects: ['Medicine', 'Microbiology'],
        system: 'Nervous system',
        tags: ['hiv', 'cryptococcal-meningitis', 'art-timing', 'iris'],
        clinicalPearl: 'Cryptococcal and TB meningitis are the classic exceptions to “start ART immediately”.',
      },
    ],
  },
  newTopics: [
    {
      id: 'neurology',
      name: 'Neurology',
      description: 'Localisation, stroke syndromes and CNS infections.',
      questions: [
        {
          id: 'med-104',
          text: 'A 62-year-old hypertensive man develops sudden vertigo, vomiting and hoarseness. On examination he has left ptosis and miosis, loss of pain and temperature sensation over the left face and the right side of the body, left-sided limb ataxia and a reduced left gag reflex. The tongue protrudes in the midline and there is no limb weakness. Damage to which structure explains his hoarseness and dysphagia?',
          options: ['Nucleus ambiguus', 'Hypoglossal nucleus', 'Spinal trigeminal nucleus', 'Nucleus of the tractus solitarius'],
          correctIndex: 0,
          explanation:
            'This is lateral medullary (Wallenberg) syndrome, usually from vertebral artery or PICA occlusion. The nucleus ambiguus (motor to IX and X) causes dysphagia, hoarseness and a reduced gag. The other findings map to neighbouring structures: spinal trigeminal nucleus/tract (ipsilateral facial pain and temperature loss), spinothalamic tract (contralateral body), descending sympathetic fibres (ipsilateral Horner syndrome) and inferior cerebellar peduncle (ipsilateral ataxia). The hypoglossal nucleus lies medially and is spared, so the tongue is normal. The nucleus of the tractus solitarius carries taste and visceral afferents.',
          reference: "Harrison's Principles of Internal Medicine; Snell's Clinical Neuroanatomy",
          difficulty: 'Expert',
          type: 'clinical-case',
          integratedSubjects: ['Medicine', 'Anatomy'],
          system: 'Nervous system',
          tags: ['brainstem', 'stroke', 'localisation', 'wallenberg'],
          clinicalPearl: 'Lateral medulla spares the hypoglossal nerve and pyramids; medial medullary syndrome involves them.',
        },
        {
          id: 'med-105',
          text: 'A 26-year-old has had 3 weeks of fever and headache and is now drowsy with a right sixth nerve palsy. CSF: raised opening pressure, 250 cells/µL (80% lymphocytes), protein 180 mg/dL, glucose 30 mg/dL (blood glucose 110 mg/dL). India ink stain is negative. Contrast CT shows basal meningeal enhancement and communicating hydrocephalus. What is the most appropriate treatment?',
          options: [
            'Antitubercular therapy with adjunctive dexamethasone',
            'IV ceftriaxone and vancomycin with adjunctive dexamethasone',
            'IV acyclovir pending CSF HSV PCR results',
            'Amphotericin B with flucytosine, then fluconazole',
          ],
          correctIndex: 0,
          explanation:
            'A subacute course, cranial nerve palsy, lymphocytic CSF with high protein and low glucose, basal exudates and hydrocephalus point to tuberculous meningitis. Treatment is four-drug antitubercular therapy (extended continuation phase) plus adjunctive corticosteroids, which reduce mortality. CSF nucleic acid amplification (e.g. Xpert MTB/RIF) supports the diagnosis, but treatment should not wait for results. Bacterial meningitis is usually acute and neutrophilic; HSV encephalitis typically has normal glucose; cryptococcal meningitis is unlikely with a negative India ink stain and no immunosuppression.',
          reference: "Harrison's Principles of Internal Medicine; India TB Programme (NTEP) guidelines",
          difficulty: 'Expert',
          type: 'clinical-case',
          integratedSubjects: ['Medicine', 'Microbiology'],
          system: 'Nervous system',
          tags: ['tb-meningitis', 'csf', 'hydrocephalus'],
        },
      ],
    },
    {
      id: 'gastroenterology',
      name: 'Gastroenterology & Hepatology',
      description: 'GI bleeding, liver disease and portal hypertension.',
      questions: [
        {
          id: 'med-109',
          text: 'A 50-year-old with alcohol-related cirrhosis has massive haematemesis. Pulse 118/min, BP 92/60 mmHg; two large-bore IV lines are placed. Haemoglobin is 7.2 g/dL. Which management plan is most appropriate?',
          options: [
            'Hb target 7–8 g/dL, terlipressin, ceftriaxone, band ligation within 12 h',
            'Hb target above 10 g/dL, IV pantoprazole alone, endoscopy within 72 h',
            'Balloon tamponade first-line, IV fluids, then elective endoscopy',
            'IV propranolol infusion, IV fluids, then endoscopy within 24 h',
          ],
          correctIndex: 0,
          explanation:
            'Suspected acute variceal bleeding is managed with a vasoactive drug (terlipressin, octreotide or somatostatin) started before endoscopy, antibiotic prophylaxis (e.g. ceftriaxone), which reduces infection, rebleeding and death, and endoscopic band ligation within 12 hours. Transfusion is restrictive (threshold about 7 g/dL, target 7–8 g/dL), because over-transfusion raises portal pressure and rebleeding. Balloon tamponade is a temporary bridge for uncontrolled bleeding. Non-selective beta-blockers are for prevention, not the acute bleed.',
          reference: 'Baveno VII Consensus on Portal Hypertension',
          difficulty: 'Expert',
          type: 'clinical-case',
          system: 'Gastrointestinal',
          tags: ['variceal-bleeding', 'cirrhosis', 'portal-hypertension'],
          clinicalPearl: 'Cirrhotic GI bleed: vasoactive drug + antibiotic + endoscopy within 12 h + restrictive transfusion.',
        },
      ],
    },
  ],
}

// ============================================================================
// PATHOLOGY
// ============================================================================

const path: BatchAdditions = {
  addTo: {
    hematology: [
      {
        id: 'path-101',
        text: 'A 48-year-old man has fatigue and a spleen palpable 10 cm below the costal margin. TLC is 1,60,000/µL with neutrophils, myelocytes and metamyelocytes predominating, 6% basophils and 2% blasts. Which finding most reliably distinguishes this condition from a leukaemoid reaction?',
        options: [
          'BCR–ABL1 fusion on FISH or RT-PCR',
          'Toxic granulation and Döhle bodies in neutrophils',
          'A high leukocyte alkaline phosphatase (LAP) score',
          'An absolute neutrophil count above 50,000/µL',
        ],
        correctIndex: 0,
        explanation:
          'Massive splenomegaly, a full spectrum of myeloid maturation and basophilia suggest chronic myeloid leukaemia. Demonstrating the BCR–ABL1 fusion (Philadelphia chromosome, t(9;22)) is diagnostic and also guides tyrosine-kinase-inhibitor therapy. Toxic granulation, Döhle bodies and a HIGH LAP score are features of a leukaemoid reaction (CML has a low LAP score). A very high neutrophil count occurs in both.',
        reference: 'Robbins & Cotran Pathologic Basis of Disease; WHO Classification of Haematolymphoid Tumours',
        difficulty: 'Hard',
        type: 'clinical-case',
        system: 'Haematology',
        tags: ['cml', 'leukaemoid-reaction', 'bcr-abl'],
      },
      {
        id: 'path-102',
        text: 'A 32-year-old woman presents with gum bleeding and ecchymoses. Platelets 18,000/µL, PT and aPTT prolonged, fibrinogen 80 mg/dL, D-dimer markedly raised. Bone marrow shows abnormal promyelocytes with bilobed nuclei, heavy granulation and bundles of Auer rods. Which genetic abnormality is expected?',
        options: ['t(15;17) PML–RARA', 't(8;21) RUNX1–RUNX1T1', 'inv(16) CBFB–MYH11', 't(9;22) BCR–ABL1'],
        correctIndex: 0,
        explanation:
          'Abnormal promyelocytes with bundles of Auer rods ("faggot cells") and disseminated intravascular coagulation define acute promyelocytic leukaemia, caused by t(15;17) producing the PML–RARA fusion. All-trans retinoic acid (with arsenic trioxide) is started as soon as APL is suspected, without waiting for genetic confirmation, because early death from DIC-related haemorrhage is the main risk. t(8;21) and inv(16) are other favourable-risk AMLs; t(9;22) defines CML.',
        reference: 'Robbins & Cotran Pathologic Basis of Disease',
        difficulty: 'Hard',
        type: 'clinical-case',
        system: 'Haematology',
        tags: ['apl', 'aml', 'dic', 'cytogenetics'],
        clinicalPearl: 'Suspect APL → start ATRA immediately. Watch for differentiation syndrome.',
      },
      {
        id: 'path-103',
        text: 'An 8-year-old boy has pallor, intermittent jaundice and splenomegaly; his father had a splenectomy. Hb 9.2 g/dL, MCHC 37 g/dL, reticulocytes 9%. The smear shows spherocytes and the direct antiglobulin test is negative. Which test is now preferred to confirm the diagnosis?',
        options: [
          'Eosin-5′-maleimide (EMA) binding test',
          'Haemoglobin variant analysis by HPLC',
          'Quantitative G6PD enzyme assay',
          'Sucrose lysis (sugar-water) test',
        ],
        correctIndex: 0,
        explanation:
          'A family history, spherocytes, raised MCHC, reticulocytosis and a negative DAT indicate hereditary spherocytosis. The EMA-binding test measures reduced band 3 on the red cell surface by flow cytometry and is the preferred confirmatory test, with higher sensitivity and specificity than the traditional osmotic fragility test. A negative DAT excludes autoimmune haemolysis, which also produces spherocytes. HPLC is for haemoglobinopathies, G6PD assay for oxidative haemolysis, and the sucrose lysis test is an old screening test for PNH.',
        reference: 'British Society for Haematology guideline on hereditary spherocytosis; Robbins & Cotran',
        difficulty: 'Hard',
        type: 'clinical-case',
        system: 'Haematology',
        tags: ['hereditary-spherocytosis', 'haemolytic-anaemia'],
      },
      {
        id: 'path-104',
        text: 'Six weeks after delivery, a 29-year-old woman develops large spontaneous bruises and a thigh muscle haematoma. She has no previous or family history of bleeding. Platelets 2.4 lakh/µL, PT 12 s (normal), aPTT 68 s (control 30 s). A 1:1 mixing study corrects the aPTT initially, but it becomes prolonged again after 2 hours of incubation at 37 °C. What is the most likely diagnosis?',
        options: [
          'Acquired haemophilia A (factor VIII inhibitor)',
          'Lupus anticoagulant (antiphospholipid antibody)',
          'Type 1 von Willebrand disease unmasked postpartum',
          'Mild inherited haemophilia A in a female carrier',
        ],
        correctIndex: 0,
        explanation:
          'New bleeding with an isolated prolonged aPTT and a time- and temperature-dependent inhibitor on mixing is typical of acquired haemophilia A — autoantibodies against factor VIII, classically postpartum, in the elderly or with autoimmune disease. The inhibitor is quantified with the Bethesda assay. Lupus anticoagulant usually fails to correct immediately and causes thrombosis rather than bleeding. Von Willebrand disease and inherited haemophilia correct on mixing because there is no inhibitor, and this patient has no lifelong or family history.',
        reference: "Robbins & Cotran Pathologic Basis of Disease; Hoffbrand's Essential Haematology",
        difficulty: 'Expert',
        type: 'clinical-case',
        system: 'Haematology',
        tags: ['coagulation', 'mixing-study', 'factor-viii-inhibitor'],
        clinicalPearl: 'Mixing study: correction = factor deficiency; no correction (or delayed loss of correction) = inhibitor.',
      },
    ],
    'systemic-pathology': [
      {
        id: 'path-105',
        text: 'A 24-year-old man has haemoptysis, and over 2 weeks his creatinine rises from 1.0 to 4.8 mg/dL. Urine shows red cell casts. Renal biopsy shows crescents in most glomeruli, and immunofluorescence shows linear IgG along the glomerular basement membrane. The autoantibody is directed against:',
        options: [
          'α3 chain (NC1 domain) of type IV collagen',
          'Myeloperoxidase in neutrophil granules (p-ANCA)',
          'Proteinase-3 in neutrophil granules (c-ANCA)',
          'Podocyte phospholipase A2 receptor (PLA2R)',
        ],
        correctIndex: 0,
        explanation:
          'Pulmonary haemorrhage with rapidly progressive (crescentic) glomerulonephritis and LINEAR IgG on immunofluorescence is anti-GBM disease (Goodpasture syndrome). The antibody targets the non-collagenous (NC1) domain of the α3 chain of type IV collagen in glomerular and alveolar basement membranes. ANCA-associated vasculitis also causes pulmonary–renal syndrome but is pauci-immune (little or no immunofluorescence staining). Anti-PLA2R is the antibody of primary membranous nephropathy.',
        reference: 'Robbins & Cotran Pathologic Basis of Disease',
        difficulty: 'Hard',
        type: 'clinical-case',
        integratedSubjects: ['Pathology', 'Medicine'],
        system: 'Renal',
        tags: ['anti-gbm', 'rpgn', 'immunofluorescence'],
        clinicalPearl: 'IF in crescentic GN: linear = anti-GBM; granular = immune complex; pauci-immune = ANCA.',
      },
      {
        id: 'path-106',
        text: 'A 63-year-old heavy smoker has a central lung mass and serum sodium of 121 mmol/L with inappropriately concentrated urine. Bronchial biopsy shows sheets of small cells with scant cytoplasm, finely granular "salt-and-pepper" chromatin, nuclear moulding and crush artefact. Which immunohistochemical marker supports the diagnosis?',
        options: ['Synaptophysin', 'p40', 'Napsin A', 'CK20'],
        correctIndex: 0,
        explanation:
          'Small cells with salt-and-pepper chromatin, nuclear moulding, crush artefact, a central location and SIADH indicate small cell carcinoma, a high-grade neuroendocrine tumour. Neuroendocrine markers — synaptophysin, chromogranin, CD56 and INSM1 — support the diagnosis (TTF-1 is often positive too). p40 marks squamous cell carcinoma and napsin A marks adenocarcinoma. CK20 is negative in small cell lung cancer but positive in Merkel cell carcinoma, a morphological mimic.',
        reference: 'Robbins & Cotran Pathologic Basis of Disease; WHO Classification of Thoracic Tumours',
        difficulty: 'Hard',
        type: 'clinical-case',
        integratedSubjects: ['Pathology', 'Medicine'],
        system: 'Respiratory',
        tags: ['small-cell-carcinoma', 'ihc', 'siadh', 'paraneoplastic'],
      },
      {
        id: 'path-107',
        text: 'A 46-year-old woman’s breast core biopsy shows invasive breast carcinoma of no special type. Immunohistochemistry: ER negative, PR negative, HER2 3+. She is to receive chemotherapy with trastuzumab. Which monitoring is essential during trastuzumab therapy?',
        options: [
          'Left ventricular ejection fraction by echocardiography',
          'Pulmonary function tests with diffusing capacity',
          'Pure-tone audiometry before each treatment cycle',
          'Nerve conduction studies for peripheral neuropathy',
        ],
        correctIndex: 0,
        explanation:
          'HER2 3+ (protein overexpression, usually from ERBB2 amplification) predicts benefit from HER2-targeted therapy such as trastuzumab, a monoclonal antibody against the HER2 extracellular domain. Its main toxicity is cardiac dysfunction (falling LVEF), which is largely reversible but must be monitored before and during treatment, especially when combined with anthracyclines. Pulmonary fibrosis is linked to bleomycin, ototoxicity to cisplatin and neuropathy to taxanes and vinca alkaloids.',
        reference: "Robbins & Cotran Pathologic Basis of Disease; Goodman & Gilman's",
        difficulty: 'Hard',
        type: 'clinical-case',
        integratedSubjects: ['Pathology', 'Pharmacology'],
        system: 'Breast',
        tags: ['her2', 'breast-cancer', 'trastuzumab', 'cardiotoxicity'],
      },
      {
        id: 'path-108',
        text: 'A 45-year-old man who has drunk heavily for 15 years presents with jaundice and tender hepatomegaly. AST 210 U/L, ALT 85 U/L. Liver biopsy shows ballooned hepatocytes containing irregular eosinophilic cytoplasmic inclusions, surrounded by neutrophils. The inclusions are composed of:',
        options: [
          'Ubiquitinated cytokeratin 8/18 filaments',
          'Lipofuscin granules from lipid peroxidation',
          'Shrunken apoptotic hepatocytes (Councilman bodies)',
          'Misfolded alpha-1 antitrypsin in the ER',
        ],
        correctIndex: 0,
        explanation:
          'Alcoholic hepatitis shows hepatocyte ballooning, Mallory–Denk bodies and a neutrophilic infiltrate, often with an AST:ALT ratio above 2. Mallory–Denk bodies are clumps of damaged, ubiquitinated keratin 8/18 intermediate filaments. Lipofuscin is a brown "wear-and-tear" pigment, Councilman bodies are apoptotic hepatocytes typical of viral hepatitis, and alpha-1 antitrypsin deficiency gives round PAS-positive, diastase-resistant globules.',
        reference: 'Robbins & Cotran Pathologic Basis of Disease',
        difficulty: 'Hard',
        type: 'clinical-case',
        system: 'Gastrointestinal',
        tags: ['alcoholic-hepatitis', 'mallory-denk', 'liver'],
      },
      {
        id: 'path-109',
        text: 'A 38-year-old woman has a thyroid nodule. Histology shows papillae with fibrovascular cores lined by cells with overlapping, optically clear nuclei, nuclear grooves and intranuclear pseudo-inclusions, with scattered psammoma bodies. The most common genetic alteration in this tumour is:',
        options: ['BRAF V600E point mutation', 'RAS point mutation', 'PAX8–PPARG fusion', 'Germline RET mutation'],
        correctIndex: 0,
        explanation:
          'Clear ("Orphan Annie eye") nuclei, nuclear grooves, pseudo-inclusions and psammoma bodies define papillary thyroid carcinoma, whose most common driver is BRAF V600E. RET/PTC rearrangements also occur, especially after radiation exposure and in children. RAS mutations and PAX8–PPARG fusion are characteristic of follicular neoplasms, and germline RET mutations cause MEN2 with medullary carcinoma.',
        reference: 'Robbins & Cotran Pathologic Basis of Disease; WHO Classification of Endocrine Tumours',
        difficulty: 'Hard',
        type: 'histopath',
        system: 'Endocrine',
        tags: ['thyroid', 'papillary-carcinoma', 'braf', 'molecular-pathology'],
      },
    ],
    'general-pathology': [
      {
        id: 'path-110',
        text: 'A 58-year-old who has been on haemodialysis for 12 years develops bilateral carpal tunnel syndrome and shoulder pain. Synovial biopsy shows Congo red-positive deposits with apple-green birefringence under polarised light. The amyloid protein is most likely:',
        options: ['β2-microglobulin', 'Serum amyloid A protein', 'Immunoglobulin light chain', 'Amyloid β (Aβ) protein'],
        correctIndex: 0,
        explanation:
          'β2-microglobulin is not removed efficiently by conventional dialysis membranes, so it accumulates and deposits in joints, synovium and tendon sheaths of long-term dialysis patients, typically causing carpal tunnel syndrome and arthropathy. Serum amyloid A causes reactive (AA) amyloidosis in chronic inflammation, light chains cause AL amyloidosis (plasma cell dyscrasias), and Aβ deposits in the brain in Alzheimer disease.',
        reference: 'Robbins & Cotran Pathologic Basis of Disease',
        difficulty: 'Medium',
        type: 'clinical-case',
        system: 'Musculoskeletal',
        tags: ['amyloidosis', 'dialysis'],
      },
      {
        id: 'path-111',
        text: 'A 26-year-old woman is diagnosed with breast cancer. Her brother had osteosarcoma at 14, and her mother died of adrenocortical carcinoma at 35. A germline mutation in which gene is most likely?',
        options: ['TP53', 'BRCA1', 'RB1', 'PTEN'],
        correctIndex: 0,
        explanation:
          'Early-onset breast cancer, sarcoma and adrenocortical carcinoma (with brain tumours and leukaemias) across generations is Li–Fraumeni syndrome, caused by germline TP53 mutations. BRCA1 causes breast and ovarian cancer but not sarcoma or adrenocortical carcinoma. RB1 causes retinoblastoma and osteosarcoma, and PTEN causes Cowden syndrome (breast, thyroid and endometrial cancer with hamartomas).',
        reference: 'Robbins & Cotran Pathologic Basis of Disease',
        difficulty: 'Medium',
        type: 'clinical-case',
        system: 'Genetics',
        tags: ['tumour-suppressor', 'li-fraumeni', 'hereditary-cancer'],
      },
    ],
  },
}

// ============================================================================
// PHARMACOLOGY
// ============================================================================

const pharm: BatchAdditions = {
  addTo: {
    'ans-cvs-pharm': [
      {
        id: 'pharm-101',
        text: 'A 78-year-old woman with heart failure takes digoxin and furosemide. She presents with nausea, confusion and yellow-tinted vision. ECG shows bidirectional ventricular tachycardia; she has a pulse and BP 84/50 mmHg. Serum K+ is 2.9 mmol/L and the digoxin level is markedly raised. What is the most appropriate specific treatment?',
        options: [
          'Digoxin-specific antibody fragments (Fab)',
          'Haemodialysis to remove digoxin',
          'IV calcium gluconate',
          'Synchronised cardioversion at high energy',
        ],
        correctIndex: 0,
        explanation:
          'Bidirectional VT is highly characteristic of digoxin toxicity, here precipitated by diuretic-induced hypokalaemia. A life-threatening arrhythmia is an indication for digoxin-specific Fab, which binds digoxin and reverses toxicity within minutes; potassium is also replaced carefully. Digoxin has a large volume of distribution, so dialysis removes very little. IV calcium is traditionally avoided in digoxin toxicity, and cardioversion of a digoxin-toxic heart risks refractory ventricular arrhythmias.',
        reference: "Goodman & Gilman's The Pharmacological Basis of Therapeutics; KD Tripathi",
        difficulty: 'Expert',
        type: 'clinical-case',
        integratedSubjects: ['Pharmacology', 'Medicine'],
        system: 'Cardiovascular',
        tags: ['digoxin', 'toxicity', 'antidote', 'arrhythmia'],
        clinicalPearl: 'Hypokalaemia, hypomagnesaemia, hypercalcaemia, renal failure and old age all increase digoxin toxicity.',
      },
      {
        id: 'pharm-110',
        text: 'A 74-year-old taking dabigatran for atrial fibrillation presents with an intracerebral haemorrhage. Which agent specifically reverses dabigatran?',
        options: ['Idarucizumab', 'Andexanet alfa', 'Protamine sulfate', 'Vitamin K'],
        correctIndex: 0,
        explanation:
          'Idarucizumab is a humanised monoclonal antibody fragment that binds dabigatran (a direct thrombin inhibitor) and reverses its effect within minutes. Andexanet alfa reverses the factor Xa inhibitors (rivaroxaban, apixaban), protamine reverses heparin, and vitamin K reverses warfarin.',
        reference: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
        difficulty: 'Medium',
        type: 'clinical-case',
        system: 'Haematology',
        tags: ['anticoagulants', 'reversal-agents', 'doac'],
      },
    ],
    'cns-pharm': [
      {
        id: 'pharm-104',
        text: 'A 40-year-old woman taking sertraline is started on tramadol after a fracture. Within 24 hours she is agitated and sweating, with temperature 39.2 °C, HR 124/min, diarrhoea, dilated pupils, hyperreflexia and inducible ankle clonus that is more marked in the legs. Besides stopping both drugs and supportive care, which drug is a specific antagonist used for this condition?',
        options: ['Cyproheptadine', 'Dantrolene', 'Bromocriptine', 'Physostigmine'],
        correctIndex: 0,
        explanation:
          'Rapid onset after adding a second serotonergic drug, with autonomic instability, agitation and neuromuscular hyperactivity (clonus, hyperreflexia, worse in the legs), is serotonin syndrome. Tramadol has serotonin-reuptake-inhibiting activity. Cyproheptadine, a 5-HT2A antagonist, is used alongside benzodiazepines and cooling. Neuroleptic malignant syndrome develops over days with lead-pipe rigidity and slowed reflexes (bromocriptine, dantrolene); malignant hyperthermia follows anaesthetic triggers (dantrolene). Physostigmine is for anticholinergic toxicity.',
        reference: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
        difficulty: 'Hard',
        type: 'clinical-case',
        system: 'Nervous system',
        tags: ['serotonin-syndrome', 'drug-interaction', 'ssri'],
        clinicalPearl: 'Serotonin syndrome = clonus and hyperreflexia, hours. NMS = rigidity and bradyreflexia, days.',
      },
    ],
    'chemo-antimicrobials': [
      {
        id: 'pharm-107',
        text: 'A patient in the ICU has bacteraemia with Klebsiella pneumoniae that produces New Delhi metallo-β-lactamase (NDM). Which regimen is most appropriate?',
        options: [
          'Ceftazidime–avibactam plus aztreonam',
          'Ceftazidime–avibactam as monotherapy',
          'Meropenem–vaborbactam as monotherapy',
          'High-dose piperacillin–tazobactam infusion',
        ],
        correctIndex: 0,
        explanation:
          'NDM is a metallo-β-lactamase that hydrolyses carbapenems, and neither avibactam nor vaborbactam inhibits it, so ceftazidime–avibactam and meropenem–vaborbactam alone are ineffective. Aztreonam is not hydrolysed by metallo-β-lactamases but is destroyed by the ESBLs and AmpC enzymes these isolates usually also carry; adding avibactam protects aztreonam from those enzymes. Ceftazidime–avibactam plus aztreonam (or cefiderocol) is therefore recommended. Piperacillin–tazobactam is inactive against carbapenemase producers.',
        reference: 'IDSA Guidance on the Treatment of Antimicrobial-Resistant Gram-Negative Infections',
        difficulty: 'Expert',
        type: 'clinical-case',
        integratedSubjects: ['Pharmacology', 'Microbiology'],
        system: 'Infectious disease',
        tags: ['amr', 'carbapenemase', 'ndm', 'newer-antibiotics'],
      },
    ],
  },
  newTopics: [
    {
      id: 'general-pharm-toxicology',
      name: 'General Pharmacology & Toxicology',
      description: 'Pharmacokinetics, drug interactions and poisoning.',
      questions: [
        {
          id: 'pharm-102',
          text: 'A renal transplant recipient on tacrolimus, mycophenolate and prednisolone is prescribed clarithromycin for pneumonia. Five days later her creatinine has risen and she has a tremor; the tacrolimus trough level is twice the target. What is the mechanism?',
          options: [
            'Clarithromycin inhibits CYP3A4, reducing tacrolimus clearance',
            'Clarithromycin displaces tacrolimus from plasma proteins',
            'Additive nephrotoxicity without a change in tacrolimus levels',
            'Clarithromycin induces enzymes that activate tacrolimus',
          ],
          correctIndex: 0,
          explanation:
            'Tacrolimus is metabolised by CYP3A4 and is a P-glycoprotein substrate. Clarithromycin strongly inhibits both, so tacrolimus levels rise, causing nephrotoxicity and neurotoxicity (tremor). Azithromycin, which has minimal CYP3A4 inhibition, is preferred, or the tacrolimus dose must be reduced with level monitoring. Enzyme induction (e.g. by rifampicin) would lower levels, and protein-binding displacement rarely causes a sustained rise in free drug.',
          reference: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
          difficulty: 'Hard',
          type: 'clinical-case',
          system: 'Renal',
          tags: ['drug-interaction', 'cyp3a4', 'immunosuppressants'],
        },
        {
          id: 'pharm-103',
          text: 'Several men are brought in after drinking illicit liquor. One reports blurred, "snowfield" vision and abdominal pain. pH 7.12, HCO3− 8 mmol/L, anion gap 28 mmol/L; measured serum osmolality is 330 mOsm/kg against a calculated 290 mOsm/kg. What is the specific antidote?',
          options: ['Fomepizole', 'N-acetylcysteine', 'Pralidoxime', 'Methylene blue'],
          correctIndex: 0,
          explanation:
            'Visual disturbance with a high anion gap metabolic acidosis and a raised osmolal gap (330 − 290 = 40) after illicit liquor indicates methanol poisoning. Toxicity comes from its metabolite formic acid, made via alcohol dehydrogenase. Fomepizole blocks alcohol dehydrogenase (ethanol is the alternative if fomepizole is unavailable), with haemodialysis for severe acidosis or visual signs and folinic acid to speed formate clearance. N-acetylcysteine treats paracetamol poisoning, pralidoxime organophosphates and methylene blue methaemoglobinaemia.',
          reference: "Goodman & Gilman's; KS Narayan Reddy's Essentials of Forensic Medicine & Toxicology",
          difficulty: 'Hard',
          type: 'clinical-case',
          integratedSubjects: ['Pharmacology', 'Forensic Medicine'],
          system: 'Toxicology',
          tags: ['methanol', 'antidote', 'osmolal-gap'],
        },
        {
          id: 'pharm-108',
          text: 'A drug has a volume of distribution of 40 L and an oral bioavailability of 0.8. The target plasma concentration is 4 mg/L. What oral loading dose is required?',
          options: ['200 mg', '128 mg', '160 mg', '400 mg'],
          correctIndex: 0,
          explanation:
            'Loading dose = (Vd × target concentration) ÷ bioavailability = (40 L × 4 mg/L) ÷ 0.8 = 160 ÷ 0.8 = 200 mg. Multiplying by F instead of dividing gives 128 mg; ignoring bioavailability gives 160 mg (the IV loading dose).',
          reference: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
          difficulty: 'Medium',
          type: 'standard',
          system: 'General pharmacology',
          tags: ['pharmacokinetics', 'loading-dose', 'calculation'],
          clinicalPearl: 'Loading dose depends on Vd; maintenance dose depends on clearance.',
        },
        {
          id: 'pharm-109',
          text: 'A man on phenytoin 300 mg/day has a plasma level of 8 mg/L (target 10–20 mg/L). The dose is increased to 400 mg/day. Two weeks later he has nystagmus and ataxia, and the level is 28 mg/L. What best explains this?',
          options: [
            'Saturable metabolism shifting elimination to zero order',
            'Autoinduction of hepatic CYP enzymes by phenytoin',
            'Self-displacement of phenytoin from albumin at higher doses',
            'Reduced renal tubular excretion of unchanged phenytoin',
          ],
          correctIndex: 0,
          explanation:
            'Phenytoin is metabolised by hepatic enzymes that saturate near the therapeutic range (Michaelis–Menten kinetics). Once saturated, a constant amount rather than a constant fraction is eliminated per unit time, so a modest dose increase produces a disproportionate rise in level and toxicity. Autoinduction (classically carbamazepine) would lower levels. Phenytoin is not significantly renally excreted unchanged.',
          reference: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
          difficulty: 'Hard',
          type: 'clinical-case',
          system: 'General pharmacology',
          tags: ['pharmacokinetics', 'zero-order', 'phenytoin', 'tdm'],
        },
        {
          id: 'pharm-111',
          text: 'A 6-year-old is brought in after eating seeds from a roadside plant. He is agitated and hallucinating, with hot, flushed, dry skin, temperature 38.8 °C, dilated pupils, tachycardia, absent bowel sounds and a palpable bladder. Which antidote can be used for severe agitation or delirium?',
          options: ['Physostigmine', 'Neostigmine', 'Atropine', 'Pralidoxime'],
          correctIndex: 0,
          explanation:
            'Dry, flushed skin, hyperthermia, mydriasis, tachycardia, ileus, urinary retention and delirium form the antimuscarinic (anticholinergic) toxidrome — classic for Datura seeds in India. Physostigmine is a tertiary-amine anticholinesterase that crosses the blood–brain barrier and reverses both central and peripheral effects. Neostigmine is a quaternary amine that does not enter the CNS. Physostigmine is avoided when a tricyclic overdose with QRS widening is possible.',
          reference: "Goodman & Gilman's; KS Narayan Reddy's Essentials of Forensic Medicine & Toxicology",
          difficulty: 'Hard',
          type: 'clinical-case',
          integratedSubjects: ['Pharmacology', 'Forensic Medicine'],
          system: 'Toxicology',
          tags: ['datura', 'anticholinergic-toxidrome', 'antidote'],
          clinicalPearl: 'Anticholinergic toxidrome: hot as a hare, dry as a bone, red as a beet, blind as a bat, mad as a hatter.',
        },
      ],
    },
    {
      id: 'immuno-targeted',
      name: 'Immunopharmacology & Targeted Therapy',
      description: 'Monoclonal antibodies, kinase inhibitors and their safety.',
      questions: [
        {
          id: 'pharm-105',
          text: 'A 55-year-old with diffuse large B-cell lymphoma is to start R-CHOP chemotherapy. Which screening test is mandatory before starting rituximab?',
          options: [
            'Hepatitis B serology — HBsAg and total anti-HBc',
            'Interferon-gamma release assay for latent tuberculosis',
            'Thiopurine methyltransferase (TPMT) activity',
            'HLA-B*58:01 genotyping',
          ],
          correctIndex: 0,
          explanation:
            'Rituximab depletes CD20-positive B cells and can cause hepatitis B reactivation — sometimes fulminant hepatitis — in both HBsAg-positive patients and HBsAg-negative/anti-HBc-positive (resolved) infection. All patients should be screened for HBsAg and anti-HBc first, with antiviral prophylaxis (e.g. entecavir or tenofovir) or close monitoring as indicated. Latent TB screening is mandatory before TNF inhibitors, TPMT testing before azathioprine, and HLA-B*58:01 before allopurinol in high-risk populations.',
          reference: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
          difficulty: 'Hard',
          type: 'clinical-case',
          integratedSubjects: ['Pharmacology', 'Microbiology'],
          system: 'Haematology',
          tags: ['monoclonal-antibodies', 'rituximab', 'hbv-reactivation'],
        },
        {
          id: 'pharm-106',
          text: 'A 52-year-old woman who has never smoked has metastatic lung adenocarcinoma with an EGFR exon 19 deletion. Which is the preferred first-line therapy?',
          options: ['Osimertinib', 'Crizotinib', 'Imatinib', 'Trastuzumab'],
          correctIndex: 0,
          explanation:
            'Sensitising EGFR mutations (exon 19 deletion, exon 21 L858R) predict response to EGFR tyrosine kinase inhibitors. Osimertinib, a third-generation EGFR TKI, is preferred first line: it improved survival over earlier EGFR TKIs, is active against the T790M resistance mutation and penetrates the CNS well. Crizotinib targets ALK, ROS1 and MET, imatinib targets BCR–ABL1 and KIT, and trastuzumab targets HER2.',
          reference: "Goodman & Gilman's; NCCN Guidelines for Non-Small Cell Lung Cancer",
          difficulty: 'Hard',
          type: 'clinical-case',
          integratedSubjects: ['Pharmacology', 'Pathology'],
          system: 'Respiratory',
          tags: ['targeted-therapy', 'egfr', 'lung-cancer', 'newer-drugs'],
        },
      ],
    },
  ],
}

export const batch1: Partial<Record<SubjectSlug, BatchAdditions>> = {
  medicine: med,
  pathology: path,
  pharmacology: pharm,
}
