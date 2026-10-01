import type { Topic } from '../../types'

export const dermatologyTopics: Topic[] = [
  {
    id: 'infections-infestations',
    name: 'Infections & Infestations',
    description: 'Bacterial, fungal, and parasitic skin conditions.',
    questions: [
      {
        id: 'derm-1',
        text: 'A child presents with honey-colored crusted lesions around the mouth and nose. The most likely diagnosis and causative organism are:',
        options: [
          'Cellulitis (Pseudomonas aeruginosa)',
          'Tinea corporis (dermatophyte infection)',
          'Impetigo (Staphylococcus aureus)',
          'Herpes zoster (varicella-zoster virus)',
        ],
        correctIndex: 2,
        explanation:
          'Impetigo classically presents with honey-colored crusted lesions, most commonly caused by Staphylococcus aureus (and sometimes Streptococcus pyogenes), typically affecting the face in children; treatment is topical or oral antibiotics depending on extent.',
        reference: 'IADVL Textbook of Dermatology',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['impetigo'],
      },
      {
        id: 'derm-2',
        text: 'Intensely pruritic burrows in the finger web spaces, worse at night, with similar symptoms in family members, suggests:',
        options: [
          'Scabies (Sarcoptes scabiei infestation)',
          'Atopic dermatitis (endogenous eczema)',
          'Allergic contact dermatitis (new soap)',
          'Tinea corporis (dermatophyte infection)',
        ],
        correctIndex: 0,
        explanation:
          'Scabies classically causes intensely pruritic (especially nocturnal) burrows in the finger web spaces, wrists, and other characteristic sites, often affecting multiple household/close contacts simultaneously; treatment includes topical permethrin with treatment of close contacts.',
        reference: 'IADVL Textbook of Dermatology',
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['scabies'],
      },
      {
        id: 'derm-3',
        text: 'A well-demarcated, annular, scaly plaque with central clearing and an active, raised border on the trunk suggests:',
        options: [
          "Tinea corporis",
          "Pityriasis rosea",
          "Nummular eczema",
          "Psoriasis vulgaris",
        ],
        correctIndex: 0,
        explanation:
          'Tinea corporis classically presents as an annular, scaly plaque with a raised, active border and central clearing, confirmed by potassium hydroxide (KOH) microscopy showing septate hyphae; treatment is topical or oral antifungals depending on extent.',
        reference: 'IADVL Textbook of Dermatology',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['tinea-corporis'],
      },
      {
        id: 'derm-4',
        text: "Assertion (A): Leprosy can cause anaesthetic skin patches.\nReason (R): Leprosy is transmitted mainly by nasal droplets from untreated multibacillary patients.",
        options: [
          "Both A and R are true, and R is the correct explanation of A",
          "Both A and R are true, but R is NOT the correct explanation of A",
          "A is true but R is false",
          "A is false but R is true",
        ],
        correctIndex: 1,
        explanation:
          "Both are true, but R does not explain A. The patches are anaesthetic because Mycobacterium leprae infects Schwann cells and damages cutaneous nerves, especially in cooler areas. R describes how the disease spreads.",
        reference: 'IADVL Textbook of Dermatology',
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['leprosy'],
      },
    ],
  },
  {
    id: 'papulosquamous-autoimmune',
    name: 'Papulosquamous & Autoimmune Disorders',
    description: 'Psoriasis, pemphigus, and lichen planus.',
    questions: [
      {
        id: 'derm-5',
        text: 'Auspitz sign (pinpoint bleeding when scale is removed) is classically associated with:',
        options: [
          'Atopic dermatitis',
          'Lichen planus',
          'Psoriasis',
          'Pemphigus vulgaris',
        ],
        correctIndex: 2,
        explanation:
          'Auspitz sign — pinpoint bleeding points revealed after scale removal — reflects the thinned suprapapillary epidermis and dilated dermal papillary capillaries characteristic of psoriasis, alongside other classic findings like the Koebner phenomenon.',
        reference: 'IADVL Textbook of Dermatology',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['psoriasis'],
      },
      {
        id: 'derm-6',
        text: 'A patient has flaccid, easily ruptured bullae on the skin and oral mucosa, with a positive Nikolsky sign. Biopsy shows suprabasal acantholysis. The diagnosis is:',
        options: [
          'Pemphigus vulgaris',
          'Erythema multiforme',
          'Dermatitis herpetiformis',
          'Bullous pemphigoid',
        ],
        correctIndex: 0,
        explanation:
          'Pemphigus vulgaris, caused by autoantibodies against desmoglein-3 (and often desmoglein-1), produces flaccid, fragile bullae with a positive Nikolsky sign (extension of blister with lateral pressure) and suprabasal acantholysis on histology; mucosal involvement is common and often the presenting feature.',
        reference: 'IADVL Textbook of Dermatology',
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['pemphigus-vulgaris'],
        clinicalPearl: 'Pemphigus vulgaris: flaccid bullae, Nikolsky POSITIVE, suprabasal split. Bullous pemphigoid: tense bullae, Nikolsky NEGATIVE, subepidermal split.',
      },
      {
        id: 'derm-7',
        text: 'Wickham striae (fine white lines on the surface of papules) are a classic finding in:',
        options: [
          'Molluscum contagiosum',
          'Psoriasis',
          'Lichen planus',
          'Pityriasis versicolor',
        ],
        correctIndex: 2,
        explanation:
          'Lichen planus classically presents with the "6 Ps" (Pruritic, Purple, Polygonal, Planar, Papules, Plaques) and Wickham striae — fine white lace-like lines on the papule surface, best seen with mineral oil application.',
        reference: 'IADVL Textbook of Dermatology',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['lichen-planus'],
      },
      {
        id: 'derm-8',
        text: 'Match each blistering/papulosquamous disease with its key diagnostic feature:',
        options: [
          'Pemphigus vulgaris → suprabasal acantholysis with positive Nikolsky sign; Bullous pemphigoid → subepidermal blister with tense bullae; Psoriasis → Auspitz sign with silvery scale',
          'Pemphigus vulgaris → Auspitz sign with silvery scale; Bullous pemphigoid → subepidermal blister with tense bullae; Psoriasis → suprabasal acantholysis with positive Nikolsky sign',
          'Pemphigus vulgaris → suprabasal acantholysis with positive Nikolsky sign; Bullous pemphigoid → Auspitz sign with silvery scale; Psoriasis → subepidermal blister with tense bullae',
          'Pemphigus vulgaris → subepidermal blister with tense bullae; Bullous pemphigoid → suprabasal acantholysis with positive Nikolsky sign; Psoriasis → Auspitz sign with silvery scale',
        ],
        correctIndex: 0,
        explanation:
          'Pemphigus vulgaris shows suprabasal acantholysis (intraepidermal split) with flaccid bullae and positive Nikolsky sign; bullous pemphigoid shows a subepidermal split producing tense, intact bullae with negative Nikolsky; psoriasis shows epidermal hyperproliferation with silvery scale and a positive Auspitz sign.',
        reference: 'IADVL Textbook of Dermatology',
        difficulty: 'Medium',
        type: 'match-following',
        tags: ['bullous-disorders'],
        matchPairs: [
          { left: 'Pemphigus vulgaris', right: 'Suprabasal acantholysis, Nikolsky +' },
          { left: 'Bullous pemphigoid', right: 'Subepidermal blister, tense bullae' },
          { left: 'Psoriasis', right: 'Auspitz sign, silvery scale' },
        ],
      },
    ],
  },
  {
    id: 'pigmentary-adnexal',
    name: 'Pigmentary & Adnexal Disorders',
    description: 'Vitiligo, acne, and hair/nail disorders.',
    questions: [
      {
        id: 'derm-9',
        text: 'Vitiligo results from selective destruction of which skin cell type?',
        options: [
          'Langerhans cells',
          'Melanocytes',
          'Keratinocytes',
          'Fibroblasts',
        ],
        correctIndex: 1,
        explanation:
          'Vitiligo is an acquired depigmenting disorder caused by autoimmune destruction of melanocytes, producing well-demarcated depigmented (chalk-white) macules and patches, often with a symmetric distribution and possible association with other autoimmune conditions.',
        reference: 'IADVL Textbook of Dermatology',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['vitiligo'],
      },
      {
        id: 'derm-10',
        text: 'A teenager presents with comedones, papules, pustules, and occasional nodules on the face/back. First-line management for mild-to-moderate acne includes:',
        options: [
          'Comedone extraction as sole first-line therapy',
          'Oral isotretinoin as first-line for all severities',
          'Oral corticosteroids as first-line therapy',
          'Topical retinoids plus benzoyl peroxide and/or antibiotics',
        ],
        correctIndex: 3,
        explanation:
          'Mild-to-moderate acne is typically managed first with topical retinoids (comedolytic) combined with topical benzoyl peroxide and/or topical antibiotics; oral isotretinoin is reserved for severe, nodulocystic, or treatment-resistant acne given its side-effect profile and teratogenicity.',
        reference: 'IADVL Textbook of Dermatology',
        difficulty: 'Easy',
        type: 'guideline',
        tags: ['acne-vulgaris'],
      },
      {
        id: 'derm-11',
        text: 'Pitting of the nails, oil-drop discoloration, and onycholysis are classically associated with which systemic condition?',
        options: [
          'Iron deficiency anemia (nutritional deficiency)',
          'Vitamin B12 deficiency (nutritional deficiency)',
          'Onychomycosis without associated systemic disease',
          'Psoriasis (with or without psoriatic arthritis)',
        ],
        correctIndex: 3,
        explanation:
          'Nail pitting, the "oil-drop" sign (a translucent yellow-red discoloration under the nail plate), and onycholysis (nail plate separation) are classic nail findings in psoriasis, and their presence should raise consideration for associated psoriatic arthritis.',
        reference: 'IADVL Textbook of Dermatology',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['nail-changes', 'psoriasis'],
      },
      {
        id: 'derm-12',
        text: 'Assertion (A): Vitiligo is often associated with other autoimmune diseases such as autoimmune thyroiditis.\nReason (R): Vitiligo shares an autoimmune pathogenic mechanism in which the immune system targets a specific self-antigen (melanocyte antigens).',
        options: [
          'Both A and R are true, and R is the correct explanation of A',
          'Both A and R are true, but R is NOT the correct explanation of A',
          'A is true but R is false',
          'A is false but R is true',
        ],
        correctIndex: 0,
        explanation:
          'Vitiligo is understood to be autoimmune in nature, with T-cell mediated destruction of melanocytes; patients with vitiligo have an increased incidence of other autoimmune conditions (autoimmune thyroiditis, pernicious anemia, Addison disease), reflecting a shared predisposition to autoimmunity.',
        reference: 'IADVL Textbook of Dermatology',
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['vitiligo', 'autoimmunity'],
      },
    ],
  },
]
