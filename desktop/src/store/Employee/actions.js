import { employee as employeeActionTypes } from 'constants/ActionTypes';

import { shift as shiftActions } from 'store/actions';
import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import * as schemas from 'store/schemas';

export const putEmployee = employee => {
  return async dispatch => {
    dispatch({ type: employeeActionTypes.UPDATE_EMPLOYEE_REQUEST });
    try {
      const response = await endpoint.putEmployee(employee.id, employee);
      const payload = normalize(
        { employees: [response.data] },
        schemas.employeeArray,
      );
      return dispatch({
        type: employeeActionTypes.UPDATE_EMPLOYEE_SUCCESS,
        payload,
      });
    } catch (e) {
      dispatch({
        type: employeeActionTypes.UPDATE_EMPLOYEE_FAILURE,
        payload: e,
      });
      throw e;
    }
  };
};

export const toggleIsWorking = employee => {
  return putEmployee({
    ...employee,
    isWorking: !employee.isWorking,
  });
};

export const clockIn = employee => {
  return async dispatch => {
    dispatch({ type: employeeActionTypes.CLOCKIN_EMPLOYEE_REQUEST });
    try {
      const clockInObject = {
        clockInDate: new Date().toUTCString(),
        employeeId: employee.id,
      };
      await dispatch(shiftActions.postShift(clockInObject));
      await dispatch(toggleIsWorking(employee));
      return dispatch({ type: employeeActionTypes.CLOCKIN_EMPLOYEE_SUCCESS });
    } catch (e) {
      console.log(e);
      return dispatch({
        type: employeeActionTypes.CLOCKIN_EMPLOYEE_FAILURE,
        payload: e,
      });
      throw e;
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
        data: response.data,
      });
    } catch (e) {
      dispatch({
        type: employeeActionTypes.LOGIN_EMPLOYEE_FAILURE,
        payload: e,
      });
      throw e;
    }
  };
};
