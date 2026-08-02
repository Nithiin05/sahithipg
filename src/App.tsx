import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import StudyStopwatch from './components/StudyStopwatch'
import Home from './pages/Home'
import Subjects from './pages/Subjects'
import SubjectDetail from './pages/SubjectDetail'
import DifficultySetList from './pages/DifficultySetList'
import DifficultySetQuiz from './pages/DifficultySetQuiz'
import TopicQuiz from './pages/TopicQuiz'
import PYQs from './pages/PYQs'
import PYQYearQuiz from './pages/PYQYearQuiz'
import MockTests from './pages/MockTests'
import MockRunner from './pages/MockRunner'
import MockResult from './pages/MockResult'
import GrandTests from './pages/GrandTests'
import GrandTestRunner from './pages/GrandTestRunner'
import GrandTestResult from './pages/GrandTestResult'
import Analytics from './pages/Analytics'
import Resources from './pages/Resources'
import Bookmarks from './pages/Bookmarks'
import Mistakes from './pages/Mistakes'
import Leaderboard from './pages/Leaderboard'
import StudyPlanner from './pages/StudyPlanner'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen font-body overflow-x-hidden">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/:subject" element={<SubjectDetail />} />
          <Route path="/subjects/:subject/level/:difficulty" element={<DifficultySetList />} />
          <Route path="/subjects/:subject/level/:difficulty/:setNumber" element={<DifficultySetQuiz />} />
          <Route path="/subjects/:subject/:topic" element={<TopicQuiz />} />

          <Route path="/pyqs" element={<PYQs />} />
          <Route path="/pyqs/:year" element={<PYQYearQuiz />} />

          <Route path="/mock-tests" element={<MockTests />} />
          <Route path="/mock-tests/:mockId" element={<MockRunner />} />
          <Route path="/mock-tests/:mockId/result" element={<MockResult />} />

          <Route path="/grand-tests" element={<GrandTests />} />
          <Route path="/grand-tests/:grandId" element={<GrandTestRunner />} />
          <Route path="/grand-tests/:grandId/result" element={<GrandTestResult />} />

          <Route path="/analytics" element={<Analytics />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/mistakes" element={<Mistakes />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/planner" element={<StudyPlanner />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <StudyStopwatch />
      </div>
    </BrowserRouter>
  )
}
