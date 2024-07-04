import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import VirtualizedSortSelect from '~/components/tables/Table'
import Progress from '~/components/helpers/Progress'
import { analyzeActions } from '~/store/actions'
import { shiftSelectors } from '~/store/selectors'
import * as TableDataTypes from '~/constants/tableDataTypes'
import domain from '~/constants/domains'
import { withMediaQuery } from '~/helpers/withMediaQuery'

export class ShiftIndex extends Component {
  select = (object) => {
    this.props.select(domain.SHIFT, object)
  }

  updateFilter = (partial) =>
    this.props.updateFilter({ ...this.props.shiftFilters, ...partial })

  render() {
    const { shifts, isDesktop = false } = this.props

    if (!shifts)
      return (
        <Progress
          variant="circular"
          fullWidth
          fullHeight
          message="Loading shifts.."
        />
      )

    return (
      <VirtualizedSortSelect
        data={shifts || []}
        columns={isDesktop ? rows : mobileRows}
        updateFilter={this.updateFilter}
        select={this.select}
        initialSortBy="clockInDate"
      />
    )
  }
}

ShiftIndex.propTypes = {
  shifts: PropTypes.array,
  select: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  shiftFilters: PropTypes.object,
}

/* istanbul ignore next */
const mapStateToProps = (state) => ({
  shiftFilters: shiftSelectors.getShiftFilters(state),
  shifts: shiftSelectors.getAllShiftsNew(state),
})

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => ({
  select: (domain, payload) => dispatch(analyzeActions.select(domain, payload)),
  updateFilter: (filters) =>
    dispatch(analyzeActions.updateFilter(domain.SHIFT, filters)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withMediaQuery([
  ['isDesktop', `(min-width: 800px)`, {
    defaultMatches: true
  }]
])(ShiftIndex))

const rows = [
  {
    id: `firstName`,
    dataKey: `employee`,
    width: 55,
    height: 56,
    padding: `dense`,
    label: `First Name`,
    type: TableDataTypes.FIRSTNAME,
  },
  {
    id: `lastName`,
    dataKey: `employee`,
    width: 55,
    height: 56,
    padding: `dense`,
    label: `Last Name`,
    type: TableDataTypes.OBJECT,
    keys: [`lastName`],
  },
  {
    id: `crew`,
    dataKey: `employee`,
    width: 100,
    height: 56,
    padding: `dense`,
    label: `Crew`,
    type: TableDataTypes.CREW,
  },
  {
    id: `projects`,
    width: 170,
    height: 56,
    padding: `dense`,
    label: `Projects`,
    type: TableDataTypes.PROJECTS,
  },
  {
    id: `tasks`,
    width: 250,
    height: 56,
    padding: `dense`,
    label: `Tasks`,
    type: TableDataTypes.TASKS,
  },
  {
    id: `clockInDate`,
    dataKey: `clockInDate`,
    width: 100,
    height: 56,
    padding: `dense`,
    label: `Clock In`,
    type: TableDataTypes.DATETIME,
  },
  {
    id: `clockOutDate`,
    dataKey: `clockOutDate`,
    width: 100,
    height: 56,
    padding: `dense`,
    label: `Clock Out`,
    type: TableDataTypes.DATETIME,
  },
  {
    id: `length`,
    dataKey: `length`,
    width: 60,
    height: 56,
    padding: `dense`,
    label: `Length`,
    type: TableDataTypes.LENGTH,
  },
]

const mobileRows = [
  {
    id: `firstName`,
    dataKey: `employee`,
    width: 55,
    height: 56,
    padding: `dense`,
    label: `First Name`,
    type: TableDataTypes.FIRSTNAME,
  },
  {
    id: `lastName`,
    dataKey: `employee`,
    width: 55,
    height: 56,
    padding: `dense`,
    label: `Last Name`,
    type: TableDataTypes.OBJECT,
    keys: [`lastName`],
  },
  {
    id: `clockInDate`,
    dataKey: `clockInDate`,
    width: 100,
    height: 56,
    padding: `dense`,
    label: `Clock In`,
    type: TableDataTypes.DATETIME,
  },
  {
    id: `clockOutDate`,
    dataKey: `clockOutDate`,
    width: 100,
    height: 56,
    padding: `dense`,
    label: `Clock Out`,
    type: TableDataTypes.DATETIME,
  }
]



