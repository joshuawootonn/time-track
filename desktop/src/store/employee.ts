import {
  ActivityState,
  Activity,
  BaseEmployee,
  BaseActivity,
  BaseShift
} from './types';
import { snackActions } from 'store/actions';
import { AxiosError } from 'axios';
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'helpers/axios';
import moment from 'moment';
import * as status from 'constants/status';

export interface ClockInEmployeeRequest
  extends Action<'ClockInEmployeeRequest'> {}
export interface ClockInEmployeeFailure
  extends Action<'ClockInEmployeeFailure'> {
  error: AxiosError;
}
export interface ClockInEmployeeSuccess
  extends Action<'ClockInEmployeeSuccess'> {}

export interface ClockOutEmployeeRequest
  extends Action<'ClockOutEmployeeRequest'> {}
export interface ClockOutEmployeeFailure
  extends Action<'ClockOutEmployeeFailure'> {
  error: AxiosError;
}
export interface ClockOutEmployeeSuccess
  extends Action<'ClockOutEmployeeSuccess'> {}

export type EmployeeActions =
  | ClockInEmployeeRequest
  | ClockInEmployeeFailure
  | ClockInEmployeeSuccess
  | ClockOutEmployeeRequest
  | ClockOutEmployeeFailure
  | ClockOutEmployeeSuccess;

export const clockIn = (
  employee: BaseEmployee
): ThunkAction<void, BaseEmployee, null, ClockInEmployeeSuccess> => {
  return async (dispatch: Dispatch<EmployeeActions>) => {
    dispatch({ type: 'ClockInEmployeeRequest' });
    try {
      console.log(employee.id);
      await axios.post('/employees/clockin', {
        employeeId: employee.id
      });
      dispatch(snackActions.openSnack(status.SUCCESS, `Clock in success!`) as any);
      dispatch({ type: 'ClockInEmployeeSuccess' });
    } catch (e) {
      dispatch({ type: 'ClockInEmployeeFailure', error: e });
      throw e;
    }
  };
};

export const clockOut = (
  employee: BaseEmployee,
  shift: BaseShift,
  activities: BaseActivity[],
  lunch: number
): ThunkAction<void, BaseEmployee, null, ClockInEmployeeSuccess> => {
  return async (dispatch: Dispatch<EmployeeActions>) => {
    dispatch({ type: 'ClockOutEmployeeRequest' });
    try {
      const shiftRequest = {
        lunch: lunch,
        length: moment.duration(moment().diff(moment(shift.clockInDate))).asMinutes()
      };

      console.log(employee, shift, shiftRequest, activities, lunch);
      await axios.post('/employees/clockout', {
        employeeId: employee.id,
        shift: shiftRequest,
        activities: activities
      });
      dispatch({ type: 'ClockOutEmployeeSuccess' });
    } catch (e) {
      dispatch({ type: 'ClockOutEmployeeFailure', error: e });
      throw e;
    }
  };
};

