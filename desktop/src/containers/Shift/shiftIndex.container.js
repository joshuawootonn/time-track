import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import VirtualizedSortSelect from 'components/tables/Table';
import Progress from 'components/helpers/Progress';

import { analyzeActions } from 'store/actions';
import { crewSelectors, shiftSelectors } from 'store/selectors';

import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

export class ShiftIndex extends Component {
  selectLabel = selected =>
    `${selected.employee.firstName} ${selected.employee.lastName}'s shift selected`;

  select = object => {
    this.props.select(domain.SHIFT, object);
  };

  add = () => this.props.setStatus(domain.SHIFT, analyzeStatus.ADDING);

  updateFilter = partial =>
    this.props.updateFilter({ ...this.props.shiftFilters, ...partial });

  render() {
    const { shifts, selected } = this.props;
    if (!shifts)
      return (
        <Progress
          variant="circular"
          fullWidth
          fullHeight
          message="Loading shifts.."
        />
      );

    return (
      <VirtualizedSortSelect
        data={shifts || []}
        columns={rows}
        updateFilter={this.updateFilter}
        selected={selected}
        select={this.select}
        initialSortBy="clockInDate"
      />
    );
  }
}

ShiftIndex.propTypes = {
  shifts: PropTypes.array,
  select: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  selected: PropTypes.object,
  shiftFilters: PropTypes.object
};

/* istanbul ignore next */
const mapStateToProps = state => {
  const filters = state.analyze.shiftFilters;
  return {
    shiftFilters: state.analyze.shiftFilters,
    crewObject: crewSelectors.getAllCrewObjects(state),
    shifts: shiftSelectors.getAllShiftsNew(state, { filters, sorts: {} }),
    selected: shiftSelectors.getSelectedShift(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ ...analyzeActions }, dispatch),
    updateFilter: filters =>
      dispatch(analyzeActions.updateFilter(domain.SHIFT, filters))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShiftIndex);

const rows = [
  {
    id: `firstName`,
    dataKey: `employee`,
    width: 55,
    height: 56,
    padding: `dense`,
    label: `First Name`,
    type: TableDataTypes.OBJECT,
    keys: [`firstName`]
  },
  {
    id: `lastName`,
    dataKey: `employee`,
    width: 55,
    height: 56,
    padding: `dense`,
    label: `Last Name`,
    type: TableDataTypes.OBJECT,
    keys: [`lastName`]
  },
  {
    id: `crew`,
    dataKey: `employee`,
    width: 100,
    height: 56,
    padding: `dense`,
    label: `Crew`,
    type: TableDataTypes.CREW,
    keys: [`crew`, 'name']
  },
  {
    id: `projects`,
    width: 170,
    height: 56,
    padding: `dense`,
    label: `Projects`,
    type: TableDataTypes.PROJECTS
  },
  {
    id: `tasks`,
    width: 250,
    height: 56,
    padding: `dense`,
    label: `Tasks`,
    type: TableDataTypes.TASKS
  },
  {
    id: `clockInDate`,
    dataKey: `clockInDate`,
    width: 100,
    height: 56,
    padding: `dense`,
    label: `Clock In`,
    type: TableDataTypes.DATETIME
  },
  {
    id: `clockOutDate`,
    dataKey: `clockOutDate`,
    width: 100,
    height: 56,
    padding: `dense`,
    label: `Clock Out`,
    type: TableDataTypes.DATETIME
  },
  {
    id: `length`,
    dataKey: `length`,
    width: 60,
    height: 56,
    padding: `dense`,
    label: `Length`,
    type: TableDataTypes.LENGTH
  }
];
