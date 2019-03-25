import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { TableCell,TableRow,Checkbox,TableBody,Table } from '@material-ui/core';
import moment from 'moment';

import EnhancedTableHead from './head';
import EnhancedTableToolbar from './tool';
import styles from './styles';
import * as TableDataTypes from 'constants/tableDataTypes';

export class SortSelectTable extends React.Component {
  state = {
    order: this.props.initialOrder || 'asc',
    orderBy: this.props.initialOrderBy || null
  };
  
  desc = (a, b, orderBy,type, keys) => {
    if(type === TableDataTypes.OBJECT){
      const aVal = keys.reduce((object, currentKey) => object[currentKey],a[orderBy]);
      const bVal = keys.reduce((object, currentKey) => object[currentKey],b[orderBy]);
      if ( bVal < aVal) {
        return -1;
      }
      if (bVal > aVal) {
        return 1;
      }
      return 0; 
    }
    if(typeof b[orderBy] === 'string' && typeof a[orderBy] === 'string'){
      if (b[orderBy].toUpperCase() < a[orderBy].toUpperCase()) {
        return -1;
      }
      if (b[orderBy].toUpperCase() > a[orderBy].toUpperCase()) {
        return 1;
      }
    }
    
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
  
  getSorting = (order, orderBy, type, keys) => {
    return order === 'desc' ? (a, b) => this.desc(a, b, orderBy, type, keys) : (a, b) => -this.desc(a, b, orderBy, type, keys);
  }

  handleRequestSort = (event, property, type = TableDataTypes.STRING, keys = []) => {
    const orderBy = property;
    
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy, type, keys });
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
    const { order, orderBy,type,keys } = this.state;
    return (
      <div className={classes.root} >
        <EnhancedTableToolbar selected={selected} add={add} label={label} selectLabel={selectLabel}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              headerData={headerData}
              selected={selected}
              order={order}
              orderBy={orderBy}
              type={type}
              keys={keys}
              onRequestSort={this.handleRequestSort}
              rowCount={tableData.length}
            />
            <TableBody>
              {this.stableSort(tableData, this.getSorting(order, orderBy, type, keys))
                .map((n,i)=> {
                  const isSelected = this.isSelected(n.id);                     
                  return (
                    <TableRow
                      hover
                      id={`row-${i}`}
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
                        const { type, id, keys } = ele;                  
                        if (type === TableDataTypes.NUMBER || type === TableDataTypes.BOOLEAN) {
                          return <TableCell padding="dense" key={id} align="right" >{n[id]}</TableCell>;
                        } else if (type === TableDataTypes.STRING) {
                          return <TableCell padding="dense" key={id} >{n[id]}</TableCell>;
                        } else if (type === TableDataTypes.OBJECT) {
                          // The reduce function here is just used to deconstruct the objects to the value that we want on the table
                          return <TableCell padding="dense" key={id+keys.join('')} >{
                            keys.reduce((object, currentKey) => {
                              // this just checks if the object is defined. it prevents error that would occur if you got the wrong id on a item for some reason.
                              return object === undefined ?  null : object[currentKey];
                            },n[id])                          
                          }</TableCell>;
                        } else if (type === TableDataTypes.DATE) {
                          return <TableCell padding="dense" key={id} >{moment(n[id],'YYYY-MM-DD HH:mm:ss').format('MM/DD/YY')}</TableCell>;
                        } else if (type === TableDataTypes.DATETIME) {
                          return <TableCell padding="dense" key={id} >{moment(n[id],'YYYY-MM-DD HH:mm:ss').format('hh:mm a MM/DD')}</TableCell>;
                        } else if (type === TableDataTypes.LENGTH) {
                          const length = moment.duration(n[id], 'minutes');
                          return <TableCell padding="dense" key={id} >{`${length.hours()}h ${length.minutes()}m`}</TableCell>;
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

SortSelectTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableData: PropTypes.array.isRequired,
  headerData: PropTypes.array.isRequired,
  selected: PropTypes.object.isRequired,
  select: PropTypes.func.isRequired,
  add: PropTypes.func,
  initialOrderBy: PropTypes.string,
  initialOrder: PropTypes.string,
  label: PropTypes.string.isRequired,
  selectLabel: PropTypes.func.isRequired
};

export default withStyles(styles)(SortSelectTable);