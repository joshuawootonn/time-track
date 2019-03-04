import React from 'react';
import PropTypes from 'prop-types';

import { TableCell, TableHead, TableRow } from '@material-ui/core';

export class GenericHead extends React.Component {  
  render() {
    const {  headerData } = this.props;
    return (
      <TableHead>
        <TableRow>        
          {headerData.map(row => {
            const key = row.keys ? row.id + row.keys.join('') : row.id;            
            return (
              <TableCell
                key={key}
                align={row.align}
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

GenericHead.propTypes = {
  rowCount: PropTypes.number.isRequired,
  headerData: PropTypes.array.isRequired
};

export default GenericHead;