import moment from 'moment'
import classNames from 'classnames'

interface DayProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function DateInLastMonth({ className, value, onChange }: DayProps) {
  const oneMonthAgo = moment().subtract(1, 'month').format('YYYY-MM-DD')
  const today = moment().format('YYYY-MM-DD')

  return (
    <input
      className={classNames(
        className,
        'text-black min-w-fit h-[36px] md:h-[38px] border border-gray-800 rounded',
      )}
      type="date"
      min={oneMonthAgo}
      max={today}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      style={{ borderColor: 'rgb(204, 204, 204)' }}
    />
  )
}
