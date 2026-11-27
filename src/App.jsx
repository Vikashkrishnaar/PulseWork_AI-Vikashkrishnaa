import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { Dashboard } from './pages/Dashboard'
import { NotFound } from './pages/NotFound'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { Tasks } from './pages/Tasks'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="projects" element={<PlaceholderPage title="Projects" />} />
          <Route path="team" element={<PlaceholderPage title="Team" />} />
          <Route path="documents" element={<PlaceholderPage title="Documents" />} />
          <Route path="assistant" element={<PlaceholderPage title="AI Assistant" />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" />} />
          <Route path="not-found" element={<NotFound />} />
        </Route>
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
