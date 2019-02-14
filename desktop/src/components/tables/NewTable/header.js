import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import styles from './styles';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import * as TableDataTypes from 'constants/tableDataTypes';
import moment from 'moment';
import 'react-virtualized/styles.css';

class Header extends React.Component {
  render() {
    const { label, columnIndex, dataKey, sortBy, sortDirection } = this.props;
    const { headerHeight, columns, classes, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc'
    };
  
    return (
      <TableCell
        className={classNames(classes.tableCell, classes.flexContainer)}
        variant="head"
        style={{ height: headerHeight, flex: 1 }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <TableSortLabel
          active={dataKey === sortBy}
          direction={direction[sortDirection]}
        >
          {label}
        </TableSortLabel>
      </TableCell>
    );
  
  }
}

export default Header;