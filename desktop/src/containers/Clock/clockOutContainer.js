import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import moment from 'moment';
import { Formik } from 'formik';

import ClockOutForm from 'components/forms/ClockOut';
import Progress from 'components/helpers/Progress';

import { clockout as clockoutValidation } from 'constants/formValidation';
import { shiftActions, employeeActions } from 'store/actions';
import { minutesToString } from 'helpers/time';
import { employeeSelectors, shiftSelectors, projectSelectors, projectTaskSelectors } from 'store/selectors';
import { minutesRoudedTime } from 'helpers/time';

export class ClockOut extends Component {
  constructor(props) {
    super(props);
    this.state = { activities: [] };
  }

  componentDidMount = () => {
    this.props.getCurrentShift(this.props.currentEmployee.id);
  };
  cancel = () => {
    this.props.history.push('/');
  };

  render() {
    const { currentShift, projects, projectTasks } = this.props;

    const isLoading = !currentShift;
    if (isLoading) {
      return <Progress variant="circular" fullPage />;
    }

    const currentMoment = moment();
    const clockInMoment = moment.utc(currentShift.clockInDate).local();
    const shiftDuration = moment.duration(currentMoment.diff(clockInMoment));


    const clockOutObject = {
      in: clockInMoment.format('h:mm a'),
      out: currentMoment.format('h:mm a'),
      date: clockInMoment.format('MMM D'),
      length: `${minutesToString(minutesRoudedTime(shiftDuration.asMinutes()))}`,
      lengthInMinutes: Math.floor(shiftDuration.asMinutes())
    };


    return (
      <Formik
        initialValues={{
          lunch: 30,
          activities: [
            {
              projectId: -1,
              projectTaskId: -1,
              length: 0,
              description: ''
            }
          ]
        }}
        onSubmit={values => {
          const { currentEmployee, currentShift, history, clockOut } = this.props;
          return clockOut(currentEmployee, currentShift, values.activities, values.lunch).then(() =>
            history.push('/'),
          );
        }}
        validationSchema={clockoutValidation}
        render={formikProps => {
          //console.log(formikProps.values);
          const { errors,values } = formikProps;
          // Time left is the duraction - lunch - all the activity times
          let timeLeft = Math.floor(shiftDuration.asMinutes()) - values.lunch;
          values.activities.forEach(activity => {
            timeLeft -= activity.length;
          });
          
          let generalError;
          if (errors.activities && typeof errors.activities === 'string'){
            generalError = errors.activities;
          }else if (errors.lunch && typeof errors.lunch === 'string'){
            generalError = errors.lunch;
          }
        

          return (
            <ClockOutForm
              cancel={this.cancel}
              shift={clockOutObject}
              projects={projects}
              generalError={generalError}
              timeLeft={timeLeft}
              projectTasks={projectTasks}
              {...formikProps}
            />
          );
        }}
      />
    );
  }
}

ClockOut.propTypes = {
  currentEmployee: PropTypes.object.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    currentShift: shiftSelectors.getCurrentShift(state),
    currentEmployee: employeeSelectors.getCurrentEmployee(state),
    projects: projectSelectors.getAllProjects(state),
    projectTasks: projectTaskSelectors.getAllProjectTasks(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    getCurrentShift: employeeId => {
      return dispatch(shiftActions.getCurrentShift(employeeId));
    },
    clockOut: (employee, shift, activities, lunch) => {
      return dispatch(employeeActions.clockOut(employee, shift, activities, lunch));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClockOut));


