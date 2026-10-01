import type { Topic } from '../../types'

export const obgTopics: Topic[] = [
  {
    id: 'obstetrics-antenatal-labour',
    name: 'Obstetrics — Antenatal Care & Labour',
    description: 'Normal pregnancy, stages of labour, and antenatal screening.',
    questions: [
      {
        id: 'obg-1',
        text: 'The second stage of labour is defined as the interval from:',
        options: [
          'Onset of true labour pains to full cervical dilatation',
          'Full cervical dilatation to delivery of the baby',
          'Onset of labour to rupture of membranes',
          'Delivery of the baby to delivery of the placenta',
        ],
        correctIndex: 1,
        explanation:
          'The second stage of labour spans from full (10 cm) cervical dilatation to delivery of the fetus. The first stage runs from onset of true labour to full dilatation, and the third stage covers delivery of the placenta and membranes.',
        reference: "Williams Obstetrics / DC Dutta's Textbook of Obstetrics",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['stages-of-labour'],
      },
      {
        id: 'obg-2',
        text: 'A primigravida at 32 weeks has a blood pressure of 150/100 mmHg on two occasions with new-onset proteinuria. This is most consistent with:',
        options: [
          'Normal physiological change of pregnancy',
          'Gestational diabetes',
          'Pre-eclampsia',
          'Chronic hypertension',
        ],
        correctIndex: 2,
        explanation:
          'New-onset hypertension (≥140/90) after 20 weeks gestation with proteinuria (or other end-organ involvement) defines pre-eclampsia — a hypertensive disorder specific to pregnancy requiring close monitoring for progression to eclampsia/HELLP syndrome.',
        reference: "Williams Obstetrics",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['pre-eclampsia'],
        clinicalPearl: 'Magnesium sulfate is the drug of choice for both treatment and prophylaxis of eclamptic seizures.',
      },
      {
        id: 'obg-3',
        text: 'The triple test (or quadruple test) offered in the second trimester screens for which condition?',
        options: [
          'Down syndrome (trisomy 21) and neural tube defects',
          'Rh isoimmunization and neonatal jaundice',
          'Gestational diabetes and fetal macrosomia',
          'Placenta previa and vasa previa',
        ],
        correctIndex: 0,
        explanation:
          'The second-trimester triple test (AFP, hCG, unconjugated estriol; quadruple test adds inhibin-A) is a screening tool estimating risk of Down syndrome and other aneuploidies, and elevated AFP alone can flag neural tube defects.',
        reference: "Williams Obstetrics",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['antenatal-screening'],
      },
      {
        id: 'obg-4',
        text: "Assertion (A): Anti-D immunoglobulin is given to Rh-positive mothers after delivery of an Rh-negative baby.\nReason (R): Anti-D immunoglobulin clears fetal Rh-positive red cells from the maternal circulation before the mother forms her own anti-D antibodies.",
        options: [
          "Both A and R are true, and R is the correct explanation of A",
          "Both A and R are true, but R is NOT the correct explanation of A",
          "A is true but R is false",
          "A is false but R is true",
        ],
        correctIndex: 3,
        explanation:
          "A is false: anti-D is given to Rh-NEGATIVE, unsensitised mothers after delivery of an Rh-POSITIVE baby (and after other sensitising events). R is true and is the reason it works: it removes fetal Rh-positive cells before maternal alloimmunisation, protecting future pregnancies.",
        reference: "Williams Obstetrics",
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['rh-isoimmunization'],
      },
    ],
  },
  {
    id: 'gynecology-menstrual-reproductive',
    name: 'Gynecology — Menstrual & Reproductive Disorders',
    description: 'Menstrual disorders, PCOS, and reproductive tract pathology.',
    questions: [
      {
        id: 'obg-5',
        text: 'A 22-year-old with irregular periods, hirsutism, and acne has ultrasound showing multiple small peripheral ovarian follicles ("string of pearls"). This is most consistent with:',
        options: [
          'Endometriosis',
          'Polycystic ovary syndrome (PCOS)',
          'Premature ovarian failure',
          'Asherman syndrome',
        ],
        correctIndex: 1,
        explanation:
          'PCOS (per Rotterdam criteria: oligo/anovulation, clinical/biochemical hyperandrogenism, and/or polycystic ovarian morphology) classically presents with irregular cycles, hirsutism/acne, and a "string of pearls" appearance of small peripheral follicles on ultrasound.',
        reference: "Williams Gynecology / DC Dutta's Textbook of Gynecology",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['pcos'],
      },
      {
        id: 'obg-6',
        text: 'A woman presents with cyclical dysmenorrhea, dyspareunia, and infertility; laparoscopy reveals "chocolate cysts" of the ovary. The diagnosis is:',
        options: [
          'Adenomyosis (confined to the uterus)',
          'Ovarian teratoma',
          'Endometriosis',
          'Uterine fibroids (leiomyoma)',
        ],
        correctIndex: 2,
        explanation:
          'Endometriosis (ectopic endometrial tissue outside the uterus) classically causes cyclical pelvic pain, dysmenorrhea, dyspareunia, and infertility, with ovarian endometriomas appearing as "chocolate cysts" filled with old altered blood.',
        reference: "Williams Gynecology",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['endometriosis'],
      },
      {
        id: 'obg-7',
        text: 'The most common benign uterine tumor in women of reproductive age is:',
        options: [
          'Ovarian fibroma',
          'Endometrial polyp',
          'Adenomyoma',
          'Leiomyoma (fibroid)',
        ],
        correctIndex: 3,
        explanation:
          'Uterine leiomyomas (fibroids) — benign smooth-muscle tumors — are the most common pelvic tumor in women, often presenting with menorrhagia, pelvic pressure, or infertility depending on size/location (submucosal, intramural, or subserosal).',
        reference: "Williams Gynecology",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['fibroids'],
      },
      {
        id: 'obg-8',
        text: 'Match each gynecological condition with its key distinguishing feature:',
        options: [
          'PCOS → benign smooth-muscle tumor causing menorrhagia; Endometriosis → chocolate cysts with cyclical pain; Fibroids → hyperandrogenism with anovulation',
          'PCOS → hyperandrogenism with anovulation; Endometriosis → benign smooth-muscle tumor causing menorrhagia; Fibroids → chocolate cysts with cyclical pain',
          'PCOS → chocolate cysts with cyclical pain; Endometriosis → hyperandrogenism with anovulation; Fibroids → benign smooth-muscle tumor causing menorrhagia',
          'PCOS → hyperandrogenism with anovulation; Endometriosis → chocolate cysts with cyclical pain; Fibroids → benign smooth-muscle tumor causing menorrhagia',
        ],
        correctIndex: 3,
        explanation:
          'PCOS is defined by hyperandrogenism and chronic anovulation with polycystic ovarian morphology; endometriosis causes chocolate cysts (endometriomas) and cyclical pelvic pain; fibroids are benign myometrial smooth-muscle tumors that commonly cause menorrhagia and bulk symptoms.',
        reference: "Williams Gynecology",
        difficulty: 'Medium',
        type: 'match-following',
        tags: ['gynecology-overview'],
        matchPairs: [
          { left: 'PCOS', right: 'Hyperandrogenism + anovulation' },
          { left: 'Endometriosis', right: 'Chocolate cysts, cyclical pain' },
          { left: 'Fibroids', right: 'Benign smooth-muscle tumor, menorrhagia' },
        ],
      },
    ],
  },
  {
    id: 'high-risk-pregnancy',
    name: 'High-Risk Pregnancy & Complications',
    description: 'Antepartum hemorrhage, malpresentation, and obstetric emergencies.',
    questions: [
      {
        id: 'obg-9',
        text: 'A patient at 34 weeks presents with painless, bright-red vaginal bleeding. Ultrasound shows the placenta covering the internal cervical os. This is:',
        options: [
          'Normal implantation site placenta',
          'Vasa previa',
          'Placenta previa',
          'Abruptio placentae',
        ],
        correctIndex: 2,
        explanation:
          'Placenta previa (placenta implanted over or near the internal os) classically causes painless bright-red vaginal bleeding in later pregnancy, in contrast to abruptio placentae, which typically causes painful bleeding with a tender, tense uterus.',
        reference: "Williams Obstetrics",
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['placenta-previa'],
      },
      {
        id: 'obg-10',
        text: 'A woman in labour develops sudden severe abdominal pain, a tense/rigid uterus, and fetal distress, with dark vaginal bleeding. This most likely represents:',
        options: [
          'Abruptio placentae',
          'Uterine rupture (scarred uterus)',
          'Placenta previa (uncomplicated)',
          'Normal labour progression',
        ],
        correctIndex: 0,
        explanation:
          'Abruptio placentae (premature separation of a normally implanted placenta) causes painful bleeding with a tender, "woody-hard" uterus and can rapidly cause fetal distress and maternal DIC — an obstetric emergency requiring prompt delivery.',
        reference: "Williams Obstetrics",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['abruptio-placentae'],
      },
      {
        id: 'obg-11',
        text: 'Shoulder dystocia during delivery is best initially managed with which maneuver?',
        options: [
          'Delaying any intervention for 15+ minutes',
          'McRoberts maneuver with suprapubic pressure',
          'Immediate fundal pressure',
          'Aggressive traction on the fetal head',
        ],
        correctIndex: 1,
        explanation:
          "The McRoberts maneuver (hyperflexing the mother's hips onto her abdomen) combined with suprapubic pressure is the first-line approach to shoulder dystocia, straightening the sacrum and often freeing the impacted anterior shoulder; fundal pressure is avoided as it can worsen impaction.",
        reference: "Williams Obstetrics / ACOG Guidelines",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['shoulder-dystocia'],
      },
      {
        id: 'obg-12',
        text: "Assertion (A): Postpartum hemorrhage due to uterine atony is initially managed with uterine massage and uterotonic agents (e.g., oxytocin).\nReason (R): Uterine atony is the most common cause of primary postpartum hemorrhage.",
        options: [
          'Both A and R are true, and R is the correct explanation of A',
          'Both A and R are true, but R is NOT the correct explanation of A',
          'A is true but R is false',
          'A is false but R is true',
        ],
        correctIndex: 1,
        explanation:
          'Both statements are true — uterine atony is indeed the leading cause of primary PPH, and massage plus uterotonics (oxytocin first-line, followed by additional agents if needed) is the correct initial approach — but R explains WHY atony is common/important, not why massage/uterotonics specifically work, so it is not the direct explanation of A.',
        reference: "Williams Obstetrics",
        difficulty: 'Hard',
        type: 'assertion-reason',
        tags: ['postpartum-hemorrhage'],
      },
    ],
  },
]
