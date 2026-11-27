import { z } from 'zod'

const taskPriorities = ['Low', 'Medium', 'High', 'Urgent']
const taskStatuses = ['Todo', 'In Progress', 'Review', 'Completed']

function isValidLocalDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const taskSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters.'),
  description: z.string().trim().min(10, 'Description must be at least 10 characters.'),
  priority: z.enum(taskPriorities),
  status: z.enum(taskStatuses),
  assignee: z.string().trim().min(1, 'Choose an assignee.'),
  dueDate: z.string()
    .refine(isValidLocalDate, 'Enter a valid due date.')
    .refine((value) => value >= getLocalDateString(), 'Due date cannot be in the past.'),
  tags: z.array(z.string().trim().min(1)).optional(),
}).strict()

export { taskPriorities, taskStatuses }
