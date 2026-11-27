import { cn } from '../../lib/utils'

export function Button({ variant = 'primary', className, ...props }) {
  return <button className={cn('button', `button-${variant}`, className)} {...props} />
}
