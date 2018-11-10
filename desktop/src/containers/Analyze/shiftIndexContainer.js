import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';

import { employeeActions, taskActions, projectActions, shiftActions, analyzeActions } from 'store/actions';
import { shiftSelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import Progress from 'components/helpers/Progress';
import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus, analyzeDomain } from 'constants/analyze';

class ShiftIndexContainer extends Component {
  componentDidMount = () => {
    // Fetching here to ensure that all employees have been fetched before we try and display their name for their shift
    this.props.getEmployees();
    this.props.getProjects();
    this.props.getTasks();
    this.props.getShiftsInRange(moment().subtract(14, 'days').format('MM-DD-YY HH:mm:ss'), moment().add(14,'days').format('MM-DD-YY HH:mm:ss'));
  }
  render() {
    const { shifts, select,setStatus, selected } = this.props;
    const isLoading = !shifts;
    if (isLoading) {
      return <Progress variant="circular" fullWidth fullHeight />;
    }
    console.log(shifts);
    return (
      <SortSelectTable
        selectLabel={selected => { return `${selected.employee.firstName} ${selected.employee.lastName}'s shift selected`; }}
        label="Shifts"
        tableData={shifts}
        headerData={rows}
        selected={selected}
        select={object =>select(analyzeDomain.SHIFT,object)}
        add={() => setStatus(analyzeDomain.SHIFT,analyzeStatus.ADDING)}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    shifts: shiftSelectors.getShiftsInRange(state, { startTime: moment().subtract(14, 'days').format('MM-DD-YY HH:mm:ss'), endTime: moment().add(14,'days').format('MM-DD-YY HH:mm:ss') }),
    selected: shiftSelectors.getSelectedShift(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getEmployees: () => {
      return dispatch(employeeActions.getEmployees());
    },
    getProjects: () => {
      return dispatch(projectActions.getProjects());
    },
    getTasks: () => {
      return dispatch(taskActions.getTasks());
    },
    getShiftsInRange: (start, end) => {
      return dispatch(shiftActions.getShiftsInRange(start, end));
    },
    
    ...bindActionCreators({ ...analyzeActions }, dispatch)   
  };
};

ShiftIndexContainer.propTypes = {
  shifts: PropTypes.array,
  getShiftsInRange: PropTypes.func.isRequired,
  getEmployees: PropTypes.func.isRequired,
  getProjects: PropTypes.func.isRequired,
  getTasks: PropTypes.func.isRequired,
  selectShift: PropTypes.func.isRequired,
  setShiftStatus: PropTypes.func.isRequired,
  selected: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ShiftIndexContainer);

const rows = [
  {
    id: 'employee',
    numeric: false,
    padding: 'dense',
    label: 'First Name',
    type: TableDataTypes.OBJECT,
    keys: ['firstName']
  },
  {
    id: 'employee',
    numeric: false,
    padding: 'dense',
    label: 'Last Name',
    type: TableDataTypes.OBJECT,
    keys: ['lastName']
  },
  {
    id: 'clockInDate',
    numeric: false,
    padding: 'dense',
    label: 'Clock In',
    type: TableDataTypes.DATETIME
  },
  {
    id: 'clockOutDate',
    numeric: false,
    padding: 'dense',
    label: 'Clock Out',
    type: TableDataTypes.DATETIME
  },
  {
    id: 'length',
    numeric: false,
    padding: 'dense',
    label: 'Length',
    type: TableDataTypes.LENGTH
  }
];