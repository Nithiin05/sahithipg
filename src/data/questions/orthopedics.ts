import type { Topic } from '../../types'

export const orthopedicsTopics: Topic[] = [
  {
    id: 'fractures-trauma',
    name: 'Fractures & Trauma',
    description: 'Fracture classification, healing, and common injury patterns.',
    questions: [
      {
        id: 'ortho-1',
        text: "A 64-year-old woman with osteoporosis falls on an outstretched hand and sustains a fracture of the distal radius with dorsal displacement and angulation of the distal fragment. This classic injury is called:",
        options: [
          'Galeazzi fracture',
          'Monteggia fracture',
          'Colles fracture',
          "Smith's fracture",
        ],
        correctIndex: 2,
        explanation:
          "A Colles fracture is a distal radius fracture with dorsal displacement/angulation of the distal fragment (\"dinner-fork\" deformity), classically after a fall on an outstretched hand in an older woman with osteoporotic bone. Smith's fracture is the reverse (volar angulation). In children, the same mechanism more often produces a torus (buckle) or greenstick fracture.",
        reference: 'Apley\'s System of Orthopaedics and Fractures',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['colles-fracture'],
        imageAlt: 'Schematic lateral X-ray diagram showing dorsal angulation of the distal radius fragment',
      },
      {
        id: 'ortho-2',
        text: 'A patient with a supracondylar fracture of the humerus develops a pale, pulseless, painful forearm with progressive weakness. This raises concern for:',
        options: [
          'Compartment syndrome / brachial artery injury (risk of Volkmann ischemic contracture)',
          'Cubitus varus malunion (late cosmetic deformity, no acute vascular compromise)',
          'Isolated radial nerve palsy (wrist drop, pulses and capillary refill normal)',
          'Isolated median (anterior interosseous) nerve injury with normal distal pulses',
        ],
        correctIndex: 0,
        explanation:
          'Supracondylar humeral fractures (common in children) risk injury to the brachial artery and/or compartment syndrome; the "5 Ps" (pain, pallor, pulselessness, paresthesia, paralysis) are red flags for impending Volkmann ischemic contracture, requiring urgent surgical evaluation/fasciotomy.',
        reference: "Apley's System of Orthopaedics and Fractures",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['compartment-syndrome'],
        clinicalPearl: 'Compartment syndrome pain is classically OUT OF PROPORTION to the injury and worsens with passive stretch of the involved muscles.',
      },
      {
        id: 'ortho-3',
        text: 'Which stage of fracture healing is characterized by formation of a soft, cartilaginous callus bridging the fracture ends?',
        options: [
          "Soft (fibrocartilaginous) callus",
          "Hard (bony) callus",
          "Haematoma and inflammation",
          "Remodelling",
        ],
        correctIndex: 0,
        explanation:
          'Fracture healing progresses through: hematoma formation → soft (fibrocartilaginous) callus → hard (bony) callus (via endochondral ossification) → remodeling. The soft callus stage provides initial, though weak, stability bridging the fracture gap.',
        reference: "Apley's System of Orthopaedics and Fractures",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['fracture-healing'],
      },
      {
        id: 'ortho-4',
        text: 'Assertion (A): Open (compound) fractures require urgent surgical debridement and antibiotic prophylaxis.\nReason (R): Breach of the skin creates a direct communication with the fracture site, dramatically increasing infection (osteomyelitis) risk.',
        options: [
          'Both A and R are true, and R is the correct explanation of A',
          'Both A and R are true, but R is NOT the correct explanation of A',
          'A is true but R is false',
          'A is false but R is true',
        ],
        correctIndex: 0,
        explanation:
          'In open fractures, the skin/soft tissue breach directly exposes bone to the environment and contaminants, dramatically raising infection risk; hence urgent thorough wound debridement, irrigation, fracture stabilization, and early broad-spectrum antibiotics (per Gustilo-Anderson classification-guided protocols) are standard of care.',
        reference: "Apley's System of Orthopaedics and Fractures",
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['open-fractures'],
      },
    ],
  },
  {
    id: 'bone-joint-infections',
    name: 'Bone & Joint Infections',
    description: 'Osteomyelitis and septic arthritis.',
    questions: [
      {
        id: 'ortho-5',
        text: 'The most common causative organism of acute hematogenous osteomyelitis in children (without sickle cell disease) is:',
        options: [
          'Pseudomonas aeruginosa',
          'Mycobacterium tuberculosis',
          'Salmonella species',
          'Staphylococcus aureus',
        ],
        correctIndex: 3,
        explanation:
          'Staphylococcus aureus is the most common cause of acute hematogenous osteomyelitis across most age groups; Salmonella is classically associated with osteomyelitis in patients with sickle cell disease, though S. aureus remains common even in that population.',
        reference: "Apley's System of Orthopaedics and Fractures",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['osteomyelitis'],
      },
      {
        id: 'ortho-6',
        text: 'A 4-year-old presents with acute hip pain, refusal to bear weight, fever, and a hip held in flexion/abduction/external rotation, with elevated ESR/CRP. Emergency management priority is to rule out:',
        options: [
          'Transient synovitis of the hip (self-limited, no urgent aspiration needed)',
          'Slipped capital femoral epiphysis (typically presents in adolescents, not this age group)',
          'Septic arthritis of the hip (requiring urgent aspiration/drainage)',
          'Legg-Calvé-Perthes disease (avascular necrosis of the femoral head)',
        ],
        correctIndex: 2,
        explanation:
          'Septic arthritis of the hip is an orthopedic emergency because rapid cartilage destruction can occur within hours; the Kocher criteria (fever, non-weight-bearing, elevated ESR/CRP, elevated WBC) help distinguish it from the more benign, self-limited transient synovitis, but suspicion should prompt urgent joint aspiration.',
        reference: "Apley's System of Orthopaedics and Fractures",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['septic-arthritis'],
      },
      {
        id: 'ortho-7',
        text: 'Chronic osteomyelitis is characterized radiographically by the presence of:',
        options: [
          'Onion-skin periosteal reaction (lamellated periosteal new bone, classic for Ewing sarcoma)',
          'Sequestrum (dead bone) and involucrum (new bone formation around it)',
          'Ground-glass appearance with bone expansion (classic for fibrous dysplasia)',
          'Codman triangle (periosteal reaction at the tumor margin, classic for osteosarcoma)',
        ],
        correctIndex: 1,
        explanation:
          'Chronic osteomyelitis classically shows a sequestrum (necrotic, devascularized bone fragment) surrounded by an involucrum (living reactive new bone laid down by the periosteum), reflecting a persistent, walled-off infection resistant to antibiotics alone and often requiring surgical debridement.',
        reference: "Apley's System of Orthopaedics and Fractures",
        difficulty: 'Medium',
        type: 'standard',
        tags: ['chronic-osteomyelitis'],
      },
      {
        id: 'ortho-8',
        text: 'Match each bone/joint infection scenario with its most likely organism:',
        options: [
          'Sickle cell disease patient with osteomyelitis → Pasteurella multocida; IV drug user with vertebral osteomyelitis → Salmonella; Cat/dog bite wound infection → Staphylococcus aureus',
          'Sickle cell disease patient with osteomyelitis → Salmonella; IV drug user with vertebral osteomyelitis → Staphylococcus aureus (most common overall); Cat/dog bite wound infection → Pasteurella multocida',
          'Sickle cell disease patient with osteomyelitis → Staphylococcus aureus only; IV drug user with vertebral osteomyelitis → Pseudomonas aeruginosa exclusively; Cat/dog bite wound infection → Streptococcus pyogenes',
          'Sickle cell disease patient with osteomyelitis → Salmonella; IV drug user with vertebral osteomyelitis → Pasteurella multocida; Cat/dog bite wound infection → Staphylococcus aureus',
        ],
        correctIndex: 1,
        explanation:
          'Salmonella osteomyelitis is classically over-represented in sickle cell disease (though S. aureus remains the single most common cause even here); IV drug users are at risk for vertebral osteomyelitis (often S. aureus, sometimes Pseudomonas); Pasteurella multocida is classic after cat/dog bites due to oral flora inoculation.',
        reference: "Apley's System of Orthopaedics and Fractures / Harrison's",
        difficulty: 'Medium',
        type: 'match-following',
        tags: ['osteomyelitis-organisms'],
        matchPairs: [
          { left: 'Sickle cell disease + osteomyelitis', right: 'Salmonella (classic association)' },
          { left: 'Vertebral osteomyelitis (general)', right: 'Staphylococcus aureus' },
          { left: 'Cat/dog bite infection', right: 'Pasteurella multocida' },
        ],
      },
    ],
  },
  {
    id: 'metabolic-bone-disease',
    name: 'Metabolic Bone Disease',
    description: 'Rickets, osteoporosis, and osteomalacia.',
    questions: [
      {
        id: 'ortho-9',
        text: 'A toddler presents with bowing of the legs, widened wrists, a "rachitic rosary," and delayed closure of fontanelles. This is classic for:',
        options: [
          'Scurvy',
          'Osteogenesis imperfecta',
          'Achondroplasia',
          'Rickets (vitamin D deficiency)',
        ],
        correctIndex: 3,
        explanation:
          'Rickets (vitamin D or calcium/phosphate deficiency, or renal/hepatic causes) impairs mineralization of the growing skeleton, causing bowing of long bones, widened wrists/ankles (metaphyseal flaring), rachitic rosary (costochondral junction swelling), and delayed fontanelle closure.',
        reference: 'Nelson Textbook of Pediatrics / Apley\'s System of Orthopaedics',
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['rickets'],
      },
      {
        id: 'ortho-10',
        text: 'A postmenopausal woman has a DEXA T-score of -2.7 at the femoral neck. This corresponds to:',
        options: [
          'Osteoporosis (T-score ≤ -2.5)',
          'Normal bone density',
          'Osteomalacia specifically',
          'Osteopenia only (T-score -1.0 to -2.5)',
        ],
        correctIndex: 0,
        explanation:
          'WHO criteria define osteoporosis as a T-score of -2.5 or lower; osteopenia is defined as a T-score between -1.0 and -2.5. A T-score of -2.7 therefore meets criteria for osteoporosis, warranting consideration of pharmacologic therapy (e.g., bisphosphonates) alongside calcium/vitamin D.',
        reference: 'WHO DEXA Criteria / Harrison\'s Principles of Internal Medicine',
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['osteoporosis', 'dexa'],
      },
      {
        id: 'ortho-11',
        text: 'Osteomalacia differs from osteoporosis primarily in that osteomalacia involves:',
        options: [
          'Only affects cortical bone, never trabecular bone',
          'Defective mineralization of normally-formed osteoid (bone matrix)',
          'Reduced overall bone mass with normal mineralization',
          'Is exclusively a pediatric condition',
        ],
        correctIndex: 1,
        explanation:
          'Osteomalacia (the adult counterpart of rickets) involves impaired mineralization of newly formed osteoid — typically from vitamin D deficiency or phosphate wasting — leaving excess unmineralized bone matrix; osteoporosis, by contrast, involves reduced bone mass with normally mineralized bone.',
        reference: "Harrison's Principles of Internal Medicine",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['osteomalacia'],
      },
      {
        id: 'ortho-12',
        text: "Assertion (A): Bisphosphonates are first-line pharmacotherapy for postmenopausal osteoporosis.\nReason (R): Bisphosphonates act by stimulating osteoblasts to lay down new bone.",
        options: [
          "Both A and R are true, and R is the correct explanation of A",
          "Both A and R are true, but R is NOT the correct explanation of A",
          "A is true but R is false",
          "A is false but R is true",
        ],
        correctIndex: 2,
        explanation:
          "A is true: oral or IV bisphosphonates are first-line for postmenopausal osteoporosis. R is false: bisphosphonates are anti-resorptive. They bind hydroxyapatite and are taken up by osteoclasts, where nitrogen-containing agents inhibit farnesyl pyrophosphate synthase and impair osteoclast function. Anabolic (bone-forming) agents are teriparatide and romosozumab.",
        reference: "Harrison's Principles of Internal Medicine",
        difficulty: 'Hard',
        type: 'assertion-reason',
        tags: ['bisphosphonates'],
      },
    ],
  },
]

