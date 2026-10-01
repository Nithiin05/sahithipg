import type { Topic } from '../../types'

export const biochemistryTopics: Topic[] = [
  {
    id: 'enzymes-metabolism',
    name: 'Enzymes & Metabolism',
    description: 'Enzyme kinetics, glycolysis, TCA cycle, and metabolic regulation.',
    questions: [
      {
        id: 'bioc-1',
        text: 'A competitive enzyme inhibitor characteristically causes which change in Km and Vmax on a Lineweaver-Burk plot?',
        options: [
          'Increased Km, unchanged Vmax',
          'Unchanged Km, decreased Vmax',
          'Decreased Km, unchanged Vmax',
          'Decreased Km, decreased Vmax',
        ],
        correctIndex: 0,
        explanation:
          'Competitive inhibitors bind the active site and can be overcome by excess substrate, so Vmax is unchanged but the apparent Km increases (more substrate needed to reach half-maximal velocity).',
        reference: 'Lippincott Illustrated Reviews: Biochemistry',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['enzyme-kinetics'],
      },
      {
        id: 'bioc-2',
        text: 'The rate-limiting, committed step of glycolysis is catalyzed by:',
        options: [
          "Phosphofructokinase-1",
          "Pyruvate kinase",
          "Aldolase",
          "Hexokinase",
        ],
        correctIndex: 0,
        explanation:
          'PFK-1 (fructose-6-phosphate → fructose-1,6-bisphosphate) is the key rate-limiting and regulated step of glycolysis, allosterically activated by AMP/F2,6BP and inhibited by ATP/citrate.',
        reference: 'Lippincott Illustrated Reviews: Biochemistry',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['glycolysis'],
        highYieldNote: 'PFK-1 is the single most important regulatory enzyme of glycolysis.',
      },
      {
        id: 'bioc-3',
        text: 'A neonate presents with severe hypoglycemia, hepatomegaly, and lactic acidosis. Deficiency of glucose-6-phosphatase points to which glycogen storage disease?',
        options: [
          "McArdle disease (Type V)",
          "Von Gierke disease (Type I)",
          "Cori disease (Type III)",
          "Pompe disease (Type II)",
        ],
        correctIndex: 1,
        explanation:
          'Von Gierke disease (GSD type I) is caused by glucose-6-phosphatase deficiency, preventing the final step of both glycogenolysis and gluconeogenesis, causing severe fasting hypoglycemia, hepatomegaly, and lactic acidosis.',
        reference: 'Harper\'s Illustrated Biochemistry',
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['glycogen-storage-disease'],
        clinicalPearl: 'Pompe (Type II, lysosomal alpha-glucosidase) is the one GSD with cardiomegaly; McArdle (Type V) presents with exercise intolerance and myalgia, not hypoglycemia.',
      },
      {
        id: 'bioc-4',
        text: 'Arsenite poisoning inhibits which lipoic acid-dependent enzyme of the TCA cycle, by the same mechanism through which it also inhibits pyruvate dehydrogenase?',
        options: [
          'Isocitrate dehydrogenase',
          'Citrate synthase',
          'Succinate dehydrogenase',
          'Alpha-ketoglutarate dehydrogenase',
        ],
        correctIndex: 3,
        explanation:
          'Arsenite binds and inactivates the lipoic acid (lipoamide) cofactor shared by pyruvate dehydrogenase and alpha-ketoglutarate dehydrogenase, both lipoic acid-dependent multienzyme complexes with an analogous E1-E2-E3 architecture. Within the TCA cycle itself, alpha-ketoglutarate dehydrogenase is the enzyme poisoned, halting the cycle at the alpha-ketoglutarate step and producing the energy failure characteristic of arsenic toxicity.',
        reference: "Harper's Illustrated Biochemistry",
        difficulty: 'Hard',
        type: 'standard',
        tags: ['tca-cycle', 'toxicology'],
      },
    ],
  },
  {
    id: 'molecular-genetics',
    name: 'Molecular Biology & Genetics',
    description: 'DNA replication/repair, transcription, and inheritance patterns.',
    questions: [
      {
        id: 'bioc-5',
        text: 'Xeroderma pigmentosum results from a defect in which DNA repair mechanism?',
        options: [
          'Mismatch repair',
          'Base excision repair',
          'Nucleotide excision repair',
          'Homologous recombination',
        ],
        correctIndex: 2,
        explanation:
          'Xeroderma pigmentosum is caused by defective nucleotide excision repair, which normally removes UV-induced pyrimidine dimers, leading to extreme photosensitivity and skin cancer risk.',
        reference: 'Lippincott Illustrated Reviews: Biochemistry',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['dna-repair'],
      },
      {
        id: 'bioc-6',
        text: 'Hereditary nonpolyposis colorectal cancer (Lynch syndrome) is associated with germline mutations in which repair pathway?',
        options: [
          'Nucleotide excision repair',
          'Base excision repair',
          'Non-homologous end joining',
          'Mismatch repair (e.g., MLH1, MSH2)',
        ],
        correctIndex: 3,
        explanation:
          'Lynch syndrome arises from germline mutations in mismatch repair genes (MLH1, MSH2, MSH6, PMS2), leading to microsatellite instability and increased colorectal and endometrial cancer risk.',
        reference: 'Robbins Basic Pathology',
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['mismatch-repair', 'cancer-genetics'],
      },
      {
        id: 'bioc-7',
        text: 'A pedigree shows an X-linked recessive disorder. Which mating pattern would produce an affected daughter?',
        options: [
          'Affected father × unaffected, non-carrier mother',
          'Affected father × carrier mother',
          'Unaffected father × unaffected, non-carrier mother',
          'Unaffected father × affected mother',
        ],
        correctIndex: 1,
        explanation:
          'For a daughter to be affected by an X-linked recessive condition, she must inherit a mutant allele from both parents: an affected father (who necessarily passes his single mutant X to all daughters) combined with a carrier mother.',
        reference: "Harper's Illustrated Biochemistry",
        difficulty: 'Medium',
        type: 'standard',
        tags: ['inheritance-patterns'],
      },
      {
        id: 'bioc-8',
        text: "Assertion (A): Mitochondrial DNA disorders show maternal (non-Mendelian) inheritance.\nReason (R): Mitochondrial DNA has a higher mutation rate than nuclear DNA because it lacks protective histones and has limited repair.",
        options: [
          "Both A and R are true, and R is the correct explanation of A",
          "Both A and R are true, but R is NOT the correct explanation of A",
          "A is true but R is false",
          "A is false but R is true",
        ],
        correctIndex: 1,
        explanation:
          "Both statements are true, but R does not explain A. Maternal inheritance occurs because the zygote's mitochondria come almost entirely from the ovum (sperm mitochondria are eliminated after fertilisation). R explains why mtDNA mutates frequently, not how it is transmitted.",
        reference: "Harper's Illustrated Biochemistry",
        difficulty: 'Hard',
        type: 'assertion-reason',
        tags: ['mitochondrial-inheritance'],
      },
    ],
  },
  {
    id: 'vitamins-nutrition',
    name: 'Vitamins & Nutrition',
    description: 'Vitamin deficiency states and nutritional biochemistry.',
    questions: [
      {
        id: 'bioc-9',
        text: 'A chronic alcoholic presents with confusion, ataxia, and ophthalmoplegia (Wernicke encephalopathy). Which vitamin deficiency is responsible?',
        options: [
          'Cobalamin (B12)',
          'Niacin (B3)',
          'Thiamine (B1)',
          'Pyridoxine (B6)',
        ],
        correctIndex: 2,
        explanation:
          'Wernicke encephalopathy results from thiamine (vitamin B1) deficiency, classically in alcoholics, presenting with the triad of confusion, ataxia, and ophthalmoplegia/nystagmus; IV thiamine must precede glucose administration.',
        reference: 'Harrison\'s Principles of Internal Medicine',
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['vitamin-deficiency', 'wernicke'],
        clinicalPearl: 'Always give thiamine BEFORE or WITH glucose in a malnourished/alcoholic patient to avoid precipitating Wernicke encephalopathy.',
      },
      {
        id: 'bioc-10',
        text: 'Deficiency of which vitamin causes megaloblastic anemia WITH subacute combined degeneration of the spinal cord (unlike folate deficiency)?',
        options: [
          'Vitamin B12 (cobalamin)',
          'Folate (B9)',
          'Vitamin B2 (riboflavin)',
          'Vitamin B6 (pyridoxine)',
        ],
        correctIndex: 0,
        explanation:
          'Both B12 and folate deficiency cause megaloblastic anemia, but only B12 deficiency causes neurological findings (subacute combined degeneration — dorsal column and corticospinal tract demyelination) due to impaired methylmalonyl-CoA metabolism.',
        reference: "Harrison's Principles of Internal Medicine",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['b12-deficiency'],
      },
      {
        id: 'bioc-11',
        text: 'A patient with carcinoid syndrome develops pellagra-like symptoms (dermatitis, diarrhea, dementia). This is because:',
        options: [
          "Tryptophan is diverted to serotonin synthesis",
          "Carcinoid syndrome causes selective thiamine deficiency",
          "Serotonin directly blocks niacin absorption from the gut",
          "Carcinoid tumours destroy the body’s niacin stores",
        ],
        correctIndex: 0,
        explanation:
          'In carcinoid syndrome, tumor cells shunt large amounts of dietary tryptophan toward serotonin synthesis, depleting the tryptophan otherwise available for endogenous niacin (vitamin B3) synthesis, precipitating a pellagra-like state.',
        reference: "Harrison's Principles of Internal Medicine",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['niacin', 'carcinoid'],
      },
      {
        id: 'bioc-12',
        text: 'Match each vitamin with its classic deficiency disease:',
        options: [
          'Vitamin D → Bleeding diathesis; Vitamin K → Rickets; Vitamin C → Night blindness',
          'Vitamin A → Scurvy; Vitamin C → Rickets; Vitamin K → Night blindness',
          'Vitamin C → Rickets; Vitamin D → Scurvy; Vitamin K → Night blindness',
          'Vitamin C → Scurvy; Vitamin D → Rickets/Osteomalacia; Vitamin K → Bleeding diathesis',
        ],
        correctIndex: 3,
        explanation:
          'Vitamin C deficiency causes scurvy (impaired collagen hydroxylation), vitamin D deficiency causes rickets in children/osteomalacia in adults, and vitamin K deficiency impairs synthesis of clotting factors II, VII, IX, X causing a bleeding diathesis.',
        reference: "Harper's Illustrated Biochemistry",
        difficulty: 'Easy',
        type: 'match-following',
        tags: ['vitamin-deficiency'],
        matchPairs: [
          { left: 'Vitamin C', right: 'Scurvy' },
          { left: 'Vitamin D', right: 'Rickets / Osteomalacia' },
          { left: 'Vitamin K', right: 'Bleeding diathesis' },
        ],
      },
    ],
  },
]
