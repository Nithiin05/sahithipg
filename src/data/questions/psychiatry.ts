import type { Topic } from '../../types'

export const psychiatryTopics: Topic[] = [
  {
    id: 'mood-psychotic-disorders',
    name: 'Mood & Psychotic Disorders',
    description: 'Major depression, bipolar disorder, and schizophrenia.',
    questions: [
      {
        id: 'psych-1',
        text: 'For a diagnosis of major depressive disorder, symptoms (including depressed mood or anhedonia) must be present for at least:',
        options: [
          "2 weeks",
          "2 days",
          "6 months",
          "1 month",
        ],
        correctIndex: 0,
        explanation:
          'DSM-5 criteria for major depressive episode require at least 5 of 9 characteristic symptoms (including depressed mood or anhedonia) present for a minimum of 2 weeks, most of the day nearly every day, representing a change from previous functioning.',
        reference: 'DSM-5-TR / Kaplan & Sadock\'s Synopsis of Psychiatry',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['major-depressive-disorder'],
      },
      {
        id: 'psych-2',
        text: 'A patient describes a week of decreased need for sleep, grandiosity, pressured speech, and impulsive spending severe enough to impair functioning. This is most consistent with:',
        options: [
          'A manic episode (as in Bipolar I disorder)',
          'A hypomanic episode only',
          'Major depressive episode with agitation',
          'Generalized anxiety disorder',
        ],
        correctIndex: 0,
        explanation:
          'A full manic episode (≥1 week, causing marked functional impairment or requiring hospitalization, with symptoms like decreased sleep need, grandiosity, pressured speech, and risky/impulsive behavior) defines Bipolar I disorder; hypomania is similar but shorter (≥4 days) and without marked impairment.',
        reference: "Kaplan & Sadock's Synopsis of Psychiatry",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['bipolar-disorder'],
      },
      {
        id: 'psych-3',
        text: 'For a diagnosis of schizophrenia per DSM-5, continuous signs of disturbance must persist for at least:',
        options: [
          "6 months",
          "3 years",
          "2 weeks",
          "1 month",
        ],
        correctIndex: 0,
        explanation:
          'DSM-5 requires continuous signs of disturbance for at least 6 months, including at least 1 month of active-phase symptoms (two or more of: delusions, hallucinations, disorganized speech, grossly disorganized/catatonic behavior, negative symptoms) — distinguishing schizophrenia from briefer psychotic disorders.',
        reference: 'DSM-5-TR',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['schizophrenia'],
      },
      {
        id: 'psych-4',
        text: "Assertion (A): Lithium requires regular monitoring of serum levels and of renal and thyroid function during long-term treatment.\nReason (R): Lithium is extensively metabolised by the liver.",
        options: [
          "Both A and R are true, and R is the correct explanation of A",
          "Both A and R are true, but R is NOT the correct explanation of A",
          "A is true but R is false",
          "A is false but R is true",
        ],
        correctIndex: 2,
        explanation:
          "A is true; R is false. Lithium is not metabolised; it is excreted unchanged by the kidneys. Monitoring is needed because of its narrow therapeutic index and its chronic effects on the kidney (nephrogenic diabetes insipidus) and thyroid (hypothyroidism).",
        reference: "Kaplan & Sadock's Synopsis of Psychiatry",
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['lithium'],
      },
    ],
  },
  {
    id: 'anxiety-neurotic-disorders',
    name: 'Anxiety & Neurotic Disorders',
    description: 'GAD, panic disorder, OCD, and PTSD.',
    questions: [
      {
        id: 'psych-5',
        text: 'A patient has recurrent, unexpected panic attacks followed by persistent worry about having more attacks, leading to avoidance behavior. This is most consistent with:',
        options: [
          'Generalized anxiety disorder',
          'Social anxiety disorder',
          'Panic disorder',
          'Specific phobia',
        ],
        correctIndex: 2,
        explanation:
          'Panic disorder is defined by recurrent, unexpected panic attacks plus at least one month of persistent concern about additional attacks or their consequences, or significant maladaptive behavioral change (e.g., avoidance) related to the attacks.',
        reference: 'DSM-5-TR',
        difficulty: 'Easy',
        type: 'standard',
        tags: ['panic-disorder'],
      },
      {
        id: 'psych-6',
        text: 'A patient has intrusive, repetitive thoughts about contamination and spends hours each day washing hands, recognizing the behavior as excessive but unable to stop. This is characteristic of:',
        options: [
          'Obsessive-compulsive disorder (OCD)',
          'Body dysmorphic disorder',
          'Delusional disorder',
          'Generalized anxiety disorder',
        ],
        correctIndex: 0,
        explanation:
          'OCD involves obsessions (intrusive, unwanted, anxiety-provoking thoughts, e.g., contamination fears) and/or compulsions (repetitive behaviors like handwashing performed to reduce the anxiety), typically with retained insight that the thoughts/behaviors are excessive or unreasonable.',
        reference: 'DSM-5-TR',
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['ocd'],
      },
      {
        id: 'psych-7',
        text: 'First-line pharmacotherapy for most anxiety disorders (GAD, panic disorder, social anxiety, OCD) is generally:',
        options: [
          'Lithium (as monotherapy)',
          'Typical (first-generation) antipsychotics',
          'SSRIs (e.g., sertraline)',
          'Benzodiazepines as long-term monotherapy',
        ],
        correctIndex: 2,
        explanation:
          'SSRIs are first-line, evidence-based pharmacotherapy for most anxiety disorders (GAD, panic disorder, social anxiety disorder, OCD — though OCD often requires higher doses/longer trials); benzodiazepines may provide rapid short-term relief but are avoided long-term due to dependence risk.',
        reference: "Kaplan & Sadock's Synopsis of Psychiatry",
        difficulty: 'Easy',
        type: 'standard',
        tags: ['ssri', 'anxiety-treatment'],
      },
      {
        id: 'psych-8',
        text: 'Match each anxiety-spectrum disorder with a distinguishing clinical feature:',
        options: [
          "Panic disorder → discrete attacks with physical symptoms and fear of recurrence; OCD → obsessions with compulsions performed to reduce anxiety; PTSD → re-experiencing after a trauma with hyperarousal",
          "Panic disorder → re-experiencing after a trauma with hyperarousal; OCD → obsessions with compulsions performed to reduce anxiety; PTSD → discrete attacks with physical symptoms and fear of recurrence",
          "Panic disorder → discrete attacks with physical symptoms and fear of recurrence; OCD → re-experiencing after a trauma with hyperarousal; PTSD → obsessions with compulsions performed to reduce anxiety",
          "Panic disorder → obsessions with compulsions performed to reduce anxiety; OCD → discrete attacks with physical symptoms and fear of recurrence; PTSD → re-experiencing after a trauma with hyperarousal",
        ],
        correctIndex: 0,
        explanation:
          'Panic disorder features discrete, often unprovoked panic attacks with somatic symptoms and anticipatory anxiety; OCD features obsessions relieved by compulsions; PTSD follows exposure to a traumatic event and includes intrusive re-experiencing (flashbacks/nightmares), avoidance, negative mood/cognition changes, and hyperarousal.',
        reference: 'DSM-5-TR',
        difficulty: 'Medium',
        type: 'match-following',
        tags: ['anxiety-disorders-overview'],
        matchPairs: [
          { left: 'Panic disorder', right: 'Discrete panic attacks + anticipatory anxiety' },
          { left: 'OCD', right: 'Obsessions relieved by compulsions' },
          { left: 'PTSD', right: 'Re-experiencing + hyperarousal after trauma' },
        ],
      },
    ],
  },
  {
    id: 'substance-child-psychiatry',
    name: 'Substance Use & Child Psychiatry',
    description: 'Substance dependence syndromes and childhood psychiatric disorders.',
    questions: [
      {
        id: 'psych-9',
        text: 'A patient with chronic alcohol use disorder abruptly stops drinking and, 48-72 hours later, develops confusion, autonomic instability, tremors, and visual hallucinations. This presentation is consistent with:',
        options: [
          'Wernicke encephalopathy',
          'Delirium tremens (alcohol withdrawal delirium)',
          'Simple alcohol intoxication',
          'Alcoholic hallucinosis without autonomic instability',
        ],
        correctIndex: 1,
        explanation:
          'Delirium tremens is a severe, potentially life-threatening alcohol withdrawal syndrome typically emerging 48-96 hours after the last drink, featuring confusion/delirium, marked autonomic instability (tachycardia, hypertension, fever), tremor, and hallucinations — requiring urgent benzodiazepine treatment.',
        reference: "Kaplan & Sadock's Synopsis of Psychiatry",
        difficulty: 'Medium',
        type: 'clinical-case',
        tags: ['alcohol-withdrawal'],
      },
      {
        id: 'psych-10',
        text: 'A 7-year-old has persistent inattention, hyperactivity, and impulsivity across home and school settings for over 6 months, impairing academic performance. This is most consistent with:',
        options: [
          "ADHD",
          "Autism spectrum disorder",
          "Oppositional defiant disorder",
          "Conduct disorder",
        ],
        correctIndex: 0,
        explanation:
          'ADHD requires a persistent pattern of inattention and/or hyperactivity-impulsivity present in multiple settings (e.g., home and school), causing functional impairment, with several symptoms present before age 12 — distinguishing it from disorders defined primarily by defiance (ODD) or antisocial behavior (conduct disorder).',
        reference: 'DSM-5-TR',
        difficulty: 'Easy',
        type: 'clinical-case',
        tags: ['adhd'],
      },
      {
        id: 'psych-11',
        text: 'First-line pharmacotherapy for opioid use disorder (maintenance treatment) includes:',
        options: [
          'Naltrexone (opioid antagonist, not first-line maintenance)',
          'Methadone or buprenorphine (opioid maintenance therapy)',
          'Disulfiram (used for alcohol use disorder, not opioids)',
          'Benzodiazepines (not indicated for opioid maintenance)',
        ],
        correctIndex: 1,
        explanation:
          'Opioid agonist maintenance therapy with methadone (full agonist) or buprenorphine (partial agonist, often combined with naloxone) is first-line, evidence-based treatment for opioid use disorder, reducing withdrawal, cravings, illicit use, and overdose mortality; disulfiram is instead used for alcohol use disorder.',
        reference: "Kaplan & Sadock's Synopsis of Psychiatry",
        difficulty: 'Medium',
        type: 'guideline',
        tags: ['opioid-use-disorder'],
      },
      {
        id: 'psych-12',
        text: "Assertion (A): Benzodiazepines, not antipsychotics, are the first-line treatment for alcohol withdrawal.\nReason (R): Benzodiazepines act on the same GABA-A receptor system as alcohol, cross-tolerating and preventing withdrawal seizures/delirium tremens.",
        options: [
          'Both A and R are true, and R is the correct explanation of A',
          'Both A and R are true, but R is NOT the correct explanation of A',
          'A is true but R is false',
          'A is false but R is true',
        ],
        correctIndex: 0,
        explanation:
          'Alcohol potentiates GABA-A receptor activity; benzodiazepines act on the same receptor system, providing effective cross-tolerance that prevents/treats the hyperexcitable withdrawal state (including seizures and delirium tremens), making them the evidence-based first-line agents for alcohol withdrawal management.',
        reference: "Kaplan & Sadock's Synopsis of Psychiatry",
        difficulty: 'Medium',
        type: 'assertion-reason',
        tags: ['alcohol-withdrawal', 'benzodiazepines'],
      },
    ],
  },
]
