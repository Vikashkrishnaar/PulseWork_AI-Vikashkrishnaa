import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '../ui/Button'
import { taskPriorities, taskSchema, taskStatuses } from '../../schemas/taskSchema'

const assignees = ['Maya Chen', 'Jordan Lee', 'Alex Morgan', 'Sam Rivera']

function getDefaultValues(task) {
  return {
    title: task?.title ?? '',
    description: task?.description ?? '',
    priority: task?.priority ?? 'Medium',
    status: task?.status ?? 'Todo',
    assignee: task?.assignee ?? '',
    dueDate: task?.dueDate ?? '',
    tags: task?.tags ?? [],
  }
}

export function TaskForm({ task, onCancel, onSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: getDefaultValues(task),
  })

  async function submit(values) {
    try {
      await onSubmit({ ...values, tags: values.tags?.filter(Boolean) ?? [] })
      toast.success(task ? 'Task updated' : 'Task created', {
        description: task ? 'Your changes have been saved.' : 'Your new task is ready to go.',
      })
      reset(getDefaultValues(null))
    } catch (error) {
      console.error('Task could not be saved.', error)
      toast.error('Task could not be saved', { description: 'Please try again.' })
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit(submit)} noValidate>
      <div className="form-heading">
        <div>
          <span className="eyebrow">{task ? 'UPDATE WORK ITEM' : 'NEW WORK ITEM'}</span>
          <h2 id="task-form-title">{task ? 'Edit task' : 'Create a task'}</h2>
          <p>Keep the next step clear and the team moving.</p>
        </div>
        <button type="button" className="modal-close" onClick={onCancel} aria-label="Close form">×</button>
      </div>

      <label className="form-field">
        <span>Task title <b>*</b></span>
        <input {...register('title')} placeholder="e.g. Review the launch brief" autoFocus aria-invalid={Boolean(errors.title)} />
        {errors.title && <small className="field-error">{errors.title.message}</small>}
      </label>

      <label className="form-field">
        <span>Description <b>*</b></span>
        <textarea {...register('description')} rows={3} placeholder="What needs to get done?" aria-invalid={Boolean(errors.description)} />
        {errors.description && <small className="field-error">{errors.description.message}</small>}
      </label>

      <div className="form-grid">
        <label className="form-field">
          <span>Priority</span>
          <select {...register('priority')}>
            {taskPriorities.map((priority) => <option key={priority}>{priority}</option>)}
          </select>
          {errors.priority && <small className="field-error">{errors.priority.message}</small>}
        </label>
        <label className="form-field">
          <span>Status</span>
          <select {...register('status')}>
            {taskStatuses.map((status) => <option key={status}>{status}</option>)}
          </select>
          {errors.status && <small className="field-error">{errors.status.message}</small>}
        </label>
        <label className="form-field">
          <span>Assignee <b>*</b></span>
          <select {...register('assignee')} aria-invalid={Boolean(errors.assignee)}>
            <option value="">Select a teammate</option>
            {assignees.map((assignee) => <option key={assignee}>{assignee}</option>)}
          </select>
          {errors.assignee && <small className="field-error">{errors.assignee.message}</small>}
        </label>
        <label className="form-field">
          <span>Due date <b>*</b></span>
          <input type="date" {...register('dueDate')} aria-invalid={Boolean(errors.dueDate)} />
          {errors.dueDate && <small className="field-error">{errors.dueDate.message}</small>}
        </label>
      </div>

      <label className="form-field">
        <span>Tags <small className="muted">(optional, separated by commas)</small></span>
        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <input
              value={field.value.join(', ')}
              onChange={(event) => field.onChange(event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean))}
              onBlur={field.onBlur}
              placeholder="Design, Launch"
              name={field.name}
              ref={field.ref}
            />
          )}
        />
      </label>

      <div className="form-actions">
        <Button type="button" variant="quiet" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : task ? 'Save changes' : 'Create task'}
        </Button>
      </div>
    </form>
  )
}
