import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import StudyStopwatch from './components/StudyStopwatch'
import Home from './pages/Home'

// Every page except the landing page is code-split so the first load stays small.
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Subjects = lazy(() => import('./pages/Subjects'))
const SubjectDetail = lazy(() => import('./pages/SubjectDetail'))
const DifficultySetList = lazy(() => import('./pages/DifficultySetList'))
const DifficultySetQuiz = lazy(() => import('./pages/DifficultySetQuiz'))
const TopicQuiz = lazy(() => import('./pages/TopicQuiz'))
const PYQs = lazy(() => import('./pages/PYQs'))
const PYQYearQuiz = lazy(() => import('./pages/PYQYearQuiz'))
const QuestionBank = lazy(() => import('./pages/QuestionBank'))
const QuestionView = lazy(() => import('./pages/QuestionView'))
const Tests = lazy(() => import('./pages/Tests'))
const TestRunner = lazy(() => import('./pages/TestRunner'))
const TestResult = lazy(() => import('./pages/TestResult'))
const Analytics = lazy(() => import('./pages/Analytics'))
const Revision = lazy(() => import('./pages/Revision'))
const Resources = lazy(() => import('./pages/Resources'))
const Bookmarks = lazy(() => import('./pages/Bookmarks'))
const StudyPlanner = lazy(() => import('./pages/StudyPlanner'))
const Profile = lazy(() => import('./pages/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))

function Loading() {
  return (
    <div className="max-w-lg mx-auto px-6 py-24 text-center text-sm text-muted-foreground" role="status">
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen font-body overflow-x-hidden">
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/:subject" element={<SubjectDetail />} />
            <Route path="/subjects/:subject/level/:difficulty" element={<DifficultySetList />} />
            <Route path="/subjects/:subject/level/:difficulty/:setNumber" element={<DifficultySetQuiz />} />
            <Route path="/subjects/:subject/:topic" element={<TopicQuiz />} />

            <Route path="/pyqs" element={<PYQs />} />
            <Route path="/pyqs/:year" element={<PYQYearQuiz />} />
            <Route path="/question-bank" element={<QuestionBank />} />
            <Route path="/question/:questionId" element={<QuestionView />} />

            <Route path="/tests" element={<Tests />} />
            <Route path="/tests/:testId" element={<TestRunner />} />
            <Route path="/tests/:testId/result" element={<TestResult />} />

            <Route path="/analytics" element={<Analytics />} />
            <Route path="/revision" element={<Revision />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/planner" element={<StudyPlanner />} />
            <Route path="/profile" element={<Profile />} />

            {/* Old URLs from the previous version */}
            <Route path="/mock-tests/*" element={<Navigate to="/tests" replace />} />
            <Route path="/grand-tests/*" element={<Navigate to="/tests?tab=full-grand" replace />} />
            <Route path="/mistakes" element={<Navigate to="/revision?list=incorrect" replace />} />
            <Route path="/leaderboard" element={<Navigate to="/analytics" replace />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <StudyStopwatch />
      </div>
    </BrowserRouter>
  )
}
