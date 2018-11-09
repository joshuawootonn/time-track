import { normalize } from 'normalizr';
import moment from 'moment';

import { employeeActionTypes } from 'constants/actionTypeConstants';
import { shiftActions, snackActions, activityActions } from 'store/actions';
import * as endpoint from './endpoints';
import * as schemas from 'store/schemas';
import * as status from 'constants/status';
import { currentRoundedTime } from 'helpers/time';

export const getEmployees = () => {
  return async dispatch => {
    dispatch({ type: employeeActionTypes.GET_EMPLOYEE_REQUEST });
    try {
      const response = await endpoint.getEmployees();
      const payload = normalize(
        { employees: response.data },
        schemas.employeeArray,
      );
      return dispatch({
        type: employeeActionTypes.GET_EMPLOYEE_SUCCESS,
        payload
      });
    } catch (e) {
      console.log(e);
      return dispatch({
        type: employeeActionTypes.GET_EMPLOYEE_FAILURE,
        payload: e
      });
    }
  };
};

export const putEmployee = employee => {
  return async dispatch => {
    dispatch({ type: employeeActionTypes.PUT_EMPLOYEE_REQUEST });
    try {
      const response = await endpoint.putEmployee(employee.id, employee);
      const payload = normalize(
        { employees: [response.data] },
        schemas.employeeArray,
      );
      await dispatch(
        snackActions.openSnack(status.SUCCESS, 'Employee Updated'),
      );

      return dispatch({
        type: employeeActionTypes.PUT_EMPLOYEE_SUCCESS,
        payload
      });
    } catch (e) {
      console.log(e);
      return dispatch({
        type: employeeActionTypes.PUT_EMPLOYEE_FAILURE,
        payload: e
      });
    }
  };
};

export const postEmployee = employee => {
  return async dispatch => {
    dispatch({ type: employeeActionTypes.POST_EMPLOYEE_REQUEST });
    try {
      const response = await endpoint.postEmployee(employee);
      const payload = normalize(
        { employees: [response.data] },
        schemas.employeeArray,
      );

      await dispatch(
        snackActions.openSnack(status.SUCCESS, 'Employee Created'),
      );

      return dispatch({
        type: employeeActionTypes.POST_EMPLOYEE_SUCCESS,
        payload
      });
    } catch (e) {
      console.log(e);
      return dispatch({
        type: employeeActionTypes.POST_EMPLOYEE_FAILURE,
        payload: e
      });
    }
  };
};

export const deleteEmployee = employee => {
  return async dispatch => {
    dispatch({ type: employeeActionTypes.DELETE_EMPLOYEE_REQUEST });
    try {
      await endpoint.deleteEmployee(employee);
      //const payload = normalize( { employees: [response.data] },schemas.employeeArray);
      
      await dispatch(
        snackActions.openSnack(status.SUCCESS, 'Employee deleted!'),
      );
      
      const deleted = {
        entities: {
          employees: [employee.id]          
        },
        result: {
          employees: [employee.id]
        }
      };

      return dispatch({
        type: employeeActionTypes.DELETE_EMPLOYEE_SUCCESS,
        deleted
      });
    } catch (e) {
      console.log(e);
      await dispatch(
        snackActions.openSnack(status.FAILURE, 'Employee deletion failed!'),
      );
      return dispatch({
        type: employeeActionTypes.DELETE_EMPLOYEE_FAILURE,
        payload: e
      });
    }
  };
};

export const toggleIsWorking = employee => {
  return putEmployee({
    ...employee,
    isWorking: !employee.isWorking
  });
};

export const clockIn = employee => {
  return async dispatch => {
    dispatch({ type: employeeActionTypes.CLOCKIN_EMPLOYEE_REQUEST });
    try {
      const clockInObject = {
        clockInDate: currentRoundedTime()
          .subtract(7, 'hours')
          .toString(),
        employeeId: employee.id
      };
      await dispatch(shiftActions.postShift(clockInObject));
      await dispatch(toggleIsWorking(employee));
      await dispatch(
        snackActions.openSnack(status.SUCCESS, 'Clock in success!'),
      );
      return dispatch({ type: employeeActionTypes.CLOCKIN_EMPLOYEE_SUCCESS });
    } catch (e) {
      console.log(e);
      dispatch(snackActions.openSnack(status.FAILURE, 'Clock in failed!'));
      return dispatch({
        type: employeeActionTypes.CLOCKIN_EMPLOYEE_FAILURE,
        payload: e
      });
    }
  };
};

export const clockOut = (employee, shift, activities, lunch) => {
  return async dispatch => {
    dispatch({ type: employeeActionTypes.CLOCKOUT_EMPLOYEE_REQUEST });
    try {
      const currentMoment = currentRoundedTime();
      const clockInMoment = moment(shift.clockInDate);
      const shiftDuration = moment.duration(currentMoment.diff(clockInMoment));
      const minutes = shiftDuration.asMinutes();

      const clockOutObject = {
        ...shift,
        lunch: lunch,
        clockOutDate: currentMoment.toString(),
        length: minutes
      };
      await activities.forEach(activity => {
        // activity.projectId = undefined;
        activity.shiftId = shift.id;
        dispatch(activityActions.postActivity(activity));
      });

      await dispatch(shiftActions.putShift(clockOutObject));
      await dispatch(toggleIsWorking(employee));
      dispatch(snackActions.openSnack(status.SUCCESS, 'Clock out success!'));
      return dispatch({ type: employeeActionTypes.CLOCKOUT_EMPLOYEE_SUCCESS });
    } catch (e) {
      console.log(e);
      dispatch(snackActions.openSnack(status.FAILURE, 'Clock out failed!'));
      return dispatch({
        type: employeeActionTypes.CLOCKOUT_EMPLOYEE_FAILURE,
        payload: e
      });
    }
  };
};

export const login = pin => {
  return async dispatch => {
    dispatch({ type: employeeActionTypes.LOGIN_EMPLOYEE_REQUEST });
    try {
      const response = await endpoint.getEmployeeByPin(pin);
      const payload = normalize(
        { employees: [response.data] },
        schemas.employeeArray,
      );

      return dispatch({
        type: employeeActionTypes.LOGIN_EMPLOYEE_SUCCESS,
        payload,
        data: response.data
      });
    } catch (e) {
      dispatch({
        type: employeeActionTypes.LOGIN_EMPLOYEE_FAILURE,
        payload: e
      });
      throw e;
    }
  };
};
