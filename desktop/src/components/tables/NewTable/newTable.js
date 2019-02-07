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

const styles2 = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    flex: 1
  },
  tableRow: {
    cursor: 'pointer'
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableCell: {
    flex: 1
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
    console.log(cellData);
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

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel
          active={dataKey === sortBy}
          direction={direction[sortDirection]}
        >
          {label}
        </TableSortLabel>
      ) : (
        label
      );
    const c = classNames(classes.tableCell, classes.flexContainer);
    return (
      <TableCell
        className={c}
        variant="head"
        style={{ height: headerHeight, flex: 1 }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        {inner}
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
            headerClassName={this.getRowClassName}
            
          >
            {columns.map(
              (
                { cellContentRenderer = null, className, id, ...other },
                index
              ) => {
                // let renderer;
                // if (cellContentRenderer != null) {
                //   renderer = cellRendererProps =>
                //     this.cellRenderer({
                //       cellData: cellContentRenderer(cellRendererProps),
                //       columnIndex: index
                //     });
                // } else {
                //   renderer = this.cellRenderer;
                // }
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
  handleClick = event => {
    this.props.select(event.rowData.id);
  }
  render() {
    const { headerData, tableData, classes, select } = this.props;
    return (
      <div className={classes.root} >
        <WrappedVirtualizedTable
          rowCount={tableData.length}
          rowGetter={({ index }) => tableData[index]}
          onRowClick={this.handleClick}
          columns={headerData}        
        />
      </div>
    );
  }
  
}

export default withStyles(styles)(ReactVirtualizedTable);


// const asdf = [
//   {
//     width: 200,
//     flexGrow: 1.0,
//     label: 'Employee',
//     dataKey: 'employee'
//   },
//   {
//     width: 120,
//     label: 'Calories (g)',
//     dataKey: 'calories',
//     numeric: true
//   },
//   {
//     width: 120,
//     label: 'Fat (g)',
//     dataKey: 'fat',
//     numeric: true
//   },
//   {
//     width: 120,
//     label: 'Carbs (g)',
//     dataKey: 'carbs',
//     numeric: true
//   },
//   {
//     width: 120,
//     label: 'Protein (g)',
//     dataKey: 'protein',
//     numeric: true
//   }
// ];