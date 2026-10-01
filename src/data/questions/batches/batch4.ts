import type { SubjectSlug } from '../../../types'
import type { BatchAdditions } from './batch1'
import { q, ORIGINAL_DIAGRAM } from './helpers'

/**
 * INI-CET question batch 4 — Community Medicine, Forensic Medicine, ENT,
 * Ophthalmology, Dermatology, Psychiatry, Radiology, Anaesthesia.
 * All questions are ORIGINAL; none is presented as an actual INI-CET question.
 * Correct answer is written first; display order is randomised.
 */

// ============================================================================ COMMUNITY MEDICINE
const psm: BatchAdditions = {
  newTopics: [
    {
      id: 'occupational-environmental',
      name: 'Occupational & Environmental Health',
      description: 'Occupational lung disease, toxic exposures and environmental health.',
      questions: [
          q('cm-109',
            'A 45-year-old stone cutter has progressive breathlessness. Chest X-ray shows small upper-zone nodules and "eggshell" calcification of the hilar lymph nodes. Besides lung fibrosis, he is at markedly increased risk of:',
            ['Pulmonary tuberculosis', 'Malignant mesothelioma', 'Hypersensitivity pneumonitis', 'Byssinosis'],
            'Silicosis follows inhalation of crystalline silica (stone cutting, quarrying, sandblasting) and causes upper-zone nodular fibrosis with eggshell calcification of hilar nodes. Silica is toxic to alveolar macrophages, greatly raising the risk of tuberculosis (silicotuberculosis), so screening and TB preventive therapy matter. Mesothelioma is linked to asbestos, and byssinosis to cotton dust.',
            { reference: "Park's Textbook; Harrison's Principles of Internal Medicine", difficulty: 'Medium', type: 'clinical-case', integratedSubjects: ['Community Medicine', 'Medicine'], system: 'Community health', tags: ['occupational-health', 'silicosis', 'tuberculosis'] }),
      ],
    },
  ],
  addTo: {
    'epidemiology-biostatistics': [
      q('cm-101',
        'A screening test is applied to 1,000 people, of whom 100 truly have the disease. Sensitivity is 90% and specificity is 80%. What is the positive predictive value?',
        ['About 33%', 'About 90%', 'About 80%', 'About 99%'],
        'Diseased 100: true positives = 90, false negatives = 10. Non-diseased 900: true negatives = 80% × 900 = 720, false positives = 180. PPV = TP / (TP + FP) = 90 / 270 ≈ 33%. NPV = 720 / 730 ≈ 99%. With a prevalence of only 10%, even a fairly specific test produces many false positives, which is why PPV falls as prevalence falls.',
        { reference: "Park's Textbook of Preventive and Social Medicine", difficulty: 'Hard', type: 'standard', system: 'Community health', tags: ['screening', 'ppv', 'biostatistics', 'calculation'], clinicalPearl: 'Sensitivity and specificity are properties of the test; PPV and NPV also depend on prevalence.' }),
      q('cm-102',
        'In a randomised trial, 20% of patients on placebo and 15% on a new drug had a stroke within 5 years. How many patients need to be treated for 5 years to prevent one stroke?',
        ['20', '5', '25', '4'],
        'Absolute risk reduction (ARR) = 20% − 15% = 5% = 0.05. Number needed to treat = 1 / ARR = 1 / 0.05 = 20. The relative risk reduction is 5 / 20 = 25%; quoting only the relative figure can make a modest benefit look larger.',
        { reference: "Park's Textbook of Preventive and Social Medicine", difficulty: 'Medium', type: 'standard', system: 'Community health', tags: ['nnt', 'arr', 'biostatistics', 'calculation'] }),
      q('cm-103',
        'In a cohort study, lung cancer developed in 50 of 1,000 smokers and 10 of 2,000 non-smokers over 10 years. What proportion of lung cancer among smokers is attributable to smoking (attributable risk per cent)?',
        ['90%', '10%', '4.5%', '0.9%'],
        'Incidence in exposed = 50/1,000 = 0.05; in unexposed = 10/2,000 = 0.005. Relative risk = 0.05/0.005 = 10. Attributable risk = 0.05 − 0.005 = 0.045 (4.5%). Attributable risk per cent = (Ie − Iu)/Ie × 100 = 0.045/0.05 × 100 = 90%: about 90% of lung cancer in these smokers could be prevented if smoking were removed.',
        { reference: "Park's Textbook of Preventive and Social Medicine", difficulty: 'Hard', type: 'standard', system: 'Community health', tags: ['attributable-risk', 'relative-risk', 'cohort-study', 'calculation'] }),
      q('cm-104',
        'A hospital-based case-control study finds a spurious association between two diseases because patients with both conditions are more likely to be admitted than those with either alone. This is an example of:',
        ['Berkson’s bias', 'Recall bias', 'Neyman (prevalence–incidence) bias', 'Interviewer bias'],
        'Berkson’s bias is a selection bias in hospital-based studies: different admission rates for people with combinations of conditions distort associations that would not exist in the general population. Recall bias comes from cases remembering exposures differently from controls; Neyman bias comes from studying prevalent rather than incident cases (missing fatal or short-lived cases); interviewer bias comes from systematic differences in how information is sought.',
        { reference: "Park's Textbook of Preventive and Social Medicine", difficulty: 'Hard', type: 'standard', system: 'Community health', tags: ['bias', 'case-control', 'study-design'] }),
      q('cm-105',
        'A case-control study reports an odds ratio of 1.8 (95% confidence interval 0.9–3.6) for an exposure. Which interpretation is correct?',
        ["Not statistically significant at the 5% level", "The exposure significantly raises risk by 80%", "The exposure is significantly protective", "The study proves that no association exists"],
        'A 95% confidence interval that includes the null value (1 for ratios) means the result is not statistically significant at p < 0.05. The point estimate suggests possible harm, but the data are compatible with no effect and even a small protective effect; the wide interval also reflects limited precision. Absence of significance does not prove absence of association — the study may simply be underpowered.',
        { reference: "Park's Textbook of Preventive and Social Medicine", difficulty: 'Medium', type: 'standard', system: 'Community health', tags: ['confidence-interval', 'odds-ratio', 'p-value'] }),
      q('cm-106',
        'The haemoglobin of 40 adolescent girls is measured before and after 3 months of iron supplementation. Which test compares the mean values?',
        ['Paired t-test', 'Unpaired (independent) t-test', 'Chi-square test', 'One-way ANOVA'],
        'Before-and-after measurements on the same individuals are dependent, so the paired t-test (on the differences) is used for normally distributed continuous data; the Wilcoxon signed-rank test is its non-parametric alternative. An unpaired t-test compares two independent groups, chi-square compares proportions, and ANOVA compares three or more group means.',
        { reference: "Park's Textbook of Preventive and Social Medicine", difficulty: 'Medium', type: 'standard', system: 'Community health', tags: ['t-test', 'biostatistics', 'statistical-tests'] }),
    ],
    'national-health-programs': [
      q('cm-107',
        'In a cold-chain audit, a health worker suspects a vial of pentavalent vaccine was frozen. Which test checks this?',
        ['Shake test', 'Vaccine vial monitor colour check', 'Visual check for turbidity', 'Checking the expiry date'],
        'Adsorbed (aluminium-adjuvanted) vaccines — pentavalent, hepatitis B, DPT, Td, PCV — are damaged by freezing. In the shake test, the suspect vial and a vial deliberately frozen as a control are shaken; a frozen vial sediments faster and shows flakes, and must be discarded. The vaccine vial monitor shows cumulative HEAT exposure, not freezing.',
        { reference: "Park's Textbook; MoHFW Immunization Handbook for Health Workers", difficulty: 'Medium', type: 'standard', system: 'Community health', tags: ['cold-chain', 'shake-test', 'immunization'] }),
      q('cm-108',
        'A town recorded 4,000 live births in a year. There were 120 infant deaths, of which 40 occurred within the first 28 days of life. What is the post-neonatal mortality rate?',
        ['20 per 1,000 live births', '30 per 1,000 live births', '10 per 1,000 live births', '40 per 1,000 live births'],
        'Infant mortality rate = 120/4,000 × 1,000 = 30. Neonatal mortality rate = 40/4,000 × 1,000 = 10. Post-neonatal deaths (28 days to under 1 year) = 120 − 40 = 80, so the post-neonatal mortality rate = 80/4,000 × 1,000 = 20 per 1,000 live births. All three rates use live births as the denominator.',
        { reference: "Park's Textbook of Preventive and Social Medicine", difficulty: 'Hard', type: 'standard', system: 'Community health', tags: ['health-indicators', 'infant-mortality', 'calculation'] }),
    ],
  },
}

