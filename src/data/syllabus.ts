import type { SubjectSlug } from '../types'

/**
 * INI-CET syllabus tree — MBBS curriculum, organised subject → module → focus areas.
 *
 * Priority labels reflect standard high-yield lists and past-paper trends as a
 * preparation aid. AIIMS does NOT publish official subject- or chapter-wise
 * weightage, and nothing here should be presented as such.
 *
 * To edit: change this file only. `practice` lists existing topic ids from
 * src/data/questions/<subject>.ts that cover the module.
 */

export type FocusTag = 'High Yield' | 'Image-Based Focus' | 'Clinically Important' | 'Integrated Topic' | 'Core Concept'

export interface FocusArea {
  name: string
  tags: FocusTag[]
}

export interface SyllabusModule {
  id: string
  name: string
  practice: string[]
  focus: FocusArea[]
}

const TAGS: Record<string, FocusTag> = {
  HY: 'High Yield',
  IMG: 'Image-Based Focus',
  CL: 'Clinically Important',
  INT: 'Integrated Topic',
  CORE: 'Core Concept',
}

/** Compact authoring helper: focus items as "Name|HY,IMG". */
function mod(name: string, practice: string[] = [], focus: string[] = []): SyllabusModule {
  return {
    id: name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    name,
    practice,
    focus: focus.map((f) => {
      const [n, t = 'CORE'] = f.split('|')
      return { name: n, tags: t.split(',').map((k) => TAGS[k]) }
    }),
  }
}

