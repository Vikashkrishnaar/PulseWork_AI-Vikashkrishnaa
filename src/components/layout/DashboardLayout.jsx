import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { TaskForm } from '../tasks/TaskForm'
import { useTasks } from '../../hooks/useTasks'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { SystemBanner } from './SystemBanner'

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const { createTask, updateTask } = useTasks()

  function openCreate() {
    setEditingTask(null)
    setFormOpen(true)
  }

  function openEdit(task) {
    setEditingTask(task)
    setFormOpen(true)
  }

  function closeForm() {
    setFormOpen(false)
    setEditingTask(null)
  }

  async function saveTask(values) {
    if (editingTask) updateTask(editingTask.id, values)
    else createTask(values)
    closeForm()
  }

  return (
    <div className="app-shell">
      <SystemBanner />
      <div className="app-body">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="main-column">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="main-content">
            <Outlet context={{ openCreate, openEdit }} />
          </main>
        </div>
      </div>
      {formOpen && (
        <div className="modal-backdrop" role="presentation">
          <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="task-form-title">
            <TaskForm task={editingTask} onCancel={closeForm} onSubmit={saveTask} />
          </section>
        </div>
      )}
    </div>
  )
}