// ============================================================================ FORENSIC MEDICINE
const fmt: BatchAdditions = {
  addTo: {
    toxicology: [
      q('fmt-101',
        'A 19-year-old ingested about 15 g of paracetamol 5 hours ago and now feels nauseated. What is the most appropriate management?',
        ["Check a ≥4-hour level and start IV N-acetylcysteine", "Gastric lavage, then observe without an antidote", "Give N-acetylcysteine only if enzymes rise at 24 h", "Activated charcoal alone, then discharge"],
        'Paracetamol is metabolised by CYP2E1 to the toxic metabolite NAPQI, which is detoxified by glutathione; when glutathione is depleted, centrilobular hepatic necrosis follows. N-acetylcysteine replenishes glutathione and is most effective within 8 hours of ingestion. A level taken 4 hours or more after ingestion is plotted on the treatment nomogram; with a large ingestion like this, NAC is often started without waiting. Liver enzymes may be normal early, so waiting for them loses the window. Charcoal helps only within about 1 hour.',
        { reference: "KS Narayan Reddy's Essentials of Forensic Medicine & Toxicology; Goodman & Gilman's", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Forensic Medicine', 'Pharmacology'], system: 'Forensic & Toxicology', tags: ['paracetamol', 'n-acetylcysteine', 'antidote'] }),
      q('fmt-102',
        'A farmer is bitten on the foot by a snake. An hour later, blood collected in a clean, dry glass tube has not clotted after 20 minutes. What does this indicate and what is the next step?',
        ["Venom-induced coagulopathy; give anti-snake venom", "Neurotoxic envenomation; give neostigmine alone", "A dry bite; observe for 24 hours without ASV", "Laboratory artefact; repeat the test after 24 hours"],
        'The 20-minute whole blood clotting test (20WBCT) is a simple bedside test for venom-induced consumption coagulopathy, typical of viper bites (Russell’s viper, saw-scaled viper). Unclotted blood is an indication for anti-snake venom. Indian polyvalent ASV covers the "big four": spectacled cobra, common krait, Russell’s viper and saw-scaled viper. The test is repeated every 6 hours to guide further doses.',
        { reference: 'National Snakebite Management Protocol (India); KS Narayan Reddy', difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Forensic Medicine', 'Medicine'], system: 'Forensic & Toxicology', tags: ['snakebite', '20wbct', 'anti-snake-venom'] }),
      q('fmt-106',
        'A battery-recycling worker has abdominal colic, constipation, weakness of the wrist extensors and a blue-grey line on the gums. What is the characteristic peripheral smear finding?',
        ["Basophilic stippling", "Howell–Jolly bodies", "Heinz bodies", "Schistocytes (fragmented cells)"],
        'Chronic lead poisoning inhibits δ-aminolevulinic acid dehydratase and ferrochelatase (causing microcytic anaemia with raised free erythrocyte protoporphyrin) and pyrimidine 5′-nucleotidase, leaving aggregates of ribosomal RNA visible as basophilic stippling. Other features include Burton’s gum line, wrist drop (motor neuropathy), colic and encephalopathy in children. Chelation uses CaNa2EDTA, dimercaprol (in encephalopathy) or oral succimer. Howell–Jolly bodies indicate hyposplenism, and Heinz bodies oxidative haemolysis.',
        { reference: "KS Narayan Reddy's; Robbins & Cotran", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Forensic Medicine', 'Pathology'], system: 'Forensic & Toxicology', tags: ['lead-poisoning', 'basophilic-stippling', 'occupational'] }),
      q('fmt-107',
        'A worker from an electroplating unit collapses with gasping breathing, seizures and severe lactic acidosis. Venous blood looks bright red. Which antidote is preferred?',
        ['Hydroxocobalamin', 'Methylene blue', 'Pralidoxime', 'Deferoxamine'],
        'Cyanide (used in electroplating and released in fires) blocks cytochrome c oxidase, so cells cannot use oxygen. The result is severe lactic acidosis, venous blood with a high oxygen content (bright red, "arterialised") and rapid CNS and cardiovascular collapse. Hydroxocobalamin binds cyanide to form cyanocobalamin, which is excreted in urine, and is the preferred antidote. Nitrites with sodium thiosulfate are an alternative. Methylene blue treats methaemoglobinaemia.',
        { reference: "KS Narayan Reddy's; Goodman & Gilman's", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Forensic Medicine', 'Pharmacology'], system: 'Forensic & Toxicology', tags: ['cyanide', 'antidote', 'etc'] }),
    ],
    thanatology: [
      q('fmt-103',
        'At autopsy, a wound on the chest has clean-cut edges, is 2 cm long on the skin and penetrates 9 cm into the chest. How is this wound classified?',
        ['Stab wound', 'Incised wound', 'Chop wound', 'Laceration'],
        'Sharp-force wounds with clean edges are incised wounds when they are longer than they are deep (from slashing), and stab (punctured) wounds when depth exceeds length (from a thrust). A chop wound is from a heavy edged weapon and combines sharp and blunt features with damage to underlying bone. Lacerations come from blunt force and show irregular edges, bridging tissue and bruising.',
        { reference: "KS Narayan Reddy's Essentials of Forensic Medicine & Toxicology", difficulty: 'Medium', type: 'standard', system: 'Forensic & Toxicology', tags: ['injuries', 'mechanical-injuries'] }),
      q('fmt-104',
        'At autopsy, an area of reddish-purple discolouration on the back must be distinguished as hypostasis (post-mortem lividity) or an ante-mortem bruise. Which finding on incision indicates a bruise?',
        ['Blood extravasated into the tissues that cannot be washed away', 'Blood confined within vessels that can be washed away', 'Discolouration only on dependent parts with pale pressure areas', 'Colour that disappears on pressure in the first hours after death'],
        'A bruise is ante-mortem bleeding into tissues: on incision, blood is infiltrated into the tissues, cannot be washed away and may be clotted, with surrounding swelling. Hypostasis is gravitational pooling of blood within vessels: it appears only in dependent parts, spares areas under pressure (contact pallor), blanches on pressure before it becomes fixed, and on incision the blood stays within vessels and washes away.',
        { reference: "KS Narayan Reddy's Essentials of Forensic Medicine & Toxicology", difficulty: 'Medium', type: 'standard', system: 'Forensic & Toxicology', tags: ['postmortem-changes', 'hypostasis', 'bruise'] }),
    ],
  },
}

// ============================================================================ ENT
const ent: BatchAdditions = {
  addTo: {
    'ear-disorders': [
      q('ent-101',
        'A 28-year-old woman has gradually worsening hearing in the right ear that she noticed during pregnancy. She hears better in noisy surroundings, and the tympanic membrane is normal. Her right-ear audiogram is shown. What is the most likely diagnosis?',
        ['Otosclerosis', 'Noise-induced hearing loss', 'Presbycusis', 'Ménière’s disease'],
        'The audiogram shows conductive loss (air conduction about 30–45 dB HL with near-normal bone conduction, an air–bone gap) with a dip in bone conduction at 2 kHz — the Carhart notch, a mechanical artefact of stapes fixation. With a normal drum, a young woman, worsening during pregnancy and paracusis Willisii (hearing better in noise), this is otosclerosis. Treatment is stapedotomy or a hearing aid. Noise-induced loss is sensorineural with a 4-kHz notch in both air and bone conduction.',
        { reference: "Dhingra's Diseases of Ear, Nose and Throat; Scott-Brown's", difficulty: 'Hard', type: 'image', sourceType: 'IMAGE', imageUrl: '/images/ent/audiogram-otosclerosis-right.svg', imageAlt: 'Right-ear audiogram: air conduction 30–45 dB HL; bone conduction near normal with a dip to 25 dB at 2 kHz', imageCaption: 'Pure-tone audiogram, right ear', imageType: 'diagram', imageSource: ORIGINAL_DIAGRAM, system: 'ENT', tags: ['audiometry', 'otosclerosis', 'carhart-notch', 'image'] }),
      q('ent-102',
        'A patient has profound sensorineural hearing loss in the right ear after mumps; the left ear is normal. What are the expected tuning-fork results?',
        ['Rinne negative on the right (false negative) and Weber lateralised to the left', 'Rinne positive on the right and Weber lateralised to the right', 'Rinne negative on the right and Weber lateralised to the right', 'Rinne positive on both sides and Weber central'],
        'With a "dead" right ear, the bone-conducted sound from the mastoid crosses the skull and is heard by the normal LEFT cochlea, while air-conducted sound in the right ear is not heard at all. The patient therefore reports bone conduction as louder on the right: a false-negative Rinne. Weber lateralises to the better-hearing (left) ear in sensorineural loss. Masking the left ear with a Bárány noise box reveals the false negative.',
        { reference: "Dhingra's Diseases of Ear, Nose and Throat", difficulty: 'Expert', type: 'clinical-case', system: 'ENT', tags: ['tuning-fork-tests', 'rinne', 'weber', 'false-negative-rinne'] }),
      q('ent-103',
        'After a head injury, a man has CSF otorrhoea and immediate-onset complete facial palsy. CT shows a fracture line running perpendicular to the long axis of the petrous temporal bone. Which statement is correct?',
        ['Transverse fractures are less common but more often cause facial palsy and sensorineural hearing loss', 'Longitudinal fractures more often cause facial palsy than transverse fractures', 'Facial palsy is never caused by temporal bone fractures', 'Transverse fractures characteristically cause conductive loss with haemotympanum only'],
        'Temporal bone fractures are classically longitudinal (about 80%, parallel to the petrous axis, typically causing conductive loss and tympanic membrane tears) or transverse (about 20%, crossing the otic capsule). Transverse fractures more often injure the facial nerve (about 50%) and the cochlea, causing sensorineural hearing loss and vertigo. Immediate complete palsy suggests nerve transection and may need exploration; delayed palsy usually recovers with steroids.',
        { reference: "Dhingra's Diseases of Ear, Nose and Throat; Scott-Brown's", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['ENT', 'Anatomy'], system: 'ENT', tags: ['temporal-bone-fracture', 'facial-nerve'] }),
    ],
    'nose-paranasal-sinuses': [
      q('ent-104',
        'A 15-year-old boy has recurrent profuse unilateral epistaxis and progressive nasal obstruction. Endoscopy shows a smooth, lobulated mass in the nasopharynx; contrast CT shows an enhancing mass with anterior bowing of the posterior maxillary wall. What should be avoided?',
        ['A biopsy in the outpatient clinic', 'Contrast-enhanced CT or MRI', 'Preoperative angiography and embolisation', 'Endoscopic excision'],
        'This is juvenile nasopharyngeal angiofibroma, a highly vascular benign tumour of adolescent males arising near the sphenopalatine foramen. Anterior bowing of the posterior maxillary wall is the Holman–Miller sign. Biopsy is contraindicated because it can cause torrential bleeding; diagnosis rests on imaging. Treatment is surgical excision, usually endoscopic, after preoperative embolisation.',
        { reference: "Dhingra's Diseases of Ear, Nose and Throat", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['ENT', 'Radiology'], system: 'ENT', tags: ['angiofibroma', 'epistaxis', 'holman-miller'] }),
    ],
    'throat-head-neck': [
      q('ent-105',
        'Four days after a lower molar extraction, a man has fever, a brawny non-fluctuant swelling under the chin, a raised and protruded tongue, drooling and difficulty breathing. What is the immediate priority?',
        ['Securing the airway', 'Waiting for the swelling to localise before any intervention', 'Oral antibiotics and outpatient review', 'Fine-needle aspiration of the swelling'],
        'This is Ludwig’s angina: a rapidly spreading cellulitis of the submandibular space (sublingual and submental spaces), usually from lower molar infection. It pushes the tongue up and back and can obstruct the airway. The priority is airway management (awake fibreoptic intubation or tracheostomy), then high-dose IV antibiotics and surgical decompression. It rarely forms a localised abscess, so waiting is dangerous.',
        { reference: "Dhingra's Diseases of Ear, Nose and Throat", difficulty: 'Medium', type: 'clinical-case', integratedSubjects: ['ENT', 'Anaesthesia'], system: 'ENT', tags: ['ludwig-angina', 'deep-neck-space', 'airway'] }),
      q('ent-106',
        'Why does carcinoma of the true vocal cord (glottic carcinoma) generally have a better prognosis than supraglottic carcinoma?',
        ["Early hoarseness and sparse glottic lymphatics", "It is usually an adenocarcinoma, which is slow-growing", "It is caused only by HPV, which carries a better prognosis", "It occurs mainly in younger patients without comorbidity"],
        'Glottic cancer presents early because even a small lesion causes hoarseness, and the true vocal cords have very sparse lymphatic drainage, so nodal metastasis is uncommon in early disease. Supraglottic cancer is often silent until advanced and the region has rich bilateral lymphatics, so neck nodes are common at presentation. Most laryngeal cancers are squamous cell carcinomas related to smoking.',
        { reference: "Dhingra's Diseases of Ear, Nose and Throat", difficulty: 'Medium', type: 'standard', integratedSubjects: ['ENT', 'Pathology'], system: 'ENT', tags: ['laryngeal-cancer', 'head-neck-malignancy'] }),
    ],
  },
}

// ============================================================================ OPHTHALMOLOGY
const eye: BatchAdditions = {
  addTo: {
    'retina-cataract': [
      q('oph-104',
        'A 2-year-old has a white pupillary reflex (leukocoria) in the right eye noticed in photographs, and a squint. Ultrasound and CT show an intraocular mass with calcification. Which statement is correct?',
        ["Biopsy is avoided because of tumour seeding", "The disease is never inherited", "Calcification on imaging makes retinoblastoma unlikely", "It is caused by gain-of-function mutation in an oncogene"],
        'Leukocoria with a calcified intraocular mass in a young child is retinoblastoma until proven otherwise. Diagnosis is clinical, by examination under anaesthesia and imaging (calcification is typical). Biopsy is avoided because it risks spreading the tumour outside the eye. It is caused by loss of BOTH copies of the RB1 tumour suppressor gene (Knudson’s two-hit hypothesis); about 40% of cases are heritable (germline), often bilateral, with a risk of later osteosarcoma.',
        { reference: "Khurana's Comprehensive Ophthalmology; Robbins & Cotran", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Ophthalmology', 'Pathology'], system: 'Eye', tags: ['retinoblastoma', 'leukocoria', 'rb1'] }),
      q('oph-105',
        'A 58-year-old with type 2 diabetes has blurred central vision. OCT shows centre-involving diabetic macular oedema, and visual acuity is 6/24. What is the first-line treatment?',
        ['Intravitreal anti-VEGF injections', 'Panretinal photocoagulation', 'Topical corticosteroid drops', 'Immediate pars plana vitrectomy'],
        'For centre-involving diabetic macular oedema with reduced vision, repeated intravitreal anti-VEGF injections (e.g. ranibizumab, aflibercept, bevacizumab) are first-line, giving better visual gains than macular laser. Intravitreal steroid implants are second-line, especially in pseudophakic eyes. Panretinal photocoagulation is for proliferative retinopathy, topical steroids have no role, and vitrectomy is for tractional oedema or non-clearing vitreous haemorrhage.',
        { reference: "Kanski's Clinical Ophthalmology; AAO Preferred Practice Pattern for Diabetic Retinopathy", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Ophthalmology', 'Pharmacology'], system: 'Eye', tags: ['diabetic-macular-oedema', 'anti-vegf'] }),
      q('oph-106',
        'Under the Indian national guidelines for retinopathy of prematurity (ROP), which infants should be screened?',
        ["Below 34 weeks and/or below 2,000 g", "Only infants born before 28 weeks’ gestation", "Only infants weighing less than 1,000 g at birth", "All newborns needing phototherapy for jaundice"],
        'India’s national ROP guidelines recommend screening all preterm infants below 34 weeks’ gestation and/or below 2,000 g birth weight (wider than many Western criteria, because larger infants in India also develop severe ROP), plus older or heavier infants with risk factors such as prolonged oxygen or sepsis. The first examination is by day 30 of life (earlier, at 2–3 weeks, for infants under 28 weeks or 1,200 g). Unregulated oxygen therapy is a key preventable risk factor.',
        { reference: 'Guidelines for Universal Eye Screening in Newborns / National ROP guidelines, MoHFW', difficulty: 'Hard', type: 'standard', integratedSubjects: ['Ophthalmology', 'Pediatrics'], system: 'Eye', tags: ['retinopathy-of-prematurity', 'screening', 'neonatology'] }),
    ],
  },
  newTopics: [
    {
      id: 'neuro-ophthalmology',
      name: 'Neuro-ophthalmology & Emergencies',
      description: 'Sudden visual loss, cranial nerve palsies and field defects.',
      questions: [
          q('oph-101',
            'A 42-year-old man keeps bumping into objects at the sides and has had headaches for 6 months. His visual field charts are shown. Where is the lesion most likely?',
            ["Optic chiasm", "Left optic tract", "Right occipital cortex", "Right optic nerve"],
            'Loss of the temporal half of the field in BOTH eyes is a bitemporal hemianopia. It results from compression of the crossing nasal retinal fibres at the optic chiasm, most often by a pituitary macroadenoma (craniopharyngioma or meningioma are other causes). Optic tract or occipital lesions cause homonymous defects (same side in both eyes), and an optic nerve lesion affects one eye only.',
            { reference: "Khurana's Comprehensive Ophthalmology; Kanski's Clinical Ophthalmology", difficulty: 'Hard', type: 'image', sourceType: 'IMAGE', imageUrl: '/images/eye/visual-fields-bitemporal.svg', imageAlt: 'Visual field charts as seen by the patient: temporal half of each eye’s field is lost', imageCaption: 'Visual fields, both eyes', imageType: 'diagram', imageSource: ORIGINAL_DIAGRAM, integratedSubjects: ['Ophthalmology', 'Anatomy'], system: 'Eye', tags: ['visual-fields', 'chiasm', 'pituitary-adenoma', 'image'] }),
        q('oph-102',
          'A 74-year-old woman has sudden painless loss of vision in the right eye. For several weeks she has had headache, scalp tenderness and pain in the jaw on chewing. ESR is 90 mm/h. What is the most appropriate immediate step?',
          ["High-dose steroids now; temporal artery biopsy later", "Wait for temporal artery biopsy before any treatment", "Ocular massage and anterior chamber paracentesis", "Low-dose aspirin alone and review in a week"],
          'Visual loss with headache, scalp tenderness, jaw claudication and a very high ESR indicates giant cell arteritis, causing arteritic anterior ischaemic optic neuropathy or central retinal artery occlusion. The fellow eye is at high risk within days, so high-dose corticosteroids (IV methylprednisolone if vision is affected) are started immediately; biopsy within 1–2 weeks remains diagnostic despite steroids. Ocular massage and paracentesis are for non-arteritic CRAO.',
          { reference: "Kanski's Clinical Ophthalmology; Harrison's", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Ophthalmology', 'Medicine'], system: 'Eye', tags: ['giant-cell-arteritis', 'sudden-visual-loss', 'emergency'], clinicalPearl: 'Suspect GCA → steroids first, biopsy later.' }),
        q('oph-103',
          'A 52-year-old woman has sudden severe headache and drooping of the left eyelid. The left eye is turned down and out, with a fixed, dilated pupil. What is the most urgent investigation?',
          ["Urgent CT or MR angiography", "HbA1c and observation for spontaneous recovery", "Edrophonium (Tensilon) test for myasthenia", "Thyroid function tests and orbital ultrasound"],
          'A third nerve palsy with pupil involvement indicates compression, because the pupillomotor fibres run superficially on the nerve; the classic cause is a posterior communicating artery aneurysm, which can rupture. Urgent CT or MR angiography is needed. Microvascular (diabetic or hypertensive) third nerve palsies typically SPARE the pupil, because ischaemia affects the core of the nerve. Myasthenia does not affect the pupil.',
          { reference: "Kanski's Clinical Ophthalmology; Harrison's", difficulty: 'Expert', type: 'clinical-case', integratedSubjects: ['Ophthalmology', 'Medicine'], system: 'Nervous system', tags: ['oculomotor-palsy', 'aneurysm', 'neuro-ophthalmology'], clinicalPearl: 'Pupil-involving third nerve palsy = aneurysm until proven otherwise.' }),
      ],
    },
  ],
}

// ============================================================================ DERMATOLOGY
const derm: BatchAdditions = {
  addTo: {
    'infections-infestations': [
      q('derm-102',
        'A 35-year-old has seven hypopigmented, hypoaesthetic patches on the trunk and limbs, with no thickened nerves. Slit-skin smear is negative for acid-fast bacilli. How is this leprosy classified for treatment under the WHO operational classification?',
        ['Multibacillary, because there are more than five lesions', 'Paucibacillary, because the smear is negative', 'Indeterminate, so no treatment is needed', 'Pure neuritic leprosy'],
        'The WHO operational classification uses the number of skin lesions: 1–5 lesions is paucibacillary; more than 5 lesions, nerve involvement, or a positive slit-skin smear at any site makes it multibacillary. A negative smear does not override a lesion count above five. Multibacillary leprosy is treated with 12 months of multidrug therapy (rifampicin, clofazimine and dapsone).',
        { reference: 'WHO Guidelines for the Diagnosis, Treatment and Prevention of Leprosy; IADVL Textbook of Dermatology', difficulty: 'Hard', type: 'clinical-case', system: 'Skin', tags: ['leprosy', 'classification', 'multidrug-therapy'] }),
      q('derm-104',
        'A young man has a non-itchy, symmetrical copper-coloured rash involving the palms and soles, generalised lymphadenopathy and moist, flat-topped plaques around the anus. Six weeks earlier he had a painless genital ulcer. VDRL is reactive. What is the treatment?',
        ["Single IM dose of benzathine penicillin G", "Oral acyclovir for 7 days", "Single oral dose of fluconazole 150 mg", "Potent topical corticosteroid to the rash"],
        'A rash on the palms and soles, lymphadenopathy and condylomata lata after a painless chancre is secondary syphilis. Early syphilis (primary, secondary and early latent) is treated with a single IM dose of benzathine penicillin G 2.4 million units (doxycycline for 14 days if allergic), with follow-up quantitative VDRL or RPR titres; a Jarisch–Herxheimer reaction may follow the first dose. Partners must be traced and treated.',
        { reference: 'NACO National STI/RTI Guidelines; IADVL Textbook of Dermatology', difficulty: 'Medium', type: 'clinical-case', integratedSubjects: ['Dermatology', 'Microbiology'], system: 'Skin', tags: ['syphilis', 'sti'] }),
      q('derm-105',
        'An elderly nursing-home resident on long-term steroids has thick, crusted, scaly plaques on the hands and elbows with little itching. Several staff members develop itchy rashes. Microscopy of scrapings shows numerous mites. Which treatment is most appropriate?',
        ["Oral ivermectin plus topical permethrin", "A single application of topical permethrin", "Oral antihistamines and emollients alone", "Potent topical corticosteroid ointment"],
        'Crusted (Norwegian) scabies in immunosuppressed or elderly patients carries an enormous mite load, is highly contagious and can cause institutional outbreaks. It needs repeated oral ivermectin combined with topical scabicides (permethrin) and keratolytics, plus simultaneous treatment of all contacts and environmental decontamination. A single topical application is insufficient, and steroids make it worse.',
        { reference: 'IADVL Textbook of Dermatology; Rook’s Textbook of Dermatology', difficulty: 'Medium', type: 'clinical-case', integratedSubjects: ['Dermatology', 'Microbiology'], system: 'Skin', tags: ['scabies', 'crusted-scabies', 'ivermectin'] }),
      q('derm-106',
        'A 25-year-old has a large, itchy, poorly defined annular rash on the thighs that keeps spreading after months of applying an over-the-counter cream containing clobetasol, an antifungal and an antibiotic. KOH mount shows septate hyphae. What is the most likely diagnosis?',
        ["Tinea incognito", "Plaque psoriasis", "Nummular (discoid) eczema", "Pityriasis rosea"],
        'Topical potent steroids suppress inflammation and local immunity, so dermatophyte infection spreads with a blurred, atypical appearance — tinea incognito. Misuse of fixed-dose steroid–antifungal–antibiotic creams is a major driver of the current epidemic of chronic, recurrent dermatophytosis in India. Treatment is to stop the steroid and give appropriate systemic and topical antifungals for an adequate duration. KOH positivity excludes the other options.',
        { reference: 'IADVL consensus on dermatophytosis; IADVL Textbook of Dermatology', difficulty: 'Medium', type: 'clinical-case', system: 'Skin', tags: ['dermatophytosis', 'tinea-incognito', 'steroid-misuse'] }),
    ],
    'papulosquamous-autoimmune': [
      q('derm-101',
        'Ten days after starting carbamazepine for trigeminal neuralgia, a 30-year-old of Han Chinese descent develops fever, painful dusky skin with blistering and detachment over 35% of the body surface, and erosions of the mouth and eyes. Which statement is correct?',
        ['This is toxic epidermal necrolysis, and HLA-B*15:02 screening could have reduced the risk', 'This is Stevens–Johnson syndrome, because less than 10% of the skin is detached', 'Carbamazepine should be continued at a lower dose', 'This is a type I (IgE-mediated) reaction best treated with adrenaline'],
        'Skin detachment of more than 30% of body surface with mucosal involvement is toxic epidermal necrolysis (SJS is below 10%, SJS–TEN overlap 10–30%). It is a T-cell-mediated (type IV) reaction; the culprit drug must be stopped immediately and the patient managed in a burns-type unit. HLA-B*15:02 strongly predisposes to carbamazepine-induced SJS/TEN in some Asian populations, and screening before starting the drug is recommended for people of at-risk ancestry.',
        { reference: "IADVL Textbook of Dermatology; Goodman & Gilman's", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Dermatology', 'Pharmacology'], system: 'Skin', tags: ['sjs-ten', 'adverse-drug-reaction', 'pharmacogenomics'] }),
      q('derm-103',
        'A 28-year-old has intensely itchy grouped vesicles on the elbows, knees and buttocks. Direct immunofluorescence of perilesional skin shows granular IgA deposits in the dermal papillae. Which statement is correct?',
        ['It is associated with gluten-sensitive enteropathy and responds to dapsone', 'It is caused by autoantibodies against desmoglein 3', 'It shows linear IgG along the basement membrane', 'It is best treated with high-dose systemic steroids alone'],
        'Dermatitis herpetiformis is the skin manifestation of gluten sensitivity (coeliac disease); granular IgA in the dermal papillae (against epidermal transglutaminase) is diagnostic. Itching responds rapidly to dapsone, and a strict gluten-free diet controls both skin and gut disease. Desmoglein-3 antibodies cause pemphigus vulgaris, and linear deposits along the basement membrane are seen in bullous pemphigoid (IgG and C3) and linear IgA disease.',
        { reference: 'IADVL Textbook of Dermatology; Robbins & Cotran', difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Dermatology', 'Pathology'], system: 'Skin', tags: ['dermatitis-herpetiformis', 'immunofluorescence', 'bullous-disorders'] }),
    ],
  },
}

// ============================================================================ PSYCHIATRY
const psych: BatchAdditions = {
  newTopics: [
    {
      id: 'neurocognitive',
      name: 'Delirium & Neurocognitive Disorders',
      description: 'Delirium, dementia and organic psychiatric syndromes.',
      questions: [
          q('psych-105',
            'Two days after a hip fracture repair, a 78-year-old becomes acutely confused, worse at night, with fluctuating attention, visual hallucinations and a disturbed sleep–wake cycle. What is the most likely diagnosis?',
            ['Delirium', 'Alzheimer’s dementia', 'Late-onset schizophrenia', 'Depressive pseudodementia'],
            'Acute onset over hours to days, a fluctuating course, impaired attention and altered consciousness define delirium — common in older people after surgery, infection or anticholinergic drugs. It is a medical emergency: identify and treat the cause and use non-drug measures (orientation, sleep hygiene, avoiding restraints and deliriogenic drugs). Dementia develops gradually over months with preserved alertness.',
            { reference: "Kaplan & Sadock's Synopsis of Psychiatry", difficulty: 'Medium', type: 'clinical-case', integratedSubjects: ['Psychiatry', 'Medicine'], system: 'Psychiatry', tags: ['delirium', 'geriatric', 'cognitive-disorders'] }),
      ],
    },
  ],
  addTo: {
    'mood-psychotic-disorders': [
      q('psych-101',
        'A 45-year-old on long-term lithium for bipolar disorder was recently started on a new antihypertensive. She now has coarse tremor, vomiting, ataxia and confusion; serum lithium is 2.4 mmol/L. Which drug most likely caused this?',
        ["Hydrochlorothiazide", "Amlodipine", "Theophylline (sustained-release)", "Acetazolamide"],
        'Lithium is cleared entirely by the kidneys and handled like sodium. Thiazides cause sodium loss, and the proximal tubule compensates by reabsorbing more sodium — and lithium — raising lithium levels by about 25–40% and causing toxicity. ACE inhibitors, ARBs and NSAIDs have the same effect. Theophylline and acetazolamide INCREASE lithium excretion. Severe toxicity (as here) may need haemodialysis.',
        { reference: "Kaplan & Sadock's Synopsis of Psychiatry; Goodman & Gilman's", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Psychiatry', 'Pharmacology'], system: 'Psychiatry', tags: ['lithium', 'drug-interaction', 'toxicity'] }),
      q('psych-102',
        'Three days after haloperidol was started and its dose rapidly increased, a 28-year-old develops fever of 40 °C, generalised "lead-pipe" rigidity, fluctuating consciousness and labile BP. CK is 18,000 U/L. What is the most likely diagnosis?',
        ['Neuroleptic malignant syndrome', 'Serotonin syndrome', 'Acute dystonia', 'Malignant catatonia caused by the psychosis itself'],
        'Fever, lead-pipe rigidity, altered consciousness, autonomic instability and a very high CK developing over days after starting or rapidly increasing a high-potency antipsychotic indicate neuroleptic malignant syndrome, a dopamine-blockade emergency. Management: stop the antipsychotic, cool and hydrate (protecting the kidneys from rhabdomyolysis), and give benzodiazepines, with bromocriptine or dantrolene in severe cases. Serotonin syndrome develops within hours, with clonus and hyperreflexia rather than rigidity.',
        { reference: "Kaplan & Sadock's Synopsis of Psychiatry", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Psychiatry', 'Pharmacology'], system: 'Psychiatry', tags: ['nms', 'antipsychotics', 'emergency'] }),
      q('psych-103',
        'A 24-year-old with schizophrenia has persistent hallucinations and delusions despite adequate trials (dose and duration, with good adherence) of risperidone and then olanzapine. What is the recommended next drug?',
        ['Clozapine', 'Haloperidol', 'A third atypical antipsychotic such as aripiprazole', 'Lithium as monotherapy'],
        'Failure to respond to at least two adequate trials of different antipsychotics defines treatment-resistant schizophrenia, for which clozapine is the only drug with proven superior efficacy (it also reduces suicidality). It needs regular absolute neutrophil count monitoring for agranulocytosis and attention to myocarditis, seizures, constipation and metabolic effects. Further trials of other antipsychotics delay effective treatment.',
        { reference: "Kaplan & Sadock's Synopsis of Psychiatry; IPS Clinical Practice Guidelines", difficulty: 'Medium', type: 'clinical-case', integratedSubjects: ['Psychiatry', 'Pharmacology'], system: 'Psychiatry', tags: ['treatment-resistant-schizophrenia', 'clozapine'] }),
      q('psych-106',
        'A 68-year-old man with severe depression has stopped eating and drinking for a week, is convinced he is already dead, and says he wants to die. What is the most appropriate treatment?',
        ['Electroconvulsive therapy', 'Start an SSRI and review in 6 weeks', 'Cognitive behavioural therapy alone', 'A low-dose benzodiazepine at night'],
        'Severe depression with psychotic (nihilistic) features, refusal of food and fluids, and high suicide risk needs a rapid response. ECT is the most effective and fastest treatment in this situation, and it is safe in older adults. Antidepressants take weeks to act, and psychotherapy alone is inappropriate at this severity. Other ECT indications include catatonia and treatment-resistant depression.',
        { reference: "Kaplan & Sadock's Synopsis of Psychiatry", difficulty: 'Hard', type: 'clinical-case', system: 'Psychiatry', tags: ['ect', 'psychotic-depression', 'suicide-risk'] }),
    ],
    'substance-child-psychiatry': [
      q('psych-104',
        'A man who has used heroin daily for 2 years is admitted for surgery. Twelve hours after his last dose, which finding supports opioid withdrawal rather than opioid intoxication?',
        ["Dilated pupils and piloerection", "Pinpoint pupils", "Respiratory depression", "Constipation and drowsiness"],
        'Opioid withdrawal is a state of noradrenergic and cholinergic overactivity: mydriasis, lacrimation, rhinorrhoea, yawning, piloerection ("cold turkey"), sweating, diarrhoea, abdominal cramps and restlessness. It is very unpleasant but rarely life-threatening. Intoxication causes the opposite: miosis, drowsiness, respiratory depression and constipation. Withdrawal is managed with buprenorphine or methadone, or with clonidine for symptoms.',
        { reference: "Kaplan & Sadock's Synopsis of Psychiatry", difficulty: 'Medium', type: 'clinical-case', system: 'Psychiatry', tags: ['opioid-withdrawal', 'substance-use'] }),
    ],
  },
}

// ============================================================================ RADIOLOGY
const radiology: BatchAdditions = {
  newTopics: [
    {
      id: 'imaging-safety-emergency',
      name: 'Imaging Safety, Emergency & Paediatric Imaging',
      description: 'Choosing safe imaging, contrast and MRI safety, FAST, imaging in pregnancy and children.',
      questions: [
          q('rad-101',
            'A woman at 22 weeks of pregnancy has right-sided abdominal pain, fever and leukocytosis. Ultrasound cannot visualise the appendix. What is the most appropriate next imaging?',
            ['MRI of the abdomen without gadolinium', 'Contrast-enhanced CT of the abdomen', 'Plain abdominal X-ray', 'Barium enema'],
            'In suspected appendicitis in pregnancy, graded-compression ultrasound comes first; if inconclusive, MRI without gadolinium is preferred because it involves no ionising radiation and is highly accurate. Gadolinium is avoided because it crosses the placenta. CT is used if MRI is unavailable and diagnosis is urgent — the fetal dose from one CT is below the threshold for deterministic effects, but it is not first choice. Plain X-ray and barium studies have no role.',
            { reference: 'ACR Appropriateness Criteria; Sutton Textbook of Radiology', difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Radiology', 'Obstetrics & Gynaecology'], system: 'Gastrointestinal', tags: ['imaging-in-pregnancy', 'radiation-safety', 'appendicitis'] }),
          q('rad-104',
            'A 70-year-old with diabetes on metformin and an eGFR of 35 mL/min/1.73 m² needs a contrast-enhanced CT. Which measure is most effective at reducing the risk of contrast-associated acute kidney injury?',
            ['IV isotonic fluid hydration before and after the scan', 'Oral N-acetylcysteine as the main preventive measure', 'Prophylactic haemodialysis immediately after the scan', 'Doubling the contrast dose to shorten the scan'],
            'For patients at risk (eGFR below about 30–45, especially with diabetes), use the lowest effective dose of iso- or low-osmolar contrast and give IV isotonic saline before and after. N-acetylcysteine and bicarbonate showed no benefit over saline in large trials, and prophylactic dialysis is not recommended. Metformin is withheld in patients with eGFR below 30 or acute kidney injury and restarted after 48 hours if renal function is stable.',
            { reference: 'ACR Manual on Contrast Media; ESUR guidelines', difficulty: 'Medium', type: 'clinical-case', integratedSubjects: ['Radiology', 'Medicine'], system: 'Renal', tags: ['contrast-nephropathy', 'contrast-safety'] }),
          q('rad-105',
            'Which four views make up a standard FAST (focused assessment with sonography for trauma) examination?',
            ["Hepatorenal, splenorenal, pelvis, pericardium", "Liver, gallbladder, pancreas and abdominal aorta", "Both kidneys, the bladder and the inferior vena cava", "Both lungs, the heart and the thoracic aorta"],
            'FAST looks for free fluid (blood) in the hepatorenal space (Morison’s pouch), the splenorenal space, the pelvis (rectovesical or rectouterine pouch) and the pericardium. Extended FAST (eFAST) adds views of both hemithoraces for pneumothorax and haemothorax. FAST detects free fluid but is poor at showing solid-organ or hollow-viscus injury, so stable patients still need CT.',
            { reference: 'ATLS, 10th Edition', difficulty: 'Medium', type: 'standard', integratedSubjects: ['Radiology', 'Surgery'], system: 'Gastrointestinal', tags: ['fast', 'emergency-imaging', 'trauma'] }),
          q('rad-103',
            'Before MRI, a metalworker says a metal fragment once flew into his eye while grinding. What should be done?',
            ["Orbital X-ray or CT to exclude a metallic foreign body", "Proceed with MRI, as small fragments are harmless", "Give a sedative and proceed with the MRI", "Scan at a lower field strength without screening"],
            'Ferromagnetic material in the eye can move or heat in the MRI magnet and cause blindness, so a history of metalwork injury requires screening with orbital radiographs or CT first. Other contraindications include non-MR-conditional pacemakers and defibrillators, some cochlear implants and ferromagnetic aneurysm clips. Many modern implants are MR-conditional and need specific scanner settings.',
            { reference: 'ACR Manual on MR Safety', difficulty: 'Medium', type: 'clinical-case', system: 'Eye', tags: ['mri-safety', 'radiation-safety'] }),
          q('rad-106',
            'A 6-week-old girl born by breech delivery has asymmetric thigh folds and a positive Ortolani test on the left. Which imaging is preferred to assess the hip?',
            ['Ultrasound of the hip (Graf method)', 'Plain AP radiograph of the pelvis', 'CT of the hips', 'Radionuclide bone scan'],
            'In infants under about 4–6 months the femoral head is cartilaginous and not visible on X-ray, so dynamic ultrasound (Graf alpha and beta angles) is the imaging of choice for developmental dysplasia of the hip. Radiographs become useful once the ossific nucleus appears. Early DDH is treated with a Pavlik harness. Breech presentation, female sex, first-born and family history are risk factors.',
            { reference: "Apley & Solomon's; Sutton Textbook of Radiology", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Radiology', 'Orthopedics'], system: 'Musculoskeletal', tags: ['ddh', 'paediatric-imaging', 'ultrasound'] }),
      ],
    },
  ],
  addTo: {
    'chest-cardiac-imaging': [
      q('rad-102',
        'A man with healed tuberculosis has haemoptysis. Chest X-ray and CT show a rounded mass within an upper-lobe cavity, separated from the cavity wall by a crescent of air, and the mass moves when he changes position. What is the most likely diagnosis?',
        ['Aspergilloma (fungal ball)', 'Lung abscess', 'Hydatid cyst', 'Bronchogenic carcinoma'],
        'A mobile mass inside a pre-existing cavity (often from old TB), outlined by an air crescent (Monod sign), is an aspergilloma — a ball of Aspergillus hyphae colonising the cavity. It commonly causes haemoptysis, which may be massive (treated by bronchial artery embolisation or resection). An air crescent can also appear in invasive aspergillosis during neutrophil recovery, but that is a different clinical setting.',
        { reference: 'Sutton Textbook of Radiology; Ananthanarayan & Paniker', difficulty: 'Medium', type: 'clinical-case', integratedSubjects: ['Radiology', 'Microbiology'], system: 'Respiratory', tags: ['aspergilloma', 'air-crescent', 'chest-imaging'] }),
    ],
  },
}

// ============================================================================ ANAESTHESIA
const anaesthesia: BatchAdditions = {
  addTo: {
    'general-anesthesia-airway': [
      q('anes-101',
        'After induction, the anaesthetist cannot intubate after three attempts. Oxygenation also fails with a face mask and a second-generation supraglottic airway, and SpO2 is falling rapidly. What is the next step?',
        ["Front-of-neck access (cricothyroidotomy)", "A fourth attempt at direct laryngoscopy", "Wait for spontaneous breathing to return", "Blind nasal intubation with the same tube"],
        'This is a "can’t intubate, can’t oxygenate" (CICO) emergency. Difficult Airway Society guidance is to declare CICO and proceed immediately to front-of-neck access, preferably a scalpel–bougie–tube cricothyroidotomy through the cricothyroid membrane. Repeated laryngoscopy causes trauma and delays oxygenation, and waking the patient is only an option while oxygenation can still be maintained.',
        { reference: 'Difficult Airway Society (DAS) guidelines; Miller’s Anesthesia', difficulty: 'Hard', type: 'clinical-case', system: 'Respiratory', tags: ['difficult-airway', 'cico', 'cricothyroidotomy'] }),
      q('anes-103',
        'Which finding is the most reliable confirmation that an endotracheal tube is in the trachea after intubation?',
        ['A sustained capnography waveform over several breaths', 'Misting of the tube', 'Equal chest rise on both sides', 'Auscultation of breath sounds in the axillae'],
        'Sustained detection of exhaled CO2 with a normal waveform over at least several breaths is the gold-standard confirmation. Tube misting, chest movement and auscultation can all be misleading — for example, air in the oesophagus can mimic breath sounds. Loss of the capnograph trace after intubation suggests oesophageal placement, disconnection, obstruction or cardiac arrest ("no trace = wrong place").',
        { reference: "Miller's Anesthesia; Royal College of Anaesthetists guidance", difficulty: 'Medium', type: 'standard', system: 'Respiratory', tags: ['capnography', 'intubation', 'monitoring'] }),
      q('anes-104',
        'After a short procedure using succinylcholine, a patient remains apnoeic and paralysed for over 2 hours. A plasma test shows a low dibucaine number (about 20). What is the cause?',
        ["Atypical plasma cholinesterase", "Malignant hyperthermia", "Residual non-depolarising blockade", "Undiagnosed myasthenia gravis"],
        'Succinylcholine is normally hydrolysed within minutes by plasma (pseudo)cholinesterase. In inherited atypical cholinesterase the enzyme works poorly. Dibucaine inhibits normal enzyme by about 80% (dibucaine number about 80), atypical heterozygotes about 40–60, and homozygotes about 20 — causing hours of paralysis. Management is ventilation and sedation until recovery (fresh frozen plasma can supply enzyme). Family members should be tested.',
        { reference: "Miller's Anesthesia; Goodman & Gilman's", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Anaesthesia', 'Biochemistry'], system: 'General principles', tags: ['succinylcholine', 'pseudocholinesterase', 'dibucaine-number'] }),
    ],
    'regional-anesthesia': [
      q('anes-102',
        'A 50-kg patient is to receive 2% lignocaine WITHOUT adrenaline for a nerve block. Using a maximum safe dose of 4.5 mg/kg, what is the maximum volume that can be given?',
        ['About 11 mL', 'About 17.5 mL', 'About 22.5 mL', 'About 5.6 mL'],
        'Maximum dose = 4.5 mg/kg × 50 kg = 225 mg. A 2% solution contains 20 mg/mL, so the maximum volume = 225 / 20 ≈ 11.25 mL. With adrenaline the maximum rises to about 7 mg/kg (350 mg = 17.5 mL of 2%), because vasoconstriction slows absorption. Confusing 2% with 1% (10 mg/mL) doubles the volume to 22.5 mL — a dangerous overdose.',
        { reference: "Miller's Anesthesia; Morgan & Mikhail's Clinical Anesthesiology", difficulty: 'Hard', type: 'standard', integratedSubjects: ['Anaesthesia', 'Pharmacology'], system: 'General principles', tags: ['local-anaesthetic', 'maximum-dose', 'calculation'], clinicalPearl: 'x% solution = 10x mg/mL (2% = 20 mg/mL).' }),
      q('anes-105',
        'What sensory block height is needed for a caesarean section under spinal anaesthesia?',
        ['T4', 'T10', 'L1', 'S2'],
        'Although the skin incision is low, peritoneal handling and uterine exteriorisation cause visceral pain, so a sensory block to T4 (nipple level) is needed. T10 (umbilicus) is adequate for labour analgesia and many lower-limb or perineal procedures. A high block also brings more sympathetic blockade, so hypotension is anticipated and treated (left uterine displacement, fluids, phenylephrine).',
        { reference: "Miller's Anesthesia; Morgan & Mikhail's Clinical Anesthesiology", difficulty: 'Medium', type: 'standard', integratedSubjects: ['Anaesthesia', 'Obstetrics & Gynaecology'], system: 'Reproductive & Obstetrics', tags: ['spinal-anaesthesia', 'caesarean-section', 'dermatomes'] }),
    ],
    'critical-care-resuscitation': [
      q('anes-106',
        'A ventilated patient with ARDS has PaO2/FiO2 of 110 despite low tidal volume ventilation (6 mL/kg predicted body weight) and adequate PEEP. Which additional intervention has been shown to reduce mortality?',
        ['Prone positioning for at least 12–16 hours a day', 'Routine high-frequency oscillatory ventilation', 'Inhaled nitric oxide', 'Increasing tidal volume to 10 mL/kg'],
        'In moderate-to-severe ARDS (PaO2/FiO2 below 150), prolonged prone positioning (at least 12–16 hours a day) reduced mortality in the PROSEVA trial by improving V/Q matching and distributing lung stress more evenly. Inhaled nitric oxide improves oxygenation transiently without a survival benefit, routine high-frequency oscillation may increase mortality, and larger tidal volumes cause ventilator-induced lung injury.',
        { reference: 'ATS/ESICM/SCCM ARDS guideline; PROSEVA trial', difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Anaesthesia', 'Medicine'], system: 'Respiratory', tags: ['ards', 'prone-positioning', 'critical-care'] }),
    ],
  },
}

export const batch4: Partial<Record<SubjectSlug, BatchAdditions>> = {
  'community-medicine': psm,
  'forensic-medicine': fmt,
  ent,
  ophthalmology: eye,
  dermatology: derm,
  psychiatry: psych,
  radiology,
  anesthesia: anaesthesia,
}
