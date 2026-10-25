# INI-CET Preparation

A free, client-side preparation platform for **INI-CET** (Institute of National Importance Combined Entrance Test, conducted by AIIMS New Delhi), targeting the **November 2026** exam.

Built with React 19, Vite, TypeScript, Tailwind CSS and React Router. There is no backend or login: progress is saved in the browser's local storage.

## Setup

```bash
npm install
npm run dev              # http://localhost:5173
npm run build            # type-check + production build
npm run check:questions  # question-bank + test-library integrity check
npm test                 # scoring, exam-rule and test-library tests (Node test runner)
npm run check            # all of the above + lint + build
npm run qbank -- export out.json            # export every question as JSON
npm run qbank -- import pack.json gt4       # validate a JSON pack and write it as a test pack
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
| `src/lib/testEngine.ts` | Every test definition (full mock, curated tests, subject, system, rapid, image, PYQ, custom) and how questions are drawn. |
| `src/data/tests/catalog.ts` | **Curated test library** — fixed, versioned full-length tests with category, status (draft / review / published / archived), pattern and ordered question ids. |
| `src/data/tests/legacyGrandSnapshots.ts` | Frozen question lists of the original Grand Tests 1–2 (they no longer change when the bank grows). |
| `src/data/questions/fullLength/` | **Test-reserved questions** written for one full-length test (e.g. `gt3-*.ts` for Grand Test 3). They stay out of the Question Bank and practice pools until a student has taken the test, and load on demand as a separate chunk. |
| `src/data/reservedQuestions.ts` | Registry and on-demand loader for test-reserved packs. |
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

## Adding a full-length test

1. Write 200 questions as a pack: either a TypeScript file in `src/data/questions/fullLength/` using the `r()` helper (copy `gt3-medicine.ts`), or a JSON file imported with `npm run qbank -- import pack.json gt4`. Ids use the pack prefix (`gt4-med-01`).
2. Register the pack loader in `src/data/reservedQuestions.ts`.
3. Add the test to `CURATED_TESTS` in `src/data/tests/catalog.ts` with `status: 'draft'` and its ordered `questionIds` (200 for the `inicet-cbt` pattern — split in order into 4 parts of 50).
4. Run `npm run check`. Preview drafts at `/tests?preview=1`.
5. Move to `review` (students see it with an "Expert review pending" badge) and to `published` after medical sign-off (set `reviewStatus: 'expert-verified'` and `reviewedBy` on the questions).
6. Never edit a published test's question list — add a new `version` instead.

## Exam pattern

`src/config/examConfig.ts` follows the official AIIMS prospectus (INI-CET July 2025, Part-A §X-B): 200 questions, **4 parts × 50 questions × 45 minutes**, parts submitted automatically and not revisitable, +1 / −⅓, and "Unanswered / Marked for Review: 0" — so an answered question still marked for review scores 0. Full-length tests (`inicet-cbt` pattern) use these rules; the original Grand Tests 1–2 keep their original 150-question free-navigation format. "Multiple correct choice" questions are rendered as numbered statements with combination options (one selection), because AIIMS has not published a separate scoring rule for multi-select answers.

## What needs a backend

The site is static and keeps progress in the browser. That means:
- Answer keys ship with the app, so grading happens in the browser — they cannot be hidden from a determined user until a server grades submissions.
- There are no accounts, so attempts are per-browser and there is no cross-device sync or cohort data (hence no percentiles or ranks).
- There is no secure admin interface; content is managed through files, the validator and git review. A real admin panel with server-side authorisation needs a backend (for example Supabase/Firebase or a small API with a database).

## Content rules

- **Source labels.** Every question shows one of: *Verified PYQ*, *PYQ Recall*, *PYQ-Inspired*, *Practice Question*, *Image-Based* or *Integrated*. A question only displays as **Verified PYQ** (official material) or **PYQ Recall** (memory-based reconstruction) when it has that `sourceType` **and** a `sourceDetail` naming the session, plus a `sourceUrl` or `license` note; the validator rejects anything less. Everything else falls back to *PYQ-Inspired*.
- **Review status.** Each question carries `reviewStatus` (`unreviewed`, `author-checked`, `expert-verified`, `flagged`) and `lastReviewed`; flagged questions cannot appear in a live test, and `expert-verified` requires `reviewedBy`. Guideline-dependent answers record `guidelineVersion`.
- **No official weightage claims.** AIIMS does not publish subject-wise weightage. Topic priorities come from past-paper analysis and are labelled as such.
- **Images** must carry `imageSource` attribution and be original, public-domain or openly licensed.
- **Exam pattern.** `examConfig.verified` stays `false` until the values are checked against the official AIIMS prospectus for the session; the UI shows a "pending official confirmation" note until then.

## Disclaimer

Independent self-preparation tool. Not affiliated with, or endorsed by, AIIMS or any examination authority. Always confirm exam details on [aiimsexams.ac.in](https://www.aiimsexams.ac.in/).
