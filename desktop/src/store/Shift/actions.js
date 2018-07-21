import { shift as shiftActionTypes } from 'constants/ActionTypes';
import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import * as schemas from 'store/schemas';


export const clockIn = () => {
  return dispatch => {
    dispatch({ type: shiftActionTypes.SHIFT_CLOCKIN_REQUEST });
    const accountId = 1;
    const clockInObject = {
      "clockInDate": "2018-07-21T02:43:19.715Z",
      "employeeId": 0
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