export interface BookResource {
  title: string
  author: string
  subject: 'Quant' | 'Reasoning' | 'English' | 'General Awareness' | 'Previous Papers'
  description: string
  /**
   * Optional filename of a PDF placed in `public/books/`. When set, "Find This
   * Book" opens that PDF directly in the browser's built-in viewer instead of
   * linking out. Leave unset (the default) to fall back to an external search
   * link — that's the case for every book today, since no PDFs ship with the
   * project yet. To enable the in-app viewer for a book: drop the file in
   * `public/books/<file>.pdf` and set this field to `<file>.pdf`.
   */
  pdfFile?: string
}

export const books: BookResource[] = [
  {
    title: 'Fast Track Objective Arithmetic',
    author: 'Rajesh Verma',
    subject: 'Quant',
    description: 'Concept-first arithmetic book with shortcut methods, widely used for Tier-I speed building.',
  },
  {
    title: 'Quantitative Aptitude for Competitive Examinations',
    author: 'R.S. Aggarwal',
    subject: 'Quant',
    description: 'The most widely used all-round quant reference, with a huge bank of practice problems by topic.',
  },
  {
    title: 'Magical Book on Quicker Maths',
    author: 'M. Tyra',
    subject: 'Quant',
    description: 'Focused on calculation shortcuts and speed techniques for arithmetic-heavy sections.',
  },
  {
    title: 'A Modern Approach to Verbal & Non-Verbal Reasoning',
    author: 'R.S. Aggarwal',
    subject: 'Reasoning',
    description: 'Comprehensive coverage of both verbal and non-verbal reasoning types asked in Tier-I & Tier-II.',
  },
  {
    title: 'Analytical Reasoning',
    author: 'M.K. Pandey',
    subject: 'Reasoning',
    description: 'Strong on puzzles, seating arrangement, and analytical-style reasoning questions.',
  },
  {
    title: 'Objective General English',
    author: 'S.P. Bakshi',
    subject: 'English',
    description: 'SSC-focused English prep with grammar rules explained alongside topic-wise practice sets.',
  },
  {
    title: 'High School English Grammar and Composition',
    author: 'Wren & Martin',
    subject: 'English',
    description: 'The classic grammar foundation book — useful for clearing fundamentals before topic practice.',
  },
  {
    title: 'Word Power Made Easy',
    author: 'Norman Lewis',
    subject: 'English',
    description: 'A structured way to build vocabulary for synonym/antonym and one-word substitution questions.',
  },
  {
    title: "Lucent's General Knowledge",
    author: 'Lucent Publications',
    subject: 'General Awareness',
    description: 'The standard static GK reference covering history, polity, geography, economy, and science.',
  },
  {
    title: 'Manorama Yearbook',
    author: 'Malayala Manorama',
    subject: 'General Awareness',
    description: 'An annual reference for current affairs, awards, sports, and general knowledge updates.',
  },
  {
    title: 'SSC CGL Previous Year Solved Papers',
    author: 'Kiran Prakashan',
    subject: 'Previous Papers',
    description: 'Chapter-wise and year-wise solved papers — the best way to get used to real exam difficulty.',
  },
  {
    title: 'SSC CGL Tier-I & Tier-II Complete Guide',
    author: 'Arihant Experts',
    subject: 'Previous Papers',
    description: 'Full-syllabus guide combining theory, practice sets, and mock papers in one volume.',
  },
]

export function bookSearchUrl(book: BookResource) {
  const q = encodeURIComponent(`${book.title} ${book.author} book`)
  return `https://www.google.com/search?q=${q}`
}

/** Where to send "Find This Book" — an in-app PDF path if available, else an external search fallback. */
export function bookLinkTarget(book: BookResource): { href: string; internal: boolean } {
  if (book.pdfFile) return { href: `/books/${book.pdfFile}`, internal: true }
  return { href: bookSearchUrl(book), internal: false }
}
