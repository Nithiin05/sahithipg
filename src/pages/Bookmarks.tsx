import PageHeader from '../components/PageHeader'
import BookmarksTab from '../components/analytics/BookmarksTab'

export default function Bookmarks() {
  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Bookmarks"
        title="Bookmarked questions"
        description="Every question you've starred while practicing, saved here for quick review before your exam."
      />
      <div className="max-w-5xl mx-auto px-6">
        <BookmarksTab />
      </div>
    </div>
  )
}
