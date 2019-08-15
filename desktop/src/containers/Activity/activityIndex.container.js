import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import VirtualizedSortSelect from "components/tables/Table";
import Progress from "components/helpers/Progress";

import { analyzeActions } from "store/actions";
import { shiftSelectors, activitySelectors } from "store/selectors";

import * as TableDataTypes from "constants/tableDataTypes";
import { analyzeStatus } from "constants/analyze";
import domain from "constants/domains";

export class ShiftIndex extends Component {
  selectLabel = selected =>
    `${selected.employee.firstName} ${
      selected.employee.lastName
    }'s shift selected`;

  select = object => {
    this.props.select(domain.SHIFT, object.shift);
  };

  add = () => this.props.setStatus(domain.SHIFT, analyzeStatus.ADDING);

  render() {
    const { shifts, selected,activities } = this.props;
    if (!activities) return <Progress variant="circular" fullWidth fullHeight />;

    
    console.log(activities[0]);

    return (
      <VirtualizedSortSelect
        data={activities || []}
        columns={rows}
        selected={selected}
        select={this.select}
        initialSortBy="clockInDate"
      />
    );
  }
}

ShiftIndex.propTypes = {
  shifts: PropTypes.array,
  activities: PropTypes.array,
  select: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  selected: PropTypes.object
};

/* istanbul ignore next */
const mapStateToProps = state => {
  const filters = state.analyze.shiftFilters;
  return {
    activities: activitySelectors.getAllActivities(state,{ filters , sorts: {} }), 
    selected: shiftSelectors.getSelectedShift(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ ...analyzeActions }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShiftIndex);

const rows = [
  {
    id: `firstName`,
    dataKey: `employee`,
    width: 150,
    height: 56,
    padding: `dense`,
    label: `First Name`,
    type: TableDataTypes.OBJECT,
    keys: [`firstName`]
  },
  {
    id: `lastName`,
    dataKey: `employee`,
    width: 150,
    height: 56,
    padding: `dense`,
    label: `Last Name`,
    type: TableDataTypes.OBJECT,
    keys: [`lastName`]
  },  
  {
    id: `project`,
    dataKey: `project`,
    width: 150,
    height: 56,
    padding: `dense`,
    label: `Project`,
    type: TableDataTypes.OBJECT,
    keys: [`name`]
  },
  {
    id: `task`,
    dataKey: `task`,
    width: 150,
    height: 56,
    padding: `dense`,
    label: `Project`,
    type: TableDataTypes.OBJECT,
    keys: [`name`]
  },
  {
    id: `clockInDate`,
    dataKey: `clockInDate`,
    width: 200,
    height: 56,
    padding: `dense`,
    label: `Clock In`,
    type: TableDataTypes.DATETIME
  },
  {
    id: `clockOutDate`,
    dataKey: `clockOutDate`,
    width: 200,
    height: 56,
    padding: `dense`,
    label: `Clock Out`,
    type: TableDataTypes.DATETIME
  },
  {
    id: `length`,
    dataKey: `length`,
    width: 120,
    height: 56,
    padding: `dense`,
    label: `Length`,
    type: TableDataTypes.LENGTH
  }
];
