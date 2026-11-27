import { ArrowLeft, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export function PlaceholderPage({ title }) {
  return (
    <div className="page placeholder-page">
      <span className="eyebrow">PULSEWORKS AI</span>
      <div className="placeholder-icon"><Sparkles size={22} /></div>
      <h1>{title} are coming soon</h1>
      <p>This workspace area hasn’t been built yet. Your tasks are ready to use in the meantime.</p>
      <Link to="/" className="button button-quiet"><ArrowLeft size={16} /> Back to dashboard</Link>
      <span className="placeholder-note">No backend or external service is connected in this preview.</span>
    </div>
  )
}
