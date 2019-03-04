import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { TableCell,TableRow,TableBody,Table } from '@material-ui/core';
import moment from 'moment';

import EnhancedTableHead from './head';
import EnhancedTableToolbar from './tool';
import styles from './styles';
import * as TableDataTypes from 'constants/tableDataTypes';

export class GenericTable extends React.Component { 
  render() {
    const { classes, tableData, headerData,edit, label,add,remove } = this.props;   
    return (
      <div >
        <EnhancedTableToolbar edit={edit} add={add} remove={remove} label={label} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              headerData={headerData}
              rowCount={tableData.length}
            />
            <TableBody>
              {tableData
                .map(n => {
                                               
                  return (
                    <TableRow
                      hover                      
                      role="checkbox"
                      tabIndex={-1}
                      key={n.id}
                    >                      
                      {headerData.map(ele => {
                        const { type, id, keys } = ele;
                        if (type === TableDataTypes.NUMBER || type === TableDataTypes.BOOLEAN) {
                          return <TableCell padding="dense" key={id} align="right" >{n[id]}</TableCell>;
                        } else if (type === TableDataTypes.STRING) {
                          return <TableCell padding="dense" key={id} >{n[id]}</TableCell>;
                        } else if (type === TableDataTypes.OBJECT) {
                          // The reduce function here is just used to deconstruct the objects to the value that we want on the table
                          return <TableCell padding="dense" key={id+keys.join('')} >{keys.reduce((object, currentKey) => object[currentKey],n[id])}</TableCell>;
                        } else if (type === TableDataTypes.DATE) {
                          return <TableCell padding="dense" key={id} >{moment(n[id]).format('MM/DD/YY')}</TableCell>;
                        } else if (type === TableDataTypes.DATETIME) {
                          return <TableCell padding="dense" key={id} >{moment(n[id]).format('hh:mm a MM/DD')}</TableCell>;
                        } else if (type === TableDataTypes.LENGTH) {
                          const length = moment.duration(n[id], 'minutes');
                          return <TableCell padding="dense" key={id+length.hours()} >{`${length.hours()}h ${length.minutes()}m`}</TableCell>;
                        }
                        return null;
                      })}
                    </TableRow>
                  );
                })}             
            </TableBody>
          </Table>
        </div>        
      </div>

    );
  }
}

GenericTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableData: PropTypes.array.isRequired,
  headerData: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  edit:PropTypes.func,
  add:PropTypes.func,
  remove:PropTypes.func
};

export default withStyles(styles)(GenericTable);