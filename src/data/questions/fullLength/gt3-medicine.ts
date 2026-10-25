import { r, type ReservedEntry } from './helpers'

/**
 * Grand Test 3 — General Medicine (22 questions). Original questions.
 * Correct answer is written first; display order is randomised.
 */

const HARRISON = "Harrison's Principles of Internal Medicine, 21st ed."
const DAVIDSON = "Davidson's Principles and Practice of Medicine"

export const gt3Medicine: ReservedEntry[] = [
  r('medicine', 'cardiology', 'gt3-med-01',
    'A 60-year-old man has crushing chest pain for 2 hours. ECG shows ST elevation in II, III and aVF, with ST elevation in III greater than in II. BP is 78/50 mmHg, JVP is raised and the lung fields are clear. Right-sided leads show ST elevation in V4R. While arranging primary PCI, which step is most appropriate?',
    ['Give an intravenous fluid bolus and avoid nitrates', 'Give sublingual nitroglycerin and intravenous furosemide', 'Start an intravenous morphine infusion to reduce preload', 'Start intravenous metoprolol to limit infarct size'],
    'Inferior STEMI with hypotension, raised JVP and clear lungs (with ST elevation in V4R) indicates right ventricular infarction, usually from proximal right coronary artery occlusion. The RV is preload-dependent, so cautious fluid loading maintains LV filling; nitrates, diuretics and opioids lower preload and can cause profound hypotension, and β-blockers worsen shock and bradycardia. Inotropes are added if hypotension persists, and urgent reperfusion is the definitive treatment.',
    { difficulty: 'Expert', type: 'clinical-case', reference: `${HARRISON}; ESC Guidelines for the management of acute coronary syndromes, 2023`, guidelineVersion: 'ESC ACS guidelines, 2023', system: 'Cardiovascular', tags: ['rv-infarction', 'inferior-stemi', 'preload'] }),

  r('medicine', 'cardiology', 'gt3-med-02',
    'A 72-year-old woman with hypertension and type 2 diabetes is found to have non-valvular atrial fibrillation. She has normal renal function and no history of stroke or bleeding. What is her CHA₂DS₂-VASc score, and what is recommended?',
    ['4 — long-term oral anticoagulation, preferably with a direct oral anticoagulant', '2 — aspirin alone', '3 — no antithrombotic therapy if she remains in sinus rhythm after cardioversion', '4 — dual antiplatelet therapy with aspirin and clopidogrel'],
    'CHA₂DS₂-VASc: Congestive heart failure 1, Hypertension 1, Age ≥75 2, Diabetes 1, Stroke/TIA 2, Vascular disease 1, Age 65–74 1, Sex category (female) 1. She scores hypertension 1 + diabetes 1 + age 65–74 1 + female 1 = 4. Oral anticoagulation is recommended for a score of ≥2 in men or ≥3 in women, with DOACs preferred over warfarin in non-valvular AF. Aspirin is not an effective alternative for stroke prevention, and stroke risk persists after cardioversion.',
    { difficulty: 'Hard', type: 'clinical-case', reference: `${HARRISON}; ESC Guidelines for atrial fibrillation, 2024`, guidelineVersion: 'ESC AF guidelines 2024 (also recommend CHA2DS2-VA; this woman scores 3 on that version, still anticoagulation)', system: 'Cardiovascular', tags: ['atrial-fibrillation', 'cha2ds2-vasc', 'anticoagulation', 'calculation'] }),

  r('medicine', 'cardiology', 'gt3-med-03',
    'A 19-year-old athlete faints while running. He has a harsh ejection systolic murmur at the left sternal edge that becomes louder on standing from a squat and during the strain phase of a Valsalva manoeuvre, and softer on squatting. What is the most likely diagnosis?',
    ['Hypertrophic obstructive cardiomyopathy', 'Congenital bicuspid aortic valve stenosis', 'Small muscular ventricular septal defect', 'Mitral valve prolapse'],
    'In HOCM the dynamic left ventricular outflow obstruction worsens when the ventricle is smaller (less preload or afterload): standing and Valsalva strain reduce venous return and increase the murmur, while squatting and handgrip increase LV volume/afterload and soften it. Valvular aortic stenosis murmurs get softer with Valsalva. Mitral valve prolapse also changes with preload (click earlier on standing), but presents with a mid-systolic click and late systolic murmur. HOCM is an important cause of sudden death in young athletes.',
    { difficulty: 'Hard', type: 'clinical-case', reference: HARRISON, integratedSubjects: ['Medicine', 'Physiology'], system: 'Cardiovascular', tags: ['hocm', 'dynamic-auscultation', 'syncope'] }),

  r('medicine', 'cardiology', 'gt3-med-04',
    'A 28-year-old who injects drugs has fever for 10 days and a pansystolic murmur at the left lower sternal border that increases on inspiration. Chest X-ray shows multiple peripheral nodular and cavitating opacities in both lungs. Which organism is most likely?',
    ['Staphylococcus aureus', 'Streptococcus viridans group', 'Enterococcus faecalis', 'Coxiella burnetii'],
    'Endocarditis in people who inject drugs most often affects the tricuspid valve (murmur louder on inspiration — Carvallo sign) and is usually caused by Staphylococcus aureus from skin flora. Vegetations embolise to the lungs, producing septic emboli that appear as multiple peripheral cavitating nodules. Viridans streptococci cause subacute endocarditis on damaged left-sided valves; enterococci follow genitourinary procedures; Coxiella causes culture-negative endocarditis.',
    { difficulty: 'Hard', type: 'clinical-case', reference: HARRISON, integratedSubjects: ['Medicine', 'Microbiology'], system: 'Cardiovascular', tags: ['infective-endocarditis', 'tricuspid', 'septic-emboli'] }),

  r('medicine', 'cardiology', 'gt3-med-05',
    'A 74-year-old man has exertional syncope and angina. He has a slow-rising pulse, a soft single second heart sound and an ejection systolic murmur radiating to the carotids. Echocardiography shows a mean aortic valve gradient of 52 mmHg and a valve area of 0.7 cm². What is the appropriate management?',
    ['Aortic valve replacement — surgical or transcatheter', 'Medical therapy with a β-blocker and nitrates, with review in 1 year', 'Balloon valvuloplasty as definitive treatment', 'Vasodilator therapy with an ACE inhibitor titrated to high dose'],
    'Severe aortic stenosis (mean gradient ≥40 mmHg, valve area ≤1.0 cm², peak velocity ≥4 m/s) that is symptomatic (angina, syncope, breathlessness) has a poor prognosis without intervention, and valve replacement is indicated; the choice between surgical and transcatheter replacement depends on age, surgical risk and anatomy. No drug changes the natural history, and nitrates and vasodilators can cause dangerous hypotension because cardiac output is fixed. Balloon valvuloplasty is only a temporary bridge.',
    { difficulty: 'Medium', type: 'clinical-case', reference: `${HARRISON}; ACC/AHA Valvular Heart Disease Guideline, 2020`, system: 'Cardiovascular', tags: ['aortic-stenosis', 'tavi', 'valvular-heart-disease'] }),

  r('medicine', 'nephro-endo', 'gt3-med-06',
    'A 65-year-old man with chronic kidney disease on an ACE inhibitor and spironolactone feels weak. Serum potassium is 7.2 mmol/L; ECG shows tall peaked T waves and widened QRS complexes. What should be given first?',
    ['Intravenous calcium gluconate', 'Intravenous insulin with dextrose', 'Oral sodium polystyrene sulfonate', 'Intravenous furosemide'],
    'With ECG changes of hyperkalaemia, the first priority is to stabilise the myocardial membrane with intravenous calcium (gluconate or chloride), which acts within minutes but does not lower potassium. Next, potassium is shifted into cells (insulin–dextrose, nebulised salbutamol, bicarbonate if acidotic), and then removed from the body (potassium binders, loop diuretics if passing urine, or dialysis). The ACE inhibitor and spironolactone should be stopped.',
    { difficulty: 'Hard', type: 'clinical-case', reference: HARRISON, system: 'Renal & urinary', tags: ['hyperkalaemia', 'calcium-gluconate', 'ecg'] }),

  r('medicine', 'nephro-endo', 'gt3-med-07',
    'A 19-year-old with type 1 diabetes is admitted with vomiting and Kussmaul breathing. Glucose 520 mg/dL, pH 7.08, bicarbonate 7 mmol/L, ketones strongly positive, potassium 3.1 mmol/L. He has received 1 L of 0.9% saline. What is the next most appropriate step?',
    ['Replace potassium first and delay the insulin infusion', 'Start a fixed-rate intravenous insulin infusion immediately at 0.1 U/kg/h', 'Give intravenous sodium bicarbonate to correct the pH above 7.2', 'Give a large subcutaneous bolus of rapid-acting insulin analogue'],
    'Patients with DKA have large total-body potassium deficits even when the serum level is normal. Insulin drives potassium into cells, so starting insulin when potassium is already below 3.3 mmol/L risks fatal arrhythmia and respiratory muscle weakness. The 2024 international consensus advises giving potassium 10–20 mmol/h and postponing insulin until potassium is above 3.5 mmol/L (older ADA guidance used 3.3 mmol/L), while continuing fluids. Bicarbonate is reserved for very severe acidosis (pH <6.9) and can worsen hypokalaemia.',
    { difficulty: 'Expert', type: 'clinical-case', reference: `${HARRISON}; ADA consensus report on hyperglycemic crises in adults, 2024`, guidelineVersion: 'ADA/EASD/JBDS/AACE/DTS consensus on hyperglycemic crises, 2024', integratedSubjects: ['Medicine', 'Physiology'], system: 'Endocrine', tags: ['dka', 'hypokalaemia', 'insulin'] }),

  r('medicine', 'nephro-endo', 'gt3-med-08',
    'A 70-year-old woman with SIADH due to a lung tumour has serum sodium 112 mmol/L. She is drowsy but not seizing. She is treated with hypertonic saline. What is the main reason to limit the rise in sodium to about 8–10 mmol/L in the first 24 hours?',
    ['To avoid osmotic demyelination syndrome', 'To avoid precipitating acute pulmonary oedema from hypertonic saline', 'To avoid cerebral oedema from rapid water entry into brain cells', 'To prevent rebound hypernatraemia from desmopressin escape'],
    'In chronic hyponatraemia (>48 hours) brain cells have lost osmolytes to adapt. Correcting sodium too quickly shrinks them, causing osmotic demyelination (central pontine myelinolysis — dysarthria, dysphagia, quadriparesis, "locked-in" state), especially in alcoholism, malnutrition, hypokalaemia and liver disease. A rise of 4–6 mmol/L is enough to relieve symptoms, and the daily limit is about 8–10 mmol/L (lower in high-risk patients). Cerebral oedema is the danger of the hyponatraemia itself or of rapid correction of hypernatraemia.',
    { difficulty: 'Hard', type: 'clinical-case', reference: HARRISON, system: 'Renal & urinary', tags: ['hyponatraemia', 'osmotic-demyelination', 'siadh'] }),

  r('medicine', 'nephro-endo', 'gt3-med-09',
    'A 40-year-old woman on long-term prednisolone for asthma stopped her tablets a week ago. She now has vomiting, abdominal pain and confusion; BP is 74/40 mmHg, sodium 128 mmol/L and glucose 58 mg/dL. What should be done immediately?',
    ['Give IV hydrocortisone and saline at once, without awaiting test results', 'Perform a short Synacthen test first and treat only if cortisol is low', 'Give oral fludrocortisone and restrict fluids to 1 L a day', 'Give dexamethasone only after an ACTH level is drawn and resulted'],
    'Abrupt withdrawal of long-term glucocorticoids causes adrenal crisis because the hypothalamic–pituitary–adrenal axis is suppressed. Hypotension, hyponatraemia, hypoglycaemia and confusion are life-threatening; treatment is immediate IV hydrocortisone 100 mg (then 200 mg/24 h), IV 0.9% saline and dextrose. A blood sample for cortisol/ACTH may be drawn first if it causes no delay, but treatment must not wait. Fludrocortisone is unnecessary at high hydrocortisone doses, which have mineralocorticoid activity; fluid restriction would be harmful.',
    { difficulty: 'Hard', type: 'clinical-case', reference: `${HARRISON}; Society for Endocrinology emergency guidance: acute adrenal insufficiency`, integratedSubjects: ['Medicine', 'Pharmacology'], system: 'Endocrine', tags: ['adrenal-crisis', 'hydrocortisone', 'steroid-withdrawal'] }),

  r('medicine', 'nephro-endo', 'gt3-med-10',
    'Two weeks after a viral sore throat, a 35-year-old woman has a painful, tender thyroid, fever, palpitations and ESR 80 mm/h. Free T4 is high and TSH suppressed. Radioactive iodine uptake at 24 hours is 1%. What is the most appropriate treatment?',
    ['NSAIDs and a β-blocker', 'Carbimazole titrated over 12–18 months', 'Radioactive iodine ablation of the gland', 'Total thyroidectomy after making her euthyroid'],
    'Painful thyroid, raised ESR, thyrotoxicosis and a very low radio-iodine uptake are typical of subacute granulomatous (de Quervain) thyroiditis. Thyroid hormone leaks from damaged follicles; the gland is not overproducing hormone, so antithyroid drugs are useless and radio-iodine has nothing to act on. Treatment is symptomatic: NSAIDs (or corticosteroids for severe pain) and β-blockers for adrenergic symptoms. A transient hypothyroid phase may follow before recovery. Graves disease shows diffusely increased uptake.',
    { difficulty: 'Hard', type: 'clinical-case', reference: HARRISON, system: 'Endocrine', tags: ['subacute-thyroiditis', 'de-quervain', 'thyrotoxicosis'] }),

  r('medicine', 'nephro-endo', 'gt3-med-11',
    'A patient with severe sepsis has arterial pH 7.10, PaCO2 40 mmHg and bicarbonate 12 mmol/L. How should the acid–base status be interpreted?',
    ['Metabolic acidosis with a concomitant respiratory acidosis', 'Metabolic acidosis with appropriate respiratory compensation', 'Metabolic acidosis with a concomitant respiratory alkalosis', 'Primary respiratory acidosis with metabolic compensation'],
    'Low pH with low bicarbonate is a primary metabolic acidosis. Winter\'s formula predicts the compensatory PaCO2: 1.5 × HCO₃⁻ + 8 ± 2 = 1.5 × 12 + 8 = 26 ± 2 mmHg. A measured PaCO2 of 40 mmHg is far higher than expected, so ventilation is inadequate — a coexisting respiratory acidosis (e.g., fatigue, sedation, impending respiratory failure), which often signals the need for ventilatory support. A PaCO2 below 24 mmHg would indicate an additional respiratory alkalosis.',
    { difficulty: 'Expert', type: 'standard', reference: HARRISON, integratedSubjects: ['Medicine', 'Physiology'], system: 'Renal & urinary', tags: ['acid-base', 'winters-formula', 'mixed-disorder', 'calculation'] }),

  r('medicine', 'nephro-endo', 'gt3-med-12',
    'Which of the following cause a high anion gap metabolic acidosis?\n1. Methanol poisoning\n2. Severe diarrhoea\n3. Lactic acidosis in septic shock\n4. Distal (type 1) renal tubular acidosis',
    ['1 and 3 only', '2 and 4 only', '1, 3 and 4 only', '1, 2, 3 and 4'],
    'A high anion gap (Na⁺ − [Cl⁻ + HCO₃⁻] > ~12 mmol/L) means an unmeasured acid has been added: ketoacids, lactate, uraemic acids, or toxins such as methanol (formate), ethylene glycol (glycolate/oxalate) and salicylate. Bicarbonate loss from the gut (diarrhoea) or failure of renal acid excretion/bicarbonate reabsorption (renal tubular acidoses) is replaced by chloride, giving a normal anion gap, hyperchloraemic acidosis.',
    { difficulty: 'Hard', type: 'multiple-correct', reference: HARRISON, integratedSubjects: ['Medicine', 'Physiology'], system: 'Renal & urinary', tags: ['anion-gap', 'metabolic-acidosis', 'multiple-correct'] }),

  r('medicine', 'infectious-pulm', 'gt3-med-13',
    'A 70-year-old man has community-acquired pneumonia. He is alert and oriented; respiratory rate 32/min, BP 86/52 mmHg, blood urea 9 mmol/L (BUN 25 mg/dL). What is his CURB-65 score, and where should he be managed?',
    ['4 — severe pneumonia; admit and assess for intensive care', '2 — consider short hospital stay or supervised outpatient care', '3 — manage at home with oral antibiotics', '5 — palliative care only'],
    'CURB-65 gives 1 point each for Confusion, Urea >7 mmol/L (BUN >19 mg/dL), Respiratory rate ≥30/min, Blood pressure (systolic <90 or diastolic ≤60 mmHg) and age ≥65. He scores U1 + R1 + B1 + 65 1 = 4 (no confusion). A score of 0–1 can usually be treated at home, 2 needs hospital assessment, and 3–5 indicates severe pneumonia with high mortality, needing admission and consideration of ICU care. Hypotension also prompts assessment for septic shock.',
    { difficulty: 'Expert', type: 'clinical-case', reference: `${DAVIDSON}; BTS guidelines for community-acquired pneumonia`, system: 'Respiratory', tags: ['curb-65', 'pneumonia', 'severity-score', 'calculation'] }),

  r('medicine', 'infectious-pulm', 'gt3-med-14',
    'A 30-year-old man has fever and a right-sided pleural effusion. Pleural fluid: protein 5.2 g/dL (serum 7 g/dL), LDH 480 IU/L (serum 250 IU/L), 85% lymphocytes, adenosine deaminase 78 U/L, glucose 70 mg/dL, no organisms on Gram stain. What is the most likely diagnosis?',
    ['Tuberculous pleural effusion', 'Transudate due to heart failure', 'Parapneumonic effusion requiring drainage', 'Rheumatoid effusion'],
    'By Light\'s criteria the fluid is an exudate (pleural/serum protein 0.74 > 0.5; LDH ratio 1.9 > 0.6). A lymphocyte-predominant exudate with ADA above 40 U/L in a high-prevalence country such as India is highly suggestive of tuberculous pleuritis; pleural biopsy or culture can confirm it, and AFB smear is usually negative. Parapneumonic effusions are neutrophilic, often with low pH and glucose. Rheumatoid effusions have very low glucose (<30 mg/dL). Heart-failure effusions are transudates.',
    { difficulty: 'Hard', type: 'clinical-case', reference: `${HARRISON}; Light RW, Pleural Diseases`, integratedSubjects: ['Medicine', 'Pathology'], system: 'Respiratory', tags: ['pleural-effusion', 'lights-criteria', 'ada', 'tuberculosis'] }),

  r('medicine', 'infectious-pulm', 'gt3-med-15',
    'A 32-year-old woman has painful red nodules on her shins, ankle swelling and fever. Chest X-ray shows bilateral symmetrical hilar lymphadenopathy with clear lung fields. Serum calcium is mildly raised. What is the most likely diagnosis?',
    ['Sarcoidosis (Löfgren syndrome)', 'Hodgkin lymphoma', 'Primary pulmonary tuberculosis', 'Silicosis'],
    'Erythema nodosum, bilateral hilar lymphadenopathy, arthritis/periarticular ankle inflammation and fever form Löfgren syndrome, an acute presentation of sarcoidosis with a good prognosis (often resolving spontaneously). Hypercalcaemia results from 1α-hydroxylase activity in granuloma macrophages producing calcitriol. Biopsy, if needed, shows non-caseating granulomas. Lymphoma and tuberculosis usually cause asymmetrical hilar enlargement; silicosis requires occupational exposure.',
    { difficulty: 'Medium', type: 'clinical-case', reference: HARRISON, system: 'Respiratory', tags: ['sarcoidosis', 'lofgren-syndrome', 'hilar-lymphadenopathy'] }),

  r('medicine', 'infectious-pulm', 'gt3-med-16',
    'A 45-year-old woman with severe pancreatitis develops worsening breathlessness. On FiO2 0.6 with PEEP 8 cm H2O her PaO2 is 90 mmHg. Chest X-ray shows bilateral opacities; echocardiography shows normal left ventricular function. Which ventilator strategy improves survival?',
    ['Tidal volume ~6 mL/kg predicted body weight, plateau ≤30 cm H2O', 'Tidal volume of 10–12 mL/kg actual body weight to normalise PaCO2', 'Zero PEEP to avoid barotrauma and haemodynamic compromise', 'Routine early high-frequency oscillatory ventilation'],
    'PaO2/FiO2 = 90/0.6 = 150 with PEEP ≥5, bilateral opacities and no cardiac failure: moderate ARDS by the Berlin definition. Lung-protective ventilation — low tidal volumes (≈6 mL/kg predicted body weight), plateau pressure ≤30 cm H2O, adequate PEEP and permissive hypercapnia — reduced mortality in the ARDSNet trial. Prone positioning for 12–16 hours a day helps in severe ARDS (P/F <150). Large tidal volumes cause volutrauma; routine HFOV did not improve and may worsen outcomes.',
    { difficulty: 'Hard', type: 'clinical-case', reference: `${HARRISON}; ARDS Network, N Engl J Med 2000`, integratedSubjects: ['Medicine', 'Anesthesia'], system: 'Respiratory', tags: ['ards', 'lung-protective-ventilation', 'berlin-definition'] }),

  r('medicine', 'infectious-pulm', 'gt3-med-17',
    'Two days after a hip fracture repair, a 66-year-old woman suddenly becomes breathless and collapses. BP 78/45 mmHg, HR 128/min, SpO2 84% on oxygen. Bedside echocardiography shows a dilated, hypokinetic right ventricle; CT pulmonary angiography confirms a large saddle embolus. She has no active bleeding. What is the most appropriate treatment?',
    ['Systemic thrombolysis with alteplase, with heparin', 'Low-molecular-weight heparin alone, then switch to a DOAC', 'Insertion of an inferior vena cava filter alone', 'Oral rivaroxaban and observation on the ward'],
    'Pulmonary embolism with sustained hypotension is high-risk (massive) PE, with high early mortality. Unless contraindicated, systemic thrombolysis is recommended to restore perfusion rapidly; surgical embolectomy or catheter-directed therapy are alternatives when thrombolysis is contraindicated or fails. Recent major surgery is a relative contraindication that is weighed against the risk of death. Anticoagulation alone is the treatment for haemodynamically stable PE. An IVC filter does not treat the existing embolus.',
    { difficulty: 'Expert', type: 'clinical-case', reference: `${HARRISON}; ESC Guidelines on acute pulmonary embolism, 2019`, guidelineVersion: 'ESC acute PE guidelines, 2019', integratedSubjects: ['Medicine', 'Orthopedics'], system: 'Respiratory', tags: ['pulmonary-embolism', 'thrombolysis', 'massive-pe'] }),

  r('medicine', 'neurology', 'gt3-med-18',
    'A 64-year-old man arrives 2 hours after the sudden onset of left hemiparesis and facial droop. CT head shows no haemorrhage. Glucose is 110 mg/dL and BP is 196/112 mmHg. Before giving intravenous thrombolysis, what must be done?',
    ['Lower the blood pressure to below 185/110 mmHg', 'Wait for an MRI to confirm infarction', 'Lower the blood pressure to below 140/90 mmHg', 'Give aspirin 300 mg first'],
    'Intravenous thrombolysis (alteplase or tenecteplase) is given within 4.5 hours of onset in eligible patients after haemorrhage is excluded. BP must be lowered to <185/110 mmHg before treatment and kept <180/105 mmHg for 24 hours afterwards to reduce the risk of haemorrhagic transformation. Aggressive lowering to normal levels may worsen penumbral ischaemia. Aspirin is withheld for 24 hours after thrombolysis. MRI is not required when non-contrast CT excludes haemorrhage.',
    { difficulty: 'Hard', type: 'clinical-case', reference: `${HARRISON}; AHA/ASA Guidelines for early management of acute ischemic stroke, 2019`, guidelineVersion: 'AHA/ASA acute ischemic stroke guideline, 2019', system: 'Nervous', tags: ['stroke', 'thrombolysis', 'blood-pressure'] }),

  r('medicine', 'neurology', 'gt3-med-19',
    'A 34-year-old man had diarrhoea 3 weeks ago. Over 5 days he develops symmetrical weakness spreading from the legs to the arms, with absent reflexes and mild distal paraesthesia. CSF shows protein 160 mg/dL with 3 cells/µL. His forced vital capacity is falling. Which treatment is appropriate?',
    ['Intravenous immunoglobulin or plasma exchange', 'High-dose intravenous methylprednisolone for 5 days', 'Oral prednisolone for 6 weeks', 'Oral pyridostigmine with an anticholinesterase trial'],
    'Ascending flaccid areflexic weakness after Campylobacter jejuni diarrhoea, with albuminocytological dissociation in CSF, is Guillain–Barré syndrome (molecular mimicry against peripheral nerve gangliosides). IVIG (0.4 g/kg/day for 5 days) and plasma exchange are equally effective when started early in patients who cannot walk unaided. Corticosteroids are not beneficial. Serial vital capacity (intubation if <15–20 mL/kg) and autonomic monitoring are essential. Pyridostigmine is for myasthenia gravis.',
    { difficulty: 'Expert', type: 'clinical-case', reference: HARRISON, integratedSubjects: ['Medicine', 'Microbiology'], system: 'Nervous', tags: ['guillain-barre', 'ivig', 'albuminocytological-dissociation'] }),

  r('medicine', 'gastroenterology', 'gt3-med-20',
    'A 50-year-old man has tense ascites. Serum albumin is 2.8 g/dL; ascitic fluid albumin is 1.1 g/dL and ascitic protein 1.4 g/dL. What does this indicate?',
    ['Portal hypertension', 'Peritoneal tuberculosis', 'Peritoneal carcinomatosis', 'Nephrotic syndrome with hypoalbuminaemia'],
    'Serum–ascites albumin gradient = 2.8 − 1.1 = 1.7 g/dL. A SAAG ≥1.1 g/dL indicates portal hypertension (cirrhosis, alcoholic hepatitis, heart failure, Budd–Chiari). In cirrhosis ascitic protein is typically low (<2.5 g/dL), whereas cardiac ascites has high protein. SAAG <1.1 g/dL suggests peritoneal disease (tuberculosis, carcinomatosis), pancreatitis or nephrotic syndrome (low serum albumin but no portal hypertension).',
    { difficulty: 'Medium', type: 'clinical-case', reference: HARRISON, system: 'Gastrointestinal', tags: ['saag', 'ascites', 'portal-hypertension', 'calculation'] }),

  r('medicine', 'gastroenterology', 'gt3-med-21',
    'A 56-year-old man with alcohol-related cirrhosis and ascites has fever and mild abdominal tenderness. Diagnostic paracentesis shows 620 neutrophils/µL. Serum creatinine is 1.4 mg/dL and bilirubin 4.5 mg/dL. In addition to an intravenous third-generation cephalosporin, what reduces his risk of renal failure and death?',
    ['Intravenous albumin on day 1 and day 3', 'Large-volume paracentesis with albumin', 'Intravenous furosemide', 'Oral norfloxacin alone in place of IV antibiotics'],
    'An ascitic neutrophil count ≥250/µL diagnoses spontaneous bacterial peritonitis. Empirical treatment is an IV third-generation cephalosporin (e.g., cefotaxime), adjusted for local resistance. Intravenous albumin (1.5 g/kg on day 1 and 1 g/kg on day 3) significantly reduces hepatorenal syndrome and mortality, especially when creatinine >1 mg/dL or bilirubin >4 mg/dL. Large-volume paracentesis and diuretics should be avoided in acute SBP with renal impairment. Long-term oral antibiotics are used for secondary prophylaxis after recovery.',
    { difficulty: 'Expert', type: 'clinical-case', reference: `${HARRISON}; Sort P et al., N Engl J Med 1999; AASLD practice guidance on ascites, 2021`, integratedSubjects: ['Medicine', 'Pharmacology'], system: 'Gastrointestinal', tags: ['sbp', 'albumin', 'hepatorenal-syndrome'] }),

  r('medicine', 'gastroenterology', 'gt3-med-22',
    'A 48-year-old man with known cirrhosis vomits large amounts of fresh blood. After two large-bore cannulae and restrictive red-cell transfusion (target Hb 7–8 g/dL), which combination should follow?',
    ['Terlipressin or octreotide, IV ceftriaxone, and band ligation within 12 hours', 'Intravenous pantoprazole infusion and endoscopy after 72 hours', 'Immediate transjugular intrahepatic portosystemic shunt in all patients before endoscopy', 'Oral propranolol and transfusion to Hb above 12 g/dL'],
    'In suspected acute variceal bleeding, vasoactive drugs (terlipressin, octreotide or somatostatin) reduce portal pressure and are started as early as possible; short-term antibiotic prophylaxis (ceftriaxone) reduces infection, rebleeding and death; and endoscopic band ligation is performed within 12 hours. Over-transfusion raises portal pressure and increases rebleeding. Early (pre-emptive) TIPS is considered for selected high-risk patients after endoscopic control, not for all patients before endoscopy. Non-selective β-blockers are for secondary prophylaxis after the acute episode.',
    { difficulty: 'Hard', type: 'clinical-case', reference: `${HARRISON}; Baveno VII consensus, 2022`, guidelineVersion: 'Baveno VII consensus on portal hypertension, 2022', integratedSubjects: ['Medicine', 'Surgery'], system: 'Gastrointestinal', tags: ['variceal-bleeding', 'terlipressin', 'band-ligation'] }),
]
