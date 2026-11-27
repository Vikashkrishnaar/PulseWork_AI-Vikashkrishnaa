import assert from 'node:assert/strict'
import test from 'node:test'
import { taskSchema } from '../src/schemas/taskSchema.js'

function localDateOffset(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function validTask(overrides = {}) {
  return {
    title: 'Review launch plan',
    description: 'Check the plan and share useful feedback.',
    priority: 'High',
    status: 'Todo',
    assignee: 'Maya Chen',
    dueDate: localDateOffset(1),
    tags: [],
    ...overrides,
  }
}

test('trims valid task text and accepts a future local date', () => {
  const result = taskSchema.safeParse(validTask({ title: '  Review launch plan  ' }))

  assert.equal(result.success, true)
  assert.equal(result.data.title, 'Review launch plan')
})

test('rejects short titles, short descriptions, invalid priority, and missing assignee', () => {
  for (const invalidTask of [
    validTask({ title: 'No' }),
    validTask({ description: 'Too short' }),
    validTask({ priority: 'Critical' }),
    validTask({ assignee: '  ' }),
  ]) {
    assert.equal(taskSchema.safeParse(invalidTask).success, false)
  }
})

test('rejects past and impossible local calendar dates', () => {
  assert.equal(taskSchema.safeParse(validTask({ dueDate: localDateOffset(-1) })).success, false)
  assert.equal(taskSchema.safeParse(validTask({ dueDate: '2026-02-31' })).success, false)
})
