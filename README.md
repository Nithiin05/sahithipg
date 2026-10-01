# INI-CET Preparation

A free, client-side preparation platform for **INI-CET** (Institute of National Importance Combined Entrance Test, conducted by AIIMS New Delhi), targeting the **November 2026** exam.

Built with React 19, Vite, TypeScript, Tailwind CSS and React Router. There is no backend or login: progress is saved in the browser's local storage.

## Setup

```bash
npm install
npm run dev              # http://localhost:5173
npm run build            # type-check + production build
npm run check:questions  # question-bank integrity check
```

## Where things live

| Path | What it holds |
| --- | --- |
| `src/config/examConfig.ts` | **The only place exam-pattern numbers live** — date, duration, question count, marking, sections, navigation rules, verification status. |
| `src/data/questions/*.ts` | Question bank, one file per subject. Edit content here without touching UI code. |
| `src/data/questions/batches/*.ts` | New INI-CET-level question batches (vignettes, integrated, image). Correct answer is written first; display order is randomised. |
| `src/data/syllabus.ts` | INI-CET syllabus tree: subject → module → focus areas, linked to practice topics. |
| `scripts/diagrams/` | Generators for original diagrams (e.g. ECG strips) used by image questions. |
| `src/data/subjects.ts` | Subject list; merges question batches and applies answer-position randomization. |
| `src/data/taxonomy.ts` | Organ systems (for system tests) and Question Bank categories (clinical, image, integrated, high-yield, rapid…). |
| `src/lib/testEngine.ts` | Every test definition (full mock, grand, subject, system, rapid, image, PYQ, custom) and how questions are drawn. |
| `src/pages/TestRunner.tsx` | Computer-based-test runner: timers, sections, navigation rules, palette, mark for review, auto-submit, resume. |
| `src/lib/stats.ts` | All analytics: accuracy, subject/topic performance, weak areas, timing, streaks, mock scores. |
| `src/lib/studyPlanner.ts` | Adaptive daily plan. |
| `src/lib/revisionQueue.ts` | "Revise again" spaced repetition (1, 3, 7, 14, 30 days). |
| `src/lib/search.ts` | Global search index (Ctrl/⌘ K). |
| `src/lib/optionShuffle.ts` | Seeded per-question option shuffling (answer key preserved). |
| `src/lib/questionSource.ts` | Source classification shown on every question. |
| `scripts/check-question-bank.ts` | Duplicate, answer-key, answer-distribution and PYQ-labelling checks. |

## Adding questions

Add a new file in `src/data/questions/batches/` (copy the pattern in `batch2.ts`), write each question with the `q()` helper — **correct answer first** — and add the batch to `BATCHES` in `src/data/subjects.ts`. Link any new topic from a module in `src/data/syllabus.ts`, then run `npm run check:questions`. The check fails on duplicate ids or text, broken answer keys, unattributed images or PYQs without a named session, and warns about answer-position bias, assertion–reason imbalance, untagged difficulty, and the correct option being the longest too often.

Difficulty is assigned by reasoning steps, never randomly:
- **Easy** — one-step recall. **Moderate** — one interpretation step or calculation.
- **Difficult** — two or more steps, close differentials, or judging a causal link.
- **INI-CET Level** — full vignette with labs/imaging, several steps, integration across subjects.

## Content rules

- **Source labels.** Every question shows one of: *Verified PYQ*, *PYQ Pattern*, *Practice Question*, *Image-Based* or *Integrated*. A question only displays as **Verified PYQ** when it has `sourceType: 'PYQ'` **and** a `sourceDetail` naming the paper (e.g. `"INI-CET May 2024"`). Anything else falls back to *PYQ Pattern*.
- **No official weightage claims.** AIIMS does not publish subject-wise weightage. Topic priorities come from past-paper analysis and are labelled as such.
- **Images** must carry `imageSource` attribution and be original, public-domain or openly licensed.
- **Exam pattern.** `examConfig.verified` stays `false` until the values are checked against the official AIIMS prospectus for the session; the UI shows a "pending official confirmation" note until then.

## Disclaimer

Independent self-preparation tool. Not affiliated with, or endorsed by, AIIMS or any examination authority. Always confirm exam details on [aiimsexams.ac.in](https://www.aiimsexams.ac.in/).
