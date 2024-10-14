import { BaseEmployee, BaseActivity, BaseShift } from './types'
import { snackActions } from '~/store/actions'
import { Action, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import axios from '~/helpers/axios'
import moment from 'moment'
import * as status from '~/constants/status'

export type ClockInEmployeeRequest = Action<'ClockInEmployeeRequest'>

export interface ClockInEmployeeFailure
  extends Action<'ClockInEmployeeFailure'> {
  error: string
}

export type ClockInEmployeeSuccess = Action<'ClockInEmployeeSuccess'>

export type ClockOutEmployeeRequest = Action<'ClockOutEmployeeRequest'>

export interface ClockOutEmployeeFailure
  extends Action<'ClockOutEmployeeFailure'> {
  error: string
}

export type ClockOutEmployeeSuccess = Action<'ClockOutEmployeeSuccess'>

export type EmployeeActions =
  | ClockInEmployeeRequest
  | ClockInEmployeeFailure
  | ClockInEmployeeSuccess
  | ClockOutEmployeeRequest
  | ClockOutEmployeeFailure
  | ClockOutEmployeeSuccess

export const clockIn = (
  employeeId: number,
  time?: string,
): ThunkAction<
  void,
  { employeeId: number; time?: string },
  null,
  ClockInEmployeeSuccess
> => {
  return async (dispatch: Dispatch<EmployeeActions>) => {
    dispatch({ type: 'ClockInEmployeeRequest' })
    try {
      const response = await axios.post('/employees/clockin', {
        employeeId,
        time,
      })

      const {
        msg: { name, message },
      } = response.data

      if (name === 'Error') {
        throw new Error(message)
      }

      dispatch(
        snackActions.openSnack(status.SUCCESS, `Clock in success!`) as any,
      )
      dispatch({ type: 'ClockInEmployeeSuccess' })
    } catch (e: any) {
      const error = e.message ?? 'Unexpected error'
      
      dispatch(snackActions.openSnack( status.FAILURE, error ) as any)
      dispatch({ type: 'ClockInEmployeeFailure', error })
      throw e
    }
  }
}

export const clockOut = (
  employee: BaseEmployee,
  shift: BaseShift,
  activities: BaseActivity[],
  lunch: number,
  length: number,
  clockOutDate: string,
): ThunkAction<void, BaseEmployee, null, ClockInEmployeeSuccess> => {
  return async (dispatch: Dispatch<EmployeeActions>) => {
    dispatch({ type: 'ClockOutEmployeeRequest' })
    try {
      const shiftRequest = {
        id: shift.id,
        lunch,
        length,
        clockOutDate,
      }
      await axios.post('/employees/clockout', {
        employeeId: employee.id,
        shift: shiftRequest,
        activities: activities,
      })
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Clock out success!`) as any,
      )
      dispatch({ type: 'ClockOutEmployeeSuccess' })
    } catch (e: any) {
      dispatch({ type: 'ClockOutEmployeeFailure', error: e.message ?? 'Unexpected error' })
      throw e
    }
  }
}
