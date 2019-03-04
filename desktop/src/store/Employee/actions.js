import { normalize } from 'normalizr';
import moment from 'moment';

import { employeeActionTypes } from 'constants/actionTypeConstants';
import { snackActions, genericActions,analyzeActions } from 'store/actions';
import endpoints from './endpoints';
import * as schemas from 'store/schemas';
import * as status from 'constants/status';
import { currentRoundedTime } from 'helpers/time';
import domains from 'constants/domains';

export const getAllEmployees = () => {
  return dispatch => {
    return dispatch(genericActions.getAll(domains.EMPLOYEE));    
  };
};

export const updateEmployee = employee => {
  return async dispatch => {
    dispatch({ type: employeeActionTypes.UPDATE_EMPLOYEE_REQUEST });
    try {
      const response = await dispatch(genericActions.put(domains.EMPLOYEE,employee));
      dispatch(snackActions.openSnack(status.SUCCESS, 'Employee Updated'));
      dispatch({ type: employeeActionTypes.UPDATE_EMPLOYEE_SUCCESS });   
      return response;   
    } catch (e) {
      dispatch(snackActions.openSnack(status.SUCCESS, 'Employee Update Failed'));
      dispatch({ type: employeeActionTypes.UPDATE_EMPLOYEE_FAILURE });      
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
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Employee Creation Failed'));
      return dispatch({ type: employeeActionTypes.CREATE_EMPLOYEE_FAILURE });
    }
  };
};
export const removeEmployee = id => {
  return async dispatch => {
    dispatch({ type: employeeActionTypes.REMOVE_EMPLOYEE_REQUEST });
    try {
      await dispatch(analyzeActions.deleteSelected(domains.EMPLOYEE));
      await dispatch(genericActions.delet(domains.EMPLOYEE,id));

      await dispatch(snackActions.openSnack(status.SUCCESS, 'Employee Deleted'));
      return dispatch({ type: employeeActionTypes.REMOVE_EMPLOYEE_SUCCESS });      
    } catch (e) {      
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Employee Deletion Failed'));
      return dispatch({ type: employeeActionTypes.REMOVE_EMPLOYEE_FAILURE });
    }
  };
};


export const setIsWorking = (employee,isWorking) => {
  return async dispatch => {
    return await dispatch(genericActions.put(domains.EMPLOYEE,{
      ...employee,
      isWorking: isWorking
    }));
  };
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
      await dispatch(genericActions.post(domains.SHIFT,clockInObject));
      await dispatch(setIsWorking(employee,true));
      dispatch(snackActions.openSnack(status.SUCCESS, 'Clock in success!'));
      return dispatch({ type: employeeActionTypes.CLOCKIN_EMPLOYEE_SUCCESS });
    } catch (e) {
      dispatch(snackActions.openSnack(status.FAILURE, 'Clock in failed!'));
      return dispatch({ type: employeeActionTypes.CLOCKIN_EMPLOYEE_FAILURE, payload: e });
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
        dispatch(genericActions.post(domains.ACTIVITY,activity));
      });

      await dispatch(genericActions.put(domains.SHIFT,clockOutObject));
      await dispatch(setIsWorking(employee,false));
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Clock out success!'));
      return dispatch({ type: employeeActionTypes.CLOCKOUT_EMPLOYEE_SUCCESS });
    } catch (e) {
      dispatch(snackActions.openSnack(status.FAILURE, 'Clock out failed!'));
      return dispatch({ type: employeeActionTypes.CLOCKOUT_EMPLOYEE_FAILURE, payload: e });
    }
  };
};

export const login = pin => {
  return async dispatch => {
    dispatch({ type: employeeActionTypes.LOGIN_EMPLOYEE_REQUEST });
    try {
      const response = await endpoints.getEmployeeByPin(pin);
      const employeeObject = response.data;
      
      // Check that the employee isEmployed
      if (!employeeObject.isEmployed){
        dispatch({ type: employeeActionTypes.LOGIN_EMPLOYEE_FAILURE });  
        return Promise.reject({ message: 'Not currently employed!' });    
      }

      const payload = normalize({ employees: [response.data] }, schemas.employeeArray);
      return dispatch({
        type: employeeActionTypes.LOGIN_EMPLOYEE_SUCCESS,
        payload,
        data: response.data
      });
    } catch (e) {
      dispatch({ type: employeeActionTypes.LOGIN_EMPLOYEE_FAILURE, payload: e });  
      return Promise.reject({ message: 'Network Error!' });    
    }
  };
};
