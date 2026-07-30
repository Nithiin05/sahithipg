import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import StudyStopwatch from './components/StudyStopwatch'
import Home from './pages/Home'
import Syllabus from './pages/Syllabus'
import Practice from './pages/Practice'
import PracticeSubject from './pages/PracticeSubject'
import PracticeSetList from './pages/PracticeSetList'
import PracticeSetQuiz from './pages/PracticeSetQuiz'
import Quiz from './pages/Quiz'
import MockTests from './pages/MockTests'
import MockRunner from './pages/MockRunner'
import MockResult from './pages/MockResult'
import Analytics from './pages/Analytics'
import Resources from './pages/Resources'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen font-body overflow-x-hidden">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/:subject" element={<PracticeSubject />} />
          <Route path="/practice/:subject/level/:difficulty" element={<PracticeSetList mode="level" />} />
          <Route path="/practice/:subject/level/:difficulty/:setNumber" element={<PracticeSetQuiz mode="level" />} />
          <Route path="/practice/:subject/pyq" element={<PracticeSetList mode="pyq" />} />
          <Route path="/practice/:subject/pyq/:setNumber" element={<PracticeSetQuiz mode="pyq" />} />
          <Route path="/practice/:subject/:topic" element={<Quiz />} />
          <Route path="/mock-tests" element={<MockTests />} />
          <Route path="/mock-tests/:mockId" element={<MockRunner />} />
          <Route path="/mock-tests/:mockId/result" element={<MockResult />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <StudyStopwatch />
      </div>
    </BrowserRouter>
  )
}
