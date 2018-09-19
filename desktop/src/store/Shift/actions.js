import { shiftActionTypes } from 'constants/ActionTypes';

import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import * as schemas from 'store/schemas';

export const postShift = shift => {
  return async dispatch => {
    dispatch({ type: shiftActionTypes.SHIFT_POST_REQUEST });
    try {
      const response = await endpoint.postShift(shift);
      const payload = normalize(
        { shifts: [response.data] },
        schemas.shiftArray,
      );
      return dispatch({ type: shiftActionTypes.SHIFT_POST_SUCCESS, payload });
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
      const payload = normalize(
        { shifts: [response.data] },
        schemas.shiftArray,
      );
      return dispatch({ type: shiftActionTypes.PUT_SHIFT_SUCCESS, payload });
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