import moment from 'moment'

import { shiftActionTypes } from '~/constants/actionTypeConstants'

import {
  snackActions,
  analyzeActions,
  genericActions,
  employeeActions,
} from '~/store/actions'
import * as endpoint from './endpoints'
import { normalize } from 'normalizr'
import * as status from '~/constants/status'
import * as schemas from '~/store/schemas'
import domains from '~/constants/domains'
import { getShiftDuration } from '~/helpers/shiftDuration'
import clockOut from '~/components/forms/ClockOut/clockOut'

type Activity = {
  shiftId: number
  projectId: number
  projectTaskId: number
  length: number
  description: string
  id: undefined
}

type Shift = {
  id: number
  clockOutDate: string
  clockInDate: string
  employeeId: number
  lunch: number
  activities: Activity[]
}

export const getCurrentShift = (employeeId: any) => {
  return async (dispatch: any) => {
    dispatch({ type: shiftActionTypes.GET_CURRENT_SHIFT_REQUEST })
    try {
      const response = await endpoint.getHalfShiftOrNull(employeeId)
      const payload = normalize({ shifts: response.data }, schemas.shiftArray)

      return dispatch({
        type: shiftActionTypes.GET_CURRENT_SHIFT_SUCCESS,
        payload,
        data: response.data[0],
      })
    } catch (e) {
      return dispatch({
        type: shiftActionTypes.GET_CURRENT_SHIFT_FAILURE,
        payload: e,
      })
    }
  }
}

export const getShiftsInRange = (startTime: any, endTime: any) => {
  return async (dispatch: any) => {
    dispatch({ type: shiftActionTypes.GET_SHIFTS_IN_RANGE_REQUEST })
    try {
      const response = await endpoint.getShiftsInRange(startTime, endTime)
      const payload = normalize({ shifts: response.data }, schemas.shiftArray)

      return dispatch({
        type: shiftActionTypes.GET_SHIFTS_IN_RANGE_SUCCESS,
        payload,
      })
    } catch (e) {
      return dispatch({
        type: shiftActionTypes.GET_SHIFTS_IN_RANGE_FAILURE,
        payload: e,
      })
    }
  }
}

export const getShifts = (options: any) => {
  return async (dispatch: any) => {
    dispatch({ type: shiftActionTypes.GET_SHIFTS_REQUEST })
    try {
      const response = await endpoint.getAll(options)
      const payload = normalize({ shifts: response.data }, schemas.shiftArray)

      return dispatch({ type: shiftActionTypes.GET_SHIFTS_SUCCESS, payload })
    } catch (e) {
      return dispatch({
        type: shiftActionTypes.GET_SHIFTS_FAILURE,
        payload: e,
      })
    }
  }
}

