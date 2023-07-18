import { BaseEmployee, BaseActivity, BaseShift } from './types';
import { snackActions } from '~/store/actions';
import { AxiosError } from 'axios';
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from '~/helpers/axios';
import moment from 'moment';
import * as status from '~/constants/status';

export type ClockInEmployeeRequest = Action<'ClockInEmployeeRequest'>;

export interface ClockInEmployeeFailure
  extends Action<'ClockInEmployeeFailure'> {
  error: AxiosError;
}

export type ClockInEmployeeSuccess = Action<'ClockInEmployeeSuccess'>;

export type ClockOutEmployeeRequest = Action<'ClockOutEmployeeRequest'>;

export interface ClockOutEmployeeFailure
  extends Action<'ClockOutEmployeeFailure'> {
  error: AxiosError;
}

export type ClockOutEmployeeSuccess = Action<'ClockOutEmployeeSuccess'>;

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
      dispatch(
        snackActions.openSnack(status.SUCCESS, `Clock in success!`) as any
      );
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
  lunch: number,
  length: number,
  clockOutDate: string
): ThunkAction<void, BaseEmployee, null, ClockInEmployeeSuccess> => {
  return async (dispatch: Dispatch<EmployeeActions>) => {
    dispatch({ type: 'ClockOutEmployeeRequest' });
    try {
      const shiftRequest = {
        lunch,
        length,
        clockOutDate
      };
      await axios.post('/employees/clockout', {
        employeeId: employee.id,
        shift: shiftRequest,
        activities: activities
      });
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Clock out success!`) as any
      );
      dispatch({ type: 'ClockOutEmployeeSuccess' });
    } catch (e) {
      dispatch({ type: 'ClockOutEmployeeFailure', error: e });
      throw e;
    }
  };
};
