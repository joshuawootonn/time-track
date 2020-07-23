import React from 'react';
import { TableCell } from '@material-ui/core';
import classNames from 'classnames';

const ProjectCompletionCell = ({ rowData, classes, rowHeight }) => (
  <TableCell
    component="div"
    className={classNames(classes.tableCell, classes.flexContainer)}
    style={{ height: rowHeight }}
    padding="default"
  >
    {rowData.totalEstimate < 1
      ? 0
      : Math.round(100 * (rowData.totalActual / rowData.totalEstimate))}{' '}
    %
  </TableCell>
);

export default ProjectCompletionCell;
