import { TableCell } from '@material-ui/core'
import classNames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
import Link from '@material-ui/core/Link'
import { sortBy, sortedUniqBy } from 'lodash'

const taskLengthSet = {
  3: 10,
  4: 9,
  5: 7,
  6: 7,
  7: 6,
}

const TaskCell = ({ rowData, classes, rowHeight, updateFilter }) => {
  const tasks = rowData.activities
    ? rowData.activities.map((activity) => activity.projectTask.task)
    : []
  const sortedUniqueTasks = sortedUniqBy(
    sortBy(tasks, [(task) => task.name]),
    'id',
  )
  const cutOffOption = taskLengthSet[sortedUniqueTasks.length]
  const cutOff = cutOffOption ? cutOffOption : 100
  return (
    <TableCell
      component="div"
      className={classNames(
        classes.tableCell,
        classes.flexContainer,
        'space-x-2',
      )}
      style={{ height: rowHeight }}
      padding="default"
    >
      {sortedUniqueTasks.map((task, i) => {
        const shortName =
          task.name.length >= cutOff ? task.name.substr(0, cutOff) : task.name
        return (
          <Tooltip interactive key={i} title={task.name}>
            <Link
              component="button"
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                updateFilter({
                  taskId: task.id,
                })
              }}
            >
              {shortName}
            </Link>
          </Tooltip>
        )
      })}
    </TableCell>
  )
}

export default TaskCell
