/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import styles from './styles';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import * as TableDataTypes from 'constants/tableDataTypes';
import moment from 'moment';
import 'react-virtualized/styles.css';
import './styles.css';
import { ToobleWrapper } from 'helpers/tooble';

const styles2 = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    flex: 1,
    
    marginRight: 0,
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
    marginRight: 0,
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

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;

    const { type, id, keys } =  columns[columnIndex];
    //console.log(cellData);
    const c = classNames(classes.tableCell, classes.flexContainer, {
      [classes.noClick]: onRowClick == null
    });
    if (type === TableDataTypes.NUMBER || type === TableDataTypes.BOOLEAN) {
      return <TableCell className={c} style={{ height: rowHeight }} padding="dense" key={id} align="right" >{cellData}</TableCell>;
    } else if (type === TableDataTypes.STRING) {
      return <TableCell className={c} style={{ height: rowHeight }} padding="dense" key={id} >{cellData}</TableCell>;
    } else if (type === TableDataTypes.OBJECT) {
      //console.log(columns,columnIndex,columns[columnIndex], cellData)
      // The reduce function here is just used to deconstruct the objects to the value that we want on the table
      return <TableCell className={c} style={{ height: rowHeight }} padding="dense" key={id + keys.join('')} >{
        keys.reduce((object, currentKey) => {
          // this just checks if the object is defined. it prevents error that would occur if you got the wrong id on a item for some reason.
          return object === undefined ? null : object[currentKey];
        },cellData)
      }</TableCell>;
    } else if (type === TableDataTypes.DATE) {
      return <TableCell className={c} style={{ height: rowHeight }} padding="dense" key={id} >{moment(cellData).format('MM/DD/YY')}</TableCell>;
    } else if (type === TableDataTypes.DATETIME) {
      return <TableCell className={c} style={{ height: rowHeight }} padding="dense" key={id} >{moment(cellData).format('hh:mm a MM/DD')}</TableCell>;
    } else if (type === TableDataTypes.LENGTH) {
      const length = moment.duration(cellData, 'minutes');
      return <TableCell className={c} style={{ height: rowHeight }} padding="dense" key={id} >{`${length.hours()}h ${length.minutes()}m`}</TableCell>;
    }
    return null;   
  };

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, classes, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc'
    };

    return (
      <TableCell
        className={classNames(classes.tableCell, classes.flexContainer)}
        variant="head"
        style={{ height: headerHeight, flex: 1 }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <TableSortLabel
          active={dataKey === sortBy}
          direction={direction[sortDirection]}
        >
          {label}
        </TableSortLabel>
      </TableCell>
    );
  };

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

const WrappedVirtualizedTable = withStyles(styles2)(MuiVirtualizedTable);


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

export default withStyles(styles)(ToobleWrapper(ReactVirtualizedTable));

