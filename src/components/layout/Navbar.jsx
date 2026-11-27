import { Bell, ChevronDown, Menu, Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTasks } from '../../hooks/useTasks'

export function Navbar({ onMenuClick }) {
  const { search, setSearch } = useTasks()
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const navigate = useNavigate()

  function submitSearch(event) {
    event.preventDefault()
    navigate('/tasks')
  }

  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" type="button" aria-label="Open navigation" onClick={onMenuClick}>
        <Menu size={20} />
      </button>
      <form className="global-search" role="search" onSubmit={submitSearch}>
        <Search size={17} />
        <input
          aria-label="Search tasks"
          placeholder="Search anything..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <kbd>⌘ K</kbd>
      </form>
      <div className="topbar-actions">
        <div className="popover-wrap">
          <button
            className="icon-button notification-button"
            type="button"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            onClick={() => setNotificationsOpen((open) => !open)}
          >
            <Bell size={19} />
            <span className="notification-dot" />
          </button>
          {notificationsOpen && (
            <div className="popover notification-popover">
              <strong>Notifications</strong>
              <p>You’re all caught up. New activity will show up here.</p>
            </div>
          )}
        </div>
        <div className="topbar-divider" />
        <div className="popover-wrap">
          <button
            className="profile-trigger"
            type="button"
            aria-expanded={profileOpen}
            onClick={() => setProfileOpen((open) => !open)}
          >
            <span className="avatar">MC</span>
            <span className="profile-trigger-copy"><strong>Maya Chen</strong><small>Workspace admin</small></span>
            <ChevronDown size={15} />
          </button>
          {profileOpen && (
            <div className="popover profile-popover">
              <strong>Maya Chen</strong>
              <p>Signed in to Acme Studio</p>
              <button type="button" onClick={() => { setProfileOpen(false); navigate('/settings') }}>
                Account settings
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
