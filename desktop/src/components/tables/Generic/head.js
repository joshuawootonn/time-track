import React from 'react';
import PropTypes from 'prop-types';

import { TableCell, TableHead, TableRow } from '@material-ui/core';

class EnhancedTableHead extends React.Component {  
  render() {
    const {  headerData } = this.props;

    return (
      <TableHead>
        <TableRow>        
          {headerData.map(row => {
            return (
              <TableCell
                key={row.id + row.key}
                numeric={row.numeric}
                padding={row.padding}
              >               
                {row.label}                 
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  rowCount: PropTypes.number.isRequired,
  headerData: PropTypes.array.isRequired
};

export default EnhancedTableHead;