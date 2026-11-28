import { CheckCircle2, CircleDashed, Clock3, ListTodo } from 'lucide-react'
import { useTasks } from '../hooks/useTasks'

export function Analytics() {
  const { tasks } = useTasks()
  const completed = tasks.filter((task) => task.status === 'Completed').length
  const pending = tasks.filter((task) => task.status === 'Todo' || task.status === 'Review').length
  const inProgress = tasks.filter((task) => task.status === 'In Progress').length

  const stats = [
    { label: 'Total tasks', value: tasks.length, detail: 'All workspace tasks', icon: CircleDashed, color: 'violet' },
    { label: 'Completed tasks', value: completed, detail: 'Marked complete', icon: CheckCircle2, color: 'green' },
    { label: 'Pending tasks', value: pending, detail: 'To do or awaiting review', icon: ListTodo, color: 'orange' },
    { label: 'In progress tasks', value: inProgress, detail: 'Currently underway', icon: Clock3, color: 'blue' },
  ]

  return (
    <div className="page">
      <div className="page-heading-row">
        <div>
          <span className="eyebrow">YOUR WORKSPACE</span>
          <h1>Analytics</h1>
          <p>Task progress calculated from your current workspace tasks.</p>
        </div>
      </div>
      <section className="stats-grid" aria-label="Task analytics">
        {stats.map(({ label, value, detail, icon: Icon, color }) => (
          <article className="stat-card" key={label}>
            <div className="stat-top">
              <span>{label}</span>
              <span className={`stat-icon stat-icon-${color}`}><Icon size={17} /></span>
            </div>
            <div className="stat-value">{value}</div>
            <div className="stat-bottom"><span>{detail}</span></div>
          </article>
        ))}
      </section>
    </div>
  )
}
