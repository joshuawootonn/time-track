import { shift as shiftActionTypes } from 'constants/ActionTypes';

import {snack as snackActions} from 'store/actions';
import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import * as schemas from 'store/schemas';


export const clockIn = (employeeId) => {
  return dispatch => {
    dispatch({ type: shiftActionTypes.SHIFT_CLOCKIN_REQUEST });    
    const clockInObject = {
      "clockInDate": new Date().toUTCString(),
      "employeeId": employeeId
    }
    return endpoint.clockIn(clockInObject).then(
      response => {
        const payload = normalize({ shifts: [response.data] }, schemas.shiftArray)
        dispatch({ type: shiftActionTypes.SHIFT_CLOCKIN_SUCCESS, payload });
      },
      error => {
        dispatch({ type: shiftActionTypes.SHIFT_CLOCKIN_FAILURE, payload: error });
        throw error
      },
    );
  };
}

export const clockInSnack = () => {
  return snackActions.openSnack(shiftActionTypes.SHIFT_CLOCKIN_SNACK,"yo")
}