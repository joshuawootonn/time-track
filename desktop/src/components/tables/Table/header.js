import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableCell, TableSortLabel } from '@material-ui/core';
import { SortDirection } from 'react-virtualized';

const Header = props => {
  const {
    label,
    columnIndex,
    sortBy,
    sortDirection,
    headerHeight,
    columns,
    classes
  } = props;

  //console.log('table: header')

  const direction = {
    [SortDirection.ASC]: `asc`,
    [SortDirection.DESC]: `desc`
  };

  return (
    <TableCell
      component="div"
      className={classNames(classes.tableCell, classes.flexContainer)}
      variant="head"
      style={{ height: headerHeight, flex: 1 }}
      align={columns[columnIndex].numeric || false ? `right` : `left`}
    >
      <TableSortLabel
        // here I compare the unique id with sortBy
        active={columns[columnIndex].id === sortBy}
        direction={direction[sortDirection]}
      >
        {label}
      </TableSortLabel>
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
