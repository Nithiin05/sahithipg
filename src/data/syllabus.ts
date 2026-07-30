export interface SyllabusItem {
  id: string
  label: string
}

export interface SyllabusSection {
  id: string
  title: string
  items: SyllabusItem[]
}

export interface SyllabusTier {
  id: string
  title: string
  note: string
  sections: SyllabusSection[]
}

export const syllabus: SyllabusTier[] = [
  {
    id: 'tier1',
    title: 'Tier-I',
    note: 'A single 60-minute, 100-question qualifying paper covering all four sections below.',
    sections: [
      {
        id: 't1-reasoning',
        title: 'General Intelligence & Reasoning',
        items: [
          { id: 't1-r-1', label: 'Analogies & similarities/differences' },
          { id: 't1-r-2', label: 'Classification (odd one out)' },
          { id: 't1-r-3', label: 'Number, alphabet & figure series' },
          { id: 't1-r-4', label: 'Coding-decoding' },
          { id: 't1-r-5', label: 'Blood relations & direction sense' },
          { id: 't1-r-6', label: 'Syllogism & Venn diagrams' },
          { id: 't1-r-7', label: 'Seating arrangement & puzzles' },
          { id: 't1-r-8', label: 'Non-verbal reasoning & figure matrix' },
          { id: 't1-r-9', label: 'Arithmetical & verbal reasoning' },
        ],
      },
      {
        id: 't1-quant',
        title: 'Quantitative Aptitude',
        items: [
          { id: 't1-q-1', label: 'Number systems & simplification' },
          { id: 't1-q-2', label: 'Percentage' },
          { id: 't1-q-3', label: 'Profit, loss & discount' },
          { id: 't1-q-4', label: 'Ratio, proportion & averages' },
          { id: 't1-q-5', label: 'Time, speed & distance' },
          { id: 't1-q-6', label: 'Time & work' },
          { id: 't1-q-7', label: 'Simple & compound interest' },
          { id: 't1-q-8', label: 'Algebra basics' },
          { id: 't1-q-9', label: 'Geometry & mensuration' },
          { id: 't1-q-10', label: 'Trigonometry basics' },
          { id: 't1-q-11', label: 'Data interpretation (tables, graphs, charts)' },
        ],
      },
      {
        id: 't1-english',
        title: 'English Comprehension',
        items: [
          { id: 't1-e-1', label: 'Spotting errors' },
          { id: 't1-e-2', label: 'Sentence improvement' },
          { id: 't1-e-3', label: 'Synonyms & antonyms' },
          { id: 't1-e-4', label: 'One-word substitution' },
          { id: 't1-e-5', label: 'Idioms & phrases' },
          { id: 't1-e-6', label: 'Fill in the blanks & cloze test' },
          { id: 't1-e-7', label: 'Reading comprehension' },
          { id: 't1-e-8', label: 'Para jumbles' },
        ],
      },
      {
        id: 't1-ga',
        title: 'General Awareness',
        items: [
          { id: 't1-g-1', label: 'History & freedom movement' },
          { id: 't1-g-2', label: 'Indian polity & constitution' },
          { id: 't1-g-3', label: 'Geography (India & world)' },
          { id: 't1-g-4', label: 'Indian economy' },
          { id: 't1-g-5', label: 'General science (physics, chemistry, biology)' },
          { id: 't1-g-6', label: 'Static GK: awards, books & authors' },
          { id: 't1-g-7', label: 'Sports' },
          { id: 't1-g-8', label: 'Current affairs' },
        ],
      },
    ],
  },
  {
    id: 'tier2',
    title: 'Tier-II (Paper-I — compulsory for all posts)',
    note: 'Conducted in two sessions on the same day; each module is separately timed.',
    sections: [
      {
        id: 't2-quant',
        title: 'Module-I: Mathematical Abilities',
        items: [
          { id: 't2-q-1', label: 'Number system, HCF/LCM & simplification' },
          { id: 't2-q-2', label: 'Percentage, ratio, average & mixture' },
          { id: 't2-q-3', label: 'Profit, loss, discount & partnership' },
          { id: 't2-q-4', label: 'Time, speed, distance & time-work' },
          { id: 't2-q-5', label: 'Simple & compound interest' },
          { id: 't2-q-6', label: 'Algebra, geometry & mensuration' },
          { id: 't2-q-7', label: 'Trigonometry & heights-distances' },
          { id: 't2-q-8', label: 'Statistics & data interpretation' },
        ],
      },
      {
        id: 't2-reasoning',
        title: 'Module-II: Reasoning & General Intelligence',
        items: [
          { id: 't2-r-1', label: 'Series, analogy & classification' },
          { id: 't2-r-2', label: 'Coding-decoding' },
          { id: 't2-r-3', label: 'Blood relations & direction sense' },
          { id: 't2-r-4', label: 'Syllogism & statement-conclusion' },
          { id: 't2-r-5', label: 'Puzzle & seating arrangement' },
          { id: 't2-r-6', label: 'Non-verbal & figure-based reasoning' },
        ],
      },
      {
        id: 't2-english',
        title: 'Module-I: English Language & Comprehension',
        items: [
          { id: 't2-e-1', label: 'Grammar & error spotting' },
          { id: 't2-e-2', label: 'Sentence improvement & rearrangement' },
          { id: 't2-e-3', label: 'Vocabulary: synonyms, antonyms & one-word substitution' },
          { id: 't2-e-4', label: 'Idioms & phrases' },
          { id: 't2-e-5', label: 'Cloze test & fill in the blanks' },
          { id: 't2-e-6', label: 'Reading comprehension (multiple passages)' },
          { id: 't2-e-7', label: 'Para jumbles' },
        ],
      },
      {
        id: 't2-ga',
        title: 'Module-II: General Awareness',
        items: [
          { id: 't2-g-1', label: 'History, polity & the constitution' },
          { id: 't2-g-2', label: 'Geography & environment' },
          { id: 't2-g-3', label: 'Economy & government schemes' },
          { id: 't2-g-4', label: 'General science' },
          { id: 't2-g-5', label: 'Static GK & current affairs' },
        ],
      },
      {
        id: 't2-computer',
        title: 'Section-III, Module-I: Computer Knowledge (qualifying)',
        items: [
          { id: 't2-c-1', label: 'Computer basics, hardware & software' },
          { id: 't2-c-2', label: 'MS Office (Word, Excel, PowerPoint)' },
          { id: 't2-c-3', label: 'Internet, email & networking basics' },
          { id: 't2-c-4', label: 'Cyber security fundamentals' },
        ],
      },
    ],
  },
]

export function totalSyllabusItems() {
  return syllabus.reduce(
    (sum, tier) => sum + tier.sections.reduce((s, sec) => s + sec.items.length, 0),
    0
  )
}
