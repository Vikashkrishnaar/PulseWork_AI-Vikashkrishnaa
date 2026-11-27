import { format, isValid, parseISO } from 'date-fns'
import { CalendarDays, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

function formatDate(value, pattern) {
  const date = parseISO(value)
  return isValid(date) ? format(date, pattern) : 'No date'
}

function classNameFor(value) {
  return value.toLowerCase().replaceAll(' ', '-')
}

export function TaskCard({ task, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <article className="task-card">
      <div className="task-card-top">
        <div className="task-card-badges">
          <span className={`priority-badge priority-${classNameFor(task.priority)}`}>
            <span className="priority-dot" />{task.priority}
          </span>
          <span className={`status-badge status-${classNameFor(task.status)}`}>{task.status}</span>
        </div>
        <div className="task-card-actions">
          <button type="button" className="icon-button task-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={`Actions for ${task.title}`} aria-expanded={menuOpen}>
            <MoreHorizontal size={19} />
          </button>
          <div className={`task-action-menu ${menuOpen ? 'task-action-menu-open' : ''}`}>
            <button type="button" onClick={() => { setMenuOpen(false); onEdit(task) }}><Pencil size={14} /> Edit task</button>
            <button type="button" onClick={() => { setMenuOpen(false); onDelete(task) }}><Trash2 size={14} /> Delete task</button>
          </div>
        </div>
      </div>
      <h3 className="task-card-title">{task.title}</h3>
      <p className="task-card-description">{task.description}</p>
      {task.tags?.length > 0 && (
        <div className="task-tags">
          {task.tags.map((tag) => <span className="task-tag" key={tag}>{tag}</span>)}
        </div>
      )}
      <div className="task-card-footer">
        <div className="task-assignee">
          <span className="avatar avatar-tiny">{task.assignee.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase()}</span>
          <span>{task.assignee}</span>
        </div>
        <span className="task-date">
          <CalendarDays size={14} />
          <span>Due {formatDate(task.dueDate, 'MMM d')}</span>
        </span>
      </div>
      <div className="task-created-date">Created {formatDate(task.createdAt, 'MMM d, yyyy')}</div>
    </article>
  )
}
