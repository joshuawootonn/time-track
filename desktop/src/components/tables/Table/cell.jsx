import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableCell } from '@material-ui/core';
import moment from 'moment';

import * as TableDataTypes from '~/constants/tableDataTypes';
import { minutesRoudedTime } from '~/helpers/time';

const Cell = props => {
  //console.log('table: cell')
  const {
    cellData,
    rowData,
    columnIndex = null,
    columns,
    classes,
    rowHeight
  } = props;
  const { type, id, keys } = columns[columnIndex];

  let data,
    alignment = `left`,
    key = id;

  if (type === TableDataTypes.NUMBER || type === TableDataTypes.BOOLEAN) {
    data = cellData;
    alignment = `left`;
  } else if (type === TableDataTypes.STRING) {
    data = cellData;
  } else if (type === TableDataTypes.OBJECT) {
    // The reduce function here is just used to deconstruct the objects to the value that we want on the table
    data = keys.reduce((object, currentKey) => {
      // this just checks if the object is defined. it prevents error that would occur if you got the wrong id on a item for some reason.
      return object === undefined ? null : object[currentKey];
    }, rowData[columns[columnIndex].dataKey]);
    key = id + keys.join(``);
  } else if (type === TableDataTypes.DATE) {
    if (!cellData) {
      data = '';
    } else {
      data = moment
        .utc(cellData)
        .local()
        .format(`MM/DD/YY`);
    }
  } else if (type === TableDataTypes.DATETIME) {
    if (!cellData) {
      data = '';
    } else {
      data = moment
        .utc(cellData)
        .local()
        .format(`hh:mm a MM/DD`);
    }
  } else if (type === TableDataTypes.LENGTH) {
    const length = minutesRoudedTime(
      moment.duration(cellData, `minutes`).asMinutes()
    );
    data = `${Math.floor(length / 60)}h ${length % 60}m`;
  }
  return (
    <TableCell
      component="div"
      className={classNames(classes.tableCell, classes.flexContainer)}
      style={{ height: rowHeight }}
      padding="default"
      key={key}
      align={alignment}
    >
      {data}
    </TableCell>
  );
};

Cell.propTypes = {
  cellData: PropTypes.any,
  columnIndex: PropTypes.number,
  columns: PropTypes.array,
  classes: PropTypes.object,
  rowHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowData: PropTypes.object
};

export default Cell;
