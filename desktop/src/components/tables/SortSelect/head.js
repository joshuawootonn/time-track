import React from 'react';
import PropTypes from 'prop-types';

import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {  order, orderBy, headerData } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell>
            
          </TableCell>
          {headerData.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.padding}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  selected: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headerData: PropTypes.array.isRequired
};

export default EnhancedTableHead;