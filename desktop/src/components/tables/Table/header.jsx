import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableCell, TableSortLabel } from '@material-ui/core';
// import { SortDirection } from 'react-virtualized';
import * as TableDataTypes from '~/constants/tableDataTypes';

const Header = props => {
  const {
    label,
    columnIndex,
    sortBy,
    sortDirection,
    headerHeight,
    columns,
    classes,
    type
  } = props;
  const direction = {
    // [SortDirection.ASC]: `asc`,
    // [SortDirection.DESC]: `desc`
  };

  const isSortable =
    type !== TableDataTypes.PROJECTS && type !== TableDataTypes.TASKS;

  return (
    <TableCell
      component="div"
      className={classNames(classes.tableCell, classes.flexContainer)}
      variant={isSortable ? 'head' : 'body'}
      onClick={e => {
        //noop
        isSortable || e.stopPropagation();
      }}
      style={{ height: headerHeight, flex: 1 }}
      align={columns[columnIndex].numeric || false ? `right` : `left`}
    >
      {isSortable ? (
        <TableSortLabel
          active={columns[columnIndex].id === sortBy}
          direction={direction[sortDirection]}
        >
          {label}
        </TableSortLabel>
      ) : (
        label
      )}
    </TableCell>
  );
};

Header.propTypes = {
  dataKey: PropTypes.string,
  label: PropTypes.string,
  columnIndex: PropTypes.number,
  classes: PropTypes.object,
  columns: PropTypes.array,
  sort: PropTypes.any,
  sortBy: PropTypes.any,
  sortDirection: PropTypes.any,
  headerHeight: PropTypes.number
};

export default Header;
