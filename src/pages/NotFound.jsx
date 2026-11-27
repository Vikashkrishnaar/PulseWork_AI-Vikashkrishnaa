import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="page placeholder-page">
      <span className="eyebrow">404 · PAGE NOT FOUND</span>
      <h1>This page wandered off.</h1>
      <p>The address may be outdated, or the page may have moved.</p>
      <Link to="/" className="button button-primary"><ArrowLeft size={16} /> Back to dashboard</Link>
    </div>
  )
}
