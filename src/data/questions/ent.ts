import type { Topic } from '../../types'

export const entTopics: Topic[] = [
  {
    id: 'ear-disorders',
    name: 'Ear Disorders',
    description: 'Otitis media, hearing loss, and vertigo.',
    questions: [
      {
        id: 'ent-1',
        text: 'A Rinne test shows bone conduction louder than air conduction (negative Rinne) in the left ear, and Weber lateralizes to the same (left) ear. This suggests:',
        options: [
          'Sensorineural hearing loss in the right ear',
          'Sensorineural hearing loss in the left ear',
          'Conductive hearing loss in the left ear',
          'Normal hearing bilaterally',
        ],
        correctIndex: 2,
        explanation:
          'A negative Rinne (BC > AC) indicates conductive hearing loss in that ear; Weber lateralizing TO the affected ear confirms a conductive process (sound is perceived louder in the ear with impaired air conduction pathway). In sensorineural loss, Weber lateralizes AWAY from the affected ear.',
        reference: "Dhingra's Diseases of Ear, Nose and Throat",
        difficulty: 'Medium',
        type: 'standard',
        tags: ['hearing-tests'],
      },
      {
        id: 'ent-2',
        text: 'A child with recurrent acute otitis media develops a retracted, dull tympanic membrane with a foul-smelling discharge and a visible attic perforation. This raises concern for:',
        options: [
          'Eustachian tube dysfunction without infection',
          'Cholesteatoma',
          'Otitis externa alone',
          'Simple acute otitis media without complication',
        ],
        correctIndex: 1,
        explanation:
          'Cholesteatoma (abnormal keratinizing squamous epithelium in the middle ear) classically presents with a foul-smelling discharge and an attic (pars flaccida) perforation/retraction pocket, and can erode adjacent bone — requiring surgical management to prevent complications like mastoiditis or intracranial spread.',
        reference: "Dhingra's Diseases of Ear, Nose and Throat",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['cholesteatoma'],
      },
      {
        id: 'ent-3',
        text: 'A patient presents with sudden severe vertigo, nausea, and brief episodes of torsional (rotatory) nystagmus lasting seconds to a minute, triggered by head position changes (e.g., rolling over in bed), with a positive Dix-Hallpike test. The diagnosis is:',
        options: [
          'Vestibular schwannoma',
          'Acute vestibular neuritis',
          "Meniere's disease",
          'Benign paroxysmal positional vertigo (BPPV)',
        ],
        correctIndex: 3,
        explanation:
          'BPPV, caused by displaced otoconia (canalithiasis) in the semicircular canals — most commonly the posterior canal — produces brief, positionally-triggered vertigo with torsional, upbeating nystagmus, confirmed by a positive Dix-Hallpike maneuver; it is managed with canalith repositioning maneuvers (e.g., Epley maneuver) rather than long-term medication.',
        reference: "Dhingra's Diseases of Ear, Nose and Throat",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['bppv', 'vertigo'],
      },
      {
        id: 'ent-4',
        text: "Assertion (A): Meniere's disease presents with episodic vertigo, fluctuating sensorineural hearing loss and tinnitus.\nReason (R): Meniere's disease most commonly begins in adults aged 40–60 years.",
        options: [
          "Both A and R are true, and R is the correct explanation of A",
          "Both A and R are true, but R is NOT the correct explanation of A",
          "A is true but R is false",
          "A is false but R is true",
        ],
        correctIndex: 1,
        explanation:
          "Both are true, but R does not explain A. The symptoms arise from endolymphatic hydrops distending the membranous labyrinth. R is an epidemiological fact about age of onset.",
        reference: "Dhingra's Diseases of Ear, Nose and Throat",
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['menieres-disease'],
      },
    ],
  },
  {
    id: 'nose-paranasal-sinuses',
    name: 'Nose & Paranasal Sinuses',
    description: 'Sinusitis, epistaxis, and nasal polyps.',
    questions: [
      {
        id: 'ent-5',
        text: 'The most common site of epistaxis (nosebleed), especially in children, is:',
        options: [
          'The nasopharynx',
          "Little's area (Kiesselbach's plexus) on the anterior nasal septum",
          'The nasal bridge skin',
          'Posterior nasal cavity via the sphenopalatine artery exclusively',
        ],
        correctIndex: 1,
        explanation:
          "Little's area (Kiesselbach's plexus), a vascular watershed zone on the anterior nasal septum, is the source of over 90% of epistaxis cases, particularly in children, and is usually amenable to direct pressure/cautery.",
        reference: "Dhingra's Diseases of Ear, Nose and Throat",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['epistaxis'],
      },
      {
        id: 'ent-6',
        text: 'A patient with facial pain/pressure over the maxillary region, purulent nasal discharge, and symptoms persisting beyond 10 days is most likely diagnosed with:',
        options: [
          'Acute bacterial rhinosinusitis',
          'Simple viral upper respiratory infection lasting under 5 days',
          'Allergic rhinitis alone',
          'Nasal foreign body',
        ],
        correctIndex: 0,
        explanation:
          'Persistent purulent nasal discharge and facial pain beyond 10 days (or worsening after initial improvement — "double-worsening") favors acute bacterial rhinosinusitis over a simple viral URI, which typically improves within 7-10 days.',
        reference: "Dhingra's Diseases of Ear, Nose and Throat",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['sinusitis'],
      },
      {
        id: 'ent-7',
        text: 'Bilateral nasal polyps in a young patient, together with recurrent sinopulmonary infections, should raise suspicion for underlying:',
        options: [
          'Nasal septal deviation',
          'Cystic fibrosis',
          'Adenoid hypertrophy only',
          'Simple allergic rhinitis alone',
        ],
        correctIndex: 1,
        explanation:
          'Bilateral nasal polyps in a child/young adult, especially with recurrent chest infections and failure to thrive, should prompt evaluation for cystic fibrosis, which causes thick mucus predisposing to chronic sinonasal and pulmonary disease.',
        reference: "Dhingra's Diseases of Ear, Nose and Throat",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['nasal-polyps', 'cystic-fibrosis'],
      },
      {
        id: 'ent-8',
        text: 'Match each paranasal sinus with the age at which it is present/pneumatized:',
        options: [
          'Maxillary and ethmoid sinuses → present at birth; Sphenoid sinus → develops by 7-8 years; Frontal sinus → pneumatizes fully by adolescence',
          'Frontal sinus → present at birth; Maxillary and ethmoid sinuses → develop by 7-8 years; Sphenoid sinus → pneumatizes fully by adolescence',
          'Maxillary and ethmoid sinuses → present at birth; Frontal sinus → develops by 7-8 years; Sphenoid sinus → pneumatizes fully by adolescence',
          'Maxillary, ethmoid, frontal, and sphenoid sinuses → all present and fully pneumatized at birth',
        ],
        correctIndex: 2,
        explanation:
          'Maxillary and ethmoid sinuses are present (though small) at birth; the frontal sinus begins developing around age 7-8 and continues into adolescence; the sphenoid sinus pneumatizes gradually, reaching adult size around puberty — relevant to why frontal/sphenoid sinusitis is rare in young children.',
        reference: "Dhingra's Diseases of Ear, Nose and Throat",
        difficulty: 'Medium',
        type: 'match-following',
        tags: ['paranasal-sinus-development'],
        matchPairs: [
          { left: 'Maxillary & ethmoid sinuses', right: 'Present at birth' },
          { left: 'Frontal sinus', right: 'Develops by ~7-8 years' },
          { left: 'Sphenoid sinus', right: 'Pneumatizes fully by adolescence' },
        ],
      },
    ],
  },
  {
    id: 'throat-head-neck',
    name: 'Throat & Head-Neck',
    description: 'Tonsillitis, laryngeal disease, and head-neck malignancy.',
    questions: [
      {
        id: 'ent-9',
        text: "A 9-year-old has had 7 documented episodes of severe tonsillitis in the past year, each treated with antibiotics and causing school absence. The most appropriate next step is:",
        options: [
          "Tonsillectomy, as the episode frequency meets the Paradise criteria",
          "Watchful waiting for another 12 months before considering surgery",
          "Long-term penicillin prophylaxis as definitive management",
          "Adenoidectomy alone",
        ],
        correctIndex: 0,
        explanation:
          "Recurrent tonsillitis meeting the Paradise criteria (≥7 documented episodes in 1 year, ≥5 per year for 2 years, or ≥3 per year for 3 years) is an accepted indication for tonsillectomy. Watchful waiting is advised for children with fewer episodes. Long-term antibiotic prophylaxis is not a definitive treatment, and adenoidectomy alone does not address recurrent tonsillitis.",
        reference: "Dhingra's Diseases of Ear, Nose and Throat",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['tonsillectomy'],
      },
      {
        id: 'ent-10',
        text: 'A patient with hoarseness for over 3 weeks, especially a smoker, should be evaluated urgently for which condition?',
        options: [
          'Laryngeal carcinoma',
          'Simple viral laryngitis only',
          'Allergic rhinitis',
          'Vocal cord nodules exclusively',
        ],
        correctIndex: 0,
        explanation:
          'Hoarseness persisting beyond 2-3 weeks, particularly in smokers/heavy alcohol users, is a red flag warranting laryngoscopy to exclude laryngeal carcinoma, since early glottic cancers often present with isolated, persistent voice change.',
        reference: "Dhingra's Diseases of Ear, Nose and Throat",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['laryngeal-cancer'],
      },
      {
        id: 'ent-11',
        text: 'A patient with a peritonsillar abscess (quinsy) classically presents with:',
        options: [
          'Sore throat with drooling, high fever, and inspiratory stridor without trismus',
          'Referred otalgia with a normal-appearing oropharynx and no trismus or voice change',
          'Fever with symmetric, non-tender bilateral tonsillar enlargement and a normal voice',
          'Trismus, muffled ("hot potato") voice, and uvular deviation away from the affected side',
        ],
        correctIndex: 3,
        explanation:
          'Peritonsillar abscess classically causes trismus (difficulty opening the mouth from pterygoid muscle irritation), a muffled "hot potato" voice, severe throat pain, and deviation of the uvula away from the affected, bulging peritonsillar region — requiring drainage plus antibiotics.',
        reference: "Dhingra's Diseases of Ear, Nose and Throat",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['peritonsillar-abscess'],
      },
      {
        id: 'ent-12',
        text: "Assertion (A): Most head and neck squamous cell carcinomas are strongly associated with tobacco and alcohol use.\nReason (R): HPV-related oropharyngeal cancer (particularly HPV-16) is an increasingly recognized subtype with a distinct risk profile and generally better prognosis.",
        options: [
          'Both A and R are true, and R is the correct explanation of A',
          'Both A and R are true, but R is NOT the correct explanation of A',
          'A is true but R is false',
          'A is false but R is true',
        ],
        correctIndex: 1,
        explanation:
          'Both statements are independently true — tobacco/alcohol remain the classic risk factors for most head and neck squamous cell carcinomas, and HPV-16 driven oropharyngeal cancer is a distinct, growing subgroup with better prognosis — but R describes a separate epidemiological subtype rather than explaining WHY tobacco/alcohol-related cancers occur, so it is not the direct explanation of A.',
        reference: "Dhingra's Diseases of Ear, Nose and Throat / Harrison's",
        difficulty: 'Hard',
        type: 'assertion-reason',
        tags: ['head-neck-cancer', 'hpv'],
      },
    ],
  },
]
