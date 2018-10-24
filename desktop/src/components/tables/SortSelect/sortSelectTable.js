import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { TableCell,TableRow,Checkbox,TableBody,Table } from '@material-ui/core';

import EnhancedTableHead from './head';
import EnhancedTableToolbar from './tool';
import styles from './styles';
import * as TableDataTypes from 'constants/tableDataTypes';

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'firstName'  
  };
  
  desc = (a, b, orderBy) => {            
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;    
  }
  
  stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }
  
  getSorting = (order, orderBy) => {
    return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleClick = (event, id) => {
    const { tableData,select } = this.props;
    select(tableData.find(ele => {return ele.id === id;}).id);  
  }; 

  isSelected = id => {
    return this.props.selected.id === id;
  }

  render() {
    const { classes, tableData, headerData,selected,add,label,selectLabel } = this.props;
    const { order, orderBy } = this.state;
    //console.log(tableData)
    return (
      <div >
        <EnhancedTableToolbar selected={selected} add={add} label={label} selectLabel={selectLabel}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              headerData={headerData}
              selected={selected}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={tableData.length}
            />
            <TableBody>
              {this.stableSort(tableData, this.getSorting(order, orderBy))
                .map(n => {
                  const isSelected = this.isSelected(n.id);                                   
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      {headerData.map(ele => {
                        //console.log(ele);
                        const { type, id, key } = ele;

                        if (type === TableDataTypes.NUMBER || type === TableDataTypes.BOOLEAN) {
                          return <TableCell padding="dense" key={id} numeric >{n[id]}</TableCell>;
                        } else if (type === TableDataTypes.STRING) {
                          return <TableCell padding="dense" key={id} >{n[id]}</TableCell>;
                        } else if (type === TableDataTypes.OBJECT) {
                          return <TableCell padding="dense" key={id} >{n[id][key]}</TableCell>;
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

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableData: PropTypes.array.isRequired,
  headerData: PropTypes.array.isRequired,
  selected: PropTypes.object.isRequired,
  select: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  selectLabel: PropTypes.func.isRequired
};

export default withStyles(styles)(EnhancedTable);