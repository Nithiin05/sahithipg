import type { Topic } from '../../types'

export const pathologyTopics: Topic[] = [
  {
    id: 'general-pathology',
    name: 'General Pathology',
    description: 'Cell injury, inflammation, neoplasia, and repair.',
    questions: [
      {
        id: 'path-1',
        text: 'Coagulative necrosis, with preservation of the basic cell/tissue outline for several days, is characteristic of infarction in which organ?',
        options: [
          'Lung (tuberculosis)',
          'Pancreas (acute pancreatitis)',
          'Kidney (ischemic infarct)',
          'Brain (ischemic infarct)',
        ],
        correctIndex: 2,
        explanation:
          'The kidney, like most solid organs (e.g., heart, spleen), undergoes coagulative necrosis after ischemic infarction — protein denaturation predominates over enzymatic digestion, so the basic tissue architecture is preserved for several days. In contrast, the brain undergoes liquefactive necrosis after infarction, pancreatic parenchymal destruction in acute pancreatitis is enzymatic fat necrosis, and caseous necrosis is the classic pattern in tuberculosis.',
        reference: 'Robbins Basic Pathology',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['necrosis'],
      },
      {
        id: 'path-2',
        text: 'A biopsy shows granulomas with central caseous necrosis and Langhans giant cells. This is most consistent with:',
        options: [
          'Sarcoidosis',
          'Wegener granulomatosis (GPA)',
          'Tuberculosis',
          'Crohn disease',
        ],
        correctIndex: 2,
        explanation:
          'Caseating granulomas with Langhans giant cells are the classic histologic hallmark of tuberculosis. Sarcoidosis and Crohn disease typically show NON-caseating granulomas.',
        reference: 'Robbins Basic Pathology',
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['granuloma', 'tuberculosis'],
        clinicalPearl: 'Caseating = TB (usually); non-caseating = sarcoidosis, Crohn, berylliosis, cat-scratch disease.',
      },
      {
        id: 'path-3',
        text: 'The p53 tumor suppressor gene\'s primary function, when lost, contributes to carcinogenesis mainly by:',
        options: [
          'Failure to arrest the cell cycle or trigger apoptosis in cells with DNA damage',
          'Loss of E-cadherin mediated cell adhesion',
          'Overactivation of RAS signaling',
          'Direct telomerase inhibition',
        ],
        correctIndex: 0,
        explanation:
          'p53 ("guardian of the genome") normally halts the cell cycle at G1/S to allow DNA repair, or triggers apoptosis if damage is irreparable. Its loss (as in Li-Fraumeni syndrome, and >50% of human cancers) permits damaged cells to proliferate unchecked.',
        reference: 'Robbins Basic Pathology',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['tumor-suppressor', 'p53'],
      },
      {
        id: 'path-4',
        text: "Assertion (A): Metaplasia is an irreversible change that inevitably progresses to cancer.\nReason (R): Metaplasia is the replacement of one differentiated cell type by another better able to withstand the altered environment.",
        options: [
          "Both A and R are true, and R is the correct explanation of A",
          "Both A and R are true, but R is NOT the correct explanation of A",
          "A is true but R is false",
          "A is false but R is true",
        ],
        correctIndex: 3,
        explanation:
          "A is false: metaplasia is an adaptive change that is generally reversible once the stimulus is removed. Persistent metaplasia (for example Barrett oesophagus) increases the risk of dysplasia, but progression to cancer is not inevitable. R is a correct definition of metaplasia.",
        reference: 'Robbins Basic Pathology',
        difficulty: 'Hard',
        type: 'assertion-reason',
        tags: ['metaplasia'],
      },
    ],
  },
  {
    id: 'systemic-pathology',
    name: 'Systemic Pathology',
    description: 'Organ-system disease patterns — cardiovascular, renal, and GI pathology.',
    questions: [
      {
        id: 'path-5',
        text: 'Which type of myocardial infarction is classically associated with ST-elevation and full-thickness (transmural) necrosis?',
        options: [
          'Transmural infarct from complete coronary occlusion',
          'Reperfusion injury without occlusion',
          'Contraction band necrosis only',
          'Subendocardial infarct from global hypoperfusion',
        ],
        correctIndex: 0,
        explanation:
          'Transmural (full-thickness) infarcts result from complete, sustained occlusion of a coronary artery (typically thrombosis over a ruptured plaque), correlating with ST-elevation MI. Subendocardial infarcts follow severe but incomplete/global hypoperfusion.',
        reference: 'Robbins Basic Pathology',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['myocardial-infarction'],
      },
      {
        id: 'path-6',
        text: 'A renal biopsy in a child with nephrotic syndrome shows normal light microscopy but diffuse podocyte foot process effacement on electron microscopy. The diagnosis is:',
        options: [
          'Focal segmental glomerulosclerosis',
          'Membranous nephropathy',
          'Minimal change disease',
          'Diffuse proliferative glomerulonephritis',
        ],
        correctIndex: 2,
        explanation:
          'Minimal change disease is the most common cause of nephrotic syndrome in children, showing normal glomeruli on light microscopy with diffuse foot process effacement only visible on electron microscopy; it is typically steroid-responsive.',
        reference: 'Robbins Basic Pathology',
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['nephrotic-syndrome'],
      },
      {
        id: 'path-7',
        text: 'Apple-green birefringence under polarized light after Congo red staining is diagnostic of:',
        options: [
          'Hemochromatosis',
          'Pseudogout (CPPD)',
          'Gout (monosodium urate deposition)',
          'Amyloidosis',
        ],
        correctIndex: 3,
        explanation:
          'Congo red staining of amyloid deposits shows characteristic apple-green birefringence under polarized light, the classic confirmatory test for amyloidosis regardless of the underlying amyloid protein subtype.',
        reference: 'Robbins Basic Pathology',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['amyloidosis'],
      },
      {
        id: 'path-8',
        text: 'Match each glomerular disease with its characteristic light-microscopy/immunofluorescence finding:',
        options: [
          "Post-streptococcal GN → subepithelial humps; Membranous nephropathy → GBM thickening with spikes; IgA nephropathy → mesangial IgA deposits",
          "Post-streptococcal GN → GBM thickening with spikes; Membranous nephropathy → subepithelial humps; IgA nephropathy → mesangial IgA deposits",
          "Post-streptococcal GN → mesangial IgA deposits; Membranous nephropathy → GBM thickening with spikes; IgA nephropathy → subepithelial humps",
          "Post-streptococcal GN → subepithelial humps; Membranous nephropathy → mesangial IgA deposits; IgA nephropathy → GBM thickening with spikes",
        ],
        correctIndex: 0,
        explanation:
          'Post-streptococcal GN shows subepithelial "hump-shaped" immune deposits; membranous nephropathy shows diffuse GBM thickening with subepithelial spikes on silver stain; IgA nephropathy (Berger disease) shows mesangial IgA deposition, the most common cause of GN worldwide.',
        reference: 'Robbins Basic Pathology',
        difficulty: 'Medium',
        type: 'match-following',
        tags: ['glomerulonephritis'],
        matchPairs: [
          { left: 'Post-streptococcal GN', right: 'Subepithelial "humps"' },
          { left: 'Membranous nephropathy', right: 'GBM spikes, diffuse thickening' },
          { left: 'IgA nephropathy', right: 'Mesangial IgA deposits' },
        ],
      },
    ],
  },
  {
    id: 'hematology',
    name: 'Hematology & Blood Bank',
    description: 'Anemias, leukemias/lymphomas, and hemostasis disorders.',
    questions: [
      {
        id: 'path-9',
        text: 'A peripheral smear shows microcytic, hypochromic red cells with target cells and a raised RBC count relative to the degree of anemia. This pattern favors:',
        options: [
          'Megaloblastic anemia',
          'Beta-thalassemia trait',
          'Iron deficiency anemia',
          'Hemolytic anemia (warm AIHA)',
        ],
        correctIndex: 1,
        explanation:
          'Thalassemia trait classically shows microcytosis disproportionate to the mild anemia, with a normal or raised RBC count (Mentzer index low), target cells, and basophilic stippling — distinguishing it from iron deficiency, where RBC count is typically reduced.',
        reference: 'Robbins Basic Pathology / Wintrobe\'s Clinical Hematology',
        difficulty: 'Medium',
        type: 'standard',
        tags: ['anemia', 'thalassemia'],
      },
      {
        id: 'path-10',
        text: 'A 55-year-old presents with fatigue and massive splenomegaly. Peripheral smear shows marked leukocytosis with a full spectrum of granulocytic maturation and basophilia. This is most consistent with:',
        options: [
          'Myelodysplastic syndrome',
          'Acute myeloid leukemia',
          'Chronic lymphocytic leukemia',
          'Chronic myeloid leukemia (CML)',
        ],
        correctIndex: 3,
        explanation:
          'CML classically presents with marked leukocytosis showing the full spectrum of myeloid maturation (myeloblasts to mature neutrophils), basophilia, and massive splenomegaly; it is driven by the BCR-ABL1 (Philadelphia chromosome) fusion.',
        reference: 'Robbins Basic Pathology',
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['leukemia', 'cml'],
        highYieldNote: 'CML is treated with tyrosine kinase inhibitors (e.g., imatinib) targeting BCR-ABL1.',
      },
      {
        id: 'path-11',
        text: 'Reed-Sternberg cells (large binucleate cells with prominent "owl-eye" nucleoli) are the diagnostic hallmark of:',
        options: [
          'Diffuse large B-cell lymphoma',
          'Burkitt lymphoma',
          'Follicular lymphoma',
          'Classical Hodgkin lymphoma',
        ],
        correctIndex: 3,
        explanation:
          'Reed-Sternberg cells with their characteristic "owl-eye" binucleate appearance are pathognomonic of classical Hodgkin lymphoma, typically embedded in a background of reactive inflammatory cells.',
        reference: 'Robbins Basic Pathology',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['lymphoma', 'hodgkin'],
      },
      {
        id: 'path-12',
        text: 'Assertion (A): Hemophilia A shows prolonged aPTT with normal PT and bleeding time.\nReason (R): Factor VIII deficiency affects the intrinsic coagulation pathway without affecting platelet function.',
        options: [
          'Both A and R are true, and R is the correct explanation of A',
          'Both A and R are true, but R is NOT the correct explanation of A',
          'A is true but R is false',
          'A is false but R is true',
        ],
        correctIndex: 0,
        explanation:
          'Factor VIII is part of the intrinsic pathway, so its deficiency (hemophilia A) prolongs the aPTT while PT (extrinsic pathway) remains normal; bleeding time and platelet count are normal because primary hemostasis (platelet plug formation) is unaffected.',
        reference: "Robbins Basic Pathology",
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['hemophilia', 'coagulation'],
      },
    ],
  },
]
