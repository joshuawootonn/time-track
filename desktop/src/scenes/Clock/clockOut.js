import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import moment from 'moment';

import {
  employeeActions,
  projectActions,
  taskActions,
  shiftActions,
  analyzeActions
} from 'store/actions';
import ClockOutContainer from 'containers/Clock/clockOutContainer';

export class ClockOut extends Component {
  componentDidMount = () => {
    // Fetching here to ensure that all employees have been fetched before we try and display their name for their shift
    this.props.getAllEmployees();
    this.props.getAllProjects();
    this.props.getAllTasks();
    this.props.getShiftsInRange(
      moment()
        .subtract(100, `days`)
        .format(`MM-DD-YY HH:mm:ss`),
      moment()
        .add(14, `days`)
        .format(`MM-DD-YY HH:mm:ss`)
    );
  };
  render() {
    return <ClockOutContainer type={this.props.type} />;
  }
}

ClockOut.propTypes = {
  type: PropTypes.string.isRequired,
  getShiftsInRange: PropTypes.func.isRequired,
  getAllEmployees: PropTypes.func.isRequired,
  getAllProjects: PropTypes.func.isRequired,
  getAllTasks: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    openSettings: () => {
      return dispatch(analyzeActions.editSettingsModal());
    },
    getAllEmployees: () => {
      return dispatch(employeeActions.getAllEmployees());
    },
    getAllProjects: () => {
      return dispatch(projectActions.getAllProjects());
    },
    getAllTasks: () => {
      return dispatch(taskActions.getAllTasks());
    },
    getShiftsInRange: (start, end) => {
      return dispatch(shiftActions.getShiftsInRange(start, end));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ClockOut);
