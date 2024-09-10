import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import moment from 'moment'

import FullShiftForm from '~/components/forms/Shift/FullShift'
import HalfShiftForm from '~/components/forms/Shift/HalfShift'
import FormHeader from '~/components/forms/Shift/FormHeader'
import * as formConstants from '~/constants/formTypes'

import Progress from '~/components/helpers/Progress'
import {
  shiftSelectors,
  projectSelectors,
  projectTaskSelectors,
  employeeSelectors,
} from '~/store/selectors'
import { analyzeStatus } from '~/constants/analyze'
import { shiftActions } from '~/store/actions'
import Hero from '~/components/layouts/Hero'
import {
  shift as shiftValidation,
  halfShift as halfShiftValidation,
} from '~/constants/formValidation'
import { getShiftDuration } from '~/helpers/shiftDuration'
import axios from '~/helpers/axios'

export function ShiftCRUD(props: any) {

  const [state, setState] = useState({
    [`${analyzeStatus.EDITING}Extent`]: formConstants.FULL_SHIFT,
    [`${analyzeStatus.ADDING}Extent`]: formConstants.FULL_SHIFT,
    isLoading: false,
    loadingMessage: '',
  })

  const { selected, status, projects, projectTasks, employees } = props
  const { editingExtent, addingExtent } = state

  const [currentMoment, setCurrentMoment] = useState<string | null>(null)

  useEffect(() => {
    axios
      .get('/now')
      .then((response: any) => {
        const { now } = response.data
        const clockOut = moment(now).utc().local().format(`YYYY-MM-DDTHH:mm:ss`)
        setCurrentMoment(clockOut)
      })
  }, [selected, editingExtent, addingExtent])

  const removeShift = () => {
    const { selected, removeShift } = props
    removeShift(selected.id)
  }

  const updateExtent = (type: any, extent: any) => {
    setState({
      ...state,
      [`${type}Extent`]: extent,
    })
  }

  const updateLoading = (isLoading: boolean, loadingMessage: string) => {
    setState({
      ...state,
      isLoading,
      loadingMessage
    })
  }

  const isComplete =
    status === analyzeStatus.EDITING &&
    selected &&
    selected.clockOutDate !== null

  useEffect(() => {
    if (isComplete && (editingExtent !== formConstants.FULL_SHIFT)) {
      updateExtent(analyzeStatus.EDITING, formConstants.FULL_SHIFT)
    }
  }, [isComplete, editingExtent])

  if (status === analyzeStatus.INIT) {
    return (
      <Hero fullWidth fullHeight>
        <Typography variant="h6">Select a Shift.. </Typography>
      </Hero>
    )
  }
  if (state.isLoading) {
    return (
      <Progress
        variant="circular"
        fullWidth
        fullHeight
        message={state.loadingMessage}
      />
    )
  }

  if (status === analyzeStatus.EDITING) {
    return (
      <div>
        <FormHeader
          label="Edit Shift"
          remove={removeShift}
          type={status}
          // @ts-expect-error: types
          extent={isComplete ? formConstants.FULL_SHIFT : editingExtent}
          extentOptions={
            isComplete
              ? [{ type: formConstants.FULL_SHIFT, label: `Full Shift` }]
              : [
                { type: formConstants.HALF_SHIFT, label: `Start Shift` },
                { type: formConstants.FULL_SHIFT, label: `Full Shift` },
              ]
          }
          updateExtent={updateExtent}
        />
        {editingExtent === formConstants.HALF_SHIFT && (
          <Formik
            enableReinitialize
            initialValues={{
              id: selected.id,
              employeeId: selected.employeeId,
              clockInDate: moment
                .utc(selected.clockInDate)
                .local()
                .format(`YYYY-MM-DDTHH:mm`),
            }}
            validationSchema={halfShiftValidation}
            onSubmit={(values, formikFunctions) => {
              const { updateHalfShift } = props
              updateLoading(true, 'Updating clock in..')
              return updateHalfShift(values).then(
                () => {
                  formikFunctions.resetForm()
                  formikFunctions.setStatus({ success: true })
                  updateLoading(false, '')
                },
                (e: any) => {
                  formikFunctions.setStatus({ success: false })
                  formikFunctions.setSubmitting(false)
                  // @ts-ignore
                  formikFunctions.setErrors({ submit: e })
                  updateLoading(false, '')
                },
              )
            }}
            render={(formikProps) => {
              return (
                <HalfShiftForm
                  formStatus={status}
                  // @ts-ignore
                  label="Edit Shift"
                  type="edit"
                  employees={employees}
                  projects={projects}
                  projectTasks={projectTasks}
                  generalError={``}
                  removeShift={removeShift}
                  {...formikProps}
                />
              )
            }}
          />
        )}

        {editingExtent === formConstants.FULL_SHIFT && (
          <Formik
            enableReinitialize
            initialValues={{
              ...selected,
              clockInDate: moment
                .utc(selected.clockInDate)
                .local()
                .format(`YYYY-MM-DDTHH:mm:ss`),
              clockOutDate: selected.clockOutDate
                ? moment
                  .utc(selected.clockOutDate, `YYYY-MM-DDThh:mm:ss:SSS`)
                  .local()
                  .format(`YYYY-MM-DDTHH:mm:ss`)
                : currentMoment,
              lunch: selected.lunch,
              activities: selected.activities
                ? selected.activities.map((activity: any) => {
                  return {
                    ...activity,
                    projectId: activity.projectTask.projectId,
                  }
                })
                : [],
            }}
            validationSchema={shiftValidation}
            onSubmit={(values, formikFunctions) => {
              const { updateShift } = props
              updateLoading(true, 'Updating shift..')
              return updateShift(values).then(
                () => {
                  updateLoading(false, '')
                  formikFunctions.resetForm()
                  formikFunctions.setStatus({ success: true })
                },
                (e: any) => {
                  updateLoading(false, '')
                  formikFunctions.setStatus({ success: false })
                  formikFunctions.setSubmitting(false)
                  formikFunctions.setErrors({ submit: e })
                },
              )
            }}
            render={(formikProps) => {
              const { values, errors } = formikProps
              const { lengthRounded } = getShiftDuration(moment(values.clockInDate), moment(values.clockOutDate))

              let timeLeft =
                lengthRounded -
                values.lunch

              values.activities.forEach((activity: any) => {
                timeLeft -= activity.length
              })
              let generalError
              if (
                errors.activities &&
                typeof errors.activities === `string`
              ) {
                generalError = errors.activities
              } else if (errors.lunch && typeof errors.lunch === `string`) {
                generalError = errors.lunch
              }
              return (
                <FullShiftForm
                  // @ts-ignore
                  label="Edit Shift"
                  type="edit"
                  employees={employees}
                  projects={projects}
                  projectTasks={projectTasks}
                  timeLeft={timeLeft}
                  generalError={generalError}
                  removeShift={removeShift}
                  {...formikProps}
                />
              )
            }}
          />
        )}
      </div>
    )
  }

  if (status === analyzeStatus.ADDING) {
    return (
      <div>
        <FormHeader
          label="Add Shift"
          type={status}
          // @ts-expect-error: types
          extent={addingExtent}
          extentOptions={[
            { type: formConstants.HALF_SHIFT, label: `Start Shift` },
            { type: formConstants.FULL_SHIFT, label: `Full Shift` },
          ]}
          updateExtent={updateExtent}
        />
        {addingExtent === formConstants.HALF_SHIFT && (
          <Formik
            enableReinitialize
            initialValues={{
              clockInDate: moment()
                .startOf(`day`)
                .add(`minutes`, 450)
                .format(`YYYY-MM-DDTHH:mm`),
              employeeId: -1,
            }}
            validationSchema={halfShiftValidation}
            onSubmit={(values, formikFunctions) => {
              const { createHalfShift } = props
              updateLoading(true, 'Creating clock in..')
              return createHalfShift(values).then(
                () => {
                  updateLoading(false, '')
                  formikFunctions.resetForm()
                  formikFunctions.setStatus({ success: true })
                },
                (e: any) => {
                  updateLoading(false, '')
                  formikFunctions.setStatus({ success: false })
                  formikFunctions.setSubmitting(false)
                  // @ts-ignore
                  formikFunctions.setErrors({ submit: e })
                },
              )
            }}
            render={(formikProps) => {

              const { values } = formikProps

              const clockOutMoment = moment(new Date(), 'YYYY-MM-DDTHH:mm:ss')
              const { lengthRounded } = getShiftDuration(moment(values.clockInDate), clockOutMoment)

              return (
                <HalfShiftForm
                  formStatus={status}
                  // @ts-ignore
                  label="Add Shift"
                  type="add"
                  employees={employees}
                  projects={projects}
                  projectTasks={projectTasks}
                  timeLeft={lengthRounded}
                  generalError={``}
                  {...formikProps}
                />
              )
            }}
          />
        )}
        {addingExtent === formConstants.FULL_SHIFT && (
          <Formik
            enableReinitialize
            initialValues={{
              lunch: 30,
              clockInDate: moment()
                .startOf(`day`)
                .add(`minutes`, 450)
                .format(`YYYY-MM-DDTHH:mm:ss`),
              clockOutDate: currentMoment,
              employeeId: -1,
              activities: [
                {
                  projectId: -1,
                  projectTaskId: -1,
                  length: 0,
                  description: ``,
                },
              ],
            }}
            validationSchema={shiftValidation}

            onSubmit={(values, formikFunctions) => {
              const { createShift } = props
              updateLoading(true, 'Creating shift..')
              return createShift(values).then(
                () => {
                  formikFunctions.resetForm()
                  formikFunctions.setStatus({ success: true })
                  updateLoading(false, '')
                },
                (e: any) => {
                  updateLoading(false, '')
                  formikFunctions.setStatus({ success: false })
                  formikFunctions.setSubmitting(false)
                  // @ts-ignore
                  formikFunctions.setErrors({ submit: e })
                },
              )
            }}

            render={(formikProps) => {
              const { values, errors } = formikProps
              const { lengthRounded } = getShiftDuration(moment(values.clockInDate), moment(values.clockOutDate))

              let timeLeft =
                lengthRounded -
                values.lunch

              values.activities.forEach((activity) => {
                timeLeft -= activity.length
              })

              let generalError
              if (
                errors.activities &&
                typeof errors.activities === `string`
              ) {
                generalError = errors.activities
              } else if (errors.lunch && typeof errors.lunch === `string`) {
                generalError = errors.lunch
              }
              return (
                <FullShiftForm
                  // @ts-ignore
                  label="Add Shift"
                  type="add"
                  employees={employees}
                  projects={projects}
                  projectTasks={projectTasks}
                  timeLeft={timeLeft}
                  generalError={generalError}
                  {...formikProps}
                />
              )
            }}
          />
        )}
      </div>
    )
  }
}

/* istanbul ignore next */
const mapStateToProps = (state: any) => {
  return {
    selected: shiftSelectors.getSelectedShift(state),
    status: state.analyze.shiftStatus,
    projects: projectSelectors.getActiveProjects(state),
    projectTasks: projectTaskSelectors.getAllProjectTasks(state),
    employees: employeeSelectors.getActiveEmployees(state),
  }
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch: any) => {
  return {
    createShift: (shift: any) => {
      return dispatch(shiftActions.createShift(shift))
    },
    createHalfShift: (shift: any) => {
      return dispatch(shiftActions.createHalfShift(shift))
    },
    updateShift: (shift: any) => {
      return dispatch(shiftActions.updateShift(shift))
    },
    updateHalfShift: (shift: any) => {
      return dispatch(shiftActions.updateHalfShift(shift))
    },
    removeShift: (shift: any) => {
      return dispatch(shiftActions.removeShift(shift))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftCRUD)
