import { normalize } from 'normalizr';
import moment from 'moment';

import { employeeActionTypes } from 'constants/actionTypeConstants';
import { shiftActions, snackActions, activityActions,genericActions } from 'store/actions';
import endpoints from './endpoints';
import * as schemas from 'store/schemas';
import * as status from 'constants/status';
import { currentRoundedTime } from 'helpers/time';
import domains from 'constants/domains';

export const getAllEmployees = () => {
  return async dispatch => {
    dispatch(genericActions.getAll(domains.EMPLOYEE));    
  };
};


export const updateEmployee = employee => {
  return async dispatch => {
    dispatch({ type: employeeActionTypes.UPDATE_EMPLOYEE_REQUEST });
    try {
      await dispatch(genericActions.put(domains.EMPLOYEE,employee));
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Employee Updated'));
      return dispatch({ type: employeeActionTypes.UPDATE_EMPLOYEE.SUCCESS });      
    } catch (e) {
      console.log(e);
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Employee Updated Failed'));
      return dispatch({ type: employeeActionTypes.UPDATE_EMPLOYEE_REQUEST });
    }
  };
};

export const createEmployee = employee => {
  return async dispatch => {
    dispatch({ type: employeeActionTypes.CREATE_EMPLOYEE_REQUEST });
    try {
      await dispatch(genericActions.post(domains.EMPLOYEE,employee));
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Employee Created'));
      return dispatch({ type: employeeActionTypes.CREATE_EMPLOYEE_SUCCESS });      
    } catch (e) {
      console.log(e);
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Employee Creation Failed'));
      return dispatch({ type: employeeActionTypes.CREATE_EMPLOYEE_REQUEST });
    }
  };
};
export const removeEmployee = id => {
  return async dispatch => {
    dispatch({ type: employeeActionTypes.REMOVE_EMPLOYEE_REQUEST });
    try {
      await dispatch(genericActions.delet(domains.EMPLOYEE,id));
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Employee Deleted'));
      return dispatch({ type: employeeActionTypes.REMOVE_EMPLOYEE_SUCCESS });      
    } catch (e) {
      console.log(e);
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Employee Deletion Failed'));
      return dispatch({ type: employeeActionTypes.REMOVE_EMPLOYEE_REQUEST });
    }
  };
};


export const toggleIsWorking = employee => {
  return genericActions.put(domains.EMPLOYEE,{
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
      const response = await endpoints.getEmployeeByPin(pin);
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
