export interface VideoResource {
  label: string
  creator?: string
  url: string
  recommended?: boolean
}

export interface ResourceGroup {
  id: string
  title: string
  description: string
  resources: VideoResource[]
}

// Direct links go to verified educator/channel pages where a stable, well-known
// channel exists. Where no single canonical playlist can be confidently pinned
// (it would go stale fast, or the "channel" is really a topic), the link is a
// targeted YouTube search so it always resolves to current, relevant videos.
function ytSearch(query: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
}

export const resourceGroups: ResourceGroup[] = [
  {
    id: 'quant',
    title: 'Quantitative Aptitude',
    description: 'Arithmetic, algebra, geometry, mensuration, and trigonometry — the highest-weightage section.',
    resources: [
      { label: 'Maths by Rakesh Yadav Sir', creator: 'Rakesh Yadav', url: 'https://www.youtube.com/@mathsbyrakeshyadavsir', recommended: true },
      { label: 'Gagan Pratap Maths', creator: 'Gagan Pratap', url: 'https://www.youtube.com/@gaganpratapmaths', recommended: true },
      { label: 'Careerwill Maths Marathon', creator: 'Careerwill', url: ytSearch('Careerwill Maths Marathon SSC CGL'), recommended: true },
    ],
  },
  {
    id: 'reasoning',
    title: 'Reasoning',
    description: 'Verbal & non-verbal reasoning, puzzles, seating arrangement, coding-decoding, and series.',
    resources: [
      { label: 'RWA SSC Exams (Rojgar with Ankit)', creator: 'Ankit Bhati', url: 'https://www.youtube.com/@RWASSCEXAMS' },
      { label: 'SSC Adda247', creator: 'Adda247', url: 'https://www.youtube.com/channel/UCAyYBPzFioHUxvVZEn4rMJA' },
      { label: 'Reasoning PYQ Playlist', url: ytSearch('SSC CGL Reasoning Previous Year Questions Playlist') },
    ],
  },
  {
    id: 'english',
    title: 'English',
    description: 'Grammar, comprehension, vocabulary, and sentence-level accuracy.',
    resources: [
      { label: 'English Neetu Singh', creator: 'Neetu Singh', url: 'https://www.youtube.com/@NeetuSinghEnglish' },
      { label: 'Tarun Grover', creator: 'Tarun Grover', url: 'https://www.youtube.com/@TarunGrover' },
      { label: 'Vocabulary Playlist', url: ytSearch('SSC CGL English Vocabulary Playlist') },
    ],
  },
  {
    id: 'general-awareness',
    title: 'General Awareness',
    description: 'Static GK, history, polity, geography, economy, science, and daily current affairs.',
    resources: [
      { label: 'Parmar SSC', creator: 'Parmar Sir', url: 'https://www.youtube.com/@parmarssc' },
      { label: 'Current Affairs', url: ytSearch('SSC CGL Current Affairs Daily') },
      { label: 'Static GK', url: ytSearch('SSC CGL Static GK Complete Course') },
    ],
  },
  {
    id: 'computer-knowledge',
    title: 'Computer Knowledge',
    description: 'Fundamentals, MS Office, internet, networking, and cyber security basics (Tier-II).',
    resources: [
      { label: 'SSC Adda247', creator: 'Adda247', url: 'https://www.youtube.com/channel/UCAyYBPzFioHUxvVZEn4rMJA' },
      { label: 'Computer Awareness Playlist', url: ytSearch('SSC CGL Computer Awareness Playlist') },
    ],
  },
  {
    id: 'dest',
    title: 'DEST (Data Entry Speed Test)',
    description: 'Typing speed and accuracy practice for the qualifying DEST module in Tier-II.',
    resources: [
      { label: 'DEST Practice', url: ytSearch('SSC CGL DEST Data Entry Speed Test Practice') },
      { label: 'Typing Practice', url: ytSearch('SSC CGL Typing Test Practice 8000 Key Depressions') },
    ],
  },
  {
    id: 'statistics',
    title: 'Statistics',
    description: 'Tier-II Paper-II — for Junior Statistical Officer (JSO) & Statistical Investigator Gr. II posts.',
    resources: [
      { label: 'Complete Course', url: ytSearch('SSC CGL Statistics Complete Course Paper 2 JSO') },
      { label: 'PYQs', url: ytSearch('SSC CGL Statistics Previous Year Questions') },
    ],
  },
  {
    id: 'finance-economics',
    title: 'Finance & Economics',
    description: 'Tier-II Paper-III — General Studies (Finance & Economics), for AAO/AAO posts.',
    resources: [
      { label: 'Finance', url: ytSearch('SSC CGL Finance Paper 3 AAO Complete Course') },
      { label: 'Economics', url: ytSearch('SSC CGL Economics Paper 3 AAO Complete Course') },
    ],
  },
  {
    id: 'pyq-practice',
    title: 'Previous Year Question Practice',
    description: 'Section-wise previous year question playlists — the fastest way to calibrate to real exam difficulty.',
    resources: [
      { label: 'Maths PYQs', url: ytSearch('SSC CGL Maths Previous Year Questions Playlist') },
      { label: 'Reasoning PYQs', url: ytSearch('SSC CGL Reasoning Previous Year Questions Playlist') },
      { label: 'English PYQs', url: ytSearch('SSC CGL English Previous Year Questions Playlist') },
      { label: 'General Awareness PYQs', url: ytSearch('SSC CGL General Awareness Previous Year Questions Playlist') },
    ],
  },
  {
    id: 'mock-analysis',
    title: 'Mock Analysis',
    description: 'Watch toppers break down full mocks — how to triage, sequence sections, and avoid negative marking traps.',
    resources: [
      { label: 'Oliveboard', url: 'https://www.youtube.com/channel/UCRvrHAyNdOMI_JBkE2pjZtw' },
      { label: 'Testbook', url: 'https://www.youtube.com/c/Testbookdotcom' },
    ],
  },
]
