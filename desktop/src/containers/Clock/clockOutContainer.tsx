import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

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
import { getShiftDuration } from '~/helpers/shiftDuration'

function isActivityCompleted(activity: any, projectTaskObjects: any) {
  const { projectTaskId, description } = activity

  const isOtherTask =
    projectTaskId !== -1 &&
    projectTaskObjects &&
    projectTaskObjects[projectTaskId] &&
    /Other/.test(projectTaskObjects[projectTaskId].task.name)

  return isOtherTask ? description.length > 0 : true
}

type ClockOutProps = {
  currentEmployee: any,
}

type ClockOutState = {
  activities: any[]
  currentMoment: moment.Moment
}

export class ClockOut extends Component<ClockOutProps, ClockOutState> {
  constructor(props: any) {
    super(props)
    this.state = {
      activities: [],
      currentMoment: moment().add(`minutes`, 3),
    }
  }

  componentDidMount = () => {
    // @ts-ignore
    this.props.getCurrentShift(this.props.currentEmployee.id)
  }
  cancel = () => {
    // @ts-ignore
    this.props.history.push(`/`)
  }

  render() {
    // @ts-ignore
    const { currentShift, projects, projectTasks, lastWeeksShifts } = this.props

    const isLoading = !currentShift
    if (isLoading) {
      return <Progress variant="circular" fullPage />
    }

    const { lengthRounded, duration: shiftDuration, clockIn } = getShiftDuration(moment(currentShift.clockInDate), this.state.currentMoment)

    const clockOutObject = {
      in: clockIn.format(`h:mm:ss a`),
      out: this.state.currentMoment.format(`h:mm:ss a`),
      date: clockIn.format(`MMM D`),
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
          // @ts-ignore
          const { currentEmployee, currentShift, history, clockOut } =
            this.props

          const clockOutMoment = this.state.currentMoment
          const { lengthRounded } = getShiftDuration(moment(currentShift.clockInDate), clockOutMoment)

          return clockOut(
            currentEmployee,
            currentShift,
            values.activities,
            values.lunch,
            lengthRounded,
            clockOutMoment.utc().format(),
          )
            .then(() => history.push(`/`))
            .catch((e: any) => console.log(e))
        }}
        validationSchema={clockoutValidation}
        render={(formikProps) => {
          const { errors, values } = formikProps
          let generalError
          const areAllOtherTasksDescribed = values.activities.every((activity) =>
            // @ts-ignore
            isActivityCompleted(activity, this.props.projectTaskObjects),
          )
          if (!areAllOtherTasksDescribed) {
            generalError = "Add description to Other activity"
          }

          let timeLeft =
            lengthRounded -
            values.lunch
          values.activities.forEach((activity) => {
            timeLeft -= activity.length
          })

          let weekHourTotal = shiftDuration.asMinutes() - values.lunch
          lastWeeksShifts.forEach((shift: any) => {
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

/* istanbul ignore next */
const mapStateToProps = (state: any) => {
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
const mapDispatchToProps = (dispatch: any) => {
  return {
    getCurrentShift: (employeeId: any) => {
      return dispatch(shiftActions.getCurrentShift(employeeId))
    },
    clockOut: (employee: any, shift: any, activities: any, lunch: any, length: any, clockOutDate: any) =>
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
