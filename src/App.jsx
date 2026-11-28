import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { Analytics } from './pages/Analytics'
import { Dashboard } from './pages/Dashboard'
import { NotFound } from './pages/NotFound'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { Tasks } from './pages/Tasks'
import { Settings } from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="projects" element={<PlaceholderPage title="Projects" />} />
          <Route path="team" element={<PlaceholderPage title="Team" />} />
          <Route path="documents" element={<PlaceholderPage title="Documents" />} />
          <Route path="assistant" element={<PlaceholderPage title="AI Assistant" />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
