import PageHeader from '../components/PageHeader'
import MistakesTab from '../components/analytics/MistakesTab'

export default function Mistakes() {
  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Mistake Notebook"
        title="Questions you got wrong"
        description="Automatically saved from every practice set, mock, and Grand Test — until you get them right."
      />
      <div className="max-w-5xl mx-auto px-6">
        <MistakesTab />
      </div>
    </div>
  )
}
