import type { Topic } from '../../types'

export const radiologyTopics: Topic[] = [
  {
    id: 'chest-cardiac-imaging',
    name: 'Chest & Cardiac Imaging',
    description: 'Chest X-ray patterns and cardiac imaging findings.',
    questions: [
      {
        id: 'rad-1',
        text: 'A chest X-ray shows homogeneous opacity in the right lower zone with an obliterated right costophrenic angle and a meniscus sign. This most likely represents:',
        options: [
          'Pleural effusion',
          'Lobar pneumonia (consolidation) without effusion',
          'Pleural thickening (old fibrosis) without free fluid',
          'Pneumothorax',
        ],
        correctIndex: 0,
        explanation:
          'A pleural effusion classically produces a homogeneous opacity with a concave upper border (meniscus sign) and obliteration of the costophrenic angle on an erect chest X-ray, differing from lobar consolidation, which typically shows air bronchograms without a meniscus.',
        reference: 'Textbook of Radiology & Imaging (D. Sutton) / Grainger & Allison\'s Diagnostic Radiology',
        difficulty: 'Easy',
        type: 'radiology',
        tags: ['pleural-effusion'],
        imageAlt: 'Schematic chest X-ray diagram illustrating a right-sided pleural effusion with meniscus sign',
      },
      {
        id: 'rad-2',
        text: 'A chest X-ray in a patient with a long-standing history of rheumatic mitral stenosis is likely to show which classic cardiac silhouette finding?',
        options: [
          "Double right heart border (left atrial enlargement)",
          "Boot-shaped heart with an uplifted apex",
          "Egg-on-a-string cardiac silhouette",
          "Water-bottle-shaped cardiac silhouette",
        ],
        correctIndex: 0,
        explanation:
          'Mitral stenosis causes left atrial enlargement, producing straightening of the left heart border, a double density/double right heart border (from the enlarged left atrium projecting behind the right atrium), and splaying of the carinal angle on chest X-ray.',
        reference: "Grainger & Allison's Diagnostic Radiology",
        difficulty: 'Medium',
        type: 'radiology',
        tags: ['mitral-stenosis', 'cardiac-silhouette'],
        clinicalPearl: 'Boot-shaped heart = Tetralogy of Fallot. Egg-on-a-string = Transposition of the great arteries. Water-bottle heart = large pericardial effusion.',
      },
      {
        id: 'rad-3',
        text: 'A CT pulmonary angiogram is the imaging modality of choice for diagnosing which condition?',
        options: [
          'Chronic bronchitis',
          'Simple community-acquired pneumonia',
          'Uncomplicated asthma exacerbation',
          'Acute pulmonary embolism',
        ],
        correctIndex: 3,
        explanation:
          'CT pulmonary angiography (CTPA) is the current gold-standard imaging test for diagnosing acute pulmonary embolism in most patients, directly visualizing filling defects within the pulmonary arterial tree; V/Q scanning is an alternative when CTPA is contraindicated (e.g., contrast allergy, renal impairment).',
        reference: "Grainger & Allison's Diagnostic Radiology",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['pulmonary-embolism', 'ct-imaging'],
      },
      {
        id: 'rad-4',
        text: "Assertion (A): A boot-shaped heart on chest X-ray is classically described in transposition of the great arteries.\nReason (R): In Tetralogy of Fallot, right ventricular hypertrophy and a concave main pulmonary artery segment produce a boot-shaped silhouette.",
        options: [
          "Both A and R are true, and R is the correct explanation of A",
          "Both A and R are true, but R is NOT the correct explanation of A",
          "A is true but R is false",
          "A is false but R is true",
        ],
        correctIndex: 3,
        explanation:
          "A is false: a boot-shaped heart (coeur en sabot) is classic for Tetralogy of Fallot; transposition gives an 'egg-on-a-string' appearance. R is true and describes why Tetralogy produces the boot shape.",
        reference: "Grainger & Allison's Diagnostic Radiology",
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['tetralogy-of-fallot'],
      },
    ],
  },
  {
    id: 'abdominal-imaging',
    name: 'Abdominal Imaging',
    description: 'Plain films, ultrasound, and CT of the abdomen.',
    questions: [
      {
        id: 'rad-5',
        text: 'A plain abdominal X-ray in a patient with suspected bowel obstruction shows multiple dilated small bowel loops with air-fluid levels arranged in a "step-ladder" pattern. This suggests:',
        options: [
          'Sigmoid volvulus',
          'Small bowel obstruction',
          'Large bowel (colonic) obstruction',
          'Paralytic (adynamic) ileus',
        ],
        correctIndex: 1,
        explanation:
          'Multiple dilated small bowel loops with air-fluid levels in a step-ladder pattern on an erect abdominal X-ray is a classic sign of mechanical small bowel obstruction, often prompting further evaluation (e.g., CT) to identify the underlying cause (adhesions, hernia, tumor).',
        reference: "Grainger & Allison's Diagnostic Radiology",
        difficulty: 'Easy',
        type: 'radiology',
        tags: ['bowel-obstruction'],
      },
      {
        id: 'rad-6',
        text: 'Ultrasound is generally the first-line imaging modality for evaluating suspected acute cholecystitis because it can show:',
        options: [
          'A contracted, thick-walled gallbladder with pericholecystic fluid but no sonographic Murphy sign',
          'Gallbladder wall thickening and pericholecystic fluid, but gallstones are usually missed on ultrasound',
          'Choledocholithiasis with a dilated common bile duct as the primary diagnostic finding',
          'Gallstones, gallbladder wall thickening, pericholecystic fluid, and a sonographic Murphy sign',
        ],
        correctIndex: 3,
        explanation:
          'Ultrasound is the first-line test for suspected acute cholecystitis: it readily detects gallstones, gallbladder wall thickening (>3mm), pericholecystic fluid, and a sonographic Murphy sign (maximal tenderness under the probe over the gallbladder) — all without radiation and at low cost.',
        reference: "Grainger & Allison's Diagnostic Radiology",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['cholecystitis', 'ultrasound'],
      },
      {
        id: 'rad-7',
        text: 'A "target sign" or "doughnut sign" on abdominal ultrasound in an infant with intermittent colicky abdominal pain and "currant jelly" stools suggests:',
        options: [
          'Simple appendicitis',
          'Pyloric stenosis',
          'Malrotation with volvulus',
          'Intussusception',
        ],
        correctIndex: 3,
        explanation:
          'Intussusception (telescoping of bowel, most commonly ileocolic) produces a classic "target"/"doughnut" sign on transverse ultrasound from the concentric layers of invaginated bowel, along with the classic clinical triad of colicky pain, vomiting, and red "currant jelly" stools.',
        reference: "Grainger & Allison's Diagnostic Radiology / Nelson Textbook of Pediatrics",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['intussusception'],
      },
      {
        id: 'rad-8',
        text: 'Match each abdominal imaging sign with its associated condition:',
        options: [
          '"String sign" → pyloric stenosis; "Bird-beak sign" → duodenal atresia; "Double bubble sign" → sigmoid volvulus',
          '"String sign" → sigmoid volvulus; "Bird-beak sign" → duodenal atresia; "Double bubble sign" → pyloric stenosis',
          '"String sign" on barium study → pyloric stenosis; "Bird-beak sign" on barium enema → sigmoid volvulus; "Double bubble sign" on abdominal X-ray → duodenal atresia',
          '"String sign" → duodenal atresia; "Bird-beak sign" → pyloric stenosis; "Double bubble sign" → sigmoid volvulus',
        ],
        correctIndex: 2,
        explanation:
          'The "string sign" reflects a narrowed, elongated pyloric channel in hypertrophic pyloric stenosis; the "bird-beak sign" on contrast enema is classic for sigmoid (or cecal) volvulus at the point of luminal twist; the "double bubble sign" (two gas-filled bubbles — stomach and proximal duodenum) is classic for duodenal atresia, often associated with Down syndrome.',
        reference: "Grainger & Allison's Diagnostic Radiology",
        difficulty: 'Medium',
        type: 'match-following',
        tags: ['radiology-signs'],
        matchPairs: [
          { left: 'String sign', right: 'Hypertrophic pyloric stenosis' },
          { left: 'Bird-beak sign', right: 'Sigmoid volvulus' },
          { left: 'Double bubble sign', right: 'Duodenal atresia' },
        ],
      },
    ],
  },
  {
    id: 'neuroimaging',
    name: 'Neuroimaging',
    description: 'CT/MRI patterns in stroke, hemorrhage, and tumors.',
    questions: [
      {
        id: 'rad-9',
        text: 'A non-contrast CT of the head performed within 1 hour of sudden severe "worst headache of life" onset is most useful for excluding:',
        options: [
          'Old lacunar infarcts only',
          'Subarachnoid hemorrhage',
          'Normal age-related atrophy',
          'Chronic small-vessel ischemic disease',
        ],
        correctIndex: 1,
        explanation:
          'Non-contrast CT head has very high sensitivity for subarachnoid hemorrhage when performed within 6 hours of symptom onset (thunderclap headache); if CT is negative but suspicion remains high, lumbar puncture (looking for xanthochromia) is the next step.',
        reference: "Grainger & Allison's Diagnostic Radiology / Harrison's Principles of Internal Medicine",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['subarachnoid-hemorrhage'],
      },
      {
        id: 'rad-10',
        text: 'A biconvex (lens-shaped), hyperdense extra-axial collection that does NOT cross suture lines on CT head, following trauma, is classic for:',
        options: [
          "Epidural (extradural) haematoma",
          "Subarachnoid haemorrhage",
          "Acute subdural haematoma",
          "Diffuse axonal injury",
        ],
        correctIndex: 0,
        explanation:
          'Epidural hematomas are classically biconvex (lentiform) and limited by suture lines (since dura is tightly adherent there), most often from middle meningeal artery injury after temporal bone fracture, and classically present with a lucid interval before rapid deterioration.',
        reference: "Grainger & Allison's Diagnostic Radiology",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['epidural-hematoma'],
        clinicalPearl: 'Epidural = biconvex, does NOT cross sutures. Subdural = crescentic, CAN cross sutures but not midline.',
      },
      {
        id: 'rad-11',
        text: 'A crescentic (concave), hyperdense extra-axial collection that crosses suture lines but not the midline on CT head is classic for:',
        options: [
          "Subdural haematoma",
          "Cerebral contusion",
          "Epidural haematoma",
          "Subarachnoid haemorrhage",
        ],
        correctIndex: 0,
        explanation:
          'Subdural hematomas result from tearing of bridging veins (often after minor trauma, especially in the elderly or those on anticoagulation) and spread as a crescentic collection along the brain surface, crossing suture lines (since it lies beneath the dura) but respecting the midline (limited by the falx).',
        reference: "Grainger & Allison's Diagnostic Radiology",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['subdural-hematoma'],
      },
      {
        id: 'rad-12',
        text: "Assertion (A): MRI diffusion-weighted imaging (DWI) is more sensitive than CT for acute ischaemic stroke in the first few hours.\nReason (R): CT cannot detect intracranial haemorrhage in the first 6 hours.",
        options: [
          "Both A and R are true, and R is the correct explanation of A",
          "Both A and R are true, but R is NOT the correct explanation of A",
          "A is true but R is false",
          "A is false but R is true",
        ],
        correctIndex: 2,
        explanation:
          "A is true; R is false. Non-contrast CT is highly sensitive for acute haemorrhage from the outset, which is why it is the first scan in suspected stroke. DWI is more sensitive for ischaemia because it shows restricted diffusion from cytotoxic oedema within minutes, before CT changes appear.",
        reference: "Grainger & Allison's Diagnostic Radiology / Harrison's Principles of Internal Medicine",
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['stroke-imaging', 'mri'],
      },
    ],
  },
]