export const syllabus: Record<SubjectSlug, SyllabusModule[]> = {
  // ------------------------------------------------------------ Pre-clinical
  anatomy: [
    mod('General Anatomy'),
    mod('Upper Limb', ['upper-limb-thorax'], ['Brachial plexus|HY,IMG', 'Limb nerve injuries|HY,CL']),
    mod('Lower Limb', [], ['Limb nerve injuries|HY,CL']),
    mod('Thorax', ['upper-limb-thorax']),
    mod('Abdomen', ['abdomen-pelvis']),
    mod('Pelvis & Perineum', ['abdomen-pelvis'], ['Pelvic anatomy|HY', 'Perineum|HY']),
    mod('Head & Neck', ['head-neck-neuro'], ['Cavernous sinus|HY,IMG', 'Head and neck spaces|HY,CL']),
    mod('Neuroanatomy', ['head-neck-neuro'], [
      'Cranial nerves|HY,CL',
      'Brainstem|HY,IMG',
      'Ventricular system|HY,IMG',
      'Blood supply of brain|HY,INT',
    ]),
    mod('Embryology', [], ['Embryological derivatives|HY', 'Pharyngeal arches|HY', 'Pharyngeal pouches|HY']),
    mod('Histology', [], ['Tissue identification|IMG']),
    mod('Radiological Anatomy', [], ['Cross-sectional anatomy (CT/MRI)|IMG,INT']),
    mod('Clinical Anatomy', [], ['Nerve injury localisation|CL,INT']),
  ],
  physiology: [
    mod('General Physiology'),
    mod('Nerve & Muscle', ['nerve-muscle-cns'], ['Nerve conduction|HY', 'Neuromuscular junction|HY,INT']),
    mod('Blood'),
    mod('Cardiovascular', ['cvs-resp'], ['Cardiac cycle|HY', 'Pressure–volume loops|HY,IMG', 'ECG physiology|HY,IMG,INT']),
    mod('Respiratory', ['cvs-resp'], ['Respiratory mechanics|HY', 'V/Q relationships|HY,INT']),
    mod('Renal', ['renal-endocrine'], ['Renal handling of solutes|HY', 'Acid–base physiology|HY,INT']),
    mod('Gastrointestinal'),
    mod('Endocrinology', ['renal-endocrine'], ['Hormonal feedback|HY,INT']),
    mod('Reproductive Physiology'),
    mod('CNS', ['nerve-muscle-cns']),
    mod('Special Senses'),
  ],
  biochemistry: [
    mod('Molecular Biology', ['molecular-genetics'], ['DNA replication|HY', 'Transcription|HY', 'Translation|HY']),
    mod('Enzymes', ['enzymes-metabolism'], ['Enzyme kinetics|HY']),
    mod('Carbohydrate Metabolism', ['enzymes-metabolism'], ['Glycogen storage disorders|HY,CL']),
    mod('Lipid Metabolism', [], ['Lysosomal storage disorders|HY,CL']),
    mod('Protein Metabolism', [], ['Urea cycle|HY,CL']),
    mod('Vitamins', ['vitamins-nutrition'], ['Vitamin deficiencies|HY,CL']),
    mod('Nutrition', ['vitamins-nutrition']),
    mod('Genetics', ['molecular-genetics'], ['Molecular genetics|HY,INT']),
    mod('Inborn Errors of Metabolism', [], ['Presentation and enzyme defects|HY,CL,INT']),
    mod('Molecular Techniques', [], ['PCR|HY']),
    mod('ETC & Oxidative Phosphorylation', ['enzymes-metabolism'], ['Electron transport chain and inhibitors|HY']),
  ],
  // ------------------------------------------------------------ Para-clinical
  pathology: [
    mod('Cell Injury', ['general-pathology'], ['Necrosis patterns|IMG']),
    mod('Inflammation', ['general-pathology'], ['Granulomas|IMG']),
    mod('Repair'),
    mod('Hemodynamics'),
    mod('Immunopathology'),
    mod('Genetics', ['general-pathology'], ['Hereditary cancer syndromes|HY']),
    mod('Neoplasia', ['general-pathology'], ['Oncogenes and tumour suppressors|HY,INT']),
    mod('Hematology', ['hematology'], ['Peripheral smear interpretation|HY,IMG']),
    mod('RBC Disorders', ['hematology'], ['Microcytic anaemias|HY,IMG']),
    mod('WBC Disorders', ['hematology']),
    mod('Leukemia', ['hematology'], ['Cytogenetics and smear|HY,IMG,INT']),
    mod('Lymphoma', ['hematology'], ['Morphology and markers|HY,IMG']),
    mod('Platelet Disorders'),
    mod('Coagulation', ['hematology'], ['Coagulation test interpretation|HY,CL']),
    mod('GI Pathology', [], ['Histopathology identification|IMG']),
    mod('Liver', ['systemic-pathology'], ['Histopathology identification|IMG']),
    mod('Kidney', ['systemic-pathology'], ['Glomerular disease (LM/IF/EM)|HY,IMG']),
    mod('Lung', ['systemic-pathology'], ['Tumour histology|IMG', 'Immunohistochemistry|HY']),
    mod('Breast', ['systemic-pathology'], ['Tumour histology|IMG', 'Receptor status and targeted therapy|HY,INT']),
    mod('Endocrine', ['systemic-pathology'], ['Thyroid neoplasms|HY,IMG']),
    mod('CNS', [], ['Tumour histology|IMG']),
  ],
  pharmacology: [
    mod('General Pharmacology', ['general-pharm-toxicology'], ['Pharmacokinetics|HY', 'Drug interactions|HY,CL']),
    mod('ANS', ['ans-cvs-pharm'], ['Receptor pharmacology|HY']),
    mod('CVS', ['ans-cvs-pharm'], ['Heart failure drugs|HY,CL']),
    mod('CNS', ['cns-pharm'], ['Antiepileptics|HY,CL']),
    mod('Autacoids'),
    mod('Endocrine'),
    mod('Antimicrobials', ['chemo-antimicrobials'], ['Mechanisms and resistance|HY,INT']),
    mod('Anticancer Drugs', ['chemo-antimicrobials', 'immuno-targeted'], ['Dose-limiting toxicities|HY']),
    mod('Immunopharmacology', ['immuno-targeted'], ['Monoclonal antibodies|HY', 'Targeted therapies|HY']),
    mod('Drugs Affecting Blood', ['ans-cvs-pharm'], ['Anticoagulant reversal|HY,CL']),
    mod('Respiratory Drugs'),
    mod('GI Drugs'),
    mod('Toxicology', ['general-pharm-toxicology'], ['Antidotes|HY,CL,INT']),
  ],
  microbiology: [
    mod('General Microbiology', [], ['Culture media|HY,IMG', 'Biochemical reactions|HY']),
    mod('Immunology', [], ['Hypersensitivity and immunodeficiency|HY,INT']),
    mod('Bacteriology', ['bacteriology'], ['Bacterial identification|HY,IMG']),
    mod('Virology', ['virology'], ['HIV|HY,CL', 'Hepatitis viruses|HY,CL', 'Influenza|CL', 'Herpes viruses|HY']),
    mod('Mycology', ['parasitology-mycology'], ['Fungal morphology|HY,IMG']),
    mod('Parasitology', ['parasitology-mycology'], ['Parasite life cycles|HY,IMG']),
    mod('Infection Control'),
    mod('Clinical Microbiology', [], ['Opportunistic infections|CL,INT', 'Diagnostic tests|HY', 'Vaccines|HY']),
  ],
  'forensic-medicine': [
    mod('Thanatology', ['thanatology'], ['Postmortem changes|HY']),
    mod('Injuries', [], ['Wound identification|HY,IMG']),
    mod('Asphyxial Deaths', ['thanatology'], ['Hanging vs strangulation|HY,IMG']),
    mod('Forensic Identification'),
    mod('Toxicology', ['toxicology'], ['Common poisonings and antidotes|HY,CL,INT']),
    mod('Legal Provisions & Medical Jurisprudence', ['medical-jurisprudence'], [
      'Current Indian legal provisions (BNS, BNSS, BSA 2023)|HY',
      'Consent and negligence|CL',
    ]),
  ],
  'community-medicine': [
    mod('Epidemiology', ['epidemiology-biostatistics'], ['Measures of association (RR, OR, AR, NNT)|HY']),
    mod('Biostatistics', ['epidemiology-biostatistics'], [
      'P-values and confidence intervals|HY',
      'Chi-square and t-test|HY',
    ]),
    mod('Screening', ['epidemiology-biostatistics'], ['Sensitivity, specificity, PPV, NPV|HY']),
    mod('Study Designs', ['epidemiology-biostatistics'], ['Choice of design|HY']),
    mod('Bias', [], ['Types of bias|HY']),
    mod('Health Indicators', ['nutrition-mch'], ['Mortality rates and ratios|HY']),
    mod('Demography'),
    mod('Nutrition', ['nutrition-mch']),
    mod('Occupational Health'),
    mod('Environment'),
    mod('National Health Programmes', ['national-health-programs'], ['Current programme guidelines|HY']),
    mod('Vaccination', ['national-health-programs'], ['National immunisation schedule|HY']),
    mod('Maternal & Child Health', ['nutrition-mch']),
  ],
  // ------------------------------------------------------------ Clinical
  medicine: [
    mod('Cardiology', ['cardiology'], [
      'ECG|HY,IMG',
      'Myocardial infarction|HY,CL',
      'Heart failure|HY,CL,INT',
      'Arrhythmias|HY,IMG',
      'Valvular disease|CL',
      'Cardiomyopathies|CL',
      'Hypertension|CL',
    ]),
    mod('Neurology', ['neurology'], [
      'Stroke|HY,IMG',
      'Neuroanatomical localisation|HY,INT',
      'Seizures|CL',
      'Movement disorders|CL',
      'Demyelinating diseases|IMG',
      'Neuromuscular disorders|CL',
      'CSF interpretation|HY',
    ]),
    mod('Endocrinology', ['nephro-endo'], ['Diabetes|HY,CL', 'Thyroid|HY', 'Adrenal|CL', 'Pituitary|CL', 'Calcium disorders|INT']),
    mod('Nephrology', ['nephro-endo'], ['AKI|CL', 'CKD|CL', 'Acid–base|HY,INT', 'Electrolytes|HY,CL', 'Glomerular diseases|INT']),
    mod('Respiratory', ['infectious-pulm'], ['Asthma|CL', 'COPD|CL', 'ILD|IMG', 'Pulmonary embolism|HY,IMG', 'Pleural diseases|IMG']),
    mod('Gastroenterology', ['gastroenterology'], ['Liver disease|CL', 'GI bleeding|CL', 'IBD|INT', 'Malabsorption|INT']),
    mod('Infectious Diseases', ['infectious-pulm'], ['Tuberculosis|HY,CL']),
  ],
  surgery: [
    mod('Trauma & ATLS', ['general-surgery-principles'], ['Primary survey|HY,CL', 'Haemorrhagic shock|HY']),
    mod('Acute Abdomen', ['gi-surgery'], ['Clinical algorithms|HY,CL']),
    mod('Hernias', ['gi-surgery'], ['Inguinal canal anatomy|HY,INT']),
    mod('GI Surgery', ['gi-surgery']),
    mod('Hepatobiliary', ['gi-surgery'], ['Gallstone disease and cholangitis|HY,CL']),
    mod('Pancreas'),
    mod('Breast', [], ['Triple assessment|HY,IMG']),
    mod('Thyroid', [], ['Thyroid nodule work-up|HY,INT']),
    mod('Vascular Surgery'),
    mod('Burns', [], ['Fluid calculation|HY']),
    mod('Urology', ['urology'], ['Haematuria work-up|CL']),
    mod('Surgical Infections & Wounds', ['general-surgery-principles']),
    mod('Fluid Management'),
    mod('Sutures & Drains', [], ['Instrument and suture identification|IMG']),
  ],
  obg: [
    mod('Normal Pregnancy & Antenatal Care', ['obstetrics-antenatal-labour']),
    mod('Hypertensive Disorders', ['obstetrics-antenatal-labour'], ['Pre-eclampsia management|HY,CL']),
    mod('Haemorrhage (APH & PPH)', ['high-risk-pregnancy'], ['PPH management|HY,CL']),
    mod('Labour & Partograph', ['obstetrics-antenatal-labour'], ['Partograph interpretation|HY,IMG']),
    mod('Fetal Monitoring', [], ['CTG interpretation|HY,IMG']),
    mod('Obstetric Emergencies', ['high-risk-pregnancy'], ['Shoulder dystocia, cord prolapse|CL']),
    mod('Medical Disorders in Pregnancy', [], ['Diabetes, anaemia, heart disease|INT']),
    mod('PCOS & Amenorrhoea', ['gynecology-menstrual-reproductive'], ['Work-up of amenorrhoea|HY,INT']),
    mod('Infertility', ['gynecology-menstrual-reproductive']),
    mod('Contraception', [], ['Methods and contraindications|HY']),
    mod('Cervical Cancer', [], ['Screening and staging|HY']),
    mod('Endometrial & Uterine Disease', ['gynecology-menstrual-reproductive']),
    mod('Ovarian Tumours', [], ['Tumour markers and histology|HY,INT']),
    mod('Menopause'),
  ],
  pediatrics: [
    mod('Neonatology', ['neonatology'], ['Neonatal resuscitation|HY,CL', 'Neonatal jaundice|HY', 'Neonatal sepsis|CL']),
    mod('Growth'),
    mod('Development', ['growth-development-immunization'], ['Developmental milestones|HY', 'Red flags|HY,CL']),
    mod('Immunization', ['growth-development-immunization'], ['National immunisation schedule|HY']),
    mod('Nutrition', ['pediatric-infections-nutrition'], ['Severe acute malnutrition|HY,CL']),
    mod('Pediatric Infections', ['pediatric-infections-nutrition'], ['Exanthems|IMG,INT']),
    mod('Respiratory', ['pediatric-infections-nutrition']),
    mod('Cardiology', [], ['Congenital heart disease|HY,IMG']),
    mod('Neurology'),
    mod('Gastroenterology', ['pediatric-infections-nutrition'], ['Diarrhoea and dehydration|CL']),
    mod('Genetics', [], ['Common syndromes|IMG,INT']),
    mod('Pediatric Emergencies'),
  ],
  ophthalmology: [
    mod('Cornea & Refraction', ['cornea-refractive-errors'], ['Keratitis|HY,IMG']),
    mod('Glaucoma', ['glaucoma'], ['Angle-closure emergency|HY,CL']),
    mod('Cataract', ['retina-cataract']),
    mod('Retina', ['retina-cataract'], ['Fundus images|HY,IMG']),
    mod('Neuro-ophthalmology', [], ['Pupil and cranial nerve palsies|HY,INT']),
    mod('Visual Fields', [], ['Lesion localisation|HY,IMG,INT']),
  ],
  ent: [
    mod('Ear', ['ear-disorders'], ['Hearing loss|HY', 'Rinne/Weber|HY', 'Audiometry|HY,IMG', 'Otitis media|CL']),
    mod('Nose & Sinuses', ['nose-paranasal-sinuses']),
    mod('Throat', ['throat-head-neck']),
    mod('Head & Neck Malignancies', ['throat-head-neck'], ['Risk factors and staging|HY']),
  ],
  dermatology: [
    mod('Infections & Infestations', ['infections-infestations'], ['Leprosy|HY,CL', 'STIs|HY,CL']),
    mod('Papulosquamous Disorders', ['papulosquamous-autoimmune'], ['Psoriasis|HY,IMG']),
    mod('Bullous Diseases', ['papulosquamous-autoimmune'], ['Pemphigus vs pemphigoid|HY,IMG,INT']),
    mod('Pigmentary & Adnexal', ['pigmentary-adnexal']),
    mod('Dermatological Images', [], ['Spot diagnosis|IMG']),
  ],
  psychiatry: [
    mod('Schizophrenia & Psychosis', ['mood-psychotic-disorders']),
    mod('Mood Disorders', ['mood-psychotic-disorders']),
    mod('Anxiety Disorders', ['anxiety-neurotic-disorders']),
    mod('Substance Use', ['substance-child-psychiatry'], ['Withdrawal syndromes|HY,CL']),
    mod('Psychopharmacology', [], ['Adverse effects|HY,INT']),
    mod('Child Psychiatry', ['substance-child-psychiatry']),
  ],
  orthopedics: [
    mod('Fractures', ['fractures-trauma'], ['Eponymous fractures|HY,IMG']),
    mod('Dislocations', [], ['Associated nerve injuries|HY,INT']),
    mod('Bone & Joint Infections', ['bone-joint-infections']),
    mod('Bone Tumours', [], ['Radiological signs|HY,IMG']),
    mod('Metabolic Bone Disease', ['metabolic-bone-disease']),
    mod('Peripheral Nerve Injuries', [], ['Clinical signs|HY,CL,INT']),
    mod('Imaging', [], ['X-ray interpretation|IMG']),
  ],
  anesthesia: [
    mod('Airway & Intubation', ['general-anesthesia-airway'], ['Airway assessment|HY']),
    mod('General Anaesthesia', ['general-anesthesia-airway'], ['Induction agents|HY', 'Malignant hyperthermia|CL']),
    mod('Local Anaesthetics & Regional', ['regional-anesthesia'], ['LA toxicity|HY,CL']),
    mod('Monitoring'),
    mod('Critical Care', ['critical-care-resuscitation'], ['Ventilation in ARDS|CL', 'Septic shock|CL,INT']),
  ],
  radiology: [
    mod('X-rays', ['chest-cardiac-imaging', 'abdominal-imaging'], ['Chest X-ray signs|HY,IMG']),
    mod('CT', ['neuroimaging'], ['Head CT in trauma and stroke|HY,IMG']),
    mod('MRI', ['neuroimaging']),
    mod('Ultrasound', ['abdominal-imaging']),
    mod('Emergency Imaging', [], ['Trauma imaging|CL,IMG']),
    mod('Radiation Safety', [], ['Dose limits and protection|HY']),
  ],
}

/** Modules in a subject that have at least one practice topic linked. */
export function syllabusCoverage(slug: SubjectSlug) {
  const mods = syllabus[slug] ?? []
  return { covered: mods.filter((m) => m.practice.length > 0).length, total: mods.length }
}
