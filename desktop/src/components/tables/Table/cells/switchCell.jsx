import React from 'react'
import { TableCell, Switch } from '@material-ui/core'
import classNames from 'classnames'

const SwitchCell = ({
  rowData,
  columns,
  columnIndex,
  classes,
  rowHeight,
  onToggle,
}) => {
  const { dataKey } = columns[columnIndex]

  return (
    <TableCell
      component="div"
      className={classNames(classes.tableCell, classes.flexContainer)}
      style={{ height: rowHeight }}
      padding="default"
    >
      <Switch
        checked={!!rowData[dataKey]}
        onClick={(event) => event.stopPropagation()}
        onChange={(event) =>
          onToggle && onToggle(rowData, event.target.checked)
        }
      />
    </TableCell>
  )
}

export default SwitchCell
