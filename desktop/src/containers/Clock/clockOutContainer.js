import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import moment from 'moment';
import { Formik } from 'formik';

import { shift as shiftValidation } from 'constants/formValidation';
import { shiftActions, employeeActions } from 'store/actions';
import { minutesToString } from 'helpers/time';
import { employeeSelectors, shiftSelectors, projectSelectors, projectTaskSelectors } from 'store/selectors';
import ClockOut from 'components/forms/ClockOut';
import { currentRoundedTime } from 'helpers/time';

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
    const { currentShift, projects, projectTasks } = this.props;

    const isLoading = !currentShift;
    if (isLoading) {
      return <div>Loading</div>;
    }

    const currentMoment = currentRoundedTime();
    const clockInMoment = moment(currentShift.clockInDate);
    const shiftDuration = moment.duration(currentMoment.diff(clockInMoment));


    const clockOutObject = {
      in: clockInMoment.format('h:mm a'),
      out: currentMoment.format('h:mm a'),
      date: clockInMoment.format('MMM D'),
      length: `${minutesToString(shiftDuration.asMinutes())}`,
      lengthInMinutes: Math.floor(shiftDuration.asMinutes())
    };


    return (
      <Formik
        initialValues={{
          lunch: 0,
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
          clockOut(currentEmployee, currentShift, values.activities, values.lunch).then(() =>
            history.push('/'),
          );
        }}
        validationSchema={shiftValidation}
        render={(formikProps) => {
          //console.log(formikProps.values);
          
          // Time left is the duraction - lunch - all the activity times
          let timeLeft = Math.floor(shiftDuration.asMinutes()) - formikProps.values.lunch;
          formikProps.values.activities.forEach((activity) => {
            timeLeft -= activity.length
          })
          return (
            <ClockOut
              cancel={this.cancel}
              shift={clockOutObject}
              projects={projects}
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

ClockOutContainer.propTypes = {
  currentEmployee: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    currentShift: shiftSelectors.getCurrentShift(state),
    currentEmployee: employeeSelectors.getCurrentEmployee(state),
    projects: projectSelectors.getAllProjects(state),
    projectTasks: projectTaskSelectors.getAllProjectTasks(state)
  };
};

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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ClockOutContainer),
);
