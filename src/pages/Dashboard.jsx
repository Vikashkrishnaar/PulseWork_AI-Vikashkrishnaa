import { format, isBefore, parseISO, startOfDay } from 'date-fns'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Plus,
  Sparkles,
  Upload,
} from 'lucide-react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { TaskCard } from '../components/dashboard/TaskCard'
import { useTasks } from '../hooks/useTasks'

const TaskAnalyticsChart = lazy(() => import('../components/dashboard/TaskAnalyticsChart'))

const chartColors = {
  Todo: '#cbd5e1',
  'In Progress': '#8776e8',
  Review: '#f5b544',
  Completed: '#4bbb96',
}

export function Dashboard() {
  const { tasks, deleteTask } = useTasks()
  const { openCreate, openEdit } = useOutletContext()
  const [now, setNow] = useState(null)

  useEffect(() => {
    const updateTime = () => setNow(new Date())
    updateTime()
    const intervalId = window.setInterval(updateTime, 60000)
    return () => window.clearInterval(intervalId)
  }, [])

  const greeting = now
    ? now.getHours() < 12 ? 'Good morning' : now.getHours() < 18 ? 'Good afternoon' : 'Good evening'
    : 'Welcome'
  const today = startOfDay(now ?? new Date(0))
  const completed = tasks.filter((task) => task.status === 'Completed').length
  const inProgress = tasks.filter((task) => task.status === 'In Progress').length
  const overdue = tasks.filter((task) => (
    task.status !== 'Completed' && isBefore(startOfDay(parseISO(task.dueDate)), today)
  )).length
  const statusData = ['Todo', 'In Progress', 'Review', 'Completed'].map((status) => ({
    name: status,
    value: tasks.filter((task) => task.status === status).length,
  }))
  const recentTasks = [...tasks]
    .sort((first, second) => second.updatedAt.localeCompare(first.updatedAt))
    .slice(0, 3)

  function confirmDelete(task) {
    if (window.confirm(`Delete “${task.title}”? This cannot be undone.`)) {
      deleteTask(task.id)
    }
  }

  const stats = [
    { label: 'Total tasks', value: tasks.length, detail: 'Across your workspace', icon: CircleDashed, color: 'violet', trend: 'All work in one place' },
    { label: 'In progress', value: inProgress, detail: 'Moving forward now', icon: Clock3, color: 'blue', trend: `${tasks.length ? Math.round((inProgress / tasks.length) * 100) : 0}% of all tasks` },
    { label: 'Completed', value: completed, detail: 'Nicely done, team', icon: CheckCircle2, color: 'green', trend: `${tasks.length ? Math.round((completed / tasks.length) * 100) : 0}% of all tasks` },
    { label: 'Overdue', value: overdue, detail: 'Needs a little attention', icon: overdue ? ArrowUpRight : ArrowDownRight, color: 'orange', trend: overdue ? 'Past the due date' : 'You’re all caught up' },
  ]

  return (
    <div className="page dashboard-page">
      <div className="welcome-row">
        <div>
          <div className="eyebrow welcome-eyebrow">{now ? format(now, 'EEEE, MMMM d') : 'YOUR WORKSPACE'}</div>
          <h1>{greeting}, Maya <span className="wave">✦</span></h1>
          <p>Here’s what’s happening across your workspace today.</p>
        </div>
        <button className="button button-primary create-button" onClick={openCreate}>
          <Plus size={17} /> Create task
        </button>
      </div>

      <section className="stats-grid" aria-label="Task statistics">
        {stats.map(({ label, value, detail, icon: Icon, color, trend }) => (
          <article className="stat-card" key={label}>
            <div className="stat-top">
              <span>{label}</span>
              <span className={`stat-icon stat-icon-${color}`}><Icon size={17} /></span>
            </div>
            <div className="stat-value">{value}</div>
            <div className="stat-bottom"><span>{detail}</span><span className="stat-trend">{trend}</span></div>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="panel analytics-panel">
          <div className="panel-heading">
            <div><h2>Task overview</h2><p>A snapshot of work by status</p></div>
            <span className="panel-menu-label">This workspace</span>
          </div>
          {tasks.length ? (
            <Suspense fallback={<div className="chart-empty">Loading task overview…</div>}>
              <TaskAnalyticsChart statusData={statusData} colors={chartColors} total={tasks.length} />
            </Suspense>
          ) : (
            <div className="chart-empty"><span className="empty-icon"><CircleDashed size={21} /></span><strong>No task data yet</strong><span>Create your first task to see the breakdown.</span></div>
          )}
        </article>

        <article className="panel quick-panel">
          <div className="panel-heading">
            <div><h2>Quick actions</h2><p>Pick up where you left off</p></div>
            <Sparkles size={17} className="quick-sparkle" />
          </div>
          <button className="quick-action" onClick={openCreate}>
            <span className="quick-icon quick-icon-violet"><Plus size={17} /></span>
            <span><strong>Create a task</strong><small>Capture a new to-do</small></span><ArrowRight size={16} />
          </button>
          <button className="quick-action" onClick={() => document.getElementById('recent-tasks')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="quick-icon quick-icon-blue"><CheckCircle2 size={17} /></span>
            <span><strong>Review recent tasks</strong><small>See what’s moving</small></span><ArrowRight size={16} />
          </button>
          <Link className="quick-action" to="/documents">
            <span className="quick-icon quick-icon-orange"><Upload size={17} /></span>
            <span><strong>Upload a document</strong><small>Document tools coming soon</small></span><ArrowRight size={16} />
          </Link>
        </article>
      </section>

      <section className="recent-section" id="recent-tasks">
        <div className="section-heading">
          <div><h2>Recent tasks</h2><p>The latest updates from your team</p></div>
          <Link className="text-link" to="/tasks">View all tasks <ArrowRight size={15} /></Link>
        </div>
        {recentTasks.length ? (
          <div className="task-card-grid">
            {recentTasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={openEdit} onDelete={confirmDelete} />
            ))}
          </div>
        ) : (
          <div className="empty-state"><div className="empty-icon"><CheckCircle2 size={22} /></div><h3>Your task list is clear</h3><p>Create a task to give your team a next step.</p><button className="button button-primary" onClick={openCreate}><Plus size={16} /> Create task</button></div>
        )}
      </section>
    </div>
  )
}
