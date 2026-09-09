import React from 'react'
import { TableCell, Switch } from '@material-ui/core'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { projectActions } from '~/store/actions'

const ProjectActiveCell = ({ rowData, classes, rowHeight }) => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.stopPropagation()
    dispatch(
      projectActions.toggleProjectActive(rowData.id, event.target.checked),
    )
  }

  return (
    <TableCell
      component="div"
      className={classNames(classes.tableCell, classes.flexContainer)}
      style={{ height: rowHeight }}
      padding="default"
      onClick={(event) => event.stopPropagation()}
    >
      <Switch
        checked={!!rowData.isActive}
        onChange={handleChange}
        color="secondary"
        edge="start"
      />
    </TableCell>
  )
}

export default ProjectActiveCell
