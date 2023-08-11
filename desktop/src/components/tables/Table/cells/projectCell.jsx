import { TableCell } from '@material-ui/core'
import classNames from 'classnames'
import Link from '@material-ui/core/Link'

import Tooltip from '@material-ui/core/Tooltip'
import { sortBy, sortedUniqBy } from 'lodash'

const ProjectCell = ({ rowData, classes, rowHeight, updateFilter }) => {
  const projects = rowData.activities
    ? rowData.activities.map((activity) => activity.projectTask.project)
    : []
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
      {sortedUniqBy(sortBy(projects, [(project) => project.name]), 'id').map(
        (project, i) => {
          const numberOption = project.name.match(/\d+/)
          return (
            numberOption && (
              <Tooltip interactive key={i} title={project.name}>
                <Link
                  component="button"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation()
                    updateFilter({
                      projectId: project.id,
                    })
                  }}
                >
                  {numberOption[0]}
                </Link>
              </Tooltip>
            )
          )
        },
      )}
    </TableCell>
  )
}

export default ProjectCell
