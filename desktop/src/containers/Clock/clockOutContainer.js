import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import moment from 'moment';
import { Formik } from 'formik';

import { shift as shiftValidation } from 'constants/formValidation';
import { shiftActions, employeeActions } from 'store/actions';
import {
  employeeSelectors,
  shiftSelectors,
  projectSelectors,
} from 'store/selectors';
import ClockOut from 'components/forms/ClockOut';

class ClockOutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { activities: [] };
  }

  componentDidMount = () => {
    this.props.getCurrentShift(this.props.currentEmployee.id);
  };
  cancel = () => {
    this.props.history.goBack();
  };

  render() {
    const { currentEmployee, currentShift, projects } = this.props;
    const isLoading = !currentShift;
    if (isLoading) {
      return <div>Loading</div>;
    }

    const currentMoment = moment();
    const clockInMoment = moment(currentShift.clockInDate);
    const shiftDuration = moment.duration(currentMoment.diff(clockInMoment));
    const minutes = shiftDuration.asMinutes();

    const clockOutObject = {
      in: clockInMoment.format('h:mm a'),
      out: currentMoment.format('h:mm a'),
      date: clockInMoment.format('MMM Do YYYY'),
      length: `${shiftDuration.hours()}:${shiftDuration.minutes()}`,
    };

    return (
      <Formik
        initialValues={{
          activities: [{
            projectId: -1,
            projectTaskId: -1,
            length: 0,
            description: ''
          }],
        }}
        onSubmit={values => {
          const { currentEmployee, currentShift, history, clockOut } = this.props;
          clockOut(currentEmployee, currentShift, values.activities)
            .then(() => history.push('/'));
        }}
        validationSchema={shiftValidation}
        render={formikProps => {
          return (
            <ClockOut
              cancel={this.cancel}
              shift={clockOutObject}
              projects={projects}
              {...formikProps}
            />
          );
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    currentShift: shiftSelectors.getCurrentShift(state),
    currentEmployee: employeeSelectors.getCurrentEmployee(state),
    projects: projectSelectors.getAllProjectObjectsWithTasks(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCurrentShift: employeeId => {
      return dispatch(shiftActions.getCurrentShift(employeeId));
    },
    clockOut: (employee, shift, activities) => {
      return dispatch(employeeActions.clockOut(employee, shift, activities));
    },
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ClockOutContainer),
);
