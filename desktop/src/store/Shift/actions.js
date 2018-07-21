import { shift as shiftActionTypes } from 'constants/ActionTypes';

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
        payload: e,
      });
      throw e;
    }
  };
};
