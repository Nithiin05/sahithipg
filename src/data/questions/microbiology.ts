import type { Topic } from '../../types'

export const microbiologyTopics: Topic[] = [
  {
    id: 'bacteriology',
    name: 'Bacteriology',
    description: 'Gram-positive/negative organisms, toxins, and diagnostics.',
    questions: [
      {
        id: 'micro-1',
        text: 'A throat swab grows beta-hemolytic, catalase-negative, Gram-positive cocci in chains, sensitive to bacitracin. This organism is most likely:',
        options: [
          'Staphylococcus aureus',
          'Streptococcus agalactiae (Group B)',
          'Enterococcus faecalis',
          'Streptococcus pyogenes (Group A strep)',
        ],
        correctIndex: 3,
        explanation:
          'Streptococcus pyogenes (Group A strep) is beta-hemolytic, catalase-negative, and characteristically bacitracin-sensitive — the classic organism causing streptococcal pharyngitis, scarlet fever, and post-infectious complications like rheumatic fever.',
        reference: "Jawetz, Melnick & Adelberg's Medical Microbiology",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['streptococcus'],
      },
      {
        id: 'micro-2',
        text: 'A child develops a pseudomembrane over the tonsils along with myocarditis. The exotoxin responsible acts by:',
        options: [
          'Inhibition of acetylcholine release at the neuromuscular junction',
          'Formation of pores in the cell membrane',
          'ADP-ribosylation of elongation factor-2 (EF-2), halting protein synthesis',
          'Superantigen-mediated massive T-cell activation',
        ],
        correctIndex: 2,
        explanation:
          'Corynebacterium diphtheriae exotoxin (phage-encoded) ADP-ribosylates EF-2, halting host cell protein synthesis — causing the classic grey pseudomembrane and systemic effects like myocarditis and neuropathy.',
        reference: "Jawetz, Melnick & Adelberg's Medical Microbiology",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['diphtheria', 'exotoxins'],
        clinicalPearl: 'Same EF-2 ADP-ribosylation mechanism is used by Pseudomonas aeruginosa exotoxin A.',
      },
      {
        id: 'micro-3',
        text: 'Ghon complex (a subpleural lesion plus ipsilateral hilar lymph node involvement) is the hallmark of:',
        options: [
          'Primary pulmonary tuberculosis',
          'Miliary tuberculosis',
          'Secondary (reactivation) tuberculosis',
          'Pneumocystis pneumonia',
        ],
        correctIndex: 0,
        explanation:
          'The Ghon complex — a peripheral (often subpleural) parenchymal lesion with ipsilateral hilar/mediastinal lymphadenopathy — represents primary TB infection. Secondary (reactivation) TB classically affects the lung apices (Simon focus) without prominent lymphadenopathy.',
        reference: "Jawetz, Melnick & Adelberg's Medical Microbiology",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['tuberculosis'],
      },
      {
        id: 'micro-4',
        text: "Assertion (A): Clostridium tetani exotoxin causes flaccid paralysis.\nReason (R): Tetanospasmin blocks release of the inhibitory neurotransmitters glycine and GABA from inhibitory interneurons in the spinal cord.",
        options: [
          "Both A and R are true, and R is the correct explanation of A",
          "Both A and R are true, but R is NOT the correct explanation of A",
          "A is true but R is false",
          "A is false but R is true",
        ],
        correctIndex: 3,
        explanation:
          "A is false: tetanus causes SPASTIC paralysis (trismus, risus sardonicus, opisthotonus). R is true, and it explains the spasticity: tetanospasmin blocks glycine and GABA release from inhibitory interneurons (including Renshaw cells), removing inhibition of motor neurons. Botulinum toxin, which blocks acetylcholine release at the neuromuscular junction, causes flaccid paralysis.",
        reference: "Jawetz, Melnick & Adelberg's Medical Microbiology",
        difficulty: 'Hard',
        type: 'assertion-reason',
        tags: ['clostridium', 'tetanus'],
      },
    ],
  },
  {
    id: 'virology',
    name: 'Virology',
    description: 'DNA/RNA viruses, viral replication, and antiviral targets.',
    questions: [
      {
        id: 'micro-5',
        text: 'HIV uses reverse transcriptase to convert its genome from:',
        options: [
          'Single-stranded DNA to RNA',
          'Single-stranded RNA to double-stranded DNA',
          'RNA directly into protein without a DNA intermediate',
          'Double-stranded DNA to RNA',
        ],
        correctIndex: 1,
        explanation:
          'HIV is a retrovirus: its reverse transcriptase converts the single-stranded RNA genome into double-stranded proviral DNA, which integrates into the host genome via integrase — the basis for reverse-transcriptase inhibitor drugs.',
        reference: "Jawetz, Melnick & Adelberg's Medical Microbiology",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['hiv', 'retrovirus'],
      },
      {
        id: 'micro-6',
        text: 'A patient with chronic hepatitis B has a positive HBsAg persisting beyond 6 months. Presence of HBeAg additionally indicates:',
        options: [
          'High viral replication and high infectivity',
          'Complete immunity/clearance of infection',
          'Co-infection with hepatitis D exclusively',
          'Vaccination status only, not natural infection',
        ],
        correctIndex: 0,
        explanation:
          'HBeAg is a marker of active viral replication and correlates with high infectivity; its presence in chronic hepatitis B indicates ongoing active disease, whereas anti-HBe seroconversion generally signals lower replication and infectivity.',
        reference: "Jawetz, Melnick & Adelberg's Medical Microbiology",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['hepatitis-b', 'serology'],
      },
      {
        id: 'micro-7',
        text: 'Which virus is the classic cause of subacute sclerosing panencephalitis (SSPE), a late fatal complication years after primary infection?',
        options: [
          'Varicella-zoster virus',
          'Rubella virus',
          'Measles virus',
          'Mumps virus',
        ],
        correctIndex: 2,
        explanation:
          'SSPE is a rare, fatal, delayed complication of measles (rubeola) infection, caused by a persistent, defective measles virus in the CNS, presenting years after the acute illness with progressive neurologic deterioration.',
        reference: "Jawetz, Melnick & Adelberg's Medical Microbiology",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['measles', 'sspe'],
      },
      {
        id: 'micro-8',
        text: 'Match each virus family with a member and its key disease association:',
        options: [
          'Flavivirus → Poliovirus → flaccid paralysis; Togavirus → Dengue virus → hemorrhagic fever; Picornavirus → Rubella virus → congenital rubella syndrome',
          'Flavivirus → Dengue virus → congenital rubella syndrome; Togavirus → Rubella virus → flaccid paralysis; Picornavirus → Poliovirus → hemorrhagic fever',
          'Flavivirus → Dengue virus → hemorrhagic fever; Togavirus → Rubella virus → congenital rubella syndrome; Picornavirus → Poliovirus → flaccid paralysis',
          'Flavivirus → Rubella virus → congenital rubella syndrome; Togavirus → Poliovirus → flaccid paralysis; Picornavirus → Dengue virus → hemorrhagic fever',
        ],
        correctIndex: 2,
        explanation:
          'Dengue virus (Flaviviridae) causes dengue fever/hemorrhagic fever; Rubella virus (Togaviridae) causes congenital rubella syndrome when acquired in early pregnancy; Poliovirus (Picornaviridae) causes asymmetric flaccid paralysis via anterior horn cell destruction.',
        reference: "Jawetz, Melnick & Adelberg's Medical Microbiology",
        difficulty: 'Medium',
        type: 'match-following',
        tags: ['virus-classification'],
        matchPairs: [
          { left: 'Dengue virus (Flavivirus)', right: 'Hemorrhagic fever' },
          { left: 'Rubella virus (Togavirus)', right: 'Congenital rubella syndrome' },
          { left: 'Poliovirus (Picornavirus)', right: 'Flaccid paralysis' },
        ],
      },
    ],
  },
  {
    id: 'parasitology-mycology',
    name: 'Parasitology & Mycology',
    description: 'Protozoa, helminths, and medically important fungi.',
    questions: [
      {
        id: 'micro-9',
        text: 'A patient returning from a malaria-endemic area has high, irregular fever with banana/crescent-shaped gametocytes on peripheral smear. This suggests infection with:',
        options: [
          'Plasmodium falciparum',
          'Plasmodium vivax',
          'Plasmodium ovale',
          'Plasmodium malariae',
        ],
        correctIndex: 0,
        explanation:
          'Banana/crescent-shaped gametocytes are pathognomonic of Plasmodium falciparum, which also typically produces a high, irregular (rather than sharply cyclical) fever due to asynchronous erythrocytic schizogony, and carries the highest risk of severe/cerebral malaria. P. vivax and P. ovale gametocytes are round, and their fever is classically a well-defined 48-hour tertian pattern.',
        reference: "Jawetz, Melnick & Adelberg's Medical Microbiology / CDC Malaria",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['malaria'],
      },
      {
        id: 'micro-10',
        text: 'A neutropenic patient develops invasive pulmonary disease with septate, acute-angle branching hyphae on biopsy. The likely organism is:',
        options: [
          'Cryptococcus neoformans',
          'Aspergillus species',
          'Mucor/Rhizopus (mucormycosis)',
          'Candida albicans',
        ],
        correctIndex: 1,
        explanation:
          'Aspergillus shows septate hyphae branching at acute (~45°) angles, classically causing invasive disease in neutropenic/immunocompromised hosts. Mucor/Rhizopus, by contrast, show broad, ribbon-like, non-septate hyphae branching at wide (~90°) angles.',
        reference: "Jawetz, Melnick & Adelberg's Medical Microbiology",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['fungal-infections', 'aspergillus'],
      },
      {
        id: 'micro-11',
        text: 'Adult Wuchereria bancrofti worms residing in lymphatics cause which classic clinical syndrome?',
        options: [
          'Onchocerciasis (river blindness)',
          'Cutaneous larva migrans',
          'Visceral leishmaniasis',
          'Lymphatic filariasis (elephantiasis)',
        ],
        correctIndex: 3,
        explanation:
          'Wuchereria bancrofti (transmitted by Culex mosquitoes) causes lymphatic filariasis, with chronic lymphatic obstruction leading to lymphedema and elephantiasis, often accompanied by tropical pulmonary eosinophilia.',
        reference: "Jawetz, Melnick & Adelberg's Medical Microbiology",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['filariasis'],
      },
      {
        id: 'micro-12',
        text: 'Assertion (A): Entamoeba histolytica can cause both intestinal amoebiasis and amoebic liver abscess.\nReason (R): Trophozoites can invade the colonic mucosa and travel via the portal venous system to the liver.',
        options: [
          'Both A and R are true, and R is the correct explanation of A',
          'Both A and R are true, but R is NOT the correct explanation of A',
          'A is true but R is false',
          'A is false but R is true',
        ],
        correctIndex: 0,
        explanation:
          'E. histolytica trophozoites invade the colonic mucosa (causing amoebic colitis/dysentery) and can enter the portal circulation, seeding the liver to form an "anchovy paste" abscess — the classic extraintestinal manifestation.',
        reference: "Jawetz, Melnick & Adelberg's Medical Microbiology",
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['amoebiasis'],
      },
    ],
  },
]
