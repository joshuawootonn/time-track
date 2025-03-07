/* eslint-disable no-console */

import React from 'react'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
  AutoSizer,
  Column,
  SortDirection,
  Table as RVTable,
} from 'react-virtualized'
import 'react-virtualized/styles.css'

import * as TableDataTypes from '~/constants/tableDataTypes'
import Cell from './cell'
import Header from './header'
import styles from './styles'
import CrewCell from '~/components/tables/Table/cells/crewCell'

import ProjectCell from '~/components/tables/Table/cells/projectCell'
import TaskCell from '~/components/tables/Table/cells/taskCell'
import FirstNameCell from '~/components/tables/Table/cells/firstNameCell'
import ProjectCompletionCell from '~/components/tables/Table/cells/projectCompletionCell'

const CellSet = {
  [TableDataTypes.FIRSTNAME]: FirstNameCell,
  [TableDataTypes.CREW]: CrewCell,
  [TableDataTypes.PROJECTS]: ProjectCell,
  [TableDataTypes.TASKS]: TaskCell,
  [TableDataTypes.PROJECT_COMPLETION]: ProjectCompletionCell,
}

// ICEBOX: Test Table

class Table extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      data: props.data,
      sortDirection: SortDirection.ASC,
      sortBy: props.initialSortBy || null,
      sortKey: props.initialSortKey || null,
      type: TableDataTypes.STRING,
      sortKeys: props.initialSortKeys || null,
      selectedIndex: -1,
    }
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    const { sortBy: prevSortBy, sortDirection: prevSortDirection } = this.state
    const { sortDirection, sortBy, type, sortKeys, sortKey } = nextState

    if (
      nextProps.data.length !== this.props.data.length ||
      nextProps.data !== this.props.data
    ) {
      this.setState({
        data: this.sort(
          nextProps.data,
          sortDirection,
          sortBy,
          type,
          sortKeys,
          sortKey,
        ),
      })
    }
    // if the sort order has actually changed
    if (sortBy !== prevSortBy || sortDirection !== prevSortDirection) {
      //call sort on the items in state

      this.setState({
        data: this.sort(
          this.state.data,
          sortDirection,
          sortBy,
          type,
          sortKeys,
          sortKey,
        ),
      })
    }
  }
  componentDidMount() {
    const { sortDirection, sortBy, type, sortKeys, sortKey, data } = this.state
    this.setState({
      data: this.sort(data, sortDirection, sortBy, type, sortKeys, sortKey),
    })
  }

  compareOrder = (a, b, sortBy, type, sortKeys, sortKey) => {
    if (type === TableDataTypes.OBJECT) {
      const aVal = sortKeys.reduce(
        (object, currentKey) => object[currentKey],
        a[sortKey],
      )
      const bVal = sortKeys.reduce(
        (object, currentKey) => object[currentKey],
        b[sortKey],
      )
      if (bVal < aVal) {
        return -1
      }
      if (bVal > aVal) {
        return 1
      }
      return 0
    }
    if (type === TableDataTypes.FIRSTNAME) {
      return b.employee.firstName < a.employee.firstName ? -1 : 1
    }
    if (type === TableDataTypes.CREW) {
      return b.employee.crew.name < a.employee.crew.name ? -1 : 1
    }
    if (!b[sortBy]) {
      return -1
    }
    if (!a[sortBy]) {
      return 1
    }
    if (b[sortBy] < a[sortBy]) {
      return -1
    }
    if (b[sortBy] > a[sortBy]) {
      return 1
    }
    return 0
  }

  sort = (array, sortDirection, sortBy, type, sortKeys, sortKey) => {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      let order = this.compareOrder(a[0], b[0], sortBy, type, sortKeys, sortKey)
      order = sortDirection === SortDirection.DESC ? order * -1 : order
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
  }

  handleRequestSort = (value) => {
    let { sortBy, sortDirection } = value

    if (
      this.state.sortBy === sortBy &&
      this.state.sortDirection === SortDirection.DESC
    ) {
      sortDirection = SortDirection.ASC
    }
    const { keys, type, dataKey } = this.props.columns.find(
      (column) => column.id === sortBy,
    )

    // set state with the new sorting values
    // these values will be evaluated in componentWillUpdate to see if the component should actually sort
    this.setState({
      sortDirection,
      sortBy,
      type,
      sortKeys: keys,
      sortKey: dataKey,
    })
  }

  handleClick = (event) => {
    this.props.select(event.rowData.id)
    this.setState({ ...this.state, selectedIndex: event.index })
  }

  cellRenderer = (cellProps) => {
    const { type } = this.props.columns[cellProps.columnIndex]

    const props = {
      updateFilter: this.props.updateFilter,
      ...cellProps,
      ...this.props,
    }

    const CellComponent = CellSet[type]

    return CellComponent ? <CellComponent {...props} /> : <Cell {...props} />
  }

  headerRenderer = (headerProps) => {
    const { classes, columns, headerHeight } = this.props
    const { sortBy, sortDirection, sortKeys } = this.state

    return (
      <Header
        {...headerProps}
        columns={columns}
        classes={classes}
        headerHeight={headerHeight}
        sortBy={sortBy}
        sortDirection={sortDirection}
        sortKeys={sortKeys}
      />
    )
  }

  render() {
    const { columns, classes } = this.props
    const { sortBy, sortDirection, data, selectedIndex } = this.state
    const { ...tableProps } = this.props
    return (
      <AutoSizer>
        {({ height, width }) => (
          <RVTable
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowCount={data.length}
            onRowClick={this.handleClick}
            rowGetter={({ index }) => data[index]}
            rowClassName={({ index }) => {
              const rowClass =
                index === selectedIndex
                  ? classes.tableRowSelected
                  : classes.tableRow
              return classNames(rowClass, classes.flexContainer)
            }}
            headerClassName={classes.headerCell}
            sort={this.handleRequestSort}
            sortBy={sortBy}
            sortDirection={sortDirection}
          >
            {columns.map(({ className, id, width, ...other }, index) => {
              return (
                <Column
                  key={id}
                  width={width}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                      ...other,
                    })
                  }
                  flexGrow={1}
                  className={classNames(classes.flexContainer, className)}
                  cellRenderer={(cellProps) =>
                    this.cellRenderer({
                      ...cellProps,
                    })
                  }
                  dataKey={id}
                />
              )
            })}
          </RVTable>
        )}
      </AutoSizer>
    )
  }
}

Table.defaultProps = {
  headerHeight: 56,
  rowHeight: 49,
}

export default withStyles(styles)(Table)
