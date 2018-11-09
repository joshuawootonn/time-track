import moment from 'moment';

import { shiftActionTypes } from 'constants/ActionTypes';

import { snackActions,activityActions,analyzeActions } from 'store/actions';
import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import * as status from 'constants/status';
import * as schemas from 'store/schemas';

export const getShift = id => {
  return async dispatch => {
    dispatch({ type: shiftActionTypes.GET_SHIFT_REQUEST });
    try {
      const response = await endpoint.getShift(id);
      //console.log('get',response.data);
      const payload = normalize(
        { shifts: [response.data] },
        schemas.shiftArray,
      );
      //console.log('get',payload);
      return dispatch({ type: shiftActionTypes.GET_SHIFT_SUCCESS,payload });
    } catch (e) {
      console.log(e);
      return dispatch({ type: shiftActionTypes.GET_SHIFT_FAILURE,payload: e });
    }
  };
};


export const postShift = shift => {
  return async dispatch => {
    dispatch({ type: shiftActionTypes.SHIFT_POST_REQUEST });
    try {
      const response = await endpoint.postShift(shift);
      //console.log('post',response.data);
      const payload = normalize(
        { shifts: [response.data] },
        schemas.shiftArray,
      );
      //console.log('post',payload);
      return dispatch({ type: shiftActionTypes.SHIFT_POST_SUCCESS,payload, data: response.data });
    } catch (e) {
      console.log(e);
      return dispatch({
        type: shiftActionTypes.SHIFT_POST_FAILURE,
        payload: e
      });
    }
  };
};


export const putShift = shift => {
  return async dispatch => {
    dispatch({ type: shiftActionTypes.PUT_SHIFT_REQUEST });
    try {
      const response = await endpoint.putShift(shift);
      //console.log('put',response.data);
      const payload = normalize(
        { shifts: [response.data] },
        schemas.shiftArray,
      );
      //console.log('put',payload);
      return dispatch({ type: shiftActionTypes.PUT_SHIFT_SUCCESS,payload, data: response.data });
    } catch (e) {
      console.log(e);
      return dispatch({
        type: shiftActionTypes.PUT_SHIFT_FAILURE,
        payload: e
      });
    }
  };
};

export const getCurrentShift = employeeId => {
  return async dispatch => {
    dispatch({ type: shiftActionTypes.GET_CURRENT_SHIFT_REQUEST });
    try {
      const response = await endpoint.getCurrentShift(employeeId);
      const payload = normalize({ shifts: response.data }, schemas.shiftArray);
      
      return dispatch({
        type: shiftActionTypes.GET_CURRENT_SHIFT_SUCCESS,
        payload,
        data: response.data[0]
      });
    } catch (e) {
      dispatch({
        type: shiftActionTypes.GET_CURRENT_SHIFT_FAILURE,
        payload: e
      });
      throw e;
    }
  };
};

export const getShiftsInRange = (startTime,endTime) => {
  return async dispatch => {
    dispatch({ type: shiftActionTypes.GET_SHIFTS_IN_RANGE_REQUEST });
    try {
      const response = await endpoint.getShiftsInRange(startTime,endTime);
      const payload = normalize({ shifts: response.data }, schemas.shiftArray);

      return dispatch({
        type: shiftActionTypes.GET_SHIFTS_IN_RANGE_SUCCESS,
        payload
      });
    } catch (e) {
      dispatch({
        type: shiftActionTypes.GET_SHIFTS_IN_RANGE_FAILURE,
        payload: e
      });
      throw e;
    }
  };
};

export const addShift = (shift,activities) => {
  return  async dispatch => {
    dispatch({ type: shiftActionTypes.ADD_SHIFT_REQUEST });
    try {
      //console.log(shift,activities);

      const clockInMoment = moment(shift.clockInDate);
      const clockOutMoment = moment(shift.clockOutDate);
      const shiftDuration = moment.duration(clockOutMoment.diff(clockInMoment));
      const minutes = shiftDuration.asMinutes();
     
      const shiftObject = {
        employeeId: shift.employeeId,        
        length: minutes,
        lunch: shift.lunch,
        clockInDate: clockInMoment.toString(),
        clockOutDate: clockOutMoment.toString(),
        activities: activities
      };
      const response = await dispatch(postShift(shiftObject));      
      for(const activity of activities) {
        // activity.projectId = undefined;
        activity.shiftId = response.data.id;
        
        await dispatch(activityActions.postActivity(activity));
      }
      
      await dispatch(getShift(response.data.id));
      await dispatch(analyzeActions.selectShift(response.data.id));
    
      dispatch(snackActions.openSnack(status.SUCCESS, 'Shift add success!'));
      return dispatch({ type: shiftActionTypes.ADD_SHIFT_SUCCESS });
    } catch (e) {
      console.log(e);
      dispatch(snackActions.openSnack(status.FAILURE, 'Shift add failed!'));
      return dispatch({
        type: shiftActionTypes.ADD_SHIFT_FAILURE,
        payload: e
      });
    }
  };
};

export const editShift = (shift,activities) => {
  return  async dispatch => {
    dispatch({ type: shiftActionTypes.EDIT_SHIFT_REQUEST });
    try {
      // delete attached activities before you readd them
      await endpoint.deleteRelatedActivities(shift);      

      const clockInMoment = moment(shift.clockInDate);
      const clockOutMoment = moment(shift.clockOutDate);
      const shiftDuration = moment.duration(clockOutMoment.diff(clockInMoment));
      const minutes = shiftDuration.asMinutes();
     
      const shiftObject = {
        id: shift.id,
        employeeId: shift.employeeId,        
        length: minutes,
        lunch: shift.lunch,
        clockInDate: clockInMoment.toString(),
        clockOutDate: clockOutMoment.toString()
      };
      const response = await dispatch(putShift(shiftObject));      
      for(const activity of activities) {
        // activity.projectId = undefined;
        activity.shiftId = response.data.id;
        activity.id = undefined;
        await dispatch(activityActions.postActivity(activity));
      }
     
      await dispatch(getShift(response.data.id));


      dispatch(snackActions.openSnack(status.SUCCESS, 'Shift edit success!'));
      return dispatch({ type: shiftActionTypes.EDIT_SHIFT_SUCCESS });
    } catch (e) {
      console.log(e);
      dispatch(snackActions.openSnack(status.FAILURE, 'Shift edit failed!'));
      return dispatch({ type: shiftActionTypes.ADD_SHIFT_FAILURE, payload: e });
    }
  };
};

export const deleteShift = shift => {
  return  async dispatch => {
    dispatch({ type: shiftActionTypes.DELETE_SHIFT_REQUEST });
    try {
      await endpoint.deleteRelatedActivities(shift);
      await endpoint.deleteShift(shift);
      const deleted = {
        entities: {
          shifts: [shift.id]          
        },
        result: {
          shifts: [shift.id]
        }
      };

      dispatch(snackActions.openSnack(status.SUCCESS, 'Shift deletion success!'));      
      return dispatch({ type: shiftActionTypes.DELETE_SHIFT_SUCCESS, deleted });
    } catch (e) {
      console.log(e);
      dispatch(snackActions.openSnack(status.FAILURE, 'Shift deletion failed!'));
      return dispatch({ type: shiftActionTypes.DELETE_SHIFT_FAILURE, payload: e });
    }
  };
};