import { ListFilter, Plus, RefreshCw, Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { TaskCard } from '../components/dashboard/TaskCard'
import { useTasks } from '../hooks/useTasks'
import { api } from '../services/api'

function getUsers(signal) {
  return api.get('/users', { signal }).then((response) => {
    if (!Array.isArray(response.data)) {
      throw new Error('The user response was not a list.')
    }
    return response.data
  })
}

export function Tasks() {
  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(true)
  const [usersError, setUsersError] = useState('')
  const requestController = useRef(null)
  const {
    tasks,
    filteredTasks,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    deleteTask,
  } = useTasks()
  const { openCreate, openEdit } = useOutletContext()

  function refreshUsers() {
    requestController.current?.abort()
    const controller = new AbortController()
    requestController.current = controller
    setUsersLoading(true)
    setUsersError('')

    getUsers(controller.signal)
      .then(setUsers)
      .catch(() => {
        if (!controller.signal.aborted) {
          setUsersError('Unable to load users right now. Check your connection and try again.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setUsersLoading(false)
      })
  }

  useEffect(() => {
    const controller = new AbortController()
    requestController.current = controller

    getUsers(controller.signal)
      .then(setUsers)
      .catch(() => {
        if (!controller.signal.aborted) {
          setUsersError('Unable to load users right now. Check your connection and try again.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setUsersLoading(false)
      })

    return () => controller.abort()
  }, [])

  function confirmDelete(task) {
    if (window.confirm(`Delete “${task.title}”? This cannot be undone.`)) {
      deleteTask(task.id)
    }
  }

  return (
    <div className="page tasks-page">
      <div className="page-heading-row">
        <div><span className="eyebrow">YOUR WORKSPACE</span><h1>My tasks</h1><p>Keep track of the work that moves your team forward.</p></div>
        <button className="button button-primary" onClick={openCreate}><Plus size={17} /> Create task</button>
      </div>
      <section className="panel directory-panel" aria-labelledby="sample-users-heading" aria-busy={usersLoading}>
        <div className="panel-heading directory-heading">
          <div>
            <h2 id="sample-users-heading">Sample user directory</h2>
            <p>Mock data from JSONPlaceholder; it is not saved to your workspace.</p>
          </div>
          <button className="button button-quiet" type="button" onClick={refreshUsers} disabled={usersLoading}>
            <RefreshCw size={15} /> {usersLoading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
        {usersLoading ? (
          <div className="directory-message" role="status">Loading users...</div>
        ) : usersError ? (
          <div className="directory-message directory-error" role="alert">
            <p>{usersError}</p>
            <button className="button button-quiet" type="button" onClick={refreshUsers}>Try again</button>
          </div>
        ) : users.length === 0 ? (
          <div className="directory-message" role="status">No users were returned by the sample API.</div>
        ) : (
          <div className="directory-table-wrap">
            <table className="directory-table">
              <thead>
                <tr><th>Name</th><th>Email</th><th>Phone</th><th>Website</th></tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.website}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <div className="task-list-toolbar">
        <label className="task-search">
          <Search size={16} />
          <input aria-label="Search tasks by title" placeholder="Search tasks..." value={search} onChange={(event) => setSearch(event.target.value)} />
        </label>
        <div className="filter-control"><ListFilter size={15} /><select aria-label="Filter by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All statuses</option><option>Todo</option><option>In Progress</option><option>Review</option><option>Completed</option></select></div>
        <div className="filter-control"><SlidersHorizontal size={15} /><select aria-label="Filter by priority" value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}><option>All priorities</option><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select></div>
        <label className="sort-control"><span>Sort by</span><select aria-label="Sort tasks" value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option value="dueDate">Due date</option><option value="createdAt">Recently created</option></select></label>
      </div>
      <div className="task-results-heading">
        <span>{filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}</span>
        {(search || statusFilter !== 'All statuses' || priorityFilter !== 'All priorities') && (
          <button className="clear-filters" onClick={() => { setSearch(''); setStatusFilter('All statuses'); setPriorityFilter('All priorities') }}>Clear filters</button>
        )}
      </div>
      {filteredTasks.length ? (
        <div className="task-card-grid task-page-grid">
          {filteredTasks.map((task) => <TaskCard key={task.id} task={task} onEdit={openEdit} onDelete={confirmDelete} />)}
        </div>
      ) : (
        <div className="empty-state task-empty-state">
          <div className="empty-icon"><Search size={22} /></div>
          <h3>{tasks.length ? 'No tasks match these filters' : 'No tasks yet'}</h3>
          <p>{tasks.length ? 'Try a different search or clear the filters.' : 'Create a task to start organizing your work.'}</p>
          {tasks.length ? <button className="button button-quiet" onClick={() => { setSearch(''); setStatusFilter('All statuses'); setPriorityFilter('All priorities') }}>Clear filters</button> : <button className="button button-primary" onClick={openCreate}><Plus size={16} /> Create task</button>}
        </div>
      )}
    </div>
  )
}
