import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Features from '../components/Features'
import ExamPattern from '../components/ExamPattern'
import HowItWorks from '../components/HowItWorks'
import FinalCTA from '../components/FinalCTA'
import ResumeBanner from '../components/ResumeBanner'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Home() {
  usePageTitle()
  return (
    <>
      <Hero />
      <ResumeBanner />
      <Stats />
      <Features />
      <ExamPattern />
      <HowItWorks />
      <FinalCTA />
      <p className="text-center text-sm text-muted-foreground pb-10 px-6">
        Every Question Matters. 🩺
      </p>
    </>
  )
}
