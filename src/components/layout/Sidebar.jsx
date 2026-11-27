import {
  Bot,
  BriefcaseBusiness,
  CheckSquare2,
  ChevronLeft,
  FileText,
  LayoutDashboard,
  Settings2,
  UsersRound,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useTasks } from '../../hooks/useTasks'

const navigation = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard },
  { label: 'My tasks', to: '/tasks', icon: CheckSquare2 },
  { label: 'Projects', to: '/projects', icon: BriefcaseBusiness },
  { label: 'Team', to: '/team', icon: UsersRound },
  { label: 'Documents', to: '/documents', icon: FileText },
  { label: 'AI assistant', to: '/assistant', icon: Bot },
]

export function Sidebar({ open, onClose }) {
  const { tasks } = useTasks()
  const openTaskCount = tasks.filter((task) => task.status !== 'Completed').length

  return (
    <>
      {open && <button className="sidebar-backdrop" onClick={onClose} aria-label="Close navigation" />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-workspace">
          <div className="workspace-mark">P</div>
          <div className="workspace-copy">
            <strong>Acme Studio</strong>
            <span>Workspace</span>
          </div>
          <button className="icon-button workspace-toggle" aria-label="Collapse sidebar" onClick={onClose}>
            <ChevronLeft size={17} />
          </button>
        </div>

        <div className="nav-section-label">Workspace</div>
        <nav className="side-nav" aria-label="Main navigation">
          {navigation.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {label === 'My tasks' && <span className="nav-count">{openTaskCount}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <Settings2 size={18} strokeWidth={1.8} />
            <span>Settings</span>
          </NavLink>
          <div className="sidebar-profile">
            <div className="avatar avatar-small">MC</div>
            <div className="profile-copy"><strong>Maya Chen</strong><span>Admin</span></div>
            <span className="online-dot" />
          </div>
        </div>
      </aside>
    </>
  )
}
