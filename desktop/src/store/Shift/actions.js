import moment from 'moment';

import { shiftActionTypes } from 'constants/actionTypeConstants';

import { snackActions,analyzeActions,genericActions,employeeActions } from 'store/actions';
import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import * as status from 'constants/status';
import * as schemas from 'store/schemas';
import domains from 'constants/domains';

export const getCurrentShift = employeeId => {
  return async dispatch => {
    dispatch({ type: shiftActionTypes.GET_CURRENT_SHIFT_REQUEST });
    try {
      const response = await endpoint.getCurrentShift(employeeId);
      const payload = normalize({ shifts: response.data }, schemas.shiftArray);
      
      return dispatch({ type: shiftActionTypes.GET_CURRENT_SHIFT_SUCCESS, payload, data: response.data[0] });
    } catch (e) {
      return dispatch({ type: shiftActionTypes.GET_CURRENT_SHIFT_FAILURE, payload: e });
    }
  };
};

export const getShiftsInRange = (startTime,endTime) => {
  return async dispatch => {
    dispatch({ type: shiftActionTypes.GET_SHIFTS_IN_RANGE_REQUEST });
    try {
      const response = await endpoint.getShiftsInRange(startTime,endTime);
      const payload = normalize({ shifts: response.data }, schemas.shiftArray);

      return dispatch({ type: shiftActionTypes.GET_SHIFTS_IN_RANGE_SUCCESS, payload });
    } catch (e) {
      return dispatch({ type: shiftActionTypes.GET_SHIFTS_IN_RANGE_FAILURE, payload: e }); 
    }
  };
};


export const createShift = shift => {
  return async dispatch => {
    dispatch({ type: shiftActionTypes.CREATE_SHIFT_REQUEST });
    try {
      
      const clockInMoment = moment(shift.clockInDate);
      const clockOutMoment = moment(shift.clockOutDate);
      const shiftDuration = moment.duration(clockOutMoment.diff(clockInMoment));
      // Parse form output to create the object that the api understands   
      const shiftObject = {
        employeeId: shift.employeeId,        
        length: shiftDuration.asMinutes(),
        lunch: shift.lunch,
        clockInDate: clockInMoment.toString(),
        clockOutDate: clockOutMoment.toString(),
        activities: shift.activities
      };
      // Post parsed object to SHIFT endpoint
      const response = await dispatch(genericActions.post(domains.SHIFT,shiftObject));
      // Loop through the activities Posting them to the ACTIVITY endpoint
      for(const activity of shift.activities) {
        // activity.projectId = undefined;
        activity.shiftId = response.data.id;        
        await dispatch(genericActions.post(domains.ACTIVITY,activity));
      }
      // Get the new SHIFT object since post wasn't working
      await dispatch(genericActions.get(domains.SHIFT,response.data.id));
      // Select said object for analyze
      await dispatch(analyzeActions.select(domains.SHIFT,response.data.id));    
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Shift Created'));
      return dispatch({ type: shiftActionTypes.CREATE_SHIFT_SUCCESS });      
    } catch (e) {
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Shift Creation Failed'));
      return dispatch({ type: shiftActionTypes.CREATE_SHIFT_FAILURE });
    }
  };
};

export const updateShift = shift => {
  return async (dispatch,getState) => {
    dispatch({ type: shiftActionTypes.UPDATE_SHIFT_REQUEST });
    try {
      const clockInMoment = moment(shift.clockInDate);
      const clockOutMoment = moment(shift.clockOutDate);
      const shiftDuration = moment.duration(clockOutMoment.diff(clockInMoment));

      // employee to not working
      const oldShift = getState().entities.shifts[shift.id];
      if(oldShift && !oldShift.clockOutDate){
        const employee = getState().entities.employees[oldShift.employeeId];
        dispatch(employeeActions.setIsWorking(employee,false));
      }

      const shiftObject = {
        id: shift.id,
        employeeId: shift.employeeId,        
        length: shiftDuration.asMinutes(),
        lunch: shift.lunch,
        clockInDate: clockInMoment.toString(),
        clockOutDate: clockOutMoment.toString()
      };      
      console.log(shiftObject);
      const response = await dispatch(genericActions.put(domains.SHIFT,shiftObject));

      await endpoint.deleteRelatedActivities(shift.id); 
      for(const activity of shift.activities) {
        activity.shiftId = response.data.id;
        activity.id = undefined;
        await dispatch(genericActions.post(domains.ACTIVITY,activity));
      }
     
      await dispatch(genericActions.get(domains.SHIFT,response.data.id));
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Shift Updated'));
      return dispatch({ type: shiftActionTypes.UPDATE_SHIFT_SUCCESS });      
    } catch (e) {
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Shift Update Failed'));
      return dispatch({ type: shiftActionTypes.UPDATE_SHIFT_FAILURE });
    }
  };
};


export const removeShift = id => {
  return async (dispatch,getState) => {
    dispatch({ type: shiftActionTypes.REMOVE_SHIFT_REQUEST });
    try {
      await dispatch(analyzeActions.deleteSelected(domains.SHIFT));
      const shift = getState().entities.shifts[id];
      // This clocks the employee out if you are deleting a shift in progress
      if(shift && !shift.clockOutDate){
        const employee = getState().entities.employees[shift.employeeId];
        dispatch(employeeActions.setIsWorking(employee,false));
      }
      await endpoint.deleteRelatedActivities(id);
      await dispatch(genericActions.delet(domains.SHIFT,id));

      await dispatch(snackActions.openSnack(status.SUCCESS, 'Shift Deleted'));
      return dispatch({ type: shiftActionTypes.REMOVE_SHIFT_SUCCESS });      
    } catch (e) {
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Shift Deletion Failed'));
      return dispatch({ type: shiftActionTypes.REMOVE_SHIFT_FAILURE });
    }
  };
};