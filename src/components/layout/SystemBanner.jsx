import { useEffect, useState } from 'react'
import { Activity, X } from 'lucide-react'

export function SystemBanner() {
  const [visible, setVisible] = useState(true)
  const [now, setNow] = useState(() => new Date())
  const appName = import.meta.env.VITE_APP_NAME || 'PulseWorks AI'
  const environment = import.meta.env.VITE_APP_ENV || import.meta.env.MODE

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  if (!visible) return null

  return (
    <div className="system-banner">
      <div className="banner-brand">
        <span className="banner-pulse"><Activity size={13} strokeWidth={2.5} /></span>
        <span className="banner-app-name">{appName}</span>
        <span className="environment-badge">{environment}</span>
      </div>
      <div className="banner-details">
        <span className="system-status"><span className="status-dot" />Local workspace ready</span>
        <span className="banner-date">
          {now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
        </span>
        <span className="banner-time">
          {now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
        <button className="banner-dismiss" type="button" onClick={() => setVisible(false)} aria-label="Dismiss system banner">
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
