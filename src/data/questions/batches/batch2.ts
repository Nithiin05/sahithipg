import type { SubjectSlug } from '../../../types'
import type { BatchAdditions } from './batch1'
import { q, ORIGINAL_DIAGRAM } from './helpers'

/**
 * INI-CET question batch 2 — Surgery, Obstetrics & Gynaecology, Pediatrics, Orthopedics.
 * All questions are ORIGINAL; none is presented as an actual INI-CET question.
 * Correct answer is written first; display order is randomised.
 */

// ============================================================================ SURGERY
const surgery: BatchAdditions = {
  addTo: {
    'gi-surgery': [
      q('surg-106',
        'A 45-year-old woman is admitted with mild acute pancreatitis. Ultrasound shows gallstones and a normal-calibre common bile duct; her pain and enzymes settle within 72 hours. When should cholecystectomy be performed?',
        ['During the same admission, once she has recovered', 'After 6–8 weeks, once inflammation has fully settled', 'Only if she has a second attack of pancreatitis', 'Not required if an ERCP with sphincterotomy is done'],
        'In mild gallstone pancreatitis, laparoscopic cholecystectomy during the index admission markedly reduces recurrent biliary events (pancreatitis, cholecystitis, colic) compared with delayed surgery. Delay of about 6 weeks is reserved for severe pancreatitis with collections. ERCP with sphincterotomy is for cholangitis or persistent duct obstruction and protects against recurrent pancreatitis only, not other gallstone complications, in patients fit for surgery.',
        { reference: "Bailey & Love's Short Practice of Surgery; IAP/APA Acute Pancreatitis Guidelines", difficulty: 'Hard', type: 'clinical-case', system: 'Gastrointestinal', tags: ['pancreatitis', 'gallstones', 'cholecystectomy'] }),
      q('surg-107',
        'A 74-year-old thin woman has 2 days of colicky abdominal pain and vomiting. There is a tender, irreducible 3-cm lump in the right groin lying below the inguinal ligament and lateral to the pubic tubercle. What is the most likely diagnosis?',
        ['Strangulated femoral hernia', 'Obstructed indirect inguinal hernia', 'Obturator hernia', 'Saphena varix'],
        'A hernia that emerges below the inguinal ligament and lateral to the pubic tubercle is femoral; inguinal hernias lie above and medial to the tubercle. Femoral hernias are commonest in elderly women and have the highest risk of strangulation because the femoral ring is narrow and rigid, so emergency surgery is needed. An obturator hernia is deep and usually not palpable (it may cause the Howship–Romberg sign). A saphena varix is soft, compressible, has a cough impulse and transmits a thrill — it does not cause obstruction.',
        { reference: "Bailey & Love's Short Practice of Surgery", difficulty: 'Medium', type: 'clinical-case', integratedSubjects: ['Surgery', 'Anatomy'], system: 'Gastrointestinal', tags: ['hernia', 'femoral-canal', 'intestinal-obstruction'] }),
    ],
    urology: [
      q('surg-109',
        'A 15-year-old boy wakes with sudden severe left scrotal pain and vomiting 3 hours ago. The left testis lies high with a horizontal lie, and the cremasteric reflex is absent on that side. What is the most appropriate next step?',
        ['Immediate scrotal exploration', 'Colour Doppler ultrasound, then decide on surgery', 'Antibiotics for epididymo-orchitis', 'Analgesia and review in 6 hours'],
        'Sudden pain, a high-riding horizontal testis and an absent cremasteric reflex are classic for testicular torsion. Salvage falls steeply after about 6 hours, so a clear clinical diagnosis goes straight to exploration, detorsion and bilateral orchidopexy; imaging is only for genuinely uncertain cases and must not delay surgery. Epididymo-orchitis is usually gradual, with fever, urinary symptoms and relief on elevation (Prehn sign).',
        { reference: "Bailey & Love's Short Practice of Surgery; EAU Paediatric Urology Guidelines", difficulty: 'Hard', type: 'clinical-case', system: 'Renal', tags: ['testicular-torsion', 'acute-scrotum'] }),
    ],
  },
  newTopics: [
    {
      id: 'trauma-burns',
      name: 'Trauma, Burns & Vascular Emergencies',
      description: 'ATLS primary survey, haemorrhage, chest trauma, burns and acute limb ischaemia.',
      questions: [
        q('surg-101',
          'A 70-kg man sustains 40% total body surface area deep partial- and full-thickness burns at 10:00 a.m. and reaches hospital at 12:00 noon. Using the Parkland formula, how much Ringer’s lactate should he receive in the first 8 hours, and by when?',
          ['5,600 mL, completed by 6:00 p.m.', '5,600 mL, completed by 8:00 p.m.', '11,200 mL, completed by 6:00 p.m.', '2,800 mL, completed by 6:00 p.m.'],
          'Parkland: 4 mL × body weight (kg) × %TBSA of partial- and full-thickness burns = 4 × 70 × 40 = 11,200 mL over 24 hours. Half (5,600 mL) is given in the first 8 hours counted from the TIME OF THE BURN, not from arrival — so by 6:00 p.m., which means 5,600 mL over the remaining 6 hours (about 930 mL/h). The rest is given over the next 16 hours. Infusion rates are then titrated to urine output (0.5 mL/kg/h in adults). ATLS 10th edition suggests starting adults at 2 mL/kg/%TBSA, but the question specifies Parkland.',
          { reference: "Bailey & Love's Short Practice of Surgery; ATLS, 10th Edition", difficulty: 'Hard', type: 'clinical-case', system: 'Skin', tags: ['burns', 'parkland-formula', 'calculation', 'fluids'], clinicalPearl: 'The 8-hour clock starts at the time of the burn. Titrate to urine output, not to the formula.' }),
        q('surg-102',
          'A restrained car driver is brought in after a high-speed collision. BP is 80/50 mmHg despite 2 L of crystalloid and 2 units of blood. FAST shows free fluid in Morison’s pouch. The chest X-ray and pelvic X-ray are normal. What is the next step?',
          ['Immediate exploratory laparotomy', 'Contrast-enhanced CT of the abdomen', 'Diagnostic peritoneal lavage to confirm bleeding', 'CT-guided angioembolisation of the liver'],
          'A haemodynamically unstable trauma patient who does not respond to resuscitation and has a positive FAST has intra-abdominal haemorrhage and needs immediate laparotomy. CT is only for haemodynamically stable or transient responders — the CT scanner is no place for an unstable patient. DPL adds nothing once FAST is positive, and angioembolisation is an option only in selected stable or transiently responding patients.',
          { reference: 'ATLS, 10th Edition', difficulty: 'Hard', type: 'clinical-case', system: 'Gastrointestinal', tags: ['trauma', 'fast', 'haemorrhagic-shock'] }),
        q('surg-103',
          'A 22-year-old with a stab wound to the right chest is breathless and hypotensive, with distended neck veins, a trachea deviated to the left and absent breath sounds on the right. What is the immediate management?',
          ["Immediate needle or finger decompression of the right chest", "Chest X-ray to confirm the diagnosis before any intervention", "Pericardiocentesis via the subxiphoid approach", "Emergency department thoracotomy for cardiac injury"],
          'Hypotension, distended neck veins, tracheal deviation away from the affected side and absent breath sounds indicate tension pneumothorax — a clinical diagnosis treated before any imaging. ATLS 10th edition recommends decompression in adults at the 4th/5th intercostal space just anterior to the mid-axillary line (the chest wall is thinner there than at the 2nd space, mid-clavicular line), followed by a chest drain. Cardiac tamponade also causes raised neck veins but not tracheal deviation or absent breath sounds.',
          { reference: 'ATLS, 10th Edition', difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Surgery', 'Anatomy'], system: 'Respiratory', tags: ['tension-pneumothorax', 'chest-trauma', 'atls'] }),
        q('surg-108',
          'A 68-year-old with atrial fibrillation (not anticoagulated) develops sudden pain in the right leg 4 hours ago. The leg is pale and cold with absent popliteal and pedal pulses, loss of sensation over the foot and mild weakness of toe dorsiflexion. What is the most appropriate management?',
          ['IV heparin and urgent surgical embolectomy', 'Catheter-directed thrombolysis over the next 24–48 hours', 'Elective CT angiography and outpatient review', 'Primary above-knee amputation'],
          'Sudden onset in a patient with AF suggests embolic acute limb ischaemia. Sensory loss beyond the toes with mild–moderate weakness is Rutherford class IIb (immediately threatened), which needs immediate revascularisation: systemic heparin and surgical (Fogarty) embolectomy. Catheter-directed thrombolysis takes hours to work and suits class IIa (marginally threatened) limbs. Primary amputation is for an irreversible (class III) limb with paralysis and rigor.',
          { reference: "Bailey & Love's Short Practice of Surgery; ESVS Acute Limb Ischaemia Guidelines", difficulty: 'Expert', type: 'clinical-case', integratedSubjects: ['Surgery', 'Medicine'], system: 'Cardiovascular', tags: ['acute-limb-ischaemia', 'embolism', 'vascular'] }),
      ],
    },
    {
      id: 'breast-endocrine-surgery',
      name: 'Breast & Endocrine Surgery',
      description: 'Breast lumps, thyroid nodules and endocrine tumours.',
      questions: [
        q('surg-104',
          'A 45-year-old woman has a 2.5-cm hard, irregular lump in the upper outer quadrant of the left breast. Mammography and ultrasound show a spiculated mass (BI-RADS 5). Which investigation establishes the tissue diagnosis before treatment?',
          ['Image-guided core needle biopsy', 'Excision biopsy of the lump as the first step', 'Serum CA 15-3 estimation', 'Whole-body PET-CT scan'],
          'Triple assessment combines clinical examination, imaging (mammography with ultrasound) and tissue diagnosis. Image-guided core needle biopsy is the standard tissue test: it confirms invasive cancer and provides tissue for grade and receptor status (ER, PR, HER2), which guide neoadjuvant therapy. Excision biopsy as a first step is avoided because it can compromise definitive surgery. Tumour markers are not diagnostic, and PET-CT is for staging selected advanced cancers.',
          { reference: "Bailey & Love's Short Practice of Surgery", difficulty: 'Medium', type: 'clinical-case', integratedSubjects: ['Surgery', 'Pathology'], system: 'Reproductive & Obstetrics', tags: ['breast-cancer', 'triple-assessment'] }),
        q('surg-105',
          'A 32-year-old woman has a thyroid nodule. FNA shows medullary carcinoma and serum calcitonin is markedly raised. Her father died suddenly during surgery for "high blood pressure". Before thyroidectomy, which test is essential?',
          ['Plasma free metanephrines', 'Radioactive iodine uptake scan', 'Serum thyroglobulin', 'TSH-suppression trial with levothyroxine'],
          'Medullary thyroid carcinoma with a suggestive family history raises MEN2 (germline RET mutation), which also causes phaeochromocytoma. A phaeochromocytoma must be excluded (plasma or urine metanephrines) and, if present, removed first after alpha-blockade; operating on the thyroid with an unrecognised phaeochromocytoma can cause a fatal hypertensive crisis. Medullary carcinoma arises from parafollicular C cells, so it does not take up iodine or produce thyroglobulin, and it is not TSH-dependent.',
          { reference: "Bailey & Love's Short Practice of Surgery; ATA Guidelines for Medullary Thyroid Cancer", difficulty: 'Expert', type: 'clinical-case', integratedSubjects: ['Surgery', 'Pathology'], system: 'Endocrine', tags: ['medullary-carcinoma', 'men2', 'phaeochromocytoma'], clinicalPearl: 'In MEN2, treat the phaeochromocytoma before the thyroid.' }),
      ],
    },
  ],
}

// ============================================================================ OBG
const obg: BatchAdditions = {
  addTo: {
    'obstetrics-antenatal-labour': [
      q('obg-101',
        'A primigravida at 39 weeks is in active labour on oxytocin augmentation. The CTG is shown. What do the recurrent decelerations indicate?',
        ['Uteroplacental insufficiency with fetal hypoxia', 'Fetal head compression during contractions', 'Umbilical cord compression', 'A normal fetal sleep cycle'],
        'Each deceleration begins after the peak of the contraction and recovers after it ends — late decelerations — and baseline variability is reduced. Late decelerations reflect uteroplacental insufficiency causing fetal hypoxia; recurrent late decelerations with reduced variability are a pathological trace. Management: stop oxytocin, change maternal position, give IV fluids, correct hypotension, and expedite delivery if they persist (fetal scalp blood sampling where available). Early decelerations mirror the contraction (head compression); variable decelerations vary in shape and timing (cord compression).',
        { reference: "Williams Obstetrics; FIGO/NICE intrapartum fetal monitoring guidance", difficulty: 'Hard', type: 'image', sourceType: 'IMAGE', imageUrl: '/images/obg/ctg-late-decelerations.svg', imageAlt: 'CTG: baseline about 150 bpm with reduced variability; each deceleration begins after a contraction peak and recovers after it', imageCaption: 'Cardiotocograph, 10 minutes', imageType: 'diagram', imageSource: ORIGINAL_DIAGRAM, system: 'Reproductive & Obstetrics', tags: ['ctg', 'fetal-monitoring', 'late-decelerations', 'image'], clinicalPearl: 'Early = head compression; variable = cord compression; late = placental insufficiency.' }),
      q('obg-108',
        'A woman in the active phase of labour is monitored with the WHO partograph. Her cervical dilatation line crosses the action line. What does this signify?',
        ["Progress is lagging well behind the expected rate", "She is still in the latent phase of labour", "She should now begin active maternal pushing", "There is acute fetal distress needing delivery"],
        'On the WHO partograph the alert line represents dilatation of 1 cm/hour from the start of the active phase; the action line is drawn 4 hours to its right. Crossing the action line means labour is progressing much more slowly than expected, so the cause must be assessed (contractions, position, cephalopelvic disproportion) and acted on, for example with augmentation or caesarean section. WHO’s 2020 Labour Care Guide now replaces fixed alert and action lines with stage-specific time limits, but the partograph principles remain widely taught.',
        { reference: 'WHO partograph; WHO Labour Care Guide (2020)', difficulty: 'Medium', type: 'standard', system: 'Reproductive & Obstetrics', tags: ['partograph', 'labour'] }),
    ],
    'high-risk-pregnancy': [
      q('obg-102',
        'A 22-year-old primigravida at 36 weeks has a generalised tonic–clonic seizure. BP is 170/112 mmHg and urine protein is 3+. After securing the airway and placing her in the left lateral position, which drug is first-line to control and prevent further seizures?',
        ['IV magnesium sulfate loading dose', 'IV phenytoin loading dose', 'IV diazepam as definitive therapy', 'IV levetiracetam'],
        'This is eclampsia. Magnesium sulfate is the anticonvulsant of choice for treating and preventing eclamptic seizures; in trials it was clearly superior to phenytoin and diazepam, reducing recurrent seizures and maternal death. It is given as a loading dose (Pritchard or Zuspan regimen) followed by maintenance, with severe hypertension controlled separately (e.g. labetalol or nifedipine) and delivery planned once she is stable.',
        { reference: "Williams Obstetrics; DC Dutta's Textbook of Obstetrics", difficulty: 'Medium', type: 'clinical-case', integratedSubjects: ['Obstetrics & Gynaecology', 'Pharmacology'], system: 'Reproductive & Obstetrics', tags: ['eclampsia', 'magnesium-sulfate'] }),
      q('obg-103',
        'Eight hours into magnesium sulfate maintenance therapy for severe pre-eclampsia, a woman’s patellar reflexes are absent, her respiratory rate is 10/min and urine output over 4 hours has been 60 mL. What is the immediate management?',
        ['Stop the infusion and give 1 g IV calcium gluconate', 'Halve the infusion rate and recheck in 1 hour', 'Give IV furosemide to increase magnesium excretion', 'Continue the infusion and give oxygen by mask'],
        'Loss of reflexes appears first (serum Mg about 7–10 mEq/L), followed by respiratory depression and then cardiac arrest at higher levels. Magnesium is excreted by the kidneys, so oliguria (< 25–30 mL/h) predisposes to toxicity. With absent reflexes and respiratory depression, the infusion is stopped immediately and calcium gluconate (1 g IV slowly) is given as the antidote, with respiratory support as needed and serum magnesium checked. Monitoring before each dose: patellar reflex present, respiratory rate above 12–16/min, urine output at least 30 mL/h.',
        { reference: "Williams Obstetrics; Goodman & Gilman's", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Obstetrics & Gynaecology', 'Pharmacology'], system: 'Reproductive & Obstetrics', tags: ['magnesium-toxicity', 'antidote', 'pre-eclampsia'] }),
      q('obg-104',
        'A woman has a postpartum haemorrhage of 1,200 mL after a vaginal delivery 40 minutes ago, due to uterine atony. Uterine massage and oxytocin are under way. Which additional drug, given within 3 hours of birth, has been shown to reduce death from bleeding?',
        ['Tranexamic acid', 'Methylergometrine', 'Misoprostol', 'Carboprost'],
        'In the WOMAN trial, tranexamic acid 1 g IV given within 3 hours of birth reduced death from bleeding in PPH; benefit falls with delay and is absent after 3 hours. WHO recommends it for all PPH alongside standard care, regardless of cause. Methylergometrine, misoprostol and carboprost are second-line uterotonics used for atony, but none has been shown to reduce mortality in this way.',
        { reference: 'WHO recommendation on tranexamic acid for PPH (2017); WOMAN trial', difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Obstetrics & Gynaecology', 'Pharmacology'], system: 'Reproductive & Obstetrics', tags: ['pph', 'tranexamic-acid'] }),
      q('obg-105',
        'A 28-year-old with 6 weeks’ amenorrhoea has mild pelvic pain. She is haemodynamically stable. Serum β-hCG is 2,500 IU/L; transvaginal ultrasound shows an empty uterus and a 3-cm unruptured right adnexal mass with no fetal cardiac activity and no free fluid. She will be able to attend follow-up. What is the most appropriate management?',
        ['Single-dose intramuscular methotrexate', 'Immediate laparotomy and salpingectomy', 'Repeat β-hCG in 2 weeks without treatment', 'Dilatation and curettage'],
        'She meets criteria for medical management of tubal ectopic pregnancy: haemodynamically stable, unruptured, mass under about 3.5 cm, no fetal cardiac activity, β-hCG under 5,000 IU/L, and reliable follow-up. Methotrexate (a folate antagonist) stops trophoblast proliferation; β-hCG is checked on days 4 and 7 and should fall by at least 15%. Surgery is for rupture, instability or failed medical treatment. With a β-hCG of 2,500, expectant management is less suitable, and a 2-week gap is unsafe.',
        { reference: "Williams Obstetrics; RCOG Green-top Guideline 21", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Obstetrics & Gynaecology', 'Pharmacology'], system: 'Reproductive & Obstetrics', tags: ['ectopic-pregnancy', 'methotrexate'] }),
    ],
    'gynecology-menstrual-reproductive': [
      q('obg-106',
        'A 27-year-old with polycystic ovary syndrome has been trying to conceive for 2 years. She has oligo-ovulation, BMI 27 kg/m², a normal semen analysis in her partner and patent tubes. What is the recommended first-line drug for ovulation induction?',
        ['Letrozole', 'Clomiphene citrate', 'Metformin alone', 'Gonadotropin injections'],
        'Current international PCOS guidelines recommend letrozole, an aromatase inhibitor, as first-line ovulation induction: it gives higher ovulation and live-birth rates than clomiphene, with fewer multiple pregnancies and no anti-oestrogenic effect on the endometrium. Clomiphene is the alternative. Metformin alone is less effective for fertility, and gonadotropins or laparoscopic ovarian drilling are second-line.',
        { reference: 'International Evidence-based Guideline for PCOS (2023)', difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Obstetrics & Gynaecology', 'Pharmacology'], system: 'Reproductive & Obstetrics', tags: ['pcos', 'infertility', 'ovulation-induction'] }),
      q('obg-107',
        'A 30-year-old woman who has migraine with aura asks for contraception. Which method is contraindicated?',
        ['Combined oral contraceptive pill', 'Levonorgestrel intrauterine system', 'Copper intrauterine device', 'Progestogen-only pill'],
        'Migraine with aura is WHO Medical Eligibility Criteria category 4 (unacceptable risk) for combined hormonal contraception, because oestrogen further raises the already increased risk of ischaemic stroke. Progestogen-only methods (pill, implant, injectable, LNG-IUS) and the copper IUD are suitable.',
        { reference: 'WHO Medical Eligibility Criteria for Contraceptive Use', difficulty: 'Medium', type: 'clinical-case', system: 'Reproductive & Obstetrics', tags: ['contraception', 'mec'] }),
      q('obg-109',
        'Under India’s operational guidelines for population-based screening of common cancers, which approach is recommended for cervical cancer?',
        ["VIA for women aged 30–65 years, every 5 years", "Annual Pap smear for all women from age 21", "HPV DNA testing for all women from age 18", "Colposcopy once for every woman at age 40"],
        'India’s national guidelines for population-based screening (under the NPCDCS, now NP-NCD) use VIA by trained health workers for women aged 30–65 at 5-year intervals, chosen because it is low-cost, gives an immediate result and allows "screen and treat". HPV-based screening is the WHO-preferred method where resources allow, but annual Pap smears from 21 and HPV testing from 18 are not the national approach, and colposcopy is a diagnostic follow-up test.',
        { reference: 'MoHFW Operational Guidelines: Prevention, Screening and Control of Common NCDs', difficulty: 'Medium', type: 'standard', integratedSubjects: ['Obstetrics & Gynaecology', 'Community Medicine'], system: 'Reproductive & Obstetrics', tags: ['cervical-cancer', 'screening', 'national-programme'] }),
    ],
  },
}

// ============================================================================ PEDIATRICS
const peds: BatchAdditions = {
  addTo: {
    neonatology: [
      q('peds-101',
        'A term newborn is apnoeic at birth. After initial steps, positive-pressure ventilation is given; after 30 seconds of ventilation that moves the chest, the heart rate is 50/min. What is the next step?',
        ["Chest compressions (3:1 with ventilation) and 100% oxygen", "IV adrenaline immediately, before any compressions", "Continue positive-pressure ventilation alone for 2 minutes", "Stop ventilation and give compressions at a 30:2 ratio"],
        'Neonatal resuscitation guidelines: if the heart rate stays below 60/min despite 30 seconds of effective ventilation (ideally through an airway such as an endotracheal tube), start chest compressions at 3 compressions to 1 breath (90 compressions + 30 breaths a minute) and increase oxygen to 100%. Adrenaline is given if the heart rate stays below 60 after 60 seconds of good compressions. A 30:2 ratio is for adult and child CPR, not newborns, in whom asphyxia is the usual cause.',
        { reference: 'Neonatal Resuscitation Program (NRP) / Navjaat Shishu Suraksha Karyakram', difficulty: 'Hard', type: 'clinical-case', system: 'Paediatrics', tags: ['neonatal-resuscitation', 'nrp'] }),
      q('peds-102',
        'A 3-week-old breastfed infant has persistent jaundice, pale clay-coloured stools and dark urine. Total bilirubin 7 mg/dL with direct bilirubin 4.5 mg/dL. What is the most appropriate next step?',
        ["Urgent work-up for biliary atresia", "Reassure: this is breast-milk jaundice", "Stop breastfeeding for 48 hours and recheck", "Phototherapy and review after 1 week"],
        'Conjugated hyperbilirubinaemia (direct bilirubin over 1 mg/dL when total is under 5, or over 20% of total) is never physiological. Pale stools and dark urine point to biliary obstruction, and biliary atresia must be excluded urgently: outcome of Kasai portoenterostomy is best when it is done before about 60 days of age. Breast-milk jaundice is UNconjugated, with normal stools. Phototherapy does not treat conjugated jaundice and can cause "bronze baby" syndrome.',
        { reference: "Nelson Textbook of Pediatrics; OP Ghai Essential Pediatrics", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Pediatrics', 'Surgery'], system: 'Paediatrics', tags: ['neonatal-jaundice', 'biliary-atresia', 'conjugated-hyperbilirubinaemia'], clinicalPearl: 'Any jaundice beyond 2 weeks: check the direct bilirubin and look at the stools.' }),
    ],
    'growth-development-immunization': [
      q('peds-105',
        'An infant is brought for the 14-week visit under India’s Universal Immunization Programme. Which vaccine is NOT due at this visit?',
        ['Measles–rubella (MR)', 'Pentavalent vaccine, third dose', 'Fractional IPV, second dose', 'Rotavirus vaccine, third dose'],
        'At 14 weeks the UIP schedule gives OPV-3, Pentavalent-3, fIPV-2, Rotavirus-3 and PCV-2. The first MR dose is given at 9–12 months, with the second at 16–24 months.',
        { reference: 'MoHFW Universal Immunization Programme schedule', difficulty: 'Medium', type: 'standard', integratedSubjects: ['Pediatrics', 'Community Medicine'], system: 'Paediatrics', tags: ['immunization', 'uip'] }),
      q('peds-106',
        'A child can ride a tricycle, copy a circle, and state their age and sex, but cannot yet copy a cross. What is the most likely developmental age?',
        ['3 years', '2 years', '4 years', '5 years'],
        'Riding a tricycle, copying a circle and knowing age and sex are 3-year milestones. Copying a cross (+) comes at about 4 years, a square at about 4½ and a triangle at about 5. At 2 years a child copies a vertical line, kicks a ball and joins two words.',
        { reference: 'OP Ghai Essential Pediatrics; Nelson Textbook of Pediatrics', difficulty: 'Medium', type: 'standard', system: 'Paediatrics', tags: ['developmental-milestones'] }),
      q('peds-108',
        'A child with Down syndrome has the karyotype 46,XX,t(14;21). What is the most important next step for counselling the family?',
        ['Karyotype both parents', 'No further testing; recurrence risk depends only on maternal age', 'Prenatal amniocentesis in the next pregnancy only', 'FISH for trisomy 21 on the child’s cells'],
        'This child has translocation Down syndrome (a Robertsonian translocation, so 46 chromosomes). About a quarter of cases are inherited from a parent who carries a balanced translocation, and recurrence risk is then much higher than the age-related risk of standard trisomy 21 (about 10–15% if the mother carries it, lower if the father does). Parental karyotyping is therefore essential. The child’s diagnosis is already established, so FISH adds nothing.',
        { reference: "Nelson Textbook of Pediatrics; Thompson & Thompson Genetics in Medicine", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Pediatrics', 'Biochemistry'], system: 'Paediatrics', tags: ['down-syndrome', 'robertsonian-translocation', 'genetic-counselling'] }),
    ],
    'pediatric-infections-nutrition': [
      q('peds-104',
        'A 3-year-old has had fever for 6 days with bilateral non-purulent conjunctival injection, red cracked lips, a strawberry tongue, a polymorphous rash, oedema of the hands and feet and a unilateral 2-cm cervical lymph node. What is the most appropriate treatment?',
        ['IV immunoglobulin with aspirin', 'IV ceftriaxone', 'Oral prednisolone alone', 'Supportive care and antipyretics only'],
        'Fever for 5 days or more with at least four of the five principal features (conjunctivitis, oral changes, rash, extremity changes, cervical lymphadenopathy) is Kawasaki disease. IVIG (2 g/kg) given within 10 days of fever onset, with aspirin, reduces the risk of coronary artery aneurysms from about 25% to under 5%. Echocardiography is done at diagnosis and follow-up. Corticosteroids are added only for high-risk or IVIG-resistant disease.',
        { reference: "Nelson Textbook of Pediatrics; AHA Kawasaki Disease Statement", difficulty: 'Hard', type: 'clinical-case', system: 'Cardiovascular', tags: ['kawasaki-disease', 'vasculitis', 'coronary-aneurysm'] }),
      q('peds-107',
        'An 18-month-old has profuse watery diarrhoea. He is lethargic and unable to drink, with sunken eyes and a skin pinch that goes back very slowly. Following WHO Plan C, how should IV Ringer’s lactate be given?',
        ['30 mL/kg over 30 minutes, then 70 mL/kg over 2½ hours', '30 mL/kg over 1 hour, then 70 mL/kg over 5 hours', 'ORS 75 mL/kg over 4 hours', '20 mL/kg bolus, then maintenance fluids'],
        'Two or more of lethargy, inability to drink, sunken eyes and a very slow skin pinch indicate severe dehydration, managed with WHO Plan C: 100 mL/kg Ringer’s lactate (or normal saline). Children aged 12 months or older receive 30 mL/kg in 30 minutes and then 70 mL/kg over 2½ hours; infants under 12 months receive the same volumes over 1 hour and 5 hours. ORS 75 mL/kg over 4 hours is Plan B for some dehydration. The child is reassessed frequently and starts ORS as soon as he can drink.',
        { reference: 'WHO Treatment of Diarrhoea manual; IMNCI', difficulty: 'Expert', type: 'clinical-case', integratedSubjects: ['Pediatrics', 'Community Medicine'], system: 'Paediatrics', tags: ['dehydration', 'plan-c', 'fluids', 'calculation'] }),
      q('peds-109',
        'A 4-year-old has periorbital and pedal oedema. Urine protein is 3+ with no haematuria; BP and complement levels are normal; serum albumin is 1.8 g/dL. What is the most appropriate initial management?',
        ['Oral prednisolone without a renal biopsy', 'Renal biopsy before any treatment', 'Oral cyclophosphamide as first-line therapy', 'IV albumin and furosemide alone'],
        'A young child with nephrotic syndrome and no haematuria, hypertension, renal impairment or low complement most likely has minimal change disease, which is usually steroid-sensitive. Treatment starts with prednisolone (2 mg/kg/day, maximum 60 mg, for 6 weeks, then alternate-day therapy for 6 weeks per ISPN) without biopsy. Biopsy is reserved for atypical features or steroid resistance. Albumin with furosemide is only for symptomatic, refractory oedema.',
        { reference: 'Indian Society of Pediatric Nephrology guidelines; Nelson Textbook of Pediatrics', difficulty: 'Medium', type: 'clinical-case', integratedSubjects: ['Pediatrics', 'Pathology'], system: 'Renal', tags: ['nephrotic-syndrome', 'minimal-change-disease'] }),
    ],
  },
  newTopics: [
    {
      id: 'pediatric-cardiology',
      name: 'Pediatric Cardiology & Emergencies',
      description: 'Congenital heart disease and paediatric emergencies.',
      questions: [
        q('peds-103',
          'An 18-month-old with tetralogy of Fallot becomes irritable and deeply cyanosed after crying, with rapid breathing; the murmur becomes softer. What is the first step in management?',
          ["Knee–chest position and oxygen", "IV digoxin to improve contractility", "IV furosemide to reduce pulmonary oedema", "Start a prostaglandin E1 infusion"],
          'This is a hypercyanotic ("tet") spell: increased right-ventricular outflow obstruction and/or reduced systemic vascular resistance drive more right-to-left shunting, so less blood reaches the lungs and the murmur softens. The knee–chest position raises systemic vascular resistance and reduces the shunt; oxygen, morphine, IV fluids, propranolol and phenylephrine follow if needed. Digoxin and diuretics do not help, and prostaglandin is for duct-dependent neonates.',
          { reference: "Nelson Textbook of Pediatrics", difficulty: 'Medium', type: 'clinical-case', integratedSubjects: ['Pediatrics', 'Physiology'], system: 'Cardiovascular', tags: ['tetralogy-of-fallot', 'cyanotic-spell', 'chd'] }),
      ],
    },
  ],
}

// ============================================================================ ORTHOPEDICS
const ortho: BatchAdditions = {
  addTo: {
    'fractures-trauma': [
      q('ortho-101',
        'After a supracondylar fracture of the humerus, a 7-year-old cannot make an "OK" sign: the tips of the thumb and index finger cannot flex, so the pinch is flat. Sensation over the hand is normal. Which nerve is injured?',
        ['Anterior interosseous nerve', 'Radial nerve', 'Ulnar nerve', 'Musculocutaneous nerve'],
        'The anterior interosseous nerve, a purely motor branch of the median nerve, supplies flexor pollicis longus, the lateral half of flexor digitorum profundus (index and middle) and pronator quadratus. Injury abolishes flexion of the thumb IP and index DIP joints (a flat pinch) without sensory loss. It is the nerve most often injured in extension-type supracondylar fractures. Radial nerve injury causes wrist drop, and ulnar nerve injury causes intrinsic weakness and sensory loss over the little finger.',
        { reference: "Apley & Solomon's System of Orthopaedics and Trauma; Snell's Clinical Anatomy", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Orthopedics', 'Anatomy'], system: 'Musculoskeletal', tags: ['supracondylar-fracture', 'nerve-injury', 'anterior-interosseous'] }),
      q('ortho-102',
        'After a car crash in which his knee struck the dashboard, a man’s right hip is flexed, adducted and internally rotated, and the leg looks shortened. Which nerve is most at risk?',
        ['Sciatic nerve', 'Femoral nerve', 'Obturator nerve', 'Superior gluteal nerve'],
        'A dashboard injury drives the femoral head backwards: posterior hip dislocation, with the limb flexed, adducted, internally rotated and shortened. The sciatic nerve (usually its common peroneal division) lies directly behind the joint and is injured in about 10–20% of cases. Urgent reduction within about 6 hours also reduces the risk of avascular necrosis. Anterior dislocation holds the hip abducted and externally rotated and can injure the femoral nerve or vessels.',
        { reference: "Apley & Solomon's System of Orthopaedics and Trauma", difficulty: 'Medium', type: 'clinical-case', integratedSubjects: ['Orthopedics', 'Anatomy'], system: 'Musculoskeletal', tags: ['hip-dislocation', 'sciatic-nerve'] }),
      q('ortho-103',
        'A 22-year-old fell on his outstretched hand and has tenderness in the anatomical snuffbox. Initial scaphoid X-ray views show no fracture. What is the most appropriate management?',
        ["Immobilise, then MRI or repeat X-rays at 10–14 days", "Reassure: a normal X-ray excludes a scaphoid fracture", "Crepe bandage; review only if pain persists at 6 weeks", "Immediate open reduction and internal fixation"],
        'Scaphoid fractures are often invisible on initial X-rays. Missing one risks non-union and avascular necrosis of the proximal pole, because the blood supply enters distally and flows backwards (retrograde). Suspected fractures are therefore immobilised and imaged further: MRI is the most sensitive early test, or X-rays are repeated after 10–14 days. Fixation is for confirmed displaced or proximal-pole fractures.',
        { reference: "Apley & Solomon's System of Orthopaedics and Trauma; NICE fracture guidance", difficulty: 'Hard', type: 'clinical-case', integratedSubjects: ['Orthopedics', 'Anatomy'], system: 'Musculoskeletal', tags: ['scaphoid-fracture', 'avascular-necrosis'] }),
      q('ortho-106',
        'Six hours after closed fixation of a tibial shaft fracture, a man has pain out of proportion to the injury that worsens on passive stretch of the toes. Diastolic BP is 70 mmHg and anterior-compartment pressure is 55 mmHg. What is the most appropriate management?',
        ['Urgent fasciotomy of all four leg compartments', 'Elevate the limb above heart level and observe', 'Split the cast and recheck in 24 hours', 'Increase analgesia and repeat pressures tomorrow'],
        'Pain out of proportion to the injury and pain on passive stretch are the earliest signs of acute compartment syndrome; pulses are often still present. The perfusion gradient (ΔP = diastolic BP − compartment pressure) here is 70 − 55 = 15 mmHg; a ΔP below 30 mmHg indicates inadequate perfusion and the need for urgent fasciotomy. In the leg all four compartments are released, usually through two incisions. Elevation above heart level reduces perfusion pressure and is avoided, and delay leads to muscle necrosis and Volkmann-type contracture.',
        { reference: "Apley & Solomon's System of Orthopaedics and Trauma; BOAST guidance", difficulty: 'Hard', type: 'clinical-case', system: 'Musculoskeletal', tags: ['compartment-syndrome', 'fasciotomy', 'calculation'], clinicalPearl: 'Fasciotomy when ΔP (diastolic − compartment pressure) < 30 mmHg.' }),
    ],
  },
  newTopics: [
    {
      id: 'bone-tumours-paediatric-ortho',
      name: 'Bone Tumours & Paediatric Orthopaedics',
      description: 'Bone tumours, SCFE, Perthes and paediatric hip problems.',
      questions: [
        q('ortho-104',
          'A 25-year-old woman has knee pain. X-ray shows an eccentric, lytic, expansile "soap-bubble" lesion in the distal femoral epiphysis extending up to the subchondral bone, with a narrow zone of transition and no periosteal reaction. What is the most likely diagnosis?',
          ["Giant cell tumour", "Osteosarcoma (metaphyseal)", "Ewing sarcoma (diaphyseal)", "Simple (unicameral) bone cyst"],
          'An eccentric lytic lesion in the epiphysis (extending to the subchondral bone) of a skeletally mature young adult, typically around the knee, is classic for giant cell tumour. It is locally aggressive, recurs after curettage and occasionally metastasises to the lungs; denosumab targets its RANKL-driven osteoclast-like giant cells. Osteosarcoma is metaphyseal with sunburst periosteal reaction, Ewing sarcoma is diaphyseal with onion-skin reaction in children, and a simple bone cyst is central and metaphyseal in children.',
          { reference: "Apley & Solomon's; Robbins & Cotran", difficulty: 'Medium', type: 'clinical-case', integratedSubjects: ['Orthopedics', 'Pathology'], system: 'Musculoskeletal', tags: ['giant-cell-tumour', 'bone-tumour'] }),
        q('ortho-105',
          'A 14-year-old boy has progressive pain and swelling above the knee. X-ray shows a destructive metaphyseal lesion of the distal femur with a sunburst periosteal reaction and a Codman triangle. Where does this tumour most commonly metastasise?',
          ['Lungs', 'Liver', 'Regional lymph nodes', 'Brain'],
          'A metaphyseal tumour of the distal femur or proximal tibia in an adolescent with sunburst periosteal reaction and a Codman triangle is osteosarcoma. It spreads by the blood, most often to the lungs, so staging includes CT of the chest. Lymph node spread is uncommon in sarcomas. Treatment is neoadjuvant chemotherapy, limb-salvage surgery and adjuvant chemotherapy.',
          { reference: "Apley & Solomon's; Robbins & Cotran", difficulty: 'Medium', type: 'clinical-case', integratedSubjects: ['Orthopedics', 'Pathology'], system: 'Musculoskeletal', tags: ['osteosarcoma', 'metastasis'] }),
        q('ortho-107',
          'An obese 13-year-old boy has a 3-week limp with pain referred to the knee. When the left hip is flexed it rolls into external rotation, and internal rotation is reduced. A frog-leg lateral X-ray shows the left femoral epiphysis displaced posteriorly and inferiorly. What is the treatment?',
          ['In-situ fixation with a single cannulated screw', 'Forceful closed manipulation and hip spica', 'Traction and bed rest for 6 weeks', 'Observation with weight reduction alone'],
          'Slipped capital femoral epiphysis typically affects obese adolescent boys; hip pathology often presents with knee pain, and obligatory external rotation on hip flexion is characteristic. Treatment is in-situ fixation with a cannulated screw to stop further slip; forceful reduction is avoided because it raises the risk of avascular necrosis. The other hip is assessed and may be fixed prophylactically. Perthes disease affects younger children (4–8 years).',
          { reference: "Apley & Solomon's System of Orthopaedics and Trauma", difficulty: 'Hard', type: 'clinical-case', system: 'Musculoskeletal', tags: ['scfe', 'paediatric-hip'] }),
      ],
    },
  ],
}

export const batch2: Partial<Record<SubjectSlug, BatchAdditions>> = {
  surgery,
  obg,
  pediatrics: peds,
  orthopedics: ortho,
}
