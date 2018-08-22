import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import moment from 'moment';
import { Formik } from 'formik';

import { shift as shiftValidation } from 'constants/formValidation';
import { shiftActions, employeeActions } from 'store/actions';
import { employeeSelectors, shiftSelectors, taskSelectors, projectSelectors, projectTaskSelectors } from 'store/selectors';
import ClockOut from 'components/forms/ClockOut';

class ClockOutContainer extends Component {
  componentDidMount = () => {
    this.props.getCurrentShift(this.props.currentEmployee.id);
  }
  cancel = () => {
    this.props.history.goBack()
  }

  render() {
    const { currentEmployee, currentShift } = this.props;
    const isLoading = !(currentShift);
    if (isLoading) {
      return <div>Loading</div>
    }

    const currentMoment = moment();
    const clockInMoment = moment(currentShift.clockInDate);
    const shiftDuration = moment.duration(currentMoment.diff(clockInMoment));
    const minutes = shiftDuration.asMinutes();

    const clockOutObject = {
      in: clockInMoment.format('h:mm a'),
      out: currentMoment.format('h:mm a'),
      date: clockInMoment.format('MMM Do YYYY'),
      length: `${shiftDuration.hours()}:${shiftDuration.minutes()}`
    };
    return (
      <Formik
        initialValues={{ activities: [{project: 1, projectTask: 1, length: 500, description: '' }] }}
        validationSchema={shiftValidation}
        onSubmit={values => {
          console.log(values);
          const { currentEmployee, currentShift, history } = this.props;
          this.props.clockOut(currentEmployee, currentShift)
            .then(() => history.push('/'))




        }}
        render={formProps => {
            console.log(this.props.projects)
          return (
            <ClockOut cancel={this.cancel} shift={clockOutObject} {...formProps} projects={this.props.projects}/>
          )
        }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentShift: shiftSelectors.getCurrentShift(state),
    currentEmployee: employeeSelectors.getCurrentEmployee(state),
    projects: projectSelectors.getAllProjectObjects(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCurrentShift: (employeeId) => {
      return dispatch(shiftActions.getCurrentShift(employeeId))
    },
    clockOut: (employee, shift) => {
      return dispatch(employeeActions.clockOut(employee, shift))
    },
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ClockOutContainer)
)


