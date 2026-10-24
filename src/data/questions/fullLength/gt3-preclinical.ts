import { r, type ReservedEntry } from './helpers'

/**
 * Grand Test 3 — Anatomy, Physiology, Biochemistry (32 questions).
 * Original questions. Correct answer is written first; display order is randomised.
 */

const GRAYS = "Gray's Anatomy for Students; BD Chaurasia's Human Anatomy"
const GUYTON = 'Guyton & Hall Textbook of Medical Physiology'
const HARPER = "Harper's Illustrated Biochemistry; Lippincott Illustrated Reviews: Biochemistry"

export const gt3Preclinical: ReservedEntry[] = [
  // ============================================================== ANATOMY (12)
  r('anatomy', 'upper-limb-thorax', 'gt3-anat-01',
    'A 68-year-old woman falls on an outstretched hand. X-ray shows a fracture through the surgical neck of the humerus. Two weeks later she cannot lift her arm sideways beyond about 15°, although she can start the movement. Which additional finding is most likely?',
    ['Loss of sensation over the lower half of the deltoid', 'Loss of sensation over the medial side of the arm', 'Winging of the scapula on pushing against a wall', 'Weakness of elbow flexion with loss of sensation on the lateral forearm'],
    'The axillary nerve winds round the surgical neck of the humerus with the posterior circumflex humeral artery and is the nerve at risk. It supplies deltoid and teres minor and, through the upper lateral cutaneous nerve of the arm, the skin over the lower deltoid ("regimental badge" area). Supraspinatus (suprascapular nerve) still initiates abduction, which is why the first ~15° are preserved. Medial arm sensation is the medial cutaneous nerve of arm/intercostobrachial; winging is long thoracic nerve; elbow flexion with lateral forearm loss is musculocutaneous.',
    { difficulty: 'Medium', type: 'clinical-case', reference: GRAYS, system: 'Musculoskeletal', tags: ['axillary-nerve', 'humerus-fracture', 'brachial-plexus'] }),

  r('anatomy', 'upper-limb-thorax', 'gt3-anat-02',
    'A 30-year-old man has a transverse fracture of the mid-shaft of the humerus. He has wrist drop and numbness over the dorsum of the first web space. Which movement is most likely to be preserved, and why?',
    ['Elbow extension, because the branches to triceps leave the radial nerve proximal to the spiral groove', 'Wrist extension, because extensor carpi radialis longus is supplied by the posterior interosseous nerve', 'Finger extension at the metacarpophalangeal joints, because it is done by the interossei', 'Supination of the flexed forearm, because supinator is supplied by the median nerve'],
    'In the spiral (radial) groove the radial nerve has already given most of its branches to triceps in the axilla and upper arm, so elbow extension is usually spared while wrist and MCP extension are lost. Extensor carpi radialis longus (and brachioradialis) are supplied by the radial nerve itself above the elbow — not the posterior interosseous nerve — so they are paralysed in a mid-shaft injury. The interossei extend the interphalangeal joints, not the MCP joints. Supinator is a radial (posterior interosseous) muscle; biceps still supinates the flexed forearm via the musculocutaneous nerve.',
    { difficulty: 'Hard', type: 'clinical-case', reference: GRAYS, system: 'Musculoskeletal', tags: ['radial-nerve', 'spiral-groove', 'wrist-drop'] }),

  r('anatomy', 'upper-limb-thorax', 'gt3-anat-03',
    'A carpenter cuts the medial side of the front of his wrist with a chisel. Clawing of the ring and little fingers is more obvious than in his colleague who has an ulnar nerve injury at the elbow. What explains this difference?',
    ['In the wrist lesion, the ulnar half of flexor digitorum profundus still works', 'In the wrist lesion, the lumbricals to the index and middle fingers are also paralysed', 'In the elbow lesion, the extensors of the fingers are weakened, reducing MCP hyperextension', 'In the elbow lesion, flexor digitorum superficialis is paralysed, so the PIP joints cannot flex'],
    'This is the "ulnar paradox". Clawing = MCP hyperextension (unopposed long extensors, paralysed lumbricals 3–4 and interossei) plus IP flexion by the long flexors. In a proximal (elbow) lesion the ulnar half of flexor digitorum profundus is also paralysed, so DIP flexion — and therefore the claw — is less marked. At the wrist FDP is spared and pulls the fingers into flexion. Lumbricals 1–2 are median-supplied; finger extensors are radial; FDS is median-supplied and is not affected by an ulnar lesion at any level.',
    { difficulty: 'Expert', type: 'clinical-case', reference: GRAYS, system: 'Musculoskeletal', tags: ['ulnar-nerve', 'ulnar-paradox', 'claw-hand'] }),

  r('anatomy', 'upper-limb-thorax', 'gt3-anat-04',
    'An intercostal chest drain is to be inserted in the fifth intercostal space in the mid-axillary line. Why is the needle and tube passed just above the upper border of the sixth rib?',
    ['The intercostal vessels and nerve run in the costal groove under the rib above', 'The neurovascular bundle runs along the upper border of each rib, deep to the external intercostal muscle', 'The pleura is thinnest immediately above each rib', 'The long thoracic nerve lies along the lower border of each rib in the mid-axillary line'],
    'The intercostal neurovascular bundle (vein, artery, nerve from above down — "VAN") lies in the costal groove on the inferior border of each rib, in the plane between the internal and innermost intercostal muscles. Passing instruments over the upper border of the rib below avoids it. Collateral branches run along the upper border of the lower rib, but they are small. The long thoracic nerve runs vertically on the surface of serratus anterior, not in the intercostal space.',
    { difficulty: 'Medium', type: 'standard', reference: GRAYS, system: 'Respiratory', tags: ['intercostal-space', 'chest-drain', 'thorax'] }),

  r('anatomy', 'abdomen-pelvis', 'gt3-anat-05',
    'A 55-year-old man on long-term NSAIDs presents with haematemesis and shock. Endoscopy shows a deep ulcer on the posterior wall of the first part of the duodenum with a visible vessel. Which artery is most likely bleeding?',
    ['Gastroduodenal artery', 'Left gastric artery', 'Superior mesenteric artery', 'Splenic artery'],
    'The gastroduodenal artery (from the common hepatic artery) runs directly behind the first part of the duodenum, so posterior duodenal bulb ulcers erode into it and cause major bleeding. Lesser-curve gastric ulcers bleed from the left gastric artery; posterior gastric ulcers can erode the splenic artery. The superior mesenteric artery passes in front of the third part of the duodenum.',
    { difficulty: 'Medium', type: 'clinical-case', reference: GRAYS, integratedSubjects: ['Anatomy', 'Surgery'], system: 'Gastrointestinal', tags: ['duodenal-ulcer', 'upper-gi-bleed', 'gastroduodenal-artery'] }),

  r('anatomy', 'abdomen-pelvis', 'gt3-anat-06',
    'During laparoscopic repair of a groin hernia, the hernial defect is seen medial to the inferior epigastric vessels, within the area bounded by these vessels, the lateral border of rectus abdominis and the inguinal ligament. Which statement about this hernia is correct?',
    ['It is a direct inguinal hernia that pushes through a weak transversalis fascia and rarely strangulates', 'It is an indirect inguinal hernia that passes through the deep inguinal ring', 'It is a femoral hernia that passes below the inguinal ligament', 'It is a direct hernia that typically descends into the scrotum within the spermatic cord'],
    'The triangle described is Hesselbach\'s (inguinal) triangle. A hernia through it, medial to the inferior epigastric vessels, is direct: it bulges through the posterior wall (transversalis fascia), has a wide neck and seldom strangulates. Indirect hernias enter the deep ring lateral to the inferior epigastric vessels and can travel within the cord to the scrotum. Femoral hernias pass below the inguinal ligament, lateral to the lacunar ligament.',
    { difficulty: 'Medium', type: 'standard', reference: GRAYS, integratedSubjects: ['Anatomy', 'Surgery'], system: 'Gastrointestinal', tags: ['inguinal-hernia', 'hesselbach-triangle'] }),

  r('anatomy', 'abdomen-pelvis', 'gt3-anat-07',
    'After a difficult abdominal hysterectomy for a large fibroid, a woman develops left flank pain and fever, and later a watery vaginal discharge. Where is the injured structure most likely to have been damaged?',
    ['About 1.5–2 cm lateral to the supravaginal cervix, where the ureter passes below the uterine artery', 'At the pelvic brim, where the ureter crosses the bifurcation of the common iliac artery', 'Within the ovarian fossa, where the ureter lies in front of the ovary', 'At the trigone, where the ureter enters the bladder anterior to the vagina'],
    'The ureter runs in the base of the broad ligament and passes beneath the uterine artery ("water under the bridge") about 1.5–2 cm lateral to the cervix; clamping the uterine pedicle here is the classic site of injury, leading to obstruction (flank pain, fever) or a ureterovaginal fistula. At the pelvic brim the ureter crosses the common/external iliac bifurcation and is at risk when the infundibulopelvic (ovarian) ligament is clamped, but the ureter lies behind the ovarian fossa, not in front of the ovary.',
    { difficulty: 'Hard', type: 'clinical-case', reference: GRAYS, integratedSubjects: ['Anatomy', 'Obstetrics & Gynecology'], system: 'Renal & urinary', tags: ['ureter', 'hysterectomy', 'iatrogenic-injury'] }),

  r('anatomy', 'abdomen-pelvis', 'gt3-anat-08',
    'For a transvaginal pudendal nerve block during an instrumental delivery, which bony landmark is palpated to guide the needle?',
    ['Ischial spine', 'Ischial tuberosity', 'Sacral promontory', 'Pubic symphysis'],
    'The pudendal nerve leaves the pelvis through the greater sciatic foramen, crosses the sacrospinous ligament just medial to the ischial spine, and re-enters the perineum through the lesser sciatic foramen to run in the pudendal (Alcock\'s) canal. The ischial spine is felt vaginally and the local anaesthetic is injected just medial and posterior to it. The ischial tuberosity is a landmark for the transperineal approach, not the transvaginal one.',
    { difficulty: 'Medium', type: 'standard', reference: GRAYS, integratedSubjects: ['Anatomy', 'Obstetrics & Gynecology'], system: 'Reproductive', tags: ['pudendal-nerve', 'nerve-block', 'pelvis'] }),

  r('anatomy', 'head-neck-neuro', 'gt3-anat-09',
    'A 62-year-old hypertensive man has sudden vertigo, hoarseness and difficulty swallowing. Examination shows a drooping left eyelid with a small left pupil, reduced pain and temperature sensation on the left side of the face and the right side of the body, and left limb ataxia. Which finding would NOT be expected from this lesion?',
    ['Tongue deviation to the left', 'Loss of the left gag reflex', 'Nystagmus on lateral gaze', 'Persistent hiccups'],
    'This is lateral medullary (Wallenberg) syndrome, usually from vertebral or posterior inferior cerebellar artery occlusion. It involves the spinal trigeminal nucleus/tract (ipsilateral facial pain–temperature loss), spinothalamic tract (contralateral body), nucleus ambiguus (dysphagia, hoarseness, reduced gag), descending sympathetics (Horner syndrome), vestibular nuclei (vertigo, nystagmus) and inferior cerebellar peduncle (ataxia); hiccups are common. The hypoglossal nucleus and nerve lie medially, so tongue deviation belongs to medial medullary syndrome.',
    { difficulty: 'Expert', type: 'clinical-case', reference: "Gray's Anatomy; Snell's Clinical Neuroanatomy", integratedSubjects: ['Anatomy', 'Medicine'], system: 'Nervous', tags: ['lateral-medullary-syndrome', 'brainstem', 'pica'] }),

  r('anatomy', 'head-neck-neuro', 'gt3-anat-10',
    'A professional singer has a total thyroidectomy. Afterwards her speaking voice is normal and there is no stridor, but she tires quickly and cannot reach high notes. Which muscle has most likely lost its nerve supply?',
    ['Cricothyroid', 'Posterior cricoarytenoid', 'Lateral cricoarytenoid', 'Thyroarytenoid'],
    'The external branch of the superior laryngeal nerve runs with the superior thyroid artery and is at risk when the upper pole is ligated. It supplies cricothyroid, which tilts the thyroid cartilage forward to tense the vocal folds for high pitch, so injury causes voice fatigue and loss of the upper register. All the other intrinsic muscles are supplied by the recurrent laryngeal nerve; injury to it causes hoarseness (unilateral) or stridor (bilateral, as posterior cricoarytenoid is the only abductor).',
    { difficulty: 'Hard', type: 'clinical-case', reference: GRAYS, integratedSubjects: ['Anatomy', 'Surgery'], system: 'Endocrine', tags: ['superior-laryngeal-nerve', 'thyroidectomy', 'larynx'] }),

  r('anatomy', 'embryology-lower-limb', 'gt3-anat-11',
    'A 2-year-old boy has painless passage of maroon-coloured stools. A technetium-99m pertechnetate scan shows a focus of uptake in the right lower abdomen. The lesion is a remnant of which structure?',
    ['Vitello-intestinal duct', 'Allantoic diverticulum', 'Urachus', 'Ductus venosus remnant'],
    'Meckel\'s diverticulum is a persistent proximal part of the vitello-intestinal duct on the antimesenteric border of the ileum (classically ~2 feet from the ileocaecal valve, ~2 inches long, in ~2% of people). Ectopic gastric mucosa secretes acid and ulcerates adjacent ileum, causing painless bleeding in young children; pertechnetate is taken up by the gastric mucosa. The allantois becomes the urachus (median umbilical ligament); a patent urachus leaks urine at the umbilicus. The ductus venosus becomes the ligamentum venosum.',
    { difficulty: 'Medium', type: 'clinical-case', reference: "Langman's Medical Embryology", integratedSubjects: ['Anatomy', 'Pediatrics'], system: 'Gastrointestinal', tags: ['meckel-diverticulum', 'embryology', 'vitelline-duct'] }),

  r('anatomy', 'embryology-lower-limb', 'gt3-anat-12',
    'A footballer develops severe pain in the front of his leg after a kick. Examination shows weak dorsiflexion of the ankle and great toe, normal eversion of the foot, and sensory loss confined to the adjacent sides of the first and second toes. Which nerve is affected?',
    ['Deep peroneal (fibular) nerve', 'Common peroneal (fibular) nerve', 'Superficial peroneal (fibular) nerve', 'Tibial nerve'],
    'The deep peroneal nerve supplies the anterior compartment (tibialis anterior, extensor hallucis longus, extensor digitorum longus) and the skin of the first web space only. It is classically compressed in an anterior compartment syndrome. A common peroneal lesion (e.g., fibular neck) would also paralyse peroneus longus and brevis (eversion, via the superficial peroneal nerve) and cause sensory loss over the lateral leg and most of the dorsum of the foot. The tibial nerve supplies plantarflexors and the sole.',
    { difficulty: 'Hard', type: 'clinical-case', reference: GRAYS, integratedSubjects: ['Anatomy', 'Orthopedics'], system: 'Musculoskeletal', tags: ['deep-peroneal-nerve', 'compartment-syndrome', 'lower-limb'] }),

  // ============================================================== PHYSIOLOGY (10)
  r('physiology', 'cvs-resp', 'gt3-phys-01',
    'A family is brought in drowsy and with headache after using a charcoal heater in a closed room. A pulse oximeter on the father reads 98%. Which arterial blood measurement is most likely to be normal?',
    ['Partial pressure of oxygen (PaO2)', 'Oxygen content of arterial blood', 'Oxygen saturation measured by co-oximetry', 'Oxygen delivery to tissues'],
    'Carbon monoxide binds haemoglobin ~200–250 times more avidly than oxygen, forming carboxyhaemoglobin. It lowers oxygen content and true saturation, and shifts the dissociation curve to the left so the remaining oxygen is released less readily — tissue oxygen delivery falls. Dissolved oxygen, and therefore PaO2, is unaffected. Standard two-wavelength pulse oximeters read carboxyhaemoglobin as oxyhaemoglobin and give a falsely normal SpO2; co-oximetry measures the real saturation and the carboxyhaemoglobin fraction.',
    { difficulty: 'Hard', type: 'clinical-case', reference: GUYTON, integratedSubjects: ['Physiology', 'Forensic Medicine'], system: 'Respiratory', tags: ['carbon-monoxide', 'oxygen-transport', 'pulse-oximetry'] }),

  r('physiology', 'cvs-resp', 'gt3-phys-02',
    'A 24-year-old found unconscious after a heroin overdose is breathing room air at sea level (barometric pressure 760 mmHg). Arterial blood gas: PaO2 48 mmHg, PaCO2 80 mmHg, pH 7.18. Assuming a respiratory quotient of 0.8, what is the main cause of his hypoxaemia?',
    ['Alveolar hypoventilation', 'Ventilation–perfusion mismatch', 'Right-to-left shunt', 'Impaired alveolar diffusion'],
    'Alveolar gas equation: PAO2 = FiO2 × (PB − 47) − PaCO2/0.8 = 0.21 × 713 − 80/0.8 ≈ 150 − 100 = 50 mmHg. The A–a gradient is 50 − 48 = 2 mmHg — normal (<10–15 mmHg in a young adult). Hypoxaemia with a high PaCO2 and a normal A–a gradient means pure hypoventilation (here opioid-induced respiratory depression), which corrects with ventilation. V/Q mismatch, shunt and diffusion defects all widen the A–a gradient; shunt also responds poorly to supplemental oxygen.',
    { difficulty: 'Expert', type: 'clinical-case', reference: GUYTON, integratedSubjects: ['Physiology', 'Medicine'], system: 'Respiratory', tags: ['a-a-gradient', 'alveolar-gas-equation', 'hypoventilation', 'calculation'] }),

  r('physiology', 'cvs-resp', 'gt3-phys-03',
    'A 70-year-old with dizziness has irregular "cannon" a-waves in the jugular venous pulse and a heart rate of 38/min. What produces these waves?',
    ['The right atrium contracting against a closed tricuspid valve', 'Regurgitation of blood into the right atrium during ventricular systole', 'Rapid filling of the right ventricle in early diastole', 'Loss of coordinated atrial contraction'],
    'In complete (third-degree) heart block atria and ventricles beat independently. Whenever atrial systole happens to fall while the ventricle is contracting, the atrium pushes against a closed tricuspid valve and blood surges back into the neck — an irregular cannon a-wave. Tricuspid regurgitation produces large systolic v (cv) waves; rapid early filling is the y descent; loss of atrial contraction, as in atrial fibrillation, abolishes the a-wave altogether.',
    { difficulty: 'Medium', type: 'clinical-case', reference: GUYTON, integratedSubjects: ['Physiology', 'Medicine'], system: 'Cardiovascular', tags: ['jvp', 'complete-heart-block', 'cardiac-cycle'] }),

  r('physiology', 'cvs-resp', 'gt3-phys-04',
    'During a Valsalva manoeuvre with continuous arterial pressure monitoring, which change is seen in phase IV (just after the strain is released) in a person with intact autonomic reflexes?',
    ['An overshoot of blood pressure above baseline with reflex bradycardia', 'A fall in blood pressure with reflex tachycardia', 'A brief rise in blood pressure caused by transmission of the raised intrathoracic pressure', 'No change in blood pressure, with a steady fall in heart rate'],
    'Phase I: intrathoracic pressure rises and is transmitted to the aorta — brief BP rise. Phase II: venous return falls, BP drops, and baroreflex tachycardia and vasoconstriction follow. Phase III: on release, intrathoracic pressure falls — brief BP dip. Phase IV: venous return and cardiac output recover into a still-constricted circulation, so BP overshoots and the baroreflex slows the heart. The phase IV overshoot and bradycardia are absent in autonomic failure and are the basis for vagal manoeuvres in SVT.',
    { difficulty: 'Hard', type: 'standard', reference: GUYTON, system: 'Cardiovascular', tags: ['valsalva', 'baroreceptor-reflex', 'autonomic'] }),

  r('physiology', 'renal-endocrine', 'gt3-phys-05',
    'In a healthy volunteer, inulin clearance is 125 mL/min. A new drug, freely filtered and not protein-bound, has a renal clearance of 580 mL/min at low plasma concentrations. What does this indicate?',
    ['The drug is filtered and also actively secreted by the tubules', 'The drug is filtered and partly reabsorbed', 'The drug is filtered only, with no tubular handling', 'The glomerular filtration rate has risen'],
    'Inulin is freely filtered and neither reabsorbed nor secreted, so its clearance equals GFR. A freely filtered substance with clearance above GFR must also be secreted into the tubule; a clearance approaching renal plasma flow (~600–650 mL/min) means nearly complete removal in one pass, like para-aminohippurate. Clearance below GFR indicates net reabsorption (e.g., glucose, normally zero). GFR is measured by the inulin clearance and is unchanged here.',
    { difficulty: 'Medium', type: 'standard', reference: GUYTON, system: 'Renal & urinary', tags: ['renal-clearance', 'gfr', 'pah'] }),

  r('physiology', 'renal-endocrine', 'gt3-phys-06',
    'A 45-year-old man on lithium for bipolar disorder passes 6 L of dilute urine a day. Plasma sodium is 147 mmol/L. After a water deprivation test, urine osmolality stays low and does not rise after desmopressin. At which step is water reabsorption failing?',
    ['ADH action on collecting-duct principal cells (V2 receptor/aquaporin-2)', 'Synthesis of ADH in the supraoptic and paraventricular nuclei', 'Transport of ADH along the hypothalamo-hypophyseal tract', 'Reabsorption of sodium chloride in the thick ascending limb by NKCC2'],
    'Lack of response to exogenous desmopressin means nephrogenic diabetes insipidus. Lithium enters principal cells through ENaC and impairs V2-receptor/cAMP signalling and aquaporin-2 expression, so ADH cannot insert water channels in the apical membrane. Defects in ADH synthesis or transport cause central DI, which does respond to desmopressin. Blocking NKCC2 (loop diuretics) impairs medullary concentration but is not the mechanism of lithium polyuria.',
    { difficulty: 'Hard', type: 'clinical-case', reference: GUYTON, integratedSubjects: ['Physiology', 'Pharmacology'], system: 'Renal & urinary', tags: ['nephrogenic-di', 'lithium', 'adh', 'aquaporin'] }),

  r('physiology', 'renal-endocrine', 'gt3-phys-07',
    'A 50-year-old woman has renal stones and serum calcium 11.8 mg/dL. Which other set of results best fits primary hyperparathyroidism?',
    ['Low serum phosphate, raised urinary cyclic AMP, raised 1,25-dihydroxyvitamin D', 'High serum phosphate, low urinary cyclic AMP, low 1,25-dihydroxyvitamin D', 'Low serum phosphate, suppressed PTH, low 1,25-dihydroxyvitamin D', 'High serum phosphate, high PTH, low 1,25-dihydroxyvitamin D'],
    'PTH acts through PTH1R/cAMP in the kidney: it inhibits phosphate reabsorption in the proximal tubule (phosphaturia → low serum phosphate, with raised urinary cAMP), increases calcium reabsorption in the distal tubule, and stimulates 1α-hydroxylase, raising calcitriol and intestinal calcium absorption. High phosphate with high PTH and low calcitriol is the pattern of secondary hyperparathyroidism in chronic kidney disease. Suppressed PTH with hypercalcaemia suggests a non-parathyroid cause such as malignancy.',
    { difficulty: 'Medium', type: 'clinical-case', reference: GUYTON, integratedSubjects: ['Physiology', 'Medicine'], system: 'Endocrine', tags: ['pth', 'hypercalcaemia', 'phosphate'] }),

  r('physiology', 'nerve-muscle-cns', 'gt3-phys-08',
    'A 58-year-old smoker has proximal leg weakness, dry mouth and absent knee jerks. Strength and reflexes improve briefly after repeated maximal contraction. Which finding is expected on nerve conduction studies?',
    ['Low-amplitude compound muscle action potentials that increase markedly after high-frequency stimulation or exercise', 'A decrement in amplitude with slow (3 Hz) repetitive stimulation that worsens after exercise', 'Markedly slowed conduction velocity with conduction block', 'Normal studies with fibrillation potentials on electromyography'],
    'Lambert–Eaton myasthenic syndrome is caused by antibodies to presynaptic P/Q-type voltage-gated calcium channels, often paraneoplastic with small-cell lung cancer. Less acetylcholine is released, giving low resting CMAP amplitudes; rapid repetitive stimulation or brief exercise lets calcium accumulate in the terminal, producing a large increment (>100%). Autonomic features (dry mouth) and reduced reflexes are typical. A decrement on slow repetitive stimulation is the pattern of myasthenia gravis; slowed conduction with block suggests demyelinating neuropathy.',
    { difficulty: 'Hard', type: 'clinical-case', reference: GUYTON, integratedSubjects: ['Physiology', 'Medicine'], system: 'Nervous', tags: ['lambert-eaton', 'neuromuscular-junction', 'paraneoplastic'] }),

  r('physiology', 'nerve-muscle-cns', 'gt3-phys-09',
    'A man with a stab wound to the right side of his back at the T10 level has loss of joint position and vibration sense in the right leg and weakness of the right leg. Which additional finding is expected?',
    ['Loss of pain and temperature sensation in the left leg', 'Loss of pain and temperature sensation in the right leg below T10', 'Loss of joint position sense in the left leg', 'Flaccid weakness with fasciculations throughout the whole right leg'],
    'Right hemisection of the cord (Brown-Séquard syndrome): the dorsal columns and lateral corticospinal tract carry ipsilateral information, so position/vibration sense and motor power are lost on the same side below the lesion (with upper motor neuron signs). Spinothalamic fibres cross within one or two segments of entry, so pain and temperature are lost on the opposite side beginning a little below the level of the lesion. Lower motor neuron signs occur only at the level of the lesion itself.',
    { difficulty: 'Hard', type: 'clinical-case', reference: GUYTON, integratedSubjects: ['Physiology', 'Anatomy'], system: 'Nervous', tags: ['brown-sequard', 'spinal-cord', 'sensory-tracts'] }),

  r('physiology', 'nerve-muscle-cns', 'gt3-phys-10',
    'In a reflex hammer test of the knee jerk, which receptor and afferent fibre initiate the reflex contraction of the quadriceps?',
    ['Primary endings of the muscle spindle, via group Ia afferents', 'Golgi tendon organs, via group Ib afferents', 'Secondary endings of the muscle spindle, via group II afferents', 'Pacinian corpuscles in the joint capsule, via Aβ afferents'],
    'The sudden stretch of the tendon lengthens the muscle spindles; their primary (annulospiral) endings are rate-sensitive and fire group Ia afferents, which synapse monosynaptically on alpha motor neurons of the same muscle. Golgi tendon organs (Ib) sense tension and mediate autogenic inhibition. Secondary spindle endings (group II) signal static length. Gamma motor neurons set spindle sensitivity, which is why reflexes are brisk with upper motor neuron lesions.',
    { difficulty: 'Medium', type: 'standard', reference: GUYTON, system: 'Nervous', tags: ['stretch-reflex', 'muscle-spindle'] }),

  // ============================================================== BIOCHEMISTRY (10)
  r('biochemistry', 'inborn-errors', 'gt3-bioc-01',
    'A 6-month-old has a protuberant abdomen with a large liver, a "doll-like" face and seizures when feeds are delayed. Blood shows glucose 30 mg/dL, raised lactate, uric acid and triglycerides. Glucagon does not raise blood glucose. Which enzyme is deficient?',
    ['Glucose-6-phosphatase', 'Hepatic glycogen phosphorylase', 'Debranching enzyme (amylo-1,6-glucosidase)', 'Lysosomal acid α-glucosidase'],
    'Von Gierke disease (glycogen storage disease type Ia): without glucose-6-phosphatase the liver cannot release free glucose from either glycogenolysis or gluconeogenesis, so fasting hypoglycaemia is severe and glucagon fails. Accumulated glucose-6-phosphate is diverted to lactate, to the pentose pathway (more purines → uric acid) and to triglyceride synthesis. Hepatic phosphorylase (Hers) and debranching enzyme (Cori) deficiencies cause milder hypoglycaemia without marked lactic acidosis. Acid maltase deficiency (Pompe) presents with cardiomyopathy and hypotonia, not hypoglycaemia.',
    { difficulty: 'Medium', type: 'clinical-case', reference: HARPER, integratedSubjects: ['Biochemistry', 'Pediatrics'], system: 'Metabolic', tags: ['glycogen-storage', 'von-gierke', 'hypoglycaemia'] }),

  r('biochemistry', 'enzymes-metabolism', 'gt3-bioc-02',
    'A 22-year-old develops painful muscle cramps within minutes of heavy exercise, with dark urine after one episode. If he rests briefly at the onset of symptoms, he can continue more comfortably. On a forearm exercise test, which result is expected?',
    ['Venous ammonia rises but lactate does not', 'Both lactate and ammonia rise normally', 'Lactate rises but ammonia does not', 'Neither lactate nor ammonia rises, with low creatine kinase'],
    'McArdle disease (GSD type V) is deficiency of muscle glycogen phosphorylase (myophosphorylase). Muscle cannot break down glycogen, so anaerobic exercise causes cramps, contractures and rhabdomyolysis (myoglobinuria) and no lactate is produced; ammonia rises normally from the purine nucleotide cycle. The "second wind" occurs as blood glucose and fatty acids become available. A rise in lactate without ammonia suggests myoadenylate deaminase deficiency.',
    { difficulty: 'Hard', type: 'clinical-case', reference: HARPER, system: 'Metabolic', tags: ['mcardle', 'glycogen-storage', 'rhabdomyolysis'] }),

  r('biochemistry', 'enzymes-metabolism', 'gt3-bioc-03',
    'A malnourished man is brought in confused after a 3-day drinking binge with little food. Blood glucose is 38 mg/dL and lactate is raised. What is the main biochemical reason for his hypoglycaemia?',
    ['A raised NADH/NAD⁺ ratio blocking gluconeogenesis', 'Ethanol directly inhibits hepatic glucose-6-phosphatase', 'Acetaldehyde stimulates excessive pancreatic insulin secretion', 'Ethanol activates glycogen synthase, trapping glucose as liver glycogen'],
    'Alcohol dehydrogenase and aldehyde dehydrogenase both reduce NAD⁺ to NADH. The raised NADH/NAD⁺ ratio drives pyruvate → lactate and oxaloacetate → malate, starving gluconeogenesis of substrate. In a fasted person whose glycogen stores are already used up, gluconeogenesis is the only source of glucose, so hypoglycaemia follows. The same redox shift causes lactic acidosis, favours β-hydroxybutyrate over acetoacetate in alcoholic ketoacidosis, and increases fatty acid synthesis (fatty liver).',
    { difficulty: 'Hard', type: 'clinical-case', reference: HARPER, integratedSubjects: ['Biochemistry', 'Medicine'], system: 'Metabolic', tags: ['ethanol-metabolism', 'gluconeogenesis', 'nadh'] }),

  r('biochemistry', 'vitamins-nutrition', 'gt3-bioc-04',
    'A chronic alcoholic is confused, ataxic and has nystagmus. An intern plans to start an intravenous dextrose infusion first. Why should thiamine be given before glucose?',
    ['Glucose metabolism by pyruvate dehydrogenase needs thiamine, so glucose can precipitate Wernicke encephalopathy', 'Thiamine is required for the uptake of glucose into neurons through GLUT3 transporters', 'Intravenous glucose inhibits the intestinal absorption and storage of thiamine', 'Thiamine is the cofactor that converts lactate back to pyruvate in brain tissue'],
    'Thiamine pyrophosphate is a coenzyme for pyruvate dehydrogenase, α-ketoglutarate dehydrogenase, branched-chain keto-acid dehydrogenase and transketolase. Giving glucose increases flux through these thiamine-dependent steps; in a thiamine-depleted patient this can use up the last reserves and precipitate or worsen Wernicke encephalopathy (confusion, ophthalmoplegia/nystagmus, ataxia). Thiamine status can be assessed by the erythrocyte transketolase activity. GLUT3-mediated uptake and lactate dehydrogenase do not need thiamine.',
    { difficulty: 'Medium', type: 'clinical-case', reference: HARPER, integratedSubjects: ['Biochemistry', 'Medicine'], system: 'Nervous', tags: ['thiamine', 'wernicke', 'pdh'] }),

  r('biochemistry', 'enzymes-metabolism', 'gt3-bioc-05',
    'In methanol poisoning, fomepizole is given to inhibit alcohol dehydrogenase. Fomepizole binds the active site and its effect can be overcome by high substrate concentrations. On a Lineweaver–Burk (double-reciprocal) plot, how does the inhibited line compare with the uninhibited one?',
    ['The lines intersect on the y-axis; the inhibited line has a steeper slope', 'The lines intersect on the x-axis; the inhibited line has a higher y-intercept', 'The lines are parallel; the inhibited line is shifted upwards', 'The lines intersect in the second quadrant, above the x-axis'],
    'A competitive inhibitor raises the apparent Km (lower affinity) without changing Vmax, because enough substrate outcompetes it. On a double-reciprocal plot the y-intercept (1/Vmax) is unchanged, the x-intercept (−1/Km) moves towards zero and the slope (Km/Vmax) increases, so the lines meet on the y-axis. Pure non-competitive inhibition lowers Vmax with the same Km (lines meet on the x-axis); uncompetitive inhibition gives parallel lines; mixed inhibition meets in the second or third quadrant.',
    { difficulty: 'Hard', type: 'standard', reference: HARPER, integratedSubjects: ['Biochemistry', 'Pharmacology'], system: 'Metabolic', tags: ['enzyme-kinetics', 'competitive-inhibition', 'lineweaver-burk'] }),

  r('biochemistry', 'molecular-genetics', 'gt3-bioc-06',
    'A 16-year-old develops rigidity, falling school grades and seizures. His father developed chorea and dementia at 45, and his paternal grandfather had symptoms only at 60. What mechanism explains the earlier onset in the boy?',
    ['CAG repeat expansion, favoured during spermatogenesis', 'Expansion of a CGG repeat during oogenesis', 'Paternal genomic imprinting silencing the maternal allele', 'Mitochondrial heteroplasmy that increases with each generation'],
    'Huntington disease is autosomal dominant, caused by an expanded CAG repeat in HTT. Longer repeats cause earlier onset (anticipation), and expansion is more likely when the gene passes through the father, which explains juvenile (often rigid, Westphal variant) disease in children of affected fathers. CGG expansion during oogenesis is fragile X syndrome (maternal transmission). Mitochondrial disorders are inherited only through the mother.',
    { difficulty: 'Hard', type: 'clinical-case', reference: "Harper's Illustrated Biochemistry; Thompson & Thompson Genetics in Medicine", integratedSubjects: ['Biochemistry', 'Medicine'], system: 'Nervous', tags: ['huntington', 'trinucleotide-repeat', 'anticipation'] }),

  r('biochemistry', 'molecular-genetics', 'gt3-bioc-07',
    'A 4-year-old girl has severe developmental delay with no speech, a wide-based jerky gait, seizures and frequent inappropriate laughter. Methylation testing of chromosome 15q11–q13 is abnormal. What is the most likely genetic mechanism?',
    ['Loss of maternal UBE3A, usually a maternal 15q11–q13 deletion', 'Deletion of the paternally inherited 15q11–q13 region', 'Maternal uniparental disomy of chromosome 15 (both copies maternal)', 'An expanded CGG repeat in the FMR1 gene on the X chromosome'],
    'Angelman syndrome results from loss of function of maternally expressed UBE3A (the paternal copy is silenced in neurons) — most often a maternal 15q11–q13 deletion, or paternal uniparental disomy, imprinting defect or UBE3A mutation. Prader–Willi syndrome (neonatal hypotonia, hyperphagia, obesity, hypogonadism) results from loss of the paternal contribution: paternal deletion or maternal uniparental disomy. FMR1 CGG expansion is fragile X syndrome.',
    { difficulty: 'Hard', type: 'clinical-case', reference: 'Thompson & Thompson Genetics in Medicine', integratedSubjects: ['Biochemistry', 'Pediatrics'], system: 'Nervous', tags: ['imprinting', 'angelman', 'prader-willi'] }),

  r('biochemistry', 'vitamins-nutrition', 'gt3-bioc-08',
    'A 10-year-old has a recurrent photosensitive scaly rash and episodes of cerebellar ataxia. His diet is adequate. Urine shows large amounts of neutral amino acids, with normal plasma amino acids. Which vitamin-related deficiency explains the rash?',
    ['Niacin, because tryptophan is lost in urine and gut, limiting endogenous niacin synthesis', 'Riboflavin, because flavin absorption depends on the same transporter', 'Pyridoxine, because tryptophan is needed for pyridoxal phosphate synthesis', 'Biotin, because neutral amino acids are required for biotinidase activity'],
    'Hartnup disease is an autosomal recessive defect of the neutral amino acid transporter (SLC6A19) in the kidney and intestine. Tryptophan is poorly absorbed and lost in urine, so less is available for niacin (NAD) synthesis, causing pellagra-like photodermatitis and intermittent ataxia. It responds to nicotinamide and a high-protein diet. Pyridoxal phosphate is actually a cofactor needed to convert tryptophan to niacin, not the other way round.',
    { difficulty: 'Hard', type: 'clinical-case', reference: HARPER, integratedSubjects: ['Biochemistry', 'Dermatology'], system: 'Metabolic', tags: ['hartnup', 'niacin', 'pellagra', 'tryptophan'] }),

  r('biochemistry', 'inborn-errors', 'gt3-bioc-09',
    'A 3-day-old boy becomes lethargic, vomits and has a respiratory alkalosis. Plasma ammonia is 650 µmol/L, plasma citrulline is very low and urinary orotic acid is markedly raised. Which enzyme is deficient?',
    ['Ornithine transcarbamylase', 'Carbamoyl phosphate synthetase I', 'Argininosuccinate synthetase', 'UMP synthase'],
    'Severe neonatal hyperammonaemia with low citrulline points to a defect before citrulline is made: CPS I or OTC. In OTC deficiency (X-linked, the commonest urea-cycle defect) carbamoyl phosphate accumulates in mitochondria, spills into the cytosol and enters pyrimidine synthesis, so orotic acid rises; in CPS I deficiency orotic acid is low or normal. Argininosuccinate synthetase deficiency (citrullinaemia) has very high citrulline. UMP synthase deficiency (hereditary orotic aciduria) raises orotic acid with megaloblastic anaemia but no hyperammonaemia.',
    { difficulty: 'Expert', type: 'clinical-case', reference: HARPER, integratedSubjects: ['Biochemistry', 'Pediatrics'], system: 'Metabolic', tags: ['urea-cycle', 'otc-deficiency', 'orotic-aciduria', 'hyperammonaemia'] }),

  r('biochemistry', 'inborn-errors', 'gt3-bioc-10',
    'A 7-month-old boy has lost the ability to sit, startles exaggeratedly to sound and has a cherry-red spot at both maculae. There is no enlargement of the liver or spleen. Which enzyme deficiency is most likely?',
    ['Hexosaminidase A', 'Sphingomyelinase', 'Glucocerebrosidase', 'Galactocerebrosidase'],
    'Tay–Sachs disease (GM2 gangliosidosis, hexosaminidase A deficiency) causes neuroregression, hyperacusis and a macular cherry-red spot with no organomegaly, because ganglioside storage is neuronal. Niemann–Pick type A (sphingomyelinase) also has a cherry-red spot but with marked hepatosplenomegaly and foam cells. Gaucher disease (glucocerebrosidase) causes hepatosplenomegaly and bone disease. Krabbe disease (galactocerebrosidase) causes irritability, optic atrophy and globoid cells, without organomegaly or a typical cherry-red spot.',
    { difficulty: 'Expert', type: 'clinical-case', reference: HARPER, integratedSubjects: ['Biochemistry', 'Pediatrics'], system: 'Metabolic', tags: ['lysosomal-storage', 'tay-sachs', 'cherry-red-spot'] }),
]
