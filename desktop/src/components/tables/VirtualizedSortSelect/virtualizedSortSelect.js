/* eslint-disable no-console */

import React from 'react';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';

import * as TableDataTypes from 'constants/tableDataTypes';
import Cell from './cell';
import Header from './header';
import styles from './styles';


class VirtualizedSortSelect extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      data: props.data,
      sortDirection: SortDirection.ASC,
      sortBy: props.initialSortBy || null,
      sortKey: props.initialSortKey || null,
      type: TableDataTypes.STRING,
      sortKeys: props.initialSortKeys || null
    };
  }

  componentDidUpdate (nextProps, nextState) {
    const { sortBy: prevSortBy, sortDirection: prevSortDirection } = this.state;
    const { sortDirection,sortBy, type,sortKeys, sortKey } = nextState;
  
    if(nextProps.data.length !== this.props.data.length || nextProps.data !== this.props.data){
      this.setState({ data: this.sort(nextProps.data,sortDirection, sortBy, type, sortKeys, sortKey) });
    }
    // if the sort order has actually changed
    if (sortBy !== prevSortBy || sortDirection !== prevSortDirection ) {     //call sort on the items in state
      
      this.setState({ data: this.sort(this.state.data,sortDirection, sortBy, type, sortKeys, sortKey) });  
    }
  }
  componentDidMount () {
    const { sortDirection,sortBy, type,sortKeys, sortKey, data } = this.state;
    this.setState({ data: this.sort(data,sortDirection, sortBy, type, sortKeys, sortKey) }); 
  }
  
  compareOrder = (a, b, sortBy,type, sortKeys,sortKey) => {
    if(type === TableDataTypes.OBJECT){
      const aVal = sortKeys.reduce((object, currentKey) => object[currentKey],a[sortKey]);
      const bVal = sortKeys.reduce((object, currentKey) => object[currentKey],b[sortKey]);
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
  
  sort = (array, sortDirection, sortBy, type, sortKeys, sortKey) => {
    const stabilizedThis = array.map((el, index) => [el, index]);    
    stabilizedThis.sort((a, b) => {
      
      let order = this.compareOrder(a[0], b[0], sortBy, type, sortKeys, sortKey);
      sortDirection === SortDirection.DESC ? order = order * -1 : order;      
      if (order !== 0) return order;
      return a[1] - b[1]; 
    });
    return stabilizedThis.map(el => el[0]);
  }
 

  handleRequestSort = value => {
    let { sortBy, sortDirection } = value;    
    if (this.state.sortBy === sortBy && this.state.sortDirection === SortDirection.DESC) {
      sortDirection = SortDirection.ASC;
    }
    let { keys,type,dataKey } = this.props.columns.find(column => column.id === sortBy);
    
    // set state with the new sorting values
    // these values will be evaluated in componentWillUpdate to see if the component should actually sort
    this.setState({ sortDirection, sortBy, type, sortKeys: keys, sortKey: dataKey });
  };


  handleClick = event => {
    this.props.select(event.rowData.id);
  }
  

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
    // console.log('table: virtualized',data.length);
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
            rowClassName={classNames(classes.tableRow, classes.flexContainer)}
            headerClassName={classes.headerCell}    
            sort={this.handleRequestSort} 
            sortBy={sortBy} 
            sortDirection={sortDirection}         
          >
            {columns.map(
              (
                { className, id, width,...other },
                index
              ) => {
                
                return (
                  <Column
                    key={id}
                    width={width}
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
  }  
}

VirtualizedSortSelect.defaultProps = {
  headerHeight: 56,
  rowHeight: 49
};

export default withStyles(styles)(VirtualizedSortSelect);

