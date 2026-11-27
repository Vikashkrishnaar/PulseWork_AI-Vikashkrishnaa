import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { TaskContext } from './TaskContext.js'
import { readTasks, saveTasks } from '../services/taskStorage'

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `task-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => readTasks())
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const [priorityFilter, setPriorityFilter] = useState('All priorities')
  const [sortBy, setSortBy] = useState('dueDate')

  useEffect(() => {
    try {
      saveTasks(tasks)
    } catch (error) {
      console.error('Tasks could not be saved to local storage.', error)
      toast.error('Tasks could not be saved', { description: 'Check your browser storage settings and try again.' })
    }
  }, [tasks])

  const createTask = useCallback((task) => {
    const now = new Date().toISOString()
    setTasks((current) => [{ ...task, id: createId(), createdAt: now, updatedAt: now }, ...current])
  }, [])

  const updateTask = useCallback((id, updates) => {
    setTasks((current) => current.map((task) => (
      task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
    )))
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks((current) => current.filter((task) => task.id !== id))
  }, [])

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase()
    return tasks
      .filter((task) => !query || task.title.toLowerCase().includes(query))
      .filter((task) => statusFilter === 'All statuses' || task.status === statusFilter)
      .filter((task) => priorityFilter === 'All priorities' || task.priority === priorityFilter)
      .sort((first, second) => {
        const firstValue = sortBy === 'createdAt' ? first.createdAt : first.dueDate
        const secondValue = sortBy === 'createdAt' ? second.createdAt : second.dueDate
        return sortBy === 'createdAt'
          ? secondValue.localeCompare(firstValue)
          : firstValue.localeCompare(secondValue)
      })
  }, [tasks, search, statusFilter, priorityFilter, sortBy])

  const value = useMemo(() => ({
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
    createTask,
    updateTask,
    deleteTask,
  }), [
    tasks,
    filteredTasks,
    search,
    statusFilter,
    priorityFilter,
    sortBy,
    createTask,
    updateTask,
    deleteTask,
  ])

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
