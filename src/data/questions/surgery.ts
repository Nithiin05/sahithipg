import type { Topic } from '../../types'

export const surgeryTopics: Topic[] = [
  {
    id: 'general-surgery-principles',
    name: 'General Surgery Principles',
    description: 'Wound healing, shock, and perioperative care.',
    questions: [
      {
        id: 'surg-1',
        text: 'A surgical wound closed primarily and healing without complication, forming a thin linear scar, is an example of healing by:',
        options: [
          'Tertiary intention (delayed primary closure)',
          'Healing by epithelialization alone (as in a superficial abrasion)',
          'Secondary intention',
          'Primary intention',
        ],
        correctIndex: 3,
        explanation:
          'Primary intention healing occurs when clean, well-approximated wound edges (as in a surgically closed incision) heal with minimal granulation tissue and a fine scar. Secondary intention involves healing by granulation and contraction in an open wound left to close on its own.',
        reference: "Bailey & Love's Short Practice of Surgery",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['wound-healing'],
      },
      {
        id: 'surg-2',
        text: 'A trauma patient has a heart rate of 130/min, BP 85/60, and is confused, with an estimated blood loss of 35% of blood volume. This corresponds to which class of hemorrhagic shock?',
        options: [
          'Class II',
          'Class III',
          'Class IV',
          'Class I',
        ],
        correctIndex: 1,
        explanation:
          'ATLS classification: Class III hemorrhagic shock involves 30-40% blood loss, with tachycardia >120, hypotension, and altered mental status (confusion) — requiring prompt crystalloid AND blood product resuscitation, unlike the more insidious Class I-II.',
        reference: 'ATLS (Advanced Trauma Life Support) Guidelines / Bailey & Love',
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['hemorrhagic-shock', 'atls'],
        highYieldNote: 'Class I <15%, Class II 15-30%, Class III 30-40%, Class IV >40% blood loss.',
      },
      {
        id: 'surg-3',
        text: "A 30-year-old motorcyclist is brought in after a high-speed crash. He has gurgling respirations with blood pooling in the oropharynx and SpO2 of 86%. A 6-cm forearm laceration is oozing steadily but is not spurting. Following the ATLS primary survey, what should be done first?",
        options: [
          "Clear the airway (suction, jaw thrust) with cervical-spine restriction",
          "Apply a tourniquet to the forearm before assessing the airway",
          "Secure two large-bore IV lines and start warmed crystalloid",
          "Perform a FAST scan to look for intra-abdominal bleeding",
        ],
        correctIndex: 0,
        explanation:
          "Airway compromise (gurgling, blood in the oropharynx, hypoxia) is the most immediate threat, so the airway is cleared and protected first with cervical-spine restriction, followed by Breathing and then Circulation. The forearm wound is oozing, not exsanguinating, so direct pressure can follow. ATLS 10th edition does allow control of catastrophic, exsanguinating external haemorrhage at the very start (often written xABCDE), but that applies to life-threatening arterial bleeding, not a steadily oozing laceration. IV access and FAST belong to the C step.",
        reference: "ATLS, 10th Edition",
        clinicalPearl: "Catastrophic external haemorrhage is controlled first (xABCDE); otherwise the order is A → B → C → D → E.",
        difficulty: 'Hard',
        type: 'clinical-case',
        tags: ['atls', 'trauma'],
      },
      {
        id: 'surg-4',
        text: "Assertion (A): Prophylactic antibiotics for clean surgery are best started after skin closure.\nReason (R): Prophylaxis aims for adequate tissue antibiotic levels at the time of incision, when contamination begins.",
        options: [
          "Both A and R are true, and R is the correct explanation of A",
          "Both A and R are true, but R is NOT the correct explanation of A",
          "A is true but R is false",
          "A is false but R is true",
        ],
        correctIndex: 3,
        explanation:
          "A is false: prophylaxis is given within 60 minutes before incision (120 minutes for vancomycin and fluoroquinolones); starting after closure misses the period of contamination. R is true and explains the correct timing.",
        reference: "Bailey & Love's Short Practice of Surgery",
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['surgical-prophylaxis'],
      },
    ],
  },
  {
    id: 'gi-surgery',
    name: 'Gastrointestinal Surgery',
    description: 'Acute abdomen, hernias, and biliary disease.',
    questions: [
      {
        id: 'surg-5',
        text: 'A patient presents with sudden severe epigastric pain, board-like rigidity, and free air under the diaphragm on erect chest X-ray. This most likely represents:',
        options: [
          'Biliary colic',
          'Perforated peptic ulcer',
          'Acute appendicitis',
          'Acute gastroenteritis',
        ],
        correctIndex: 1,
        explanation:
          'Perforated peptic ulcer classically presents with sudden severe pain, a rigid ("board-like") abdomen from chemical peritonitis, and pneumoperitoneum (free air under the diaphragm) on an erect chest X-ray — a surgical emergency.',
        reference: "Bailey & Love's Short Practice of Surgery",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['peptic-ulcer-perforation'],
      },
      {
        id: 'surg-6',
        text: 'A patient with right upper quadrant pain, fever, and jaundice (Charcot\'s triad) most likely has:',
        options: [
          'Acute pancreatitis alone',
          'Acute viral hepatitis',
          'Acute cholangitis',
          'Uncomplicated biliary colic',
        ],
        correctIndex: 2,
        explanation:
          "Charcot's triad (RUQ pain, fever, jaundice) suggests acute cholangitis from biliary obstruction with infection — a surgical/endoscopic emergency requiring urgent biliary decompression (e.g., ERCP) plus antibiotics. Reynolds' pentad adds hypotension and altered mental status, signaling septic shock.",
        reference: "Bailey & Love's Short Practice of Surgery",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['cholangitis'],
        clinicalPearl: "Reynolds' pentad = Charcot's triad + hypotension + altered mental status → suppurative cholangitis with septic shock.",
      },
      {
        id: 'surg-7',
        text: 'An indirect inguinal hernia passes through which anatomical landmark, distinguishing it from a direct hernia?',
        options: [
          'The femoral canal below the inguinal ligament',
          'Deep (internal) inguinal ring, lateral to the inferior epigastric vessels',
          'The obturator canal',
          'Hesselbach\'s triangle, medial to the inferior epigastric vessels',
        ],
        correctIndex: 1,
        explanation:
          'Indirect inguinal hernias follow the processus vaginalis through the deep inguinal ring, lateral to the inferior epigastric vessels, and can traverse the whole inguinal canal into the scrotum. Direct hernias bulge through Hesselbach\'s triangle, medial to the inferior epigastric vessels.',
        reference: "Bailey & Love's Short Practice of Surgery",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['hernia'],
      },
      {
        id: 'surg-8',
        text: 'Match each acute abdomen presentation with its most likely diagnosis:',
        options: [
          'Migratory periumbilical-to-RIF pain with Rovsing sign → Acute cholecystitis; Colicky flank pain radiating to groin with hematuria → Acute appendicitis; RUQ pain worse after fatty meals with positive Murphy sign → Renal/ureteric colic',
          'Migratory periumbilical-to-RIF pain with Rovsing sign → Renal/ureteric colic; Colicky flank pain radiating to groin with hematuria → Acute cholecystitis; RUQ pain worse after fatty meals with positive Murphy sign → Acute appendicitis',
          'Migratory periumbilical-to-RIF pain with Rovsing sign → Acute appendicitis; Colicky flank pain radiating to groin with hematuria → Renal/ureteric colic; RUQ pain worse after fatty meals with positive Murphy sign → Acute cholecystitis',
          'Migratory periumbilical-to-RIF pain with Rovsing sign → Acute appendicitis; Colicky flank pain radiating to groin with hematuria → Acute cholecystitis; RUQ pain worse after fatty meals with positive Murphy sign → Renal/ureteric colic',
        ],
        correctIndex: 2,
        explanation:
          'Classic surgical vignettes: appendicitis presents with pain migrating from periumbilical region to the right iliac fossa (McBurney\'s point) with Rovsing sign; renal/ureteric colic causes colicky flank-to-groin pain with hematuria; acute cholecystitis causes RUQ pain (worse with fatty food) with a positive Murphy sign.',
        reference: "Bailey & Love's Short Practice of Surgery",
        difficulty: 'Medium',
        type: 'match-following',
        tags: ['acute-abdomen'],
        matchPairs: [
          { left: 'Migratory pain + Rovsing sign', right: 'Acute appendicitis' },
          { left: 'Colicky flank-to-groin pain + hematuria', right: 'Renal/ureteric colic' },
          { left: 'RUQ pain + Murphy sign', right: 'Acute cholecystitis' },
        ],
      },
    ],
  },
  {
    id: 'urology',
    name: 'Urology & Uro-oncology',
    description: 'Stone disease, BPH, and urological malignancies.',
    questions: [
      {
        id: 'surg-9',
        text: 'The most common composition of urinary tract stones is:',
        options: [
          'Calcium oxalate',
          'Struvite (magnesium ammonium phosphate)',
          'Cystine',
          'Uric acid',
        ],
        correctIndex: 0,
        explanation:
          'Calcium oxalate stones are the most common type of urinary calculi overall (roughly 70-80%), often radio-opaque on plain X-ray, followed by struvite (associated with urease-producing organisms like Proteus), uric acid (radiolucent), and rare cystine stones.',
        reference: "Smith's General Urology / Bailey & Love",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['urolithiasis'],
      },
      {
        id: 'surg-10',
        text: 'An elderly man presents with progressive lower urinary tract symptoms (hesitancy, weak stream, nocturia) and a smooth, uniformly enlarged prostate on digital rectal exam without nodularity. This is most consistent with:',
        options: [
          'Benign prostatic hyperplasia (BPH)',
          'Acute bacterial prostatitis',
          'Prostatic abscess',
          'Prostate carcinoma',
        ],
        correctIndex: 0,
        explanation:
          'BPH classically causes a smooth, firm, symmetrically enlarged prostate with obstructive/irritative LUTS; a hard, nodular, asymmetric prostate would raise suspicion for prostate carcinoma, which usually arises in the peripheral zone (unlike BPH, which arises in the transition zone).',
        reference: "Smith's General Urology",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['bph'],
      },
      {
        id: 'surg-11',
        text: 'Painless gross hematuria in an elderly smoker should raise strong suspicion for:',
        options: [
          'Acute cystitis (urinary tract infection)',
          'Benign prostatic hyperplasia (BPH)',
          'Bladder carcinoma (urothelial/transitional cell carcinoma)',
          'Renal tuberculosis',
        ],
        correctIndex: 2,
        explanation:
          'Painless gross hematuria, especially in an older smoker, is a red-flag symptom for urothelial (transitional cell) carcinoma of the bladder — smoking is the single strongest modifiable risk factor — and warrants prompt cystoscopic evaluation.',
        reference: "Smith's General Urology",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['bladder-cancer'],
      },
      {
        id: 'surg-12',
        text: "Assertion (A): PSA is organ-specific but not cancer-specific.\nReason (R): PSA is a serine protease that liquefies the seminal coagulum.",
        options: [
          "Both A and R are true, and R is the correct explanation of A",
          "Both A and R are true, but R is NOT the correct explanation of A",
          "A is true but R is false",
          "A is false but R is true",
        ],
        correctIndex: 1,
        explanation:
          "Both are true, but R does not explain A. PSA is not cancer-specific because it also rises in BPH, prostatitis and after prostatic manipulation (catheterisation, biopsy, ejaculation). R describes the normal physiological function of PSA.",
        reference: "Smith's General Urology",
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['psa', 'prostate-cancer'],
      },
    ],
  },
]