export const createShift = (shift: Shift) => {
  return async (dispatch: any) => {
    dispatch({ type: shiftActionTypes.CREATE_SHIFT_REQUEST })

    try {
      const clockOutMoment = moment(shift.clockOutDate)
      const { lengthRounded, clockIn: clockInMoment } = getShiftDuration(moment(shift.clockInDate), clockOutMoment)

      // Parse form output to create the object that the api understands
      const shiftObject = {
        employeeId: shift.employeeId,
        length: lengthRounded,
        lunch: shift.lunch,
        clockInDate: clockInMoment.toString(),
        clockOutDate: clockOutMoment.toString(),
        activities: shift.activities,
      }
      // Post parsed object to SHIFT endpoint
      const response = await dispatch(
        genericActions.post(domains.SHIFT, shiftObject),
      )
      // Loop through the activities Posting them to the ACTIVITY endpoint
      for (const activity of shift.activities) {
        // activity.projectId = undefined;
        activity.shiftId = response.data.id
        await dispatch(genericActions.post(domains.ACTIVITY, activity))
      }
      // Get the new SHIFT object since post wasn't working
      await dispatch(genericActions.get(domains.SHIFT, response.data.id))
      // Select said object for analyze
      await dispatch(analyzeActions.select(domains.SHIFT, response.data.id))
      await dispatch(snackActions.openSnack(status.SUCCESS, `Shift created`))
      return dispatch({ type: shiftActionTypes.CREATE_SHIFT_SUCCESS })
    } catch (e) {
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Shift creation failed`),
      )
      return dispatch({ type: shiftActionTypes.CREATE_SHIFT_FAILURE })
    }
  }
}

export const createHalfShift = (shift: Shift) => {
  return async (dispatch: any, getState: any) => {
    dispatch({ type: shiftActionTypes.CREATE_HALF_SHIFT_REQUEST })
    try {
      const shiftObject = {
        employeeId: shift.employeeId,
        clockInDate: moment(shift.clockInDate).utc().toString(),
      }

      // create the half shift
      const response = await dispatch(
        genericActions.post(domains.SHIFT, shiftObject),
      )
      await dispatch(genericActions.get(domains.SHIFT, response.data.id))
      // set the employee is isWorking
      const employee = getState().entities.employees[shift.employeeId]
      await dispatch(employeeActions.setIsWorking(employee, true))

      dispatch(snackActions.openSnack(status.SUCCESS, `Clock in created`))
      return dispatch({ type: shiftActionTypes.CREATE_HALF_SHIFT_SUCCESS })
    } catch (e) {
      dispatch(
        snackActions.openSnack(status.FAILURE, `Clock in creation failed!`),
      )
      return dispatch({
        type: shiftActionTypes.CREATE_HALF_SHIFT_FAILURE,
        payload: e,
      })
    }
  }
}

export const updateShift = (shift: Shift) => {
  return async (dispatch: any, getState: any) => {
    dispatch({ type: shiftActionTypes.UPDATE_SHIFT_REQUEST })
    try {
      const clockOutMoment = moment(shift.clockOutDate)
      const { lengthRounded, clockIn: clockInMoment } = getShiftDuration(moment(shift.clockInDate), clockOutMoment)

      // employee to not working
      const oldShift = getState().entities.shifts[shift.id]
      if (oldShift && !oldShift.clockOutDate) {
        const employee = getState().entities.employees[oldShift.employeeId]
        dispatch(employeeActions.setIsWorking(employee, false))
      }

      const shiftObject = {
        id: shift.id,
        employeeId: shift.employeeId,
        length: lengthRounded,
        lunch: shift.lunch,
        clockInDate: clockInMoment.toString(),
        clockOutDate: clockOutMoment.toString(),
      }

      const response = await dispatch(
        genericActions.put(domains.SHIFT, shiftObject),
      )

      await endpoint.deleteRelatedActivities(shift.id)
      for (const activity of shift.activities) {
        activity.shiftId = response.data.id
        activity.id = undefined
        await dispatch(genericActions.post(domains.ACTIVITY, activity))
      }

      await dispatch(genericActions.get(domains.SHIFT, response.data.id))
      await dispatch(snackActions.openSnack(status.SUCCESS, `Shift updated`))
      return dispatch({ type: shiftActionTypes.UPDATE_SHIFT_SUCCESS })
    } catch (e) {
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Shift update failed`),
      )
      return dispatch({ type: shiftActionTypes.UPDATE_SHIFT_FAILURE })
    }
  }
}

export const updateHalfShift = (shift: Shift) => {
  return async (dispatch: any) => {
    dispatch({ type: shiftActionTypes.EDIT_HALF_SHIFT_REQUEST })
    try {
      const shiftObject = {
        id: shift.id,
        employeeId: shift.employeeId,
        clockInDate: moment(shift.clockInDate).utc().toString(),
      }

      const response = await dispatch(
        genericActions.put(domains.SHIFT, shiftObject),
      )

      await dispatch(genericActions.get(domains.SHIFT, response.data.id))

      await dispatch(snackActions.openSnack(status.SUCCESS, `Clock in updated`))
      return dispatch({ type: shiftActionTypes.EDIT_HALF_SHIFT_SUCCESS })
    } catch (e) {
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Clock in update failed`),
      )
      return dispatch({ type: shiftActionTypes.EDIT_HALF_SHIFT_FAILURE })
    }
  }
}

export const removeShift = (id: string) => {
  return async (dispatch: any, getState: any) => {
    console.log('here we are')
    dispatch({ type: shiftActionTypes.REMOVE_SHIFT_REQUEST })
    try {
      await dispatch(analyzeActions.deleteSelected(domains.SHIFT))
      const shift = getState().entities.shifts[id]
      // This clocks the employee out if you are deleting a shift in progress
      if (shift && !shift.clockOutDate) {
        const employee = getState().entities.employees[shift.employeeId]

        dispatch(employeeActions.setIsWorking(employee, false))
      }
      await endpoint.deleteRelatedActivities(id)
      await dispatch(genericActions.delet(domains.SHIFT, id))

      await dispatch(snackActions.openSnack(status.SUCCESS, `Shift deleted`))

      return dispatch({ type: shiftActionTypes.REMOVE_SHIFT_SUCCESS })
    } catch (e) {
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Shift deletion failed`),
      )
      return dispatch({ type: shiftActionTypes.REMOVE_SHIFT_FAILURE, e })
    }
  }
}
