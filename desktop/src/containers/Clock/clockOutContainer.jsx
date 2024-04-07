import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import moment from 'moment'
import { Formik } from 'formik'

import ClockOutForm from '~/components/forms/ClockOut'
import Progress from '~/components/helpers/Progress'

import { clockout as clockoutValidation } from '~/constants/formValidation'
import { shiftActions, employeeActions } from '~/store/actions'
import { minutesToString } from '~/helpers/time'
import {
  employeeSelectors,
  shiftSelectors,
  projectSelectors,
  projectTaskSelectors,
} from '~/store/selectors'
import { minutesRoudedTime } from '~/helpers/time'

function isActivityCompleted(activity, projectTaskObjects) {
  const { projectTaskId, description } = activity

  const isOtherTask =
    projectTaskId !== -1 &&
    projectTaskObjects &&
    projectTaskObjects[projectTaskId] &&
    /Other/.test(projectTaskObjects[projectTaskId].task.name)

  return isOtherTask ? description.length > 0 : true
}

export class ClockOut extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activities: [],
      currentMoment: moment().add(`minutes`, 3),
    }
  }

  componentDidMount = () => {
    this.props.getCurrentShift(this.props.currentEmployee.id)
  }
  cancel = () => {
    this.props.history.push(`/`)
  }

  render() {
    const { currentShift, projects, projectTasks, lastWeeksShifts } = this.props

    const isLoading = !currentShift
    if (isLoading) {
      return <Progress variant="circular" fullPage />
    }

    const clockInMoment = moment.utc(currentShift.clockInDate).local()
    const shiftDuration = moment.duration(
      this.state.currentMoment.diff(clockInMoment),
    )

    const clockOutObject = {
      in: clockInMoment.format(`h:mm a`),
      out: this.state.currentMoment.format(`h:mm a`),
      date: clockInMoment.format(`MMM D`),
    }

    return (
      <Formik
        initialValues={{
          lunch: 30,
          activities: [
            {
              projectId: -1,
              projectTaskId: -1,
              length: 0,
              description: ``,
            },
          ],
        }}
        onSubmit={(values) => {
          const { currentEmployee, currentShift, history, clockOut } =
            this.props
          const clockInMoment = moment.utc(currentShift.clockInDate).local()
          const shiftDuration = moment.duration(
            this.state.currentMoment.diff(clockInMoment),
          )
          return clockOut(
            currentEmployee,
            currentShift,
            values.activities,
            values.lunch,
            minutesRoudedTime(Math.floor(shiftDuration.asMinutes())),
            this.state.currentMoment.utc().format(),
          )
            .then(() => history.push(`/`))
            .catch((e) => console.log(e))
        }}
        validationSchema={clockoutValidation}
        render={(formikProps) => {
          //console.log(formikProps.values);
          const { errors, values } = formikProps
          let generalError
          const areAllOtherTasksDescribed = values.activities.every((activity) =>
            isActivityCompleted(activity, this.props.projectTaskObjects),
          )
          if (!areAllOtherTasksDescribed) {
              generalError = "Add description to Other activity"
          }
          

          // Time left is the duraction - lunch - all the activity times
          let timeLeft =
            minutesRoudedTime(Math.floor(shiftDuration.asMinutes())) -
            values.lunch
          values.activities.forEach((activity) => {
            timeLeft -= activity.length
          })

          let weekHourTotal = shiftDuration.asMinutes() - values.lunch
          lastWeeksShifts.forEach((shift) => {
            if (shift.length) {
              weekHourTotal += shift.length - shift.lunch
            }
          })

          const length = minutesToString(
            minutesRoudedTime(shiftDuration.asMinutes() - values.lunch),
          )

          if (errors.activities && typeof errors.activities === `string`) {
            generalError = errors.activities
          } else if (errors.lunch && typeof errors.lunch === `string`) {
            generalError = errors.lunch
          }

          return (
            <ClockOutForm
              cancel={this.cancel}
              shift={clockOutObject}
              projects={projects}
              generalError={generalError}
              timeLeft={timeLeft}
              weekHourTotal={weekHourTotal}
              length={length}
              projectTasks={projectTasks}
              {...formikProps}
            />
          )
        }}
      />
    )
  }
}

ClockOut.propTypes = {
  currentEmployee: PropTypes.object.isRequired,
}

/* istanbul ignore next */
const mapStateToProps = (state) => {
  return {
    currentShift: shiftSelectors.getCurrentShift(state),
    lastWeeksShifts: shiftSelectors.getLastWeeksShiftsForCurrentEmployee(state),
    currentEmployee: employeeSelectors.getCurrentEmployee(state),
    projects: projectSelectors.getActiveProjects(state),
    projectTasks: projectTaskSelectors.getAllProjectTasks(state),
    projectTaskObjects: projectTaskSelectors.getAllProjectTasksObjects(state),
  }
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentShift: (employeeId) => {
      return dispatch(shiftActions.getCurrentShift(employeeId))
    },
    clockOut: (employee, shift, activities, lunch, length, clockOutDate) =>
      dispatch(
        employeeActions.clockOut(
          employee,
          shift,
          activities,
          lunch,
          length,
          clockOutDate,
        ),
      ),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ClockOut),
)
