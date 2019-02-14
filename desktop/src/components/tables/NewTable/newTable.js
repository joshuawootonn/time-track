/* eslint-disable no-console */

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

import Cell from './cell';
import Header from './header';

const style = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    flex: 1,
    
    marginRight: 0
  },
  tableRow: {
    cursor: 'pointer'
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200]
    },
    marginRight: 0,
    flex: 1    
  },
  headerCell: {
    marginRight: 0,
    flex: 1
  },
  tableCell: {
    flex: 1,
    marginRight: 0
  },
  noClick: {
    cursor: 'initial'
  }
});

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
                        columnIndex: index
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

const WrappedVirtualizedTable = withStyles(style)(MuiVirtualizedTable);


class ReactVirtualizedTable extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      data: props.data 
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
      const { sortBy, sortDirection } = nextState;
      console.log('1');
      let { data } = this.props;

      if (sortBy) {
        data = data.sort(item => item[sortBy]);
        if (sortDirection === SortDirection.DESC) {
          data = data.reverse();
        }
      }
    }
  }

  handleClick = event => {
    this.props.select(event.rowData.id);
  }
  sort = value => {
    console.log(value);
    let { sortBy, sortDirection } = value;
    const {
      sortBy: prevSortBy,
      sortDirection: prevSortDirection
    } = this.state;
    console.log('old',prevSortBy,prevSortDirection);
    console.log('new', sortBy,sortDirection);
    // If data was sorted DESC by this column.
    // Rather than switch to ASC, return to "natural" order.
    if (prevSortDirection === SortDirection.DESC) {
      sortBy = null;
      sortDirection = null;
    }else if (prevSortDirection === SortDirection.ASC && prevSortBy === sortBy) {
      
      sortDirection = SortDirection.DESC;
    }

    this.setState({ sortBy, sortDirection });
  }
  render() {
    
    const { columns, classes, select } = this.props;
    const { data, sortBy, sortDirection } = this.props;
    return (
      <div className={classes.root} >
        <WrappedVirtualizedTable
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}
          onRowClick={this.handleClick}
          columns={columns}     
          sort={this.sort} 
          sortBy={sortBy}
          sortDirection={sortDirection}  
        />
      </div>
    );
  }
  
}

export default withStyles(styles)(ReactVirtualizedTable);

