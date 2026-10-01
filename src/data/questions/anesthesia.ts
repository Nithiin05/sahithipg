import type { Topic } from '../../types'

export const anesthesiaTopics: Topic[] = [
  {
    id: 'general-anesthesia-airway',
    name: 'General Anesthesia & Airway',
    description: 'Induction agents, airway management, and neuromuscular blockade.',
    questions: [
      {
        id: 'anes-1',
        text: "A 50-year-old in septic shock needs rapid-sequence intubation. Which induction agent best preserves blood pressure but carries a specific risk of adrenocortical suppression that is a concern in this setting?",
        options: [
          "Etomidate",
          "Propofol",
          "Thiopental",
          "Midazolam",
        ],
        correctIndex: 0,
        explanation:
          "Etomidate causes little myocardial depression or vasodilation, so blood pressure is well preserved, but it inhibits 11β-hydroxylase and transiently suppresses cortisol synthesis, which is a concern in sepsis. Ketamine is the other haemodynamically favourable option (it supports blood pressure through sympathetic stimulation) and has no adrenal effect. Propofol and thiopental cause dose-dependent hypotension, and midazolam also lowers blood pressure.",
        reference: "Miller's Anesthesia",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['induction-agents'],
      },
      {
        id: 'anes-2',
        text: 'A patient develops masseter muscle rigidity, tachycardia, hyperthermia, and rising end-tidal CO2 shortly after receiving succinylcholine and a volatile anesthetic. This presentation suggests:',
        options: [
          'Normal expected response to succinylcholine',
          'Anesthesia awareness',
          'Simple anaphylaxis to the induction agent',
          'Malignant hyperthermia',
        ],
        correctIndex: 3,
        explanation:
          'Malignant hyperthermia is a life-threatening hypermetabolic reaction to triggering agents (volatile anesthetics, succinylcholine) in genetically susceptible individuals (ryanodine receptor mutations), causing uncontrolled calcium release in skeletal muscle; immediate treatment is IV dantrolene plus stopping the trigger and supportive cooling.',
        reference: "Miller's Anesthesia",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['malignant-hyperthermia'],
        clinicalPearl: 'Dantrolene is the specific antidote for malignant hyperthermia — it works by inhibiting ryanodine receptor-mediated calcium release from the sarcoplasmic reticulum.',
      },
      {
        id: 'anes-3',
        text: 'The Mallampati classification is used pre-operatively to assess:',
        options: [
          'Renal function before contrast administration',
          'Cardiac risk before non-cardiac surgery',
          'Severity of chronic obstructive pulmonary disease',
          'Predicted difficulty of endotracheal intubation based on oropharyngeal visibility',
        ],
        correctIndex: 3,
        explanation:
          'The Mallampati classification grades the visibility of oropharyngeal structures (soft palate, uvula, tonsillar pillars) with the mouth open and tongue protruded, in a seated patient — higher grades correlate with more difficult laryngoscopy/intubation, aiding pre-operative airway assessment.',
        reference: "Miller's Anesthesia",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['airway-assessment'],
      },
      {
        id: 'anes-4',
        text: "Assertion (A): Succinylcholine can cause hyperkalaemia.\nReason (R): Succinylcholine blocks acetylcholine receptors without depolarising the motor endplate.",
        options: [
          "Both A and R are true, and R is the correct explanation of A",
          "Both A and R are true, but R is NOT the correct explanation of A",
          "A is true but R is false",
          "A is false but R is true",
        ],
        correctIndex: 2,
        explanation:
          "A is true; R is false. Succinylcholine is a DEPOLARISING blocker: it opens nicotinic receptors, causing fasciculations and K+ efflux. The rise is exaggerated with upregulated extrajunctional receptors (burns after 24 h, major trauma, immobilisation, denervation). Blocking without depolarisation describes non-depolarising agents such as rocuronium.",
        reference: "Miller's Anesthesia",
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['succinylcholine', 'hyperkalemia'],
      },
    ],
  },
  {
    id: 'regional-anesthesia',
    name: 'Regional Anesthesia',
    description: 'Spinal, epidural, and peripheral nerve blocks.',
    questions: [
      {
        id: 'anes-5',
        text: 'Spinal anesthesia is administered by injecting local anesthetic into which space?',
        options: [
          'Subarachnoid space (containing CSF)',
          'Subdural space specifically',
          'Intramuscular paraspinal tissue',
          'Epidural space only, never entering CSF',
        ],
        correctIndex: 0,
        explanation:
          'Spinal (subarachnoid/intrathecal) anesthesia involves injecting a small dose of local anesthetic directly into the CSF-filled subarachnoid space, producing a rapid, dense block; epidural anesthesia instead deposits a larger volume of drug in the epidural space outside the dura, with slower onset.',
        reference: "Miller's Anesthesia",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['spinal-anesthesia'],
      },
      {
        id: 'anes-6',
        text: 'Shortly after spinal anesthesia, a patient develops sudden hypotension and bradycardia. The most likely mechanism is:',
        options: [
          'Normal, expected finding requiring no intervention',
          'Sympathetic blockade causing vasodilation and reduced venous return',
          'Local anesthetic systemic toxicity (LAST) affecting the heart directly',
          'An allergic reaction to the local anesthetic',
        ],
        correctIndex: 1,
        explanation:
          'Spinal/epidural anesthesia blocks sympathetic outflow along with sensory/motor fibers; the resulting vasodilation (reduced venous return/preload) and unopposed vagal tone commonly cause hypotension and bradycardia, managed with IV fluids, vasopressors (e.g., phenylephrine/ephedrine), and sometimes atropine.',
        reference: "Miller's Anesthesia",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['spinal-anesthesia-complications'],
      },
      {
        id: 'anes-7',
        text: 'A patient develops perioral tingling, tinnitus, and then seizures shortly after an inadvertent intravascular injection during a peripheral nerve block. This is most consistent with:',
        options: [
          'Local anesthetic systemic toxicity (LAST)',
          'Malignant hyperthermia',
          'Simple vasovagal syncope',
          'Normal post-block paresthesia',
        ],
        correctIndex: 0,
        explanation:
          'LAST results from accidental intravascular injection or systemic absorption of local anesthetic, causing early CNS signs (perioral numbness, tinnitus, metallic taste) that can progress to seizures and cardiovascular collapse; treatment includes stopping the drug, airway/seizure management, and IV lipid emulsion ("lipid rescue") for severe cases.',
        reference: "Miller's Anesthesia",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['last', 'local-anesthetic-toxicity'],
        clinicalPearl: 'IV lipid emulsion ("lipid rescue") is the specific treatment for severe local anesthetic systemic toxicity, especially with bupivacaine.',
      },
      {
        id: 'anes-8',
        text: 'Match each regional anesthesia complication with its typical cause:',
        options: [
          'Post-dural puncture headache → excessive cephalad spread of local anesthetic; Total spinal → intravascular injection/systemic absorption; LAST → CSF leak from dural puncture',
          'Post-dural puncture headache → CSF leak from dural puncture; Total spinal → intravascular injection/systemic absorption; LAST → excessive cephalad spread of local anesthetic',
          'Post-dural puncture headache → intravascular injection/systemic absorption; Total spinal → CSF leak from dural puncture; LAST → excessive cephalad spread of local anesthetic',
          'Post-dural puncture headache → CSF leak from dural puncture; Total spinal → excessive cephalad spread of local anesthetic; LAST → intravascular injection/systemic absorption',
        ],
        correctIndex: 3,
        explanation:
          'Post-dural puncture headache follows CSF leakage through a dural puncture defect, classically postural and improved by lying flat; a "total spinal" results from excessive cephalad spread of local anesthetic causing widespread sympathetic/motor/respiratory paralysis; LAST results from intravascular injection or excessive systemic absorption of local anesthetic.',
        reference: "Miller's Anesthesia",
        difficulty: 'Medium',
        type: 'match-following',
        tags: ['regional-anesthesia-complications'],
        matchPairs: [
          { left: 'Post-dural puncture headache', right: 'CSF leak from dural puncture' },
          { left: 'Total spinal', right: 'Excessive cephalad spread' },
          { left: 'LAST', right: 'Intravascular injection/absorption' },
        ],
      },
    ],
  },
  {
    id: 'critical-care-resuscitation',
    name: 'Critical Care & Resuscitation',
    description: 'ACLS algorithms, mechanical ventilation, and shock management.',
    questions: [
      {
        id: 'anes-9',
        text: 'In adult cardiac arrest with a shockable rhythm (ventricular fibrillation), the priority action per ACLS is:',
        options: [
          'Immediate administration of amiodarone before any defibrillation attempt',
          'Immediate defibrillation, with high-quality CPR minimizing interruptions',
          'Wait for a 12-lead ECG before acting',
          'Endotracheal intubation before any other intervention',
        ],
        correctIndex: 1,
        explanation:
          'For shockable rhythms (VF/pulseless VT), immediate defibrillation is the priority, combined with high-quality, minimally interrupted chest compressions; antiarrhythmics like amiodarone are given after several defibrillation attempts if the rhythm persists, not before the first shock.',
        reference: 'ACLS (Advanced Cardiac Life Support) Guidelines',
        difficulty: 'Easy',
        type: 'guideline',
        tags: ['acls', 'defibrillation'],
      },
      {
        id: 'anes-10',
        text: 'A mechanically ventilated ARDS patient is managed with low tidal volume ventilation (approximately 6 mL/kg predicted body weight). The rationale is:',
        options: [
          'To reduce the need for PEEP entirely',
          'Low tidal volumes have no evidence-based benefit in ARDS',
          'To minimize ventilator-induced lung injury from alveolar overdistension (volutrauma)',
          'To maximize tidal volume for better oxygenation regardless of pressures',
        ],
        correctIndex: 2,
        explanation:
          'The ARDSNet trial established that low tidal volume ventilation (~6 mL/kg predicted body weight) with plateau pressure limitation reduces mortality in ARDS by minimizing volutrauma/barotrauma-related ventilator-induced lung injury, compared to traditional higher tidal volumes.',
        reference: "Miller's Anesthesia / ARDSNet Trial",
        difficulty: 'Medium',
        type: 'guideline',
        tags: ['ards', 'mechanical-ventilation'],
      },
      {
        id: 'anes-11',
        text: 'A patient in septic shock remains hypotensive despite adequate fluid resuscitation. The first-line vasopressor recommended by current sepsis guidelines is:',
        options: [
          'Epinephrine',
          'Phenylephrine',
          'Norepinephrine',
          'Dopamine',
        ],
        correctIndex: 2,
        explanation:
          'Norepinephrine is the first-line vasopressor recommended by the Surviving Sepsis Campaign guidelines for septic shock refractory to fluid resuscitation, given its favorable balance of alpha (vasoconstrictive) and modest beta (inotropic) effects with a better safety profile than dopamine.',
        reference: 'Surviving Sepsis Campaign Guidelines',
        difficulty: 'Easy',
        type: 'guideline',
        tags: ['septic-shock', 'vasopressors'],
      },
      {
        id: 'anes-12',
        text: 'Assertion (A): Positive end-expiratory pressure (PEEP) improves oxygenation in ARDS.\nReason (R): PEEP keeps alveoli open at end-expiration, preventing repetitive alveolar collapse and reopening (atelectrauma), and increases functional residual capacity.',
        options: [
          'Both A and R are true, and R is the correct explanation of A',
          'Both A and R are true, but R is NOT the correct explanation of A',
          'A is true but R is false',
          'A is false but R is true',
        ],
        correctIndex: 0,
        explanation:
          'PEEP splints alveoli open throughout the respiratory cycle, preventing end-expiratory collapse and the shear injury of repetitive opening/closing (atelectrauma), while also recruiting previously collapsed alveolar units and increasing functional residual capacity — together improving oxygenation and ventilation-perfusion matching in ARDS.',
        reference: "Miller's Anesthesia",
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['peep', 'ards'],
      },
    ],
  },
]
