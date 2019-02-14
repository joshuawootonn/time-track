import React from 'react';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import * as TableDataTypes from 'constants/tableDataTypes';
import moment from 'moment';
import 'react-virtualized/styles.css';

class Cell extends React.Component {
  render() {
    const { cellData, columnIndex = null } =this.props;

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
  }
}

export default Cell;





