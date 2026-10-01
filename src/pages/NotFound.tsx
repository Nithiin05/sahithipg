import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <div className="max-w-lg mx-auto px-6 py-32 text-center">
      <p className="font-display font-extrabold text-5xl text-primary mb-4">404</p>
      <h1 className="font-display font-bold text-xl mb-2">Page not found</h1>
      <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="bg-primary text-primary-foreground rounded-lg px-5 py-2.5 text-sm font-semibold">
        Back to home
      </Link>
    </div>
  )
}
