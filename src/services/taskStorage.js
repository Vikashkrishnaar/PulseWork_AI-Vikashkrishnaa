const STORAGE_KEY = 'pulseworks.tasks'

function daysFromToday(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const sampleTasks = [
  {
    id: 'task-brief',
    title: 'Finalize Q3 launch brief',
    description: 'Bring the product, design, and marketing narrative together for launch.',
    priority: 'High',
    status: 'In Progress',
    assignee: 'Maya Chen',
    dueDate: daysFromToday(2),
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    tags: ['Launch', 'Marketing'],
  },
  {
    id: 'task-onboarding',
    title: 'Review onboarding feedback',
    description: 'Collect the latest customer notes and identify the biggest friction points.',
    priority: 'Medium',
    status: 'Review',
    assignee: 'Jordan Lee',
    dueDate: daysFromToday(4),
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    tags: ['Research'],
  },
  {
    id: 'task-design',
    title: 'Prepare design handoff',
    description: 'Document component states and share the updated prototype with engineering.',
    priority: 'Low',
    status: 'Todo',
    assignee: 'Alex Morgan',
    dueDate: daysFromToday(7),
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    tags: ['Design'],
  },
  {
    id: 'task-audit',
    title: 'Check analytics events',
    description: 'Validate the key product events before the next release candidate.',
    priority: 'Urgent',
    status: 'Completed',
    assignee: 'Sam Rivera',
    dueDate: daysFromToday(-2),
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    tags: ['Product'],
  },
]

export function readTasks() {
  const storedValue = window.localStorage.getItem(STORAGE_KEY)
  if (storedValue === null) return sampleTasks

  const parsedValue = JSON.parse(storedValue)
  if (!Array.isArray(parsedValue)) {
    throw new Error('Saved tasks are not in the expected format.')
  }
  return parsedValue
}

export function saveTasks(tasks) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}
