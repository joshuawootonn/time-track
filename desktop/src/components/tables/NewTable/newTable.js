/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { isEqual } from 'lodash';

import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';

import * as TableDataTypes from 'constants/tableDataTypes';
import Cell from './cell';
import Header from './header';
import styles from './styles';


class ReactVirtualizedTable extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      data: props.data,
      sortDirection: SortDirection.ASC,
      sortBy: 'firstName',
      sortKey: 'employee',
      type: TableDataTypes.STRING,
      sortKeys: null
    };
  }

  componentWillUpdate (nextProps, nextState) {
    const {
      sortBy: prevSortBy,
      sortDirection: prevSortDirection
    } = this.state;

    if (
      nextState.sortBy !== prevSortBy ||
      nextState.sortDirection !== prevSortDirection 
    ) {
      //console.log(this.state);
      this.setState({ data: this.stableSort(this.state.data, this.getSorting(nextState.sortDirection, nextState.sortBy, nextState.type, nextState.sortKeys, nextState.sortKey)) });  
    }
  }

  
  desc = (a, b, sortBy,type, sortKeys,sortKey) => {
    if(type === TableDataTypes.OBJECT){
      // console.log({ desc: keys });
      const aVal = sortKeys.reduce((object, currentKey) => object[currentKey],a[sortKey]);
      const bVal = sortKeys.reduce((object, currentKey) => object[currentKey],b[sortKey]);
      // console.log({ aVal });
      // console.log({ bVal });
      if ( bVal < aVal) {
        return -1;
      }
      if (bVal > aVal) {
        return 1;
      }
      return 0; 
    }
    
    if (b[sortBy] < a[sortBy]) {
      return -1;
    }
    if (b[sortBy] > a[sortBy]) {
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
  
  getSorting = (sortDirection, sortBy, type, sortKeys, sortKey) => {
    return sortDirection === SortDirection.DESC ? (a, b) => this.desc(a, b, sortBy, type, sortKeys, sortKey) : (a, b) => -this.desc(a, b, sortBy, type, sortKeys, sortKey);
  }

  handleRequestSort = value => {
    let { sortBy, sortDirection } = value;    
    if (this.state.sortBy === sortBy && this.state.sortDirection === SortDirection.DESC) {
      sortDirection = SortDirection.ASC;
    }
    let { keys,type,dataKey } = this.props.columns.find(column => column.id === sortBy);
   
    console.log('handleRequest hit');

    this.setState({ sortDirection, sortBy, type, sortKeys: keys, sortKey: dataKey });
  };


  handleClick = event => {
    this.props.select(event.rowData.id);
  }
  
  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    });
  };

  cellRenderer = cellProps => {    
    const { classes, columns, rowHeight }= this.props;   
    return <Cell {...cellProps} classes={classes} rowHeight={rowHeight} columns={columns}/>;
  }

  headerRenderer = headerProps => {  
    const { classes, columns, headerHeight }= this.props;
    const { sortBy, sortDirection, sortKeys } = this.state;

    return <Header
      {...headerProps} 
      columns={columns} 
      classes={classes} 
      headerHeight={headerHeight}     
      sortBy={sortBy} 
      sortDirection={sortDirection}
      sortKeys={sortKeys}
    />;
  }
 

  render() {    
    const { columns, classes } = this.props;
    const { sortBy, sortDirection, data } = this.state;    
    const {  ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}            
            rowCount={data.length}            
            onRowClick={this.handleClick}
            rowGetter={({ index }) => data[index]}
            rowClassName={this.getRowClassName}
            headerClassName={classes.headerCell}    
            sort={this.handleRequestSort} 
            sortBy={sortBy} 
            sortDirection={sortDirection}         
          >
            {columns.map(
              (
                { className, id, ...other },
                index
              ) => {
                
                return (
                  <Column
                    key={id}
                    headerRenderer={headerProps =>
                      this.headerRenderer({
                        ...headerProps,
                        columnIndex: index,
                        ...other
                      })
                    }                    
                    flexGrow={1}
                    className={classNames(classes.flexContainer, className)}
                    cellRenderer={cellProps => 
                      this.cellRenderer({
                        ...cellProps 
                        
                      })
                    }
                    dataKey={id}                    
                  />
                );
              }
            )}
          </Table>
        )}
      </AutoSizer>
    );
  


    // return (
    //   <div className={classes.root} >
    //     <WrappedVirtualizedTable
    //       rowCount={data.length}
    //       rowGetter={({ index }) => data[index]}
    //       onRowClick={this.handleClick}
    //       columns={columns}     
    //       sort={this.handleRequestSort} 
    //       sortBy={sortBy}
    //       sortDirection={sortDirection}  
    //     />
    //   </div>
    // );
  }
  
}

ReactVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56
};

export default withStyles(styles)(ReactVirtualizedTable);

