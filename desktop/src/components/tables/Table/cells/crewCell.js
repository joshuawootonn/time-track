import React from 'react';
import { TableCell } from '@material-ui/core';
import classNames from 'classnames';
import Link from '@material-ui/core/Link';

const CrewCell = ({ rowData, classes, rowHeight, updateFilter }) => (
  <TableCell
    component="div"
    className={classNames(classes.tableCell, classes.flexContainer)}
    style={{ height: rowHeight }}
    padding="default"
  >
    <Link
      component="button"
      size="small"
      onClick={e => {
        e.stopPropagation();
        updateFilter({
          crewId: rowData.employee.crew.id
        });
      }}
    >
      {rowData.employee.crew.name}
    </Link>
  </TableCell>
);

export default CrewCell;
