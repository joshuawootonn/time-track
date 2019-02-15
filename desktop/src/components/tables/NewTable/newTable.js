/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';

import * as TableDataTypes from 'constants/tableDataTypes';
import Cell from './cell';
import Header from './header';
import { outerStyles, tableStyles } from './styles';


class MuiVirtualizedTable extends React.PureComponent {
  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    });
  };

  cellRenderer = cellProps => {
    return <Cell {...cellProps} {...this.props} />;
  }

  headerRenderer = headerProps => {
    return <Header {...headerProps} {...this.props} />;
  }

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
            headerClassName={classes.headerCell}                    
          >
            {columns.map(
              (
                { cellContentRenderer = null, className, id, ...other },
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
                    cellRenderer={this.cellRenderer}
                    dataKey={id}
                    {...other}
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

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56
};

const WrappedVirtualizedTable = withStyles(tableStyles)(MuiVirtualizedTable);


class ReactVirtualizedTable extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      data: props.data,
      order: SortDirection.ASC,
      orderBy: 'firstName',
      type: TableDataTypes.STRING,
      keys: null
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
      console.log(this.state);
      this.setState({ data: this.stableSort(this.state.data, this.getSorting(nextState.sortDirection, nextState.sortBy, nextState.type, nextState.keys)) });  
    }
  }

  
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
    return order === SortDirection.DESC ? (a, b) => this.desc(a, b, orderBy, type, keys) : (a, b) => -this.desc(a, b, orderBy, type, keys);
  }

  handleRequestSort = value => {    
    let { sortBy, sortDirection } = value;

    if (this.state.sortBy === sortBy && this.state.sortDirection === SortDirection.DESC) {
      sortDirection = SortDirection.ASC;
    }
    //console.log(this.props.columns, sortBy);
    let { keys,type } = this.props.columns.find(column => column.id === sortBy);
   


    this.setState({ sortDirection, sortBy, type, keys });
  };




  handleClick = event => {
    this.props.select(event.rowData.id);
  }
  // sort = value => {
  //   console.log(value);
  //   let { sortBy, sortDirection } = value;
  //   const {
  //     sortBy: prevSortBy,
  //     sortDirection: prevSortDirection
  //   } = this.state;
  //   console.log('old',prevSortBy,prevSortDirection);
  //   console.log('new', sortBy,sortDirection);
  //   console.log('data', value);
  //   // If data was sorted DESC by this column.
  //   // Rather than switch to ASC, return to "natural" order.
  //   if (prevSortDirection === SortDirection.DESC) {
  //     sortBy = null;
  //     sortDirection = null;
  //   }else if (prevSortDirection === SortDirection.ASC && prevSortBy === sortBy) {      
  //     sortDirection = SortDirection.DESC;
  //   }

  //   this.setState({ sortBy, sortDirection });
  // }
  render() {    
    const { columns, classes } = this.props;
    const { sortBy, sortDirection,data } = this.state;
    //console.log(data);
    return (
      <div className={classes.root} >
        <WrappedVirtualizedTable
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}
          onRowClick={this.handleClick}
          columns={columns}     
          sort={this.handleRequestSort} 
          sortBy={sortBy}
          sortDirection={sortDirection}  
        />
      </div>
    );
  }
  
}

export default withStyles(outerStyles)(ReactVirtualizedTable);

